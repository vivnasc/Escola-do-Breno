import { useState, useCallback, useMemo, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const COUNTRIES = [
  { name: 'Brasil', flag: '🇧🇷', continent: 'America do Sul', capital: 'Brasilia' },
  { name: 'Espanha', flag: '🇪🇸', continent: 'Europa', capital: 'Madrid' },
  { name: 'Argentina', flag: '🇦🇷', continent: 'America do Sul', capital: 'Buenos Aires' },
  { name: 'Franca', flag: '🇫🇷', continent: 'Europa', capital: 'Paris' },
  { name: 'Japao', flag: '🇯🇵', continent: 'Asia', capital: 'Toquio' },
  { name: 'Egipto', flag: '🇪🇬', continent: 'Africa', capital: 'Cairo' },
  { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', continent: 'Europa', capital: 'Londres' },
  { name: 'Australia', flag: '🇦🇺', continent: 'Oceania', capital: 'Canberra' },
  { name: 'Mexico', flag: '🇲🇽', continent: 'America do Norte', capital: 'Cidade do Mexico' },
  { name: 'Africa do Sul', flag: '🇿🇦', continent: 'Africa', capital: 'Pretoria' },
  { name: 'Mocambique', flag: '🇲🇿', continent: 'Africa', capital: 'Maputo' },
  { name: 'Portugal', flag: '🇵🇹', continent: 'Europa', capital: 'Lisboa' },
  { name: 'Alemanha', flag: '🇩🇪', continent: 'Europa', capital: 'Berlim' },
  { name: 'Italia', flag: '🇮🇹', continent: 'Europa', capital: 'Roma' },
  { name: 'China', flag: '🇨🇳', continent: 'Asia', capital: 'Pequim' },
  { name: 'India', flag: '🇮🇳', continent: 'Asia', capital: 'Nova Deli' },
  { name: 'Nigeria', flag: '🇳🇬', continent: 'Africa', capital: 'Abuja' },
  { name: 'Canada', flag: '🇨🇦', continent: 'America do Norte', capital: 'Otava' },
  { name: 'Colombia', flag: '🇨🇴', continent: 'America do Sul', capital: 'Bogota' },
  { name: 'Coreia do Sul', flag: '🇰🇷', continent: 'Asia', capital: 'Seul' },
  { name: 'Tailandia', flag: '🇹🇭', continent: 'Asia', capital: 'Banguecoque' },
  { name: 'Suecia', flag: '🇸🇪', continent: 'Europa', capital: 'Estocolmo' },
  { name: 'Quenia', flag: '🇰🇪', continent: 'Africa', capital: 'Nairobi' },
  { name: 'Peru', flag: '🇵🇪', continent: 'America do Sul', capital: 'Lima' },
  { name: 'Turquia', flag: '🇹🇷', continent: 'Europa/Asia', capital: 'Ancara' },
  { name: 'Grecia', flag: '🇬🇷', continent: 'Europa', capital: 'Atenas' },
  { name: 'Marrocos', flag: '🇲🇦', continent: 'Africa', capital: 'Rabat' },
  { name: 'Nova Zelandia', flag: '🇳🇿', continent: 'Oceania', capital: 'Wellington' },
  { name: 'Chile', flag: '🇨🇱', continent: 'America do Sul', capital: 'Santiago' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function FlagMatch({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const choiceCount = adaptive?.choiceCount || 4
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const country = COUNTRIES[idx]
  const isComplete = idx >= COUNTRIES.length

  useEffect(() => {
    if (!isComplete) {
      speak(`De que pais e esta bandeira? Pista: fica no continente ${country.continent}.`)
    }
  }, [idx])

  const options = useMemo(() => {
    if (!country) return []
    const others = COUNTRIES.filter((c) => c.name !== country.name)
    const distractors = shuffle(others).slice(0, choiceCount - 1)
    return shuffle([country, ...distractors])
  }, [country])

  const handleAnswer = useCallback(
    (ans) => {
      registerClick()
      if (ans.name === country.name) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [country, registerClick, registerSuccess, registerError]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    const next = idx + 1
    setIdx(next)
    updateCampoProgress('campo3', next)
    if (next >= COUNTRIES.length) {
      completeActivity('flag-match', score >= 24 ? 3 : score >= 16 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  const finalStars = score >= 24 ? 3 : score >= 16 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Bandeiras do Mundo" backPath="/campo/3" color="var(--color-campo3)">
        <CompletionCelebration
          emoji="🌍"
          title="Conheces as bandeiras do mundo!"
          score={score}
          total={COUNTRIES.length}
          stars={finalStars}
          color="var(--color-campo3)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Bandeiras do Mundo"
      instruction={`De que pais e esta bandeira?`}
      backPath="/campo/3"
      color="var(--color-campo3)"
      score={score}
      total={COUNTRIES.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.flagDisplay}>
        <span style={styles.flag}>{country.flag}</span>
        <span style={styles.continent}>{country.continent}</span>
      </div>

      <div style={styles.optionsGrid}>
        {options.map((opt) => (
          <button
            key={opt.name}
            className="btn-press"
            style={styles.optionBtn}
            onClick={() => handleAnswer(opt)}
            disabled={feedback !== null}
          >
            {opt.name}
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
  flagDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-xl)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-lg)',
  },
  flag: {
    fontSize: '6rem',
  },
  continent: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontStyle: 'italic',
  },
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
    fontSize: 'var(--font-size-base)',
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
