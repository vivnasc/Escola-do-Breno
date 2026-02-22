import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import { useTTS } from '../../hooks/useTTS'

const FACTS = [
  {
    question: 'Quantos continentes existem?',
    options: ['7', '5', '6', '8'],
    correct: '7',
    fact: 'Ha 7 continentes: Europa, Asia, Africa, America do Norte, America do Sul, Oceania e Antartida.',
  },
  {
    question: 'Em que continente fica o Brasil?',
    options: ['America do Sul', 'Europa', 'Africa', 'Asia'],
    correct: 'America do Sul',
    fact: 'O Brasil e o maior pais da America do Sul e ja ganhou 5 Mundiais de futebol!',
  },
  {
    question: 'Qual e o maior rio de Africa?',
    options: ['Nilo', 'Amazonas', 'Danubio', 'Zambeze'],
    correct: 'Nilo',
    fact: 'O Nilo e o rio mais comprido de Africa, com cerca de 6.650 km!',
  },
  {
    question: 'Em que pais fica o Monte Kilimanjaro?',
    options: ['Tanzania', 'Quenia', 'Brasil', 'India'],
    correct: 'Tanzania',
    fact: 'O Kilimanjaro e a montanha mais alta de Africa, com 5.895 metros!',
  },
  {
    question: 'O Mundial de 2022 foi em que pais?',
    options: ['Qatar', 'Russia', 'Brasil', 'Africa do Sul'],
    correct: 'Qatar',
    fact: 'O Qatar esta na Asia. A Argentina ganhou esse Mundial com Messi!',
  },
  {
    question: 'Em que pais fica a Torre Eiffel?',
    options: ['Franca', 'Italia', 'Espanha', 'Alemanha'],
    correct: 'Franca',
    fact: 'A Torre Eiffel fica em Paris, capital da Franca. O PSG joga la!',
  },
  {
    question: 'Qual e o maior oceano do mundo?',
    options: ['Pacifico', 'Atlantico', 'Indico', 'Artico'],
    correct: 'Pacifico',
    fact: 'O Oceano Pacifico e o maior do mundo. Cobre mais area do que todos os continentes juntos!',
  },
  {
    question: 'Em que pais fica a cidade de Buenos Aires?',
    options: ['Argentina', 'Brasil', 'Chile', 'Uruguai'],
    correct: 'Argentina',
    fact: 'Buenos Aires e a capital da Argentina, terra de Maradona e Messi!',
  },
  {
    question: 'Qual e o deserto mais quente do mundo?',
    options: ['Sahara', 'Gobi', 'Atacama', 'Kalahari'],
    correct: 'Sahara',
    fact: 'O Sahara fica em Africa e e quase tao grande como a China! Temperaturas chegam a 58 graus.',
  },
  {
    question: 'Que lingua se fala em Mocambique?',
    options: ['Portugues', 'Espanhol', 'Frances', 'Ingles'],
    correct: 'Portugues',
    fact: 'Mocambique fala portugues e e banhado pelo Oceano Indico. Maputo e a capital!',
  },
  {
    question: 'Qual e a montanha mais alta do mundo?',
    options: ['Evereste', 'Kilimanjaro', 'Aconcagua', 'Mont Blanc'],
    correct: 'Evereste',
    fact: 'O Monte Evereste tem 8.849 metros e fica entre o Nepal e a China!',
  },
  {
    question: 'Que pais tem a forma de uma bota?',
    options: ['Italia', 'Portugal', 'Grecia', 'Croacia'],
    correct: 'Italia',
    fact: 'A Italia tem forma de bota e e famosa por pizza, pasta e futebol! Roma e a capital.',
  },
  {
    question: 'Em que continente vivem os pinguins selvagens?',
    options: ['Antartida', 'Europa', 'Asia', 'America do Norte'],
    correct: 'Antartida',
    fact: 'A Antartida e o continente mais frio. Ninguem vive la permanentemente, so cientistas!',
  },
  {
    question: 'Qual e o rio mais comprido do mundo?',
    options: ['Nilo', 'Amazonas', 'Yangtze', 'Mississippi'],
    correct: 'Nilo',
    fact: 'O Nilo tem cerca de 6.650 km e atravessa 11 paises de Africa!',
  },
  {
    question: 'Em que pais fica a Grande Muralha?',
    options: ['China', 'India', 'Japao', 'Russia'],
    correct: 'China',
    fact: 'A Grande Muralha da China tem mais de 21.000 km! Foi construida ao longo de 2.000 anos.',
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
      completeActivity('world-explorer', score >= 13 ? 3 : score >= 9 ? 2 : 1)
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
