import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
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
    lesson: 'Planear a ordem das actividades ajuda a não chegar atrasado. Primeiro o que é mais cedo!',
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
    situation: 'Não consegues fazer um exercício na escola. O que é melhor fazer?',
    emoji: '🙋',
    options: [
      { text: 'Levanto a mão e peço ajuda ao professor', correct: true },
      { text: 'Copio do colega sem perguntar', correct: false },
      { text: 'Desisto e não faço nada', correct: false },
    ],
    lesson: 'Pedir ajuda não é fraqueza, é inteligência! Toda a gente precisa de ajuda às vezes.',
  },
  {
    title: 'Dinheiro Limitado',
    situation: 'Tens dinheiro para comprar UM lanche. Há bolachas, fruta e gelado. Qual é a escolha mais inteligente?',
    emoji: '💰',
    options: [
      { text: 'Fruta, porque dá energia e é saudável', correct: true },
      { text: 'Gelado, porque é o mais caro', correct: false },
      { text: 'Não compro nada', correct: false },
    ],
    lesson: 'Quando os recursos são limitados, pensar no que é melhor a longo prazo ajuda a fazer boas escolhas.',
  },
  {
    title: 'Algo Correu Mal',
    situation: 'Partiste acidentalmente um copo. Ninguém viu. O que fazes?',
    emoji: '🫣',
    options: [
      { text: 'Digo a verdade a um adulto e ajudo a limpar', correct: true },
      { text: 'Escondo os pedacos e finjo que nao fui eu', correct: false },
      { text: 'Culpo outra pessoa', correct: false },
    ],
    lesson: 'A honestidade cria confiança. Quando assumimos os nossos erros, as pessoas confiam mais em nós.',
  },
  {
    title: 'Trabalho em Grupo',
    situation: 'Estas a fazer um trabalho em grupo. Um colega nao faz a parte dele. O que fazes?',
    emoji: '👥',
    options: [
      { text: 'Falo com ele e pergunto se precisa de ajuda', correct: true },
      { text: 'Faco tudo sozinho sem dizer nada', correct: false },
      { text: 'Digo ao professor que ele é preguiçoso', correct: false },
    ],
    lesson: 'Antes de julgar, comunicar! Às vezes as pessoas não fazem a parte porque não sabem como. Ajudar é liderar.',
  },
  {
    title: 'Gerir a Frustração',
    situation: 'Perdeste um jogo importante. Estás muito chateado. O que ajuda?',
    emoji: '😤',
    options: [
      { text: 'Respiro fundo, aceito e penso no que posso melhorar', correct: true },
      { text: 'Atiro as coisas ao chão', correct: false },
      { text: 'Digo que o jogo era injusto', correct: false },
    ],
    lesson: 'Perder faz parte de aprender. Os melhores jogadores perdem muitas vezes antes de ganhar. A chave é aprender com cada derrota.',
  },
  {
    title: 'Prioridades',
    situation: 'Tens um teste amanhã mas os amigos chamam-te para jogar. O que decides?',
    emoji: '📚',
    options: [
      { text: 'Estudo primeiro e jogo depois se houver tempo', correct: true },
      { text: 'Vou jogar porque é mais divertido', correct: false },
      { text: 'Não estudo e não jogo', correct: false },
    ],
    lesson: 'Saber separar o que e urgente do que e divertido e uma habilidade para a vida toda. Primeiro o dever, depois o prazer!',
  },
  {
    title: 'Aceitar Criticas',
    situation: 'O professor diz que o teu trabalho precisa de melhorar. Como reages?',
    emoji: '📝',
    options: [
      { text: 'Ouço com atenção, pergunto o que posso melhorar e tento outra vez', correct: true },
      { text: 'Fico zangado e digo que o trabalho esta perfeito', correct: false },
      { text: 'Desisto e não faço mais trabalhos', correct: false },
    ],
    lesson: 'As criticas ajudam-nos a crescer. Os maiores campeoes ouvem os treinadores e melhoram todos os dias.',
  },
  {
    title: 'Partilhar Recursos',
    situation: 'Há um computador e dois colegas querem usá-lo ao mesmo tempo. O que propões?',
    emoji: '💻',
    options: [
      { text: 'Dividimos o tempo: 15 minutos cada um', correct: true },
      { text: 'Digo que sou eu primeiro porque cheguei primeiro', correct: false },
      { text: 'Não deixo ninguém usar', correct: false },
    ],
    lesson: 'Partilhar de forma justa mostra maturidade. Quando dividimos o tempo, todos ficam satisfeitos.',
  },
  {
    title: 'Lidar com o Tédio',
    situation: 'Estás em casa, não tens nada para fazer e sentes-te aborrecido. O que fazes?',
    emoji: '😐',
    options: [
      { text: 'Penso em coisas que posso fazer: ler, desenhar, ajudar em casa', correct: true },
      { text: 'Fico deitado a queixar-me o dia todo', correct: false },
      { text: 'Mexo em coisas que não devo', correct: false },
    ],
    lesson: 'O tédio é uma oportunidade para ser criativo! Quando inventamos actividades, descobrimos coisas novas sobre nós.',
  },
  {
    title: 'Esperar a Vez',
    situation: 'Estás na fila do escorrega e uma criança tenta passar à frente. O que fazes?',
    emoji: '🛝',
    options: [
      { text: 'Digo com calma que há uma fila e cada um espera a sua vez', correct: true },
      { text: 'Empurro-a para tras', correct: false },
      { text: 'Saio da fila e vou embora', correct: false },
    ],
    lesson: 'Respeitar a fila e respeitar os outros. Quando todos esperam, tudo funciona melhor.',
  },
  {
    title: 'Consequencias',
    situation: 'Queres comer todos os doces que tens de uma só vez. O que pensas antes?',
    emoji: '🍬',
    options: [
      { text: 'Se comer tudo agora, posso ficar com dor de barriga. Melhor comer poucos de cada vez', correct: true },
      { text: 'Como tudo de uma vez porque são meus', correct: false },
      { text: 'Escondo-os para ninguém ver', correct: false },
    ],
    lesson: 'Antes de agir, pensa no que pode acontecer a seguir. Isso chama-se pensar nas consequências!',
  },
  {
    title: 'Pedir Desculpa',
    situation: 'Sem querer, pisaste o pe de um colega no intervalo. O que fazes?',
    emoji: '😅',
    options: [
      { text: 'Peço desculpa logo e pergunto se está bem', correct: true },
      { text: 'Finjo que nao fui eu', correct: false },
      { text: 'Rio-me e continuo a brincar', correct: false },
    ],
    lesson: 'Pedir desculpa mostra que nos importamos com os outros. E simples mas muito poderoso!',
  },
  {
    title: 'Adaptar-se a Mudanças',
    situation: 'A tua família vai mudar de casa. Tudo é novo e diferente. Como lidas com isso?',
    emoji: '🏡',
    options: [
      { text: 'Exploro o bairro novo, tento fazer amigos novos, e falo sobre como me sinto', correct: true },
      { text: 'Recuso-me a sair do quarto', correct: false },
      { text: 'Fico zangado com toda a gente', correct: false },
    ],
    lesson: 'Mudanças podem assustar, mas trazem coisas novas e boas. Falar sobre os nossos sentimentos ajuda muito!',
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
    title: 'Lidar com Injustiça',
    situation: 'Na escola, um colega recebeu um prémio que tu achas que não merecia. Como reages?',
    emoji: '⚖️',
    options: [
      { text: 'Aceito que nem sempre concordo com as decisões, e foco-me no meu próprio esforço', correct: true },
      { text: 'Digo a toda a gente que foi injusto', correct: false },
      { text: 'Deixo de me esforcar porque nao vale a pena', correct: false },
    ],
    lesson: 'Nem tudo na vida parece justo. Quando sentimos injustiça, podemos falar sobre isso com calma, mas o mais importante é não deixar de dar o nosso melhor.',
  },
  {
    title: 'Ouvir o Corpo',
    situation: 'Estás a jogar há muito tempo e começas a sentir dor de cabeça e os olhos cansados. O que fazes?',
    emoji: '🧍',
    options: [
      { text: 'Paro, bebo agua, descanso os olhos e faco uma pausa', correct: true },
      { text: 'Ignoro e continuo a jogar', correct: false },
      { text: 'Tomo um medicamento sem dizer a ninguem', correct: false },
    ],
    lesson: 'O teu corpo manda sinais: dor de cabeça, fome, cansaço, vontade de estar sozinho. Ouvir esses sinais e cuidar de ti é uma das coisas mais importantes que podes aprender.',
  },
  {
    title: 'Organizar Tarefas',
    situation: 'Tens de arrumar o quarto, fazer os trabalhos de casa e tomar banho. Parece muito! Como resolves?',
    emoji: '📝',
    options: [
      { text: 'Divido em passos pequenos: primeiro uma coisa, depois outra, com pausas entre elas', correct: true },
      { text: 'Tento fazer tudo ao mesmo tempo', correct: false },
      { text: 'Não faço nada porque é demais', correct: false },
    ],
    lesson: 'Quando uma tarefa parece grande demais, divide-a em pedaços pequenos. Em vez de "arrumar o quarto", pensa: "primeiro a cama, depois a secretária, depois o chão". Passo a passo, tudo se faz!',
  },
  {
    title: 'Dizer Nao',
    situation: 'Um colega insiste para que copies o teste dele. Tu sabes que isso é errado. O que fazes?',
    emoji: '✋',
    options: [
      { text: 'Digo "nao, obrigado" com firmeza e faco o teste com o que sei', correct: true },
      { text: 'Copio porque ele vai ficar chateado se eu recusar', correct: false },
      { text: 'Digo que sim mas depois nao copio', correct: false },
    ],
    lesson: 'Dizer "não" com respeito é uma força, não uma fraqueza. Não precisas de inventar desculpas. Um "não, obrigado" claro e honesto é suficiente. As pessoas que te respeitam vão aceitar.',
  },
  {
    title: 'Quando Não Concordo',
    situation: 'O teu amigo acha que o melhor jogador do mundo é um, e tu achas que é outro. A conversa está a ficar tensa. O que fazes?',
    emoji: '💬',
    options: [
      { text: 'Digo "eu penso diferente, mas respeito a tua opinião" e mudamos de assunto', correct: true },
      { text: 'Insisto ate ele concordar comigo', correct: false },
      { text: 'Fico zangado e deixo de falar com ele', correct: false },
    ],
    lesson: 'Pessoas diferentes pensam de formas diferentes, e isso é normal. Discordar não significa que alguém está errado. Podemos ter opiniões diferentes e continuar a ser amigos.',
  },
  {
    title: 'Fazer Amigos',
    situation: 'Há um colega novo na turma que está sozinho no intervalo. Gostarias de ser amigo dele. O que fazes?',
    emoji: '🤗',
    options: [
      { text: 'Aproximo-me, apresento-me e convido-o para brincar ou estar comigo', correct: true },
      { text: 'Espero que ele venha falar comigo primeiro', correct: false },
      { text: 'Não faço nada porque não sei o que dizer', correct: false },
    ],
    lesson: 'Fazer amigos começa com um gesto simples: dizer "olá", apresentar-te e convidar. Não precisa de ser perfeito. A maioria das pessoas fica feliz quando alguém se aproxima com boa intenção.',
  },
  {
    title: 'Empatia',
    situation: 'O teu amigo está triste porque perdeu o jogo da equipa dele. Tu ganhaste o teu jogo. O que fazes?',
    emoji: '💛',
    options: [
      { text: 'Digo que percebo que esta triste e pergunto se quer falar ou se prefere ficar quieto', correct: true },
      { text: 'Falo so do meu jogo e de como ganhei', correct: false },
      { text: 'Digo-lhe para nao ficar triste porque e so um jogo', correct: false },
    ],
    lesson: 'Empatia é tentar perceber o que o outro está a sentir, mesmo que tu não sintas o mesmo. Às vezes a melhor coisa é simplesmente dizer "estou aqui" e ouvir, sem tentar resolver.',
  },
  {
    title: 'Celebrar Pequenas Vitorias',
    situation: 'Conseguiste finalmente ler um texto inteiro sem ajuda. Ninguém reparou. Como te sentes?',
    emoji: '🏆',
    options: [
      { text: 'Fico orgulhoso de mim próprio e reconheço o meu progresso, mesmo que ninguém tenha visto', correct: true },
      { text: 'Não conta porque ninguém viu', correct: false },
      { text: 'Só vale a pena se for uma coisa grande', correct: false },
    ],
    lesson: 'As grandes conquistas são feitas de muitas pequenas vitórias. Cada passo conta, mesmo os que ninguém vê. Ser capaz de reconhecer o teu próprio progresso é uma força enorme.',
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
      speak(current.situation, { auto: true })
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

  const finalStars = score >= 20 ? 3 : score >= 14 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Resolver Problemas" backPath="/campo/4" color="var(--color-campo4)">
        <CompletionCelebration
          emoji="🧠"
          title="Resolveste problemas como um campeão!"
          score={score}
          total={SCENARIOS.length}
          stars={finalStars}
          color="var(--color-campo4)"
        />
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
            className="btn-press"
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
            Próximo →
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
