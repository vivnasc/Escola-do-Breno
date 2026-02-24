import { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const SCENES = [
  { id: 'rain', label: 'Chuva a cair', emoji: '🌧️' },
  { id: 'birds', label: 'Pássaros a cantar', emoji: '🐦' },
  { id: 'thunder', label: 'Trovão', emoji: '🌩️' },
  { id: 'sea', label: 'Mar a bater na praia', emoji: '🌊' },
  { id: 'wind', label: 'Vento a soprar', emoji: '💨' },
  { id: 'clock', label: 'Relógio a bater', emoji: '🕐' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function SoundStory({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const audioCtxRef = useRef(null)
  const [roundIdx, setRoundIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [isPlayingSound, setIsPlayingSound] = useState(false)

  const rounds = useMemo(() => {
    const shuffled = shuffle(SCENES)
    return shuffled.map((scene) => {
      const others = SCENES.filter((s) => s.id !== scene.id)
      const distractors = shuffle(others).slice(0, 2)
      return {
        correct: scene,
        options: shuffle([scene, ...distractors]),
      }
    })
  }, [])

  const isComplete = roundIdx >= rounds.length

  useEffect(() => {
    if (!isComplete) {
      speak('Ouve o som e escolhe a cena correcta.', { auto: true })
    }
  }, [roundIdx])

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioCtxRef.current
  }, [])

  // Sound synthesis functions
  const playRain = useCallback((ctx) => {
    const duration = 2
    const bufferSize = ctx.sampleRate * duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 4000
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.3)
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + duration - 0.3)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration)
    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    source.start()
    source.stop(ctx.currentTime + duration)
    return duration
  }, [])

  const playBirds = useCallback((ctx) => {
    const duration = 2
    const t = ctx.currentTime
    for (let i = 0; i < 6; i++) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      const startFreq = 1200 + Math.random() * 800
      const startTime = t + i * 0.3
      osc.frequency.setValueAtTime(startFreq, startTime)
      osc.frequency.linearRampToValueAtTime(startFreq + 400, startTime + 0.08)
      osc.frequency.linearRampToValueAtTime(startFreq - 200, startTime + 0.15)
      gain.gain.setValueAtTime(0, startTime)
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.02)
      gain.gain.linearRampToValueAtTime(0, startTime + 0.18)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(startTime)
      osc.stop(startTime + 0.2)
    }
    return duration
  }, [])

  const playThunder = useCallback((ctx) => {
    const duration = 2.5
    const t = ctx.currentTime
    // Low rumble
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(40, t)
    osc.frequency.linearRampToValueAtTime(30, t + 1.5)
    oscGain.gain.setValueAtTime(0, t)
    oscGain.gain.linearRampToValueAtTime(0.4, t + 0.1)
    oscGain.gain.linearRampToValueAtTime(0.2, t + 0.8)
    oscGain.gain.linearRampToValueAtTime(0, t + 2)
    osc.connect(oscGain)
    oscGain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 2)
    // Noise burst (crack)
    const bufferSize = ctx.sampleRate * 0.3
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.6, t)
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.3)
    noise.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noise.start(t)
    return duration
  }, [])

  const playSea = useCallback((ctx) => {
    const duration = 3
    const t = ctx.currentTime
    const bufferSize = ctx.sampleRate * duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      const phase = (i / ctx.sampleRate) * Math.PI * 2 * 0.3
      const envelope = (Math.sin(phase) + 1) / 2
      data[i] = (Math.random() * 2 - 1) * 0.2 * envelope
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 1500
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.5, t)
    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    source.start(t)
    source.stop(t + duration)
    return duration
  }, [])

  const playWind = useCallback((ctx) => {
    const duration = 2.5
    const t = ctx.currentTime
    const bufferSize = ctx.sampleRate * duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(300, t)
    filter.frequency.linearRampToValueAtTime(1200, t + 1)
    filter.frequency.linearRampToValueAtTime(400, t + 2)
    filter.frequency.linearRampToValueAtTime(800, t + duration)
    filter.Q.value = 2
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.5, t + 0.5)
    gain.gain.linearRampToValueAtTime(0.3, t + 1.5)
    gain.gain.linearRampToValueAtTime(0, t + duration)
    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    source.start(t)
    source.stop(t + duration)
    return duration
  }, [])

  const playClock = useCallback((ctx) => {
    const duration = 2
    const t = ctx.currentTime
    for (let i = 0; i < 6; i++) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 800
      const tickTime = t + i * 0.33
      gain.gain.setValueAtTime(0, tickTime)
      gain.gain.linearRampToValueAtTime(0.3, tickTime + 0.005)
      gain.gain.exponentialRampToValueAtTime(0.01, tickTime + 0.05)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(tickTime)
      osc.stop(tickTime + 0.06)
    }
    return duration
  }, [])

  const soundPlayers = useMemo(
    () => ({
      rain: playRain,
      birds: playBirds,
      thunder: playThunder,
      sea: playSea,
      wind: playWind,
      clock: playClock,
    }),
    [playRain, playBirds, playThunder, playSea, playWind, playClock]
  )

  const playCurrentSound = useCallback(async () => {
    if (isComplete || isPlayingSound) return
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') await ctx.resume()
    setIsPlayingSound(true)
    const sceneId = rounds[roundIdx].correct.id
    const player = soundPlayers[sceneId]
    const duration = player(ctx)
    setTimeout(() => setIsPlayingSound(false), duration * 1000)
  }, [roundIdx, rounds, isComplete, isPlayingSound, getAudioContext, soundPlayers])

  const handleAnswer = useCallback(
    (scene) => {
      registerClick()
      if (scene.id === rounds[roundIdx].correct.id) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [roundIdx, rounds, registerClick, registerSuccess, registerError]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    const next = roundIdx + 1
    setRoundIdx(next)
    updateCampoProgress('campo5', next + 4)
    if (next >= rounds.length) {
      const stars = score >= 5 ? 3 : score >= 3 ? 2 : 1
      completeActivity('sound-story', stars)
    }
  }, [roundIdx, score, rounds.length, completeActivity, updateCampoProgress])

  const finalStars = score >= 5 ? 3 : score >= 3 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Histórias Sonoras" backPath="/campo/5" color="var(--color-campo5)">
        <CompletionCelebration
          emoji="🔊"
          title="Tens um ouvido fantástico!"
          score={score}
          total={rounds.length}
          stars={finalStars}
          color="var(--color-campo5)"
        />
      </ActivityShell>
    )
  }

  const current = rounds[roundIdx]

  return (
    <ActivityShell
      title="Histórias Sonoras"
      instruction="Ouve o som e escolhe a cena correcta!"
      backPath="/campo/5"
      color="var(--color-campo5)"
      score={score}
      total={rounds.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.soundSection}>
        <p style={styles.roundLabel}>
          Som {roundIdx + 1} de {rounds.length}
        </p>
        <button
          style={{
            ...styles.playBtn,
            opacity: isPlayingSound ? 0.6 : 1,
          }}
          className="btn-press"
          onClick={playCurrentSound}
          disabled={isPlayingSound || feedback !== null}
        >
          <span style={styles.playIcon}>{isPlayingSound ? '🔊' : '▶️'}</span>
          <span style={styles.playText}>
            {isPlayingSound ? 'A ouvir...' : 'Ouvir o som'}
          </span>
        </button>
      </div>

      <p style={styles.prompt}>Que cena corresponde a este som?</p>

      <div style={styles.optionsGrid}>
        {current.options.map((scene) => (
          <button
            key={scene.id}
            className="btn-press"
            style={styles.optionBtn}
            onClick={() => handleAnswer(scene)}
            disabled={feedback !== null}
          >
            <span style={styles.optionEmoji}>{scene.emoji}</span>
            <span style={styles.optionLabel}>{scene.label}</span>
          </button>
        ))}
      </div>

      <FeedbackMessage
        type={feedback}
        visible={feedback !== null}
        onDismiss={feedback === 'success' ? handleNext : () => setFeedback(null)}
        universe={adaptive?.universe}
      />
    </ActivityShell>
  )
}

const styles = {
  soundSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-xl)',
    backgroundColor: '#E0F7FA',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo5)',
  },
  roundLabel: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
  },
  playBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg) var(--space-xl)',
    backgroundColor: 'var(--color-campo5)',
    color: 'white',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all var(--transition-speed)',
  },
  playIcon: {
    fontSize: '2rem',
  },
  playText: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
  },
  prompt: {
    fontWeight: 700,
    color: 'var(--color-campo5)',
    fontSize: 'var(--font-size-lg)',
    textAlign: 'center',
  },
  optionsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  optionBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all var(--transition-speed)',
  },
  optionEmoji: {
    fontSize: '2rem',
    flexShrink: 0,
  },
  optionLabel: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    color: 'var(--color-text)',
  },
}
