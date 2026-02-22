import { useState, useCallback, useMemo } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import { TEAMS } from '../../data/vocabulary'
import { useTTS } from '../../hooks/useTTS'

const COLOR_MAP = {
  red: '#CC0000',
  blue: '#1565C0',
  green: '#2E7D32',
  yellow: '#F9A825',
  white: '#FFFFFF',
  black: '#212121',
  orange: '#E65100',
}

const COLOR_OPTIONS = [
  { en: 'red', pt: 'vermelho', hex: '#CC0000' },
  { en: 'blue', pt: 'azul', hex: '#1565C0' },
  { en: 'green', pt: 'verde', hex: '#2E7D32' },
  { en: 'yellow', pt: 'amarelo', hex: '#F9A825' },
  { en: 'white', pt: 'branco', hex: '#FFFFFF' },
  { en: 'black', pt: 'preto', hex: '#212121' },
  { en: 'orange', pt: 'laranja', hex: '#E65100' },
]

export default function ColorKit({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  markWordLearned,
  adaptive,
}) {
  const [teamIdx, setTeamIdx] = useState(0)
  const [selectedColors, setSelectedColors] = useState([])
  const [feedback, setFeedback] = useState(null)
  const { speakEn } = useTTS()

  const team = TEAMS[teamIdx]
  const isComplete = teamIdx >= TEAMS.length

  const targetColors = useMemo(() => (team ? team.colors : []), [team])

  const handleColorPick = useCallback(
    (color) => {
      registerClick()
      if (targetColors.includes(color.en)) {
        if (!selectedColors.includes(color.en)) {
          const next = [...selectedColors, color.en]
          setSelectedColors(next)
          registerSuccess()
          // Mark colour words learned
          const colorWordIds = { red: 26, blue: 27, green: 28, yellow: 29, white: 30, black: 31, orange: 32 }
          if (colorWordIds[color.en]) markWordLearned(colorWordIds[color.en])

          if (next.length === targetColors.length) {
            setFeedback('success')
          }
        }
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [targetColors, selectedColors, registerClick, registerSuccess, registerError, markWordLearned]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    setSelectedColors([])
    const next = teamIdx + 1
    setTeamIdx(next)
    if (next >= TEAMS.length) {
      completeActivity('color-kit', 3)
    }
  }, [teamIdx, completeActivity])

  if (isComplete) {
    return (
      <ActivityShell title="Pinta o Equipamento" backPath="/campo/1" color="var(--color-campo1)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>🎨</span>
          <p style={styles.completeText}>Pintaste todos os equipamentos!</p>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Pinta o Equipamento"
      instruction={`Pinta o equipamento do ${team.name}. Escolhe as cores: ${targetColors.join(' and ')}.`}
      backPath="/campo/1"
      color="var(--color-campo1)"
      score={teamIdx}
      total={TEAMS.length}
    >
      <div style={styles.teamInfo}>
        <span style={styles.teamName}>{team.name}</span>
        <span style={styles.teamCountry}>{team.country}</span>
      </div>

      <div style={styles.kitPreview}>
        <div
          style={{
            ...styles.kitShirt,
            backgroundColor: selectedColors[0]
              ? COLOR_MAP[selectedColors[0]]
              : '#E0E0E0',
            border: selectedColors[0] === 'white' ? '2px solid #BDBDBD' : 'none',
          }}
        >
          👕
        </div>
        <div style={styles.kitColors}>
          {targetColors.map((c) => (
            <span
              key={c}
              style={{
                ...styles.targetDot,
                backgroundColor: COLOR_MAP[c],
                border: c === 'white' ? '2px solid #BDBDBD' : 'none',
                opacity: selectedColors.includes(c) ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      </div>

      <div style={styles.colorGrid}>
        {COLOR_OPTIONS.map((color) => (
          <button
            key={color.en}
            style={{
              ...styles.colorBtn,
              backgroundColor: color.hex,
              border: color.en === 'white' ? '2px solid #BDBDBD' : '2px solid transparent',
              color: ['white', 'yellow'].includes(color.en) ? '#333' : 'white',
            }}
            onClick={() => {
              speakEn(color.en)
              handleColorPick(color)
            }}
            disabled={feedback === 'success'}
          >
            {color.en}
          </button>
        ))}
      </div>

      <FeedbackMessage
        type={feedback}
        visible={feedback !== null}
        onDismiss={feedback === 'success' ? handleNext : () => setFeedback(null)}
      />
    </ActivityShell>
  )
}

const styles = {
  teamInfo: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  teamName: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  teamCountry: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  kitPreview: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
  },
  kitShirt: {
    fontSize: '4rem',
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-md)',
    transition: 'background-color var(--transition-slow)',
  },
  kitColors: {
    display: 'flex',
    gap: 'var(--space-sm)',
  },
  targetDot: {
    width: '24px',
    height: '24px',
    borderRadius: 'var(--radius-full)',
    transition: 'opacity var(--transition-speed)',
  },
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--space-sm)',
  },
  colorBtn: {
    padding: 'var(--space-md)',
    borderRadius: 'var(--radius-md)',
    fontWeight: 700,
    fontSize: 'var(--font-size-sm)',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '1px',
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
