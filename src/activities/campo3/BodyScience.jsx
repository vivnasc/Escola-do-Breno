import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

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
  {
    question: 'Quantos ossos tem o corpo humano adulto?',
    options: ['Cerca de 206', 'Cerca de 50', 'Cerca de 500'],
    correct: 0,
    fact: 'Bebes nascem com cerca de 270 ossos. Alguns fundem-se a medida que crescemos!',
  },
  {
    question: 'Que orgao controla todo o corpo?',
    options: ['O cerebro', 'O estomago', 'O coracao'],
    correct: 0,
    fact: 'O cerebro envia milhoes de sinais electricos por segundo para controlar tudo no corpo!',
  },
  {
    question: 'Porque espiramos?',
    options: [
      'Para expulsar particulas irritantes do nariz',
      'Porque estamos doentes',
      'Porque respiramos muito rapido',
    ],
    correct: 0,
    fact: 'Um espirro pode atingir 160 km/h! O corpo expulsa particulas como po e bacterias.',
  },
  {
    question: 'Que liquido vermelho circula no nosso corpo?',
    options: ['Sangue', 'Sumo de tomate', 'Agua vermelha'],
    correct: 0,
    fact: 'O sangue transporta oxigenio a todas as celulas. Um adulto tem cerca de 5 litros!',
  },
  {
    question: 'Porque suamos quando fazemos exercicio?',
    options: [
      'Para arrefecer o corpo',
      'Porque bebemos muita agua',
      'Porque temos medo',
    ],
    correct: 0,
    fact: 'O suor evapora na pele e ajuda a baixar a temperatura do corpo. E um ar condicionado natural!',
  },
  {
    question: 'Que parte do olho muda de tamanho com a luz?',
    options: ['A pupila', 'A pestana', 'A sobrancelha'],
    correct: 0,
    fact: 'A pupila dilata no escuro para captar mais luz e contrai no claro para proteger a retina!',
  },
  {
    question: 'Qual e o musculo mais forte do corpo humano?',
    options: [
      'O masseter (musculo da mandibula)',
      'O bicep do braco',
      'O musculo do dedo mindinho',
    ],
    correct: 0,
    fact: 'O masseter, que usamos para mastigar, pode exercer uma forca de ate 70 quilos! Temos mais de 600 musculos no corpo.',
  },
  {
    question: 'Quantos dentes tem um adulto?',
    options: ['32 dentes', '20 dentes', '50 dentes'],
    correct: 0,
    fact: 'As criancas tem 20 dentes de leite que caem e sao substituidos por 32 dentes permanentes. Os dentes mais fortes sao os molares!',
  },
  {
    question: 'O que fazem os pulmoes?',
    options: [
      'Levam oxigenio ao sangue quando respiramos',
      'Digerem a comida',
      'Fazem o coracao bater',
    ],
    correct: 0,
    fact: 'Os pulmoes enchem-se de ar como baloes. Respiramos cerca de 20.000 vezes por dia! O pulmao direito e ligeiramente maior que o esquerdo.',
  },
  {
    question: 'Para onde vai a comida depois de a engolirmos?',
    options: [
      'Para o estomago, onde e digerida com acidos',
      'Directamente para os musculos',
      'Para o cerebro',
    ],
    correct: 0,
    fact: 'O estomago usa acidos fortes para desfazer a comida. A digestao completa pode demorar ate 8 horas! O intestino delgado tem cerca de 6 metros.',
  },
  {
    question: 'Qual e o maior orgao do corpo humano?',
    options: ['A pele', 'O figado', 'O cerebro'],
    correct: 0,
    fact: 'A pele e o maior orgao do corpo! Protege-nos de bacterias, regula a temperatura e permite-nos sentir o toque. Renova-se completamente a cada 3-4 semanas.',
  },
  {
    question: 'Porque e que o cabelo e as unhas crescem?',
    options: [
      'Porque as celulas na raiz se multiplicam constantemente',
      'Porque bebemos agua',
      'Porque dormimos muito',
    ],
    correct: 0,
    fact: 'O cabelo cresce cerca de 1 centimetro por mes. As unhas das maos crescem mais rapido do que as dos pes! Ambos sao feitos de queratina, a mesma proteina.',
  },
  {
    question: 'Existem diferentes tipos de sangue?',
    options: [
      'Sim, existem 4 tipos principais: A, B, AB e O',
      'Nao, o sangue e todo igual',
      'Existem 2 tipos: vermelho e azul',
    ],
    correct: 0,
    fact: 'Existem 4 tipos de sangue: A, B, AB e O. O tipo O pode doar para todos e chama-se dador universal! E importante saber o teu tipo de sangue.',
  },
  {
    question: 'O que nos protege de doencas como gripes e virus?',
    options: [
      'O sistema imunitario, com globulos brancos',
      'Os musculos',
      'Os ossos',
    ],
    correct: 0,
    fact: 'O sistema imunitario e como um exercito dentro do corpo. Os globulos brancos atacam virus e bacterias para nos manter saudaveis. A febre e uma forma de combater infeccoes!',
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
  const { speak } = useTTS()
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [showFact, setShowFact] = useState(false)

  const current = QUESTIONS[idx]
  const isComplete = idx >= QUESTIONS.length

  useEffect(() => {
    if (!isComplete) {
      speak(current.question)
    }
  }, [idx])

  const handleAnswer = useCallback(
    (ansIdx) => {
      registerClick()
      if (ansIdx === current.correct) {
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
    updateCampoProgress('campo3', next + 18)
    if (next >= QUESTIONS.length) {
      completeActivity('body-science', score >= 16 ? 3 : score >= 12 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  const finalStars = score >= 16 ? 3 : score >= 12 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Ciencia do Corpo" backPath="/campo/3" color="var(--color-campo3)">
        <CompletionCelebration
          emoji="🫀"
          title="Aprendeste sobre o corpo humano!"
          score={score}
          total={QUESTIONS.length}
          stars={finalStars}
          color="var(--color-campo3)"
        />
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
            className="btn-press"
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
