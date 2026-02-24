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
