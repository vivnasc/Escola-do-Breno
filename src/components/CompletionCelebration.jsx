import { useMemo } from 'react'
import { useSoundEffects } from '../hooks/useSoundEffects'
import { useEffect } from 'react'

/**
 * CompletionCelebration — animated celebration screen shown when
 * an activity is completed. Shows animated stars, score, and
 * optional confetti particles.
 */
export default function CompletionCelebration({
  emoji = '🎉',
  title,
  subtitle,
  score,
  total,
  stars = 0,
  color = 'var(--color-primary)',
  soundEnabled = true,
}) {
  const sfx = useSoundEffects(soundEnabled)

  useEffect(() => {
    sfx.celebrate()
  }, [])

  // Generate confetti particles
  const confetti = useMemo(() => {
    const colors = ['#FFD54F', '#4CAF50', '#2196F3', '#E91E63', '#FF9800', '#9C27B0']
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: `${8 + (i * 7.5)}%`,
      delay: `${i * 0.1}s`,
      size: 6 + (i % 3) * 2,
    }))
  }, [])

  return (
    <div style={styles.container} className="animate-fade-in">
      {/* Confetti particles */}
      <div style={styles.confettiContainer} aria-hidden="true">
        {confetti.map((c) => (
          <span
            key={c.id}
            style={{
              ...styles.confettiDot,
              backgroundColor: c.color,
              left: c.left,
              width: c.size,
              height: c.size,
              animationDelay: c.delay,
            }}
          />
        ))}
      </div>

      <span style={styles.emoji} className="animate-scale-in">{emoji}</span>

      <h2 style={{ ...styles.title, color }}>{title}</h2>

      {subtitle && <p style={styles.subtitle}>{subtitle}</p>}

      {/* Animated stars */}
      {stars > 0 && (
        <div style={styles.starsRow}>
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className={s <= stars ? `animate-star-${s}` : ''}
              style={{
                ...styles.star,
                opacity: s <= stars ? 1 : 0.15,
                transform: s <= stars ? 'scale(1)' : 'scale(0.7)',
              }}
            >
              ⭐
            </span>
          ))}
        </div>
      )}

      {/* Score display */}
      {score !== undefined && total !== undefined && (
        <div style={styles.scoreCard}>
          <span style={{ ...styles.scoreValue, color }}>{score}</span>
          <span style={styles.scoreDivider}>/</span>
          <span style={styles.scoreTotal}>{total}</span>
          <span style={styles.scoreLabel}>respostas correctas</span>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-2xl) var(--space-lg)',
    position: 'relative',
    overflow: 'hidden',
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  confettiDot: {
    position: 'absolute',
    top: '-10px',
    borderRadius: '50%',
    animation: 'confettiFall 2s ease-out forwards',
  },
  emoji: {
    fontSize: '4.5rem',
    lineHeight: 1,
  },
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
    lineHeight: 1.5,
  },
  starsRow: {
    display: 'flex',
    gap: 'var(--space-md)',
    justifyContent: 'center',
  },
  star: {
    fontSize: '2.5rem',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  },
  scoreCard: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 'var(--space-xs)',
    padding: 'var(--space-md) var(--space-xl)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  scoreValue: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: 700,
  },
  scoreDivider: {
    fontSize: 'var(--font-size-xl)',
    color: 'var(--color-text-secondary)',
  },
  scoreTotal: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
  },
  scoreLabel: {
    width: '100%',
    textAlign: 'center',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    marginTop: '-4px',
  },
}
