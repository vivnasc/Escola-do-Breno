import { useState, useCallback, useMemo, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import OptionCard from '../../components/OptionCard'
import { useTTS } from '../../hooks/useTTS'

// Each country has a minLevel — included when campoLevel >= minLevel
const COUNTRIES = [
  // L1-2: Very well-known countries (basic awareness)
  { name: 'Brasil', code: 'br', continent: 'América do Sul', capital: 'Brasília', minLevel: 1 },
  { name: 'Portugal', code: 'pt', continent: 'Europa', capital: 'Lisboa', minLevel: 1 },
  { name: 'Inglaterra', code: 'gb-eng', continent: 'Europa', capital: 'Londres', minLevel: 1 },
  { name: 'França', code: 'fr', continent: 'Europa', capital: 'Paris', minLevel: 2 },
  { name: 'Espanha', code: 'es', continent: 'Europa', capital: 'Madrid', minLevel: 2 },
  // L3: Identifica 8-10 países e bandeiras
  { name: 'Argentina', code: 'ar', continent: 'América do Sul', capital: 'Buenos Aires', minLevel: 3 },
  { name: 'Alemanha', code: 'de', continent: 'Europa', capital: 'Berlim', minLevel: 3 },
  { name: 'Itália', code: 'it', continent: 'Europa', capital: 'Roma', minLevel: 3 },
  { name: 'México', code: 'mx', continent: 'América do Norte', capital: 'Cidade do México', minLevel: 3 },
  { name: 'Japão', code: 'jp', continent: 'Ásia', capital: 'Tóquio', minLevel: 3 },
  // L4: Conhece os 6 continentes — countries spread across continents
  { name: 'Egipto', code: 'eg', continent: 'África', capital: 'Cairo', minLevel: 4 },
  { name: 'Austrália', code: 'au', continent: 'Oceânia', capital: 'Canberra', minLevel: 4 },
  { name: 'China', code: 'cn', continent: 'Ásia', capital: 'Pequim', minLevel: 4 },
  { name: 'África do Sul', code: 'za', continent: 'África', capital: 'Pretória', minLevel: 4 },
  { name: 'Índia', code: 'in', continent: 'Ásia', capital: 'Nova Déli', minLevel: 4 },
  // L5: Localiza países nos continentes
  { name: 'Moçambique', code: 'mz', continent: 'África', capital: 'Maputo', minLevel: 5 },
  { name: 'Canadá', code: 'ca', continent: 'América do Norte', capital: 'Otava', minLevel: 5 },
  { name: 'Colômbia', code: 'co', continent: 'América do Sul', capital: 'Bogotá', minLevel: 5 },
  { name: 'Coreia do Sul', code: 'kr', continent: 'Ásia', capital: 'Seul', minLevel: 5 },
  // L6: Relaciona clima e geografia
  { name: 'Nigéria', code: 'ng', continent: 'África', capital: 'Abuja', minLevel: 6 },
  { name: 'Suécia', code: 'se', continent: 'Europa', capital: 'Estocolmo', minLevel: 6 },
  { name: 'Peru', code: 'pe', continent: 'América do Sul', capital: 'Lima', minLevel: 6 },
  // L7: Compara culturas e costumes
  { name: 'Tailândia', code: 'th', continent: 'Ásia', capital: 'Banguecoque', minLevel: 7 },
  { name: 'Quénia', code: 'ke', continent: 'África', capital: 'Nairobi', minLevel: 7 },
  { name: 'Turquia', code: 'tr', continent: 'Europa/Ásia', capital: 'Ancara', minLevel: 7 },
  { name: 'Grécia', code: 'gr', continent: 'Europa', capital: 'Atenas', minLevel: 7 },
  // L8+: Compreende relações entre regiões
  { name: 'Marrocos', code: 'ma', continent: 'África', capital: 'Rabat', minLevel: 8 },
  { name: 'Nova Zelândia', code: 'nz', continent: 'Oceânia', capital: 'Wellington', minLevel: 8 },
  { name: 'Chile', code: 'cl', continent: 'América do Sul', capital: 'Santiago', minLevel: 8 },
]

function getFlagUrl(code) {
  return `https://flagcdn.com/w160/${code}.png`
}

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
  const campoLevel = adaptive?.campoLevel?.campo3 || 1
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  // Filter countries by competency level — only include countries up to current level
  const levelCountries = useMemo(() => {
    return COUNTRIES.filter((c) => c.minLevel <= campoLevel)
  }, [campoLevel])

  const country = levelCountries[idx]
  const isComplete = idx >= levelCountries.length

  // Show continent hint at lower levels (L1-5), hide at higher levels for more challenge
  const showContinentHint = campoLevel <= 5

  useEffect(() => {
    if (!isComplete && country) {
      const hint = showContinentHint
        ? `De que país é esta bandeira? Pista: fica no continente ${country.continent}.`
        : `De que país é esta bandeira?`
      speak(hint, { auto: true })
    }
  }, [idx, levelCountries])

  const options = useMemo(() => {
    if (!country) return []
    // Distractors come from the same level-filtered pool
    const others = levelCountries.filter((c) => c.name !== country.name)
    const distractors = shuffle(others).slice(0, choiceCount - 1)
    return shuffle([country, ...distractors])
  }, [country, levelCountries, choiceCount])

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

  const total = levelCountries.length

  const handleNext = useCallback(() => {
    setFeedback(null)
    const next = idx + 1
    setIdx(next)
    updateCampoProgress('campo3', next)
    if (next >= total) {
      const pct = (score + 1) / total
      completeActivity('flag-match', pct >= 0.8 ? 3 : pct >= 0.55 ? 2 : 1)
    }
  }, [idx, score, total, completeActivity, updateCampoProgress])

  const pct = total > 0 ? score / total : 0
  const finalStars = pct >= 0.8 ? 3 : pct >= 0.55 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Bandeiras do Mundo" backPath="/campo/3" color="var(--color-campo3)">
        <CompletionCelebration
          emoji="🌍"
          title="Conheces as bandeiras do mundo!"
          score={score}
          total={total}
          stars={finalStars}
          color="var(--color-campo3)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Bandeiras do Mundo"
      instruction={`De que país é esta bandeira?`}
      backPath="/campo/3"
      color="var(--color-campo3)"
      score={score}
      total={total}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.flagDisplay}>
        <img
          src={getFlagUrl(country.code)}
          alt={`Bandeira de ${country.name}`}
          style={styles.flagImg}
          width={120}
          draggable={false}
        />
        {showContinentHint && (
          <span style={styles.continent}>{country.continent}</span>
        )}
      </div>

      <div style={styles.optionsGrid}>
        {options.map((opt) => (
          <OptionCard
            key={opt.name}
            onClick={() => handleAnswer(opt)}
            disabled={feedback !== null}
            color="var(--color-campo3)"
            state={
              feedback === 'success' && opt.name === country.name ? 'correct' : null
            }
            style={{ padding: 'var(--space-lg)', fontSize: 'var(--font-size-base)', fontWeight: 700, textAlign: 'center' }}
          >
            {opt.name}
          </OptionCard>
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
  flagImg: {
    width: 120,
    height: 'auto',
    borderRadius: 'var(--radius-sm)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    userSelect: 'none',
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
