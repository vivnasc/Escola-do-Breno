import { useState, useCallback } from 'react'
import ActivityShell from '../../components/ActivityShell'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const STEPS = [
  {
    label: 'Personagem',
    prompt: 'Escolhe uma personagem para a tua história:',
    options: [
      { text: 'Um cavaleiro corajoso', emoji: '🗡️' },
      { text: 'Uma cientista curiosa', emoji: '🔬' },
      { text: 'Um animal que fala', emoji: '🐻' },
    ],
  },
  {
    label: 'Cenário',
    prompt: 'Onde se passa a história?',
    options: [
      { text: 'Num castelo misterioso', emoji: '🏰' },
      { text: 'No fundo do oceano', emoji: '🌊' },
      { text: 'Numa floresta mágica', emoji: '🌲' },
    ],
  },
  {
    label: 'Problema',
    prompt: 'O que acontece na história?',
    options: [
      { text: 'Encontra um mapa secreto', emoji: '🗺️' },
      { text: 'Ouve um pedido de ajuda', emoji: '📢' },
      { text: 'Descobre uma porta escondida', emoji: '🚪' },
    ],
  },
  {
    label: 'Resolução',
    prompt: 'Como termina a história?',
    options: [
      { text: 'Usa a inteligência para resolver', emoji: '🧠' },
      { text: 'Pede ajuda aos amigos', emoji: '🤝' },
      { text: 'Encontra uma ferramenta especial', emoji: '🔧' },
    ],
  },
]

export default function StoryBuilder({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const [stepIdx, setStepIdx] = useState(0)
  const [choices, setChoices] = useState([])
  const [isComplete, setIsComplete] = useState(false)

  const current = STEPS[stepIdx]
  const storyBuilt = stepIdx >= STEPS.length && !isComplete

  const handleChoice = useCallback(
    (option) => {
      registerClick()
      registerSuccess()
      const newChoices = [...choices, option]
      setChoices(newChoices)
      updateCampoProgress('campo5', stepIdx + 1)

      if (stepIdx + 1 >= STEPS.length) {
        // All 4 choices made — build the story
        const storyText =
          `${newChoices[0].emoji} ${newChoices[0].text}... ` +
          `${newChoices[1].emoji} ${newChoices[1].text}... ` +
          `${newChoices[2].emoji} ${newChoices[2].text}... ` +
          `${newChoices[3].emoji} ${newChoices[3].text}.`
        speak(`A tua história: ${storyText}`)
        setStepIdx(stepIdx + 1)
      } else {
        setStepIdx(stepIdx + 1)
        speak(STEPS[stepIdx + 1].prompt)
      }
    },
    [stepIdx, choices, registerClick, registerSuccess, updateCampoProgress, speak]
  )

  const handleFinish = useCallback(() => {
    completeActivity('story-builder', 3)
    setIsComplete(true)
  }, [completeActivity])

  if (isComplete) {
    return (
      <ActivityShell title="Constrói uma História" backPath="/campo/5" color="var(--color-campo5)">
        <CompletionCelebration
          emoji="📖"
          title="Criaste uma história fantástica!"
          stars={3}
          color="var(--color-campo5)"
        />
      </ActivityShell>
    )
  }

  if (storyBuilt) {
    return (
      <ActivityShell
        title="Constrói uma História"
        backPath="/campo/5"
        color="var(--color-campo5)"
        textLevel={adaptive?.textLevel}
      >
        <div style={styles.storyCard}>
          <h3 style={styles.storyTitle}>A tua história:</h3>
          {choices.map((choice, i) => (
            <div key={i} style={styles.storyPart}>
              <span style={styles.storyPartLabel}>{STEPS[i].label}</span>
              <span style={styles.storyPartEmoji}>{choice.emoji}</span>
              <span style={styles.storyPartText}>{choice.text}</span>
            </div>
          ))}
        </div>

        <button
          style={styles.finishBtn}
          className="btn-press"
          onClick={handleFinish}
        >
          Concluir
        </button>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Constrói uma História"
      instruction={current.prompt}
      backPath="/campo/5"
      color="var(--color-campo5)"
      score={stepIdx}
      total={STEPS.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.progressDots}>
        {STEPS.map((s, i) => (
          <span
            key={i}
            style={{
              ...styles.dot,
              backgroundColor: i < stepIdx ? 'var(--color-campo5)' : i === stepIdx ? 'var(--color-campo5)' : 'var(--color-border)',
              opacity: i === stepIdx ? 1 : i < stepIdx ? 0.6 : 0.3,
            }}
          >
            {s.label}
          </span>
        ))}
      </div>

      <div style={styles.optionsList}>
        {current.options.map((opt, i) => (
          <button
            key={i}
            className="btn-press"
            style={styles.optionBtn}
            onClick={() => handleChoice(opt)}
          >
            <span style={styles.optionEmoji}>{opt.emoji}</span>
            <span style={styles.optionText}>{opt.text}</span>
          </button>
        ))}
      </div>

      {choices.length > 0 && (
        <div style={styles.choicesSoFar}>
          <p style={styles.choicesLabel}>As tuas escolhas:</p>
          {choices.map((c, i) => (
            <span key={i} style={styles.choiceTag}>
              {c.emoji} {c.text}
            </span>
          ))}
        </div>
      )}
    </ActivityShell>
  )
}

const styles = {
  progressDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--space-sm)',
    flexWrap: 'wrap',
  },
  dot: {
    padding: 'var(--space-xs) var(--space-sm)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'white',
    transition: 'all var(--transition-speed)',
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  optionBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all var(--transition-speed)',
  },
  optionEmoji: { fontSize: '2rem', flexShrink: 0 },
  optionText: { flex: 1 },
  choicesSoFar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
  },
  choicesLabel: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
  },
  choiceTag: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
    padding: 'var(--space-xs) 0',
  },
  storyCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    backgroundColor: '#E0F2F1',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo5)',
  },
  storyTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-campo5)',
    textAlign: 'center',
  },
  storyPart: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm)',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-sm)',
  },
  storyPartLabel: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
    color: 'var(--color-campo5)',
    minWidth: '80px',
  },
  storyPartEmoji: { fontSize: '1.5rem' },
  storyPartText: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    flex: 1,
  },
  finishBtn: {
    alignSelf: 'center',
    padding: 'var(--space-md) var(--space-xl)',
    backgroundColor: 'var(--color-campo5)',
    color: 'white',
    borderRadius: 'var(--radius-md)',
    fontWeight: 700,
    fontSize: 'var(--font-size-lg)',
    border: 'none',
    cursor: 'pointer',
  },
}
