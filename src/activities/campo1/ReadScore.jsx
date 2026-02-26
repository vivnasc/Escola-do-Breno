import { useState, useCallback, useMemo } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'
import { getContent } from '../../data/universeContent'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const numberToWord = (n) => {
  const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  return words[n] || String(n)
}

/**
 * ReadScore: Reading English number words in context (match results).
 *
 * Tiered by campo1 level — matches competency milestones:
 *   L1-2: Only scores 0-2 (zero, one, two) — first number words
 *   L3:   Scores 0-3 — expanding number recognition
 *   L4-5: Scores 0-5 — "Reconhece 30+ palavras"
 *   L6-7: Scores 0-7 — larger vocabulary
 *   L8+:  Scores 0-9 — full range
 */
export default function ReadScore({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  adaptive,
}) {
  const content = getContent(adaptive?.universe?.id)
  const readContent = content.read
  const campoLevel = adaptive?.campoLevel?.campo1 || 1

  // Filter matches to level-appropriate score ranges
  const maxGoals = campoLevel <= 2 ? 2 : campoLevel <= 3 ? 3 : campoLevel <= 5 ? 5 : campoLevel <= 7 ? 7 : 9
  const MATCHES = useMemo(() => {
    const all = readContent.items.map(m => ({
      home: m.home, away: m.away, homeGoals: m.homeScore, awayGoals: m.awayScore
    }))
    // Filter to only matches with goals within level range
    const filtered = all.filter(m => m.homeGoals <= maxGoals && m.awayGoals <= maxGoals)
    // If not enough matches, clamp the goals from the full set
    if (filtered.length >= 4) return shuffle(filtered)
    return shuffle(all.map(m => ({
      ...m,
      homeGoals: Math.min(m.homeGoals, maxGoals),
      awayGoals: Math.min(m.awayGoals, maxGoals),
    })))
  }, [readContent.items, maxGoals])

  const [matchIdx, setMatchIdx] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const { speakEn } = useTTS()

  const match = MATCHES[matchIdx]
  const isComplete = matchIdx >= MATCHES.length

  const correctText = `${match?.home} ${numberToWord(match?.homeGoals)} ${match?.away} ${numberToWord(match?.awayGoals)}`

  const options = useMemo(() => {
    if (!match) return []
    const correct = correctText
    const wrong1 = `${match.home} ${numberToWord(match.awayGoals)} ${match.away} ${numberToWord(match.homeGoals)}`
    const wrong2 = `${match.home} ${numberToWord(match.homeGoals + 1)} ${match.away} ${numberToWord(match.awayGoals)}`
    const all = [correct, wrong1, wrong2]
    // Shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[all[i], all[j]] = [all[j], all[i]]
    }
    return all
  }, [match, correctText])

  const handleAnswer = useCallback(
    (answer) => {
      registerClick()
      if (answer === correctText) {
        registerSuccess()
        setFeedback('success')
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [correctText, registerClick, registerSuccess, registerError]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    const next = matchIdx + 1
    setMatchIdx(next)
    if (next >= MATCHES.length) {
      completeActivity('read-score', 3)
    }
  }, [matchIdx, completeActivity])

  const finalStars = 3

  if (isComplete) {
    return (
      <ActivityShell title={readContent.title} backPath="/campo/1" color="var(--color-campo1)">
        <CompletionCelebration
          emoji="📊"
          title={readContent.completeText}
          score={MATCHES.length}
          total={MATCHES.length}
          stars={finalStars}
          color="var(--color-campo1)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title={readContent.title}
      instruction="Lê o resultado em inglês e escolhe a opção correcta."
      backPath="/campo/1"
      color="var(--color-campo1)"
      score={matchIdx}
      total={MATCHES.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={{ ...styles.scoreBoard, backgroundColor: readContent.boardColor }}>
        <div style={styles.teamSide}>
          <span style={styles.teamName}>{match.home}</span>
        </div>
        <div style={styles.scoreDisplay}>
          <span style={styles.goalNumber}>{match.homeGoals}</span>
          <span style={styles.scoreSep}>-</span>
          <span style={styles.goalNumber}>{match.awayGoals}</span>
        </div>
        <div style={styles.teamSide}>
          <span style={styles.teamName}>{match.away}</span>
        </div>
      </div>

      <p style={styles.prompt}>Como se lê este resultado em inglês?</p>

      <div style={styles.optionsList}>
        {options.map((opt, i) => (
          <button
            key={i}
            className="btn-press"
            style={styles.optionBtn}
            onClick={() => {
              speakEn(opt)
              handleAnswer(opt)
            }}
            disabled={feedback !== null}
          >
            🔊 {opt}
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
  scoreBoard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-xl)',
    backgroundColor: '#1B5E20',
    borderRadius: 'var(--radius-lg)',
  },
  teamSide: {
    flex: 1,
    textAlign: 'center',
  },
  teamName: {
    color: 'white',
    fontWeight: 700,
    fontSize: 'var(--font-size-lg)',
  },
  scoreDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  goalNumber: {
    color: 'white',
    fontSize: 'var(--font-size-3xl)',
    fontWeight: 700,
  },
  scoreSep: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 'var(--font-size-xl)',
  },
  prompt: {
    textAlign: 'center',
    fontWeight: 600,
    color: 'var(--color-text)',
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
    textAlign: 'left',
    fontWeight: 600,
    fontSize: 'var(--font-size-base)',
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
