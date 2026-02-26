import { useState, useCallback, useMemo, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { getContent } from '../../data/universeContent'
import { useTTS } from '../../hooks/useTTS'

/**
 * Generate shop problems tiered by competency level.
 *
 * Based on competencies.js milestones for c2-number (Sentido de Número):
 *   L1-2: Conta objectos até 5-10 → prices 1-10, pay exact (no change)
 *   L3:   Soma até 5 → prices 5-20, paid with round note, small change
 *   L4:   Soma e subtrai até 10 → prices 10-30, change up to 20
 *   L5:   Soma e subtrai até 20 → prices 10-50, change up to 40
 *   L6:   Multiplicação básica → prices 20-80, paid 50/100
 *   L7+:  Opera com números até 100 → full prices, paid 100/200
 *
 * Research: Gelman & Gallistel counting principles; Math Recovery (Wright et al.)
 */
function generateProblem(items, campoLevel) {
  const item = items[Math.floor(Math.random() * items.length)]

  let maxPrice, paidOptions
  if (campoLevel <= 2) {
    maxPrice = 10
    paidOptions = [10, 20]
  } else if (campoLevel <= 3) {
    maxPrice = 20
    paidOptions = [20, 50]
  } else if (campoLevel <= 4) {
    maxPrice = 30
    paidOptions = [50]
  } else if (campoLevel <= 5) {
    maxPrice = 50
    paidOptions = [50, 100]
  } else if (campoLevel <= 6) {
    maxPrice = 80
    paidOptions = [50, 100]
  } else {
    maxPrice = 200
    paidOptions = [100, 200]
  }

  // Clamp item price to level-appropriate range
  const price = Math.min(item.price, maxPrice)
  const paid = paidOptions.find(p => p >= price) || paidOptions[paidOptions.length - 1]
  if (paid < price) return generateProblem(items, campoLevel)
  const change = paid - price
  return { item: { ...item, price }, paid, change }
}

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
  const campoLevel = adaptive?.campoLevel?.campo2 || 1
  const { speak } = useTTS()
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const TOTAL = campoLevel <= 3 ? 5 : campoLevel <= 6 ? 6 : 8

  const problem = useMemo(() => generateProblem(content.shop.items, campoLevel), [round, content.shop.items, campoLevel])

  useEffect(() => {
    if (round < TOTAL) {
      speak(`Queres comprar ${problem.item.name} por ${problem.item.price} meticais. Pagas com ${problem.paid} meticais. Quanto é o troco?`, { auto: true })
    }
  }, [round])

  // Distractors with level-appropriate offsets
  const options = useMemo(() => {
    const opts = new Set([problem.change])
    // At low levels, small offsets (5/10); at high levels, larger (10/20/30)
    const step = campoLevel <= 3 ? 5 : 10
    while (opts.size < choiceCount) {
      const offset = (Math.floor(Math.random() * 4) + 1) * step
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
  }, [problem, choiceCount, campoLevel])

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

  const finalStars = score >= 5 ? 3 : score >= 3 ? 2 : 1

  if (round >= TOTAL) {
    return (
      <ActivityShell title={content.shop.title} backPath="/campo/2" color="var(--color-campo2)">
        <CompletionCelebration
          emoji="🎫"
          title={`Fizeste ${score} compras correctas!`}
          score={score}
          total={TOTAL}
          stars={finalStars}
          color="var(--color-campo2)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title={content.shop.title}
      instruction={`Queres comprar ${problem.item.name} por ${problem.item.price} MT. Pagas com ${problem.paid} MT. Quanto é o troco?`}
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
            className="btn-press"
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
