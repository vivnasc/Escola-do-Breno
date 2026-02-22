import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import { useTTS } from '../../hooks/useTTS'

const FACTS = [
  {
    question: 'Qual e a capital de Mocambique?',
    options: ['Maputo', 'Beira', 'Nampula', 'Lisboa'],
    correct: 'Maputo',
    fact: 'Maputo e a capital de Mocambique. O grande Eusebio nasceu em Mocambique!',
  },
  {
    question: 'Em que continente fica Mocambique?',
    options: ['Africa', 'Asia', 'Europa', 'Oceania'],
    correct: 'Africa',
    fact: 'Mocambique fica na Africa oriental, banhado pelo Oceano Indico!',
  },
  {
    question: 'Qual e o maior rio de Africa?',
    options: ['Nilo', 'Amazonas', 'Danubio', 'Zambeze'],
    correct: 'Nilo',
    fact: 'O Nilo e o rio mais comprido de Africa, com cerca de 6.650 km! O Zambeze tambem passa por Mocambique.',
  },
  {
    question: 'Em que pais fica o Monte Kilimanjaro?',
    options: ['Tanzania', 'Quenia', 'Mocambique', 'Africa do Sul'],
    correct: 'Tanzania',
    fact: 'O Kilimanjaro e a montanha mais alta de Africa, com 5.895 metros! Tanzania e vizinha de Mocambique.',
  },
  {
    question: 'Em que continente fica o Brasil?',
    options: ['America do Sul', 'Europa', 'Africa', 'Asia'],
    correct: 'America do Sul',
    fact: 'O Brasil e o maior pais da America do Sul e tambem fala portugues, como Mocambique!',
  },
  {
    question: 'Quantos continentes existem?',
    options: ['7', '5', '6', '8'],
    correct: '7',
    fact: 'Ha 7 continentes: Europa, Asia, Africa, America do Norte, America do Sul, Oceania e Antartida.',
  },
  {
    question: 'Que oceano banha a costa de Mocambique?',
    options: ['Indico', 'Atlantico', 'Pacifico', 'Artico'],
    correct: 'Indico',
    fact: 'O Oceano Indico banha toda a costa leste de Mocambique. As praias de Mocambique sao lindissimas!',
  },
  {
    question: 'O CAN (Campeonato Africano de Nacoes) e de que desporto?',
    options: ['Futebol', 'Basquetebol', 'Tenis', 'Natacao'],
    correct: 'Futebol',
    fact: 'O CAN e o maior torneio de futebol de Africa. Mocambique ja participou!',
  },
]

export default function WorldExplorer({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [showFact, setShowFact] = useState(false)

  const current = FACTS[idx]
  const isComplete = idx >= FACTS.length

  useEffect(() => {
    if (!isComplete) {
      speak(current.question)
    }
  }, [idx])

  const handleAnswer = useCallback(
    (ans) => {
      registerClick()
      if (ans === current.correct) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
        setShowFact(true)
        speak(current.fact)
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [current, registerClick, registerSuccess, registerError]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    setShowFact(false)
    const next = idx + 1
    setIdx(next)
    updateCampoProgress('campo3', next + 10)
    if (next >= FACTS.length) {
      completeActivity('world-explorer', score >= 6 ? 3 : score >= 4 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  if (isComplete) {
    return (
      <ActivityShell title="Explorador do Mundo" backPath="/campo/3" color="var(--color-campo3)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>🗺️</span>
          <p style={styles.completeText}>Exploraste {score} de {FACTS.length} curiosidades!</p>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Explorador do Mundo"
      instruction={current.question}
      backPath="/campo/3"
      color="var(--color-campo3)"
      score={score}
      total={FACTS.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.questionCard}>
        <span style={styles.questionIcon}>🌍</span>
        <p style={styles.questionText}>{current.question}</p>
      </div>

      <div style={styles.optionsList}>
        {current.options.map((opt) => (
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

      {showFact && (
        <div style={styles.factCard} className="animate-slide-up">
          <span style={styles.factIcon}>💡</span>
          <p style={styles.factText}>{current.fact}</p>
          <button style={styles.nextBtn} onClick={handleNext}>
            Proximo →
          </button>
        </div>
      )}

      {!showFact && (
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
  questionCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo3)',
  },
  questionIcon: { fontSize: '2.5rem' },
  questionText: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    textAlign: 'center',
    color: 'var(--color-text)',
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  optionBtn: {
    width: '100%',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
  },
  factCard: {
    padding: 'var(--space-lg)',
    backgroundColor: '#FFF8E1',
    borderRadius: 'var(--radius-md)',
    border: '2px solid #FFD54F',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    textAlign: 'center',
  },
  factIcon: { fontSize: '1.5rem' },
  factText: {
    fontSize: 'var(--font-size-base)',
    lineHeight: 1.6,
    color: 'var(--color-text)',
  },
  nextBtn: {
    padding: 'var(--space-sm) var(--space-lg)',
    backgroundColor: 'var(--color-campo3)',
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
