import { useState, useCallback, useMemo } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import { useTTS } from '../../hooks/useTTS'
import { getContent } from '../../data/universeContent'

const numberToWord = (n) => {
  const words = ['zero', 'one', 'two', 'three', 'four', 'five']
  return words[n] || String(n)
}

export default function ReadScore({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  adaptive,
}) {
  const content = getContent(adaptive?.universe?.id)
  const readContent = content.read
  const MATCHES = readContent.items.map(m => ({
    home: m.home, away: m.away, homeGoals: m.homeScore, awayGoals: m.awayScore
  }))

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

  if (isComplete) {
    return (
      <ActivityShell title={readContent.title} backPath="/campo/1" color="var(--color-campo1)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>📊</span>
          <p style={styles.completeText}>{readContent.completeText}</p>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title={readContent.title}
      instruction="Le o resultado em ingles e escolhe a opcao correcta."
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

      <p style={styles.prompt}>Como se le este resultado em ingles?</p>

      <div style={styles.optionsList}>
        {options.map((opt, i) => (
          <button
            key={i}
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
