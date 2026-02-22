import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import { useTTS } from '../../hooks/useTTS'

const SCENARIOS = [
  {
    title: 'Planear o Dia',
    situation: 'Tens treino as 10h, escola as 8h e precisas de tomar banho antes. Que ordem faz sentido?',
    emoji: '📋',
    options: [
      { text: 'Banho → Escola → Treino', correct: true },
      { text: 'Treino → Banho → Escola', correct: false },
      { text: 'Escola → Treino → Banho', correct: false },
    ],
    lesson: 'Planear a ordem das actividades ajuda a nao chegar atrasado. Primeiro o que e mais cedo!',
  },
  {
    title: 'Resolver Conflitos',
    situation: 'Dois amigos querem jogar coisas diferentes. Um quer futebol, o outro quer basquete. O que fazes?',
    emoji: '🤝',
    options: [
      { text: 'Proponho jogar um primeiro e depois o outro', correct: true },
      { text: 'Ignoro os dois e jogo sozinho', correct: false },
      { text: 'Grito ate alguem desistir', correct: false },
    ],
    lesson: 'Negociar e encontrar compromissos e uma habilidade importante. Todos ficam felizes quando partilhamos!',
  },
  {
    title: 'Pedir Ajuda',
    situation: 'Nao consegues fazer um exercicio na escola. O que e melhor fazer?',
    emoji: '🙋',
    options: [
      { text: 'Levanto a mao e peco ajuda ao professor', correct: true },
      { text: 'Copio do colega sem perguntar', correct: false },
      { text: 'Desisto e nao faco nada', correct: false },
    ],
    lesson: 'Pedir ajuda nao e fraqueza, e inteligencia! Toda a gente precisa de ajuda as vezes.',
  },
  {
    title: 'Dinheiro Limitado',
    situation: 'Tens dinheiro para comprar UM lanche. Ha bolachas, fruta e gelado. Qual e a escolha mais inteligente?',
    emoji: '💰',
    options: [
      { text: 'Fruta, porque da energia e e saudavel', correct: true },
      { text: 'Gelado, porque e o mais caro', correct: false },
      { text: 'Nao compro nada', correct: false },
    ],
    lesson: 'Quando os recursos sao limitados, pensar no que e melhor a longo prazo ajuda a fazer boas escolhas.',
  },
  {
    title: 'Algo Correu Mal',
    situation: 'Partiste acidentalmente um copo. Ninguem viu. O que fazes?',
    emoji: '🫣',
    options: [
      { text: 'Digo a verdade a um adulto e ajudo a limpar', correct: true },
      { text: 'Escondo os pedacos e finjo que nao fui eu', correct: false },
      { text: 'Culpo outra pessoa', correct: false },
    ],
    lesson: 'A honestidade cria confianca. Quando assumimos os nossos erros, as pessoas confiam mais em nos.',
  },
  {
    title: 'Trabalho em Grupo',
    situation: 'Estas a fazer um trabalho em grupo. Um colega nao faz a parte dele. O que fazes?',
    emoji: '👥',
    options: [
      { text: 'Falo com ele e pergunto se precisa de ajuda', correct: true },
      { text: 'Faco tudo sozinho sem dizer nada', correct: false },
      { text: 'Digo ao professor que ele e preguicoso', correct: false },
    ],
    lesson: 'Antes de julgar, comunicar! As vezes as pessoas nao fazem a parte porque nao sabem como. Ajudar e liderar.',
  },
  {
    title: 'Gerir a Frustacao',
    situation: 'Perdeste um jogo importante. Estas muito chateado. O que ajuda?',
    emoji: '😤',
    options: [
      { text: 'Respiro fundo, aceito e penso no que posso melhorar', correct: true },
      { text: 'Atiro as coisas ao chao', correct: false },
      { text: 'Digo que o jogo era injusto', correct: false },
    ],
    lesson: 'Perder faz parte de aprender. Os melhores jogadores perdem muitas vezes antes de ganhar. A chave e aprender com cada derrota.',
  },
  {
    title: 'Prioridades',
    situation: 'Tens um teste amanha mas os amigos chamam-te para jogar. O que decides?',
    emoji: '📚',
    options: [
      { text: 'Estudo primeiro e jogo depois se houver tempo', correct: true },
      { text: 'Vou jogar porque e mais divertido', correct: false },
      { text: 'Nao estudo e nao jogo', correct: false },
    ],
    lesson: 'Saber separar o que e urgente do que e divertido e uma habilidade para a vida toda. Primeiro o dever, depois o prazer!',
  },
]

export default function ProblemSolving({
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
  const [showLesson, setShowLesson] = useState(false)

  const current = SCENARIOS[idx]
  const isComplete = idx >= SCENARIOS.length

  useEffect(() => {
    if (!isComplete) {
      speak(current.situation)
    }
  }, [idx])

  const handleAnswer = useCallback(
    (opt) => {
      registerClick()
      if (opt.correct) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
        setShowLesson(true)
        speak(current.lesson)
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [current, registerClick, registerSuccess, registerError, speak]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    setShowLesson(false)
    const next = idx + 1
    setIdx(next)
    updateCampoProgress('campo4', next + 20)
    if (next >= SCENARIOS.length) {
      completeActivity('problem-solving', score >= 7 ? 3 : score >= 5 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  if (isComplete) {
    return (
      <ActivityShell title="Resolver Problemas" backPath="/campo/4" color="var(--color-campo4)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>🧠</span>
          <p style={styles.completeText}>Resolveste {score} problemas!</p>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Resolver Problemas"
      instruction={current.situation}
      backPath="/campo/4"
      color="var(--color-campo4)"
      score={score}
      total={SCENARIOS.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.scenarioCard}>
        <span style={styles.scenarioEmoji}>{current.emoji}</span>
        <p style={styles.scenarioTitle}>{current.title}</p>
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
          <span style={styles.lessonIcon}>💡</span>
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
    gap: 'var(--space-sm)',
    padding: 'var(--space-lg)',
    backgroundColor: '#F3E5F5',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo4)',
  },
  scenarioEmoji: { fontSize: '3rem' },
  scenarioTitle: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  scenarioText: {
    fontSize: 'var(--font-size-base)',
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
    backgroundColor: '#EDE7F6',
    borderRadius: 'var(--radius-md)',
    border: '2px solid #B39DDB',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    textAlign: 'center',
  },
  lessonIcon: { fontSize: '1.5rem' },
  lessonText: {
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
