import { useState, useCallback, useMemo, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const PATTERN_SETS = [
  // Level 1: Simple AB patterns (8 patterns)
  { sequence: ['⚽', '🏀', '⚽', '🏀', '⚽'], answer: '🏀', options: ['🏀', '⚽', '🎾'], level: 1 },
  { sequence: ['🔴', '🔵', '🔴', '🔵', '🔴'], answer: '🔵', options: ['🔵', '🔴', '🟢'], level: 1 },
  { sequence: ['🌙', '⭐', '🌙', '⭐', '🌙'], answer: '⭐', options: ['⭐', '🌙', '☀️'], level: 1 },
  { sequence: ['🍎', '🍌', '🍎', '🍌', '🍎'], answer: '🍌', options: ['🍌', '🍎', '🍊'], level: 1 },
  { sequence: ['🐶', '🐱', '🐶', '🐱', '🐶'], answer: '🐱', options: ['🐱', '🐶', '🐰'], level: 1 },
  { sequence: ['🔵', '🟡', '🔵', '🟡', '🔵'], answer: '🟡', options: ['🟡', '🔵', '🔴'], level: 1 },
  { sequence: ['🌸', '🌼', '🌸', '🌼', '🌸'], answer: '🌼', options: ['🌼', '🌸', '🌻'], level: 1 },
  { sequence: ['🚗', '🚌', '🚗', '🚌', '🚗'], answer: '🚌', options: ['🚌', '🚗', '🚁'], level: 1 },
  // Level 2: ABC patterns (8 patterns)
  { sequence: ['🐕', '🐱', '🐦', '🐕', '🐱'], answer: '🐦', options: ['🐦', '🐕', '🐱', '🐟'], level: 2 },
  { sequence: ['1', '2', '3', '1', '2'], answer: '3', options: ['3', '1', '4', '2'], level: 2 },
  { sequence: ['🔺', '🟦', '⭕', '🔺', '🟦'], answer: '⭕', options: ['⭕', '🔺', '🟦', '🟨'], level: 2 },
  { sequence: ['🍎', '🍌', '🍇', '🍎', '🍌'], answer: '🍇', options: ['🍇', '🍎', '🍌', '🍊'], level: 2 },
  { sequence: ['🌍', '🌙', '⭐', '🌍', '🌙'], answer: '⭐', options: ['⭐', '🌍', '🌙', '☀️'], level: 2 },
  { sequence: ['🔴', '🟢', '🔵', '🔴', '🟢'], answer: '🔵', options: ['🔵', '🔴', '🟢', '🟡'], level: 2 },
  { sequence: ['🐸', '🐝', '🦋', '🐸', '🐝'], answer: '🦋', options: ['🦋', '🐸', '🐝', '🐛'], level: 2 },
  { sequence: ['🎵', '🎶', '🎸', '🎵', '🎶'], answer: '🎸', options: ['🎸', '🎵', '🎶', '🥁'], level: 2 },
  // Level 2: AAB patterns (6 patterns)
  { sequence: ['⚽', '⚽', '🏀', '⚽', '⚽'], answer: '🏀', options: ['🏀', '⚽', '🎾'], level: 2 },
  { sequence: ['👏', '👏', '🦶', '👏', '👏'], answer: '🦶', options: ['🦶', '👏', '✋'], level: 2 },
  { sequence: ['🔴', '🔴', '🔵', '🔴', '🔴'], answer: '🔵', options: ['🔵', '🔴', '🟢'], level: 2 },
  { sequence: ['🌙', '🌙', '☀️', '🌙', '🌙'], answer: '☀️', options: ['☀️', '🌙', '⭐'], level: 2 },
  { sequence: ['🐱', '🐱', '🐕', '🐱', '🐱'], answer: '🐕', options: ['🐕', '🐱', '🐰'], level: 2 },
  { sequence: ['🎵', '🎵', '🥁', '🎵', '🎵'], answer: '🥁', options: ['🥁', '🎵', '🎸'], level: 2 },
  // Level 3: Number sequences (10 patterns)
  { sequence: ['2', '4', '6', '8'], answer: '10', options: ['10', '9', '12', '7'], level: 3 },
  { sequence: ['5', '10', '15', '20'], answer: '25', options: ['25', '30', '22', '21'], level: 3 },
  { sequence: ['1', '3', '5', '7'], answer: '9', options: ['9', '8', '10', '11'], level: 3 },
  { sequence: ['3', '6', '9', '12'], answer: '15', options: ['15', '14', '13', '18'], level: 3 },
  { sequence: ['10', '20', '30', '40'], answer: '50', options: ['50', '45', '60', '100'], level: 3 },
  { sequence: ['1', '4', '7', '10'], answer: '13', options: ['13', '12', '14', '11'], level: 3 },
  { sequence: ['2', '5', '8', '11'], answer: '14', options: ['14', '13', '15', '12'], level: 3 },
  { sequence: ['4', '8', '12', '16'], answer: '20', options: ['20', '18', '24', '22'], level: 3 },
  { sequence: ['100', '90', '80', '70'], answer: '60', options: ['60', '50', '65', '75'], level: 3 },
  { sequence: ['1', '2', '4', '8'], answer: '16', options: ['16', '12', '10', '32'], level: 3 },
  // Level 3: Growing/cycle patterns (6 patterns)
  { sequence: ['🌱', '🌿', '🌸', '🍎'], answer: '🌱', options: ['🌱', '🍎', '🌸', '🌿'], level: 3, note: 'O ciclo recomeça!' },
  { sequence: ['🥚', '🐣', '🐥', '🐔'], answer: '🥚', options: ['🥚', '🐔', '🐣', '🐥'], level: 3, note: 'O ciclo da vida recomeça!' },
  { sequence: ['🌑', '🌓', '🌕', '🌗'], answer: '🌑', options: ['🌑', '🌕', '🌓', '🌗'], level: 3, note: 'As fases da Lua repetem-se!' },
  { sequence: ['❄️', '🌸', '☀️', '🍂'], answer: '❄️', options: ['❄️', '🍂', '☀️', '🌸'], level: 3, note: 'As estações do ano repetem-se!' },
  { sequence: ['🔴', '🟠', '🟡', '🟢', '🔵'], answer: '🟣', options: ['🟣', '🔴', '🟡', '🔵'], level: 3, note: 'As cores do arco-íris!' },
  { sequence: ['1', '1', '2', '3', '5'], answer: '8', options: ['8', '7', '6', '10'], level: 3, note: 'Cada número é a soma dos dois anteriores (Fibonacci)!' },
  // Level 4: ABBA and complex patterns (8 patterns)
  { sequence: ['🔴', '🔵', '🔵', '🔴', '🔴'], answer: '🔵', options: ['🔵', '🔴', '🟢', '🟡'], level: 4 },
  { sequence: ['🐱', '🐕', '🐕', '🐱', '🐱'], answer: '🐕', options: ['🐕', '🐱', '🐰', '🐦'], level: 4 },
  { sequence: ['⚽', '🏀', '🎾', '⚽', '🏀', '🎾', '⚽'], answer: '🏀', options: ['🏀', '⚽', '🎾', '🏐'], level: 4 },
  { sequence: ['🌙', '⭐', '⭐', '🌙', '⭐', '⭐', '🌙'], answer: '⭐', options: ['⭐', '🌙', '☀️', '🌍'], level: 4 },
  { sequence: ['A', 'B', 'C', 'D', 'E', 'F'], answer: 'G', options: ['G', 'H', 'F', 'A'], level: 4 },
  { sequence: ['Z', 'Y', 'X', 'W'], answer: 'V', options: ['V', 'U', 'T', 'S'], level: 4 },
  { sequence: ['50', '45', '40', '35'], answer: '30', options: ['30', '25', '35', '20'], level: 4 },
  { sequence: ['1', '3', '9', '27'], answer: '81', options: ['81', '54', '36', '30'], level: 4, note: 'Cada número é o triplo do anterior!' },
  // Level 5: Advanced mixed patterns (6 patterns)
  { sequence: ['1', '4', '9', '16'], answer: '25', options: ['25', '20', '24', '36'], level: 5, note: 'São quadrados perfeitos: 1x1, 2x2, 3x3, 4x4, 5x5!' },
  { sequence: ['🔴', '🔴', '🔵', '🔵', '🔵', '🔴', '🔴', '🔴'], answer: '🔵', options: ['🔵', '🔴', '🟢', '🟡'], level: 5, note: 'O número de cada cor cresce!' },
  { sequence: ['2', '6', '12', '20'], answer: '30', options: ['30', '28', '24', '32'], level: 5, note: 'A diferença entre números cresce: +4, +6, +8, +10!' },
  { sequence: ['🌱', '🌱', '🌿', '🌿', '🌿', '🌸', '🌸', '🌸', '🌸'], answer: '🍎', options: ['🍎', '🌸', '🌿', '🌱'], level: 5, note: 'Cada símbolo aparece uma vez mais!' },
  { sequence: ['1', '2', '4', '7', '11'], answer: '16', options: ['16', '15', '14', '17'], level: 5, note: 'A diferença entre números cresce: +1, +2, +3, +4, +5!' },
  { sequence: ['3', '5', '9', '17'], answer: '33', options: ['33', '25', '34', '31'], level: 5, note: 'Cada número é o dobro do anterior menos 1!' },
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
  const campoLevel = adaptive?.campoLevel?.campo2 || 1
  const maxLevel = campoLevel <= 2 ? 1 : campoLevel <= 4 ? 2 : campoLevel <= 6 ? 3 : campoLevel <= 8 ? 4 : 5

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
      speak('Observa o padrão. O que vem a seguir?', { auto: true })
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
