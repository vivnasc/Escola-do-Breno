import { useEffect, useMemo, useState, useCallback } from 'react'
import { useTTS } from '../hooks/useTTS'
import { useSoundEffects } from '../hooks/useSoundEffects'
import { useHaptics } from '../hooks/useHaptics'

const DEFAULT_MESSAGES = {
  success: ['Muito bem!', 'Excelente!', 'Fantástico!', 'Boa!', 'Perfeito!'],
  tryAgain: ['Quase! Tenta de novo.', 'Boa tentativa! Tenta outra vez.', 'Quase lá! Experimenta de novo.'],
}

export default function FeedbackMessage({ type, visible, onDismiss, universe, soundEnabled = true }) {
  const { speak } = useTTS()
  const sfx = useSoundEffects(soundEnabled)
  const haptics = useHaptics(soundEnabled)
  const [animState, setAnimState] = useState('idle') // idle | entering | visible | exiting
  const [particles, setParticles] = useState([])

  const messages = useMemo(() => {
    if (!type) return DEFAULT_MESSAGES.tryAgain
    if (type === 'success' && universe?.feedbackPositive) {
      return universe.feedbackPositive
    }
    if (type === 'tryAgain' && universe?.feedbackTryAgain) {
      return universe.feedbackTryAgain
    }
    return DEFAULT_MESSAGES[type] || DEFAULT_MESSAGES.tryAgain
  }, [type, universe])

  const message = useMemo(
    () => messages[Math.floor(Math.random() * messages.length)],
    [messages, visible]
  )
  const isSuccess = type === 'success'
  const icon = universe?.icon || (isSuccess ? '⭐' : '💪')

  // Generate success particles
  const generateParticles = useCallback(() => {
    const emojis = ['✨', '⭐', '🌟', '💫', '🎯']
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: 20 + Math.random() * 60,
      delay: i * 0.08,
      duration: 0.6 + Math.random() * 0.3,
    }))
  }, [])

  useEffect(() => {
    if (visible) {
      setAnimState('entering')
      // Play sound effect + haptic feedback
      if (isSuccess) {
        sfx.success()
        haptics.success()
        setParticles(generateParticles())
      } else {
        sfx.error()
        haptics.error()
        setParticles([])
      }
      speak(message, { auto: true })

      // Transition to visible
      const enterTimer = setTimeout(() => setAnimState('visible'), 50)

      if (isSuccess) {
        // Auto-dismiss success after 2s (longer than before for the child to enjoy)
        const dismissTimer = setTimeout(() => {
          setAnimState('exiting')
          setTimeout(() => {
            setAnimState('idle')
            onDismiss?.()
          }, 300)
        }, 2000)
        return () => {
          clearTimeout(enterTimer)
          clearTimeout(dismissTimer)
        }
      }
      return () => clearTimeout(enterTimer)
    } else {
      setAnimState('idle')
    }
  }, [visible]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible && animState === 'idle') return null

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: animState === 'idle' ? 0 : 1,
        pointerEvents: animState === 'idle' ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          ...styles.container,
          backgroundColor: isSuccess ? '#E8F5E9' : '#FFF3E0',
          borderColor: isSuccess ? 'var(--color-success)' : 'var(--color-warning)',
          boxShadow: isSuccess
            ? '0 8px 32px rgba(46, 125, 50, 0.2)'
            : '0 8px 32px rgba(249, 168, 37, 0.2)',
          transform: animState === 'exiting'
            ? 'translateY(20px) scale(0.95)'
            : animState === 'entering'
              ? 'translateY(30px) scale(0.95)'
              : 'translateY(0) scale(1)',
          opacity: animState === 'exiting' ? 0 : animState === 'entering' ? 0 : 1,
        }}
        className={!isSuccess && animState === 'visible' ? 'animate-shake' : ''}
        role="alert"
      >
        {/* Success particles floating up */}
        {isSuccess && particles.map((p) => (
          <span
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              bottom: '80%',
              fontSize: '1.2rem',
              animation: `floatUp ${p.duration}s ease-out ${p.delay}s forwards`,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          >
            {p.emoji}
          </span>
        ))}

        <span style={styles.emoji} className={isSuccess ? 'animate-score-pop' : ''}>
          {icon}
        </span>
        <span style={{
          ...styles.text,
          color: isSuccess ? 'var(--color-primary-dark)' : 'var(--color-text)',
        }}>{message}</span>
        {!isSuccess && (
          <button
            style={styles.btn}
            className="btn-press"
            onClick={() => {
              haptics.tap()
              setAnimState('exiting')
              setTimeout(() => {
                setAnimState('idle')
                onDismiss?.()
              }, 300)
            }}
          >
            Tentar de novo
          </button>
        )}
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    zIndex: 100,
    padding: 'var(--space-lg)',
    transition: 'opacity 0.3s ease',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-xl) var(--space-2xl)',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid',
    textAlign: 'center',
    position: 'relative',
    overflow: 'visible',
    transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
    maxWidth: '340px',
    width: '100%',
  },
  emoji: {
    fontSize: '3.5rem',
    lineHeight: 1,
  },
  text: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-text)',
    lineHeight: 1.4,
  },
  btn: {
    marginTop: 'var(--space-xs)',
    padding: 'var(--space-sm) var(--space-xl)',
    backgroundColor: 'var(--color-warning)',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    border: 'none',
    cursor: 'pointer',
    minHeight: '48px',
  },
}
