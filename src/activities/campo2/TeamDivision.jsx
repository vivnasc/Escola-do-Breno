import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { getContent } from '../../data/universeContent'
import { useTTS } from '../../hooks/useTTS'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Group colors for visual distinction between groups
const GROUP_COLORS = [
  { bg: '#E3F2FD', border: '#1565C0' },
  { bg: '#FFF3E0', border: '#E65100' },
  { bg: '#E8F5E9', border: '#2E7D32' },
  { bg: '#F3E5F5', border: '#6A1B9A' },
  { bg: '#FFF8E1', border: '#F9A825' },
  { bg: '#E0F7FA', border: '#00838F' },
  { bg: '#FCE4EC', border: '#C62828' },
]

// Emoji for items based on universe (fallback to person)
function getItemEmoji(universeId) {
  switch (universeId) {
    case 'football': return '🧑'
    case 'dinosaurs': return '🦕'
    case 'space': return '🧑‍🚀'
    case 'animals': return '🐾'
    case 'music': return '🎵'
    default: return '🧑'
  }
}

/**
 * Classify problems by difficulty tier:
 * - easy:   small totals (<=8), divisor 2, result <=4
 * - medium: totals 9-16, divisors 2-5
 * - hard:   totals 17+, any divisor
 */
function classifyProblem(p) {
  if (p.total <= 8 && p.groups <= 2) return 'easy'
  if (p.total <= 16 && p.groups <= 5) return 'medium'
  return 'hard'
}

/**
 * Generate problems appropriate for the adaptive difficulty level.
 * Level 1-2: easy problems only (small numbers, groups of 2)
 * Level 3-4: mix of easy and medium
 * Level 5+:  all difficulties
 */
function getProblemsForDifficulty(allProblems, difficulty) {
  const easy = allProblems.filter(p => classifyProblem(p) === 'easy')
  const medium = allProblems.filter(p => classifyProblem(p) === 'medium')
  const hard = allProblems.filter(p => classifyProblem(p) === 'hard')

  if (difficulty <= 1) {
    // Level 1-2: only easy. If not enough, generate some.
    const pool = easy.length >= 4 ? easy : [...easy, ...medium.slice(0, 4 - easy.length)]
    return pool.length > 0 ? pool : allProblems.slice(0, 4)
  }
  if (difficulty <= 2) {
    // Level 3-4: easy + medium
    return [...easy, ...medium].length > 0 ? [...easy, ...medium] : allProblems
  }
  // Level 5+: everything
  return allProblems
}

/**
 * Teaching phases for each round:
 * 1. 'showing'   - Visual: show all items ungrouped, then animate into groups
 * 2. 'grouped'   - Visual: items are now in groups, child observes
 * 3. 'asking'    - Question: "Quantos ficam em cada grupo?"
 * 4. 'notation'  - After correct answer, show the math notation
 */
const PHASES = {
  SHOWING: 'showing',
  GROUPED: 'grouped',
  ASKING: 'asking',
  NOTATION: 'notation',
}

const TOTAL_ROUNDS = 8

export default function TeamDivision({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const content = getContent(adaptive?.universe?.id)
  const choiceCount = adaptive?.choiceCount || 4
  const difficulty = adaptive?.campoDifficulty?.campo2 || adaptive?.difficulty || 1
  const { speak } = useTTS()
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [phase, setPhase] = useState(PHASES.SHOWING)
  const phaseTimerRef = useRef(null)

  // Whether to show full visual scaffolding
  const showFullVisual = difficulty <= 2
  const showGroupedVisual = difficulty <= 3

  // Get difficulty-appropriate problems, shuffled
  const problems = useMemo(() => {
    const pool = getProblemsForDifficulty(content.division, difficulty)
    return shuffle(pool)
  }, [content.division, difficulty])

  // Current problem (cycle through pool)
  const problem = useMemo(
    () => problems[round % problems.length],
    [problems, round]
  )
  const answer = problem.total / problem.groups
  const itemEmoji = getItemEmoji(adaptive?.universe?.id)

  // Build the groups array for visualization
  const groups = useMemo(() => {
    const result = []
    for (let g = 0; g < problem.groups; g++) {
      const items = []
      for (let i = 0; i < answer; i++) {
        items.push(itemEmoji)
      }
      result.push(items)
    }
    return result
  }, [problem, answer, itemEmoji])

  // Phase progression with timers
  useEffect(() => {
    if (round >= TOTAL_ROUNDS) return

    // Clear any existing timer
    if (phaseTimerRef.current) {
      clearTimeout(phaseTimerRef.current)
    }

    // Reset to showing phase for new round
    setPhase(PHASES.SHOWING)

    if (showFullVisual) {
      // Full teaching flow: show ungrouped -> grouped -> ask
      speak(problem.context, { auto: true })
      phaseTimerRef.current = setTimeout(() => {
        setPhase(PHASES.GROUPED)
        speak(`Olha! Dividimos em ${problem.groups} grupos iguais.`, { auto: true })
        phaseTimerRef.current = setTimeout(() => {
          setPhase(PHASES.ASKING)
          speak('Quantos ficam em cada grupo?', { auto: true })
        }, 2500)
      }, 2200)
    } else if (showGroupedVisual) {
      // Medium scaffolding: show grouped directly -> ask
      speak(problem.context, { auto: true })
      phaseTimerRef.current = setTimeout(() => {
        setPhase(PHASES.GROUPED)
        phaseTimerRef.current = setTimeout(() => {
          setPhase(PHASES.ASKING)
          speak('Quantos ficam em cada grupo?', { auto: true })
        }, 1800)
      }, 1500)
    } else {
      // Minimal scaffolding: show briefly then ask
      speak(`${problem.context} Quantos ficam em cada grupo?`, { auto: true })
      phaseTimerRef.current = setTimeout(() => {
        setPhase(PHASES.ASKING)
      }, 800)
    }

    return () => {
      if (phaseTimerRef.current) {
        clearTimeout(phaseTimerRef.current)
      }
    }
  }, [round]) // eslint-disable-line react-hooks/exhaustive-deps

  // Generate answer options
  const options = useMemo(() => {
    const opts = new Set([answer])
    while (opts.size < choiceCount) {
      const offset = Math.floor(Math.random() * 5) - 2
      const o = answer + offset
      if (o > 0) opts.add(o)
    }
    const arr = [...opts]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [answer, choiceCount])

  const handleAnswer = useCallback(
    (ans) => {
      registerClick()
      if (ans === answer) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
        // Show the math notation phase briefly
        setPhase(PHASES.NOTATION)
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [answer, registerClick, registerSuccess, registerError]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    const next = round + 1
    setRound(next)
    updateCampoProgress('campo2', next + 16)
    if (next >= TOTAL_ROUNDS) {
      completeActivity('team-division', score >= 6 ? 3 : score >= 4 ? 2 : 1)
    }
  }, [round, score, completeActivity, updateCampoProgress])

  const handleSkipToQuestion = useCallback(() => {
    if (phaseTimerRef.current) {
      clearTimeout(phaseTimerRef.current)
    }
    setPhase(PHASES.ASKING)
  }, [])

  const finalStars = score >= 6 ? 3 : score >= 4 ? 2 : 1

  if (round >= TOTAL_ROUNDS) {
    return (
      <ActivityShell title="Divide a Equipa" backPath="/campo/2" color="var(--color-campo2)">
        <CompletionCelebration
          emoji="👥"
          title={`Dividiste ${score} de ${TOTAL_ROUNDS} correctamente!`}
          score={score}
          total={TOTAL_ROUNDS}
          stars={finalStars}
          color="var(--color-campo2)"
        />
      </ActivityShell>
    )
  }

  // --- Render the visual teaching area ---
  const isTeachingPhase = phase === PHASES.SHOWING || phase === PHASES.GROUPED
  const isAskingPhase = phase === PHASES.ASKING || phase === PHASES.NOTATION
  const showNotation = phase === PHASES.NOTATION

  return (
    <ActivityShell
      title="Divide a Equipa"
      instruction={problem.context}
      backPath="/campo/2"
      color="var(--color-campo2)"
      score={score}
      total={TOTAL_ROUNDS}
      textLevel={adaptive?.textLevel}
    >
      {/* Context banner */}
      <div style={styles.contextBanner}>
        <span style={styles.contextIcon}>📋</span>
        <span style={styles.contextLabel}>{problem.context}</span>
      </div>

      {/* PHASE 1: Showing - all items ungrouped */}
      {phase === PHASES.SHOWING && showFullVisual && (
        <div style={styles.teachingCard}>
          <p style={styles.teachingLabel}>
            Temos <strong>{problem.total}</strong> {itemEmoji}
          </p>
          <div style={styles.ungroupedItems}>
            {Array.from({ length: Math.min(problem.total, 24) }).map((_, i) => (
              <span
                key={i}
                style={{
                  ...styles.itemEmoji,
                  animationDelay: `${i * 60}ms`,
                }}
                className="animate-scale-in"
              >
                {itemEmoji}
              </span>
            ))}
          </div>
          <p style={styles.teachingHint}>
            Vamos dividir por <strong>{problem.groups}</strong> grupos...
          </p>
        </div>
      )}

      {/* PHASE 2: Grouped - items split into colored groups */}
      {(phase === PHASES.GROUPED || (isAskingPhase && (showFullVisual || showGroupedVisual))) && (
        <div style={styles.teachingCard}>
          <p style={styles.teachingLabel}>
            <strong>{problem.total}</strong> {itemEmoji} divididos em{' '}
            <strong>{problem.groups}</strong> grupos:
          </p>
          <div style={styles.groupsContainer}>
            {groups.map((groupItems, gi) => {
              const color = GROUP_COLORS[gi % GROUP_COLORS.length]
              return (
                <div
                  key={gi}
                  style={{
                    ...styles.groupBox,
                    backgroundColor: color.bg,
                    borderColor: color.border,
                    animationDelay: `${gi * 150}ms`,
                  }}
                  className="animate-scale-in"
                >
                  <div style={styles.groupLabel}>
                    <span
                      style={{
                        ...styles.groupLabelDot,
                        backgroundColor: color.border,
                      }}
                    />
                    Grupo {gi + 1}
                  </div>
                  <div style={styles.groupItems}>
                    {groupItems.map((emoji, ei) => (
                      <span key={ei} style={styles.groupItemEmoji}>
                        {emoji}
                      </span>
                    ))}
                  </div>
                  {isAskingPhase && (
                    <div style={{
                      ...styles.groupCount,
                      color: color.border,
                    }}>
                      ?
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Divider arrows between groups for clarity */}
          {phase === PHASES.GROUPED && !isAskingPhase && (
            <p style={styles.teachingHint}>
              Cada grupo ficou com quantos?
            </p>
          )}
        </div>
      )}

      {/* For high difficulty: minimal visual - just the problem */}
      {phase === PHASES.ASKING && !showFullVisual && !showGroupedVisual && (
        <div style={styles.teachingCard}>
          <div style={styles.minimalVisual}>
            <span style={styles.minimalTotal}>{problem.total}</span>
            <span style={styles.minimalOperator}>÷</span>
            <span style={styles.minimalGroups}>{problem.groups}</span>
            <span style={styles.minimalEquals}>=</span>
            <span style={styles.minimalQuestion}>?</span>
          </div>
        </div>
      )}

      {/* Skip button during teaching phases */}
      {isTeachingPhase && (
        <button
          style={styles.skipBtn}
          onClick={handleSkipToQuestion}
          className="btn-press"
        >
          Ja percebi! Responder →
        </button>
      )}

      {/* PHASE 3: Asking - show the answer options */}
      {isAskingPhase && (
        <>
          <div style={styles.questionBar}>
            <span style={styles.questionIcon}>❓</span>
            <span style={styles.questionText}>Quantos ficam em cada grupo?</span>
          </div>

          <div style={styles.optionsGrid}>
            {options.map((opt) => (
              <button
                key={opt}
                className="btn-press"
                style={styles.optionBtn}
                onClick={() => handleAnswer(opt)}
                disabled={feedback !== null}
              >
                <span style={styles.optionNumber}>{opt}</span>
                {showFullVisual && (
                  <span style={styles.optionVisual}>
                    {Array.from({ length: Math.min(opt, 10) }).map((_, i) => (
                      <span key={i} style={styles.optionEmoji}>{itemEmoji}</span>
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}

      {/* PHASE 4: Notation - show the complete math statement */}
      {showNotation && (
        <div style={styles.notationCard} className="animate-scale-in">
          <div style={styles.notationContent}>
            <span style={styles.notationPart}>{problem.total}</span>
            <span style={styles.notationOperator}>÷</span>
            <span style={styles.notationPart}>{problem.groups}</span>
            <span style={styles.notationOperator}>=</span>
            <span style={styles.notationAnswer}>{answer}</span>
          </div>
          <p style={styles.notationLabel}>
            {problem.total} a dividir por {problem.groups} e igual a {answer}
          </p>
        </div>
      )}

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
  contextBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: '#FFF8E1',
    borderRadius: 'var(--radius-md)',
    border: '1px solid #FFE082',
  },
  contextIcon: {
    fontSize: '1.3rem',
    flexShrink: 0,
  },
  contextLabel: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    lineHeight: 1.4,
  },

  // Teaching card
  teachingCard: {
    padding: 'var(--space-lg)',
    backgroundColor: '#FFF3E0',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo2)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  teachingLabel: {
    fontSize: 'var(--font-size-lg)',
    color: 'var(--color-text)',
    margin: 0,
  },
  teachingHint: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
    margin: 0,
    fontStyle: 'italic',
  },

  // Ungrouped items (phase 1)
  ungroupedItems: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '6px',
    padding: 'var(--space-md)',
  },
  itemEmoji: {
    fontSize: '1.6rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
  },

  // Grouped items (phase 2)
  groupsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-sm)',
  },
  groupBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: 'var(--space-sm) var(--space-md)',
    borderRadius: 'var(--radius-md)',
    border: '2.5px solid',
    minWidth: '70px',
    position: 'relative',
  },
  groupLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  groupLabelDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  groupItems: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2px',
    padding: '4px 0',
  },
  groupItemEmoji: {
    fontSize: '1.4rem',
  },
  groupCount: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 800,
    marginTop: '2px',
  },

  // Minimal visual for high difficulty
  minimalVisual: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
  },
  minimalTotal: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: 'var(--color-campo2)',
  },
  minimalOperator: {
    fontSize: '2rem',
    fontWeight: 700,
    color: 'var(--color-text-secondary)',
  },
  minimalGroups: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: 'var(--color-campo2)',
  },
  minimalEquals: {
    fontSize: '2rem',
    fontWeight: 700,
    color: 'var(--color-text-secondary)',
  },
  minimalQuestion: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: '#E65100',
    backgroundColor: '#FFF3E0',
    borderRadius: 'var(--radius-sm)',
    padding: '0 var(--space-md)',
    border: '2px dashed #E65100',
  },

  // Skip button
  skipBtn: {
    alignSelf: 'center',
    padding: 'var(--space-xs) var(--space-lg)',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-secondary)',
    fontSize: 'var(--font-size-sm)',
    cursor: 'pointer',
  },

  // Question bar
  questionBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-md)',
    border: '2px solid #66BB6A',
  },
  questionIcon: {
    fontSize: '1.5rem',
  },
  questionText: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: '#2E7D32',
  },

  // Answer options
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-md)',
  },
  optionBtn: {
    padding: 'var(--space-md) var(--space-lg)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  optionNumber: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  optionVisual: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1px',
    fontSize: '0.9rem',
  },
  optionEmoji: {
    fontSize: '0.9rem',
  },

  // Math notation (phase 4)
  notationCard: {
    padding: 'var(--space-md) var(--space-lg)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid #66BB6A',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  notationContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-md)',
  },
  notationPart: {
    fontSize: '2rem',
    fontWeight: 800,
    color: 'var(--color-campo2)',
  },
  notationOperator: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: 'var(--color-text-secondary)',
  },
  notationAnswer: {
    fontSize: '2.2rem',
    fontWeight: 800,
    color: '#2E7D32',
    backgroundColor: '#C8E6C9',
    borderRadius: 'var(--radius-sm)',
    padding: '2px var(--space-md)',
  },
  notationLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    margin: 0,
  },
}
