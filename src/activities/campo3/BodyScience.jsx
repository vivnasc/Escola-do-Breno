import { useState, useCallback } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'

const QUESTIONS = [
  {
    question: 'Quando corremos, o coracao bate mais rapido. Porquê?',
    options: [
      'Para enviar mais sangue e oxigenio aos musculos',
      'Porque o coracao tem medo',
      'Porque esta a chover',
    ],
    correct: 0,
    fact: 'O coracao de um jogador de futebol pode bater ate 180 vezes por minuto durante um jogo!',
  },
  {
    question: 'Que nutriente da energia rapida antes de um jogo?',
    options: ['Hidratos de carbono (massa, arroz)', 'Sal', 'Agua'],
    correct: 0,
    fact: 'Os jogadores comem massa ou arroz 3 horas antes do jogo para ter energia!',
  },
  {
    question: 'Porque e que os jogadores bebem agua durante o jogo?',
    options: [
      'Para hidratar o corpo e manter a concentracao',
      'Porque tem sede de golos',
      'Para lavar as maos',
    ],
    correct: 0,
    fact: 'Um jogador pode perder ate 2 litros de agua em suor durante um jogo!',
  },
  {
    question: 'O que acontece aos musculos quando fazemos alongamentos?',
    options: [
      'Ficam mais flexiveis e previnem lesoes',
      'Ficam mais pequenos',
      'Mudam de cor',
    ],
    correct: 0,
    fact: 'Os alongamentos antes e depois do treino ajudam a prevenir lesoes!',
  },
  {
    question: 'Porque dormem os jogadores 8-10 horas por noite?',
    options: [
      'Para o corpo recuperar e os musculos crescerem',
      'Porque nao ha nada para fazer',
      'Para sonhar com golos',
    ],
    correct: 0,
    fact: 'Durante o sono, o corpo liberta hormonas que reparam os musculos!',
  },
  {
    question: 'Porque e que a bola curva quando a chutamos de lado?',
    options: [
      'O ar faz pressao diferente de cada lado (efeito Magnus)',
      'Porque a bola quer ir por ali',
      'Porque o vento empurra',
    ],
    correct: 0,
    fact: 'Quando a bola roda, o ar move-se mais rapido de um lado, criando o efeito Magnus!',
  },
]

export default function BodyScience({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [showFact, setShowFact] = useState(false)

  const current = QUESTIONS[idx]
  const isComplete = idx >= QUESTIONS.length

  const handleAnswer = useCallback(
    (ansIdx) => {
      registerClick()
      if (ansIdx === current.correct) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
        setShowFact(true)
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
    updateCampoProgress('campo3', next + 18)
    if (next >= QUESTIONS.length) {
      completeActivity('body-science', score >= 5 ? 3 : score >= 3 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  if (isComplete) {
    return (
      <ActivityShell title="Ciencia do Corpo" backPath="/campo/3" color="var(--color-campo3)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>🫀</span>
          <p style={styles.completeText}>Aprendeste {score} factos sobre o corpo!</p>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Ciencia do Corpo"
      instruction={current.question}
      backPath="/campo/3"
      color="var(--color-campo3)"
      score={score}
      total={QUESTIONS.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.questionCard}>
        <span style={styles.questionIcon}>🫀</span>
        <p style={styles.questionText}>{current.question}</p>
      </div>

      <div style={styles.optionsList}>
        {current.options.map((opt, i) => (
          <button
            key={i}
            style={styles.optionBtn}
            onClick={() => handleAnswer(i)}
            disabled={feedback !== null}
          >
            {opt}
          </button>
        ))}
      </div>

      {showFact && (
        <div style={styles.factCard} className="animate-slide-up">
          <span>💡</span>
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
    lineHeight: 1.4,
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
  factText: { fontSize: 'var(--font-size-base)', lineHeight: 1.6 },
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
