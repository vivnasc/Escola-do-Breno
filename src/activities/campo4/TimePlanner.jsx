import { useState, useCallback, useMemo, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { getContent } from '../../data/universeContent'
import { useTTS } from '../../hooks/useTTS'

const TASK_SETS = [
  {
    title: 'Dia de Escola',
    emoji: '🏫',
    tasks: [
      { id: 's1', text: 'Tomar o pequeno-almoço', emoji: '🥣', order: 1 },
      { id: 's2', text: 'Vestir o uniforme', emoji: '👕', order: 2 },
      { id: 's3', text: 'Ir para a escola', emoji: '🎒', order: 3 },
      { id: 's4', text: 'Fazer os trabalhos de casa', emoji: '📝', order: 4 },
      { id: 's5', text: 'Brincar', emoji: '🎮', order: 5 },
    ],
  },
  {
    title: 'Manhã de Fim de Semana',
    emoji: '🌅',
    tasks: [
      { id: 'w1', text: 'Acordar e esticar', emoji: '🧘', order: 1 },
      { id: 'w2', text: 'Escovar os dentes', emoji: '🪥', order: 2 },
      { id: 'w3', text: 'Tomar o pequeno-almoço', emoji: '🥞', order: 3 },
      { id: 'w4', text: 'Arrumar o quarto', emoji: '🛏️', order: 4 },
      { id: 'w5', text: 'Tempo livre', emoji: '⚽', order: 5 },
    ],
  },
  {
    title: 'Depois da Escola',
    emoji: '🏠',
    tasks: [
      { id: 'a1', text: 'Lanchar', emoji: '🍎', order: 1 },
      { id: 'a2', text: 'Fazer os TPC', emoji: '📚', order: 2 },
      { id: 'a3', text: 'Tomar banho', emoji: '🚿', order: 3 },
      { id: 'a4', text: 'Jantar com a família', emoji: '🍽️', order: 4 },
      { id: 'a5', text: 'Preparar para dormir', emoji: '🌙', order: 5 },
    ],
  },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function TimePlanner({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const [setIdx, setSetIdx] = useState(0)
  const [selected, setSelected] = useState([])
  const [shuffled, setShuffled] = useState(() => shuffle(TASK_SETS[0].tasks))
  const [feedback, setFeedback] = useState(null)
  const [perfectSets, setPerfectSets] = useState(0)
  const [hadError, setHadError] = useState(false)

  const currentSet = TASK_SETS[setIdx]
  const isSetComplete = selected.length === currentSet.tasks.length
  const isAllComplete = setIdx >= TASK_SETS.length

  const nextExpectedOrder = selected.length + 1

  useEffect(() => {
    if (!isAllComplete && !isSetComplete) {
      speak(`${currentSet.title}. Qual é o passo número ${nextExpectedOrder}?`, { auto: true })
    }
  }, [setIdx, selected.length])

  const handleSelect = useCallback(
    (task) => {
      registerClick()
      if (task.order === nextExpectedOrder) {
        registerSuccess()
        const newSelected = [...selected, task]
        setSelected(newSelected)
        setShuffled((prev) => prev.filter((t) => t.id !== task.id))
        setFeedback('success')

        if (newSelected.length === currentSet.tasks.length) {
          if (!hadError) {
            setPerfectSets((s) => s + 1)
          }
          speak('Muito bem! Organizaste tudo na ordem certa!')
        }
      } else {
        registerError()
        setHadError(true)
        setFeedback('tryAgain')
      }
    },
    [nextExpectedOrder, selected, currentSet, hadError, registerClick, registerSuccess, registerError, speak]
  )

  const handleNextSet = useCallback(() => {
    const next = setIdx + 1
    setSetIdx(next)
    updateCampoProgress('campo4', next)
    setFeedback(null)
    setHadError(false)

    if (next >= TASK_SETS.length) {
      const finalPerfect = perfectSets + (!hadError ? 1 : 0)
      completeActivity('time-planner', finalPerfect >= 3 ? 3 : finalPerfect >= 2 ? 2 : 1)
    } else {
      setSelected([])
      setShuffled(shuffle(TASK_SETS[next].tasks))
    }
  }, [setIdx, perfectSets, hadError, completeActivity, updateCampoProgress])

  const finalPerfect = perfectSets + (isSetComplete && !hadError ? 1 : 0)
  const finalStars = isAllComplete
    ? (finalPerfect >= 3 ? 3 : finalPerfect >= 2 ? 2 : 1)
    : 0

  if (isAllComplete) {
    return (
      <ActivityShell title="Planear o Meu Dia" backPath="/campo/4" color="var(--color-campo4)">
        <CompletionCelebration
          emoji="📋"
          title="Sabes organizar o teu dia!"
          score={finalPerfect}
          total={TASK_SETS.length}
          stars={finalStars}
          color="var(--color-campo4)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Planear o Meu Dia"
      instruction={`Organiza as tarefas pela ordem certa: ${currentSet.title}`}
      backPath="/campo/4"
      color="var(--color-campo4)"
      score={setIdx}
      total={TASK_SETS.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.setHeader}>
        <span style={styles.setEmoji}>{currentSet.emoji}</span>
        <h3 style={styles.setTitle}>{currentSet.title}</h3>
        <p style={styles.setSubtitle}>Toca nas tarefas pela ordem certa (1 a 5)</p>
      </div>

      {selected.length > 0 && (
        <div style={styles.orderedList}>
          {selected.map((task, i) => (
            <div key={task.id} style={styles.orderedItem}>
              <span style={styles.stepNum}>{i + 1}</span>
              <span style={styles.taskEmoji}>{task.emoji}</span>
              <span style={styles.taskText}>{task.text}</span>
            </div>
          ))}
        </div>
      )}

      {!isSetComplete && (
        <>
          <p style={styles.prompt}>
            Passo {nextExpectedOrder}: O que vem a seguir?
          </p>

          <div style={styles.optionsList}>
            {shuffled.map((task) => (
              <button
                key={task.id}
                className="btn-press"
                style={styles.optionBtn}
                onClick={() => handleSelect(task)}
                disabled={feedback !== null}
              >
                <span style={styles.optionEmoji}>{task.emoji}</span>
                <span>{task.text}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {isSetComplete && (
        <div style={styles.setCompleteCard} className="animate-slide-up">
          <span style={styles.setCompleteIcon}>✅</span>
          <p style={styles.setCompleteText}>
            {!hadError
              ? 'Perfeito! Organizaste tudo sem erros!'
              : 'Conseguiste organizar tudo! Na próxima tenta sem erros.'}
          </p>
          <button style={styles.nextBtn} onClick={handleNextSet}>
            {setIdx + 1 < TASK_SETS.length ? 'Próximo cenário →' : 'Ver resultado →'}
          </button>
        </div>
      )}

      {!isSetComplete && (
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
  setHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-lg)',
    backgroundColor: '#F3E5F5',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo4)',
  },
  setEmoji: { fontSize: '2.5rem' },
  setTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-campo4)',
  },
  setSubtitle: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
  },
  orderedList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: 'var(--space-sm)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
  },
  orderedItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    fontSize: 'var(--font-size-sm)',
    padding: '4px var(--space-sm)',
  },
  stepNum: {
    width: '24px',
    height: '24px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--color-campo4)',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  taskEmoji: { fontSize: '1.2rem', flexShrink: 0 },
  taskText: { flex: 1 },
  prompt: {
    fontWeight: 700,
    color: 'var(--color-campo4)',
    fontSize: 'var(--font-size-lg)',
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
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
  },
  optionEmoji: { fontSize: '1.5rem', flexShrink: 0 },
  setCompleteCard: {
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
  setCompleteIcon: { fontSize: '2rem' },
  setCompleteText: {
    fontSize: 'var(--font-size-base)',
    lineHeight: 1.6,
    fontWeight: 600,
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
}
