import { useState, useCallback, useMemo } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import { getContent } from '../../data/universeContent'

function generateProblem(scenarios) {
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
  const content = getContent(adaptive?.universe?.id)
  const choiceCount = adaptive?.choiceCount || 4
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const problem = useMemo(() => generateProblem(content.division), [round, content.division])
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
      textLevel={adaptive?.textLevel}
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
        universe={adaptive?.universe}
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
