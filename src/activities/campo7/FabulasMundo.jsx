import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const FABLES = [
  {
    id: 'tortoise-hare',
    title: 'A Tartaruga e a Lebre',
    origin: 'Fábula de Esopo (Grécia)',
    originEmoji: '🇬🇷',
    scenes: [
      { text: 'Era uma vez uma lebre muito rápida que gozava com a tartaruga. "Tu és tão lenta!", dizia ela, a rir.', visual: '🐇', mood: 'joyful' },
      { text: 'A tartaruga respondeu calmamente: "Aposto que te ganho numa corrida." A lebre riu-se tanto que lhe doía a barriga.', visual: '🐢', mood: 'warm' },
      { text: 'A corrida começou. A lebre disparou como um foguete! A tartaruga deu um passo. Depois outro. Depois outro.', visual: '💨', mood: 'joyful' },
      { text: 'A lebre estava tão à frente que decidiu dormir uma sesta. "A tartaruga nunca me apanha", pensou, enquanto fechava os olhos.', visual: '😴', mood: 'dreamy' },
      { text: 'A tartaruga não parou. Um passo. Outro passo. Outro passo. Lenta, mas sem parar nunca.', visual: '🐢', mood: 'mysterious' },
      { text: 'Quando a lebre acordou, a tartaruga estava quase na meta! A lebre correu, correu, mas... tarde demais.', visual: '😱', mood: 'tense' },
      { text: 'A tartaruga cruzou a linha de chegada. Olhou para trás e sorriu.', visual: '🏆', mood: 'triumphant' },
    ],
    moral: 'Devagar e sempre se chega longe. Não importa a velocidade — importa não desistir.',
    moralEmoji: '💡',
    question: {
      prompt: 'Porque é que a tartaruga ganhou?',
      options: [
        { text: 'Porque nunca parou', correct: true, response: 'Exactamente! A tartaruga nunca desistiu. Devagar, mas sempre em frente.' },
        { text: 'Porque era mais rápida', correct: false, response: 'Na verdade era mais lenta! Mas ganhou porque nunca parou.' },
        { text: 'Porque a lebre caiu', correct: false, response: 'A lebre não caiu — adormeceu! E a tartaruga ganhou porque nunca parou.' },
      ],
    },
  },
  {
    id: 'rabbit-hyena',
    title: 'O Coelho e a Hiena',
    origin: 'Fábula de Moçambique (África)',
    originEmoji: '🇲🇿',
    scenes: [
      { text: 'Na savana africana vivia uma hiena forte e esfomeada. Todos os dias ela roubava a comida dos outros animais. Ninguém conseguia pará-la.', visual: '🦴', mood: 'tense' },
      { text: 'Os animais estavam tristes e com fome. O coelho, pequeno mas esperto, disse: "Eu tenho um plano."', visual: '🐇', mood: 'warm' },
      { text: 'O coelho foi ter com a hiena e disse: "Ouvi dizer que há um banquete secreto na colina. Mas só entra quem trouxer comida para partilhar."', visual: '🌾', mood: 'mysterious' },
      { text: 'A hiena ficou desconfiada, mas a ideia de um banquete enorme era irresistível. "Eu levo a maior parte!", disse ela, a salivar.', visual: '🤤', mood: 'joyful' },
      { text: 'Todos os animais trouxeram comida para a colina. A hiena trouxe também. Quando chegou, viu a mesa cheia e começaram todos a comer juntos.', visual: '🍲', mood: 'warm' },
      { text: 'A hiena percebeu que, quando todos partilham, há mais comida do que quando se rouba. E a comida sabe melhor quando se come entre amigos.', visual: '🤝', mood: 'joyful' },
      { text: 'Desde esse dia, a hiena nunca mais roubou. E o coelho, pequenino, tornou-se o mais respeitado da savana.', visual: '🌍', mood: 'triumphant' },
    ],
    moral: 'A esperteza é mais forte do que a força. E quem partilha, acaba por ter mais.',
    moralEmoji: '💡',
    question: {
      prompt: 'O que é que o coelho usou para resolver o problema?',
      options: [
        { text: 'A sua esperteza', correct: true, response: 'Isso mesmo! O coelho não precisou de força — usou a inteligência para mudar a situação.' },
        { text: 'A sua força física', correct: false, response: 'O coelho era pequeno e não tinha grande força. Ele usou a esperteza!' },
        { text: 'A ajuda de um leão', correct: false, response: 'Nenhum leão apareceu nesta história. O coelho resolveu tudo com a sua inteligência.' },
      ],
    },
  },
  {
    id: 'macaw-crocodile',
    title: 'A Arara e o Jacaré',
    origin: 'Lenda do Brasil (América do Sul)',
    originEmoji: '🇧🇷',
    scenes: [
      { text: 'Junto a um grande rio vivia uma arara de penas coloridas e um jacaré de escamas fortes. A arara voava alto. O jacaré nadava fundo.', visual: '🦜', mood: 'warm' },
      { text: '"Eu sou melhor!", dizia a arara. "Vejo o mundo todo lá de cima!" O jacaré respondia: "Eu é que sou! Atravesso qualquer rio!"', visual: '🐊', mood: 'joyful' },
      { text: 'Um dia, uma grande cheia cobriu tudo de água. A arara voava, mas não encontrava onde pousar. As suas asas estavam cansadas.', visual: '🌊', mood: 'tense' },
      { text: 'O jacaré nadava, mas não sabia para onde ir. A água era tanta que ele não via nenhuma margem segura.', visual: '😟', mood: 'sad' },
      { text: 'A arara gritou lá de cima: "Eu vejo terra firme para leste!" O jacaré respondeu: "Sobe para as minhas costas — eu levo-te até lá!"', visual: '🌴', mood: 'warm' },
      { text: 'A arara guiou o caminho desde o céu. O jacaré nadou com força, levando a arara nas costas. Juntos, chegaram a terra segura.', visual: '🤝', mood: 'triumphant' },
      { text: 'Olharam um para o outro e sorriram. Já não importava quem era melhor. O que importava era que, juntos, tinham conseguido.', visual: '🌈', mood: 'joyful' },
    ],
    moral: 'Ninguém sabe fazer tudo. Juntos, somos mais fortes do que sozinhos.',
    moralEmoji: '💡',
    question: {
      prompt: 'O que é que a arara e o jacaré aprenderam?',
      options: [
        { text: 'Que a cooperação os tornou mais fortes', correct: true, response: 'Exactamente! Nenhum conseguia sozinho, mas juntos salvaram-se. A cooperação é uma força enorme.' },
        { text: 'Que voar é melhor do que nadar', correct: false, response: 'Nenhum dos dois era melhor. Precisaram um do outro! A lição é sobre cooperação.' },
        { text: 'Que deviam ter fugido sozinhos', correct: false, response: 'Sozinhos não teriam conseguido. A arara não podia pousar e o jacaré não via o caminho. Juntos é que foi!' },
      ],
    },
  },
  {
    id: 'fisher-turtle',
    title: 'O Pescador e a Tartaruga Mágica',
    origin: 'Lenda do Japão (Ásia)',
    originEmoji: '🇯🇵',
    scenes: [
      { text: 'Numa aldeia à beira-mar vivia um pescador bondoso. Ele pescava apenas o que precisava e tratava o mar com respeito.', visual: '🎣', mood: 'warm' },
      { text: 'Um dia, encontrou uma pequena tartaruga presa numa rede. Com cuidado, libertou-a e devolveu-a ao mar. "Vai, pequenina. Estás livre."', visual: '🐢', mood: 'warm' },
      { text: 'Dias depois, a tartaruga voltou — mas agora brilhava como ouro. "Obrigada pela tua bondade", disse ela, e ofereceu-lhe uma caixa com uma pérola linda dentro.', visual: '✨', mood: 'mysterious' },
      { text: '"Esta caixa traz-te felicidade", disse a tartaruga. "Mas nunca a abras. Guarda-a fechada e ela proteger-te-á sempre."', visual: '🎁', mood: 'dreamy' },
      { text: 'O pescador foi feliz durante muito tempo. Mas todos os dias olhava para a caixa e a curiosidade crescia. "O que haverá lá dentro?"', visual: '🤔', mood: 'tense' },
      { text: 'Num dia de fraqueza, abriu a caixa. Uma nuvem de fumo saiu e toda a beleza à sua volta desapareceu. A pérola transformou-se em pó.', visual: '💨', mood: 'sad' },
      { text: 'A tartaruga apareceu uma última vez. "Os verdadeiros tesouros não precisam de ser abertos. A felicidade estava na confiança, não na caixa."', visual: '🐢', mood: 'warm' },
    ],
    moral: 'A verdadeira riqueza está nas coisas simples. Nem tudo precisa de ser aberto ou explicado.',
    moralEmoji: '💡',
    question: {
      prompt: 'Porque é que o pescador não devia ter aberto a caixa?',
      options: [
        { text: 'Porque a felicidade estava na confiança e na gratidão', correct: true, response: 'Isso mesmo! A caixa fechada representava confiança. Ao abri-la, perdeu o que mais importava.' },
        { text: 'Porque a caixa era perigosa', correct: false, response: 'A caixa não era perigosa — era mágica. O problema foi a falta de confiança, não o perigo.' },
        { text: 'Porque a tartaruga ficou zangada', correct: false, response: 'A tartaruga não ficou zangada, ficou triste. A lição é sobre confiar e valorizar o que temos.' },
      ],
    },
  },
  {
    id: 'elephant-ant',
    title: 'O Elefante e a Formiga',
    origin: 'Fábula da Índia (Ásia)',
    originEmoji: '🇮🇳',
    scenes: [
      { text: 'Na floresta tropical da Índia vivia um elefante orgulhoso. Era o maior de todos e achava que, por isso, era o mais importante.', visual: '🐘', mood: 'warm' },
      { text: '"Saiam do meu caminho!", dizia ele, pisando flores e arbustos sem cuidado. Os animais pequenos fugiam assustados.', visual: '😤', mood: 'tense' },
      { text: 'Um dia, o elefante pisou um espinho enorme que se enterrou na sua pata. A dor era tanta que não conseguia dar mais um passo.', visual: '🌵', mood: 'sad' },
      { text: 'O macaco tentou ajudar, mas os seus dedos eram grandes demais. O papagaio tentou com o bico, mas não alcançava. Ninguém conseguia tirar o espinho.', visual: '🐒', mood: 'tense' },
      { text: 'Uma formiga pequenina subiu pela pata do elefante, entrou na ferida com cuidado e, com as suas patas minúsculas, puxou o espinho para fora.', visual: '🐜', mood: 'mysterious' },
      { text: 'O elefante sentiu o alívio e olhou para a formiga com olhos novos. "Tu salvaste-me. Tu, tão pequena..."', visual: '😊', mood: 'warm' },
      { text: 'Desde esse dia, o elefante caminhava com cuidado e cumprimentava todos os animais, grandes e pequenos. Nunca mais se sentiu superior.', visual: '🌺', mood: 'triumphant' },
    ],
    moral: 'Respeita todos, por mais pequenos que pareçam. Um dia podes precisar deles.',
    moralEmoji: '💡',
    question: {
      prompt: 'O que é que o elefante aprendeu?',
      options: [
        { text: 'A respeitar todos, grandes e pequenos', correct: true, response: 'Exactamente! O elefante aprendeu que todos merecem respeito, independentemente do tamanho.' },
        { text: 'Que os elefantes não devem andar na floresta', correct: false, response: 'Não é isso! Ele pode andar na floresta, mas deve respeitar quem lá vive. A lição é sobre respeito.' },
        { text: 'Que os espinhos são perigosos', correct: false, response: 'Os espinhos são um detalhe. A verdadeira lição é que devemos respeitar todos, mesmo os mais pequenos.' },
      ],
    },
  },
  {
    id: 'lion-mouse',
    title: 'O Leão e o Rato',
    origin: 'Fábula de Esopo (Grécia)',
    originEmoji: '🇬🇷',
    scenes: [
      { text: 'Um leão enorme dormia à sombra de uma árvore. Um ratinho pequenino, sem querer, correu por cima do seu nariz.', visual: '🦁', mood: 'warm' },
      { text: 'O leão acordou furioso e agarrou o rato com a pata. "Vou-te comer!", rugiu.', visual: '😤', mood: 'tense' },
      { text: '"Por favor, deixa-me ir!", pediu o rato. "Um dia vou ajudar-te!" O leão riu-se. Um rato ajudar um leão? Impossível! Mas deixou-o ir.', visual: '🐭', mood: 'warm' },
      { text: 'Passaram-se dias. O leão ficou preso numa rede de caçadores. Rugiu, rugiu, mas não conseguia sair.', visual: '🪤', mood: 'sad' },
      { text: 'O ratinho ouviu os rugidos e correu para ajudar. Com os seus dentes pequeninos, roeu a rede até o leão ficar livre.', visual: '🐭', mood: 'triumphant' },
      { text: 'O leão olhou para o rato com respeito. "Tinhas razão, pequeno amigo. Obrigado."', visual: '🤝', mood: 'warm' },
    ],
    moral: 'Ninguém é demasiado pequeno para ajudar. A bondade volta sempre.',
    moralEmoji: '💡',
    question: {
      prompt: 'O que aprendemos com esta fábula?',
      options: [
        { text: 'Todos podem ajudar, mesmo os pequenos', correct: true, response: 'Sim! O rato era pequeno, mas a sua ajuda foi enorme.' },
        { text: 'Os leões são maus', correct: false, response: 'O leão até foi simpático — deixou o rato ir! A lição é que todos podem ajudar.' },
        { text: 'Os ratos são mais fortes', correct: false, response: 'Mais forte não, mas todos têm algo especial para oferecer!' },
      ],
    },
  },
]

export default function FabulasMundo({
  registerClick,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const [fableIdx, setFableIdx] = useState(0)
  const [sceneIdx, setSceneIdx] = useState(-1) // -1 = cover
  const [showMoral, setShowMoral] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const [questionAnswered, setQuestionAnswered] = useState(false)
  const [questionFeedback, setQuestionFeedback] = useState(null)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const fable = FABLES[fableIdx]
  const scene = sceneIdx >= 0 ? fable.scenes[sceneIdx] : null
  const isLastFable = fableIdx >= FABLES.length - 1
  const allScenesShown = sceneIdx >= fable.scenes.length - 1

  useEffect(() => {
    if (scene) {
      speak(scene.text, { auto: true })
    }
  }, [sceneIdx, fableIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleStart = useCallback(() => {
    registerClick()
    setSceneIdx(0)
  }, [registerClick])

  const handleNextScene = useCallback(() => {
    registerClick()
    if (allScenesShown) {
      setShowMoral(true)
      speak(fable.moral, { auto: true })
    } else {
      setSceneIdx(sceneIdx + 1)
    }
  }, [allScenesShown, sceneIdx, fable.moral, registerClick, speak])

  const handleShowQuestion = useCallback(() => {
    setShowQuestion(true)
    speak(fable.question.prompt, { auto: true })
  }, [fable.question.prompt, speak])

  const handleAnswer = useCallback((option) => {
    registerClick()
    setQuestionAnswered(true)
    setQuestionFeedback(option.response)
    speak(option.response, { auto: true })
    if (option.correct) {
      registerSuccess()
      setScore((s) => s + 1)
    }
  }, [registerClick, registerSuccess, speak])

  const handleNextFable = useCallback(() => {
    updateCampoProgress('campo7', fableIdx + 1)
    if (isLastFable) {
      const stars = score >= 2 ? 3 : score >= 1 ? 2 : 1
      completeActivity('fabulas-mundo', stars)
      setIsComplete(true)
    } else {
      setFableIdx(fableIdx + 1)
      setSceneIdx(-1)
      setShowMoral(false)
      setShowQuestion(false)
      setQuestionAnswered(false)
      setQuestionFeedback(null)
    }
  }, [fableIdx, isLastFable, score, completeActivity, updateCampoProgress])

  if (isComplete) {
    return (
      <ActivityShell title="Fábulas do Mundo" backPath="/campo/7" color="var(--color-campo7)">
        <CompletionCelebration
          emoji="🌍"
          title="Descobriste sabedoria de todo o mundo!"
          stars={score >= 2 ? 3 : score >= 1 ? 2 : 1}
          color="var(--color-campo7)"
        />
      </ActivityShell>
    )
  }

  const mood = scene ? (MOODS_LOCAL[scene.mood] || MOODS_LOCAL.warm) : MOODS_LOCAL.warm

  return (
    <ActivityShell
      title="Fábulas do Mundo"
      instruction={sceneIdx < 0 ? 'Ouve fábulas antigas de todo o mundo.' : null}
      backPath="/campo/7"
      color="var(--color-campo7)"
      score={fableIdx + 1}
      total={FABLES.length}
      textLevel={adaptive?.textLevel}
    >
      {/* Cover */}
      {sceneIdx < 0 && (
        <div style={styles.coverCard}>
          <span style={styles.coverEmoji}>📜</span>
          <h2 style={styles.coverTitle}>{fable.title}</h2>
          <p style={styles.coverOrigin}>{fable.originEmoji} {fable.origin}</p>
          <button className="btn-press" style={styles.startBtn} onClick={handleStart}>
            Ouvir a Fábula
          </button>
        </div>
      )}

      {/* Scene */}
      {sceneIdx >= 0 && !showMoral && (
        <div style={{ ...styles.sceneCard, backgroundColor: mood.bg, borderColor: mood.border }}>
          <span style={styles.sceneVisual}>{scene?.visual}</span>
          <p style={styles.sceneText}>{scene?.text}</p>
          <div style={styles.sceneFooter}>
            <span style={styles.sceneCount}>{sceneIdx + 1} / {fable.scenes.length}</span>
            <button className="btn-press" style={styles.nextBtn} onClick={handleNextScene}>
              {allScenesShown ? 'A lição →' : 'Continuar →'}
            </button>
          </div>
        </div>
      )}

      {/* Moral */}
      {showMoral && !showQuestion && (
        <div style={styles.moralCard} className="animate-fade-in">
          <span style={styles.moralEmoji}>{fable.moralEmoji}</span>
          <h3 style={styles.moralTitle}>A lição desta fábula:</h3>
          <p style={styles.moralText}>{fable.moral}</p>
          <button className="btn-press" style={styles.nextBtn} onClick={handleShowQuestion}>
            Pergunta →
          </button>
        </div>
      )}

      {/* Question */}
      {showQuestion && (
        <div style={styles.questionCard} className="animate-fade-in">
          <p style={styles.questionPrompt}>{fable.question.prompt}</p>
          {!questionAnswered && (
            <div style={styles.questionOptions}>
              {fable.question.options.map((opt, i) => (
                <button
                  key={i}
                  className="btn-press"
                  style={styles.questionBtn}
                  onClick={() => handleAnswer(opt)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          )}
          {questionFeedback && (
            <>
              <p style={styles.feedbackText}>{questionFeedback}</p>
              <button className="btn-press" style={styles.finishBtn} onClick={handleNextFable}>
                {isLastFable ? '🌟 Concluir' : 'Próxima fábula →'}
              </button>
            </>
          )}
        </div>
      )}
    </ActivityShell>
  )
}

const MOODS_LOCAL = {
  warm: { bg: '#FFF8E1', border: '#FFD54F' },
  dreamy: { bg: '#E3F2FD', border: '#90CAF9' },
  joyful: { bg: '#FFF9C4', border: '#FFF176' },
  tense: { bg: '#ECEFF1', border: '#B0BEC5' },
  sad: { bg: '#F3E5F5', border: '#CE93D8' },
  mysterious: { bg: '#E8F5E9', border: '#A5D6A7' },
  triumphant: { bg: '#FFF3E0', border: '#FFB74D' },
}

const styles = {
  coverCard: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-lg)',
    padding: 'var(--space-2xl)', backgroundColor: '#EFEBE9', borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo7)',
  },
  coverEmoji: { fontSize: '3rem' },
  coverTitle: { fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-campo7)', textAlign: 'center' },
  coverOrigin: { fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', fontStyle: 'italic' },
  startBtn: {
    padding: 'var(--space-md) var(--space-xl)', backgroundColor: 'var(--color-campo7)',
    color: 'white', borderRadius: 'var(--radius-md)', border: 'none',
    fontWeight: 700, fontSize: 'var(--font-size-lg)', cursor: 'pointer', minHeight: '48px',
  },
  sceneCard: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-lg)',
    padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '2px solid',
  },
  sceneVisual: { fontSize: '3.5rem' },
  sceneText: { fontSize: 'var(--font-size-lg)', fontWeight: 600, lineHeight: 1.8, textAlign: 'center', color: 'var(--color-text)' },
  sceneFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  sceneCount: { fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', fontWeight: 600 },
  nextBtn: {
    padding: 'var(--space-sm) var(--space-lg)', backgroundColor: 'var(--color-campo7)',
    color: 'white', borderRadius: 'var(--radius-md)', border: 'none',
    fontWeight: 700, fontSize: 'var(--font-size-base)', cursor: 'pointer', minHeight: '44px',
  },
  moralCard: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-md)',
    padding: 'var(--space-xl)', backgroundColor: '#E8F5E9', borderRadius: 'var(--radius-lg)',
    border: '2px solid #A5D6A7',
  },
  moralEmoji: { fontSize: '2.5rem' },
  moralTitle: { fontSize: 'var(--font-size-lg)', fontWeight: 700, color: '#2E7D32' },
  moralText: { fontSize: 'var(--font-size-base)', fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic' },
  questionCard: {
    display: 'flex', flexDirection: 'column', gap: 'var(--space-md)',
    padding: 'var(--space-xl)', backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-campo7)',
  },
  questionPrompt: { fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-campo7)', textAlign: 'center' },
  questionOptions: { display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' },
  questionBtn: {
    padding: 'var(--space-md) var(--space-lg)', backgroundColor: 'var(--color-bg)',
    border: '2px solid var(--color-border)', borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-base)', fontWeight: 600, cursor: 'pointer', textAlign: 'left', minHeight: '44px',
  },
  feedbackText: {
    fontSize: 'var(--font-size-base)', fontWeight: 600, color: '#2E7D32', textAlign: 'center',
    padding: 'var(--space-md)', backgroundColor: '#E8F5E9', borderRadius: 'var(--radius-sm)', lineHeight: 1.6,
  },
  finishBtn: {
    alignSelf: 'center', padding: 'var(--space-md) var(--space-xl)',
    backgroundColor: 'var(--color-campo7)', color: 'white',
    borderRadius: 'var(--radius-md)', border: 'none', fontWeight: 700,
    fontSize: 'var(--font-size-base)', cursor: 'pointer', minHeight: '44px',
  },
}
