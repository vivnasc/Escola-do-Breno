import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { WORKSHEET_CATEGORIES, WORKSHEETS } from '../data/worksheets'

export default function Fichas({ profile, progress, submitWorksheet }) {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [activeWorksheet, setActiveWorksheet] = useState(null)
  const [photoMode, setPhotoMode] = useState(false)
  const [photoTaken, setPhotoTaken] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef(null)
  const [photoPreview, setPhotoPreview] = useState(null)

  const submissions = profile?.worksheetSubmissions || []

  const filteredSheets = selectedCategory
    ? WORKSHEETS.filter((ws) => ws.category === selectedCategory)
    : WORKSHEETS

  const handlePrint = (ws) => {
    setActiveWorksheet(ws)
    setTimeout(() => window.print(), 300)
  }

  const handlePhotoCapture = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      setPhotoPreview(ev.target.result)
      setPhotoTaken(true)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (activeWorksheet) {
      submitWorksheet?.(activeWorksheet.id, photoPreview)
    }
    setSubmitted(true)
  }

  const handleSubmitWithoutPhoto = () => {
    if (activeWorksheet) {
      submitWorksheet?.(activeWorksheet.id, null)
    }
    setSubmitted(true)
  }

  const handleBack = () => {
    if (submitted) {
      setSubmitted(false)
      setPhotoTaken(false)
      setPhotoPreview(null)
      setPhotoMode(false)
      setActiveWorksheet(null)
    } else if (photoMode) {
      setPhotoMode(false)
      setPhotoTaken(false)
      setPhotoPreview(null)
    } else if (activeWorksheet) {
      setActiveWorksheet(null)
    } else if (selectedCategory) {
      setSelectedCategory(null)
    } else {
      navigate('/')
    }
  }

  // Submission result
  if (submitted) {
    const latestReview = submissions
      .filter((s) => s.worksheetId === activeWorksheet?.id && s.status === 'reviewed')
      .sort((a, b) => new Date(b.reviewedAt) - new Date(a.reviewedAt))[0]

    return (
      <div style={styles.container} className="animate-fade-in">
        <button style={styles.backBtn} onClick={handleBack}>← Voltar</button>
        <div style={styles.resultBox}>
          <span style={styles.resultEmoji}>📬</span>
          <h2 style={styles.resultTitle}>Ficha enviada!</h2>
          <p style={styles.resultText}>
            Muito bem, {profile?.name || 'Jogador'}! A tua ficha foi guardada
            para o teu pai ou terapeuta avaliar.
          </p>
          {photoPreview && (
            <img src={photoPreview} alt="A tua ficha" style={styles.photoPreview} />
          )}
          {latestReview && (
            <div style={styles.reviewBox}>
              <p style={styles.reviewLabel}>Ultima avaliacao:</p>
              <div style={styles.starsRow}>
                {[1, 2, 3].map((s) => (
                  <span key={s} style={{
                    ...styles.star,
                    opacity: s <= latestReview.stars ? 1 : 0.2,
                  }}>⭐</span>
                ))}
              </div>
              {latestReview.feedback && (
                <p style={styles.reviewFeedback}>{latestReview.feedback}</p>
              )}
            </div>
          )}
          <button style={styles.actionBtn} onClick={handleBack}>
            Fazer outra ficha
          </button>
        </div>
      </div>
    )
  }

  // Photo capture mode
  if (photoMode) {
    return (
      <div style={styles.container} className="animate-fade-in">
        <button style={styles.backBtn} onClick={handleBack}>← Voltar</button>
        <div style={styles.photoSection}>
          <span style={styles.bigEmoji}>📸</span>
          <h2 style={styles.title}>Mostra a tua ficha!</h2>
          <p style={styles.desc}>
            Tira uma foto ou escolhe uma imagem da tua ficha completa.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {photoTaken ? (
            <div style={styles.previewSection}>
              {photoPreview && (
                <img src={photoPreview} alt="A tua ficha" style={styles.photoPreview} />
              )}
              <button style={styles.submitBtn} onClick={handleSubmit}>
                Enviar para avaliacao
              </button>
              <button style={styles.retakeBtn} onClick={() => { setPhotoTaken(false); setPhotoPreview(null) }}>
                Tirar outra foto
              </button>
            </div>
          ) : (
            <>
              <button style={styles.cameraBtn} onClick={handlePhotoCapture}>
                📷 Tirar Foto
              </button>
              <button
                style={styles.skipBtn}
                onClick={handleSubmitWithoutPhoto}
              >
                Completar sem foto
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  // Worksheet print view
  if (activeWorksheet) {
    const ws = activeWorksheet
    const wsSubmissions = submissions.filter((s) => s.worksheetId === ws.id)
    const hasReview = wsSubmissions.some((s) => s.status === 'reviewed')

    return (
      <div style={styles.container} className="animate-fade-in">
        <div className="no-print">
          <button style={styles.backBtn} onClick={handleBack}>← Voltar</button>
        </div>

        <div style={styles.worksheetView} id="printable-area">
          <div style={styles.wsHeader}>
            <h2 style={styles.wsTitle}>{ws.title}</h2>
            <p style={styles.wsSubtitle}>{ws.subtitle}</p>
            <div style={styles.wsNameLine}>
              Nome: {profile?.name || '_______________'} &nbsp; Data: ____/____/______
            </div>
          </div>

          {ws.lines.map((line, i) => (
            <div key={i} style={styles.wsLine}>
              <div style={styles.wsGuide}>
                <span style={styles.wsGuideText}>{line.guide}</span>
                <span style={styles.wsContext}>{line.context}</span>
              </div>
              <div style={styles.wsWriteArea}>
                <div style={styles.wsDottedLine} />
                <div style={styles.wsDottedLine} />
              </div>
            </div>
          ))}

          <div style={styles.wsFooter}>
            PITCH — A Escola do {profile?.name || 'Breno'}
          </div>
        </div>

        <div style={styles.wsActions} className="no-print">
          <button style={styles.printBtn} onClick={() => handlePrint(ws)}>
            🖨️ Imprimir Ficha
          </button>
          <button
            style={styles.photoBtn}
            onClick={() => setPhotoMode(true)}
          >
            📸 Ja completei! Enviar para avaliacao
          </button>
        </div>

        {hasReview && (
          <div style={styles.pastReviews} className="no-print">
            <p style={styles.pastReviewsTitle}>Avaliacoes anteriores:</p>
            {wsSubmissions
              .filter((s) => s.status === 'reviewed')
              .sort((a, b) => new Date(b.reviewedAt) - new Date(a.reviewedAt))
              .slice(0, 3)
              .map((s) => (
                <div key={s.id} style={styles.pastReviewCard}>
                  <div style={styles.starsRowSmall}>
                    {[1, 2, 3].map((n) => (
                      <span key={n} style={{ opacity: n <= s.stars ? 1 : 0.2 }}>⭐</span>
                    ))}
                  </div>
                  {s.feedback && <p style={styles.pastFeedback}>{s.feedback}</p>}
                  <span style={styles.pastDate}>
                    {new Date(s.reviewedAt).toLocaleDateString('pt')}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    )
  }

  // Category / worksheet list
  return (
    <div style={styles.container} className="animate-fade-in">
      <header style={styles.headerRow}>
        <div>
          <h1 style={styles.pageTitle}>Fichas de Escrita</h1>
          <p style={styles.pageDesc}>Imprime, escreve e envia para avaliacao!</p>
        </div>
        <span style={styles.headerEmoji}>✏️</span>
      </header>

      <div style={styles.catRow}>
        <button
          style={{
            ...styles.catBtn,
            ...(selectedCategory === null ? styles.catBtnActive : {}),
          }}
          onClick={() => setSelectedCategory(null)}
        >
          Todas
        </button>
        {WORKSHEET_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            style={{
              ...styles.catBtn,
              ...(selectedCategory === cat.id ? styles.catBtnActive : {}),
            }}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div style={styles.sheetList}>
        {filteredSheets.map((ws) => {
          const cat = WORKSHEET_CATEGORIES.find((c) => c.id === ws.category)
          const wsSubmissions = submissions.filter((s) => s.worksheetId === ws.id)
          const pendingCount = wsSubmissions.filter((s) => s.status === 'pending').length
          const reviewedCount = wsSubmissions.filter((s) => s.status === 'reviewed').length

          return (
            <button
              key={ws.id}
              style={{ ...styles.sheetCard, borderLeftColor: cat?.color || '#666' }}
              onClick={() => setActiveWorksheet(ws)}
            >
              <div style={styles.sheetTop}>
                <span style={styles.sheetIcon}>{cat?.icon}</span>
                <div style={{ flex: 1 }}>
                  <span style={styles.sheetTitle}>{ws.title}</span>
                  <span style={styles.sheetSubtitle}>{ws.subtitle}</span>
                </div>
                <div style={styles.statusCol}>
                  {reviewedCount > 0 && (
                    <span style={styles.statusReviewed}>⭐ {reviewedCount}x</span>
                  )}
                  {pendingCount > 0 && (
                    <span style={styles.statusPending}>📬 {pendingCount}</span>
                  )}
                  <div style={styles.difficultyDots}>
                    {[1, 2, 3].map((d) => (
                      <span
                        key={d}
                        style={{
                          ...styles.diffDot,
                          backgroundColor: d <= ws.difficulty ? cat?.color || '#666' : '#E0E0E0',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
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
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerEmoji: {
    fontSize: '2.5rem',
  },
  catRow: {
    display: 'flex',
    gap: 'var(--space-xs)',
    overflowX: 'auto',
    paddingBottom: 'var(--space-xs)',
  },
  catBtn: {
    padding: 'var(--space-xs) var(--space-md)',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontWeight: 500,
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
  },
  catBtnActive: {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    borderColor: 'var(--color-primary)',
  },
  sheetList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  sheetCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderLeft: '4px solid',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
    transition: 'box-shadow 0.2s',
  },
  sheetTop: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  sheetIcon: {
    fontSize: '1.5rem',
  },
  sheetTitle: {
    display: 'block',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
  },
  sheetSubtitle: {
    display: 'block',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  statusCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  },
  statusPending: {
    fontSize: 'var(--font-size-sm)',
    color: '#E65100',
    fontWeight: 600,
  },
  statusReviewed: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-primary)',
    fontWeight: 600,
  },
  difficultyDots: {
    display: 'flex',
    gap: '3px',
  },
  diffDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  // Worksheet view
  worksheetView: {
    backgroundColor: 'white',
    padding: 'var(--space-lg)',
    borderRadius: 'var(--radius-md)',
    border: '2px solid var(--color-border)',
  },
  wsHeader: {
    textAlign: 'center',
    marginBottom: 'var(--space-lg)',
    paddingBottom: 'var(--space-md)',
    borderBottom: '2px solid var(--color-text)',
  },
  wsTitle: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
  },
  wsSubtitle: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    marginTop: '4px',
  },
  wsNameLine: {
    marginTop: 'var(--space-md)',
    fontSize: 'var(--font-size-base)',
    textAlign: 'left',
    fontWeight: 500,
  },
  wsLine: {
    marginBottom: 'var(--space-lg)',
  },
  wsGuide: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 'var(--space-sm)',
  },
  wsGuideText: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: '#B0B0B0',
    letterSpacing: '4px',
  },
  wsContext: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontStyle: 'italic',
  },
  wsWriteArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-lg)',
  },
  wsDottedLine: {
    borderBottom: '2px dashed #BDBDBD',
    height: '30px',
  },
  wsFooter: {
    textAlign: 'center',
    marginTop: 'var(--space-xl)',
    paddingTop: 'var(--space-md)',
    borderTop: '1px solid var(--color-border)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  wsActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  printBtn: {
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
  photoBtn: {
    padding: 'var(--space-md)',
    backgroundColor: '#E65100',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
  },
  // Photo section
  photoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-xl)',
  },
  bigEmoji: {
    fontSize: '4rem',
  },
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    textAlign: 'center',
  },
  desc: {
    textAlign: 'center',
    color: 'var(--color-text-secondary)',
  },
  cameraBtn: {
    padding: 'var(--space-lg) var(--space-xl)',
    backgroundColor: '#E65100',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-lg)',
  },
  skipBtn: {
    padding: 'var(--space-sm) var(--space-lg)',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 500,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  previewSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
  },
  submitBtn: {
    padding: 'var(--space-md) var(--space-xl)',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
  },
  retakeBtn: {
    padding: 'var(--space-sm) var(--space-lg)',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 500,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  // Results
  resultBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-xl)',
  },
  resultEmoji: {
    fontSize: '4rem',
  },
  resultTitle: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
    color: 'var(--color-primary)',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.5,
  },
  reviewBox: {
    padding: 'var(--space-md)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-primary)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  reviewLabel: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
    color: 'var(--color-text-secondary)',
  },
  reviewFeedback: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    fontStyle: 'italic',
  },
  starsRow: {
    display: 'flex',
    gap: 'var(--space-sm)',
    justifyContent: 'center',
  },
  starsRowSmall: {
    display: 'flex',
    gap: '2px',
  },
  star: {
    fontSize: '2.5rem',
    transition: 'opacity 0.3s',
  },
  photoPreview: {
    width: '100%',
    maxWidth: '300px',
    borderRadius: 'var(--radius-md)',
    border: '3px solid var(--color-primary)',
  },
  actionBtn: {
    padding: 'var(--space-md) var(--space-xl)',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
  },
  pastReviews: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
    marginTop: 'var(--space-md)',
  },
  pastReviewsTitle: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
    color: 'var(--color-text-secondary)',
  },
  pastReviewCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-sm)',
  },
  pastFeedback: {
    flex: 1,
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
    fontStyle: 'italic',
  },
  pastDate: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
}
