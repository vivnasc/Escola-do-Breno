import { useState, useCallback, useMemo, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const SCENARIOS = [
  {
    city: 'Rio de Janeiro',
    temp: 32,
    weather: 'Sol',
    weatherEmoji: '☀️',
    correctKit: 'leve',
    minLevel: 1,
    options: [
      { id: 'leve', label: 'Equipamento leve + água extra', emoji: '👕💧' },
      { id: 'pesado', label: 'Casaco grosso + gorro', emoji: '🧥🧢' },
      { id: 'chuva', label: 'Impermeável + botas de chuva', emoji: '🧥🥾' },
    ],
  },
  {
    city: 'Londres',
    temp: 8,
    weather: 'Chuva',
    weatherEmoji: '🌧️',
    correctKit: 'chuva',
    minLevel: 2,
    options: [
      { id: 'leve', label: 'T-shirt e calções', emoji: '👕🩳' },
      { id: 'chuva', label: 'Casaco impermeável + luvas', emoji: '🧥🧤' },
      { id: 'praia', label: 'Fato de banho', emoji: '🩱' },
    ],
  },
  {
    city: 'Moscovo',
    temp: -5,
    weather: 'Neve',
    weatherEmoji: '❄️',
    correctKit: 'pesado',
    minLevel: 1,
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
    minLevel: 2,
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
    minLevel: 3,
    options: [
      { id: 'extra-leve', label: 'Roupa muito leve + muita água + chapéu', emoji: '👕💧🧢' },
      { id: 'pesado', label: 'Casaco e calças compridas', emoji: '🧥👖' },
      { id: 'normal', label: 'Roupa normal', emoji: '👔' },
    ],
  },
  {
    city: 'Tóquio',
    temp: 15,
    weather: 'Fresco e nublado',
    weatherEmoji: '🌥️',
    correctKit: 'normal',
    minLevel: 3,
    options: [
      { id: 'normal', label: 'Camisola manga comprida e calças', emoji: '👔👖' },
      { id: 'pesado', label: 'Casaco de inverno e gorro', emoji: '🧥🧢' },
      { id: 'leve', label: 'T-shirt e calções', emoji: '👕🩳' },
    ],
  },
  {
    city: 'Cairo',
    temp: 38,
    weather: 'Quente e seco',
    weatherEmoji: '🌞',
    correctKit: 'deserto',
    minLevel: 4,
    options: [
      { id: 'deserto', label: 'Roupa leve, chapéu e muita água', emoji: '👕🧢💧' },
      { id: 'chuva', label: 'Casaco impermeável', emoji: '🧥' },
      { id: 'pesado', label: 'Casaco grosso', emoji: '🧥🧣' },
    ],
  },
  {
    city: 'Maputo',
    temp: 28,
    weather: 'Quente e húmido',
    weatherEmoji: '🌤️',
    correctKit: 'tropical',
    minLevel: 4,
    options: [
      { id: 'tropical', label: 'Roupa leve de algodão e água', emoji: '👕💧' },
      { id: 'neve', label: 'Roupa para neve', emoji: '⛷️' },
      { id: 'pesado', label: 'Casaco comprido', emoji: '🧥' },
    ],
  },
  {
    city: 'Reiquiavique',
    temp: 2,
    weather: 'Frio e vento',
    weatherEmoji: '🌬️',
    correctKit: 'vento',
    minLevel: 5,
    options: [
      { id: 'vento', label: 'Casaco corta-vento, gorro e luvas', emoji: '🧥🧤🧢' },
      { id: 'leve', label: 'T-shirt e chinelos', emoji: '👕🩴' },
      { id: 'normal', label: 'Camisa manga curta', emoji: '👔' },
    ],
  },
  {
    city: 'Mumbai',
    temp: 30,
    weather: 'Chuva de monção',
    weatherEmoji: '⛈️',
    correctKit: 'moncao',
    minLevel: 6,
    options: [
      { id: 'moncao', label: 'Impermeável e sandália resistente a água', emoji: '🧥🩴' },
      { id: 'neve', label: 'Roupa para neve', emoji: '⛷️' },
      { id: 'seco', label: 'Roupa de algodão normal', emoji: '👕' },
    ],
  },
  {
    city: 'Sydney',
    temp: 26,
    weather: 'Sol e brisa marítima',
    weatherEmoji: '🌊',
    correctKit: 'praia',
    minLevel: 5,
    options: [
      { id: 'praia', label: 'Roupa leve, protector solar e óculos de sol', emoji: '👕🧴🕶️' },
      { id: 'pesado', label: 'Casaco grosso e cachecol', emoji: '🧥🧣' },
      { id: 'neve', label: 'Roupa para neve e luvas', emoji: '⛷️🧤' },
    ],
  },
  {
    city: 'Banguecoque',
    temp: 34,
    weather: 'Quente e muito húmido',
    weatherEmoji: '🌡️',
    correctKit: 'tropical',
    minLevel: 6,
    options: [
      { id: 'tropical', label: 'Roupa muito leve e garrafa de água', emoji: '👕💧' },
      { id: 'pesado', label: 'Casaco de lã e botas', emoji: '🧥🥾' },
      { id: 'formal', label: 'Fato e gravata', emoji: '👔' },
    ],
  },
  {
    city: 'Nairobi',
    temp: 22,
    weather: 'Ameno e soalheiro',
    weatherEmoji: '🌤️',
    correctKit: 'ameno',
    minLevel: 7,
    options: [
      { id: 'ameno', label: 'Camisola leve e calças confortáveis', emoji: '👕👖' },
      { id: 'pesado', label: 'Casaco de inverno e gorro', emoji: '🧥🧢' },
      { id: 'neve', label: 'Roupa para neve', emoji: '⛷️' },
    ],
  },
  {
    city: 'Lima',
    temp: 18,
    weather: 'Nublado e fresco',
    weatherEmoji: '🌫️',
    correctKit: 'fresco',
    minLevel: 7,
    options: [
      { id: 'fresco', label: 'Camisola manga comprida e casaco leve', emoji: '👔🧥' },
      { id: 'leve', label: 'T-shirt e calções', emoji: '👕🩳' },
      { id: 'pesado', label: 'Casaco grosso, gorro e luvas', emoji: '🧥🧤🧢' },
    ],
  },
  {
    city: 'Nuuk',
    temp: -8,
    weather: 'Muito frio e neve',
    weatherEmoji: '🥶',
    correctKit: 'artico',
    minLevel: 8,
    options: [
      { id: 'artico', label: 'Várias camadas, casaco grosso, gorro e luvas', emoji: '🧥🧤🧣🧢' },
      { id: 'leve', label: 'T-shirt e sandália', emoji: '👕🩴' },
      { id: 'normal', label: 'Camisola fina e ténis', emoji: '👔👟' },
    ],
  },
  {
    city: 'Havana',
    temp: 30,
    weather: 'Quente com trovoada',
    weatherEmoji: '⛈️',
    correctKit: 'chuva-quente',
    minLevel: 8,
    options: [
      { id: 'chuva-quente', label: 'Roupa leve e impermeável compacto', emoji: '👕🧥' },
      { id: 'neve', label: 'Roupa para neve e botas', emoji: '⛷️🥾' },
      { id: 'formal', label: 'Fato de cerimónia', emoji: '👔' },
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
  const campoLevel = adaptive?.campoLevel?.campo3 || 1
  const scenarios = useMemo(
    () => SCENARIOS.filter(s => s.minLevel <= campoLevel),
    [campoLevel]
  )
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const scenario = scenarios[idx]
  const isComplete = idx >= scenarios.length

  useEffect(() => {
    if (!isComplete) {
      speak(`Vai haver jogo em ${scenario.city}. A temperatura é ${scenario.temp} graus. ${scenario.weather}. Como te deves vestir?`, { auto: true })
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
    if (next >= scenarios.length) {
      completeActivity('weather-match', score >= 13 ? 3 : score >= 8 ? 2 : 1)
    }
  }, [idx, score, scenarios.length, completeActivity, updateCampoProgress])

  const finalStars = score >= 13 ? 3 : score >= 8 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Tempo no Estádio" backPath="/campo/3" color="var(--color-campo3)">
        <CompletionCelebration
          emoji="🌤️"
          title="Sabes vestir-te para o tempo!"
          score={score}
          total={scenarios.length}
          stars={finalStars}
          color="var(--color-campo3)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Tempo no Estádio"
      instruction={`Vai haver jogo em ${scenario.city}. Como te deves vestir?`}
      backPath="/campo/3"
      color="var(--color-campo3)"
      score={score}
      total={scenarios.length}
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
            className="btn-press"
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
