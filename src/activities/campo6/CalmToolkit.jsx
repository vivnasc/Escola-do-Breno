import { useState, useCallback, useEffect, useRef } from 'react'
import ActivityShell from '../../components/ActivityShell'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const ENERGY_LEVELS = [
  { level: 5, label: 'Muito agitado', emoji: '🔴', color: '#E53935' },
  { level: 4, label: 'Agitado', emoji: '🟠', color: '#FB8C00' },
  { level: 3, label: 'Normal', emoji: '🟢', color: '#43A047' },
  { level: 2, label: 'Cansado', emoji: '🔵', color: '#1E88E5' },
  { level: 1, label: 'Muito cansado', emoji: '⚫', color: '#546E7A' },
]

const TOOLS = {
  high: [
    {
      id: 'breathing',
      label: 'Respiração lenta',
      emoji: '🌬️',
      type: 'breathing',
      description: 'Vamos respirar juntos. Inspira pelo nariz, segura, e expira pela boca.',
    },
    {
      id: 'counting',
      label: 'Contar até 10',
      emoji: '🔢',
      type: 'counting',
      description: 'Conta devagar até 10, prestando atenção a cada número.',
    },
    {
      id: 'squeeze',
      label: 'Apertar e largar as mãos',
      emoji: '✊',
      type: 'simple',
      description: 'Aperta as mãos com força durante 5 segundos... e agora larga! Sente a diferença? Repete 3 vezes.',
    },
  ],
  normal: [
    {
      id: 'affirmation',
      label: 'Continuar assim!',
      emoji: '✨',
      type: 'simple',
      description: 'Estás num bom equilíbrio! Lembra-te: sentir-se bem é para agradecer e aproveitar.',
    },
    {
      id: 'gratitude',
      label: 'Pausa para agradecer 3 coisas',
      emoji: '🙏',
      type: 'simple',
      description: 'Pensa em 3 coisas boas que aconteceram hoje. Podem ser pequenas — um sorriso, uma comida boa, um momento divertido.',
    },
    {
      id: 'stretch',
      label: 'Espreguiçar',
      emoji: '🙆',
      type: 'simple',
      description: 'Levanta os braços bem alto, espreguiça-te como um gato! Depois roda os ombros para trás. Sente-te bem!',
    },
  ],
  low: [
    {
      id: 'move',
      label: 'Espreguiçar e mover o corpo',
      emoji: '🤸',
      type: 'simple',
      description: 'Levanta-te e sacode os braços! Faz 5 saltos no lugar. Mexer o corpo ajuda a acordar a energia!',
    },
    {
      id: 'water',
      label: 'Beber água',
      emoji: '💧',
      type: 'simple',
      description: 'Vai beber um copo de água fresca. A água ajuda o corpo e o cérebro a funcionar melhor!',
    },
    {
      id: 'music',
      label: 'Ouvir uma música animada',
      emoji: '🎵',
      type: 'simple',
      description: 'Pensa na tua música favorita e canta ou dança um bocadinho! A música dá energia e bom humor.',
    },
  ],
}

function getToolsForLevel(level) {
  if (level >= 4) return TOOLS.high
  if (level === 3) return TOOLS.normal
  return TOOLS.low
}

// Breathing exercise component
function BreathingExercise({ onComplete }) {
  const [phase, setPhase] = useState('ready') // ready, inhale, hold, exhale
  const [cycle, setCycle] = useState(0)
  const [timer, setTimer] = useState(0)
  const intervalRef = useRef(null)
  const { speak } = useTTS()
  const totalCycles = 3

  const PHASE_DURATION = 4 // seconds per phase

  const phaseLabels = {
    ready: 'Preparar...',
    inhale: 'Inspira...',
    hold: 'Segura...',
    exhale: 'Expira...',
  }

  const phaseColors = {
    ready: '#90CAF9',
    inhale: '#81C784',
    hold: '#FFD54F',
    exhale: '#CE93D8',
  }

  useEffect(() => {
    // Start after a brief ready phase
    const readyTimer = setTimeout(() => {
      setPhase('inhale')
      speak('Inspira pelo nariz')
      setTimer(PHASE_DURATION)
    }, 1500)
    return () => clearTimeout(readyTimer)
  }, [])

  useEffect(() => {
    if (phase === 'ready') return

    intervalRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          // Advance phase
          if (phase === 'inhale') {
            setPhase('hold')
            speak('Segura')
            return PHASE_DURATION
          } else if (phase === 'hold') {
            setPhase('exhale')
            speak('Expira pela boca')
            return PHASE_DURATION
          } else if (phase === 'exhale') {
            const nextCycle = cycle + 1
            if (nextCycle >= totalCycles) {
              clearInterval(intervalRef.current)
              onComplete()
              return 0
            }
            setCycle(nextCycle)
            setPhase('inhale')
            speak('Inspira pelo nariz')
            return PHASE_DURATION
          }
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [phase, cycle])

  const circleScale = phase === 'inhale' ? 1.4 : phase === 'hold' ? 1.4 : phase === 'exhale' ? 0.8 : 1

  return (
    <div style={breathStyles.container}>
      <p style={breathStyles.cycleText}>
        Ciclo {Math.min(cycle + 1, totalCycles)} de {totalCycles}
      </p>
      <div
        style={{
          ...breathStyles.circle,
          backgroundColor: phaseColors[phase],
          transform: `scale(${circleScale})`,
        }}
      >
        <span style={breathStyles.circleText}>{phaseLabels[phase]}</span>
        {phase !== 'ready' && <span style={breathStyles.timerText}>{timer}</span>}
      </div>
      <p style={breathStyles.instruction}>{phaseLabels[phase]}</p>
    </div>
  )
}

const breathStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-xl)',
  },
  cycleText: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontWeight: 600,
  },
  circle: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-xs)',
    transition: 'transform 4s ease-in-out, background-color 0.5s ease',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  circleText: {
    color: 'white',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
  },
  timerText: {
    color: 'white',
    fontWeight: 700,
    fontSize: 'var(--font-size-2xl)',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
  },
  instruction: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 600,
    color: 'var(--color-text)',
    textAlign: 'center',
  },
}

// Counting exercise component
function CountingExercise({ onComplete }) {
  const [count, setCount] = useState(0)
  const { speak } = useTTS()

  useEffect(() => {
    speak('Conta devagar até 10, carregando em cada número.')
  }, [])

  const handleCount = useCallback(() => {
    const next = count + 1
    setCount(next)
    speak(String(next))
    if (next >= 10) {
      setTimeout(() => onComplete(), 1000)
    }
  }, [count, onComplete, speak])

  return (
    <div style={countStyles.container}>
      <p style={countStyles.instruction}>Carrega no número seguinte, devagar:</p>
      <div style={countStyles.grid}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            style={{
              ...countStyles.numBtn,
              backgroundColor: num <= count ? '#AD1457' : 'var(--color-surface)',
              color: num <= count ? 'white' : 'var(--color-text)',
              border: num === count + 1 ? '3px solid #AD1457' : '2px solid var(--color-border)',
              transform: num <= count ? 'scale(0.95)' : 'scale(1)',
            }}
            onClick={handleCount}
            disabled={num !== count + 1}
          >
            {num}
          </button>
        ))}
      </div>
      <p style={countStyles.progress}>{count}/10</p>
    </div>
  )
}

const countStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-lg)',
  },
  instruction: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    textAlign: 'center',
    color: 'var(--color-text)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 'var(--space-sm)',
    maxWidth: '320px',
  },
  numBtn: {
    width: '56px',
    height: '56px',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  progress: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontWeight: 600,
  },
}

// Simple tool instruction component
function SimpleToolExercise({ tool, onComplete }) {
  const { speak } = useTTS()

  useEffect(() => {
    speak(tool.description)
  }, [])

  return (
    <div style={simpleStyles.container}>
      <span style={simpleStyles.emoji}>{tool.emoji}</span>
      <h3 style={simpleStyles.title}>{tool.label}</h3>
      <p style={simpleStyles.description}>{tool.description}</p>
      <button style={simpleStyles.doneBtn} className="btn-press" onClick={onComplete}>
        Já fiz! ✓
      </button>
    </div>
  )
}

const simpleStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-xl)',
    backgroundColor: '#F3E5F5',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid #CE93D8',
    textAlign: 'center',
  },
  emoji: { fontSize: '3rem' },
  title: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: '#AD1457',
  },
  description: {
    fontSize: 'var(--font-size-base)',
    lineHeight: 1.6,
    color: 'var(--color-text)',
    maxWidth: '400px',
  },
  doneBtn: {
    padding: 'var(--space-md) var(--space-xl)',
    backgroundColor: '#AD1457',
    color: 'white',
    borderRadius: 'var(--radius-md)',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    border: 'none',
    cursor: 'pointer',
    marginTop: 'var(--space-sm)',
  },
}

export default function CalmToolkit({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  // Steps: 'check-in' → 'choose-tool' → 'do-tool' → 'check-out' → 'complete'
  const [step, setStep] = useState('check-in')
  const [initialLevel, setInitialLevel] = useState(null)
  const [finalLevel, setFinalLevel] = useState(null)
  const [selectedTool, setSelectedTool] = useState(null)

  useEffect(() => {
    speak('Como estás agora? Escolhe o nível que melhor descreve a tua energia.', { auto: true })
  }, [])

  const handleCheckIn = useCallback(
    (level) => {
      registerClick()
      registerSuccess()
      setInitialLevel(level)
      setStep('choose-tool')
      updateCampoProgress('campo6', 28)
      const tools = getToolsForLevel(level.level)
      speak('Boa! Agora escolhe uma ferramenta para experimentar.')
    },
    [registerClick, registerSuccess, updateCampoProgress, speak]
  )

  const handleChooseTool = useCallback(
    (tool) => {
      registerClick()
      setSelectedTool(tool)
      setStep('do-tool')
      updateCampoProgress('campo6', 29)
    },
    [registerClick, updateCampoProgress]
  )

  const handleToolComplete = useCallback(() => {
    registerSuccess()
    setStep('check-out')
    updateCampoProgress('campo6', 30)
    speak('Boa! Como estás agora? Escolhe o teu nível de energia.')
  }, [registerSuccess, updateCampoProgress, speak])

  const handleCheckOut = useCallback(
    (level) => {
      registerClick()
      registerSuccess()
      setFinalLevel(level)
      setStep('complete')
      updateCampoProgress('campo6', 31)
      completeActivity('calm-toolkit', 3)
    },
    [registerClick, registerSuccess, updateCampoProgress, completeActivity]
  )

  if (step === 'complete') {
    return (
      <ActivityShell title="Kit da Calma" backPath="/campo/6" color="var(--color-campo6)">
        <CompletionCelebration
          emoji="🧘"
          title="Usaste uma ferramenta do kit!"
          subtitle="Quanto mais praticares, melhor te vais conhecer."
          stars={3}
          color="var(--color-campo6)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Kit da Calma"
      instruction={
        step === 'check-in'
          ? 'Como estás agora?'
          : step === 'choose-tool'
            ? 'Escolhe uma ferramenta para experimentar'
            : step === 'do-tool'
              ? selectedTool?.label
              : 'Como estás agora?'
      }
      backPath="/campo/6"
      color="var(--color-campo6)"
      textLevel={adaptive?.textLevel}
    >
      {/* Step 1 & 4: Energy level check */}
      {(step === 'check-in' || step === 'check-out') && (
        <div style={styles.checkContainer}>
          <p style={styles.checkTitle}>
            {step === 'check-in'
              ? 'Escolhe o nível que melhor descreve a tua energia:'
              : 'E agora, como te sentes?'}
          </p>
          <div style={styles.levelsList}>
            {ENERGY_LEVELS.map((level) => (
              <button
                key={level.level}
                style={{
                  ...styles.levelBtn,
                  borderColor: level.color,
                  backgroundColor: 'var(--color-surface)',
                }}
                className="btn-press"
                onClick={() =>
                  step === 'check-in' ? handleCheckIn(level) : handleCheckOut(level)
                }
              >
                <span style={styles.levelEmoji}>{level.emoji}</span>
                <span style={{ ...styles.levelLabel, color: level.color }}>{level.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Choose a tool */}
      {step === 'choose-tool' && initialLevel && (
        <div style={styles.toolsContainer}>
          <div style={styles.currentLevel}>
            <span>{initialLevel.emoji}</span>
            <span style={styles.currentLevelText}>
              Estás: <strong>{initialLevel.label}</strong>
            </span>
          </div>
          <p style={styles.toolsTitle}>Escolhe uma ferramenta:</p>
          <div style={styles.toolsList}>
            {getToolsForLevel(initialLevel.level).map((tool) => (
              <button
                key={tool.id}
                style={styles.toolBtn}
                className="btn-press"
                onClick={() => handleChooseTool(tool)}
              >
                <span style={styles.toolEmoji}>{tool.emoji}</span>
                <span style={styles.toolLabel}>{tool.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Do the tool exercise */}
      {step === 'do-tool' && selectedTool && (
        <>
          {selectedTool.type === 'breathing' && (
            <BreathingExercise onComplete={handleToolComplete} />
          )}
          {selectedTool.type === 'counting' && (
            <CountingExercise onComplete={handleToolComplete} />
          )}
          {selectedTool.type === 'simple' && (
            <SimpleToolExercise tool={selectedTool} onComplete={handleToolComplete} />
          )}
        </>
      )}
    </ActivityShell>
  )
}

const styles = {
  checkContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
  },
  checkTitle: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    textAlign: 'center',
    color: 'var(--color-text)',
  },
  levelsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
    width: '100%',
    maxWidth: '400px',
  },
  levelBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-md) var(--space-lg)',
    border: '2px solid',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    textAlign: 'left',
    width: '100%',
  },
  levelEmoji: { fontSize: '1.5rem', flexShrink: 0 },
  levelLabel: { fontWeight: 700 },
  toolsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
  },
  currentLevel: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: '#FCE4EC',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-base)',
  },
  currentLevelText: {
    color: 'var(--color-text)',
  },
  toolsTitle: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    color: 'var(--color-text)',
    textAlign: 'center',
  },
  toolsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
    width: '100%',
    maxWidth: '400px',
  },
  toolBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-md) var(--space-lg)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
  },
  toolEmoji: { fontSize: '1.8rem', flexShrink: 0 },
  toolLabel: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    color: 'var(--color-text)',
  },
}
