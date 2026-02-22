import { useState, useCallback, useMemo, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import { useTTS } from '../../hooks/useTTS'

const SCENARIOS = [
  {
    city: 'Rio de Janeiro',
    temp: 32,
    weather: 'Sol',
    weatherEmoji: '☀️',
    correctKit: 'leve',
    options: [
      { id: 'leve', label: 'Equipamento leve + agua extra', emoji: '👕💧' },
      { id: 'pesado', label: 'Casaco grosso + gorro', emoji: '🧥🧢' },
      { id: 'chuva', label: 'Impermeavel + botas de chuva', emoji: '🧥🥾' },
    ],
  },
  {
    city: 'Londres',
    temp: 8,
    weather: 'Chuva',
    weatherEmoji: '🌧️',
    correctKit: 'chuva',
    options: [
      { id: 'leve', label: 'T-shirt e calcoes', emoji: '👕🩳' },
      { id: 'chuva', label: 'Casaco impermeavel + luvas', emoji: '🧥🧤' },
      { id: 'praia', label: 'Fato de banho', emoji: '🩱' },
    ],
  },
  {
    city: 'Moscovo',
    temp: -5,
    weather: 'Neve',
    weatherEmoji: '❄️',
    correctKit: 'pesado',
    options: [
      { id: 'leve', label: 'T-shirt e chinelos', emoji: '👕🩴' },
      { id: 'pesado', label: 'Casaco quente, gorro, luvas, cachecol', emoji: '🧥🧤🧣' },
      { id: 'normal', label: 'Camisola manga curta', emoji: '👕' },
    ],
  },
  {
    city: 'Barcelona',
    temp: 28,
    weather: 'Sol com nuvens',
    weatherEmoji: '⛅',
    correctKit: 'leve',
    options: [
      { id: 'leve', label: 'Roupa leve e protector solar', emoji: '👕🧴' },
      { id: 'pesado', label: 'Casaco de inverno', emoji: '🧥' },
      { id: 'neve', label: 'Roupa para neve', emoji: '⛷️' },
    ],
  },
  {
    city: 'Doha',
    temp: 42,
    weather: 'Muito quente',
    weatherEmoji: '🔥',
    correctKit: 'extra-leve',
    options: [
      { id: 'extra-leve', label: 'Roupa muito leve + muita agua + chapeu', emoji: '👕💧🧢' },
      { id: 'pesado', label: 'Casaco e calcas compridas', emoji: '🧥👖' },
      { id: 'normal', label: 'Roupa normal', emoji: '👔' },
    ],
  },
]

export default function WeatherMatch({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const scenario = SCENARIOS[idx]
  const isComplete = idx >= SCENARIOS.length

  useEffect(() => {
    if (!isComplete) {
      speak(`Vai haver jogo em ${scenario.city}. A temperatura e ${scenario.temp} graus. ${scenario.weather}. Como te deves vestir?`)
    }
  }, [idx])

  const handleAnswer = useCallback(
    (optId) => {
      registerClick()
      if (optId === scenario.correctKit) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [scenario, registerClick, registerSuccess, registerError]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    const next = idx + 1
    setIdx(next)
    updateCampoProgress('campo3', next + 14)
    if (next >= SCENARIOS.length) {
      completeActivity('weather-match', score >= 4 ? 3 : score >= 2 ? 2 : 1)
    }
  }, [idx, score, completeActivity, updateCampoProgress])

  if (isComplete) {
    return (
      <ActivityShell title="Tempo no Estadio" backPath="/campo/3" color="var(--color-campo3)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>🌤️</span>
          <p style={styles.completeText}>Acertaste {score} de {SCENARIOS.length}!</p>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Tempo no Estadio"
      instruction={`Vai haver jogo em ${scenario.city}. Como te deves vestir?`}
      backPath="/campo/3"
      color="var(--color-campo3)"
      score={score}
      total={SCENARIOS.length}
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.weatherCard}>
        <span style={styles.weatherEmoji}>{scenario.weatherEmoji}</span>
        <div style={styles.weatherInfo}>
          <span style={styles.cityName}>{scenario.city}</span>
          <span style={styles.tempText}>{scenario.temp}°C</span>
          <span style={styles.weatherText}>{scenario.weather}</span>
        </div>
      </div>

      <div style={styles.thermometer}>
        <div
          style={{
            ...styles.thermometerFill,
            height: `${Math.max(5, Math.min(100, ((scenario.temp + 10) / 55) * 100))}%`,
            backgroundColor:
              scenario.temp > 30 ? '#F44336' : scenario.temp > 15 ? '#FF9800' : '#2196F3',
          }}
        />
      </div>

      <div style={styles.optionsList}>
        {scenario.options.map((opt) => (
          <button
            key={opt.id}
            style={styles.optionBtn}
            onClick={() => handleAnswer(opt.id)}
            disabled={feedback !== null}
          >
            <span style={styles.optionEmoji}>{opt.emoji}</span>
            <span>{opt.label}</span>
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
  weatherCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-lg)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo3)',
  },
  weatherEmoji: { fontSize: '3rem' },
  weatherInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  cityName: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
  },
  tempText: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
    color: 'var(--color-campo3)',
  },
  weatherText: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  thermometer: {
    width: '30px',
    height: '120px',
    backgroundColor: '#E0E0E0',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  thermometerFill: {
    width: '100%',
    borderRadius: 'var(--radius-full)',
    transition: 'height var(--transition-slow)',
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
  optionEmoji: { fontSize: '1.5rem' },
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
