import { useState, useCallback, useEffect, useMemo } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const EXPERIMENTS = [
  {
    title: 'Animais e Habitats',
    question: 'Onde vive o peixe?',
    emoji: '🐟',
    minLevel: 1,
    options: [
      { text: 'Na água (rio, lago ou mar)', emoji: '🌊', correct: true },
      { text: 'Na árvore', emoji: '🌳', correct: false },
      { text: 'No deserto', emoji: '🏜️', correct: false },
    ],
    fact: 'Os peixes respiram pela guelras e precisam de água para viver. Existem peixes de água doce e de água salgada!',
  },
  {
    title: 'Plantas e Sol',
    question: 'De que é que uma planta precisa para crescer?',
    emoji: '🌱',
    minLevel: 1,
    options: [
      { text: 'Água, sol e terra', emoji: '☀️💧', correct: true },
      { text: 'Apenas chocolate', emoji: '🍫', correct: false },
      { text: 'Frio e escuridão', emoji: '🌑', correct: false },
    ],
    fact: 'As plantas fazem fotossíntese: usam a luz do sol para transformar água e ar em comida. Sem plantas não teríamos oxigénio!',
  },
  {
    title: 'Ciclo da Água',
    question: 'O que acontece à água quando aquece muito?',
    emoji: '💧',
    minLevel: 2,
    options: [
      { text: 'Evapora e sobe para as nuvens', emoji: '☁️', correct: true },
      { text: 'Fica congelada', emoji: '🧊', correct: false },
      { text: 'Desaparece para sempre', emoji: '✨', correct: false },
    ],
    fact: 'A água evapora com o calor, forma nuvens, e depois cai como chuva. Chama-se ciclo da água e repete-se sempre!',
  },
  {
    title: 'Cadeia Alimentar',
    question: 'O que come o leão?',
    emoji: '🦁',
    minLevel: 2,
    options: [
      { text: 'Outros animais (zebras, antílopes)', emoji: '🦓', correct: true },
      { text: 'Plantas e flores', emoji: '🌸', correct: false },
      { text: 'Pedras e areia', emoji: '🪨', correct: false },
    ],
    fact: 'O leão é um predador. A cadeia alimentar funciona assim: plantas → herbívoros (zebra) → predadores (leão). Cada ser vivo depende do outro!',
  },
  {
    title: 'Sistema Solar',
    question: 'O que é o Sol?',
    emoji: '☀️',
    minLevel: 3,
    options: [
      { text: 'Uma estrela enorme que nos dá luz e calor', emoji: '⭐', correct: true },
      { text: 'Um planeta como a Terra', emoji: '🌍', correct: false },
      { text: 'Uma lâmpada no céu', emoji: '💡', correct: false },
    ],
    fact: 'O Sol é uma estrela! É tão grande que cabiam um milhão de Terras lá dentro. Dá-nos luz, calor e energia.',
  },
  {
    title: 'Estados da Matéria',
    question: 'O gelo, a água e o vapor são a mesma coisa?',
    emoji: '🧊',
    minLevel: 3,
    options: [
      { text: 'Sim, tudo é água em estados diferentes', emoji: '💧', correct: true },
      { text: 'Não, são coisas completamente diferentes', emoji: '❌', correct: false },
      { text: 'Só o gelo é água', emoji: '🧊', correct: false },
    ],
    fact: 'A água existe em 3 estados: sólido (gelo), líquido (água) e gasoso (vapor). Muda de estado com a temperatura!',
  },
  {
    title: 'Sentidos Humanos',
    question: 'Quantos sentidos tem o ser humano?',
    emoji: '👁️',
    minLevel: 3,
    options: [
      { text: '5: visão, audição, olfacto, paladar e tacto', emoji: '✋', correct: true },
      { text: '3: ver, ouvir e cheirar', emoji: '👃', correct: false },
      { text: '2: ver e ouvir', emoji: '👀', correct: false },
    ],
    fact: 'Temos 5 sentidos: vemos com os olhos, ouvimos com os ouvidos, cheiramos com o nariz, saboreamos com a língua e sentimos com a pele!',
  },
  {
    title: 'Dia e Noite',
    question: 'Porque é que temos dia e noite?',
    emoji: '🌍',
    minLevel: 4,
    options: [
      { text: 'Porque a Terra roda sobre si mesma', emoji: '🔄', correct: true },
      { text: 'Porque o Sol se apaga à noite', emoji: '🌑', correct: false },
      { text: 'Porque as estrelas tapam o Sol', emoji: '⭐', correct: false },
    ],
    fact: 'A Terra roda como um pião. Quando o nosso lado fica virado para o Sol é dia. Quando fica ao contrário é noite. Uma volta completa demora 24 horas!',
  },
  {
    title: 'Gravidade',
    question: 'Porque é que as coisas caem para o chão?',
    emoji: '🍎',
    minLevel: 4,
    options: [
      { text: 'Porque a Terra puxa tudo para si (gravidade)', emoji: '🌍', correct: true },
      { text: 'Porque o ar empurra para baixo', emoji: '💨', correct: false },
      { text: 'Porque as coisas querem cair', emoji: '⬇️', correct: false },
    ],
    fact: 'A gravidade é a força que puxa tudo para o centro da Terra. Na Lua, a gravidade é 6 vezes mais fraca — podes saltar muito mais alto!',
  },
  {
    title: 'Fósseis',
    question: 'O que é um fóssil?',
    emoji: '🦴',
    minLevel: 5,
    options: [
      { text: 'Restos de seres vivos que viveram há muito tempo', emoji: '🦕', correct: true },
      { text: 'Uma pedra bonita', emoji: '💎', correct: false },
      { text: 'Um tipo de planta', emoji: '🌿', correct: false },
    ],
    fact: 'Os fósseis formam-se quando restos de animais ou plantas ficam presos em rochas durante milhões de anos. É assim que sabemos que os dinossauros existiram!',
  },
  {
    title: 'Vulcões',
    question: 'O que sai de um vulcão quando entra em erupção?',
    emoji: '🌋',
    minLevel: 6,
    options: [
      { text: 'Lava, cinzas e gases quentes', emoji: '🔥', correct: true },
      { text: 'Água e gelo', emoji: '🧊', correct: false },
      { text: 'Areia e pedras frias', emoji: '🪨', correct: false },
    ],
    fact: 'A lava é rocha derretida que vem do interior da Terra. Pode atingir 1.200 graus! Existem cerca de 1.500 vulcões activos no mundo.',
  },
  {
    title: 'Insectos',
    question: 'Quantas patas tem um insecto?',
    emoji: '🐛',
    minLevel: 4,
    options: [
      { text: '6 patas', emoji: '🐜', correct: true },
      { text: '4 patas', emoji: '🐕', correct: false },
      { text: '8 patas', emoji: '🕷️', correct: false },
    ],
    fact: 'Todos os insectos têm 6 patas. As aranhas têm 8 patas e NÃO são insectos — são aracnídeos! As formigas conseguem carregar 50 vezes o seu peso.',
  },
  {
    title: 'Reciclagem',
    question: 'Porque é importante reciclar?',
    emoji: '♻️',
    minLevel: 5,
    options: [
      { text: 'Para proteger a natureza e reutilizar materiais', emoji: '🌍', correct: true },
      { text: 'Porque o lixo é bonito', emoji: '✨', correct: false },
      { text: 'Não é importante', emoji: '❌', correct: false },
    ],
    fact: 'Reciclar uma lata de alumínio poupa energia suficiente para alimentar uma TV durante 3 horas! Cada pessoa pode fazer a diferença.',
  },
  {
    title: 'Estações do Ano',
    question: 'Porque existem estações do ano?',
    emoji: '🍂',
    minLevel: 5,
    options: [
      { text: 'Porque a Terra é inclinada enquanto roda à volta do Sol', emoji: '🌍', correct: true },
      { text: 'Porque o Sol muda de tamanho', emoji: '☀️', correct: false },
      { text: 'Porque a Terra se afasta do Sol', emoji: '🚀', correct: false },
    ],
    fact: 'O eixo da Terra é inclinado 23.5 graus. Quando o teu hemisfério está inclinado para o Sol, é verão. Quando está inclinado para o outro lado, é inverno!',
  },
  {
    title: 'Magnetismo',
    question: 'O que é que um íman atrai?',
    emoji: '🧲',
    minLevel: 6,
    options: [
      { text: 'Objectos de ferro e aço', emoji: '🔩', correct: true },
      { text: 'Tudo o que existe', emoji: '🌍', correct: false },
      { text: 'Apenas papel e madeira', emoji: '📄', correct: false },
    ],
    fact: 'Os ímans atraem metais como ferro e aço. A Terra também é um íman gigante — é por isso que a bússola aponta para o norte!',
  },
  {
    title: 'Electricidade',
    question: 'O que faz uma lâmpada acender?',
    emoji: '💡',
    minLevel: 6,
    options: [
      { text: 'Electricidade a passar pelo filamento', emoji: '⚡', correct: true },
      { text: 'O ar dentro da lâmpada', emoji: '💨', correct: false },
      { text: 'O vidro da lâmpada', emoji: '🔮', correct: false },
    ],
    fact: 'A electricidade é o movimento de partículas minúsculas chamadas electrões. Viajam a velocidades incríveis nos fios eléctricos!',
  },
  {
    title: 'Ondas Sonoras',
    question: 'Como é que o som viaja até aos nossos ouvidos?',
    emoji: '🔊',
    minLevel: 7,
    options: [
      { text: 'Através de vibrações no ar', emoji: '🌬️', correct: true },
      { text: 'Através de raios de luz', emoji: '💡', correct: false },
      { text: 'Através de fios invisíveis', emoji: '🧵', correct: false },
    ],
    fact: 'O som é uma vibração que viaja pelo ar, pela água e até por materiais sólidos. No espaço não há som porque não há ar para vibrar! O som viaja mais rápido na água do que no ar.',
  },
  {
    title: 'Migração Animal',
    question: 'Porque é que algumas aves voam para outros países no inverno?',
    emoji: '🦅',
    options: [
      { text: 'Para encontrar comida e clima mais quente', emoji: '☀️', correct: true },
      { text: 'Porque gostam de viajar', emoji: '✈️', correct: false },
      { text: 'Porque tem medo da chuva', emoji: '🌧️', correct: false },
    ],
    fact: 'A migração é uma viagem longa que muitos animais fazem todos os anos. A andorinha-do-ártico faz a migração mais longa: 70.000 km por ano, do Ártico até à Antártida e de volta!',
  },
  {
    title: 'Camuflagem',
    question: 'Porque é que alguns animais têm cores parecidas com o ambiente?',
    emoji: '🦎',
    options: [
      { text: 'Para se esconderem de predadores ou de presas', emoji: '👀', correct: true },
      { text: 'Porque gostam de moda', emoji: '👗', correct: false },
      { text: 'Porque a tinta da pele estragou', emoji: '🎨', correct: false },
    ],
    fact: 'A camuflagem é uma táctica de sobrevivência. O camaleão muda de cor, o polvo imita o fundo do mar, e o bicho-pau parece um ramo de árvore. Até existem insectos que parecem folhas!',
  },
  {
    title: 'Biodiversidade',
    question: 'O que significa biodiversidade?',
    emoji: '🌿',
    options: [
      { text: 'A enorme variedade de seres vivos no planeta', emoji: '🌍', correct: true },
      { text: 'Um tipo de planta rara', emoji: '🌺', correct: false },
      { text: 'Uma doença dos animais', emoji: '🤒', correct: false },
    ],
    fact: 'Existem cerca de 8,7 milhões de espécies no planeta! A floresta amazónica sozinha tem mais de 40.000 espécies de plantas e 1.300 espécies de aves. Cada ser vivo tem um papel importante.',
  },
  {
    title: 'Polinização',
    question: 'Porque é que as abelhas visitam as flores?',
    emoji: '🐝',
    options: [
      { text: 'Para recolher néctar e espalhar pólen entre flores', emoji: '🌸', correct: true },
      { text: 'Porque gostam de cores bonitas', emoji: '🌈', correct: false },
      { text: 'Para dormir dentro das pétalas', emoji: '😴', correct: false },
    ],
    fact: 'As abelhas são polinizadoras essenciais. Quando visitam flores, levam pólen de uma flor para outra, ajudando as plantas a reproduzir-se. Sem abelhas, perderíamos um terço dos alimentos que comemos!',
  },
  {
    title: 'Decomposição',
    question: 'O que acontece às folhas que caem das árvores no outono?',
    emoji: '🍂',
    options: [
      { text: 'São decompostas por fungos e bactérias e viram nutrientes', emoji: '🍄', correct: true },
      { text: 'Ficam lá para sempre', emoji: '♾️', correct: false },
      { text: 'Evaporam com o sol', emoji: '☀️', correct: false },
    ],
    fact: 'Os decompositores como fungos, bactérias e minhocas transformam matéria morta em nutrientes para o solo. Sem eles, o mundo estaria coberto de folhas e restos de plantas há milhões de anos!',
  },
  {
    title: 'Correntes Oceânicas',
    question: 'A água do oceano está sempre parada?',
    emoji: '🌊',
    options: [
      { text: 'Não, existem correntes que movem a água pelo planeta inteiro', emoji: '🔄', correct: true },
      { text: 'Sim, a água fica sempre no mesmo sítio', emoji: '⏸️', correct: false },
      { text: 'Só se move quando há tempestades', emoji: '⛈️', correct: false },
    ],
    fact: 'As correntes oceânicas são como rios dentro do mar. A Corrente do Golfo leva água quente do México até à Europa, ajudando a manter o clima mais ameno. Uma gota de água pode demorar 1.000 anos a viajar pelo oceano inteiro!',
  },
  {
    title: 'Electricidade Estática',
    question: 'Porque é que às vezes levamos um choque ao tocar numa maçaneta?',
    emoji: '⚡',
    options: [
      { text: 'Porque o corpo acumulou electricidade estática', emoji: '🔋', correct: true },
      { text: 'Porque a maçaneta está partida', emoji: '🔧', correct: false },
      { text: 'Porque o ar está eléctrico', emoji: '🌩️', correct: false },
    ],
    fact: 'A electricidade estática acumula-se quando nos movemos e as nossas roupas friccionam. Os relâmpagos são electricidade estática gigante nas nuvens! Um relâmpago pode atingir 30.000 graus — cinco vezes mais quente que a superfície do Sol.',
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
      speak(current.question, { auto: true })
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
      completeActivity('nature-lab', score >= 20 ? 3 : score >= 14 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  const finalStars = score >= 20 ? 3 : score >= 14 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Laboratório Natural" backPath="/campo/3" color="var(--color-campo3)">
        <CompletionCelebration
          emoji="🔬"
          title="Descobriste factos científicos!"
          score={score}
          total={EXPERIMENTS.length}
          stars={finalStars}
          color="var(--color-campo3)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Laboratório Natural"
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
            className="btn-press"
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
