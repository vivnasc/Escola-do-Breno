import { useState, useCallback, useMemo, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { getContent } from '../../data/universeContent'
import { useTTS } from '../../hooks/useTTS'

function generateProblem(round, difficulty, mathContent) {
  const ops = difficulty === 1
    ? ['+']
    : difficulty === 3
    ? (round < 3 ? ['+'] : round < 7 ? ['+', '-'] : ['+', '-', '×'])
    : (round < 5 ? ['+'] : ['+', '-'])
  const op = ops[Math.floor(Math.random() * ops.length)]
  const maxNum = difficulty === 1 ? 5 : difficulty === 3 ? 12 : 8

  let a, b, answer
  switch (op) {
    case '+':
      a = Math.floor(Math.random() * maxNum) + 1
      b = Math.floor(Math.random() * maxNum) + 1
      answer = a + b
      break
    case '-':
      answer = Math.floor(Math.random() * (maxNum - 2)) + 1
      b = Math.floor(Math.random() * (maxNum - 2)) + 1
      a = answer + b
      break
    case '×':
      a = Math.floor(Math.random() * 5) + 1
      b = Math.floor(Math.random() * 4) + 1
      answer = a * b
      break
    default:
      a = 2; b = 1; answer = 3
  }

  const context = op === '+'
    ? mathContent.addContext(a, b)
    : op === '-'
    ? mathContent.subContext(a, b)
    : mathContent.mulContext(a, b)

  return { a, b, op, answer, context }
}

function generateOptions(answer, count = 4) {
  const options = new Set([answer])
  while (options.size < count) {
    const offset = Math.floor(Math.random() * 5) - 2
    const opt = answer + offset
    if (opt >= 0 && opt !== answer) options.add(opt)
    if (options.size < 4) options.add(answer + options.size)
  }
  const arr = [...options]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const TOTAL_PROBLEMS = 10

export default function GoalMath({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const choiceCount = adaptive?.choiceCount || 4
  const difficulty = adaptive?.difficulty || 2
  const content = getContent(adaptive?.universe?.id)
  const mathContent = content.math
  const { speak } = useTTS()
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const problem = useMemo(() => generateProblem(round, difficulty, mathContent), [round, difficulty, mathContent])

  const options = useMemo(() => generateOptions(problem.answer, choiceCount), [problem, choiceCount])
  const isComplete = round >= TOTAL_PROBLEMS

  useEffect(() => {
    if (!isComplete) {
      speak(`${problem.a} ${problem.op === '×' ? 'vezes' : problem.op === '+' ? 'mais' : 'menos'} ${problem.b}. ${problem.context}`, { auto: true })
    }
  }, [round])

  const handleAnswer = useCallback(
    (ans) => {
      registerClick()
      if (ans === problem.answer) {
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
    updateCampoProgress('campo2', next)
    if (next >= TOTAL_PROBLEMS) {
      completeActivity('goal-math', score >= 8 ? 3 : score >= 5 ? 2 : 1)
    }
  }, [round, score, completeActivity, updateCampoProgress])

  const finalStars = score >= 8 ? 3 : score >= 5 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title={mathContent.title} backPath="/campo/2" color="var(--color-campo2)">
        <CompletionCelebration
          emoji={mathContent.icon}
          title={`Marcaste ${score} de ${TOTAL_PROBLEMS}!`}
          score={score}
          total={TOTAL_PROBLEMS}
          stars={finalStars}
          color="var(--color-campo2)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title={mathContent.title}
      instruction={problem.context}
      backPath="/campo/2"
      color="var(--color-campo2)"
      score={score}
      total={TOTAL_PROBLEMS}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.problemCard}>
        <span style={styles.problemText}>
          {problem.a} {problem.op} {problem.b} = ?
        </span>
      </div>

      <div style={styles.optionsGrid}>
        {options.map((opt) => (
          <button
            key={opt}
            className="btn-press"
            style={styles.optionBtn}
            onClick={() => handleAnswer(opt)}
            disabled={feedback !== null}
          >
            <span style={styles.optionBall}>{mathContent.icon}</span>
            <span style={styles.optionNumber}>{opt}</span>
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
    padding: 'var(--space-xl)',
    backgroundColor: '#FFF3E0',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo2)',
    textAlign: 'center',
  },
  problemText: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: 700,
    color: 'var(--color-campo2)',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-md)',
  },
  optionBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-lg)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
  },
  optionBall: { fontSize: '1.5rem' },
  optionNumber: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
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
