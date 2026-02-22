import { useNavigate } from 'react-router-dom'

export default function ActivityCard({ activity, basePath, completed, locked, onLockedClick }) {
  const navigate = useNavigate()
  const stars = completed || 0

  const handleClick = () => {
    if (locked) {
      onLockedClick?.()
      return
    }
    navigate(`${basePath}/${activity.id}`)
  }

  return (
    <button
      style={{
        ...styles.card,
        ...(locked ? styles.cardLocked : {}),
      }}
      className={locked ? '' : 'interactive-card'}
      onClick={handleClick}
      aria-label={locked
        ? `${activity.name}: disponível no plano Flor`
        : `${activity.name}: ${activity.description}`
      }
    >
      <span style={{ ...styles.icon, ...(locked ? styles.iconLocked : {}) }}>
        {locked ? '🔒' : activity.icon}
      </span>
      <div style={styles.info}>
        <span style={{ ...styles.name, ...(locked ? styles.nameLocked : {}) }}>
          {activity.name}
        </span>
        <span style={styles.desc}>
          {locked ? 'Disponível no plano Flor' : activity.description}
        </span>
      </div>
      {!locked && (
        <div style={styles.stars}>
          {[1, 2, 3].map((s) => (
            <span key={s} style={{
              opacity: s <= stars ? 1 : 0.15,
              fontSize: '1rem',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              transform: s <= stars ? 'scale(1)' : 'scale(0.85)',
            }}>
              ⭐
            </span>
          ))}
        </div>
      )}
      {locked && (
        <span style={styles.upgradeBadge}>Flor</span>
      )}
    </button>
  )
}

const styles = {
  card: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)',
    textAlign: 'left',
    cursor: 'pointer',
  },
  cardLocked: {
    opacity: 0.6,
    backgroundColor: '#F5F5F5',
    boxShadow: 'none',
  },
  icon: {
    fontSize: '2rem',
    flexShrink: 0,
  },
  iconLocked: {
    fontSize: '1.5rem',
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  name: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
  },
  nameLocked: {
    color: 'var(--color-text-secondary)',
  },
  desc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.4,
  },
  stars: {
    display: 'flex',
    gap: '2px',
    flexShrink: 0,
  },
  upgradeBadge: {
    padding: '2px 8px',
    backgroundColor: '#E3F2FD',
    color: '#1565C0',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.65rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    flexShrink: 0,
  },
}
