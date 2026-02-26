import { useState, useCallback, useMemo } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'
import { getContent } from '../../data/universeContent'

/**
 * Clothing items tiered by vocabulary level (matches vocabulary.js WORD_LEVELS).
 * Level field matches when this word becomes available in the vocabulary system:
 *   L3: shirt, shorts (basic daily wear)
 *   L4: boots, socks, hat (common items)
 *   L5: jacket, dress (less frequent)
 *   L7: glasses, gloves, scarf (accessories)
 */
const CLOTHING_ITEMS = [
  { id: 'shirt', en: 'shirt', pt: 'camisola', emoji: '👕', zone: 'torso', level: 3 },
  { id: 'shorts', en: 'shorts', pt: 'calções', emoji: '🩳', zone: 'legs', level: 3 },
  { id: 'socks', en: 'socks', pt: 'meias', emoji: '🧦', zone: 'feet', level: 4 },
  { id: 'boots', en: 'boots', pt: 'chuteiras', emoji: '👟', zone: 'feet', level: 4 },
  { id: 'hat', en: 'hat', pt: 'chapéu', emoji: '🧢', zone: 'head', level: 4 },
  { id: 'jacket', en: 'jacket', pt: 'casaco', emoji: '🧥', zone: 'torso', level: 5 },
  { id: 'dress', en: 'dress', pt: 'vestido', emoji: '👗', zone: 'torso', level: 5 },
  { id: 'gloves', en: 'gloves', pt: 'luvas', emoji: '🧤', zone: 'hands', level: 7 },
  { id: 'scarf', en: 'scarf', pt: 'cachecol', emoji: '🧣', zone: 'head', level: 7 },
]

const BODY_ZONES = [
  { id: 'head', label: 'Cabeça', y: '10%' },
  { id: 'torso', label: 'Tronco', y: '35%' },
  { id: 'legs', label: 'Pernas', y: '60%' },
  { id: 'feet', label: 'Pés', y: '85%' },
  { id: 'hands', label: 'Mãos', y: '48%' },
]

// Word ID lookup for markWordLearned
const CLOTHING_WORD_IDS = {
  shirt: 21, shorts: 22, boots: 23, socks: 24, hat: 25, jacket: 26, dress: 27, gloves: 162, scarf: 163,
}

export default function DressThePlayer({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  markWordLearned,
  adaptive,
}) {
  const content = getContent(adaptive?.universe?.id)
  const dressContent = content.dress
  const campoLevel = adaptive?.campoLevel?.campo1 || 1

  // Filter clothing items to those available at the child's level
  const items = useMemo(
    () => CLOTHING_ITEMS.filter(c => c.level <= Math.max(3, campoLevel)),
    [campoLevel]
  )

  const [currentItem, setCurrentItem] = useState(0)
  const [dressed, setDressed] = useState([])
  const [feedback, setFeedback] = useState(null)
  const { speakEn } = useTTS()

  const item = items[currentItem]
  const isComplete = currentItem >= items.length

  const handleZoneClick = useCallback(
    (zoneId) => {
      registerClick()
      if (zoneId === item.zone) {
        registerSuccess()
        const wordId = CLOTHING_WORD_IDS[item.id]
        if (wordId) markWordLearned(wordId)
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
    if (next >= items.length) {
      completeActivity('dress-player', 3)
    }
  }, [currentItem, items.length, completeActivity])

  const finalStars = 3

  if (isComplete) {
    return (
      <ActivityShell title={dressContent.title} backPath="/campo/1" color="var(--color-campo1)">
        <CompletionCelebration
          emoji={dressContent.completeEmoji}
          title={dressContent.completeText}
          score={items.length}
          total={items.length}
          stars={finalStars}
          color="var(--color-campo1)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title={dressContent.title}
      instruction={dressContent.instruction(item.en, item.pt)}
      backPath="/campo/1"
      color="var(--color-campo1)"
      score={currentItem}
      total={items.length}
      textLevel={adaptive?.textLevel}
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
          <div style={styles.playerHead}>
            🙂
            {dressed.includes('hat') && <span>🧢</span>}
            {dressed.includes('scarf') && <span>🧣</span>}
          </div>
          <div style={styles.playerTorso}>
            {dressed.includes('shirt') && <span>👕</span>}
            {dressed.includes('jacket') && <span>🧥</span>}
            {dressed.includes('dress') && <span>👗</span>}
          </div>
          <div style={styles.playerLegs}>
            {dressed.includes('shorts') && <span>🩳</span>}
          </div>
          <div style={styles.playerFeet}>
            {dressed.includes('socks') && <span>🧦</span>}
            {dressed.includes('boots') && <span>👟</span>}
            {dressed.includes('gloves') && <span>🧤</span>}
          </div>
        </div>

        <div style={styles.zones}>
          {BODY_ZONES.map((zone) => (
            <button
              key={zone.id}
              className="btn-press"
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
        universe={adaptive?.universe}
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
