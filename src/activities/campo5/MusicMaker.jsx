import { useState, useCallback, useRef, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const COLS = 8
const ROWS = 4
const INSTRUMENTS = ['Bombo', 'Caixa', 'Chimbal', 'Melodia']
const INSTRUMENT_EMOJIS = ['🥁', '🪘', '🔔', '🎵']
const MELODY_NOTES = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25] // C4 to C5

function createEmptyGrid() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(false))
}

export default function MusicMaker({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const [grid, setGrid] = useState(createEmptyGrid)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentCol, setCurrentCol] = useState(-1)
  const [isComplete, setIsComplete] = useState(false)
  const audioCtxRef = useRef(null)
  const playingRef = useRef(false)

  useEffect(() => {
    return () => {
      playingRef.current = false
    }
  }, [])

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioCtxRef.current
  }, [])

  const playKick = useCallback((ctx, time) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(150, time)
    osc.frequency.exponentialRampToValueAtTime(60, time + 0.1)
    gain.gain.setValueAtTime(0.8, time)
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(time)
    osc.stop(time + 0.15)
  }, [])

  const playSnare = useCallback((ctx, time) => {
    const bufferSize = ctx.sampleRate * 0.1
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.5, time)
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1)
    noise.connect(gain)
    gain.connect(ctx.destination)
    noise.start(time)
  }, [])

  const playHiHat = useCallback((ctx, time) => {
    const bufferSize = ctx.sampleRate * 0.03
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 8000
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.3, time)
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.03)
    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    noise.start(time)
  }, [])

  const playMelody = useCallback((ctx, time, col) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = MELODY_NOTES[col]
    gain.gain.setValueAtTime(0.3, time)
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(time)
    osc.stop(time + 0.2)
  }, [])

  const toggleCell = useCallback(
    (row, col) => {
      registerClick()
      setGrid((prev) => {
        const next = prev.map((r) => [...r])
        next[row][col] = !next[row][col]
        return next
      })
    },
    [registerClick]
  )

  const playBeat = useCallback(async () => {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') await ctx.resume()
    setIsPlaying(true)
    playingRef.current = true

    const tempo = 200 // ms per step

    for (let col = 0; col < COLS; col++) {
      if (!playingRef.current) break
      setCurrentCol(col)
      const time = ctx.currentTime

      if (grid[0][col]) playKick(ctx, time)
      if (grid[1][col]) playSnare(ctx, time)
      if (grid[2][col]) playHiHat(ctx, time)
      if (grid[3][col]) playMelody(ctx, time, col)

      await new Promise((resolve) => setTimeout(resolve, tempo))
    }

    setCurrentCol(-1)
    setIsPlaying(false)
    playingRef.current = false
  }, [grid, getAudioContext, playKick, playSnare, playHiHat, playMelody])

  const handleClear = useCallback(() => {
    registerClick()
    setGrid(createEmptyGrid())
  }, [registerClick])

  const handleFinish = useCallback(() => {
    registerClick()
    registerSuccess()
    updateCampoProgress('campo5', 2)
    completeActivity('music-maker', 3)
    setIsComplete(true)
  }, [registerClick, registerSuccess, completeActivity, updateCampoProgress])

  if (isComplete) {
    return (
      <ActivityShell title="Cria Música" backPath="/campo/5" color="var(--color-campo5)">
        <CompletionCelebration
          emoji="🎶"
          title="Criaste uma música fantástica!"
          stars={3}
          color="var(--color-campo5)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Cria Música"
      instruction="Toca nas células para ligar ou desligar sons. Carrega em Tocar para ouvir!"
      backPath="/campo/5"
      color="var(--color-campo5)"
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.gridContainer}>
        {/* Column numbers */}
        <div style={styles.gridRow}>
          <div style={styles.labelCell} />
          {Array.from({ length: COLS }, (_, c) => (
            <div
              key={c}
              style={{
                ...styles.colLabel,
                color: currentCol === c ? 'var(--color-campo5)' : 'var(--color-text-secondary)',
                fontWeight: currentCol === c ? 700 : 400,
              }}
            >
              {c + 1}
            </div>
          ))}
        </div>

        {/* Grid rows */}
        {INSTRUMENTS.map((inst, row) => (
          <div key={row} style={styles.gridRow}>
            <div style={styles.labelCell}>
              <span>{INSTRUMENT_EMOJIS[row]}</span>
              <span style={styles.instLabel}>{inst}</span>
            </div>
            {Array.from({ length: COLS }, (_, col) => (
              <button
                key={col}
                style={{
                  ...styles.cell,
                  backgroundColor: grid[row][col]
                    ? 'var(--color-campo5)'
                    : currentCol === col
                      ? '#E0F2F1'
                      : 'var(--color-surface)',
                  border: grid[row][col]
                    ? '2px solid var(--color-campo5)'
                    : '2px solid var(--color-border)',
                  transform: currentCol === col && grid[row][col] ? 'scale(1.1)' : 'scale(1)',
                }}
                className="btn-press"
                onClick={() => toggleCell(row, col)}
                disabled={isPlaying}
                aria-label={`${inst} tempo ${col + 1} ${grid[row][col] ? 'ligado' : 'desligado'}`}
              >
                {grid[row][col] && (
                  <span style={styles.cellDot} />
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div style={styles.controls}>
        <button
          style={{
            ...styles.controlBtn,
            backgroundColor: isPlaying ? '#E0E0E0' : 'var(--color-campo5)',
          }}
          className="btn-press"
          onClick={playBeat}
          disabled={isPlaying}
        >
          {isPlaying ? '🔊 A tocar...' : '▶️ Tocar'}
        </button>

        <button
          style={{ ...styles.controlBtn, backgroundColor: '#EF5350', }}
          className="btn-press"
          onClick={handleClear}
          disabled={isPlaying}
        >
          🗑️ Limpar
        </button>

        <button
          style={{ ...styles.controlBtn, backgroundColor: '#43A047' }}
          className="btn-press"
          onClick={handleFinish}
        >
          ✅ Concluir
        </button>
      </div>
    </ActivityShell>
  )
}

const styles = {
  gridContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    overflowX: 'auto',
    padding: 'var(--space-sm)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-lg)',
  },
  gridRow: {
    display: 'flex',
    gap: '2px',
    alignItems: 'center',
  },
  labelCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-xs)',
    minWidth: '85px',
    fontSize: 'var(--font-size-sm)',
    flexShrink: 0,
  },
  instLabel: {
    fontWeight: 600,
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
  },
  colLabel: {
    width: '44px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'var(--font-size-sm)',
    flexShrink: 0,
    transition: 'all var(--transition-speed)',
  },
  cell: {
    width: '44px',
    height: '44px',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.15s ease',
  },
  cellDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'white',
  },
  controls: {
    display: 'flex',
    gap: 'var(--space-sm)',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  controlBtn: {
    padding: 'var(--space-sm) var(--space-lg)',
    color: 'white',
    borderRadius: 'var(--radius-md)',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    border: 'none',
    cursor: 'pointer',
    minWidth: '100px',
  },
}
