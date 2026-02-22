import { useNavigate } from 'react-router-dom'
import { CAMPO_INFO } from '../data/activities'
import { getCurrentChallenges, getDaysUntilReset } from '../data/challenges'
import { AVATARS } from '../hooks/useProfile'
import ProgressBar from '../components/ProgressBar'

export default function Home({ progress, profile, adaptive }) {
  const navigate = useNavigate()
  const totalWords = progress.wordsLearned.length
  const totalStars = progress.totalStars
  const playerName = profile?.name || 'Jogador'
  const avatarEmoji = AVATARS.find((a) => a.id === profile?.avatar)?.emoji || '⭐'
  const challenges = getCurrentChallenges()
  const daysLeft = getDaysUntilReset()

  const universe = adaptive?.universe
  const prioritised = adaptive?.prioritisedCampos || ['campo1', 'campo2', 'campo3', 'campo4']

  // Merge campo info with universe-specific naming
  const campos = CAMPO_INFO.map((campo) => {
    const uCampo = universe?.campos?.[campo.id]
    return {
      ...campo,
      name: uCampo?.name || campo.name,
      subtitle: uCampo?.subtitle || campo.subtitle,
      isPriority: prioritised.includes(campo.id),
    }
  })

  // Sort: prioritised goals first
  const sortedCampos = [
    ...campos.filter((c) => c.isPriority),
    ...campos.filter((c) => !c.isPriority),
  ]

  // Show needs summary if goals are set
  const hasGoals = (profile?.goals || []).length > 0
  const needsAreas = profile?.learningNeeds?.areas || []

  return (
    <div style={styles.container} className="animate-fade-in">
      {/* The school belongs to the child */}
      <div style={styles.schoolBanner}>
        <span style={styles.schoolIcon}>{universe?.icon || '⚽'}</span>
        <h1 style={styles.schoolTitle}>A Escola do {playerName}</h1>
      </div>

      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={{
            ...styles.avatarCircle,
            borderColor: universe?.color || 'var(--color-primary)',
          }}>
            {avatarEmoji}
          </div>
          <div>
            <p style={styles.greeting}>Ola, {playerName}!</p>
            <p style={styles.subtitle}>
              {universe?.icon} Mundo: {universe?.name || 'Futebol'}
            </p>
          </div>
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
        <div style={styles.stat}>
          <span style={styles.statValue}>
            {Object.keys(progress.activitiesCompleted).length}
          </span>
          <span style={styles.statLabel}>feitas</span>
        </div>
      </div>

      {/* Personalised recommendations based on needs */}
      {hasGoals && (
        <div style={styles.goalsCard}>
          <span style={styles.goalsIcon}>🎯</span>
          <div>
            <p style={styles.goalsTitle}>Os teus objectivos</p>
            <p style={styles.goalsText}>
              Actividades recomendadas com base no teu perfil de aprendizagem.
              {needsAreas.length > 0 && ` Foco: ${needsAreas.length} areas de apoio.`}
            </p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <section style={styles.quickActions}>
        <button style={styles.quickBtn} onClick={() => navigate('/fichas')}>
          <span style={styles.quickIcon}>✏️</span>
          <span style={styles.quickLabel}>Fichas</span>
        </button>
        <button style={styles.quickBtn} onClick={() => navigate('/noticias')}>
          <span style={styles.quickIcon}>📰</span>
          <span style={styles.quickLabel}>Noticias</span>
        </button>
        <button style={styles.quickBtn} onClick={() => navigate('/comunidade')}>
          <span style={styles.quickIcon}>🏟️</span>
          <span style={styles.quickLabel}>Comunidade</span>
        </button>
        <button style={styles.quickBtn} onClick={() => navigate('/progresso')}>
          <span style={styles.quickIcon}>📊</span>
          <span style={styles.quickLabel}>Progresso</span>
        </button>
      </section>

      {/* Weekly Challenge Preview */}
      <section style={styles.challengePreview}>
        <div style={styles.challengeHeader}>
          <h2 style={styles.challengeTitle}>Desafio da Semana</h2>
          <span style={styles.challengeTimer}>{daysLeft} dias</span>
        </div>
        {challenges.slice(0, 2).map((c) => (
          <div key={c.id} style={styles.challengeRow}>
            <span style={styles.challengeIcon}>{c.icon}</span>
            <span style={styles.challengeName}>{c.name}</span>
            <span style={styles.challengeReward}>+{c.reward} ⭐</span>
          </div>
        ))}
        <button style={styles.challengeMoreBtn} onClick={() => navigate('/desafios')}>
          Ver todos os desafios →
        </button>
      </section>

      {/* 4 Campos — sorted by priority */}
      <section style={styles.campos}>
        <h2 style={styles.sectionTitle}>
          {hasGoals ? 'Recomendado para ti' : 'Os 4 Campos'}
        </h2>
        <div style={styles.campoGrid}>
          {sortedCampos.map((campo, idx) => {
            const cp = progress.campoProgress[campo.id]
            return (
              <button
                key={campo.id}
                style={{
                  ...styles.campoCard,
                  borderLeftColor: campo.color,
                  ...(campo.isPriority && hasGoals ? styles.campoPriority : {}),
                }}
                onClick={() => navigate(campo.path)}
                aria-label={`${campo.name}: ${campo.subtitle}`}
              >
                {campo.isPriority && hasGoals && (
                  <span style={styles.priorityTag}>Recomendado</span>
                )}
                <div style={styles.campoHeader}>
                  <span style={styles.campoIcon}>{campo.icon}</span>
                  <div>
                    <span style={{ ...styles.campoName, color: campo.color }}>
                      {campo.name}
                    </span>
                    <span style={styles.campoTitle}>{campo.subtitle}</span>
                  </div>
                </div>
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
    gap: 'var(--space-lg)',
  },
  schoolBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm)',
  },
  schoolIcon: {
    fontSize: '1.5rem',
  },
  schoolTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-primary-dark)',
    letterSpacing: '1px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  avatarCircle: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#E8F5E9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    border: '2px solid',
  },
  greeting: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 700,
    color: 'var(--color-primary-dark)',
  },
  subtitle: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
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
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-primary)',
  },
  statLabel: {
    fontSize: '0.65rem',
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
  },
  // Goals recommendation card
  goalsCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    backgroundColor: '#E3F2FD',
    borderRadius: 'var(--radius-md)',
    borderLeft: '4px solid #1565C0',
  },
  goalsIcon: { fontSize: '1.5rem', flexShrink: 0 },
  goalsTitle: { fontWeight: 700, fontSize: 'var(--font-size-sm)', color: '#1565C0' },
  goalsText: { fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', lineHeight: 1.3, marginTop: '2px' },
  // Quick Actions
  quickActions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--space-sm)',
  },
  quickBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: 'var(--space-sm)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  },
  quickIcon: { fontSize: '1.5rem' },
  quickLabel: {
    fontSize: '0.6rem',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
  },
  // Challenge Preview
  challengePreview: {
    padding: 'var(--space-md)',
    backgroundColor: '#FFF8E1',
    borderRadius: 'var(--radius-md)',
    border: '1px solid #FFD54F',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  challengeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeTitle: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 700,
    color: '#F57F17',
  },
  challengeTimer: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: '#C62828',
    backgroundColor: '#FFEBEE',
    padding: '2px 8px',
    borderRadius: 'var(--radius-sm)',
  },
  challengeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  challengeIcon: { fontSize: '1.2rem' },
  challengeName: { flex: 1, fontWeight: 500, fontSize: 'var(--font-size-sm)' },
  challengeReward: { fontSize: 'var(--font-size-sm)', fontWeight: 700, color: '#F57F17' },
  challengeMoreBtn: {
    alignSelf: 'center',
    padding: 'var(--space-xs) var(--space-md)',
    backgroundColor: '#F57F17',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    marginTop: 'var(--space-xs)',
  },
  // Campos
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
    fontFamily: 'inherit',
    position: 'relative',
  },
  campoPriority: {
    backgroundColor: '#F1F8E9',
    borderWidth: '1px',
    borderColor: 'var(--color-primary)',
  },
  priorityTag: {
    position: 'absolute',
    top: '-8px',
    right: 'var(--space-sm)',
    padding: '2px 8px',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.6rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  campoHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  campoIcon: { fontSize: '2rem' },
  campoName: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    display: 'block',
  },
  campoTitle: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    color: 'var(--color-text)',
    display: 'block',
  },
  campoProgress: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    textAlign: 'right',
  },
}
