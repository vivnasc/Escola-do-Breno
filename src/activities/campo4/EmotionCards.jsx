import { useState, useCallback } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'

const SITUATIONS = [
  {
    situation: 'O arbitro da-te um cartao amarelo injusto.',
    emoji: '🟨',
    emotions: [
      { name: 'Zangado', emoji: '😠', correct: true },
      { name: 'Feliz', emoji: '😊', correct: false },
      { name: 'Com sono', emoji: '😴', correct: false },
    ],
    strategy: 'Respira fundo 3 vezes. Fala com calma com o treinador. Nao e preciso gritar.',
  },
  {
    situation: 'Marcas o golo da vitoria no ultimo minuto!',
    emoji: '⚽',
    emotions: [
      { name: 'Alegre', emoji: '😄', correct: true },
      { name: 'Triste', emoji: '😢', correct: false },
      { name: 'Assustado', emoji: '😨', correct: false },
    ],
    strategy: 'Celebra com a equipa! Abraca os teus colegas. Partilha a alegria!',
  },
  {
    situation: 'Falhas um penalti importante.',
    emoji: '😞',
    emotions: [
      { name: 'Triste', emoji: '😢', correct: true },
      { name: 'Alegre', emoji: '😄', correct: false },
      { name: 'Surpreso', emoji: '😲', correct: false },
    ],
    strategy: 'Todos falham penaltis, ate o Ronaldo! Levanta a cabeca, respira e pensa no proximo.',
  },
  {
    situation: 'Vais jogar no estadio pela primeira vez.',
    emoji: '🏟️',
    emotions: [
      { name: 'Nervoso', emoji: '😰', correct: true },
      { name: 'Zangado', emoji: '😠', correct: false },
      { name: 'Aborrecido', emoji: '😐', correct: false },
    ],
    strategy: 'E normal sentir nervos! Respira devagar, concentra-te no jogo e diverte-te.',
  },
  {
    situation: 'O teu melhor amigo da equipa vai mudar de clube.',
    emoji: '👋',
    emotions: [
      { name: 'Triste', emoji: '😢', correct: true },
      { name: 'Com fome', emoji: '🤤', correct: false },
      { name: 'Divertido', emoji: '🤣', correct: false },
    ],
    strategy: 'E normal ficar triste. Podes continuar a ser amigo! Combina encontros e fala com ele.',
  },
  {
    situation: 'Ganhas um trofeu no final do torneio.',
    emoji: '🏆',
    emotions: [
      { name: 'Orgulhoso', emoji: '🥹', correct: true },
      { name: 'Zangado', emoji: '😠', correct: false },
      { name: 'Assustado', emoji: '😨', correct: false },
    ],
    strategy: 'Sente orgulho do teu trabalho! Agradece ao treinador e aos colegas.',
  },
]

export default function EmotionCards({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
}) {
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
