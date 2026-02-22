/**
 * Shared Profile view — read-only view of a profile shared by a family.
 * Therapists/educators see this when they access a shared child's profile.
 */
import { useNavigate } from 'react-router-dom'
import { AVATARS } from '../hooks/useProfile'
import { UNIVERSES } from '../data/universes'
import { MASTERY_LEVELS } from '../data/competencies'

export default function SharedProfile({ share, onRefresh }) {
  const navigate = useNavigate()

  if (!share) {
    return (
      <div style={styles.container} className="animate-fade-in">
        <div style={styles.empty}>
          <p style={styles.emptyText}>Perfil partilhado não encontrado.</p>
          <button style={styles.backBtn} onClick={() => navigate('/')}>
            Voltar ao início
          </button>
        </div>
      </div>
    )
  }

  const profile = share.profile_data
  const progress = share.progress_data || {}
  const avatar = AVATARS.find(a => a.id === profile?.avatar)
  const universe = UNIVERSES.find(u => u.id === profile?.universe)

  const campos = [
    { id: 'campo1', name: 'Linguagem', color: '#1565C0' },
    { id: 'campo2', name: 'Matemática', color: '#E65100' },
    { id: 'campo3', name: 'Descoberta', color: '#2E7D32' },
    { id: 'campo4', name: 'Autonomia', color: '#6A1B9A' },
  ]

  return (
    <div style={styles.container} className="animate-fade-in">
      <div style={styles.header}>
        <button style={styles.backArrow} onClick={() => navigate('/')}>
          ←
        </button>
        <div style={styles.headerInfo}>
          <h1 style={styles.title}>
            {avatar?.emoji} A Escola do {profile?.name || '?'}
          </h1>
          <span style={styles.sharedBadge}>Perfil partilhado</span>
        </div>
      </div>

      {/* Profile Info */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Informação</h2>
        <div style={styles.card}>
          <div style={styles.row}>
            <span style={styles.label}>Idade</span>
            <span style={styles.value}>{profile?.age} anos</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Mundo</span>
            <span style={styles.value}>{universe?.icon} {universe?.name}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Nível de leitura</span>
            <span style={styles.value}>
              {profile?.learningNeeds?.readingLevel === 'pre-reader' ? 'Pré-leitor' :
               profile?.learningNeeds?.readingLevel === 'beginning' ? 'A começar' : 'Fluente'}
            </span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Nível de apoio</span>
            <span style={styles.value}>
              {profile?.learningNeeds?.supportLevel === 'independent' ? 'Independente' :
               profile?.learningNeeds?.supportLevel === 'some' ? 'Algum apoio' : 'Apoio total'}
            </span>
          </div>
          {profile?.learningNeeds?.areas?.length > 0 && (
            <div style={styles.row}>
              <span style={styles.label}>Áreas de apoio</span>
              <div style={styles.tags}>
                {profile.learningNeeds.areas.map(a => (
                  <span key={a} style={styles.tag}>{a}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Competency Levels */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Níveis de Competência</h2>
        <div style={styles.campoGrid}>
          {campos.map(campo => {
            const level = profile?.competencyLevels?.[campo.id] || 1
            const comp = MASTERY_LEVELS?.find(l => l.level === level)
            return (
              <div key={campo.id} style={{ ...styles.campoCard, borderColor: campo.color }}>
                <span style={styles.campoName}>{campo.name}</span>
                <span style={styles.campoLevel}>
                  {comp?.emoji || '🌱'} Nv {level}
                </span>
                <span style={styles.campoLevelName}>{comp?.label || 'Semente'}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Progress Summary */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Progresso</h2>
        <div style={styles.card}>
          <div style={styles.row}>
            <span style={styles.label}>Estrelas</span>
            <span style={styles.value}>{progress?.totalStars || 0}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Actividades completas</span>
            <span style={styles.value}>
              {progress?.activitiesCompleted ? Object.keys(progress.activitiesCompleted).length : 0}
            </span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Palavras aprendidas</span>
            <span style={styles.value}>{progress?.wordsLearned?.length || 0}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Sequência actual</span>
            <span style={styles.value}>{progress?.currentStreak || 0} dias</span>
          </div>
        </div>
      </section>

      {/* Sensory Settings */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Configurações Sensoriais</h2>
        <div style={styles.card}>
          <div style={styles.row}>
            <span style={styles.label}>Som</span>
            <span style={styles.value}>{profile?.sensory?.soundEnabled ? 'Ligado' : 'Desligado'}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Animações</span>
            <span style={styles.value}>
              {profile?.sensory?.animationLevel === 'minimal' ? 'Mínimas' : 'Normal'}
            </span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Contraste</span>
            <span style={styles.value}>
              {profile?.sensory?.visualContrast === 'high' ? 'Alto' : 'Normal'}
            </span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Sessão</span>
            <span style={styles.value}>{profile?.attention?.sessionLength || 15} min</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Frustração</span>
            <span style={styles.value}>
              {profile?.attention?.frustrationSensitivity === 'sensitive' ? 'Alta' :
               profile?.attention?.frustrationSensitivity === 'resilient' ? 'Baixa' : 'Média'}
            </span>
          </div>
        </div>
      </section>

      {/* Refresh */}
      <section style={styles.section}>
        <button
          style={styles.refreshBtn}
          onClick={onRefresh}
        >
          Actualizar dados
        </button>
        <button
          style={styles.backBtn}
          onClick={() => navigate('/')}
        >
          Voltar ao início
        </button>
      </section>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-lg)',
    maxWidth: '480px',
    margin: '0 auto',
    padding: 'var(--space-lg)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
  },
  backArrow: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
    cursor: 'pointer',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontFamily: 'inherit',
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  title: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  sharedBadge: {
    display: 'inline-block',
    padding: '2px 8px',
    backgroundColor: '#6A1B9A',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.6rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    alignSelf: 'flex-start',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  sectionTitle: {
    fontWeight: 700,
    color: '#6A1B9A',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontSize: 'var(--font-size-sm)',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  label: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
    flexShrink: 0,
  },
  value: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
    color: 'var(--color-text)',
    textAlign: 'right',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    justifyContent: 'flex-end',
  },
  tag: {
    padding: '2px 8px',
    backgroundColor: '#E3F2FD',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.65rem',
    fontWeight: 600,
    color: '#1565C0',
  },
  campoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-sm)',
  },
  campoCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
    border: '2px solid',
  },
  campoName: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  campoLevel: {
    fontSize: '1.2rem',
  },
  campoLevelName: {
    fontSize: '0.7rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 600,
  },
  refreshBtn: {
    width: '100%',
    padding: 'var(--space-md)',
    backgroundColor: '#6A1B9A',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
  },
  backBtn: {
    width: '100%',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-xl)',
  },
  emptyText: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
  },
}
