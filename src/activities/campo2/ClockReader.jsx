import { useState, useCallback, useMemo } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'

function generateClockProblem() {
  const hours = Math.floor(Math.random() * 12) + 1
  const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)]
  const display = `${hours}:${minutes.toString().padStart(2, '0')}`
  const context = [
    `O jogo comeca as ${display}. Que horas sao?`,
    `O treino e as ${display}. Consegues ler o relogio?`,
    `O autocarro parte as ${display}. A que horas?`,
  ][Math.floor(Math.random() * 3)]
  return { hours, minutes, display, context }
}

function ClockFace({ hours, minutes }) {
  const hourAngle = ((hours % 12) + minutes / 60) * 30 - 90
  const minuteAngle = minutes * 6 - 90

  return (
    <svg viewBox="0 0 200 200" width="180" height="180" style={{ display: 'block', margin: '0 auto' }}>
      <circle cx="100" cy="100" r="95" fill="#F5F5F5" stroke="#2E7D32" strokeWidth="4" />
      {[...Array(12)].map((_, i) => {
        const angle = ((i + 1) * 30 - 90) * (Math.PI / 180)
        const x = 100 + 75 * Math.cos(angle)
        const y = 100 + 75 * Math.sin(angle)
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central"
            fontSize="16" fontWeight="700" fill="#333" fontFamily="Quicksand">
            {i + 1}
          </text>
        )
      })}
      {/* Hour hand */}
      <line
        x1="100" y1="100"
        x2={100 + 45 * Math.cos(hourAngle * Math.PI / 180)}
        y2={100 + 45 * Math.sin(hourAngle * Math.PI / 180)}
        stroke="#333" strokeWidth="6" strokeLinecap="round"
      />
      {/* Minute hand */}
      <line
        x1="100" y1="100"
        x2={100 + 65 * Math.cos(minuteAngle * Math.PI / 180)}
        y2={100 + 65 * Math.sin(minuteAngle * Math.PI / 180)}
        stroke="#E65100" strokeWidth="4" strokeLinecap="round"
      />
      <circle cx="100" cy="100" r="5" fill="#333" />
    </svg>
  )
}

const TOTAL = 6

export default function ClockReader({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const choiceCount = adaptive?.choiceCount || 4
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const problem = useMemo(() => generateClockProblem(), [round])
  const isComplete = round >= TOTAL

  const options = useMemo(() => {
    const correct = problem.display
    const wrongs = new Set()
    while (wrongs.size < choiceCount - 1) {
      const h = Math.floor(Math.random() * 12) + 1
      const m = [0, 15, 30, 45][Math.floor(Math.random() * 4)]
      const d = `${h}:${m.toString().padStart(2, '0')}`
      if (d !== correct) wrongs.add(d)
    }
    const all = [correct, ...wrongs]
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[all[i], all[j]] = [all[j], all[i]]
    }
    return all
  }, [problem])

  const handleAnswer = useCallback(
    (ans) => {
      registerClick()
      if (ans === problem.display) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [problem, registerClick, registerSuccess, registerError]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    const next = round + 1
    setRound(next)
    updateCampoProgress('campo2', next + 10)
    if (next >= TOTAL) {
      completeActivity('clock-reader', score >= 5 ? 3 : score >= 3 ? 2 : 1)
    }
  }, [round, score, completeActivity, updateCampoProgress])

  if (isComplete) {
    return (
      <ActivityShell title="Hora do Jogo" backPath="/campo/2" color="var(--color-campo2)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>⏰</span>
          <p style={styles.completeText}>Acertaste {score} de {TOTAL}!</p>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Hora do Jogo"
      instruction={problem.context}
      backPath="/campo/2"
      color="var(--color-campo2)"
      score={score}
      total={TOTAL}
    >
      <ClockFace hours={problem.hours} minutes={problem.minutes} />

      <div style={styles.optionsGrid}>
        {options.map((opt) => (
          <button
            key={opt}
            style={styles.optionBtn}
            onClick={() => handleAnswer(opt)}
            disabled={feedback !== null}
          >
            {opt}
          </button>
        ))}
      </div>

      <FeedbackMessage
        type={feedback}
        visible={feedback !== null}
        onDismiss={feedback === 'success' ? handleNext : () => setFeedback(null)}
      />
    </ActivityShell>
  )
}

const styles = {
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-md)',
  },
  optionBtn: {
    padding: 'var(--space-lg)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    cursor: 'pointer',
    textAlign: 'center',
  },
  complete: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-2xl)',
  },
  completeEmoji: { fontSize: '4rem' },
  completeText: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-primary)',
  },
}
