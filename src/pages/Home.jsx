import { useNavigate } from 'react-router-dom'
import { CAMPO_INFO } from '../data/activities'
import ProgressBar from '../components/ProgressBar'

export default function Home({ progress }) {
  const navigate = useNavigate()
  const totalWords = progress.wordsLearned.length
  const totalStars = progress.totalStars

  return (
    <div style={styles.container} className="animate-fade-in">
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>PITCH</h1>
          <p style={styles.subtitle}>Play. Interact. Think. Challenge. Hone.</p>
        </div>
        <button
          style={styles.streakBadge}
          onClick={() => navigate('/progresso')}
          aria-label={`${progress.streakDays} dias seguidos`}
        >
          <span style={styles.streakNumber}>{progress.streakDays}</span>
          <span style={styles.streakLabel}>dias</span>
        </button>
      </header>

      <div style={styles.statsRow}>
        <div style={styles.stat}>
          <span style={styles.statValue}>{totalWords}</span>
          <span style={styles.statLabel}>palavras</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statValue}>{totalStars}</span>
          <span style={styles.statLabel}>estrelas</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statValue}>{progress.trophies.length}</span>
          <span style={styles.statLabel}>trofeus</span>
        </div>
      </div>

      <section style={styles.campos}>
        <h2 style={styles.sectionTitle}>Os 4 Campos</h2>
        <div style={styles.campoGrid}>
          {CAMPO_INFO.map((campo, idx) => {
            const cp = progress.campoProgress[campo.id]
            return (
              <button
                key={campo.id}
                style={{ ...styles.campoCard, borderLeftColor: campo.color }}
                onClick={() => navigate(campo.path)}
                aria-label={`${campo.name}: ${campo.subtitle}`}
              >
                <div style={styles.campoHeader}>
                  <span style={styles.campoIcon}>{campo.icon}</span>
                  <div>
                    <span style={{ ...styles.campoName, color: campo.color }}>
                      Campo {idx + 1}
                    </span>
                    <span style={styles.campoTitle}>{campo.name}</span>
                  </div>
                </div>
                <p style={styles.campoDesc}>{campo.subtitle}</p>
                <ProgressBar
                  value={cp.completed}
                  max={cp.total}
                  color={campo.color}
                  height={6}
                />
                <span style={styles.campoProgress}>
                  {cp.completed}/{cp.total}
                </span>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xl)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: 700,
    color: 'var(--color-primary-dark)',
    letterSpacing: '2px',
  },
  subtitle: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
    marginTop: '2px',
  },
  streakBadge: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 'var(--space-sm)',
    backgroundColor: '#FFF8E1',
    borderRadius: 'var(--radius-md)',
    border: '2px solid #FFD54F',
    cursor: 'pointer',
    minWidth: '56px',
  },
  streakNumber: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: '#F57F17',
  },
  streakLabel: {
    fontSize: '0.6rem',
    color: '#F57F17',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-primary)',
  },
  statLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  campos: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  sectionTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  campoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  campoCard: {
    width: '100%',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderLeft: '4px solid',
    borderRadius: 'var(--radius-md)',
    textAlign: 'left',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
    transition: 'box-shadow var(--transition-speed)',
  },
  campoHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  campoIcon: {
    fontSize: '2rem',
  },
  campoName: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    display: 'block',
  },
  campoTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-text)',
    display: 'block',
  },
  campoDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  campoProgress: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    textAlign: 'right',
  },
}
