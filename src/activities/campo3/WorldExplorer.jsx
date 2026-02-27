import { useState, useCallback, useEffect, useMemo } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const FACTS = [
  {
    question: 'Quantos continentes existem?',
    options: ['7', '5', '6', '8'],
    correct: '7',
    fact: 'Há 7 continentes: Europa, Ásia, África, América do Norte, América do Sul, Oceânia e Antártida.',
    minLevel: 1,
  },
  {
    question: 'Em que continente fica o Brasil?',
    options: ['América do Sul', 'Europa', 'África', 'Ásia'],
    correct: 'América do Sul',
    fact: 'O Brasil é o maior país da América do Sul e já ganhou 5 Mundiais de futebol!',
    minLevel: 1,
  },
  {
    question: 'Qual é o maior rio de África?',
    options: ['Nilo', 'Amazonas', 'Danúbio', 'Zambeze'],
    correct: 'Nilo',
    fact: 'O Nilo é o rio mais comprido de África, com cerca de 6.650 km!',
    minLevel: 3,
  },
  {
    question: 'Em que país fica o Monte Kilimanjaro?',
    options: ['Tanzânia', 'Quénia', 'Brasil', 'Índia'],
    correct: 'Tanzânia',
    fact: 'O Kilimanjaro é a montanha mais alta de África, com 5.895 metros!',
    minLevel: 4,
  },
  {
    question: 'O Mundial de 2022 foi em que país?',
    options: ['Qatar', 'Rússia', 'Brasil', 'África do Sul'],
    correct: 'Qatar',
    fact: 'O Qatar está na Ásia. A Argentina ganhou esse Mundial com Messi!',
    minLevel: 3,
  },
  {
    question: 'Em que país fica a Torre Eiffel?',
    options: ['França', 'Itália', 'Espanha', 'Alemanha'],
    correct: 'França',
    fact: 'A Torre Eiffel fica em Paris, capital da França. O PSG joga lá!',
    minLevel: 2,
  },
  {
    question: 'Qual é o maior oceano do mundo?',
    options: ['Pacífico', 'Atlântico', 'Índico', 'Ártico'],
    correct: 'Pacífico',
    fact: 'O Oceano Pacífico é o maior do mundo. Cobre mais área do que todos os continentes juntos!',
    minLevel: 2,
  },
  {
    question: 'Em que país fica a cidade de Buenos Aires?',
    options: ['Argentina', 'Brasil', 'Chile', 'Uruguai'],
    correct: 'Argentina',
    fact: 'Buenos Aires é a capital da Argentina, terra de Maradona e Messi!',
    minLevel: 2,
  },
  {
    question: 'Qual é o deserto mais quente do mundo?',
    options: ['Sahara', 'Gobi', 'Atacama', 'Kalahari'],
    correct: 'Sahara',
    fact: 'O Sahara fica em África e é quase tão grande como a China! Temperaturas chegam a 58 graus.',
    minLevel: 3,
  },
  {
    question: 'Que língua se fala em Moçambique?',
    options: ['Português', 'Espanhol', 'Francês', 'Inglês'],
    correct: 'Português',
    fact: 'Moçambique fala português e é banhado pelo Oceano Índico. Maputo é a capital!',
    minLevel: 4,
  },
  {
    question: 'Qual é a montanha mais alta do mundo?',
    options: ['Evereste', 'Kilimanjaro', 'Aconcagua', 'Mont Blanc'],
    correct: 'Evereste',
    fact: 'O Monte Evereste tem 8.849 metros e fica entre o Nepal e a China!',
    minLevel: 4,
  },
  {
    question: 'Que país tem a forma de uma bota?',
    options: ['Itália', 'Portugal', 'Grécia', 'Croácia'],
    correct: 'Itália',
    fact: 'A Itália tem forma de bota e é famosa por pizza, pasta e futebol! Roma é a capital.',
    minLevel: 5,
  },
  {
    question: 'Em que continente vivem os pinguins selvagens?',
    options: ['Antártida', 'Europa', 'Ásia', 'América do Norte'],
    correct: 'Antártida',
    fact: 'A Antártida é o continente mais frio. Ninguém vive lá permanentemente, só cientistas!',
    minLevel: 4,
  },
  {
    question: 'Qual é o rio mais comprido do mundo?',
    options: ['Nilo', 'Amazonas', 'Yangtze', 'Mississippi'],
    correct: 'Nilo',
    fact: 'O Nilo tem cerca de 6.650 km e atravessa 11 países de África!',
    minLevel: 5,
  },
  {
    question: 'Em que país fica a Grande Muralha?',
    options: ['China', 'Índia', 'Japão', 'Rússia'],
    correct: 'China',
    fact: 'A Grande Muralha da China tem mais de 21.000 km! Foi construída ao longo de 2.000 anos.',
    minLevel: 5,
  },
  {
    question: 'Em que continente fica a maior floresta tropical do mundo, a Amazónia?',
    options: ['América do Sul', 'África', 'Ásia', 'Oceânia'],
    correct: 'América do Sul',
    fact: 'A Amazónia cobre 9 países e produz cerca de 20% do oxigénio do planeta. Tem mais espécies de animais do que qualquer outro lugar na Terra!',
    minLevel: 6,
  },
  {
    question: 'Onde fica a Grande Barreira de Coral?',
    options: ['Austrália', 'Brasil', 'Japão', 'México'],
    correct: 'Austrália',
    fact: 'A Grande Barreira de Coral fica na costa da Austrália e tem mais de 2.300 km. É tão grande que pode ser vista do espaço!',
    minLevel: 6,
  },
  {
    question: 'Qual é o mar onde se flutua sem esforço porque a água é muito salgada?',
    options: ['Mar Morto', 'Mar Mediterrâneo', 'Mar do Norte', 'Mar Vermelho'],
    correct: 'Mar Morto',
    fact: 'O Mar Morto, entre Israel e Jordânia, é quase 10 vezes mais salgado que o oceano. O sal faz o corpo flutuar sem esforço!',
    minLevel: 6,
  },
  {
    question: 'Qual é a cadeia de montanhas mais comprida do mundo?',
    options: ['Andes', 'Himalaias', 'Alpes', 'Montanhas Rochosas'],
    correct: 'Andes',
    fact: 'Os Andes estendem-se por 7.000 km ao longo da América do Sul, atravessando 7 países! O pico mais alto é o Aconcágua, com 6.961 metros.',
    minLevel: 7,
  },
  {
    question: 'Em que continente ficam as Cataratas Victoria?',
    options: ['África', 'América do Sul', 'Ásia', 'Europa'],
    correct: 'África',
    fact: 'As Cataratas Vitória ficam entre a Zâmbia e o Zimbabué. Têm mais de 1.700 metros de largura e o barulho da água ouve-se a 40 km de distância!',
    minLevel: 7,
  },
  {
    question: 'Que animal consegue sobreviver no deserto do Sahara sem beber água durante semanas?',
    options: ['Camelo', 'Elefante', 'Urso', 'Golfinho'],
    correct: 'Camelo',
    fact: 'Os camelos guardam gordura nas bossas (não água!) e o seu corpo está adaptado para não perder água. Podem beber 200 litros de água de uma vez!',
    minLevel: 7,
  },
  {
    question: 'Que animal vive no Ártico e é o maior carnívoro terrestre?',
    options: ['Urso polar', 'Pinguim', 'Foca', 'Rena'],
    correct: 'Urso polar',
    fact: 'O urso polar vive no Ártico (Polo Norte) e pode pesar até 700 kg. A sua pele é na verdade preta, mas o pelo transparente parece branco com a luz!',
    minLevel: 7,
  },
  {
    question: 'Como se chama a montanha que pode expelir lava e cinzas?',
    options: ['Vulcão', 'Glaciar', 'Geyser', 'Cratera'],
    correct: 'Vulcão',
    fact: 'Existem cerca de 1.500 vulcões activos no mundo. O Anel de Fogo do Pacífico tem 75% de todos os vulcões da Terra!',
    minLevel: 8,
  },
  {
    question: 'Qual é o ponto mais fundo do oceano?',
    options: ['Fossa das Marianas', 'Fossa do Atlântico', 'Mar Morto', 'Lago Baikal'],
    correct: 'Fossa das Marianas',
    fact: 'A Fossa das Marianas, no Oceano Pacífico, tem quase 11.000 metros de profundidade. Se lá colocássemos o Monte Evereste, ainda faltava mais de 2 km para chegar à superfície!',
    minLevel: 8,
  },
  {
    question: 'Qual é o lago mais profundo do mundo?',
    options: ['Lago Baikal', 'Lago Victoria', 'Lago Superior', 'Lago Titicaca'],
    correct: 'Lago Baikal',
    fact: 'O Lago Baikal na Rússia tem 1.642 metros de profundidade e contém cerca de 20% da água doce do planeta. Tem mais de 25 milhões de anos!',
    minLevel: 8,
  },
  {
    question: 'Que capital europeia é conhecida como a "Cidade da Luz"?',
    options: ['Paris', 'Londres', 'Madrid', 'Roma'],
    correct: 'Paris',
    fact: 'Paris foi uma das primeiras cidades a ter iluminação pública no século XVII. A Torre Eiffel sozinha tem 20.000 lâmpadas que brilham todas as noites!',
    minLevel: 3,
  },
  {
    question: 'Qual é o animal terrestre mais rápido do mundo?',
    options: ['Chita', 'Leão', 'Cavalo', 'Avestruz'],
    correct: 'Chita',
    fact: 'A chita pode correr até 120 km/h, mas só aguenta essa velocidade durante 30 segundos! Vive em África e é o animal terrestre mais rápido.',
    minLevel: 3,
  },
  {
    question: 'Que rio atravessa o Egipto?',
    options: ['Nilo', 'Amazonas', 'Danúbio', 'Tejo'],
    correct: 'Nilo',
    fact: 'O Nilo foi essencial para a civilização egípcia. As suas cheias anuais tornavam as terras férteis para a agricultura há mais de 5.000 anos!',
    minLevel: 4,
  },
  {
    question: 'Qual é o país com mais ilhas no mundo?',
    options: ['Suécia', 'Indonésia', 'Filipinas', 'Japão'],
    correct: 'Suécia',
    fact: 'A Suécia tem mais de 267.000 ilhas! A maioria são pequenas e desabitadas. A Indonésia vem em segundo com cerca de 17.000 ilhas.',
    minLevel: 6,
  },
  {
    question: 'Em que país fica Machu Picchu?',
    options: ['Peru', 'Bolívia', 'Chile', 'Colômbia'],
    correct: 'Peru',
    fact: 'Machu Picchu fica nos Andes peruanos, a 2.430 metros de altitude. Foi construída pelos Incas no século XV e redescoberta em 1911!',
    minLevel: 6,
  },
  {
    question: 'Que oceano banha a costa de Portugal?',
    options: ['Atlântico', 'Pacífico', 'Índico', 'Ártico'],
    correct: 'Atlântico',
    fact: 'O Oceano Atlântico banha toda a costa portuguesa. Portugal foi um dos países pioneiros na exploração marítima, navegando pelo Atlântico até à Índia e ao Brasil!',
    minLevel: 2,
  },
  {
    question: 'Que continente não tem países?',
    options: ['Antártida', 'Oceânia', 'Europa', 'Ásia'],
    correct: 'Antártida',
    fact: 'A Antártida não pertence a nenhum país. É governada pelo Tratado da Antártida, que a dedica à paz e à ciência. Só vivem lá cientistas!',
    minLevel: 5,
  },
  {
    question: 'Qual é a cidade mais populosa do mundo?',
    options: ['Tóquio', 'Nova Iorque', 'São Paulo', 'Pequim'],
    correct: 'Tóquio',
    fact: 'A área metropolitana de Tóquio tem mais de 37 milhões de pessoas — é a maior concentração urbana do planeta! Tem mais gente que muitos países inteiros.',
    minLevel: 7,
  },
  {
    question: 'Que canal liga o Oceano Atlântico ao Pacífico?',
    options: ['Canal do Panamá', 'Canal de Suez', 'Canal da Mancha', 'Canal de Moçambique'],
    correct: 'Canal do Panamá',
    fact: 'O Canal do Panamá tem 82 km e foi uma das maiores obras de engenharia da história. Poupa aos navios uma viagem de 15.000 km ao redor da América do Sul!',
    minLevel: 9,
  },
]

export default function WorldExplorer({
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
  const facts = useMemo(
    () => FACTS.filter(f => f.minLevel <= campoLevel),
    [campoLevel]
  )

  const current = facts[idx]
  const isComplete = idx >= facts.length

  useEffect(() => {
    if (!isComplete) {
      speak(current.question, { auto: true })
    }
  }, [idx])

  const handleAnswer = useCallback(
    (ans) => {
      registerClick()
      if (ans === current.correct) {
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
    updateCampoProgress('campo3', next + 10)
    if (next >= facts.length) {
      completeActivity('world-explorer', score >= 20 ? 3 : score >= 14 ? 2 : 1)
    }
  }, [idx, score, facts, completeActivity, updateCampoProgress])

  const finalStars = score >= 20 ? 3 : score >= 14 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Explorador do Mundo" backPath="/campo/3" color="var(--color-campo3)">
        <CompletionCelebration
          emoji="🗺️"
          title="És um explorador do mundo!"
          score={score}
          total={facts.length}
          stars={finalStars}
          color="var(--color-campo3)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Explorador do Mundo"
      instruction={current.question}
      backPath="/campo/3"
      color="var(--color-campo3)"
      score={score}
      total={facts.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.questionCard}>
        <span style={styles.questionIcon}>🌍</span>
        <p style={styles.questionText}>{current.question}</p>
      </div>

      <div style={styles.optionsList}>
        {current.options.map((opt) => (
          <button
            key={opt}
            className="btn-press"
            style={styles.optionBtn}
            onClick={() => handleAnswer(opt)}
            disabled={feedback !== null}
          >
            {opt}
          </button>
        ))}
      </div>

      {showFact && (
        <div style={styles.factCard} className="animate-slide-up">
          <span style={styles.factIcon}>💡</span>
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
    color: 'var(--color-text)',
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
