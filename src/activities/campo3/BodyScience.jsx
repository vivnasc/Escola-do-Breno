import { useState, useCallback, useEffect, useMemo } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const QUESTIONS = [
  {
    question: 'Quando corremos, o coração bate mais rápido. Porquê?',
    options: [
      'Para enviar mais sangue e oxigénio aos músculos',
      'Porque o coração tem medo',
      'Porque está a chover',
    ],
    correct: 0,
    fact: 'O coração de um jogador de futebol pode bater até 180 vezes por minuto durante um jogo!',
    minLevel: 4,
  },
  {
    question: 'Que nutriente dá energia rápida antes de um jogo?',
    options: ['Hidratos de carbono (massa, arroz)', 'Sal', 'Água'],
    correct: 0,
    fact: 'Os jogadores comem massa ou arroz 3 horas antes do jogo para ter energia!',
    minLevel: 4,
  },
  {
    question: 'Porque é que os jogadores bebem água durante o jogo?',
    options: [
      'Para hidratar o corpo e manter a concentração',
      'Porque têm sede de golos',
      'Para lavar as mãos',
    ],
    correct: 0,
    fact: 'Um jogador pode perder até 2 litros de água em suor durante um jogo!',
    minLevel: 4,
  },
  {
    question: 'O que acontece aos músculos quando fazemos alongamentos?',
    options: [
      'Ficam mais flexíveis e previnem lesões',
      'Ficam mais pequenos',
      'Mudam de cor',
    ],
    correct: 0,
    fact: 'Os alongamentos antes e depois do treino ajudam a prevenir lesões!',
    minLevel: 5,
  },
  {
    question: 'Porque dormem os jogadores 8-10 horas por noite?',
    options: [
      'Para o corpo recuperar e os músculos crescerem',
      'Porque não há nada para fazer',
      'Para sonhar com golos',
    ],
    correct: 0,
    fact: 'Durante o sono, o corpo liberta hormonas que reparam os músculos!',
    minLevel: 5,
  },
  {
    question: 'Porque é que a bola curva quando a chutamos de lado?',
    options: [
      'O ar faz pressão diferente de cada lado (efeito Magnus)',
      'Porque a bola quer ir por ali',
      'Porque o vento empurra',
    ],
    correct: 0,
    fact: 'Quando a bola roda, o ar move-se mais rápido de um lado, criando o efeito Magnus!',
    minLevel: 7,
  },
  {
    question: 'Quantos ossos tem o corpo humano adulto?',
    options: ['Cerca de 206', 'Cerca de 50', 'Cerca de 500'],
    correct: 0,
    fact: 'Bebés nascem com cerca de 270 ossos. Alguns fundem-se à medida que crescemos!',
    minLevel: 2,
  },
  {
    question: 'Que órgão controla todo o corpo?',
    options: ['O cérebro', 'O estômago', 'O coração'],
    correct: 0,
    fact: 'O cérebro envia milhões de sinais eléctricos por segundo para controlar tudo no corpo!',
    minLevel: 1,
  },
  {
    question: 'Porque espiramos?',
    options: [
      'Para expulsar partículas irritantes do nariz',
      'Porque estamos doentes',
      'Porque respiramos muito rápido',
    ],
    correct: 0,
    fact: 'Um espirro pode atingir 160 km/h! O corpo expulsa partículas como pó e bactérias.',
    minLevel: 3,
  },
  {
    question: 'Que líquido vermelho circula no nosso corpo?',
    options: ['Sangue', 'Sumo de tomate', 'Água vermelha'],
    correct: 0,
    fact: 'O sangue transporta oxigénio a todas as células. Um adulto tem cerca de 5 litros!',
    minLevel: 1,
  },
  {
    question: 'Porque suamos quando fazemos exercício?',
    options: [
      'Para arrefecer o corpo',
      'Porque bebemos muita água',
      'Porque temos medo',
    ],
    correct: 0,
    fact: 'O suor evapora na pele e ajuda a baixar a temperatura do corpo. É um ar condicionado natural!',
    minLevel: 5,
  },
  {
    question: 'Que parte do olho muda de tamanho com a luz?',
    options: ['A pupila', 'A pestana', 'A sobrancelha'],
    correct: 0,
    fact: 'A pupila dilata no escuro para captar mais luz e contrai no claro para proteger a retina!',
    minLevel: 3,
  },
  {
    question: 'Qual é o músculo mais forte do corpo humano?',
    options: [
      'O masséter (músculo da mandíbula)',
      'O bícep do braço',
      'O músculo do dedo mindinho',
    ],
    correct: 0,
    fact: 'O masséter, que usamos para mastigar, pode exercer uma força de até 70 quilos! Temos mais de 600 músculos no corpo.',
    minLevel: 6,
  },
  {
    question: 'Quantos dentes tem um adulto?',
    options: ['32 dentes', '20 dentes', '50 dentes'],
    correct: 0,
    fact: 'As crianças têm 20 dentes de leite que caem e são substituídos por 32 dentes permanentes. Os dentes mais fortes são os molares!',
    minLevel: 2,
  },
  {
    question: 'O que fazem os pulmões?',
    options: [
      'Levam oxigénio ao sangue quando respiramos',
      'Digerem a comida',
      'Fazem o coração bater',
    ],
    correct: 0,
    fact: 'Os pulmões enchem-se de ar como balões. Respiramos cerca de 20.000 vezes por dia! O pulmão direito é ligeiramente maior que o esquerdo.',
    minLevel: 6,
  },
  {
    question: 'Para onde vai a comida depois de a engolirmos?',
    options: [
      'Para o estômago, onde é digerida com ácidos',
      'Directamente para os músculos',
      'Para o cérebro',
    ],
    correct: 0,
    fact: 'O estômago usa ácidos fortes para desfazer a comida. A digestão completa pode demorar até 8 horas! O intestino delgado tem cerca de 6 metros.',
    minLevel: 6,
  },
  {
    question: 'Qual é o maior órgão do corpo humano?',
    options: ['A pele', 'O fígado', 'O cérebro'],
    correct: 0,
    fact: 'A pele é o maior órgão do corpo! Protege-nos de bactérias, regula a temperatura e permite-nos sentir o toque. Renova-se completamente a cada 3-4 semanas.',
    minLevel: 7,
  },
  {
    question: 'Porque é que o cabelo e as unhas crescem?',
    options: [
      'Porque as células na raiz se multiplicam constantemente',
      'Porque bebemos água',
      'Porque dormimos muito',
    ],
    correct: 0,
    fact: 'O cabelo cresce cerca de 1 centímetro por mês. As unhas das mãos crescem mais rápido do que as dos pés! Ambos são feitos de queratina, a mesma proteína.',
    minLevel: 7,
  },
  {
    question: 'Existem diferentes tipos de sangue?',
    options: [
      'Sim, existem 4 tipos principais: A, B, AB e O',
      'Não, o sangue é todo igual',
      'Existem 2 tipos: vermelho e azul',
    ],
    correct: 0,
    fact: 'Existem 4 tipos de sangue: A, B, AB e O. O tipo O pode doar para todos e chama-se dador universal! É importante saber o teu tipo de sangue.',
    minLevel: 8,
  },
  {
    question: 'O que nos protege de doenças como gripes e vírus?',
    options: [
      'O sistema imunitário, com glóbulos brancos',
      'Os músculos',
      'Os ossos',
    ],
    correct: 0,
    fact: 'O sistema imunitário é como um exército dentro do corpo. Os glóbulos brancos atacam vírus e bactérias para nos manter saudáveis. A febre é uma forma de combater infecções!',
    minLevel: 8,
  },
  {
    question: 'Porque temos dois olhos e não um?',
    options: [
      'Para ver em profundidade e calcular distâncias',
      'Para ver duas coisas ao mesmo tempo',
      'Porque um é suplente do outro',
    ],
    correct: 0,
    fact: 'Dois olhos dão-nos visão binocular: o cérebro junta as duas imagens para calcular distâncias. É por isso que consegues agarrar uma bola!',
    minLevel: 5,
  },
  {
    question: 'O que acontece quando temos fome?',
    options: [
      'O estômago contrai-se e envia sinais ao cérebro',
      'Os ossos ficam mais finos',
      'Os olhos ficam vermelhos',
    ],
    correct: 0,
    fact: 'Quando o estômago está vazio, contrai-se e produz sons (o "roncar" da barriga). O cérebro recebe sinais hormonais de que é hora de comer!',
    minLevel: 3,
  },
  {
    question: 'Porque bocejamos?',
    options: [
      'Para levar mais oxigénio ao cérebro quando estamos cansados',
      'Porque estamos tristes',
      'Porque a boca está seca',
    ],
    correct: 0,
    fact: 'O bocejo traz uma grande quantidade de ar fresco ao cérebro. E é contagioso — quando vês alguém bocejar, provavelmente também vais bocejar!',
    minLevel: 4,
  },
  {
    question: 'O que faz o fígado?',
    options: [
      'Limpa o sangue e ajuda na digestão',
      'Faz o coração bater',
      'Produz os ossos',
    ],
    correct: 0,
    fact: 'O fígado é a maior fábrica química do corpo! Filtra o sangue, armazena vitaminas e produz bílis para digerir gorduras. É o único órgão que se pode regenerar!',
    minLevel: 7,
  },
  {
    question: 'Porque sentimos cócegas?',
    options: [
      'Porque a pele tem terminações nervosas muito sensíveis',
      'Porque os músculos contraem sozinhos',
      'Porque os ossos vibram',
    ],
    correct: 0,
    fact: 'As cócegas são uma resposta do sistema nervoso ao toque leve. Curiosamente, não conseguimos fazer cócegas a nós próprios porque o cérebro prevê o toque!',
    minLevel: 6,
  },
  {
    question: 'Quantos litros de ar respiramos por dia?',
    options: [
      'Cerca de 11.000 litros',
      'Cerca de 100 litros',
      'Cerca de 1 milhão de litros',
    ],
    correct: 0,
    fact: 'Respiramos cerca de 11.000 litros de ar por dia! O ar contém oxigénio (21%) que o corpo precisa para transformar comida em energia.',
    minLevel: 8,
  },
  {
    question: 'O que são as impressões digitais?',
    options: [
      'Padrões únicos na ponta dos dedos que ninguém mais tem',
      'Marcas que aparecem quando ficamos velhos',
      'Cicatrizes dos dedos',
    ],
    correct: 0,
    fact: 'Cada pessoa no mundo tem impressões digitais únicas — até gémeos idênticos! Formam-se antes de nascermos e nunca mudam ao longo da vida.',
    minLevel: 5,
  },
  {
    question: 'Porque ficamos com a pele "de galinha" quando temos frio?',
    options: [
      'Porque os músculos minúsculos puxam os pelos para cima para manter o calor',
      'Porque a pele está a crescer',
      'Porque os ossos tremem',
    ],
    correct: 0,
    fact: 'A "pele de galinha" é uma resposta automática: os músculos junto aos pelos contraem-se para os levantar, criando uma camada de ar quente. Nos animais com pelo grosso funciona muito bem!',
    minLevel: 7,
  },
  {
    question: 'Que parte do corpo produz a voz?',
    options: [
      'As cordas vocais na laringe',
      'A língua',
      'Os pulmões',
    ],
    correct: 0,
    fact: 'A voz é produzida quando o ar dos pulmões passa pelas cordas vocais e as faz vibrar. A língua, os lábios e os dentes ajudam a formar as palavras!',
    minLevel: 4,
  },
  {
    question: 'Porque é que temos sobrancelhas?',
    options: [
      'Para impedir que o suor e a chuva entrem nos olhos',
      'Apenas para decoração',
      'Para nos fazer parecer zangados',
    ],
    correct: 0,
    fact: 'As sobrancelhas são como pequenos telhados para os olhos! Desviam o suor e a água da chuva para os lados, protegendo a nossa visão.',
    minLevel: 3,
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

  const campoLevel = adaptive?.campoLevel?.campo3 || 1
  const questions = useMemo(
    () => QUESTIONS.filter(q => q.minLevel <= campoLevel),
    [campoLevel]
  )

  const current = questions[idx]
  const isComplete = idx >= questions.length

  useEffect(() => {
    if (!isComplete) {
      speak(current.question, { auto: true })
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
    if (next >= questions.length) {
      completeActivity('body-science', score >= 16 ? 3 : score >= 12 ? 2 : 1)
    }
  }, [idx, score, questions.length, completeActivity, updateCampoProgress])

  const finalStars = score >= 16 ? 3 : score >= 12 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Ciência do Corpo" backPath="/campo/3" color="var(--color-campo3)">
        <CompletionCelebration
          emoji="🫀"
          title="Aprendeste sobre o corpo humano!"
          score={score}
          total={questions.length}
          stars={finalStars}
          color="var(--color-campo3)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Ciência do Corpo"
      instruction={current.question}
      backPath="/campo/3"
      color="var(--color-campo3)"
      score={score}
      total={questions.length}
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
            Próximo →
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
