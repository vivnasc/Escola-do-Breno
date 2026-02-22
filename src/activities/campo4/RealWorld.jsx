import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import { useTTS } from '../../hooks/useTTS'

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
    tip: 'Em emergencia: chama um adulto, nao toques na pessoa se nao souberes, e liga para o numero de emergencia do teu pais.',
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
    situation: 'Queres comprar agua na loja. Custa 15 e tens 20. O que fazes?',
    emoji: '🏪',
    options: [
      { text: 'Vou a caixa, digo que quero agua, pago 20 e espero o troco de 5', correct: true },
      { text: 'Deixo o dinheiro no balcao e saio', correct: false },
      { text: 'Peco para levar de graca', correct: false },
    ],
    tip: 'Na loja: escolhe o que queres, vai a caixa, paga e confere o troco!',
  },
  {
    title: 'No Hospital',
    situation: 'Dói-te muito a barriga e tens de ir ao medico. Como te preparas?',
    emoji: '🏥',
    options: [
      { text: 'Digo ao medico onde doi, ha quanto tempo e o que comi', correct: true },
      { text: 'Nao digo nada e espero que ele adivinhe', correct: false },
      { text: 'Recuso-me a ir ao medico', correct: false },
    ],
    tip: 'No medico: explica o que sentes, onde doi, e ha quanto tempo. O medico precisa dessas informacoes para te ajudar!',
  },
  {
    title: 'Atravessar a Rua',
    situation: 'Precisas de atravessar uma rua movimentada. O que fazes?',
    emoji: '🚶',
    options: [
      { text: 'Procuro a passadeira, olho para os dois lados e espero que os carros parem', correct: true },
      { text: 'Corro a atravessar sem olhar', correct: false },
      { text: 'Fico parado para sempre', correct: false },
    ],
    tip: 'Na rua: usa sempre a passadeira, olha para a esquerda, depois para a direita, e so atravessa quando os carros pararem.',
  },
  {
    title: 'Fazer uma Chamada',
    situation: 'Precisas de ligar para a tua mae para ela te vir buscar. O que fazes?',
    emoji: '📱',
    options: [
      { text: 'Marco o numero da mae, espero que atenda, digo quem sou e onde estou', correct: true },
      { text: 'Envio uma mensagem sem dizer onde estou', correct: false },
      { text: 'Espero sem ligar a ninguem', correct: false },
    ],
    tip: 'Ao telefone: diz quem es, onde estas e o que precisas. Sabe de cor o numero dos teus pais!',
  },
  {
    title: 'Visita a Casa de um Amigo',
    situation: 'Vais a casa de um amigo pela primeira vez. Como te comportas?',
    emoji: '🏠',
    options: [
      { text: 'Cumprimento os pais dele, tiro os sapatos se pedirem, e sigo as regras da casa', correct: true },
      { text: 'Entro sem cumprimentar ninguem e abro o frigorifico', correct: false },
      { text: 'Recuso-me a ir porque nao conhesso a casa', correct: false },
    ],
    tip: 'Em casa alheia: cumprimentar, seguir as regras da casa e agradecer ao sair sao sinais de boa educacao.',
  },
  {
    title: 'Pedir Direccoes',
    situation: 'Estas numa cidade nova e nao sabes onde fica a biblioteca. O que fazes?',
    emoji: '🗺️',
    options: [
      { text: 'Pergunto a alguem de confianca (policia, empregado de loja) onde fica', correct: true },
      { text: 'Ando sem rumo ate encontrar', correct: false },
      { text: 'Desisto e volto para casa', correct: false },
    ],
    tip: 'Se nao sabes o caminho: pede ajuda a um adulto de confianca (policia, empregado). Sabe o nome do lugar que procuras!',
  },
  {
    title: 'Usar Dinheiro',
    situation: 'A tua mae da-te 100 para o dia. Tens de almossar (60) e comprar o bilhete de autocarro (25). Quanto sobra?',
    emoji: '💵',
    options: [
      { text: '15. Almoco 60, autocarro 25, total 85, sobram 15', correct: true },
      { text: 'Nao sei contar, gasto tudo no almoco', correct: false },
      { text: 'Compro doces com todo o dinheiro', correct: false },
    ],
    tip: 'Gerir dinheiro: primeiro paga o que precisas (comida, transporte), depois ve o que sobra para extras.',
  },
  {
    title: 'No Supermercado',
    situation: 'A tua mae pediu-te para ir buscar leite, pao e ovos ao supermercado. Como te organizas?',
    emoji: '🛒',
    options: [
      { text: 'Faco uma lista no telemovel, procuro os corredores certos e vou a caixa pagar', correct: true },
      { text: 'Ando pelo supermercado todo sem saber o que procuro', correct: false },
      { text: 'Compro so o que me apetece e esqueco a lista', correct: false },
    ],
    tip: 'No supermercado: faz uma lista antes de ir, procura os produtos por seccao (lacticinios, padaria, ovos) e confere a lista antes de pagar.',
  },
  {
    title: 'Pedir Comida',
    situation: 'Estas num restaurante de comida rapida e queres pedir um hamburguer. O que fazes?',
    emoji: '🍔',
    options: [
      { text: 'Olho para o menu, decido o que quero, espero a minha vez e peco com clareza', correct: true },
      { text: 'Aponto para a comida sem dizer nada', correct: false },
      { text: 'Peco a outra pessoa que faca o pedido por mim', correct: false },
    ],
    tip: 'Para pedir comida: le o menu com calma, decide antes de chegar ao balcao, diz o que queres com clareza e paga. Se nao perceberes algo no menu, podes perguntar!',
  },
  {
    title: 'No Dentista',
    situation: 'Tens uma consulta no dentista e doi-te um dente. Como te preparas?',
    emoji: '🦷',
    options: [
      { text: 'Digo ao dentista qual dente doi, ha quanto tempo doi e se doi mais com frio ou quente', correct: true },
      { text: 'Nao abro a boca porque tenho medo', correct: false },
      { text: 'Digo que nao doi nada para ir embora mais depressa', correct: false },
    ],
    tip: 'No dentista: explica o que sentes com honestidade. Podes dizer "doi aqui", "doi ha 3 dias" ou "doi quando como gelado". O dentista so te pode ajudar se souberes descrever o que sentes.',
  },
  {
    title: 'Lidar com Barulho',
    situation: 'Estas numa festa de aniversario e o barulho esta a incomodar-te muito. O que fazes?',
    emoji: '🔊',
    options: [
      { text: 'Digo a um adulto que preciso de uma pausa e vou a um sitio mais calmo por uns minutos', correct: true },
      { text: 'Fico e aguento mesmo que me sinta muito mal', correct: false },
      { text: 'Grito para todos fazerem silencio', correct: false },
    ],
    tip: 'Quando o barulho incomoda: nao precisas de aguentar. Podes ir a um sitio mais calmo, usar protecao auditiva ou pedir uma pausa. Conhecer os teus limites e cuidar de ti e muito inteligente.',
  },
  {
    title: 'Mudanca de Planos',
    situation: 'Ias ao parque com o teu pai, mas comecou a chover e nao podem ir. Como reages?',
    emoji: '🌧️',
    options: [
      { text: 'Fico desapontado mas penso numa alternativa divertida para fazer em casa', correct: true },
      { text: 'Fico muito zangado e recuso-me a fazer outra coisa', correct: false },
      { text: 'Choro o dia inteiro porque o plano mudou', correct: false },
    ],
    tip: 'Quando os planos mudam: e normal sentir frustacao. Respira fundo, aceita o que nao podes controlar e pensa numa alternativa. Ter um "plano B" ajuda muito quando as coisas mudam!',
  },
  {
    title: 'Conhecer Pessoas Novas',
    situation: 'Estas numa actividade nova e nao conheces ninguem. Como te apresentas?',
    emoji: '👋',
    options: [
      { text: 'Digo "Ola, o meu nome e..." e pergunto o nome da outra pessoa', correct: true },
      { text: 'Fico num canto sem falar com ninguem', correct: false },
      { text: 'Espero que as outras pessoas venham falar comigo primeiro', correct: false },
    ],
    tip: 'Para conhecer pessoas: olha para a pessoa, diz o teu nome e faz uma pergunta simples como "Como te chamas?" ou "Tambem es novo aqui?". Nao precisas de ser o mais falador, so precisas de dar o primeiro passo.',
  },
  {
    title: 'Seguranca na Internet',
    situation: 'Alguem que nao conheces manda-te uma mensagem online a pedir a tua morada. O que fazes?',
    emoji: '🔒',
    options: [
      { text: 'Nao respondo, nao partilho dados pessoais e conto a um adulto de confianca', correct: true },
      { text: 'Respondo porque a pessoa parece simpatica', correct: false },
      { text: 'Dou uma morada inventada para ver o que acontece', correct: false },
    ],
    tip: 'Na internet: nunca partilhes o teu nome completo, morada, escola ou fotos com desconhecidos. Se alguem te pedir informacoes pessoais, nao respondas e conta a um adulto de confianca.',
  },
  {
    title: 'Preparar a Mochila',
    situation: 'Amanha tens aulas de matematica, educacao fisica e ingles. Como preparas a mochila a noite?',
    emoji: '🎒',
    options: [
      { text: 'Verifico o horario, ponho os cadernos e materiais de cada disciplina e o equipamento de educacao fisica', correct: true },
      { text: 'Ponho tudo o que encontro e espero que esteja certo', correct: false },
      { text: 'Deixo para fazer de manha antes de sair', correct: false },
    ],
    tip: 'Preparar a mochila na noite anterior: olha o horario, faz uma lista mental (cadernos, materiais, equipamento) e verifica tudo. Assim de manha estas tranquilo e nao te esqueces de nada!',
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
  const { speak } = useTTS()
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [showTip, setShowTip] = useState(false)

  const current = CHALLENGES[idx]
  const isComplete = idx >= CHALLENGES.length

  useEffect(() => {
    if (!isComplete) {
      speak(current.situation)
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
    [registerClick, registerSuccess, registerError]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    setShowTip(false)
    const next = idx + 1
    setIdx(next)
    updateCampoProgress('campo4', next + 17)
    if (next >= CHALLENGES.length) {
      completeActivity('real-world', score >= 16 ? 3 : score >= 10 ? 2 : 1)
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
