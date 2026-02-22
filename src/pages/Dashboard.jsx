import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VOCABULARY_WORDS, VOCABULARY_CATEGORIES } from '../data/vocabulary'
import { WORKSHEETS } from '../data/worksheets'

/**
 * Parent/Therapist Dashboard — real progress monitoring and worksheet review.
 * Accessible from settings page. Shows data, not simulations.
 */
export default function Dashboard({ profile, progress, reviewWorksheet, addEncouragement }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('resumo')
  const [reviewingSubmission, setReviewingSubmission] = useState(null)
  const [reviewStars, setReviewStars] = useState(2)
  const [reviewFeedback, setReviewFeedback] = useState('')

  const submissions = profile?.worksheetSubmissions || []
  const pendingSubmissions = submissions.filter((s) => s.status === 'pending')
  const reviewedSubmissions = submissions.filter((s) => s.status === 'reviewed')

  const wordsLearned = progress?.wordsLearned || []
  const activitiesCompleted = progress?.activitiesCompleted || {}
  const totalStars = progress?.totalStars || 0
  const totalActivities = Object.keys(activitiesCompleted).length

  // Category breakdown of learned words
  const wordsByCategory = VOCABULARY_CATEGORIES.map((cat) => {
    const catWords = VOCABULARY_WORDS.filter((w) => w.category === cat.id)
    const learned = catWords.filter((w) => wordsLearned.includes(w.id))
    return { ...cat, total: catWords.length, learned: learned.length }
  })

  // Campo progress
  const campos = [
    { id: 'campo1', name: 'Linguagem', color: '#1565C0', icon: '🗣️' },
    { id: 'campo2', name: 'Matematica', color: '#E65100', icon: '🔢' },
    { id: 'campo3', name: 'Descoberta', color: '#2E7D32', icon: '🌍' },
    { id: 'campo4', name: 'Autonomia', color: '#6A1B9A', icon: '🤝' },
  ]

  const handleSubmitReview = () => {
    if (!reviewingSubmission) return
    reviewWorksheet?.(reviewingSubmission.id, reviewStars, reviewFeedback.trim() || null)
    setReviewingSubmission(null)
    setReviewStars(2)
    setReviewFeedback('')
  }

  // Review modal
  if (reviewingSubmission) {
    const ws = WORKSHEETS.find((w) => w.id === reviewingSubmission.worksheetId)
    return (
      <div style={styles.container} className="animate-fade-in">
        <button style={styles.backBtn} onClick={() => setReviewingSubmission(null)}>← Voltar</button>

        <h2 style={styles.pageTitle}>Avaliar Ficha</h2>
        <p style={styles.pageDesc}>{ws?.title || reviewingSubmission.worksheetId}</p>
        <p style={styles.dateText}>
          Enviada: {new Date(reviewingSubmission.date).toLocaleDateString('pt-PT')}
        </p>

        {reviewingSubmission.photoData && (
          <img
            src={reviewingSubmission.photoData}
            alt="Ficha do aluno"
            style={styles.reviewPhoto}
          />
        )}

        {!reviewingSubmission.photoData && (
          <div style={styles.noPhotoBox}>
            <span style={styles.noPhotoEmoji}>📝</span>
            <p style={styles.noPhotoText}>Ficha completada sem foto</p>
          </div>
        )}

        <div style={styles.ratingSection}>
          <p style={styles.ratingLabel}>Avaliacao:</p>
          <div style={styles.starsRow}>
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                style={{
                  ...styles.starBtn,
                  opacity: s <= reviewStars ? 1 : 0.3,
                }}
                onClick={() => setReviewStars(s)}
              >
                ⭐
              </button>
            ))}
          </div>
          <p style={styles.ratingHint}>
            {reviewStars === 1 ? 'Precisa de praticar mais' : reviewStars === 2 ? 'Bom trabalho!' : 'Excelente!'}
          </p>
        </div>

        <div style={styles.feedbackSection}>
          <label style={styles.feedbackLabel}>Mensagem (opcional):</label>
          <textarea
            style={styles.feedbackInput}
            value={reviewFeedback}
            onChange={(e) => setReviewFeedback(e.target.value)}
            placeholder="Escrita muito bonita! Continua assim..."
            rows={3}
            maxLength={200}
          />
        </div>

        <button style={styles.submitReviewBtn} onClick={handleSubmitReview}>
          Enviar Avaliacao
        </button>
      </div>
    )
  }

  return (
    <div style={styles.container} className="animate-fade-in">
      <header style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/definicoes')}>
          ← Voltar
        </button>
        <div>
          <h1 style={styles.pageTitle}>Painel do Educador</h1>
          <p style={styles.pageDesc}>Progresso do {profile?.name || 'aluno'}</p>
        </div>
      </header>

      <div style={styles.tabs}>
        {[
          { id: 'resumo', label: 'Resumo', icon: '📊' },
          { id: 'fichas', label: `Fichas (${pendingSubmissions.length})`, icon: '📬' },
          { id: 'palavras', label: 'Vocabulario', icon: '🗣️' },
        ].map((tab) => (
          <button
            key={tab.id}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'resumo' && (
        <div style={styles.section} className="animate-fade-in">
          {/* Summary cards */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <span style={styles.statEmoji}>⭐</span>
              <span style={styles.statNumber}>{totalStars}</span>
              <span style={styles.statLabel}>Estrelas</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statEmoji}>🏆</span>
              <span style={styles.statNumber}>{totalActivities}</span>
              <span style={styles.statLabel}>Actividades</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statEmoji}>🗣️</span>
              <span style={styles.statNumber}>{wordsLearned.length}</span>
              <span style={styles.statLabel}>Palavras</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statEmoji}>🔥</span>
              <span style={styles.statNumber}>{progress?.streakDays || 0}</span>
              <span style={styles.statLabel}>Dias seguidos</span>
            </div>
          </div>

          {/* Campo progress */}
          <h3 style={styles.subTitle}>Progresso por Area</h3>
          <div style={styles.campoList}>
            {campos.map((campo) => {
              const cp = progress?.campoProgress?.[campo.id] || { completed: 0, total: 20 }
              const pct = Math.min(100, Math.round((cp.completed / cp.total) * 100))
              return (
                <div key={campo.id} style={styles.campoCard}>
                  <div style={styles.campoHeader}>
                    <span>{campo.icon} {campo.name}</span>
                    <span style={styles.campoPct}>{pct}%</span>
                  </div>
                  <div style={styles.campoBar}>
                    <div style={{ ...styles.campoFill, width: `${pct}%`, backgroundColor: campo.color }} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Strengths and areas for improvement */}
          <h3 style={styles.subTitle}>Observacoes</h3>
          <div style={styles.observationsList}>
            {wordsLearned.length >= 20 && (
              <div style={styles.obsCard}>
                <span style={styles.obsIcon}>💪</span>
                <p style={styles.obsText}>Forte em vocabulario — {wordsLearned.length} palavras aprendidas!</p>
              </div>
            )}
            {totalActivities > 0 && totalStars / totalActivities >= 2.5 && (
              <div style={styles.obsCard}>
                <span style={styles.obsIcon}>🌟</span>
                <p style={styles.obsText}>Media alta de estrelas ({(totalStars / totalActivities).toFixed(1)} por actividade)</p>
              </div>
            )}
            {totalActivities > 0 && totalStars / totalActivities < 2 && (
              <div style={styles.obsCard}>
                <span style={styles.obsIcon}>📌</span>
                <p style={styles.obsText}>Pode beneficiar de repetir actividades para consolidar</p>
              </div>
            )}
            {(progress?.streakDays || 0) === 0 && (
              <div style={styles.obsCard}>
                <span style={styles.obsIcon}>📅</span>
                <p style={styles.obsText}>Encorajar uso diario para criar rotina</p>
              </div>
            )}
            {pendingSubmissions.length > 0 && (
              <div style={{ ...styles.obsCard, backgroundColor: '#FFF3E0', borderColor: '#FFB74D' }}>
                <span style={styles.obsIcon}>📬</span>
                <p style={styles.obsText}>{pendingSubmissions.length} ficha(s) a aguardar avaliacao</p>
              </div>
            )}
            {totalActivities === 0 && (
              <div style={styles.obsCard}>
                <span style={styles.obsIcon}>🌱</span>
                <p style={styles.obsText}>Ainda nao completou actividades. O inicio da jornada!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'fichas' && (
        <div style={styles.section} className="animate-fade-in">
          <h3 style={styles.subTitle}>Fichas Pendentes</h3>
          {pendingSubmissions.length === 0 ? (
            <div style={styles.emptyState}>
              <span style={styles.emptyEmoji}>✅</span>
              <p style={styles.emptyText}>Nao ha fichas pendentes de avaliacao.</p>
            </div>
          ) : (
            <div style={styles.submissionList}>
              {pendingSubmissions.map((sub) => {
                const ws = WORKSHEETS.find((w) => w.id === sub.worksheetId)
                return (
                  <button
                    key={sub.id}
                    style={styles.submissionCard}
                    onClick={() => setReviewingSubmission(sub)}
                  >
                    <div style={styles.subInfo}>
                      <span style={styles.subTitle2}>{ws?.title || sub.worksheetId}</span>
                      <span style={styles.subDate}>
                        {new Date(sub.date).toLocaleDateString('pt-PT')}
                      </span>
                    </div>
                    <span style={styles.subAction}>Avaliar →</span>
                  </button>
                )
              })}
            </div>
          )}

          {reviewedSubmissions.length > 0 && (
            <>
              <h3 style={{ ...styles.subTitle, marginTop: 'var(--space-lg)' }}>Historico</h3>
              <div style={styles.submissionList}>
                {reviewedSubmissions
                  .sort((a, b) => new Date(b.reviewedAt) - new Date(a.reviewedAt))
                  .slice(0, 10)
                  .map((sub) => {
                    const ws = WORKSHEETS.find((w) => w.id === sub.worksheetId)
                    return (
                      <div key={sub.id} style={styles.reviewedCard}>
                        <div style={styles.subInfo}>
                          <span style={styles.subTitle2}>{ws?.title || sub.worksheetId}</span>
                          <span style={styles.subDate}>
                            {new Date(sub.reviewedAt).toLocaleDateString('pt-PT')}
                          </span>
                        </div>
                        <div style={styles.reviewedStars}>
                          {[1, 2, 3].map((n) => (
                            <span key={n} style={{ opacity: n <= sub.stars ? 1 : 0.2 }}>⭐</span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'palavras' && (
        <div style={styles.section} className="animate-fade-in">
          <h3 style={styles.subTitle}>Vocabulario por Categoria</h3>
          <p style={styles.sectionDesc}>
            {wordsLearned.length} de {VOCABULARY_WORDS.length} palavras aprendidas
          </p>
          <div style={styles.vocabList}>
            {wordsByCategory.map((cat) => {
              const pct = Math.round((cat.learned / cat.total) * 100) || 0
              return (
                <div key={cat.id} style={styles.vocabCard}>
                  <div style={styles.vocabHeader}>
                    <span>{cat.icon} {cat.label}</span>
                    <span style={styles.vocabCount}>{cat.learned}/{cat.total}</span>
                  </div>
                  <div style={styles.vocabBar}>
                    <div style={{ ...styles.vocabFill, width: `${pct}%`, backgroundColor: cat.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
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
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  backBtn: {
    alignSelf: 'flex-start',
    padding: 'var(--space-sm) var(--space-md)',
    color: 'var(--color-text-secondary)',
    fontWeight: 600,
    fontSize: 'var(--font-size-base)',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontFamily: 'inherit',
  },
  pageTitle: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  pageDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  dateText: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  tabs: {
    display: 'flex',
    gap: 'var(--space-xs)',
  },
  tab: {
    flex: 1,
    padding: 'var(--space-sm)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'inherit',
    textAlign: 'center',
    transition: 'all 0.2s',
  },
  tabActive: {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    borderColor: 'var(--color-primary)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  sectionDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    marginTop: '-8px',
  },
  subTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-sm)',
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
  },
  statEmoji: {
    fontSize: '1.5rem',
  },
  statNumber: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
    color: 'var(--color-primary)',
  },
  statLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
  },
  campoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  campoCard: {
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  campoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
  },
  campoPct: {
    color: 'var(--color-text-secondary)',
  },
  campoBar: {
    height: '6px',
    backgroundColor: 'var(--color-border)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  campoFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.6s ease',
  },
  observationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  obsCard: {
    display: 'flex',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-md)',
    border: '1px solid #A5D6A7',
    alignItems: 'flex-start',
  },
  obsIcon: {
    fontSize: '1.2rem',
    flexShrink: 0,
  },
  obsText: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
    lineHeight: 1.4,
  },
  // Fichas review
  submissionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  submissionCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--space-md)',
    backgroundColor: '#FFF3E0',
    borderRadius: 'var(--radius-md)',
    border: '2px solid #FFB74D',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  subInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  subTitle2: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
  },
  subDate: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  subAction: {
    fontWeight: 700,
    color: '#E65100',
    fontSize: 'var(--font-size-sm)',
  },
  reviewedCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
  },
  reviewedStars: {
    display: 'flex',
    gap: '2px',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-xl)',
  },
  emptyEmoji: {
    fontSize: '3rem',
  },
  emptyText: {
    textAlign: 'center',
    color: 'var(--color-text-secondary)',
  },
  // Review form
  reviewPhoto: {
    width: '100%',
    maxWidth: '400px',
    borderRadius: 'var(--radius-md)',
    border: '3px solid var(--color-primary)',
    alignSelf: 'center',
  },
  noPhotoBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-lg)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
  },
  noPhotoEmoji: {
    fontSize: '3rem',
  },
  noPhotoText: {
    color: 'var(--color-text-secondary)',
  },
  ratingSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  ratingLabel: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
  },
  starsRow: {
    display: 'flex',
    gap: 'var(--space-md)',
  },
  starBtn: {
    fontSize: '2.5rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: 'var(--space-xs)',
    transition: 'transform 0.2s',
  },
  ratingHint: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontStyle: 'italic',
  },
  feedbackSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  feedbackLabel: {
    fontWeight: 600,
    fontSize: 'var(--font-size-sm)',
  },
  feedbackInput: {
    padding: 'var(--space-md)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
    outline: 'none',
    resize: 'vertical',
  },
  submitReviewBtn: {
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
  },
  // Vocabulary
  vocabList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  vocabCard: {
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  vocabHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
  },
  vocabCount: {
    color: 'var(--color-text-secondary)',
  },
  vocabBar: {
    height: '6px',
    backgroundColor: 'var(--color-border)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  vocabFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.6s ease',
  },
}
