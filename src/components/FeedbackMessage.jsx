import { useEffect, useMemo } from 'react'
import { useTTS } from '../hooks/useTTS'
import { useSoundEffects } from '../hooks/useSoundEffects'

const DEFAULT_MESSAGES = {
  success: ['Muito bem!', 'Excelente!', 'Fantastico!'],
  tryAgain: ['Quase! Tenta de novo.', 'Boa tentativa! Tenta outra vez.', 'Quase la! Experimenta de novo.'],
}

export default function FeedbackMessage({ type, visible, onDismiss, universe, soundEnabled = true }) {
  const { speak } = useTTS()
  const sfx = useSoundEffects(soundEnabled)

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

  const message = messages[Math.floor(Math.random() * messages.length)]
  const isSuccess = type === 'success'
  const icon = universe?.icon || (isSuccess ? '⭐' : '💪')

  useEffect(() => {
    if (visible) {
      // Play sound effect BEFORE TTS
      if (isSuccess) {
        sfx.success()
      } else {
        sfx.error()
      }
      speak(message)
      if (isSuccess) {
        const timer = setTimeout(() => onDismiss?.(), 1500)
        return () => clearTimeout(timer)
      }
    }
  }, [visible, message, speak, isSuccess, onDismiss, sfx])

  if (!visible) return null

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: isSuccess ? '#E8F5E9' : '#FFF3E0',
        borderColor: isSuccess ? 'var(--color-success)' : 'var(--color-warning)',
      }}
      className="animate-scale-in"
      role="alert"
    >
      <span style={styles.emoji}>{icon}</span>
      <span style={styles.text}>{message}</span>
      {!isSuccess && (
        <button style={styles.btn} onClick={onDismiss}>
          Tentar de novo
        </button>
      )}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-lg)',
    borderRadius: 'var(--radius-md)',
    border: '2px solid',
    textAlign: 'center',
  },
  emoji: {
    fontSize: '2.5rem',
  },
  text: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  btn: {
    marginTop: 'var(--space-sm)',
    padding: 'var(--space-sm) var(--space-lg)',
    backgroundColor: 'var(--color-warning)',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    border: 'none',
    cursor: 'pointer',
  },
}
