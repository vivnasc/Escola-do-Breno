import { useState } from 'react'
import { CAMPO4_ACTIVITIES } from '../data/activities'
import ActivityCard from '../components/ActivityCard'
import ProgressBar from '../components/ProgressBar'
import UpgradePrompt from '../components/UpgradePrompt'

export default function Campo4Vida({ progress, subscription }) {
  const [showUpgrade, setShowUpgrade] = useState(false)
  const cp = progress.campoProgress.campo4

  return (
    <div style={styles.container} className="animate-fade-in">
      {showUpgrade && (
        <UpgradePrompt onClose={() => setShowUpgrade(false)} feature="activity" />
      )}

      <header style={styles.header}>
        <span style={styles.icon}>🤝</span>
        <div>
          <h1 style={styles.title}>A Vida</h1>
          <p style={styles.subtitle}>Autonomia e Competencias Sociais</p>
        </div>
      </header>

      <p style={styles.description}>
        O jogador mais tecnico do mundo nao ganha sozinho. Saber viver e o
        jogo mais importante.
      </p>

      <div style={styles.progressSection}>
        <div style={styles.progressLabel}>
          <span>Progresso</span>
          <span style={styles.progressCount}>
            {cp.completed}/{cp.total}
          </span>
        </div>
        <ProgressBar value={cp.completed} max={cp.total} color="var(--color-campo4)" />
      </div>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Actividades</h2>
        <div style={styles.activityList}>
          {CAMPO4_ACTIVITIES.map((a) => (
            <ActivityCard
              key={a.id}
              activity={a}
              basePath="/campo/4"
              completed={progress.activitiesCompleted[a.id]}
              locked={subscription?.isActivityLocked(a.id, 'campo4')}
              onLockedClick={() => setShowUpgrade(true)}
            />
          ))}
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
    alignItems: 'center',
    gap: 'var(--space-md)',
  },
  icon: {
    fontSize: '2.5rem',
  },
  title: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
    color: 'var(--color-campo4)',
  },
  subtitle: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
  },
  description: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
  },
  progressSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
  },
  progressCount: {
    color: 'var(--color-campo4)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  sectionTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
}
