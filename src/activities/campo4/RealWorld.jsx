import { useState, useCallback } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'

const CHALLENGES = [
  {
    title: 'No Restaurante',
    situation: 'Estas no restaurante com a tua familia. Queres pedir frango grelhado. O que fazes?',
    emoji: '🍽️',
    options: [
      { text: 'Olho para o menu, encontro "frango grelhado" e peco ao empregado', correct: true },
      { text: 'Grito "frango!" muito alto', correct: false },
      { text: 'Saio do restaurante', correct: false },
    ],
    tip: 'No restaurante: olha o menu, decide o que queres, espera a tua vez, e pede com educacao.',
  },
  {
    title: 'No Autocarro',
    situation: 'Precisas de apanhar o autocarro para ir ao estadio. O que tens de saber?',
    emoji: '🚌',
    options: [
      { text: 'O numero do autocarro, a paragem e o horario', correct: true },
      { text: 'So o nome do estadio', correct: false },
      { text: 'Nada, o autocarro vem sozinho', correct: false },
    ],
    tip: 'Para usar transportes: sabe o numero/nome, a paragem, o horario e o dinheiro necessario.',
  },
  {
    title: 'Estou Perdido',
    situation: 'Estas no centro comercial e nao encontras os teus pais. O que fazes?',
    emoji: '🏬',
    options: [
      { text: 'Fico no mesmo sitio, procuro um seguranca e digo o meu nome e o dos meus pais', correct: true },
      { text: 'Corro para todo o lado a gritar', correct: false },
      { text: 'Vou para a rua sozinho', correct: false },
    ],
    tip: 'Se te perderes: fica parado, procura alguem de uniforme, sabe dizer o teu nome e o contacto dos teus pais.',
  },
  {
    title: 'Emergencia',
    situation: 'Alguem se magoa no recreio e precisa de ajuda. O que fazes?',
    emoji: '🚑',
    options: [
      { text: 'Chamo um professor e fico junto da pessoa', correct: true },
      { text: 'Ignoro e continuo a brincar', correct: false },
      { text: 'Tento resolver sozinho', correct: false },
    ],
    tip: 'Em emergencia: chama um adulto, nao toques na pessoa se nao souberes, e o numero de emergencia em Mocambique e 198.',
  },
  {
    title: 'Dados Pessoais',
    situation: 'Um adulto da escola pergunta o teu nome completo e morada. E seguro responder?',
    emoji: '🪪',
    options: [
      { text: 'Sim, adultos da escola sao de confianca e preciso saber dizer os meus dados', correct: true },
      { text: 'Nunca, a ninguem', correct: false },
      { text: 'So digo se me derem um presente', correct: false },
    ],
    tip: 'Sabe o teu nome completo, morada, e contacto dos pais. Partilha com adultos de confianca (escola, policia).',
  },
  {
    title: 'Na Loja',
    situation: 'Queres comprar agua na loja. Custa 15 MT e tens 20 MT. O que fazes?',
    emoji: '🏪',
    options: [
      { text: 'Vou a caixa, digo que quero agua, pago 20 MT e espero o troco de 5 MT', correct: true },
      { text: 'Deixo o dinheiro no balcao e saio', correct: false },
      { text: 'Peco para levar de graca', correct: false },
    ],
    tip: 'Na loja: escolhe o que queres, vai a caixa, paga e confere o troco!',
  },
]

export default function RealWorld({
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
  const [showTip, setShowTip] = useState(false)

  const current = CHALLENGES[idx]
  const isComplete = idx >= CHALLENGES.length

  const handleAnswer = useCallback(
    (option) => {
      registerClick()
      if (option.correct) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
        setShowTip(true)
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [registerClick, registerSuccess, registerError]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    setShowTip(false)
    const next = idx + 1
    setIdx(next)
    updateCampoProgress('campo4', next + 17)
    if (next >= CHALLENGES.length) {
      completeActivity('real-world', score >= 5 ? 3 : score >= 3 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  if (isComplete) {
    return (
      <ActivityShell title="No Mundo Real" backPath="/campo/4" color="var(--color-campo4)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>🏙️</span>
          <p style={styles.completeText}>Estas pronto para o mundo real!</p>
          <p style={styles.completeScore}>{score}/{CHALLENGES.length} desafios superados</p>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="No Mundo Real"
      instruction={current.situation}
      backPath="/campo/4"
      color="var(--color-campo4)"
      score={score}
      total={CHALLENGES.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.challengeCard}>
        <span style={styles.challengeEmoji}>{current.emoji}</span>
        <h3 style={styles.challengeTitle}>{current.title}</h3>
        <p style={styles.challengeText}>{current.situation}</p>
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

      {showTip && (
        <div style={styles.tipCard} className="animate-slide-up">
          <span>💡</span>
          <p style={styles.tipText}>{current.tip}</p>
          <button style={styles.nextBtn} onClick={handleNext}>
            Proximo desafio →
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
  challengeCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    backgroundColor: '#F3E5F5',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo4)',
  },
  challengeEmoji: { fontSize: '3rem' },
  challengeTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-campo4)',
  },
  challengeText: {
    fontSize: 'var(--font-size-base)',
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
  tipCard: {
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
  tipText: { fontSize: 'var(--font-size-base)', lineHeight: 1.6 },
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
