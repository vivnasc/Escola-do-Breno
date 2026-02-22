import { useState, useCallback, useMemo } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import { getContent } from '../../data/universeContent'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function EmotionCards({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const content = getContent(adaptive?.universe?.id)
  const SITUATIONS = useMemo(() => shuffle(content.emotions), [content.emotions])

  const [idx, setIdx] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [showStrategy, setShowStrategy] = useState(false)
  const [score, setScore] = useState(0)

  const current = SITUATIONS[idx]
  const isComplete = idx >= SITUATIONS.length

  const handleAnswer = useCallback(
    (emotion) => {
      registerClick()
      if (emotion.correct) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
        setShowStrategy(true)
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [registerClick, registerSuccess, registerError]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    setShowStrategy(false)
    const next = idx + 1
    setIdx(next)
    updateCampoProgress('campo4', next + 11)
    if (next >= SITUATIONS.length) {
      completeActivity('emotion-cards', score >= 5 ? 3 : score >= 3 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  if (isComplete) {
    return (
      <ActivityShell title="Cartoes das Emocoes" backPath="/campo/4" color="var(--color-campo4)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>🟨</span>
          <p style={styles.completeText}>Sabes gerir as tuas emocoes!</p>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Cartoes das Emocoes"
      instruction={`Como te sentes nesta situacao?`}
      backPath="/campo/4"
      color="var(--color-campo4)"
      score={score}
      total={SITUATIONS.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.situationCard}>
        <span style={styles.situationEmoji}>{current.emoji}</span>
        <p style={styles.situationText}>{current.situation}</p>
      </div>

      <p style={styles.prompt}>Que emocao sentes?</p>

      <div style={styles.emotionsGrid}>
        {current.emotions.map((emotion) => (
          <button
            key={emotion.name}
            style={styles.emotionBtn}
            onClick={() => handleAnswer(emotion)}
            disabled={feedback !== null}
          >
            <span style={styles.emotionEmoji}>{emotion.emoji}</span>
            <span style={styles.emotionName}>{emotion.name}</span>
          </button>
        ))}
      </div>

      {showStrategy && (
        <div style={styles.strategyCard} className="animate-slide-up">
          <h3 style={styles.strategyTitle}>O que podes fazer:</h3>
          <p style={styles.strategyText}>{current.strategy}</p>
          <button style={styles.nextBtn} onClick={handleNext}>
            Proximo →
          </button>
        </div>
      )}

      {!showStrategy && (
        <FeedbackMessage
          type={feedback}
          visible={feedback !== null}
          onDismiss={() => setFeedback(null)}
          universe={adaptive?.universe}
        />
      )}
    </ActivityShell>
  )
}

const styles = {
  situationCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    backgroundColor: '#F3E5F5',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo4)',
  },
  situationEmoji: { fontSize: '3rem' },
  situationText: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 1.5,
  },
  prompt: {
    fontWeight: 700,
    textAlign: 'center',
    color: 'var(--color-campo4)',
  },
  emotionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--space-md)',
  },
  emotionBtn: {
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
  emotionEmoji: { fontSize: '2.5rem' },
  emotionName: {
    fontWeight: 600,
    fontSize: 'var(--font-size-sm)',
  },
  strategyCard: {
    padding: 'var(--space-lg)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-md)',
    border: '2px solid var(--color-success)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    textAlign: 'center',
  },
  strategyTitle: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 700,
    color: 'var(--color-primary-dark)',
  },
  strategyText: { fontSize: 'var(--font-size-base)', lineHeight: 1.6 },
  nextBtn: {
    padding: 'var(--space-sm) var(--space-lg)',
    backgroundColor: 'var(--color-campo4)',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
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
