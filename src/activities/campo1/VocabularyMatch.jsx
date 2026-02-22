import { useState, useMemo, useCallback } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { VOCABULARY_WORDS, VOCABULARY_CATEGORIES, getWordContext } from '../../data/vocabulary'
import { useTTS } from '../../hooks/useTTS'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function VocabularyMatch({
  progress,
  markWordLearned,
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  adaptive,
}) {
  const universeId = adaptive?.universe?.id || 'football'
  const choiceCount = adaptive?.choiceCount || 4
  const [categoryIdx, setCategoryIdx] = useState(0)
  const [questionIdx, setQuestionIdx] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [score, setScore] = useState(0)
  const { speakEn } = useTTS()

  const category = VOCABULARY_CATEGORIES[categoryIdx]
  const words = useMemo(
    () => VOCABULARY_WORDS.filter((w) => w.category === category.id),
    [category.id]
  )

  const currentWord = words[questionIdx]

  const options = useMemo(() => {
    if (!currentWord) return []
    const others = VOCABULARY_WORDS.filter(
      (w) => w.id !== currentWord.id && w.category === currentWord.category
    )
    const distractors = shuffle(others).slice(0, choiceCount - 1)
    return shuffle([currentWord, ...distractors])
  }, [currentWord])

  const handleAnswer = useCallback(
    (word) => {
      registerClick()
      if (word.id === currentWord.id) {
        registerSuccess()
        markWordLearned(word.id)
        setScore((s) => s + 1)
        setFeedback('success')
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [currentWord, registerClick, registerSuccess, registerError, markWordLearned]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    if (questionIdx < words.length - 1) {
      setQuestionIdx((i) => i + 1)
    } else if (categoryIdx < VOCABULARY_CATEGORIES.length - 1) {
      setCategoryIdx((i) => i + 1)
      setQuestionIdx(0)
      completeActivity('vocab-match', Math.min(3, Math.ceil(score / 3)))
    } else {
      completeActivity('vocab-match', 3)
    }
  }, [questionIdx, categoryIdx, words.length, score, completeActivity])

  const finalStars = Math.min(3, Math.ceil(score / 3))

  if (!currentWord) {
    return (
      <ActivityShell title="Liga a Palavra" backPath="/campo/1" color="var(--color-campo1)">
        <CompletionCelebration
          emoji="🏆"
          title="Completaste todas as categorias!"
          score={score}
          total={VOCABULARY_WORDS.length}
          stars={finalStars}
          color="var(--color-campo1)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Liga a Palavra"
      instruction={`Qual é a imagem para "${currentWord.en}"?`}
      backPath="/campo/1"
      color="var(--color-campo1)"
      score={score}
      total={VOCABULARY_WORDS.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.categoryBadge}>
        {category.icon} {category.labelPt}
      </div>

      <button
        style={styles.wordDisplay}
        onClick={() => speakEn(currentWord.en)}
        aria-label={`Ouvir: ${currentWord.en}`}
      >
        <span style={styles.wordText}>{currentWord.en}</span>
        <span style={styles.speakerIcon}>🔊</span>
      </button>

      <p style={styles.contextHint}>{getWordContext(currentWord, universeId)}</p>

      <div style={styles.optionsGrid}>
        {options.map((opt) => (
          <button
            key={opt.id}
            className="btn-press"
            style={styles.optionBtn}
            onClick={() => handleAnswer(opt)}
            disabled={feedback !== null}
          >
            <span style={styles.optionEmoji}>{opt.emoji}</span>
            <span style={styles.optionPt}>{opt.pt}</span>
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
  categoryBadge: {
    alignSelf: 'center',
    padding: 'var(--space-xs) var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
  },
  wordDisplay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    backgroundColor: '#E3F2FD',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo1)',
    cursor: 'pointer',
  },
  wordText: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
    color: 'var(--color-campo1)',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  speakerIcon: {
    fontSize: '1.5rem',
  },
  contextHint: {
    textAlign: 'center',
    color: 'var(--color-text-secondary)',
    fontSize: 'var(--font-size-sm)',
    fontStyle: 'italic',
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
    transition: 'all var(--transition-speed)',
  },
  optionEmoji: {
    fontSize: '2.5rem',
  },
  optionPt: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    color: 'var(--color-text)',
  },
  complete: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-2xl)',
    textAlign: 'center',
  },
  completeEmoji: {
    fontSize: '4rem',
  },
  completeText: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-primary)',
  },
}
