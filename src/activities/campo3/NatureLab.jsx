import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import { useTTS } from '../../hooks/useTTS'

const EXPERIMENTS = [
  {
    title: 'Animais e Habitats',
    question: 'Onde vive o peixe?',
    emoji: '🐟',
    options: [
      { text: 'Na agua (rio, lago ou mar)', emoji: '🌊', correct: true },
      { text: 'Na arvore', emoji: '🌳', correct: false },
      { text: 'No deserto', emoji: '🏜️', correct: false },
    ],
    fact: 'Os peixes respiram pela guelras e precisam de agua para viver. Existem peixes de agua doce e de agua salgada!',
  },
  {
    title: 'Plantas e Sol',
    question: 'De que e que uma planta precisa para crescer?',
    emoji: '🌱',
    options: [
      { text: 'Agua, sol e terra', emoji: '☀️💧', correct: true },
      { text: 'Apenas chocolate', emoji: '🍫', correct: false },
      { text: 'Frio e escuridao', emoji: '🌑', correct: false },
    ],
    fact: 'As plantas fazem fotossintese: usam a luz do sol para transformar agua e ar em comida. Sem plantas nao teriamos oxigenio!',
  },
  {
    title: 'Ciclo da Agua',
    question: 'O que acontece a agua quando aquece muito?',
    emoji: '💧',
    options: [
      { text: 'Evapora e sobe para as nuvens', emoji: '☁️', correct: true },
      { text: 'Fica congelada', emoji: '🧊', correct: false },
      { text: 'Desaparece para sempre', emoji: '✨', correct: false },
    ],
    fact: 'A agua evapora com o calor, forma nuvens, e depois cai como chuva. Chama-se ciclo da agua e repete-se sempre!',
  },
  {
    title: 'Cadeia Alimentar',
    question: 'O que come o leao?',
    emoji: '🦁',
    options: [
      { text: 'Outros animais (zebras, antilopes)', emoji: '🦓', correct: true },
      { text: 'Plantas e flores', emoji: '🌸', correct: false },
      { text: 'Pedras e areia', emoji: '🪨', correct: false },
    ],
    fact: 'O leao e um predador. A cadeia alimentar funciona assim: plantas → herbivoros (zebra) → predadores (leao). Cada ser vivo depende do outro!',
  },
  {
    title: 'Sistema Solar',
    question: 'O que e o Sol?',
    emoji: '☀️',
    options: [
      { text: 'Uma estrela enorme que nos da luz e calor', emoji: '⭐', correct: true },
      { text: 'Um planeta como a Terra', emoji: '🌍', correct: false },
      { text: 'Uma lampada no ceu', emoji: '💡', correct: false },
    ],
    fact: 'O Sol e uma estrela! E tao grande que cabiam um milhao de Terras la dentro. Da-nos luz, calor e energia.',
  },
  {
    title: 'Estados da Materia',
    question: 'O gelo, a agua e o vapor sao a mesma coisa?',
    emoji: '🧊',
    options: [
      { text: 'Sim, tudo e agua em estados diferentes', emoji: '💧', correct: true },
      { text: 'Nao, sao coisas completamente diferentes', emoji: '❌', correct: false },
      { text: 'So o gelo e agua', emoji: '🧊', correct: false },
    ],
    fact: 'A agua existe em 3 estados: solido (gelo), liquido (agua) e gasoso (vapor). Muda de estado com a temperatura!',
  },
  {
    title: 'Sentidos Humanos',
    question: 'Quantos sentidos tem o ser humano?',
    emoji: '👁️',
    options: [
      { text: '5: visao, audicao, olfacto, paladar e tacto', emoji: '✋', correct: true },
      { text: '3: ver, ouvir e cheirar', emoji: '👃', correct: false },
      { text: '2: ver e ouvir', emoji: '👀', correct: false },
    ],
    fact: 'Temos 5 sentidos: vemos com os olhos, ouvimos com os ouvidos, cheiramos com o nariz, saboreamos com a lingua e sentimos com a pele!',
  },
  {
    title: 'Dia e Noite',
    question: 'Porque e que temos dia e noite?',
    emoji: '🌍',
    options: [
      { text: 'Porque a Terra roda sobre si mesma', emoji: '🔄', correct: true },
      { text: 'Porque o Sol se apaga a noite', emoji: '🌑', correct: false },
      { text: 'Porque as estrelas tapam o Sol', emoji: '⭐', correct: false },
    ],
    fact: 'A Terra roda como um piao. Quando o nosso lado fica virado para o Sol e dia. Quando fica ao contrario e noite. Uma volta completa demora 24 horas!',
  },
]

export default function NatureLab({
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

  const current = EXPERIMENTS[idx]
  const isComplete = idx >= EXPERIMENTS.length

  useEffect(() => {
    if (!isComplete) {
      speak(current.question)
    }
  }, [idx])

  const handleAnswer = useCallback(
    (opt) => {
      registerClick()
      if (opt.correct) {
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
    [current, registerClick, registerSuccess, registerError, speak]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    setShowFact(false)
    const next = idx + 1
    setIdx(next)
    updateCampoProgress('campo3', next + 20)
    if (next >= EXPERIMENTS.length) {
      completeActivity('nature-lab', score >= 7 ? 3 : score >= 5 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  if (isComplete) {
    return (
      <ActivityShell title="Laboratorio Natural" backPath="/campo/3" color="var(--color-campo3)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>🔬</span>
          <p style={styles.completeText}>Descobriste {score} factos cientificos!</p>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Laboratorio Natural"
      instruction={current.question}
      backPath="/campo/3"
      color="var(--color-campo3)"
      score={score}
      total={EXPERIMENTS.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.questionCard}>
        <span style={styles.questionEmoji}>{current.emoji}</span>
        <p style={styles.questionTitle}>{current.title}</p>
        <p style={styles.questionText}>{current.question}</p>
      </div>

      <div style={styles.optionsList}>
        {current.options.map((opt, i) => (
          <button
            key={i}
            style={styles.optionBtn}
            onClick={() => handleAnswer(opt)}
            disabled={feedback !== null}
          >
            <span style={styles.optionEmoji}>{opt.emoji}</span>
            <span>{opt.text}</span>
          </button>
        ))}
      </div>

      {showFact && (
        <div style={styles.factCard} className="animate-slide-up">
          <span style={styles.factIcon}>🔬</span>
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
    gap: 'var(--space-sm)',
    padding: 'var(--space-lg)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo3)',
  },
  questionEmoji: { fontSize: '3rem' },
  questionTitle: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
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
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
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
  optionEmoji: { fontSize: '1.5rem' },
  factCard: {
    padding: 'var(--space-lg)',
    backgroundColor: '#F1F8E9',
    borderRadius: 'var(--radius-md)',
    border: '2px solid #8BC34A',
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
