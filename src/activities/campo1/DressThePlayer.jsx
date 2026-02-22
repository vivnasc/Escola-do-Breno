import { useState, useCallback } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import { useTTS } from '../../hooks/useTTS'

const CLOTHING_ITEMS = [
  { id: 'shirt', en: 'shirt', pt: 'camisola', emoji: '👕', zone: 'torso' },
  { id: 'shorts', en: 'shorts', pt: 'calcoes', emoji: '🩳', zone: 'legs' },
  { id: 'socks', en: 'socks', pt: 'meias', emoji: '🧦', zone: 'feet' },
  { id: 'boots', en: 'boots', pt: 'chuteiras', emoji: '👟', zone: 'feet' },
  { id: 'hat', en: 'hat', pt: 'chapeu', emoji: '🧢', zone: 'head' },
  { id: 'jacket', en: 'jacket', pt: 'casaco', emoji: '🧥', zone: 'torso' },
]

const BODY_ZONES = [
  { id: 'head', label: 'Cabeca', y: '10%' },
  { id: 'torso', label: 'Tronco', y: '35%' },
  { id: 'legs', label: 'Pernas', y: '60%' },
  { id: 'feet', label: 'Pes', y: '85%' },
]

export default function DressThePlayer({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  markWordLearned,
}) {
  const [currentItem, setCurrentItem] = useState(0)
  const [dressed, setDressed] = useState([])
  const [feedback, setFeedback] = useState(null)
  const { speakEn } = useTTS()

  const item = CLOTHING_ITEMS[currentItem]
  const isComplete = currentItem >= CLOTHING_ITEMS.length

  const handleZoneClick = useCallback(
    (zoneId) => {
      registerClick()
      if (zoneId === item.zone) {
        registerSuccess()
        markWordLearned(
          { shirt: 20, shorts: 21, boots: 22, socks: 23, hat: 24, jacket: 25 }[item.id]
        )
        setDressed((d) => [...d, item.id])
        setFeedback('success')
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [item, registerClick, registerSuccess, registerError, markWordLearned]
  )

  const handleNext = useCallback(() => {
    setFeedback(null)
    const next = currentItem + 1
    setCurrentItem(next)
    if (next >= CLOTHING_ITEMS.length) {
      completeActivity('dress-player', 3)
    }
  }, [currentItem, completeActivity])

  if (isComplete) {
    return (
      <ActivityShell title="Veste o Jogador" backPath="/campo/1" color="var(--color-campo1)">
        <div style={styles.complete}>
          <span style={styles.completeEmoji}>⚽</span>
          <p style={styles.completeText}>O jogador esta pronto para o jogo!</p>
          <div style={styles.dressedRow}>
            {CLOTHING_ITEMS.map((c) => (
              <span key={c.id} style={styles.dressedItem}>{c.emoji}</span>
            ))}
          </div>
        </div>
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Veste o Jogador"
      instruction={`Coloca a ${item.en} no jogador. Onde vai a ${item.pt}?`}
      backPath="/campo/1"
      color="var(--color-campo1)"
      score={currentItem}
      total={CLOTHING_ITEMS.length}
    >
      <button
        style={styles.itemCard}
        onClick={() => speakEn(item.en)}
      >
        <span style={styles.itemEmoji}>{item.emoji}</span>
        <span style={styles.itemName}>{item.en}</span>
        <span style={styles.speakerIcon}>🔊</span>
      </button>

      <div style={styles.playerBody}>
        <div style={styles.playerFigure}>
          <div style={styles.playerHead}>🙂</div>
          <div style={styles.playerTorso}>
            {dressed.includes('shirt') && <span>👕</span>}
            {dressed.includes('jacket') && <span>🧥</span>}
          </div>
          <div style={styles.playerLegs}>
            {dressed.includes('shorts') && <span>🩳</span>}
          </div>
          <div style={styles.playerFeet}>
            {dressed.includes('socks') && <span>🧦</span>}
            {dressed.includes('boots') && <span>👟</span>}
          </div>
        </div>

        <div style={styles.zones}>
          {BODY_ZONES.map((zone) => (
            <button
              key={zone.id}
              style={styles.zoneBtn}
              onClick={() => handleZoneClick(zone.id)}
              disabled={feedback !== null}
            >
              {zone.label}
            </button>
          ))}
        </div>
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
  itemCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    backgroundColor: '#E3F2FD',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo1)',
    cursor: 'pointer',
  },
  itemEmoji: {
    fontSize: '2.5rem',
  },
  itemName: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-campo1)',
    textTransform: 'uppercase',
  },
  speakerIcon: {
    fontSize: '1.5rem',
  },
  playerBody: {
    display: 'flex',
    gap: 'var(--space-lg)',
    alignItems: 'stretch',
  },
  playerFigure: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
    minHeight: '240px',
    justifyContent: 'space-around',
  },
  playerHead: { fontSize: '2.5rem' },
  playerTorso: { fontSize: '2rem', display: 'flex', gap: '4px' },
  playerLegs: { fontSize: '2rem' },
  playerFeet: { fontSize: '1.5rem', display: 'flex', gap: '4px' },
  zones: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
    justifyContent: 'space-around',
  },
  zoneBtn: {
    padding: 'var(--space-sm) var(--space-lg)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 'var(--font-size-base)',
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
  dressedRow: {
    display: 'flex',
    gap: 'var(--space-sm)',
    fontSize: '2rem',
  },
  dressedItem: { fontSize: '2rem' },
}
