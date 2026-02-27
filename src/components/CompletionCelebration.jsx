import { useMemo, useEffect, useState } from 'react'
import { useSoundEffects } from '../hooks/useSoundEffects'
import { useHaptics } from '../hooks/useHaptics'

/**
 * CompletionCelebration — animated celebration screen shown when
 * an activity is completed. Features confetti rain, firework bursts,
 * animated stars, score display, and haptic feedback.
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
  const haptics = useHaptics(soundEnabled)
  const [showStars, setShowStars] = useState(false)
  const [showScore, setShowScore] = useState(false)

  useEffect(() => {
    sfx.celebrate()
    haptics.celebrate()

    // Stagger reveals for dramatic effect
    const starTimer = setTimeout(() => setShowStars(true), 400)
    const scoreTimer = setTimeout(() => setShowScore(true), 800)

    return () => {
      clearTimeout(starTimer)
      clearTimeout(scoreTimer)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Generate confetti particles — 30 particles with varied shapes and colors
  const confetti = useMemo(() => {
    const colors = ['#FFD54F', '#4CAF50', '#2196F3', '#E91E63', '#FF9800', '#9C27B0', '#00BCD4', '#FF5722']
    const shapes = ['circle', 'square', 'triangle']
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: `${3 + (i * 3.2)}%`,
      delay: `${(i * 0.06)}s`,
      duration: `${1.8 + Math.random() * 1.2}s`,
      size: 5 + (i % 4) * 2,
      shape: shapes[i % shapes.length],
      drift: (i % 2 === 0 ? 1 : -1) * (5 + Math.random() * 15),
    }))
  }, [])

  // Generate firework burst particles
  const fireworks = useMemo(() => {
    const colors = ['#FFD54F', '#4CAF50', '#2196F3', '#E91E63']
    const angles = [0, 45, 90, 135, 180, 225, 270, 315]
    return angles.map((angle, i) => {
      const rad = (angle * Math.PI) / 180
      const dist = 35 + Math.random() * 20
      return {
        id: i,
        color: colors[i % colors.length],
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        delay: `${0.1 + i * 0.03}s`,
      }
    })
  }, [])

  const getShapeStyle = (shape, size, color) => {
    const base = {
      position: 'absolute',
      top: '-10px',
    }
    if (shape === 'circle') {
      return { ...base, width: size, height: size, borderRadius: '50%', backgroundColor: color }
    }
    if (shape === 'square') {
      return { ...base, width: size, height: size, borderRadius: '2px', backgroundColor: color }
    }
    // triangle
    return {
      ...base,
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderLeft: `${size / 2}px solid transparent`,
      borderRight: `${size / 2}px solid transparent`,
      borderBottom: `${size}px solid ${color}`,
    }
  }

  return (
    <div style={styles.container} className="animate-fade-in">
      {/* Confetti rain — 30 particles */}
      <div style={styles.confettiContainer} aria-hidden="true">
        {confetti.map((c) => (
          <span
            key={c.id}
            style={{
              ...getShapeStyle(c.shape, c.size, c.color),
              left: c.left,
              animation: `confettiDrift ${c.duration} ease-out ${c.delay} forwards`,
            }}
          />
        ))}
      </div>

      {/* Firework burst around the emoji */}
      <div style={styles.fireworkContainer} aria-hidden="true">
        {fireworks.map((f) => (
          <span
            key={f.id}
            style={{
              ...styles.fireworkDot,
              backgroundColor: f.color,
              '--burst-x': `${f.x}px`,
              '--burst-y': `${f.y}px`,
              animationDelay: f.delay,
            }}
          />
        ))}
      </div>

      <span style={styles.emoji} className="animate-scale-in">{emoji}</span>

      <h2 style={{ ...styles.title, color }}>{title}</h2>

      {subtitle && <p style={styles.subtitle}>{subtitle}</p>}

      {/* Animated stars */}
      {stars > 0 && showStars && (
        <div style={styles.starsRow}>
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              style={{
                ...styles.star,
                opacity: s <= stars ? 1 : 0.15,
                transform: s <= stars ? 'scale(1)' : 'scale(0.7)',
                animation: s <= stars
                  ? `starSpin 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${s * 0.15}s both`
                  : 'none',
              }}
            >
              ⭐
            </span>
          ))}
        </div>
      )}

      {/* Score display */}
      {score !== undefined && total !== undefined && showScore && (
        <div style={styles.scoreCard} className="animate-slide-up-bounce">
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
  fireworkContainer: {
    position: 'absolute',
    top: '15%',
    left: '50%',
    width: 0,
    height: 0,
    pointerEvents: 'none',
  },
  fireworkDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: '50%',
    animation: 'fireworkBurst 0.8s ease-out forwards',
  },
  emoji: {
    fontSize: '5rem',
    lineHeight: 1,
    zIndex: 1,
  },
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    textAlign: 'center',
    zIndex: 1,
  },
  subtitle: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
    lineHeight: 1.5,
    zIndex: 1,
  },
  starsRow: {
    display: 'flex',
    gap: 'var(--space-lg)',
    justifyContent: 'center',
    zIndex: 1,
  },
  star: {
    fontSize: '3rem',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
  },
  scoreCard: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 'var(--space-xs)',
    padding: 'var(--space-md) var(--space-xl)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    flexWrap: 'wrap',
    justifyContent: 'center',
    zIndex: 1,
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
