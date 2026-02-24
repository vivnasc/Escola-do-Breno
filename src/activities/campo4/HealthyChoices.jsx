import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { getContent } from '../../data/universeContent'
import { useTTS } from '../../hooks/useTTS'

const SCENARIOS = [
  {
    situation: 'É hora do lanche. O que escolhes?',
    emoji: '🍎',
    options: [
      { text: 'Fruta fresca', correct: true },
      { text: 'Doces e chocolates', correct: false },
      { text: 'Nada', correct: false },
    ],
    explanation: 'A fruta fresca dá-te vitaminas e energia para brincar e aprender!',
  },
  {
    situation: 'Acabaste de brincar no parque. O que fazes?',
    emoji: '🧼',
    options: [
      { text: 'Lavo as mãos antes de comer', correct: true },
      { text: 'Como logo sem lavar', correct: false },
      { text: 'Limpo no casaco', correct: false },
    ],
    explanation: 'Lavar as mãos remove os germes e protege-te de ficares doente.',
  },
  {
    situation: 'Estás com sede. O que bebes?',
    emoji: '💧',
    options: [
      { text: 'Água', correct: true },
      { text: 'Refrigerante', correct: false },
      { text: 'Sumo com muito açúcar', correct: false },
    ],
    explanation: 'A água é a melhor bebida para o teu corpo. Mantém-te hidratado e com energia!',
  },
  {
    situation: 'É hora de dormir mas queres ver TV. O que fazes?',
    emoji: '🌙',
    options: [
      { text: 'Vou dormir porque o corpo precisa de descanso', correct: true },
      { text: 'Fico a ver TV até tarde', correct: false },
      { text: 'Escondo-me para não me verem', correct: false },
    ],
    explanation: 'Dormir bem ajuda o cérebro a aprender e o corpo a crescer forte.',
  },
  {
    situation: 'Um amigo oferece-te um cigarro. O que dizes?',
    emoji: '🚭',
    options: [
      { text: 'Não obrigado, faz mal à saúde', correct: true },
      { text: 'Experimento só um', correct: false },
      { text: 'Aceito para ser fixe', correct: false },
    ],
    explanation: 'Dizer não a coisas que fazem mal é uma escolha corajosa e inteligente!',
  },
  {
    situation: 'Não dormiste bem e estás cansado. O que fazes?',
    emoji: '😴',
    options: [
      { text: 'Descanso um pouco e durmo mais cedo hoje', correct: true },
      { text: 'Bebo café', correct: false },
      { text: 'Ignoro e continuo', correct: false },
    ],
    explanation: 'Ouvir o corpo quando está cansado é muito importante. Descansar ajuda a recuperar.',
  },
  {
    situation: 'Tens de escolher o almoço. O que escolhes?',
    emoji: '🍽️',
    options: [
      { text: 'Arroz, frango grelhado e salada', correct: true },
      { text: 'Batatas fritas e gelado', correct: false },
      { text: 'Só pão', correct: false },
    ],
    explanation: 'Uma refeição equilibrada com proteína, legumes e hidratos dá energia para o dia todo!',
  },
  {
    situation: 'É manhã. O que fazes primeiro?',
    emoji: '🌅',
    options: [
      { text: 'Escovo os dentes e lavo a cara', correct: true },
      { text: 'Vou jogar', correct: false },
      { text: 'Fico na cama', correct: false },
    ],
    explanation: 'Começar o dia com higiene ajuda a sentires-te fresco e preparado!',
  },
  {
    situation: 'Estás ao sol há muito tempo. O que fazes?',
    emoji: '☀️',
    options: [
      { text: 'Ponho protetor solar e bebo água', correct: true },
      { text: 'Continuo ao sol', correct: false },
      { text: 'Não faz mal', correct: false },
    ],
    explanation: 'O protetor solar protege a pele e a água mantém o corpo hidratado no calor.',
  },
  {
    situation: 'Sentes-te mal. O que fazes?',
    emoji: '🤒',
    options: [
      { text: 'Digo a um adulto como me sinto', correct: true },
      { text: 'Não digo nada', correct: false },
      { text: 'Finjo que estou bem', correct: false },
    ],
    explanation: 'Quando não nos sentimos bem, é importante dizer a um adulto para nos poder ajudar.',
  },
]

export default function HealthyChoices({
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
  const [showExplanation, setShowExplanation] = useState(false)

  const current = SCENARIOS[idx]
  const isComplete = idx >= SCENARIOS.length

  useEffect(() => {
    if (!isComplete) {
      speak(current.situation, { auto: true })
    }
  }, [idx])

  const handleAnswer = useCallback(
    (option) => {
      registerClick()
      if (option.correct) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
        setShowExplanation(true)
        speak(current.explanation)
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [current, registerClick, registerSuccess, registerError, speak]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    setShowExplanation(false)
    const next = idx + 1
    setIdx(next)
    updateCampoProgress('campo4', next)
    if (next >= SCENARIOS.length) {
      completeActivity('healthy-choices', score >= 8 ? 3 : score >= 5 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  const finalStars = score >= 8 ? 3 : score >= 5 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Escolhas Saudáveis" backPath="/campo/4" color="var(--color-campo4)">
        <CompletionCelebration
          emoji="💪"
          title="Sabes fazer escolhas saudáveis!"
          score={score}
          total={SCENARIOS.length}
          stars={finalStars}
          color="var(--color-campo4)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Escolhas Saudáveis"
      instruction={current.situation}
      backPath="/campo/4"
      color="var(--color-campo4)"
      score={score}
      total={SCENARIOS.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.scenarioCard}>
        <span style={styles.scenarioEmoji}>{current.emoji}</span>
        <p style={styles.scenarioText}>{current.situation}</p>
      </div>

      <div style={styles.optionsList}>
        {current.options.map((opt, i) => (
          <button
            key={i}
            className="btn-press"
            style={styles.optionBtn}
            onClick={() => handleAnswer(opt)}
            disabled={feedback !== null}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {showExplanation && (
        <div style={styles.explanationCard} className="animate-slide-up">
          <span style={styles.explanationIcon}>💡</span>
          <p style={styles.explanationText}>{current.explanation}</p>
          <button style={styles.nextBtn} onClick={handleNext}>
            Próximo →
          </button>
        </div>
      )}

      {!showExplanation && (
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
  scenarioCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    backgroundColor: '#F3E5F5',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo4)',
  },
  scenarioEmoji: { fontSize: '3rem' },
  scenarioText: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 1.5,
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
  explanationCard: {
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
  explanationIcon: { fontSize: '1.5rem' },
  explanationText: {
    fontSize: 'var(--font-size-base)',
    lineHeight: 1.6,
    color: 'var(--color-text)',
  },
  nextBtn: {
    padding: 'var(--space-sm) var(--space-lg)',
    backgroundColor: 'var(--color-campo4)',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
  },
}
