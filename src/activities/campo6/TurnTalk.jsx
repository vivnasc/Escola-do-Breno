import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const SCENARIOS = [
  {
    situation: 'O teu amigo está a contar uma história sobre o fim de semana.',
    emoji: '🗣️',
    options: [
      { text: 'Ouço até ele acabar e depois comento', correct: true },
      { text: 'Interrompo para contar a minha', correct: false },
      { text: 'Olho para o telemóvel', correct: false },
    ],
    tip: 'Ouvir até ao fim mostra respeito. Quando ouvimos com atenção, as pessoas sentem-se valorizadas e querem ouvir-nos também!',
  },
  {
    situation: 'A professora faz uma pergunta à turma.',
    emoji: '🏫',
    options: [
      { text: 'Levanto o dedo e espero a minha vez', correct: true },
      { text: 'Grito a resposta', correct: false },
      { text: 'Não digo nada porque tenho vergonha', correct: false },
    ],
    tip: 'Levantar o dedo e esperar mostra respeito pela vez dos outros. É normal ter vergonha, mas participar com calma ajuda-nos a crescer!',
  },
  {
    situation: 'Dois amigos estão a falar. Queres juntar-te.',
    emoji: '👋',
    options: [
      { text: 'Espero uma pausa e digo "Posso juntar-me?"', correct: true },
      { text: 'Interrompo e começo a falar', correct: false },
      { text: 'Fico parado sem dizer nada', correct: false },
    ],
    tip: 'Esperar por uma pausa e pedir para entrar na conversa é a forma mais simpática de se juntar. As pessoas vão gostar da tua educação!',
  },
  {
    situation: 'Alguém te diz "Bom dia!".',
    emoji: '☀️',
    options: [
      { text: 'Respondo "Bom dia!" com um sorriso', correct: true },
      { text: 'Ignoro e passo', correct: false },
      { text: 'Fico a olhar sem dizer nada', correct: false },
    ],
    tip: 'Responder a um cumprimento é uma forma simples de mostrar simpatia. Um "Bom dia!" com um sorriso pode alegrar o dia de alguém!',
  },
  {
    situation: 'Um colega conta-te algo triste.',
    emoji: '😢',
    options: [
      { text: 'Digo "Lamento, queres falar sobre isso?"', correct: true },
      { text: 'Mudo de assunto', correct: false },
      { text: 'Rio-me', correct: false },
    ],
    tip: 'Quando alguém partilha algo triste, o mais importante é mostrar que nos importamos. Ouvir com carinho é um grande presente!',
  },
  {
    situation: 'Estás a falar e alguém te interrompe.',
    emoji: '✋',
    options: [
      { text: 'Digo com calma "Posso acabar primeiro?"', correct: true },
      { text: 'Grito com a pessoa', correct: false },
      { text: 'Fico calado e desisto de falar', correct: false },
    ],
    tip: 'Pedir com calma para acabar de falar é assertivo e respeitoso. Não precisamos de gritar nem de desistir — podemos pedir a nossa vez!',
  },
  {
    situation: 'Não ouviste o que alguém disse.',
    emoji: '👂',
    options: [
      { text: 'Peço "Podes repetir, por favor?"', correct: true },
      { text: 'Finjo que ouvi', correct: false },
      { text: 'Ignoro a pessoa', correct: false },
    ],
    tip: 'Pedir para repetir mostra que nos importamos com o que a pessoa disse. Toda a gente prefere repetir do que ser ignorada!',
  },
  {
    situation: 'Um amigo fez algo bem.',
    emoji: '🌟',
    options: [
      { text: 'Digo "Muito bem, parabéns!"', correct: true },
      { text: 'Não digo nada', correct: false },
      { text: 'Digo que eu fazia melhor', correct: false },
    ],
    tip: 'Celebrar o sucesso dos outros mostra que somos bons amigos. Dar parabéns custa pouco e faz a outra pessoa sentir-se especial!',
  },
]

export default function TurnTalk({
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
      speak(current.situation + ' O que fazes agora?', { auto: true })
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
    updateCampoProgress('campo6', next + 10)
    if (next >= SCENARIOS.length) {
      completeActivity('turn-talk', score >= 6 ? 3 : score >= 4 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  const finalStars = score >= 6 ? 3 : score >= 4 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="A Minha Vez" backPath="/campo/6" color="var(--color-campo6)">
        <CompletionCelebration
          emoji="🎤"
          title="Sabes comunicar com respeito!"
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
      title="A Minha Vez"
      instruction="O que fazes nesta situação?"
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

      <p style={styles.prompt}>O que fazes agora?</p>

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
