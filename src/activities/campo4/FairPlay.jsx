import { useState, useCallback } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'

const SCENARIOS = [
  {
    situation: 'Um colega marca um golo contra a tua equipa. O que fazes?',
    emoji: '⚽',
    options: [
      { text: 'Dou-lhe os parabens e continuo a jogar', correct: true },
      { text: 'Fico zangado e nao falo com ele', correct: false },
      { text: 'Saio do jogo', correct: false },
    ],
    lesson: 'No fair play, felicitamos o adversario. Um bom jogador sabe perder com dignidade!',
  },
  {
    situation: 'O treinador poe-te no banco. Como reages?',
    emoji: '🪑',
    options: [
      { text: 'Espero a minha vez e apoio a equipa', correct: true },
      { text: 'Reclamo e grito com o treinador', correct: false },
      { text: 'Vou-me embora', correct: false },
    ],
    lesson: 'Todos os jogadores passam pelo banco. E um momento para observar e aprender!',
  },
  {
    situation: 'Um colega novo chega a equipa e nao conhece ninguem. O que fazes?',
    emoji: '👋',
    options: [
      { text: 'Apresento-me e convido-o para brincar', correct: true },
      { text: 'Ignoro-o', correct: false },
      { text: 'Gozar com ele porque nao sabe jogar', correct: false },
    ],
    lesson: 'Receber bem os novos colegas e uma qualidade de um grande capitao de equipa!',
  },
  {
    situation: 'A tua equipa ganha o jogo. Como celebras?',
    emoji: '🎉',
    options: [
      { text: 'Celebro com a equipa e cumprimento os adversarios', correct: true },
      { text: 'Gozar com a equipa que perdeu', correct: false },
      { text: 'Celebrar sozinho e gabar-me', correct: false },
    ],
    lesson: 'Os melhores jogadores do mundo celebram com a equipa e respeitam os adversarios!',
  },
  {
    situation: 'Nao entendes uma regra do jogo. O que fazes?',
    emoji: '❓',
    options: [
      { text: 'Pergunto ao treinador ou professor', correct: true },
      { text: 'Finjo que sei e continuo', correct: false },
      { text: 'Fico calado e nao jogo mais', correct: false },
    ],
    lesson: 'Pedir ajuda e corajoso! Ate os jogadores profissionais pedem ajuda ao treinador.',
  },
  {
    situation: 'Um colega esta triste porque perdeu o jogo. O que fazes?',
    emoji: '😢',
    options: [
      { text: 'Digo-lhe que jogou bem e que da proxima vez sera melhor', correct: true },
      { text: 'Rio-me dele', correct: false },
      { text: 'Nao faco nada, nao e comigo', correct: false },
    ],
    lesson: 'Apoiar os colegas quando estao tristes mostra que es um verdadeiro amigo e jogador de equipa!',
  },
]

export default function FairPlay({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
}) {
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [showLesson, setShowLesson] = useState(false)

  const current = SCENARIOS[idx]
  const isComplete = idx >= SCENARIOS.length

  const handleAnswer = useCallback(
    (option) => {
      registerClick()
      if (option.correct) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
        setShowLesson(true)
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [registerClick, registerSuccess, registerError]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    setShowLesson(false)
    const next = idx + 1
    setIdx(next)
    updateCampoProgress('campo4', next + 5)
    if (next >= SCENARIOS.length) {
      completeActivity('fair-play', score >= 5 ? 3 : score >= 3 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  if (isComplete) {
    return (
      <ActivityShell title="Fair Play" backPath="/campo/4" color="var(--color-campo4)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>🤝</span>
          <p style={styles.completeText}>Es um campeao de fair play!</p>
          <p style={styles.completeScore}>{score}/{SCENARIOS.length} respostas correctas</p>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Fair Play"
      instruction={current.situation}
      backPath="/campo/4"
      color="var(--color-campo4)"
      score={score}
      total={SCENARIOS.length}
    >
      <div style={styles.scenarioCard}>
        <span style={styles.scenarioEmoji}>{current.emoji}</span>
        <p style={styles.scenarioText}>{current.situation}</p>
      </div>

      <div style={styles.optionsList}>
        {current.options.map((opt, i) => (
          <button
            key={i}
            style={styles.optionBtn}
            onClick={() => handleAnswer(opt)}
            disabled={feedback !== null}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {showLesson && (
        <div style={styles.lessonCard} className="animate-slide-up">
          <span>💡</span>
          <p style={styles.lessonText}>{current.lesson}</p>
          <button style={styles.nextBtn} onClick={handleNext}>
            Proximo →
          </button>
        </div>
      )}

      {!showLesson && (
        <FeedbackMessage
          type={feedback}
          visible={feedback !== null}
          onDismiss={() => setFeedback(null)}
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
  scenarioEmoji: { fontSize: '2.5rem' },
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
  lessonCard: {
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
  lessonText: { fontSize: 'var(--font-size-base)', lineHeight: 1.6 },
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
  completeScore: {
    color: 'var(--color-text-secondary)',
  },
}
