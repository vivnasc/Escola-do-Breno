import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const EXPERIMENTS = [
  {
    title: 'Animais e Habitats',
    question: 'Onde vive o peixe?',
    emoji: '🐟',
    options: [
      { text: 'Na agua (rio, lago ou mar)', emoji: '🌊', correct: true },
      { text: 'Na árvore', emoji: '🌳', correct: false },
      { text: 'No deserto', emoji: '🏜️', correct: false },
    ],
    fact: 'Os peixes respiram pela guelras e precisam de água para viver. Existem peixes de água doce e de água salgada!',
  },
  {
    title: 'Plantas e Sol',
    question: 'De que é que uma planta precisa para crescer?',
    emoji: '🌱',
    options: [
      { text: 'Agua, sol e terra', emoji: '☀️💧', correct: true },
      { text: 'Apenas chocolate', emoji: '🍫', correct: false },
      { text: 'Frio e escuridão', emoji: '🌑', correct: false },
    ],
    fact: 'As plantas fazem fotossíntese: usam a luz do sol para transformar água e ar em comida. Sem plantas não teríamos oxigénio!',
  },
  {
    title: 'Ciclo da Agua',
    question: 'O que acontece à água quando aquece muito?',
    emoji: '💧',
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
    options: [
      { text: 'Uma estrela enorme que nos da luz e calor', emoji: '⭐', correct: true },
      { text: 'Um planeta como a Terra', emoji: '🌍', correct: false },
      { text: 'Uma lâmpada no céu', emoji: '💡', correct: false },
    ],
    fact: 'O Sol é uma estrela! É tão grande que cabiam um milhão de Terras lá dentro. Dá-nos luz, calor e energia.',
  },
  {
    title: 'Estados da Matéria',
    question: 'O gelo, a água e o vapor são a mesma coisa?',
    emoji: '🧊',
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
    options: [
      { text: 'Porque a Terra roda sobre si mesma', emoji: '🔄', correct: true },
      { text: 'Porque o Sol se apaga a noite', emoji: '🌑', correct: false },
      { text: 'Porque as estrelas tapam o Sol', emoji: '⭐', correct: false },
    ],
    fact: 'A Terra roda como um pião. Quando o nosso lado fica virado para o Sol é dia. Quando fica ao contrário é noite. Uma volta completa demora 24 horas!',
  },
  {
    title: 'Gravidade',
    question: 'Porque e que as coisas caem para o chao?',
    emoji: '🍎',
    options: [
      { text: 'Porque a Terra puxa tudo para si (gravidade)', emoji: '🌍', correct: true },
      { text: 'Porque o ar empurra para baixo', emoji: '💨', correct: false },
      { text: 'Porque as coisas querem cair', emoji: '⬇️', correct: false },
    ],
    fact: 'A gravidade e a forca que puxa tudo para o centro da Terra. Na Lua, a gravidade e 6 vezes mais fraca — podes saltar muito mais alto!',
  },
  {
    title: 'Fosseis',
    question: 'O que e um fossil?',
    emoji: '🦴',
    options: [
      { text: 'Restos de seres vivos que viveram ha muito tempo', emoji: '🦕', correct: true },
      { text: 'Uma pedra bonita', emoji: '💎', correct: false },
      { text: 'Um tipo de planta', emoji: '🌿', correct: false },
    ],
    fact: 'Os fosseis formam-se quando restos de animais ou plantas ficam presos em rochas durante milhoes de anos. E assim que sabemos que os dinossauros existiram!',
  },
  {
    title: 'Vulcoes',
    question: 'O que sai de um vulcao quando entra em erupcao?',
    emoji: '🌋',
    options: [
      { text: 'Lava, cinzas e gases quentes', emoji: '🔥', correct: true },
      { text: 'Agua e gelo', emoji: '🧊', correct: false },
      { text: 'Areia e pedras frias', emoji: '🪨', correct: false },
    ],
    fact: 'A lava e rocha derretida que vem do interior da Terra. Pode atingir 1.200 graus! Existem cerca de 1.500 vulcoes activos no mundo.',
  },
  {
    title: 'Insectos',
    question: 'Quantas patas tem um insecto?',
    emoji: '🐛',
    options: [
      { text: '6 patas', emoji: '🐜', correct: true },
      { text: '4 patas', emoji: '🐕', correct: false },
      { text: '8 patas', emoji: '🕷️', correct: false },
    ],
    fact: 'Todos os insectos tem 6 patas. As aranhas tem 8 patas e NAO sao insectos — sao aracnideos! As formigas conseguem carregar 50 vezes o seu peso.',
  },
  {
    title: 'Reciclagem',
    question: 'Porque e importante reciclar?',
    emoji: '♻️',
    options: [
      { text: 'Para proteger a natureza e reutilizar materiais', emoji: '🌍', correct: true },
      { text: 'Porque o lixo e bonito', emoji: '✨', correct: false },
      { text: 'Nao e importante', emoji: '❌', correct: false },
    ],
    fact: 'Reciclar uma lata de aluminio poupa energia suficiente para alimentar uma TV durante 3 horas! Cada pessoa pode fazer a diferenca.',
  },
  {
    title: 'Estacoes do Ano',
    question: 'Porque existem estacoes do ano?',
    emoji: '🍂',
    options: [
      { text: 'Porque a Terra e inclinada enquanto roda a volta do Sol', emoji: '🌍', correct: true },
      { text: 'Porque o Sol muda de tamanho', emoji: '☀️', correct: false },
      { text: 'Porque a Terra se afasta do Sol', emoji: '🚀', correct: false },
    ],
    fact: 'O eixo da Terra e inclinado 23.5 graus. Quando o teu hemisferio esta inclinado para o Sol, e verao. Quando esta inclinado para o outro lado, e inverno!',
  },
  {
    title: 'Magnetismo',
    question: 'O que e que um iman atrai?',
    emoji: '🧲',
    options: [
      { text: 'Objectos de ferro e aco', emoji: '🔩', correct: true },
      { text: 'Tudo o que existe', emoji: '🌍', correct: false },
      { text: 'Apenas papel e madeira', emoji: '📄', correct: false },
    ],
    fact: 'Os imans atraem metais como ferro e aco. A Terra tambem e um iman gigante — e por isso que a bussola aponta para o norte!',
  },
  {
    title: 'Electricidade',
    question: 'O que faz uma lampada acender?',
    emoji: '💡',
    options: [
      { text: 'Electricidade a passar pelo filamento', emoji: '⚡', correct: true },
      { text: 'O ar dentro da lampada', emoji: '💨', correct: false },
      { text: 'O vidro da lampada', emoji: '🔮', correct: false },
    ],
    fact: 'A electricidade e o movimento de particulas minusculas chamadas electroes. Viajam a velocidades incriveis nos fios electricos!',
  },
  {
    title: 'Ondas Sonoras',
    question: 'Como e que o som viaja ate aos nossos ouvidos?',
    emoji: '🔊',
    options: [
      { text: 'Atraves de vibracoes no ar', emoji: '🌬️', correct: true },
      { text: 'Atraves de raios de luz', emoji: '💡', correct: false },
      { text: 'Atraves de fios invisiveis', emoji: '🧵', correct: false },
    ],
    fact: 'O som e uma vibracao que viaja pelo ar, pela agua e ate por materiais solidos. No espaco nao ha som porque nao ha ar para vibrar! O som viaja mais rapido na agua do que no ar.',
  },
  {
    title: 'Migracao Animal',
    question: 'Porque e que algumas aves voam para outros paises no inverno?',
    emoji: '🦅',
    options: [
      { text: 'Para encontrar comida e clima mais quente', emoji: '☀️', correct: true },
      { text: 'Porque gostam de viajar', emoji: '✈️', correct: false },
      { text: 'Porque tem medo da chuva', emoji: '🌧️', correct: false },
    ],
    fact: 'A migracao e uma viagem longa que muitos animais fazem todos os anos. A andorinha-do-artico faz a migracao mais longa: 70.000 km por ano, do Artico ate a Antartida e de volta!',
  },
  {
    title: 'Camuflagem',
    question: 'Porque e que alguns animais tem cores parecidas com o ambiente?',
    emoji: '🦎',
    options: [
      { text: 'Para se esconderem de predadores ou de presas', emoji: '👀', correct: true },
      { text: 'Porque gostam de moda', emoji: '👗', correct: false },
      { text: 'Porque a tinta da pele estragou', emoji: '🎨', correct: false },
    ],
    fact: 'A camuflagem e uma tactica de sobrevivencia. O camaleao muda de cor, o polvo imita o fundo do mar, e o bicho-pau parece um ramo de arvore. Ate existem insectos que parecem folhas!',
  },
  {
    title: 'Biodiversidade',
    question: 'O que significa biodiversidade?',
    emoji: '🌿',
    options: [
      { text: 'A enorme variedade de seres vivos no planeta', emoji: '🌍', correct: true },
      { text: 'Um tipo de planta rara', emoji: '🌺', correct: false },
      { text: 'Uma doenca dos animais', emoji: '🤒', correct: false },
    ],
    fact: 'Existem cerca de 8,7 milhoes de especies no planeta! A floresta amazonica sozinha tem mais de 40.000 especies de plantas e 1.300 especies de aves. Cada ser vivo tem um papel importante.',
  },
  {
    title: 'Polinizacao',
    question: 'Porque e que as abelhas visitam as flores?',
    emoji: '🐝',
    options: [
      { text: 'Para recolher nectar e espalhar polen entre flores', emoji: '🌸', correct: true },
      { text: 'Porque gostam de cores bonitas', emoji: '🌈', correct: false },
      { text: 'Para dormir dentro das petalas', emoji: '😴', correct: false },
    ],
    fact: 'As abelhas sao polinizadoras essenciais. Quando visitam flores, levam polen de uma flor para outra, ajudando as plantas a reproduzir-se. Sem abelhas, perderiamos um terco dos alimentos que comemos!',
  },
  {
    title: 'Decomposicao',
    question: 'O que acontece as folhas que caem das arvores no outono?',
    emoji: '🍂',
    options: [
      { text: 'Sao decompostas por fungos e bacterias e viram nutrientes', emoji: '🍄', correct: true },
      { text: 'Ficam la para sempre', emoji: '♾️', correct: false },
      { text: 'Evaporam com o sol', emoji: '☀️', correct: false },
    ],
    fact: 'Os decompositores como fungos, bacterias e minhocas transformam materia morta em nutrientes para o solo. Sem eles, o mundo estaria coberto de folhas e restos de plantas ha milhoes de anos!',
  },
  {
    title: 'Correntes Oceanicas',
    question: 'A agua do oceano esta sempre parada?',
    emoji: '🌊',
    options: [
      { text: 'Nao, existem correntes que movem a agua pelo planeta inteiro', emoji: '🔄', correct: true },
      { text: 'Sim, a agua fica sempre no mesmo sitio', emoji: '⏸️', correct: false },
      { text: 'So se move quando ha tempestades', emoji: '⛈️', correct: false },
    ],
    fact: 'As correntes oceanicas sao como rios dentro do mar. A Corrente do Golfo leva agua quente do Mexico ate a Europa, ajudando a manter o clima mais ameno. Uma gota de agua pode demorar 1.000 anos a viajar pelo oceano inteiro!',
  },
  {
    title: 'Electricidade Estatica',
    question: 'Porque e que as vezes levamos um choque ao tocar numa macaneta?',
    emoji: '⚡',
    options: [
      { text: 'Porque o corpo acumulou electricidade estatica', emoji: '🔋', correct: true },
      { text: 'Porque a macaneta esta partida', emoji: '🔧', correct: false },
      { text: 'Porque o ar esta electrico', emoji: '🌩️', correct: false },
    ],
    fact: 'A electricidade estatica acumula-se quando nos movemos e as nossas roupas friccionam. Os relampagos sao electricidade estatica gigante nas nuvens! Um relampago pode atingir 30.000 graus — cinco vezes mais quente que a superficie do Sol.',
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
      completeActivity('nature-lab', score >= 20 ? 3 : score >= 14 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  const finalStars = score >= 20 ? 3 : score >= 14 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Laboratorio Natural" backPath="/campo/3" color="var(--color-campo3)">
        <CompletionCelebration
          emoji="🔬"
          title="Descobriste factos cientificos!"
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
