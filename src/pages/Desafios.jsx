import { useMemo } from 'react'
import { getCurrentChallenges, getDaysUntilReset } from '../data/challenges'
import ProgressBar from '../components/ProgressBar'

export default function Desafios({ profile, progress }) {
  const challenges = useMemo(() => getCurrentChallenges(), [])
  const daysLeft = getDaysUntilReset()

  const getChallengeProgress = (challenge) => {
    const wp = profile?.weeklyProgress || {}
    if (wp[challenge.id] !== undefined) return wp[challenge.id]

    // Calculate progress from actual data
    switch (challenge.type) {
      case 'words':
        return progress?.wordsLearned?.length || 0
      case 'stars':
        return progress?.totalStars || 0
      case 'streak':
        return progress?.streakDays || 0
      case 'activities-campo1':
        return Object.keys(progress?.activitiesCompleted || {}).filter(k =>
          ['vocab-match', 'dress-player', 'color-kit', 'read-score'].includes(k)
        ).length
      case 'activities-campo2':
        return Object.keys(progress?.activitiesCompleted || {}).filter(k =>
          ['goal-math', 'clock-reader', 'team-division', 'ticket-shop'].includes(k)
        ).length
      case 'activities-campo3':
        return Object.keys(progress?.activitiesCompleted || {}).filter(k =>
          ['flag-match', 'world-explorer', 'body-science', 'weather-match'].includes(k)
        ).length
      case 'activities-campo4':
        return Object.keys(progress?.activitiesCompleted || {}).filter(k =>
          ['daily-routine', 'fair-play', 'emotion-cards', 'real-world'].includes(k)
        ).length
      case 'all-campos': {
        const completed = progress?.activitiesCompleted || {}
        let campos = 0
        if (Object.keys(completed).some(k => ['vocab-match', 'dress-player', 'color-kit', 'read-score'].includes(k))) campos++
        if (Object.keys(completed).some(k => ['goal-math', 'clock-reader', 'team-division', 'ticket-shop'].includes(k))) campos++
        if (Object.keys(completed).some(k => ['flag-match', 'world-explorer', 'body-science', 'weather-match'].includes(k))) campos++
        if (Object.keys(completed).some(k => ['daily-routine', 'fair-play', 'emotion-cards', 'real-world'].includes(k))) campos++
        return campos
      }
      case 'worksheets':
        return Object.keys(progress?.activitiesCompleted || {}).filter(k =>
          k.startsWith('worksheet-')
        ).length
      default:
        return 0
    }
  }

  return (
    <div style={styles.container} className="animate-fade-in">
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Desafios da Semana</h1>
          <p style={styles.subtitle}>Missões especiais com prémios!</p>
        </div>
        <div style={styles.timerBadge}>
          <span style={styles.timerNumber}>{daysLeft}</span>
          <span style={styles.timerLabel}>dias</span>
        </div>
      </header>

      <div style={styles.infoCard}>
        <span style={styles.infoEmoji}>💡</span>
        <p style={styles.infoText}>
          Completa os desafios desta semana para ganhar estrelas extra!
          Novos desafios todas as semanas.
        </p>
      </div>

      <div style={styles.challengeList}>
        {challenges.map((challenge) => {
          const current = Math.min(getChallengeProgress(challenge), challenge.target)
          const isComplete = current >= challenge.target
          const pct = Math.round((current / challenge.target) * 100)

          return (
            <div
              key={challenge.id}
              style={{
                ...styles.challengeCard,
                ...(isComplete ? styles.challengeComplete : {}),
              }}
            >
              <div style={styles.challengeTop}>
                <span style={styles.challengeIcon}>{challenge.icon}</span>
                <div style={styles.challengeInfo}>
                  <h3 style={styles.challengeName}>{challenge.name}</h3>
                  <p style={styles.challengeDesc}>{challenge.description}</p>
                </div>
                <div style={styles.rewardBadge}>
                  <span style={styles.rewardIcon}>⭐</span>
                  <span style={styles.rewardAmount}>+{challenge.reward}</span>
                </div>
              </div>

              <div style={styles.progressSection}>
                <ProgressBar
                  value={current}
                  max={challenge.target}
                  color={isComplete ? '#4CAF50' : 'var(--color-primary)'}
                  height={8}
                />
                <div style={styles.progressInfo}>
                  <span style={styles.progressText}>
                    {current}/{challenge.target}
                  </span>
                  <span style={styles.progressPct}>{pct}%</span>
                </div>
              </div>

              {isComplete && (
                <div style={styles.completeBanner}>
                  🎉 Desafio completo! +{challenge.reward} estrelas
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={styles.historySection}>
        <h2 style={styles.historySectionTitle}>Como funcionam os desafios?</h2>
        <div style={styles.rulesList}>
          <div style={styles.rule}>
            <span style={styles.ruleEmoji}>📅</span>
            <p style={styles.ruleText}>Novos desafios todas as semanas</p>
          </div>
          <div style={styles.rule}>
            <span style={styles.ruleEmoji}>⭐</span>
            <p style={styles.ruleText}>Ganha estrelas extra ao completar</p>
          </div>
          <div style={styles.rule}>
            <span style={styles.ruleEmoji}>🎯</span>
            <p style={styles.ruleText}>3 desafios por semana</p>
          </div>
          <div style={styles.rule}>
            <span style={styles.ruleEmoji}>🛒</span>
            <p style={styles.ruleText}>Usa estrelas na Loja de Prémios!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  subtitle: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  timerBadge: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: '#FFEBEE',
    borderRadius: 'var(--radius-md)',
    border: '2px solid #EF9A9A',
  },
  timerNumber: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: '#C62828',
  },
  timerLabel: {
    fontSize: '0.6rem',
    color: '#C62828',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  infoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    backgroundColor: '#E3F2FD',
    borderRadius: 'var(--radius-md)',
  },
  infoEmoji: {
    fontSize: '1.5rem',
    flexShrink: 0,
  },
  infoText: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
    lineHeight: 1.4,
  },
  challengeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  challengeCard: {
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  challengeComplete: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  challengeTop: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--space-sm)',
  },
  challengeIcon: {
    fontSize: '2rem',
    flexShrink: 0,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeName: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
  },
  challengeDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    marginTop: '2px',
  },
  rewardBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    padding: '2px 8px',
    backgroundColor: '#FFF8E1',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid #FFD54F',
  },
  rewardIcon: {
    fontSize: '0.9rem',
  },
  rewardAmount: {
    fontWeight: 700,
    fontSize: 'var(--font-size-sm)',
    color: '#F57F17',
  },
  progressSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  progressInfo: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-text)',
  },
  progressPct: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  completeBanner: {
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    color: '#2E7D32',
    padding: 'var(--space-sm)',
    backgroundColor: '#C8E6C9',
    borderRadius: 'var(--radius-sm)',
  },
  historySection: {
    marginTop: 'var(--space-md)',
  },
  historySectionTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    marginBottom: 'var(--space-md)',
  },
  rulesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  rule: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-sm)',
  },
  ruleEmoji: {
    fontSize: '1.3rem',
  },
  ruleText: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 500,
  },
}
