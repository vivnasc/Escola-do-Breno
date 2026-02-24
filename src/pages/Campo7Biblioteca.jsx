import { useState } from 'react'
import { CAMPO7_ACTIVITIES } from '../data/activities'
import ActivityCard from '../components/ActivityCard'
import ProgressBar from '../components/ProgressBar'
import UpgradePrompt from '../components/UpgradePrompt'

export default function Campo7Biblioteca({ progress, subscription }) {
  const [showUpgrade, setShowUpgrade] = useState(false)
  const cp = progress.campoProgress.campo7 || { completed: 0, total: 20 }

  return (
    <div style={styles.container} className="animate-fade-in">
      {showUpgrade && (
        <UpgradePrompt onClose={() => setShowUpgrade(false)} feature="activity" />
      )}

      <header style={styles.header}>
        <span style={styles.icon}>📚</span>
        <div>
          <h1 style={styles.title}>A Biblioteca</h1>
          <p style={styles.subtitle}>Literatura e Imaginação</p>
        </div>
      </header>

      <p style={styles.description}>
        Ouvir, sentir e viver histórias — mesmo sem saber ler. Aqui, a
        literatura ganha voz e a imaginação ganha asas.
      </p>

      <div style={styles.progressSection}>
        <div style={styles.progressLabel}>
          <span>Progresso</span>
          <span style={styles.progressCount}>
            {cp.completed}/{cp.total}
          </span>
        </div>
        <ProgressBar value={cp.completed} max={cp.total} color="var(--color-campo7)" />
      </div>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Actividades</h2>
        <div style={styles.activityList}>
          {CAMPO7_ACTIVITIES.map((a) => (
            <ActivityCard
              key={a.id}
              activity={a}
              basePath="/campo/7"
              completed={progress.activitiesCompleted[a.id]}
              locked={subscription?.isActivityLocked(a.id, 'campo7')}
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
    color: 'var(--color-campo7)',
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
    color: 'var(--color-campo7)',
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
