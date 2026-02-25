import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const CHALLENGES = [
  {
    title: 'No Restaurante',
    situation: 'Estás no restaurante com a tua família. Queres pedir frango grelhado. O que fazes?',
    emoji: '🍽️',
    options: [
      { text: 'Olho para o menu, encontro "frango grelhado" e peço ao empregado', correct: true },
      { text: 'Grito "frango!" muito alto', correct: false },
      { text: 'Saio do restaurante', correct: false },
    ],
    tip: 'No restaurante: olha o menu, decide o que queres, espera a tua vez, e pede com educação.',
  },
  {
    title: 'No Autocarro',
    situation: 'Precisas de apanhar o autocarro para ir ao estádio. O que tens de saber?',
    emoji: '🚌',
    options: [
      { text: 'O número do autocarro, a paragem e o horário', correct: true },
      { text: 'Só o nome do estádio', correct: false },
      { text: 'Nada, o autocarro vem sozinho', correct: false },
    ],
    tip: 'Para usar transportes: sabe o número/nome, a paragem, o horário e o dinheiro necessário.',
  },
  {
    title: 'Estou Perdido',
    situation: 'Estás no centro comercial e não encontras os teus pais. O que fazes?',
    emoji: '🏬',
    options: [
      { text: 'Fico no mesmo sítio, procuro um segurança e digo o meu nome e o dos meus pais', correct: true },
      { text: 'Corro para todo o lado a gritar', correct: false },
      { text: 'Vou para a rua sozinho', correct: false },
    ],
    tip: 'Se te perderes: fica parado, procura alguém de uniforme, sabe dizer o teu nome e o contacto dos teus pais.',
  },
  {
    title: 'Emergência',
    situation: 'Alguém se magoa no recreio e precisa de ajuda. O que fazes?',
    emoji: '🚑',
    options: [
      { text: 'Chamo um professor e fico junto da pessoa', correct: true },
      { text: 'Ignoro e continuo a brincar', correct: false },
      { text: 'Tento resolver sozinho', correct: false },
    ],
    tip: 'Em emergência: chama um adulto, não toques na pessoa se não souberes, e liga para o número de emergência do teu país.',
  },
  {
    title: 'Dados Pessoais',
    situation: 'Um adulto da escola pergunta o teu nome completo e morada. É seguro responder?',
    emoji: '🪪',
    options: [
      { text: 'Sim, adultos da escola são de confiança e preciso saber dizer os meus dados', correct: true },
      { text: 'Nunca, a ninguém', correct: false },
      { text: 'Só digo se me derem um presente', correct: false },
    ],
    tip: 'Sabe o teu nome completo, morada, e contacto dos pais. Partilha com adultos de confiança (escola, polícia).',
  },
  {
    title: 'Na Loja',
    situation: 'Queres comprar água na loja. Custa 15 e tens 20. O que fazes?',
    emoji: '🏪',
    options: [
      { text: 'Vou à caixa, digo que quero água, pago 20 e espero o troco de 5', correct: true },
      { text: 'Deixo o dinheiro no balcão e saio', correct: false },
      { text: 'Peço para levar de graça', correct: false },
    ],
    tip: 'Na loja: escolhe o que queres, vai à caixa, paga e confere o troco!',
  },
  {
    title: 'No Hospital',
    situation: 'Dói-te muito a barriga e tens de ir ao médico. Como te preparas?',
    emoji: '🏥',
    options: [
      { text: 'Digo ao médico onde dói, há quanto tempo e o que comi', correct: true },
      { text: 'Não digo nada e espero que ele adivinhe', correct: false },
      { text: 'Recuso-me a ir ao médico', correct: false },
    ],
    tip: 'No médico: explica o que sentes, onde dói, e há quanto tempo. O médico precisa dessas informações para te ajudar!',
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
    tip: 'Na rua: usa sempre a passadeira, olha para a esquerda, depois para a direita, e só atravessa quando os carros pararem.',
  },
  {
    title: 'Fazer uma Chamada',
    situation: 'Precisas de ligar para a tua mãe para ela te vir buscar. O que fazes?',
    emoji: '📱',
    options: [
      { text: 'Marco o número da mãe, espero que atenda, digo quem sou e onde estou', correct: true },
      { text: 'Envio uma mensagem sem dizer onde estou', correct: false },
      { text: 'Espero sem ligar a ninguém', correct: false },
    ],
    tip: 'Ao telefone: diz quem és, onde estás e o que precisas. Sabe de cor o número dos teus pais!',
  },
  {
    title: 'Visita a Casa de um Amigo',
    situation: 'Vais a casa de um amigo pela primeira vez. Como te comportas?',
    emoji: '🏠',
    options: [
      { text: 'Cumprimento os pais dele, tiro os sapatos se pedirem, e sigo as regras da casa', correct: true },
      { text: 'Entro sem cumprimentar ninguém e abro o frigorífico', correct: false },
      { text: 'Recuso-me a ir porque não conheço a casa', correct: false },
    ],
    tip: 'Em casa alheia: cumprimentar, seguir as regras da casa e agradecer ao sair são sinais de boa educação.',
  },
  {
    title: 'Pedir Direcções',
    situation: 'Estás numa cidade nova e não sabes onde fica a biblioteca. O que fazes?',
    emoji: '🗺️',
    options: [
      { text: 'Pergunto a alguém de confiança (polícia, empregado de loja) onde fica', correct: true },
      { text: 'Ando sem rumo até encontrar', correct: false },
      { text: 'Desisto e volto para casa', correct: false },
    ],
    tip: 'Se não sabes o caminho: pede ajuda a um adulto de confiança (polícia, empregado). Sabe o nome do lugar que procuras!',
  },
  {
    title: 'Usar Dinheiro',
    situation: 'A tua mãe dá-te 100 para o dia. Tens de almoçar (60) e comprar o bilhete de autocarro (25). Quanto sobra?',
    emoji: '💵',
    options: [
      { text: '15. Almoço 60, autocarro 25, total 85, sobram 15', correct: true },
      { text: 'Não sei contar, gasto tudo no almoço', correct: false },
      { text: 'Compro doces com todo o dinheiro', correct: false },
    ],
    tip: 'Gerir dinheiro: primeiro paga o que precisas (comida, transporte), depois vê o que sobra para extras.',
  },
  {
    title: 'No Supermercado',
    situation: 'A tua mãe pediu-te para ir buscar leite, pão e ovos ao supermercado. Como te organizas?',
    emoji: '🛒',
    options: [
      { text: 'Faço uma lista no telemóvel, procuro os corredores certos e vou à caixa pagar', correct: true },
      { text: 'Ando pelo supermercado todo sem saber o que procuro', correct: false },
      { text: 'Compro só o que me apetece e esqueço a lista', correct: false },
    ],
    tip: 'No supermercado: faz uma lista antes de ir, procura os produtos por secção (lacticínios, padaria, ovos) e confere a lista antes de pagar.',
  },
  {
    title: 'Pedir Comida',
    situation: 'Estás num restaurante de comida rápida e queres pedir um hambúrguer. O que fazes?',
    emoji: '🍔',
    options: [
      { text: 'Olho para o menu, decido o que quero, espero a minha vez e peço com clareza', correct: true },
      { text: 'Aponto para a comida sem dizer nada', correct: false },
      { text: 'Peço a outra pessoa que faça o pedido por mim', correct: false },
    ],
    tip: 'Para pedir comida: lê o menu com calma, decide antes de chegar ao balcão, diz o que queres com clareza e paga. Se não perceberes algo no menu, podes perguntar!',
  },
  {
    title: 'No Dentista',
    situation: 'Tens uma consulta no dentista e dói-te um dente. Como te preparas?',
    emoji: '🦷',
    options: [
      { text: 'Digo ao dentista qual dente dói, há quanto tempo dói e se dói mais com frio ou quente', correct: true },
      { text: 'Não abro a boca porque tenho medo', correct: false },
      { text: 'Digo que não dói nada para ir embora mais depressa', correct: false },
    ],
    tip: 'No dentista: explica o que sentes com honestidade. Podes dizer "dói aqui", "dói há 3 dias" ou "dói quando como gelado". O dentista só te pode ajudar se souberes descrever o que sentes.',
  },
  {
    title: 'Lidar com Barulho',
    situation: 'Estás numa festa de aniversário e o barulho está a incomodar-te muito. O que fazes?',
    emoji: '🔊',
    options: [
      { text: 'Digo a um adulto que preciso de uma pausa e vou a um sítio mais calmo por uns minutos', correct: true },
      { text: 'Fico e aguento mesmo que me sinta muito mal', correct: false },
      { text: 'Grito para todos fazerem silêncio', correct: false },
    ],
    tip: 'Quando o barulho incomoda: não precisas de aguentar. Podes ir a um sítio mais calmo, usar proteção auditiva ou pedir uma pausa. Conhecer os teus limites e cuidar de ti é muito inteligente.',
  },
  {
    title: 'Mudança de Planos',
    situation: 'Ias ao parque com o teu pai, mas começou a chover e não podem ir. Como reages?',
    emoji: '🌧️',
    options: [
      { text: 'Fico desapontado mas penso numa alternativa divertida para fazer em casa', correct: true },
      { text: 'Fico muito zangado e recuso-me a fazer outra coisa', correct: false },
      { text: 'Choro o dia inteiro porque o plano mudou', correct: false },
    ],
    tip: 'Quando os planos mudam: é normal sentir frustração. Respira fundo, aceita o que não podes controlar e pensa numa alternativa. Ter um "plano B" ajuda muito quando as coisas mudam!',
  },
  {
    title: 'Conhecer Pessoas Novas',
    situation: 'Estás numa actividade nova e não conheces ninguém. Como te apresentas?',
    emoji: '👋',
    options: [
      { text: 'Digo "Olá, o meu nome é..." e pergunto o nome da outra pessoa', correct: true },
      { text: 'Fico num canto sem falar com ninguém', correct: false },
      { text: 'Espero que as outras pessoas venham falar comigo primeiro', correct: false },
    ],
    tip: 'Para conhecer pessoas: olha para a pessoa, diz o teu nome e faz uma pergunta simples como "Como te chamas?" ou "Também és novo aqui?". Não precisas de ser o mais falador, só precisas de dar o primeiro passo.',
  },
  {
    title: 'Segurança na Internet',
    situation: 'Alguém que não conheces manda-te uma mensagem online a pedir a tua morada. O que fazes?',
    emoji: '🔒',
    options: [
      { text: 'Não respondo, não partilho dados pessoais e conto a um adulto de confiança', correct: true },
      { text: 'Respondo porque a pessoa parece simpática', correct: false },
      { text: 'Dou uma morada inventada para ver o que acontece', correct: false },
    ],
    tip: 'Na internet: nunca partilhes o teu nome completo, morada, escola ou fotos com desconhecidos. Se alguém te pedir informações pessoais, não respondas e conta a um adulto de confiança.',
  },
  {
    title: 'Preparar a Mochila',
    situation: 'Amanhã tens aulas de matemática, educação física e inglês. Como preparas a mochila à noite?',
    emoji: '🎒',
    options: [
      { text: 'Verifico o horário, ponho os cadernos e materiais de cada disciplina e o equipamento de educação física', correct: true },
      { text: 'Ponho tudo o que encontro e espero que esteja certo', correct: false },
      { text: 'Deixo para fazer de manhã antes de sair', correct: false },
    ],
    tip: 'Preparar a mochila na noite anterior: olha o horário, faz uma lista mental (cadernos, materiais, equipamento) e verifica tudo. Assim de manhã estás tranquilo e não te esqueces de nada!',
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
      speak(current.situation, { auto: true })
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

  const finalStars = score >= 16 ? 3 : score >= 10 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="No Mundo Real" backPath="/campo/4" color="var(--color-campo4)">
        <CompletionCelebration
          emoji="🏙️"
          title="Estás pronto para o mundo real!"
          score={score}
          total={CHALLENGES.length}
          stars={finalStars}
          color="var(--color-campo4)"
        />
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
            className="btn-press"
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
            Próximo desafio →
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
