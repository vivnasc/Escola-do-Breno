import { useState, useCallback, useMemo } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'

function generateProblem() {
  const scenarios = [
    { total: 12, groups: 2, context: '12 jogadores divididos em 2 equipas iguais.' },
    { total: 10, groups: 5, context: '10 bolas para 5 jogadores.' },
    { total: 15, groups: 3, context: '15 bidonees de agua para 3 equipas.' },
    { total: 8, groups: 2, context: '8 coletes para 2 grupos de treino.' },
    { total: 20, groups: 4, context: '20 medalhas para 4 equipas vencedoras.' },
    { total: 6, groups: 3, context: '6 pares de luvas para 3 guarda-redes.' },
    { total: 16, groups: 4, context: '16 cones para marcar 4 zonas do campo.' },
    { total: 9, groups: 3, context: '9 jogadores divididos em 3 mini-equipas.' },
  ]
  return scenarios[Math.floor(Math.random() * scenarios.length)]
}

const TOTAL = 8

export default function TeamDivision({
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

  const problem = useMemo(() => generateProblem(), [round])
  const answer = problem.total / problem.groups

  const options = useMemo(() => {
    const opts = new Set([answer])
    while (opts.size < choiceCount) {
      const offset = Math.floor(Math.random() * 5) - 2
      const o = answer + offset
      if (o > 0) opts.add(o)
    }
    const arr = [...opts]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [answer])

  const handleAnswer = useCallback(
    (ans) => {
      registerClick()
      if (ans === answer) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [answer, registerClick, registerSuccess, registerError]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    const next = round + 1
    setRound(next)
    updateCampoProgress('campo2', next + 16)
    if (next >= TOTAL) {
      completeActivity('team-division', score >= 6 ? 3 : score >= 4 ? 2 : 1)
    }
  }, [round, score, completeActivity, updateCampoProgress])

  if (round >= TOTAL) {
    return (
      <ActivityShell title="Divide a Equipa" backPath="/campo/2" color="var(--color-campo2)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>👥</span>
          <p style={styles.completeText}>Dividiste {score} de {TOTAL} correctamente!</p>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Divide a Equipa"
      instruction={problem.context}
      backPath="/campo/2"
      color="var(--color-campo2)"
      score={score}
      total={TOTAL}
    >
      <div style={styles.problemCard}>
        <span style={styles.problemEmoji}>
          {Array(Math.min(problem.total, 16)).fill('🧑').join('')}
        </span>
        <p style={styles.problemText}>
          {problem.total} ÷ {problem.groups} = ?
        </p>
        <p style={styles.contextText}>Quantos ficam em cada grupo?</p>
      </div>

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
  problemCard: {
    padding: 'var(--space-lg)',
    backgroundColor: '#FFF3E0',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo2)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  problemEmoji: {
    fontSize: '1.2rem',
    letterSpacing: '2px',
    lineHeight: 1.8,
    wordBreak: 'break-all',
  },
  problemText: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
    color: 'var(--color-campo2)',
  },
  contextText: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
  },
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
    fontSize: 'var(--font-size-2xl)',
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
