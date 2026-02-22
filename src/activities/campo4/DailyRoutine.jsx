import { useState, useCallback } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'

const ROUTINE_STEPS = [
  { id: 1, text: 'Acordar as 7h', emoji: '⏰', time: '07:00' },
  { id: 2, text: 'Tomar banho e escovar os dentes', emoji: '🪥', time: '07:15' },
  { id: 3, text: 'Vestir-se', emoji: '👕', time: '07:30' },
  { id: 4, text: 'Tomar o pequeno-almoco', emoji: '🥣', time: '07:45' },
  { id: 5, text: 'Ir para a escola', emoji: '🎒', time: '08:00' },
  { id: 6, text: 'Aulas da manha', emoji: '📚', time: '08:30' },
  { id: 7, text: 'Almoco', emoji: '🍽️', time: '12:30' },
  { id: 8, text: 'Aulas da tarde / Treino', emoji: '⚽', time: '14:00' },
  { id: 9, text: 'Lanche', emoji: '🍎', time: '16:30' },
  { id: 10, text: 'Tempo livre / Brincar', emoji: '🎮', time: '17:00' },
  { id: 11, text: 'Jantar', emoji: '🍲', time: '19:00' },
  { id: 12, text: 'Preparar para dormir', emoji: '🌙', time: '20:30' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function DailyRoutine({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const [ordered, setOrdered] = useState([])
  const [remaining, setRemaining] = useState(() => shuffle(ROUTINE_STEPS))
  const [feedback, setFeedback] = useState(null)

  const nextExpected = ROUTINE_STEPS[ordered.length]
  const isComplete = ordered.length === ROUTINE_STEPS.length

  const handleSelect = useCallback(
    (step) => {
      registerClick()
      if (step.id === nextExpected.id) {
        registerSuccess()
        setOrdered((prev) => [...prev, step])
        setRemaining((prev) => prev.filter((s) => s.id !== step.id))
        if (ordered.length + 1 === ROUTINE_STEPS.length) {
          completeActivity('daily-routine', 3)
          updateCampoProgress('campo4', 5)
        }
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [nextExpected, ordered.length, registerClick, registerSuccess, registerError, completeActivity, updateCampoProgress]
  )

  if (isComplete) {
    return (
      <ActivityShell title="Rotina do Campeao" backPath="/campo/4" color="var(--color-campo4)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>🏆</span>
          <p style={styles.completeText}>A tua rotina esta completa!</p>
          <div style={styles.routineList}>
            {ROUTINE_STEPS.map((s) => (
              <div key={s.id} style={styles.routineItem}>
                <span>{s.emoji}</span>
                <span style={styles.routineTime}>{s.time}</span>
                <span>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Rotina do Campeao"
      instruction="Organiza a rotina diaria pela ordem correcta. O que vem a seguir?"
      backPath="/campo/4"
      color="var(--color-campo4)"
      score={ordered.length}
      total={ROUTINE_STEPS.length}
    >
      {ordered.length > 0 && (
        <div style={styles.orderedList}>
          {ordered.map((s, i) => (
            <div key={s.id} style={styles.orderedItem}>
              <span style={styles.stepNum}>{i + 1}</span>
              <span>{s.emoji}</span>
              <span style={styles.stepText}>{s.text}</span>
              <span style={styles.stepTime}>{s.time}</span>
            </div>
          ))}
        </div>
      )}

      <p style={styles.prompt}>
        Passo {ordered.length + 1}: O que vem a seguir?
      </p>

      <div style={styles.optionsList}>
        {remaining.slice(0, adaptive?.choiceCount || 4).map((step) => (
          <button
            key={step.id}
            style={styles.optionBtn}
            onClick={() => handleSelect(step)}
            disabled={feedback !== null}
          >
            <span style={styles.optionEmoji}>{step.emoji}</span>
            <span>{step.text}</span>
          </button>
        ))}
      </div>

      <FeedbackMessage
        type={feedback}
        visible={feedback !== null}
        onDismiss={() => setFeedback(null)}
      />
    </ActivityShell>
  )
}

const styles = {
  orderedList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: 'var(--space-sm)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
    maxHeight: '150px',
    overflowY: 'auto',
  },
  orderedItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    fontSize: 'var(--font-size-sm)',
    padding: '4px var(--space-sm)',
  },
  stepNum: {
    width: '20px',
    height: '20px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--color-campo4)',
    color: 'white',
    fontSize: '0.7rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepText: { flex: 1 },
  stepTime: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    flexShrink: 0,
  },
  prompt: {
    fontWeight: 700,
    color: 'var(--color-campo4)',
    fontSize: 'var(--font-size-lg)',
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  optionBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
  },
  optionEmoji: { fontSize: '1.5rem', flexShrink: 0 },
  complete: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-xl)',
  },
  completeEmoji: { fontSize: '4rem' },
  completeText: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-primary)',
  },
  routineList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: '100%',
  },
  routineItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    fontSize: 'var(--font-size-sm)',
    padding: '4px 0',
  },
  routineTime: {
    color: 'var(--color-text-secondary)',
    fontSize: 'var(--font-size-sm)',
    minWidth: '40px',
  },
}
