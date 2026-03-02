import { useNavigate } from 'react-router-dom'
import { useTTS, setTTSMode, getTTSMode } from '../hooks/useTTS'
import { useEffect, useState, useCallback, useRef } from 'react'
import { useSwipe } from '../hooks/useSwipe'
import { useHaptics } from '../hooks/useHaptics'
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
  const haptics = useHaptics()
  const [muted, setMuted] = useState(() => getTTSMode() === 'off')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [prevScore, setPrevScore] = useState(score)
  const [scoreAnimating, setScoreAnimating] = useState(false)
  const [swipeOffset, setSwipeOffset] = useState(0)
  const touchStartRef = useRef(null)

  // Swipe right to go back
  const swipe = useSwipe({
    onSwipeRight: () => {
      haptics.tap()
      navigate(backPath || -1)
    },
  })

  // Auto-read instruction on load
  const shouldReadAloud = textLevel ? textLevel.readAloud !== false : true
  useEffect(() => {
    if (instruction && shouldReadAloud) {
      const timer = setTimeout(() => {
        setIsSpeaking(true)
        speak(instruction, { auto: true })
        // Estimate speaking duration (rough: 80ms per character)
        const duration = Math.max(1500, instruction.length * 80)
        setTimeout(() => setIsSpeaking(false), duration)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [instruction, speak, shouldReadAloud])

  // Animate score changes
  useEffect(() => {
    if (score !== prevScore && score !== undefined) {
      setScoreAnimating(true)
      setPrevScore(score)
      const timer = setTimeout(() => setScoreAnimating(false), 400)
      return () => clearTimeout(timer)
    }
  }, [score, prevScore])

  const toggleMute = useCallback(() => {
    haptics.tap()
    if (muted) {
      setTTSMode('on-demand')
      setMuted(false)
    } else {
      stop()
      setTTSMode('off')
      setMuted(true)
      setIsSpeaking(false)
    }
  }, [muted, stop, haptics])

  const handleSpeakInstruction = useCallback(() => {
    haptics.tap()
    setIsSpeaking(true)
    speak(instruction)
    const duration = Math.max(1500, instruction.length * 80)
    setTimeout(() => setIsSpeaking(false), duration)
  }, [instruction, speak, haptics])

  // Swipe-back visual feedback
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0]
    if (touch.clientX < 30) {
      touchStartRef.current = touch.clientX
    }
    swipe.handlers.onTouchStart(e)
  }, [swipe.handlers])

  const handleTouchMove = useCallback((e) => {
    if (touchStartRef.current !== null) {
      const dx = e.touches[0].clientX - touchStartRef.current
      if (dx > 0 && dx < 100) {
        setSwipeOffset(dx)
      }
    }
    swipe.handlers.onTouchMove(e)
  }, [swipe.handlers])

  const handleTouchEnd = useCallback((e) => {
    touchStartRef.current = null
    setSwipeOffset(0)
    swipe.handlers.onTouchEnd(e)
  }, [swipe.handlers])

  // Progress percentage
  const progressPct = total > 0 ? ((score || 0) / total) * 100 : 0

  return (
    <div
      style={{
        ...styles.container,
        transform: swipeOffset > 0 ? `translateX(${swipeOffset * 0.3}px)` : undefined,
        transition: swipeOffset > 0 ? 'none' : 'transform 0.3s ease',
      }}
      className="animate-fade-in"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Swipe-back edge indicator */}
      {swipeOffset > 10 && (
        <div
          style={{
            ...styles.swipeIndicator,
            opacity: Math.min(1, swipeOffset / 60),
            transform: `translateX(${swipeOffset * 0.5 - 30}px)`,
          }}
          aria-hidden="true"
        >
          ←
        </div>
      )}

      <header style={styles.header}>
        <button
          style={styles.backBtn}
          onClick={() => {
            haptics.tap()
            navigate(backPath || -1)
          }}
          aria-label="Voltar"
          className="btn-press"
        >
          ← Voltar
        </button>
        <div style={styles.headerRight}>
          <button
            style={{
              ...styles.muteBtn,
              backgroundColor: muted ? '#FFEBEE' : isSpeaking ? '#C8E6C9' : '#E8F5E9',
              color: muted ? '#C62828' : 'var(--color-primary)',
              borderColor: isSpeaking ? 'var(--color-primary)' : 'currentColor',
            }}
            onClick={toggleMute}
            aria-label={muted ? 'Ligar voz' : 'Desligar voz'}
            className="btn-press"
          >
            {muted ? '🔇' : '🔊'}
            {/* TTS speaking indicator dots */}
            {isSpeaking && !muted && (
              <span style={styles.speakingDots} aria-hidden="true">
                <span style={{ ...styles.speakingDot, animationDelay: '0s' }} />
                <span style={{ ...styles.speakingDot, animationDelay: '0.15s' }} />
                <span style={{ ...styles.speakingDot, animationDelay: '0.3s' }} />
              </span>
            )}
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
            <span
              style={styles.score}
              className={scoreAnimating ? 'animate-score-pop' : ''}
            >
              {score}/{total}
            </span>
          )}
        </div>
      </header>

      {/* Progress bar */}
      {total > 0 && (
        <div style={styles.progressTrack}>
          <div
            className="progress-bar-fill"
            style={{
              ...styles.progressFill,
              width: `${progressPct}%`,
              backgroundColor: color,
            }}
          />
        </div>
      )}

      <h2 style={{ ...styles.title, color }}>{title}</h2>

      {instruction && (
        <button
          style={{
            ...styles.instruction,
            ...(textLevel?.useSimpleLanguage ? styles.instructionLarge : {}),
            ...(isSpeaking ? styles.instructionSpeaking : {}),
          }}
          onClick={handleSpeakInstruction}
          aria-label={`Ouvir instrução: ${instruction}`}
          className="btn-press"
        >
          <span style={styles.instructionIcon}>{isSpeaking ? '🗣️' : '🔊'}</span>
          <span>{instruction}</span>
        </button>
      )}

      <div style={styles.content} className="activity-content">{children}</div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    minHeight: 'calc(100vh - 100px)',
    position: 'relative',
    padding: '0 var(--space-sm)',
  },
  swipeIndicator: {
    position: 'fixed',
    left: 0,
    top: '50%',
    width: 30,
    height: 30,
    borderRadius: '0 50% 50% 0',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: 700,
    zIndex: 50,
    pointerEvents: 'none',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--space-xs) 0',
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
    borderRadius: 'var(--radius-sm)',
  },
  muteBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '2px solid',
    cursor: 'pointer',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'inherit',
    flexShrink: 0,
    position: 'relative',
    transition: 'background-color 0.2s ease, border-color 0.2s ease',
  },
  speakingDots: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 2,
  },
  speakingDot: {
    width: 3,
    height: 8,
    backgroundColor: 'var(--color-primary)',
    borderRadius: 2,
    animation: 'speakingDot 0.6s ease-in-out infinite',
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
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: 'var(--color-border)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    minWidth: 0,
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
    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
  },
  instructionLarge: {
    fontSize: 'var(--font-size-lg)',
    padding: 'var(--space-md)',
    lineHeight: 1.6,
  },
  instructionSpeaking: {
    borderColor: 'var(--color-primary-light)',
    boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)',
  },
  instructionIcon: {
    fontSize: '1.3rem',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
}
