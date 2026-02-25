import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const DIALOGUES = [
  {
    id: 'lost-dog',
    title: 'O Cão Perdido',
    setting: 'No parque, uma menina encontra um cão sozinho.',
    characters: [
      { name: 'Ana', emoji: '👧', color: '#1565C0' },
      { name: 'Vizinho', emoji: '👨', color: '#E65100' },
    ],
    lines: [
      { char: 0, text: 'Olha, um cão! Está sozinho. Parece triste.' },
      { char: 0, text: 'Não tem coleira. Será que está perdido?' },
      {
        char: 0,
        text: null,
        choice: {
          prompt: 'O que achas que a Ana deve dizer?',
          options: [
            { text: '"Vou procurar o dono."', response: 'A Ana decidiu procurar o dono. Que responsável!' },
            { text: '"Vou levá-lo para casa."', response: 'A Ana quer ajudar! Mas primeiro é melhor procurar o dono.' },
            { text: '"Coitadinho, tens fome?"', response: 'A Ana tem bom coração! Quer cuidar do cão.' },
          ],
        },
      },
      { char: 1, text: 'Olá! Esse cão é do meu vizinho. Fugiu esta manhã.' },
      { char: 0, text: 'Que bom! Pode devolvê-lo? Ele parece ter saudades.' },
      { char: 1, text: 'Claro! Obrigado por cuidares dele.' },
      { char: 0, text: 'De nada! Os animais merecem que olhemos por eles.' },
    ],
  },
  {
    id: 'sharing',
    title: 'O Último Bolo',
    setting: 'Na cozinha, dois irmãos encontram o último pedaço de bolo.',
    characters: [
      { name: 'Pedro', emoji: '👦', color: '#2E7D32' },
      { name: 'Maria', emoji: '👧', color: '#6A1B9A' },
    ],
    lines: [
      { char: 0, text: 'Só há um pedaço de bolo! Eu vi primeiro!' },
      { char: 1, text: 'Mas eu também quero! Não é justo.' },
      {
        char: 0,
        text: null,
        choice: {
          prompt: 'O que achas que o Pedro deve dizer?',
          options: [
            { text: '"Vamos dividir ao meio."', response: 'Excelente! Dividir é a coisa justa a fazer.' },
            { text: '"É meu, eu vi primeiro!"', response: 'Hmm... talvez haja uma forma mais justa.' },
            { text: '"Fica para ti, Maria."', response: 'Que generoso! Mas dividir também é uma boa opção.' },
          ],
        },
      },
      { char: 1, text: 'Boa ideia! Assim ficamos os dois contentes.' },
      { char: 0, text: 'E amanhã pedimos à mãe para fazer mais bolo!' },
      { char: 1, text: 'Combinado! Dividir sabe melhor do que comer sozinho.' },
    ],
  },
  {
    id: 'new-friend',
    title: 'O Amigo Novo',
    setting: 'Na escola, um aluno novo aparece na turma.',
    characters: [
      { name: 'Rui', emoji: '👦', color: '#1565C0' },
      { name: 'André', emoji: '👦', color: '#E65100' },
    ],
    lines: [
      { char: 0, text: 'Olha, há alguém novo na turma. Está ali sozinho no canto.' },
      {
        char: 0,
        text: null,
        choice: {
          prompt: 'O que achas que o Rui deve fazer?',
          options: [
            { text: '"Olá! Queres vir jogar connosco?"', response: 'O Rui foi logo convidar o André. Às vezes basta um convite para mudar o dia de alguém!' },
            { text: '"Vou esperar para ver se ele fala primeiro."', response: 'O Rui decidiu esperar. É normal ter calma, mas o André pode estar à espera que alguém fale com ele.' },
            { text: '"Olá, eu sou o Rui. Como te chamas?"', response: 'Apresentar-se é um bom começo! Saber o nome de alguém faz logo a pessoa sentir-se bem-vinda.' },
          ],
        },
      },
      { char: 1, text: 'Olá... eu sou o André. Cheguei hoje. Não conheço ninguém.' },
      { char: 0, text: 'Eu no início também não conhecia ninguém. Depois fiz amigos.' },
      { char: 1, text: 'A sério? Eu tenho um bocado de medo de não encaixar aqui.' },
      { char: 0, text: 'É normal. Mas vais ver que a turma é fixe. Senta-te ao pé de mim!' },
      { char: 1, text: 'Obrigado, Rui. Já me sinto melhor.' },
    ],
  },
  {
    id: 'the-lie',
    title: 'A Mentira',
    setting: 'Em casa, a mãe pergunta quem partiu a jarra.',
    characters: [
      { name: 'Sara', emoji: '👧', color: '#6A1B9A' },
      { name: 'Mãe', emoji: '👩', color: '#2E7D32' },
    ],
    lines: [
      { char: 1, text: 'Sara, a jarra da avó está partida no chão. O que aconteceu?' },
      { char: 0, text: 'Eu... eu estava a brincar com a bola dentro de casa.' },
      {
        char: 0,
        text: null,
        choice: {
          prompt: 'O que achas que a Sara deve dizer?',
          options: [
            { text: '"Fui eu, mãe. Desculpa, não foi de propósito."', response: 'A Sara disse a verdade. Custa, mas ser honesta mostra coragem e respeito.' },
            { text: '"Acho que foi o gato que a derrubou..."', response: 'A Sara culpou o gato. Mentir pode parecer mais fácil, mas faz a pessoa sentir-se mal por dentro.' },
            { text: '(Ficar calada e olhar para o chão)', response: 'A Sara não conseguiu falar. Às vezes é difícil encontrar as palavras, e tudo bem precisar de tempo.' },
          ],
        },
      },
      { char: 1, text: 'Sara, sabes que podes dizer-me sempre a verdade. Eu não vou gritar.' },
      { char: 0, text: 'Desculpa, mãe. Fui eu com a bola. Estou muito triste.' },
      { char: 1, text: 'Obrigada por seres honesta. A jarra pode ser colada, mas a confiança é mais importante.' },
      { char: 0, text: 'Prometo ter mais cuidado. E já não jogo à bola dentro de casa.' },
    ],
  },
  {
    id: 'dark-fear',
    title: 'O Medo do Escuro',
    setting: 'À noite, o quarto está escuro e há sons estranhos.',
    characters: [
      { name: 'Tomás', emoji: '👦', color: '#1565C0' },
      { name: 'Pai', emoji: '👨', color: '#5D4037' },
    ],
    lines: [
      { char: 0, text: 'O que foi aquilo? Ouvi um barulho... Está tão escuro.' },
      {
        char: 0,
        text: null,
        choice: {
          prompt: 'O que achas que o Tomás deve fazer?',
          options: [
            { text: '"Pai! Podes vir aqui, por favor?"', response: 'O Tomás pediu ajuda. Pedir ajuda quando temos medo é corajoso, não é fraqueza!' },
            { text: '"Vou tapar a cabeça com o lençol e esperar."', response: 'O Tomás escondeu-se debaixo do lençol. Às vezes precisamos de nos sentir protegidos primeiro.' },
            { text: '"Vou respirar fundo e tentar perceber o barulho."', response: 'O Tomás tentou acalmar-se sozinho. Respirar fundo ajuda muito quando estamos assustados.' },
          ],
        },
      },
      { char: 1, text: 'Estou aqui, filho. O que se passa?' },
      { char: 0, text: 'Pai, tenho medo. Ouvi um barulho esquisito e está muito escuro.' },
      { char: 1, text: 'Vamos ouvir juntos. Olha... é o vento a bater na janela. Nada de assustador.' },
      { char: 0, text: 'Ah, era só o vento? Que alívio. Senti-me melhor quando chamei por ti.' },
      { char: 1, text: 'Ter medo é normal, Tomás. O importante é não ficares sozinho com esse medo.' },
    ],
  },
  {
    id: 'sharing-hard',
    title: 'Não Quero Partilhar',
    setting: 'No recreio, duas crianças querem o mesmo baloiço.',
    characters: [
      { name: 'Matilde', emoji: '👧', color: '#E91E63' },
      { name: 'Joana', emoji: '👧', color: '#FF6F00' },
    ],
    lines: [
      { char: 0, text: 'Sim! O baloiço está livre. Eu cheguei primeiro!' },
      { char: 1, text: 'Mas eu também quero andar! Já estou à espera há imenso tempo.' },
      {
        char: 0,
        text: null,
        choice: {
          prompt: 'O que achas que a Matilde deve dizer?',
          options: [
            { text: '"Está bem, podemos fazer à vez. Eu ando um bocado e depois és tu."', response: 'A Matilde propôs turnos. É uma solução justa que mostra respeito pelas duas!' },
            { text: '"Não! Eu cheguei primeiro, é meu."', response: 'A Matilde não quer ceder. É natural querer o que é nosso, mas às vezes partilhar torna tudo mais divertido.' },
            { text: '"E se contarmos até 50 e depois trocamos?"', response: 'A Matilde inventou uma regra para as duas. Criar combinados juntas é uma ótima forma de resolver as coisas!' },
          ],
        },
      },
      { char: 1, text: 'Pode ser! Conta até 50 e depois trocamos. Eu conto por ti!' },
      { char: 0, text: 'Boa! Um... dois... três... Isto até é mais divertido assim.' },
      { char: 1, text: 'Pois é! E agora temos uma regra só nossa para o baloiço.' },
      { char: 0, text: 'Amanhã podemos brincar outra vez as duas. Combinado?' },
    ],
  },
  {
    id: 'lost-toy',
    title: 'O Brinquedo Perdido',
    setting: 'No jardim, a Marta perdeu o seu peluche favorito e não o encontra.',
    characters: [
      { name: 'Marta', emoji: '👧', color: '#E91E63' },
      { name: 'Pedro', emoji: '👦', color: '#1565C0' },
    ],
    lines: [
      { char: 0, text: 'Não encontro o meu peluche! O Estrelinha desapareceu...' },
      { char: 0, text: 'Procurei no quarto, na sala... Ele não está em lado nenhum.' },
      { char: 1, text: 'Marta, o que se passa? Pareces triste.' },
      { char: 0, text: 'Perdi o Estrelinha. É o meu peluche preferido. Tenho-o desde bebé.' },
      {
        char: 1,
        text: null,
        choice: {
          prompt: 'O que achas que o Pedro deve dizer?',
          options: [
            { text: '"Eu ajudo-te a procurar! Vamos pensar nos sítios onde estiveste."', response: 'O Pedro ofereceu-se para ajudar. Quando um amigo está triste, podemos fazer algo concreto para ajudar!' },
            { text: '"Ah, não faz mal, é só um peluche."', response: 'O Pedro tentou animar a Marta, mas para ela o peluche é muito importante. Às vezes é melhor ouvir antes de dizer que não faz mal.' },
            { text: '"Não te preocupes, ele vai aparecer."', response: 'O Pedro quis dar esperança. Palavras de conforto são boas, mas ajudar a procurar seria ainda melhor!' },
          ],
        },
      },
      { char: 0, text: 'Obrigada, Pedro! Eu estive a brincar no jardim depois do almoço.' },
      { char: 1, text: 'Então vamos olhar perto do banco e dos arbustos. Com calma.' },
      { char: 0, text: 'Ali! Está debaixo do banco! O Estrelinha! Encontrámo-lo!' },
      { char: 1, text: 'Que bom! Estás mais contente agora?' },
      { char: 0, text: 'Muito! Obrigada por me ajudares. É bom ter amigos assim.' },
    ],
  },
  {
    id: 'new-school',
    title: 'A Escola Nova',
    setting: 'É o primeiro dia do Lucas numa escola nova. Ele está nervoso à porta da sala.',
    characters: [
      { name: 'Lucas', emoji: '👦', color: '#E65100' },
      { name: 'Professora Ana', emoji: '👩‍🏫', color: '#2E7D32' },
    ],
    lines: [
      { char: 0, text: 'A minha barriga está a doer. Não quero entrar. E se ninguém gostar de mim?' },
      { char: 1, text: 'Olá! Tu deves ser o Lucas. Bem-vindo à nossa turma!' },
      { char: 0, text: 'Olá... Eu sou o Lucas. É que... eu não conheço ninguém aqui.' },
      {
        char: 1,
        text: null,
        choice: {
          prompt: 'O que achas que a Professora Ana deve dizer?',
          options: [
            { text: '"É normal sentires-te nervoso. Vou apresentar-te à turma com calma."', response: 'A professora reconheceu o que o Lucas sente. Validar os sentimentos de alguém é o primeiro passo para ajudar!' },
            { text: '"Não sejas tímido! Vai lá e faz amigos."', response: 'A professora tentou encorajar, mas dizer "não sejas tímido" pode fazer a pessoa sentir que o que sente está errado.' },
            { text: '"Entra e senta-te ali ao fundo."', response: 'A professora deu instruções, mas o Lucas precisava de mais apoio. Às vezes um gesto de carinho faz toda a diferença.' },
          ],
        },
      },
      { char: 0, text: 'Obrigado, professora. Estou mesmo nervoso. As mãos estão a tremer.' },
      { char: 1, text: 'Sabes, quase todos os alunos se sentiram assim no primeiro dia. É perfeitamente normal.' },
      { char: 0, text: 'A sério? Eles também tinham medo?' },
      { char: 1, text: 'Claro! E agora são todos amigos. Daqui a uma semana vais sentir-te em casa.' },
      { char: 0, text: 'Está bem. Vou tentar. Obrigado por ser simpática comigo, professora.' },
      { char: 1, text: 'Estou aqui sempre que precisares, Lucas. Vamos entrar juntos?' },
    ],
  },
  {
    id: 'sorry',
    title: 'Pedir Desculpa',
    setting: 'Na sala de artes, a Rita vê que o seu desenho favorito foi rasgado sem querer.',
    characters: [
      { name: 'Rita', emoji: '👧', color: '#6A1B9A' },
      { name: 'João', emoji: '👦', color: '#1565C0' },
    ],
    lines: [
      { char: 0, text: 'O meu desenho! Estava aqui em cima da mesa e agora está rasgado!' },
      { char: 1, text: 'Rita... fui eu. Estava a correr e bati na mesa. Os papéis caíram e o teu rasgou-se.' },
      { char: 0, text: 'O quê?! Era o meu desenho preferido! Demorei dois dias a fazer!' },
      {
        char: 1,
        text: null,
        choice: {
          prompt: 'O que achas que o João deve dizer?',
          options: [
            { text: '"Desculpa mesmo, Rita. Não foi de propósito. Posso ajudar-te a fazer outro?"', response: 'O João pediu desculpa e ofereceu ajuda. Pedir desculpa com sinceridade e tentar reparar o erro é muito corajoso!' },
            { text: '"Não foi assim tão mau, podes fazer outro..."', response: 'O João minimizou o problema. Quando estragamos algo importante para alguém, é melhor reconhecer que a pessoa tem razão para estar chateada.' },
            { text: '"Desculpa... mas também não devias ter deixado ali."', response: 'O João pediu desculpa mas culpou a Rita. Pedir desculpa a sério significa não pôr a culpa no outro.' },
          ],
        },
      },
      { char: 0, text: 'Estou muito chateada... mas sei que não fizeste de propósito.' },
      { char: 1, text: 'Eu sei que era importante para ti. Vou ter mais cuidado a correr na sala.' },
      { char: 0, text: 'E se fizéssemos um desenho juntos? Talvez até fique melhor.' },
      { char: 1, text: 'A sério? Adorava! Obrigado por me perdoares, Rita.' },
      { char: 0, text: 'Toda a gente comete erros. O importante é pedir desculpa de verdade.' },
    ],
  },
  {
    id: 'different',
    title: 'Somos Diferentes',
    setting: 'No recreio, o Tiago e a Sara descobrem que gostam de brincar de formas diferentes.',
    characters: [
      { name: 'Tiago', emoji: '👦', color: '#5D4037' },
      { name: 'Sara', emoji: '👧', color: '#00838F' },
    ],
    lines: [
      { char: 1, text: 'Queres vir jogar apanhada connosco, Tiago?' },
      { char: 0, text: 'Hmm... eu não gosto muito de apanhada. Há muita confusão e barulho.' },
      { char: 1, text: 'Mas toda a gente gosta de apanhada! É o mais divertido!' },
      {
        char: 0,
        text: null,
        choice: {
          prompt: 'O que achas que o Tiago deve dizer?',
          options: [
            { text: '"Cada pessoa gosta de coisas diferentes. Eu prefiro jogos mais calmos."', response: 'O Tiago explicou o que sente com calma. Todos temos formas diferentes de nos divertirmos, e isso é perfeitamente normal!' },
            { text: '"Está bem, eu vou, mesmo que não queira..."', response: 'O Tiago cedeu para agradar. Às vezes fazemos isso, mas é importante saber dizer o que realmente queremos.' },
            { text: '"Deixa-me em paz. Não quero brincar."', response: 'O Tiago ficou irritado. Quando nos sentimos pressionados, é difícil responder com calma, mas podemos tentar.' },
          ],
        },
      },
      { char: 1, text: 'Oh, desculpa. Não sabia. E do que é que gostas então?' },
      { char: 0, text: 'Gosto de construir coisas, de puzzles, e de observar insectos no jardim.' },
      { char: 1, text: 'Insectos?! Isso é fixe! Eu nunca observei insectos a sério.' },
      { char: 0, text: 'Queres vir ver? Ali perto da árvore há formigas a carregar folhas. É incrível!' },
      { char: 1, text: 'Vamos! Sabes, Tiago, somos diferentes mas podemos brincar juntos na mesma.' },
      { char: 0, text: 'Pois é! Não precisamos de gostar das mesmas coisas para ser amigos.' },
    ],
  },
  {
    id: 'team-work',
    title: 'Trabalho de Equipa',
    setting: 'Na sala de aula, o Miguel e a Beatriz têm de construir uma torre com blocos para um trabalho de grupo.',
    characters: [
      { name: 'Miguel', emoji: '👦', color: '#E65100' },
      { name: 'Beatriz', emoji: '👧', color: '#6A1B9A' },
    ],
    lines: [
      { char: 0, text: 'Eu acho que a torre devia ser super alta! Vou pôr todos os blocos em cima uns dos outros.' },
      { char: 1, text: 'Espera, Miguel! Se fizermos assim, vai cair. Precisamos de uma base larga.' },
      { char: 0, text: 'Não vai não! Olha, eu faço sozinho e...' },
      { char: 0, text: '...Oh não. Caiu tudo. Outra vez.' },
      {
        char: 1,
        text: null,
        choice: {
          prompt: 'O que achas que a Beatriz deve dizer?',
          options: [
            { text: '"Não faz mal. Vamos tentar juntos desta vez. Eu seguro a base e tu pões os de cima."', response: 'A Beatriz não criticou o Miguel. Ofereceu uma forma de trabalharem juntos. Trabalho de equipa é usar o melhor de cada um!' },
            { text: '"Eu bem te disse que ia cair."', response: 'A Beatriz tinha razão, mas dizer "eu avisei" quando alguém falha não ajuda. É melhor focar na solução!' },
            { text: '"Deixa, eu faço sozinha."', response: 'A Beatriz quis resolver sozinha. Mas num trabalho de grupo, o objectivo é fazerem as coisas juntos, mesmo que seja mais difícil.' },
          ],
        },
      },
      { char: 0, text: 'Tens razão. Desculpa, Beatriz. Eu estava a querer fazer tudo à minha maneira.' },
      { char: 1, text: 'Não faz mal! As tuas ideias são boas, só precisamos de as juntar. Tu és bom a empilhar alto.' },
      { char: 0, text: 'E tu és boa a pensar na estrutura. Juntos conseguimos!' },
      { char: 1, text: 'Olha, está a ficar enorme! E não cai!' },
      { char: 0, text: 'É a torre mais fixe da sala! Trabalhar em equipa é mesmo melhor.' },
    ],
  },
]

export default function TeatroVozes({
  registerClick,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const [dialogueIdx, setDialogueIdx] = useState(0)
  const [lineIdx, setLineIdx] = useState(-1) // -1 = intro screen
  const [choiceResponse, setChoiceResponse] = useState(null)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const dialogue = DIALOGUES[dialogueIdx]
  const line = lineIdx >= 0 ? dialogue.lines[lineIdx] : null
  const isLastDialogue = dialogueIdx >= DIALOGUES.length - 1
  const allLinesShown = lineIdx >= dialogue.lines.length - 1

  // Narrate dialogue line
  useEffect(() => {
    if (line && line.text) {
      const char = dialogue.characters[line.char]
      speak(`${char.name} diz: ${line.text}`, { auto: true })
    } else if (line?.choice) {
      speak(line.choice.prompt, { auto: true })
    }
  }, [lineIdx, dialogueIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleStart = useCallback(() => {
    registerClick()
    speak(dialogue.setting, { auto: true })
    setLineIdx(0)
  }, [registerClick, dialogue.setting, speak])

  const handleNext = useCallback(() => {
    registerClick()
    setChoiceResponse(null)
    if (lineIdx + 1 < dialogue.lines.length) {
      setLineIdx(lineIdx + 1)
    } else {
      // Dialogue complete
      updateCampoProgress('campo7', dialogueIdx + 1)
      if (isLastDialogue) {
        const stars = score >= 2 ? 3 : score >= 1 ? 2 : 1
        completeActivity('teatro-vozes', stars)
        setIsComplete(true)
      } else {
        setDialogueIdx(dialogueIdx + 1)
        setLineIdx(-1)
        setScore(score)
      }
    }
  }, [lineIdx, dialogue, dialogueIdx, isLastDialogue, score, registerClick, completeActivity, updateCampoProgress])

  const handleChoice = useCallback((option) => {
    registerClick()
    registerSuccess()
    setScore((s) => s + 1)
    setChoiceResponse(option.response)
    speak(option.response, { auto: true })
  }, [registerClick, registerSuccess, speak])

  if (isComplete) {
    return (
      <ActivityShell title="Teatro de Vozes" backPath="/campo/7" color="var(--color-campo7)">
        <CompletionCelebration
          emoji="🎭"
          title="Grande actor! Viveste os diálogos!"
          stars={score >= 2 ? 3 : score >= 1 ? 2 : 1}
          color="var(--color-campo7)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Teatro de Vozes"
      instruction={lineIdx < 0 ? 'Vive um diálogo entre personagens.' : null}
      backPath="/campo/7"
      color="var(--color-campo7)"
      score={dialogueIdx + 1}
      total={DIALOGUES.length}
      textLevel={adaptive?.textLevel}
    >
      {/* Intro */}
      {lineIdx < 0 && (
        <div style={styles.introCard}>
          <span style={styles.introEmoji}>🎭</span>
          <h2 style={styles.introTitle}>{dialogue.title}</h2>
          <p style={styles.introSetting}>{dialogue.setting}</p>
          <div style={styles.charRow}>
            {dialogue.characters.map((c, i) => (
              <div key={i} style={styles.charBadge}>
                <span style={styles.charEmoji}>{c.emoji}</span>
                <span style={{ ...styles.charName, color: c.color }}>{c.name}</span>
              </div>
            ))}
          </div>
          <button className="btn-press" style={styles.startBtn} onClick={handleStart}>
            Começar o Diálogo
          </button>
        </div>
      )}

      {/* Dialogue */}
      {lineIdx >= 0 && (
        <>
          {/* Previous lines */}
          <div style={styles.chatContainer}>
            {dialogue.lines.slice(0, lineIdx + 1).map((l, i) => {
              if (!l.text && !l.choice) return null
              if (l.choice && i < lineIdx) return null // Don't show past choices
              if (l.choice && i === lineIdx) return null // Choice shown separately
              const char = dialogue.characters[l.char]
              const isCurrentLine = i === lineIdx
              return (
                <div
                  key={i}
                  style={{
                    ...styles.chatBubble,
                    borderLeftColor: char.color,
                    opacity: isCurrentLine ? 1 : 0.5,
                  }}
                >
                  <span style={styles.bubbleChar}>{char.emoji} {char.name}</span>
                  <p style={styles.bubbleText}>{l.text}</p>
                </div>
              )
            })}
          </div>

          {/* Choice */}
          {line?.choice && !choiceResponse && (
            <div style={styles.choiceCard} className="animate-fade-in">
              <p style={styles.choicePrompt}>{line.choice.prompt}</p>
              <div style={styles.choiceOptions}>
                {line.choice.options.map((opt, i) => (
                  <button
                    key={i}
                    className="btn-press"
                    style={styles.choiceBtn}
                    onClick={() => handleChoice(opt)}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Choice response */}
          {choiceResponse && (
            <div style={styles.responseCard} className="animate-fade-in">
              <p style={styles.responseText}>{choiceResponse}</p>
            </div>
          )}

          {/* Next button */}
          {(line?.text || choiceResponse) && (
            <button className="btn-press" style={styles.nextBtn} onClick={handleNext}>
              {allLinesShown
                ? (isLastDialogue ? '🌟 Concluir' : 'Próximo diálogo →')
                : 'Continuar →'}
            </button>
          )}
        </>
      )}
    </ActivityShell>
  )
}

const styles = {
  introCard: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-lg)',
    padding: 'var(--space-2xl)', backgroundColor: '#EFEBE9', borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo7)',
  },
  introEmoji: { fontSize: '3rem' },
  introTitle: { fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-campo7)', textAlign: 'center' },
  introSetting: { fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', textAlign: 'center', fontStyle: 'italic' },
  charRow: { display: 'flex', gap: 'var(--space-xl)' },
  charBadge: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-xs)' },
  charEmoji: { fontSize: '2.5rem' },
  charName: { fontWeight: 700, fontSize: 'var(--font-size-base)' },
  startBtn: {
    padding: 'var(--space-md) var(--space-xl)', backgroundColor: 'var(--color-campo7)',
    color: 'white', borderRadius: 'var(--radius-md)', border: 'none',
    fontWeight: 700, fontSize: 'var(--font-size-lg)', cursor: 'pointer', minHeight: '48px',
  },
  chatContainer: { display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' },
  chatBubble: {
    padding: 'var(--space-md) var(--space-lg)', backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-md)', borderLeft: '4px solid',
    transition: 'opacity 0.3s ease',
  },
  bubbleChar: { fontSize: 'var(--font-size-sm)', fontWeight: 700, marginBottom: 'var(--space-xs)', display: 'block' },
  bubbleText: { fontSize: 'var(--font-size-base)', fontWeight: 600, lineHeight: 1.6, color: 'var(--color-text)' },
  choiceCard: {
    display: 'flex', flexDirection: 'column', gap: 'var(--space-md)',
    padding: 'var(--space-lg)', backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-campo7)',
  },
  choicePrompt: { fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--color-campo7)', textAlign: 'center' },
  choiceOptions: { display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' },
  choiceBtn: {
    padding: 'var(--space-md) var(--space-lg)', backgroundColor: 'var(--color-bg)',
    border: '2px solid var(--color-border)', borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-base)', fontWeight: 600, cursor: 'pointer',
    textAlign: 'left', minHeight: '44px',
  },
  responseCard: {
    padding: 'var(--space-lg)', backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-md)', border: '2px solid #A5D6A7',
  },
  responseText: { fontSize: 'var(--font-size-base)', fontWeight: 600, color: '#2E7D32', textAlign: 'center', lineHeight: 1.6 },
  nextBtn: {
    alignSelf: 'center', padding: 'var(--space-md) var(--space-xl)',
    backgroundColor: 'var(--color-campo7)', color: 'white',
    borderRadius: 'var(--radius-md)', border: 'none', fontWeight: 700,
    fontSize: 'var(--font-size-base)', cursor: 'pointer', minHeight: '44px',
  },
}
