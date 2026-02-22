import { useState, useCallback, useMemo, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import { getContent } from '../../data/universeContent'
import { useTTS } from '../../hooks/useTTS'

function generateProblem(items) {
  const item = items[Math.floor(Math.random() * items.length)]
  const paid = [50, 100, 200][Math.floor(Math.random() * 3)]
  if (paid < item.price) return generateProblem(items)
  const change = paid - item.price
  return { item, paid, change }
}

const TOTAL = 6

export default function TicketShop({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const content = getContent(adaptive?.universe?.id)
  const choiceCount = adaptive?.choiceCount || 4
  const { speak } = useTTS()
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const problem = useMemo(() => generateProblem(content.shop.items), [round, content.shop.items])

  useEffect(() => {
    if (round < TOTAL) {
      speak(`Queres comprar ${problem.item.name} por ${problem.item.price} meticais. Pagas com ${problem.paid} meticais. Quanto e o troco?`)
    }
  }, [round])

  const options = useMemo(() => {
    const opts = new Set([problem.change])
    while (opts.size < choiceCount) {
      const offset = (Math.floor(Math.random() * 4) + 1) * 10
      const sign = Math.random() > 0.5 ? 1 : -1
      const o = problem.change + sign * offset
      if (o >= 0) opts.add(o)
    }
    const arr = [...opts]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [problem])

  const handleAnswer = useCallback(
    (ans) => {
      registerClick()
      if (ans === problem.change) {
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
    updateCampoProgress('campo2', next + 14)
    if (next >= TOTAL) {
      completeActivity('ticket-shop', score >= 5 ? 3 : score >= 3 ? 2 : 1)
    }
  }, [round, score, completeActivity, updateCampoProgress])

  if (round >= TOTAL) {
    return (
      <ActivityShell title={content.shop.title} backPath="/campo/2" color="var(--color-campo2)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>🎫</span>
          <p style={styles.completeText}>Fizeste {score} compras correctas!</p>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title={content.shop.title}
      instruction={`Queres comprar ${problem.item.name} por ${problem.item.price} MT. Pagas com ${problem.paid} MT. Quanto e o troco?`}
      backPath="/campo/2"
      color="var(--color-campo2)"
      score={score}
      total={TOTAL}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.shopCard}>
        <div style={styles.itemDisplay}>
          <span style={styles.itemEmoji}>{problem.item.emoji}</span>
          <span style={styles.itemName}>{problem.item.name}</span>
          <span style={styles.itemPrice}>{problem.item.price} MT</span>
        </div>
        <div style={styles.paymentRow}>
          <span>Pagas: <strong>{problem.paid} MT</strong></span>
          <span>Troco: <strong>? MT</strong></span>
        </div>
      </div>

      <div style={styles.optionsGrid}>
        {options.map((opt) => (
          <button
            key={opt}
            style={styles.optionBtn}
            onClick={() => handleAnswer(opt)}
            disabled={feedback !== null}
          >
            {opt} MT
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
  shopCard: {
    padding: 'var(--space-lg)',
    backgroundColor: '#FFF3E0',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo2)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  itemDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  itemEmoji: { fontSize: '3rem' },
  itemName: { fontSize: 'var(--font-size-lg)', fontWeight: 700 },
  itemPrice: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-campo2)',
  },
  paymentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 'var(--font-size-base)',
    padding: 'var(--space-sm) 0',
    borderTop: '1px dashed var(--color-border)',
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
