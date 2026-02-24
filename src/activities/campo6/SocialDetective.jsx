import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const SCENARIOS = [
  {
    situation: 'A Maria cruza os braços e olha para baixo.',
    emoji: '😔',
    options: [
      { text: 'Está aborrecida ou triste', correct: true },
      { text: 'Está feliz', correct: false },
      { text: 'Está com fome', correct: false },
    ],
    tip: 'Quando alguém cruza os braços e olha para baixo, costuma estar triste ou aborrecido. O corpo fala mesmo sem palavras!',
  },
  {
    situation: 'O João está a sorrir e a acenar.',
    emoji: '😊',
    options: [
      { text: 'Está a dizer olá com alegria', correct: true },
      { text: 'Está zangado', correct: false },
      { text: 'Está com medo', correct: false },
    ],
    tip: 'Um sorriso e um aceno são sinais de alegria e simpatia. É uma forma de dizer "olá, estou contente por te ver!"',
  },
  {
    situation: 'A professora fala devagar e com voz suave.',
    emoji: '🧑‍🏫',
    options: [
      { text: 'Está a tentar acalmar alguém', correct: true },
      { text: 'Está zangada', correct: false },
      { text: 'Está a brincar', correct: false },
    ],
    tip: 'Quando alguém fala devagar e com voz suave, normalmente quer acalmar ou confortar. É uma voz de cuidado.',
  },
  {
    situation: 'O Pedro bate com o pé no chão e suspira.',
    emoji: '😤',
    options: [
      { text: 'Está impaciente ou frustrado', correct: true },
      { text: 'Está contente', correct: false },
      { text: 'Está com sono', correct: false },
    ],
    tip: 'Bater com o pé e suspirar são sinais de impaciência ou frustração. A pessoa pode estar a esperar há muito tempo.',
  },
  {
    situation: 'A Ana abraça-se a si própria e treme.',
    emoji: '🥶',
    options: [
      { text: 'Está com frio ou com medo', correct: true },
      { text: 'Está alegre', correct: false },
      { text: 'Está aborrecida', correct: false },
    ],
    tip: 'Abraçar-se e tremer pode significar frio ou medo. Quando vemos alguém assim, podemos oferecer ajuda!',
  },
  {
    situation: 'O Miguel ri alto e bate palmas.',
    emoji: '😂',
    options: [
      { text: 'Está muito divertido', correct: true },
      { text: 'Está triste', correct: false },
      { text: 'Está confuso', correct: false },
    ],
    tip: 'Rir alto e bater palmas são sinais claros de diversão e alegria. A pessoa está a passar um bom momento!',
  },
  {
    situation: 'A Sofia vira a cara e não responde.',
    emoji: '😶',
    options: [
      { text: 'Pode estar magoada ou zangada', correct: true },
      { text: 'Está feliz', correct: false },
      { text: 'Está com fome', correct: false },
    ],
    tip: 'Quando alguém vira a cara e não responde, pode estar magoado ou zangado. Às vezes as pessoas precisam de espaço antes de falar.',
  },
  {
    situation: 'O Tomás inclina a cabeça e faz uma cara confusa.',
    emoji: '🤔',
    options: [
      { text: 'Não entendeu alguma coisa', correct: true },
      { text: 'Está zangado', correct: false },
      { text: 'Está contente', correct: false },
    ],
    tip: 'Inclinar a cabeça e fazer cara confusa são sinais de que a pessoa não percebeu. Podemos explicar de outra forma!',
  },
  {
    situation: 'A Inês aperta os punhos e fica vermelha.',
    emoji: '😡',
    options: [
      { text: 'Está muito zangada', correct: true },
      { text: 'Está feliz', correct: false },
      { text: 'Está com sono', correct: false },
    ],
    tip: 'Apertar os punhos e ficar vermelho são sinais fortes de raiva. É melhor dar espaço e falar quando a pessoa estiver mais calma.',
  },
  {
    situation: 'O Rui baixa os olhos e fala muito baixinho.',
    emoji: '😳',
    options: [
      { text: 'Está envergonhado ou tímido', correct: true },
      { text: 'Está entusiasmado', correct: false },
      { text: 'Está aborrecido', correct: false },
    ],
    tip: 'Baixar os olhos e falar baixinho são sinais de vergonha ou timidez. Podemos ser gentis e deixar a pessoa à vontade.',
  },
]

export default function SocialDetective({
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
  const [showTip, setShowTip] = useState(false)

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
        setShowTip(true)
        speak(current.tip)
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [current, registerClick, registerSuccess, registerError, speak]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    setShowTip(false)
    const next = idx + 1
    setIdx(next)
    updateCampoProgress('campo6', next)
    if (next >= SCENARIOS.length) {
      completeActivity('social-detective', score >= 7 ? 3 : score >= 5 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  const finalStars = score >= 7 ? 3 : score >= 5 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Detetive Social" backPath="/campo/6" color="var(--color-campo6)">
        <CompletionCelebration
          emoji="🔍"
          title="És um verdadeiro detetive social!"
          score={score}
          total={SCENARIOS.length}
          stars={finalStars}
          color="var(--color-campo6)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Detetive Social"
      instruction="O que achas que esta pessoa está a sentir?"
      backPath="/campo/6"
      color="var(--color-campo6)"
      score={score}
      total={SCENARIOS.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.scenarioCard}>
        <span style={styles.scenarioEmoji}>{current.emoji}</span>
        <p style={styles.scenarioText}>{current.situation}</p>
      </div>

      <p style={styles.prompt}>O que está a acontecer?</p>

      <div style={styles.optionsList}>
        {current.options.map((opt, i) => (
          <button
            key={i}
            style={styles.optionBtn}
            className="btn-press"
            onClick={() => handleAnswer(opt)}
            disabled={feedback !== null}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {showTip && (
        <div style={styles.tipCard} className="animate-slide-up">
          <span style={styles.tipIcon}>💡</span>
          <p style={styles.tipText}>{current.tip}</p>
          <button style={styles.nextBtn} onClick={handleNext}>
            Próximo →
          </button>
        </div>
      )}

      {!showTip && (
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
    backgroundColor: '#FCE4EC',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo6)',
  },
  scenarioEmoji: { fontSize: '3rem' },
  scenarioText: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 1.5,
  },
  prompt: {
    fontWeight: 700,
    textAlign: 'center',
    color: 'var(--color-campo6)',
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
  tipCard: {
    padding: 'var(--space-lg)',
    backgroundColor: '#F3E5F5',
    borderRadius: 'var(--radius-md)',
    border: '2px solid #CE93D8',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    textAlign: 'center',
  },
  tipIcon: { fontSize: '1.5rem' },
  tipText: {
    fontSize: 'var(--font-size-base)',
    lineHeight: 1.6,
    color: 'var(--color-text)',
  },
  nextBtn: {
    padding: 'var(--space-sm) var(--space-lg)',
    backgroundColor: 'var(--color-campo6)',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
  },
}
