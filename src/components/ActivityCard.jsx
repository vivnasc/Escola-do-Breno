import { useNavigate } from 'react-router-dom'

export default function ActivityCard({ activity, basePath, completed }) {
  const navigate = useNavigate()
  const stars = completed || 0

  return (
    <button
      style={styles.card}
      className="interactive-card"
      onClick={() => navigate(`${basePath}/${activity.id}`)}
      aria-label={`${activity.name}: ${activity.description}`}
    >
      <span style={styles.icon}>{activity.icon}</span>
      <div style={styles.info}>
        <span style={styles.name}>{activity.name}</span>
        <span style={styles.desc}>{activity.description}</span>
      </div>
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
  icon: {
    fontSize: '2rem',
    flexShrink: 0,
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
}
