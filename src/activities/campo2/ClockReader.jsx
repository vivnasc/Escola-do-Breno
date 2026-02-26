import { useState, useCallback, useMemo, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

/**
 * Generate clock problems tiered by competency level.
 *
 * Based on competencies.js milestones for c2-time (Tempo e Medida):
 *   L1-2: Distingue dia e noite / Conhece as partes do dia → full hours only
 *   L3:   Lê horas exactas → full hours (3:00, 7:00)
 *   L4:   Lê meias horas → full + half hours (3:30)
 *   L5:   Lê quartos de hora → + quarter hours (3:15, 3:45)
 *   L6+:  Lê qualquer hora no relógio → 5-min intervals (3:05, 3:10...)
 *   L8+:  Any minute (3:07, 3:23)
 *
 * Research: Kamii & Russell (2012) — children learn clock reading in this exact
 * progression. Full hours are grasped ~age 6, half hours ~age 7, quarters ~age 8.
 */
function generateClockProblem(campoLevel) {
  const hours = Math.floor(Math.random() * 12) + 1
  let minutes
  if (campoLevel <= 3) {
    // Full hours only
    minutes = 0
  } else if (campoLevel <= 4) {
    // Full + half hours
    minutes = [0, 30][Math.floor(Math.random() * 2)]
  } else if (campoLevel <= 5) {
    // + quarter hours
    minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)]
  } else if (campoLevel <= 7) {
    // 5-minute intervals
    minutes = Math.floor(Math.random() * 12) * 5
  } else {
    // Any minute
    minutes = Math.floor(Math.random() * 60)
  }
  const display = `${hours}:${minutes.toString().padStart(2, '0')}`
  const context = [
    `O jogo começa às ${display}. Que horas são?`,
    `O treino é às ${display}. Consegues ler o relógio?`,
    `O autocarro parte às ${display}. A que horas?`,
  ][Math.floor(Math.random() * 3)]
  return { hours, minutes, display, context }
}

function ClockFace({ hours, minutes }) {
  const hourAngle = ((hours % 12) + minutes / 60) * 30 - 90
  const minuteAngle = minutes * 6 - 90

  return (
    <svg viewBox="0 0 200 200" width="180" height="180" style={{ display: 'block', margin: '0 auto' }}>
      <circle cx="100" cy="100" r="95" fill="#F5F5F5" stroke="#2E7D32" strokeWidth="4" />
      {[...Array(12)].map((_, i) => {
        const angle = ((i + 1) * 30 - 90) * (Math.PI / 180)
        const x = 100 + 75 * Math.cos(angle)
        const y = 100 + 75 * Math.sin(angle)
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central"
            fontSize="16" fontWeight="700" fill="#333" fontFamily="Quicksand">
            {i + 1}
          </text>
        )
      })}
      {/* Hour hand */}
      <line
        x1="100" y1="100"
        x2={100 + 45 * Math.cos(hourAngle * Math.PI / 180)}
        y2={100 + 45 * Math.sin(hourAngle * Math.PI / 180)}
        stroke="#333" strokeWidth="6" strokeLinecap="round"
      />
      {/* Minute hand */}
      <line
        x1="100" y1="100"
        x2={100 + 65 * Math.cos(minuteAngle * Math.PI / 180)}
        y2={100 + 65 * Math.sin(minuteAngle * Math.PI / 180)}
        stroke="#E65100" strokeWidth="4" strokeLinecap="round"
      />
      <circle cx="100" cy="100" r="5" fill="#333" />
    </svg>
  )
}

export default function ClockReader({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const choiceCount = adaptive?.choiceCount || 4
  const campoLevel = adaptive?.campoLevel?.campo2 || 1
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  // More rounds at higher levels (more minute variations to practice)
  const TOTAL = campoLevel <= 3 ? 5 : campoLevel <= 5 ? 6 : 8

  const problem = useMemo(() => generateClockProblem(campoLevel), [round, campoLevel])
  const isComplete = round >= TOTAL

  useEffect(() => {
    if (!isComplete) {
      speak(problem.context, { auto: true })
    }
  }, [round])

  // Generate distractors at the same minute-granularity as the problem
  const options = useMemo(() => {
    const correct = problem.display
    const wrongs = new Set()
    while (wrongs.size < choiceCount - 1) {
      const h = Math.floor(Math.random() * 12) + 1
      let m
      if (campoLevel <= 3) m = 0
      else if (campoLevel <= 4) m = [0, 30][Math.floor(Math.random() * 2)]
      else if (campoLevel <= 5) m = [0, 15, 30, 45][Math.floor(Math.random() * 4)]
      else if (campoLevel <= 7) m = Math.floor(Math.random() * 12) * 5
      else m = Math.floor(Math.random() * 60)
      const d = `${h}:${m.toString().padStart(2, '0')}`
      if (d !== correct) wrongs.add(d)
    }
    const all = [correct, ...wrongs]
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[all[i], all[j]] = [all[j], all[i]]
    }
    return all
  }, [problem, choiceCount, campoLevel])

  const handleAnswer = useCallback(
    (ans) => {
      registerClick()
      if (ans === problem.display) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [problem, registerClick, registerSuccess, registerError]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    const next = round + 1
    setRound(next)
    updateCampoProgress('campo2', next + 10)
    if (next >= TOTAL) {
      completeActivity('clock-reader', score >= 5 ? 3 : score >= 3 ? 2 : 1)
    }
  }, [round, score, completeActivity, updateCampoProgress])

  const finalStars = score >= 5 ? 3 : score >= 3 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Hora do Jogo" backPath="/campo/2" color="var(--color-campo2)">
        <CompletionCelebration
          emoji="⏰"
          title={`Acertaste ${score} de ${TOTAL}!`}
          score={score}
          total={TOTAL}
          stars={finalStars}
          color="var(--color-campo2)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Hora do Jogo"
      instruction={problem.context}
      backPath="/campo/2"
      color="var(--color-campo2)"
      score={score}
      total={TOTAL}
      textLevel={adaptive?.textLevel}
    >
      <ClockFace hours={problem.hours} minutes={problem.minutes} />

      <div style={styles.optionsGrid}>
        {options.map((opt) => (
          <button
            key={opt}
            className="btn-press"
            style={styles.optionBtn}
            onClick={() => handleAnswer(opt)}
            disabled={feedback !== null}
          >
            {opt}
          </button>
        ))}
      </div>

      <FeedbackMessage
        type={feedback}
        visible={feedback !== null}
        onDismiss={feedback === 'success' ? handleNext : () => setFeedback(null)}
        universe={adaptive?.universe}
      />
    </ActivityShell>
  )
}

const styles = {
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-md)',
  },
  optionBtn: {
    padding: 'var(--space-lg)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    cursor: 'pointer',
    textAlign: 'center',
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
