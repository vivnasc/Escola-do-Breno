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
  {
    title: 'Aceitar Criticas',
    situation: 'O professor diz que o teu trabalho precisa de melhorar. Como reages?',
    emoji: '📝',
    options: [
      { text: 'Ouco com atencao, pergunto o que posso melhorar e tento outra vez', correct: true },
      { text: 'Fico zangado e digo que o trabalho esta perfeito', correct: false },
      { text: 'Desisto e nao faco mais trabalhos', correct: false },
    ],
    lesson: 'As criticas ajudam-nos a crescer. Os maiores campeoes ouvem os treinadores e melhoram todos os dias.',
  },
  {
    title: 'Partilhar Recursos',
    situation: 'Ha um computador e dois colegas querem usa-lo ao mesmo tempo. O que propoes?',
    emoji: '💻',
    options: [
      { text: 'Dividimos o tempo: 15 minutos cada um', correct: true },
      { text: 'Digo que sou eu primeiro porque cheguei primeiro', correct: false },
      { text: 'Nao deixo ninguem usar', correct: false },
    ],
    lesson: 'Partilhar de forma justa mostra maturidade. Quando dividimos o tempo, todos ficam satisfeitos.',
  },
  {
    title: 'Lidar com o Tedio',
    situation: 'Estas em casa, nao tens nada para fazer e sentes-te aborrecido. O que fazes?',
    emoji: '😐',
    options: [
      { text: 'Penso em coisas que posso fazer: ler, desenhar, ajudar em casa', correct: true },
      { text: 'Fico deitado a queixar-me o dia todo', correct: false },
      { text: 'Mexo em coisas que nao devo', correct: false },
    ],
    lesson: 'O tedio e uma oportunidade para ser criativo! Quando inventamos actividades, descobrimos coisas novas sobre nos.',
  },
  {
    title: 'Esperar a Vez',
    situation: 'Estas na fila do escorrega e uma crianca tenta passar a frente. O que fazes?',
    emoji: '🛝',
    options: [
      { text: 'Digo com calma que ha uma fila e cada um espera a sua vez', correct: true },
      { text: 'Empurro-a para tras', correct: false },
      { text: 'Saio da fila e vou embora', correct: false },
    ],
    lesson: 'Respeitar a fila e respeitar os outros. Quando todos esperam, tudo funciona melhor.',
  },
  {
    title: 'Consequencias',
    situation: 'Queres comer todos os doces que tens de uma so vez. O que pensas antes?',
    emoji: '🍬',
    options: [
      { text: 'Se comer tudo agora, posso ficar com dor de barriga. Melhor comer poucos de cada vez', correct: true },
      { text: 'Como tudo de uma vez porque sao meus', correct: false },
      { text: 'Escondo-os para ninguem ver', correct: false },
    ],
    lesson: 'Antes de agir, pensa no que pode acontecer a seguir. Isso chama-se pensar nas consequencias!',
  },
  {
    title: 'Pedir Desculpa',
    situation: 'Sem querer, pisaste o pe de um colega no intervalo. O que fazes?',
    emoji: '😅',
    options: [
      { text: 'Peco desculpa logo e pergunto se esta bem', correct: true },
      { text: 'Finjo que nao fui eu', correct: false },
      { text: 'Rio-me e continuo a brincar', correct: false },
    ],
    lesson: 'Pedir desculpa mostra que nos importamos com os outros. E simples mas muito poderoso!',
  },
  {
    title: 'Adaptar-se a Mudancas',
    situation: 'A tua familia vai mudar de casa. Tudo e novo e diferente. Como lidas com isso?',
    emoji: '🏡',
    options: [
      { text: 'Exploro o bairro novo, tento fazer amigos novos, e falo sobre como me sinto', correct: true },
      { text: 'Recuso-me a sair do quarto', correct: false },
      { text: 'Fico zangado com toda a gente', correct: false },
    ],
    lesson: 'Mudancas podem assustar, mas trazem coisas novas e boas. Falar sobre os nossos sentimentos ajuda muito!',
  },
  {
    title: 'Cuidar das Coisas',
    situation: 'Pediste emprestado um livro a um amigo. O que tens de fazer?',
    emoji: '📚',
    options: [
      { text: 'Cuido bem do livro e devolvo-o no prazo combinado', correct: true },
      { text: 'Fico com ele e digo que perdi', correct: false },
      { text: 'Devolvo-o todo riscado', correct: false },
    ],
    lesson: 'Cuidar das coisas dos outros mostra responsabilidade. Quando cuidamos, as pessoas confiam em nos.',
  },
  {
    title: 'Lidar com Injustica',
    situation: 'Na escola, um colega recebeu um premio que tu achas que nao merecia. Como reages?',
    emoji: '⚖️',
    options: [
      { text: 'Aceito que nem sempre concordo com as decisoes, e foco-me no meu proprio esforco', correct: true },
      { text: 'Digo a toda a gente que foi injusto', correct: false },
      { text: 'Deixo de me esforcar porque nao vale a pena', correct: false },
    ],
    lesson: 'Nem tudo na vida parece justo. Quando sentimos injustica, podemos falar sobre isso com calma, mas o mais importante e nao deixar de dar o nosso melhor.',
  },
  {
    title: 'Ouvir o Corpo',
    situation: 'Estas a jogar ha muito tempo e comecas a sentir dor de cabeca e os olhos cansados. O que fazes?',
    emoji: '🧍',
    options: [
      { text: 'Paro, bebo agua, descanso os olhos e faco uma pausa', correct: true },
      { text: 'Ignoro e continuo a jogar', correct: false },
      { text: 'Tomo um medicamento sem dizer a ninguem', correct: false },
    ],
    lesson: 'O teu corpo manda sinais: dor de cabeca, fome, cansaco, vontade de estar sozinho. Ouvir esses sinais e cuidar de ti e uma das coisas mais importantes que podes aprender.',
  },
  {
    title: 'Organizar Tarefas',
    situation: 'Tens de arrumar o quarto, fazer os trabalhos de casa e tomar banho. Parece muito! Como resolves?',
    emoji: '📝',
    options: [
      { text: 'Divido em passos pequenos: primeiro uma coisa, depois outra, com pausas entre elas', correct: true },
      { text: 'Tento fazer tudo ao mesmo tempo', correct: false },
      { text: 'Nao faco nada porque e demais', correct: false },
    ],
    lesson: 'Quando uma tarefa parece grande demais, divide-a em pedacos pequenos. Em vez de "arrumar o quarto", pensa: "primeiro a cama, depois a secretaria, depois o chao". Passo a passo, tudo se faz!',
  },
  {
    title: 'Dizer Nao',
    situation: 'Um colega insiste para que copies o teste dele. Tu sabes que isso e errado. O que fazes?',
    emoji: '✋',
    options: [
      { text: 'Digo "nao, obrigado" com firmeza e faco o teste com o que sei', correct: true },
      { text: 'Copio porque ele vai ficar chateado se eu recusar', correct: false },
      { text: 'Digo que sim mas depois nao copio', correct: false },
    ],
    lesson: 'Dizer "nao" com respeito e uma forca, nao uma fraqueza. Nao precisas de inventar desculpas. Um "nao, obrigado" claro e honesto e suficiente. As pessoas que te respeitam vao aceitar.',
  },
  {
    title: 'Quando Nao Concordo',
    situation: 'O teu amigo acha que o melhor jogador do mundo e um, e tu achas que e outro. A conversa esta a ficar tensa. O que fazes?',
    emoji: '💬',
    options: [
      { text: 'Digo "eu penso diferente, mas respeito a tua opiniao" e mudamos de assunto', correct: true },
      { text: 'Insisto ate ele concordar comigo', correct: false },
      { text: 'Fico zangado e deixo de falar com ele', correct: false },
    ],
    lesson: 'Pessoas diferentes pensam de formas diferentes, e isso e normal. Discordar nao significa que alguem esta errado. Podemos ter opinioes diferentes e continuar a ser amigos.',
  },
  {
    title: 'Fazer Amigos',
    situation: 'Ha um colega novo na turma que esta sozinho no intervalo. Gostarias de ser amigo dele. O que fazes?',
    emoji: '🤗',
    options: [
      { text: 'Aproximo-me, apresento-me e convido-o para brincar ou estar comigo', correct: true },
      { text: 'Espero que ele venha falar comigo primeiro', correct: false },
      { text: 'Nao faco nada porque nao sei o que dizer', correct: false },
    ],
    lesson: 'Fazer amigos começa com um gesto simples: dizer "ola", apresentar-te e convidar. Nao precisa de ser perfeito. A maioria das pessoas fica feliz quando alguem se aproxima com boa intencao.',
  },
  {
    title: 'Empatia',
    situation: 'O teu amigo esta triste porque perdeu o jogo da equipa dele. Tu ganhaste o teu jogo. O que fazes?',
    emoji: '💛',
    options: [
      { text: 'Digo que percebo que esta triste e pergunto se quer falar ou se prefere ficar quieto', correct: true },
      { text: 'Falo so do meu jogo e de como ganhei', correct: false },
      { text: 'Digo-lhe para nao ficar triste porque e so um jogo', correct: false },
    ],
    lesson: 'Empatia e tentar perceber o que o outro esta a sentir, mesmo que tu nao sintas o mesmo. As vezes a melhor coisa e simplesmente dizer "estou aqui" e ouvir, sem tentar resolver.',
  },
  {
    title: 'Celebrar Pequenas Vitorias',
    situation: 'Conseguiste finalmente ler um texto inteiro sem ajuda. Ninguem reparou. Como te sentes?',
    emoji: '🏆',
    options: [
      { text: 'Fico orgulhoso de mim proprio e reconheco o meu progresso, mesmo que ninguem tenha visto', correct: true },
      { text: 'Nao conta porque ninguem viu', correct: false },
      { text: 'So vale a pena se for uma coisa grande', correct: false },
    ],
    lesson: 'As grandes conquistas sao feitas de muitas pequenas vitorias. Cada passo conta, mesmo os que ninguem ve. Ser capaz de reconhecer o teu proprio progresso e uma forca enorme.',
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
      completeActivity('problem-solving', score >= 20 ? 3 : score >= 14 ? 2 : 1)
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
