import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const FACTS = [
  {
    question: 'Quantos continentes existem?',
    options: ['7', '5', '6', '8'],
    correct: '7',
    fact: 'Ha 7 continentes: Europa, Asia, Africa, America do Norte, America do Sul, Oceania e Antartida.',
  },
  {
    question: 'Em que continente fica o Brasil?',
    options: ['America do Sul', 'Europa', 'Africa', 'Asia'],
    correct: 'America do Sul',
    fact: 'O Brasil e o maior pais da America do Sul e ja ganhou 5 Mundiais de futebol!',
  },
  {
    question: 'Qual e o maior rio de Africa?',
    options: ['Nilo', 'Amazonas', 'Danubio', 'Zambeze'],
    correct: 'Nilo',
    fact: 'O Nilo e o rio mais comprido de Africa, com cerca de 6.650 km!',
  },
  {
    question: 'Em que pais fica o Monte Kilimanjaro?',
    options: ['Tanzania', 'Quenia', 'Brasil', 'India'],
    correct: 'Tanzania',
    fact: 'O Kilimanjaro e a montanha mais alta de Africa, com 5.895 metros!',
  },
  {
    question: 'O Mundial de 2022 foi em que pais?',
    options: ['Qatar', 'Russia', 'Brasil', 'Africa do Sul'],
    correct: 'Qatar',
    fact: 'O Qatar esta na Asia. A Argentina ganhou esse Mundial com Messi!',
  },
  {
    question: 'Em que pais fica a Torre Eiffel?',
    options: ['Franca', 'Italia', 'Espanha', 'Alemanha'],
    correct: 'Franca',
    fact: 'A Torre Eiffel fica em Paris, capital da Franca. O PSG joga la!',
  },
  {
    question: 'Qual e o maior oceano do mundo?',
    options: ['Pacifico', 'Atlantico', 'Indico', 'Artico'],
    correct: 'Pacifico',
    fact: 'O Oceano Pacifico e o maior do mundo. Cobre mais area do que todos os continentes juntos!',
  },
  {
    question: 'Em que pais fica a cidade de Buenos Aires?',
    options: ['Argentina', 'Brasil', 'Chile', 'Uruguai'],
    correct: 'Argentina',
    fact: 'Buenos Aires e a capital da Argentina, terra de Maradona e Messi!',
  },
  {
    question: 'Qual e o deserto mais quente do mundo?',
    options: ['Sahara', 'Gobi', 'Atacama', 'Kalahari'],
    correct: 'Sahara',
    fact: 'O Sahara fica em Africa e e quase tao grande como a China! Temperaturas chegam a 58 graus.',
  },
  {
    question: 'Que lingua se fala em Mocambique?',
    options: ['Portugues', 'Espanhol', 'Frances', 'Ingles'],
    correct: 'Portugues',
    fact: 'Mocambique fala portugues e e banhado pelo Oceano Indico. Maputo e a capital!',
  },
  {
    question: 'Qual e a montanha mais alta do mundo?',
    options: ['Evereste', 'Kilimanjaro', 'Aconcagua', 'Mont Blanc'],
    correct: 'Evereste',
    fact: 'O Monte Evereste tem 8.849 metros e fica entre o Nepal e a China!',
  },
  {
    question: 'Que pais tem a forma de uma bota?',
    options: ['Italia', 'Portugal', 'Grecia', 'Croacia'],
    correct: 'Italia',
    fact: 'A Italia tem forma de bota e e famosa por pizza, pasta e futebol! Roma e a capital.',
  },
  {
    question: 'Em que continente vivem os pinguins selvagens?',
    options: ['Antartida', 'Europa', 'Asia', 'America do Norte'],
    correct: 'Antartida',
    fact: 'A Antartida e o continente mais frio. Ninguem vive la permanentemente, so cientistas!',
  },
  {
    question: 'Qual e o rio mais comprido do mundo?',
    options: ['Nilo', 'Amazonas', 'Yangtze', 'Mississippi'],
    correct: 'Nilo',
    fact: 'O Nilo tem cerca de 6.650 km e atravessa 11 paises de Africa!',
  },
  {
    question: 'Em que pais fica a Grande Muralha?',
    options: ['China', 'India', 'Japao', 'Russia'],
    correct: 'China',
    fact: 'A Grande Muralha da China tem mais de 21.000 km! Foi construida ao longo de 2.000 anos.',
  },
  {
    question: 'Em que continente fica a maior floresta tropical do mundo, a Amazonia?',
    options: ['America do Sul', 'Africa', 'Asia', 'Oceania'],
    correct: 'America do Sul',
    fact: 'A Amazonia cobre 9 paises e produz cerca de 20% do oxigenio do planeta. Tem mais especies de animais do que qualquer outro lugar na Terra!',
  },
  {
    question: 'Onde fica a Grande Barreira de Coral?',
    options: ['Australia', 'Brasil', 'Japao', 'Mexico'],
    correct: 'Australia',
    fact: 'A Grande Barreira de Coral fica na costa da Australia e tem mais de 2.300 km. E tao grande que pode ser vista do espaco!',
  },
  {
    question: 'Qual e o mar onde se flutua sem esforco porque a agua e muito salgada?',
    options: ['Mar Morto', 'Mar Mediterraneo', 'Mar do Norte', 'Mar Vermelho'],
    correct: 'Mar Morto',
    fact: 'O Mar Morto, entre Israel e Jordania, e quase 10 vezes mais salgado que o oceano. O sal faz o corpo flutuar sem esforco!',
  },
  {
    question: 'Qual e a cadeia de montanhas mais comprida do mundo?',
    options: ['Andes', 'Himalaias', 'Alpes', 'Montanhas Rochosas'],
    correct: 'Andes',
    fact: 'Os Andes estendem-se por 7.000 km ao longo da America do Sul, atravessando 7 paises! O pico mais alto e o Aconcagua, com 6.961 metros.',
  },
  {
    question: 'Em que continente ficam as Cataratas Victoria?',
    options: ['Africa', 'America do Sul', 'Asia', 'Europa'],
    correct: 'Africa',
    fact: 'As Cataratas Victoria ficam entre a Zambia e o Zimbabue. Tem mais de 1.700 metros de largura e o barulho da agua ouve-se a 40 km de distancia!',
  },
  {
    question: 'Que animal consegue sobreviver no deserto do Sahara sem beber agua durante semanas?',
    options: ['Camelo', 'Elefante', 'Urso', 'Golfinho'],
    correct: 'Camelo',
    fact: 'Os camelos guardam gordura nas bossas (nao agua!) e o seu corpo esta adaptado para nao perder agua. Podem beber 200 litros de agua de uma vez!',
  },
  {
    question: 'Que animal vive no Artico e e o maior carnivoro terrestre?',
    options: ['Urso polar', 'Pinguim', 'Foca', 'Rena'],
    correct: 'Urso polar',
    fact: 'O urso polar vive no Artico (Polo Norte) e pode pesar ate 700 kg. A sua pele e na verdade preta, mas o pelo transparente parece branco com a luz!',
  },
  {
    question: 'Como se chama a montanha que pode expelir lava e cinzas?',
    options: ['Vulcao', 'Glaciar', 'Geyser', 'Cratera'],
    correct: 'Vulcao',
    fact: 'Existem cerca de 1.500 vulcoes activos no mundo. O Anel de Fogo do Pacifico tem 75% de todos os vulcoes da Terra!',
  },
  {
    question: 'Qual e o ponto mais fundo do oceano?',
    options: ['Fossa das Marianas', 'Fossa do Atlantico', 'Mar Morto', 'Lago Baikal'],
    correct: 'Fossa das Marianas',
    fact: 'A Fossa das Marianas, no Oceano Pacifico, tem quase 11.000 metros de profundidade. Se la colocassemos o Monte Evereste, ainda faltava mais de 2 km para chegar a superficie!',
  },
  {
    question: 'Qual e o lago mais profundo do mundo?',
    options: ['Lago Baikal', 'Lago Victoria', 'Lago Superior', 'Lago Titicaca'],
    correct: 'Lago Baikal',
    fact: 'O Lago Baikal na Russia tem 1.642 metros de profundidade e contem cerca de 20% da agua doce do planeta. Tem mais de 25 milhoes de anos!',
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

  const current = FACTS[idx]
  const isComplete = idx >= FACTS.length

  useEffect(() => {
    if (!isComplete) {
      speak(current.question)
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
    if (next >= FACTS.length) {
      completeActivity('world-explorer', score >= 20 ? 3 : score >= 14 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  const finalStars = score >= 20 ? 3 : score >= 14 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Explorador do Mundo" backPath="/campo/3" color="var(--color-campo3)">
        <CompletionCelebration
          emoji="🗺️"
          title="Es um explorador do mundo!"
          score={score}
          total={FACTS.length}
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
      total={FACTS.length}
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
