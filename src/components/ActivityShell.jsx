import { useNavigate } from 'react-router-dom'
import { useTTS, setTTSMode, getTTSMode } from '../hooks/useTTS'
import { useEffect, useState, useCallback } from 'react'
import VisualTimer from './VisualTimer'

export default function ActivityShell({
  title,
  instruction,
  color = 'var(--color-primary)',
  backPath,
  children,
  score,
  total,
  textLevel,
  timerSeconds,
  onTimeUp,
  showTimer = true,
}) {
  const navigate = useNavigate()
  const { speak, stop } = useTTS()
  const [muted, setMuted] = useState(() => getTTSMode() === 'off')

  // Auto-read instruction on load (respects textLevel.readAloud)
  const shouldReadAloud = textLevel ? textLevel.readAloud !== false : true
  useEffect(() => {
    if (instruction && shouldReadAloud) {
      const timer = setTimeout(() => speak(instruction, { auto: true }), 500)
      return () => clearTimeout(timer)
    }
  }, [instruction, speak, shouldReadAloud])

  // Quick mute toggle — sets mode to 'off' or restores to 'on-demand'
  const toggleMute = useCallback(() => {
    if (muted) {
      setTTSMode('on-demand')
      setMuted(false)
    } else {
      stop()
      setTTSMode('off')
      setMuted(true)
    }
  }, [muted, stop])

  return (
    <div style={styles.container} className="animate-fade-in">
      <header style={styles.header}>
        <button
          style={styles.backBtn}
          onClick={() => navigate(backPath || -1)}
          aria-label="Voltar"
        >
          ← Voltar
        </button>
        <div style={styles.headerRight}>
          <button
            style={{
              ...styles.muteBtn,
              backgroundColor: muted ? '#FFEBEE' : '#E8F5E9',
              color: muted ? '#C62828' : 'var(--color-primary)',
            }}
            onClick={toggleMute}
            aria-label={muted ? 'Ligar voz' : 'Desligar voz'}
          >
            {muted ? '🔇' : '🔊'}
          </button>
          {timerSeconds && showTimer && (
            <VisualTimer
              durationSeconds={timerSeconds}
              onTimeUp={onTimeUp}
              color={color}
              size={40}
            />
          )}
          {score !== undefined && (
            <span style={styles.score}>
              {score}/{total}
            </span>
          )}
        </div>
      </header>

      <h2 style={{ ...styles.title, color }}>{title}</h2>

      {instruction && (
        <button
          style={{
            ...styles.instruction,
            ...(textLevel?.useSimpleLanguage ? styles.instructionLarge : {}),
          }}
          onClick={() => speak(instruction)}
          aria-label={`Ouvir instrução: ${instruction}`}
        >
          🔊 {instruction}
        </button>
      )}

      <div style={styles.content}>{children}</div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    minHeight: 'calc(100vh - 100px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  backBtn: {
    padding: 'var(--space-sm) var(--space-md)',
    color: 'var(--color-text-secondary)',
    fontWeight: 600,
    fontSize: 'var(--font-size-base)',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
  },
  muteBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '2px solid currentColor',
    cursor: 'pointer',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'inherit',
    flexShrink: 0,
  },
  score: {
    padding: 'var(--space-xs) var(--space-md)',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-sm)',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    boxShadow: 'var(--shadow-sm)',
    fontVariantNumeric: 'tabular-nums',
  },
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    textAlign: 'center',
  },
  instruction: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)',
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    cursor: 'pointer',
    textAlign: 'left',
    lineHeight: 1.4,
    transition: 'box-shadow 0.2s ease',
  },
  instructionLarge: {
    fontSize: 'var(--font-size-lg)',
    padding: 'var(--space-md)',
    lineHeight: 1.6,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
}
