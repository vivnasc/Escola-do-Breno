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
