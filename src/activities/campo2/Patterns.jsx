import { useState, useCallback, useMemo, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const PATTERN_SETS = [
  // Level 1: Simple AB patterns
  { sequence: ['⚽', '🏀', '⚽', '🏀', '⚽'], answer: '🏀', options: ['🏀', '⚽', '🎾'], level: 1 },
  { sequence: ['🔴', '🔵', '🔴', '🔵', '🔴'], answer: '🔵', options: ['🔵', '🔴', '🟢'], level: 1 },
  { sequence: ['🌙', '⭐', '🌙', '⭐', '🌙'], answer: '⭐', options: ['⭐', '🌙', '☀️'], level: 1 },
  // Level 2: ABC patterns
  { sequence: ['🐕', '🐱', '🐦', '🐕', '🐱'], answer: '🐦', options: ['🐦', '🐕', '🐱', '🐟'], level: 2 },
  { sequence: ['1', '2', '3', '1', '2'], answer: '3', options: ['3', '1', '4', '2'], level: 2 },
  { sequence: ['🔺', '🟦', '⭕', '🔺', '🟦'], answer: '⭕', options: ['⭕', '🔺', '🟦', '🟨'], level: 2 },
  // Level 2: AAB patterns
  { sequence: ['⚽', '⚽', '🏀', '⚽', '⚽'], answer: '🏀', options: ['🏀', '⚽', '🎾'], level: 2 },
  { sequence: ['👏', '👏', '🦶', '👏', '👏'], answer: '🦶', options: ['🦶', '👏', '✋'], level: 2 },
  // Level 3: Number sequences
  { sequence: ['2', '4', '6', '8'], answer: '10', options: ['10', '9', '12', '7'], level: 3 },
  { sequence: ['5', '10', '15', '20'], answer: '25', options: ['25', '30', '22', '21'], level: 3 },
  { sequence: ['1', '3', '5', '7'], answer: '9', options: ['9', '8', '10', '11'], level: 3 },
  // Level 3: Growing patterns
  { sequence: ['🌱', '🌿', '🌸', '🍎'], answer: '🌱', options: ['🌱', '🍎', '🌸', '🌿'], level: 3, note: 'O ciclo recomeça!' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Patterns({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const difficulty = adaptive?.difficulty || 1
  const maxLevel = difficulty === 1 ? 1 : difficulty === 2 ? 2 : 3

  const items = useMemo(
    () => shuffle(PATTERN_SETS.filter((p) => p.level <= maxLevel)).slice(0, 8),
    [maxLevel]
  )

  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const current = items[idx]
  const isComplete = idx >= items.length

  useEffect(() => {
    if (!isComplete && current) {
      speak('Observa o padrão. O que vem a seguir?')
    }
  }, [idx])

  const handleAnswer = useCallback(
    (ans) => {
      registerClick()
      if (ans === current.answer) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
        speak(current.note || 'Muito bem! Encontraste o padrão!')
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [current, registerClick, registerSuccess, registerError, speak]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    const next = idx + 1
    setIdx(next)
    updateCampoProgress('campo2', next + 20)
    if (next >= items.length) {
      completeActivity('patterns', score >= 7 ? 3 : score >= 5 ? 2 : 1)
    }
  }, [idx, score, items.length, completeActivity, updateCampoProgress])

  const finalStars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Padrões e Sequências" backPath="/campo/2" color="var(--color-campo2)">
        <CompletionCelebration
          emoji="🧩"
          title={`Descobriste ${score} padrões!`}
          score={score}
          total={items.length}
          stars={finalStars}
          color="var(--color-campo2)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Padrões e Sequências"
      instruction="Observa o padrão. O que vem a seguir?"
      backPath="/campo/2"
      color="var(--color-campo2)"
      score={score}
      total={items.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.patternRow}>
        {current.sequence.map((item, i) => (
          <span key={i} style={styles.patternItem}>
            {item}
          </span>
        ))}
        <span style={styles.patternMissing}>?</span>
      </div>

      <div style={styles.optionsGrid}>
        {current.options.map((opt) => (
          <button
            key={opt}
            className="btn-press"
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
  patternRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-xl)',
    backgroundColor: '#FFF3E0',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo2)',
    flexWrap: 'wrap',
  },
  patternItem: {
    fontSize: '2.5rem',
    padding: 'var(--space-xs)',
  },
  patternMissing: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: 'var(--color-campo2)',
    backgroundColor: '#FFE0B2',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-xs) var(--space-md)',
    border: '2px dashed var(--color-campo2)',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: 'var(--space-md)',
    marginTop: 'var(--space-lg)',
  },
  optionBtn: {
    padding: 'var(--space-lg)',
    fontSize: '2rem',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
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
