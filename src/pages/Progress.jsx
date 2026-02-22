import { useCallback } from 'react'
import { CAMPO_INFO } from '../data/activities'
import { VOCABULARY_WORDS, VOCABULARY_CATEGORIES } from '../data/vocabulary'
import ProgressBar from '../components/ProgressBar'

export default function Progress({ progress, profile }) {
  const learnedSet = new Set(progress.wordsLearned)
  const playerName = profile?.name || 'Jogador'

  const generateReport = useCallback(() => {
    const date = new Date().toLocaleDateString('pt-PT')
    const totalActivities = Object.keys(progress.activitiesCompleted).length
    const totalWords = progress.wordsLearned.length

    const campoDetails = CAMPO_INFO.map((campo) => {
      const cp = progress.campoProgress[campo.id]
      const pct = cp.total > 0 ? Math.round((cp.completed / cp.total) * 100) : 0
      return `  ${campo.icon} ${campo.name} (${campo.subtitle}): ${pct}% completo (${cp.completed}/${cp.total})`
    }).join('\n')

    const vocabDetails = VOCABULARY_CATEGORIES.map((cat) => {
      const words = VOCABULARY_WORDS.filter((w) => w.category === cat.id)
      const learned = words.filter((w) => learnedSet.has(w.id))
      const learnedWords = learned.map((w) => w.en).join(', ') || 'nenhuma'
      return `  ${cat.icon} ${cat.labelPt}: ${learned.length}/${words.length} - ${learnedWords}`
    }).join('\n')

    const trophyList = progress.trophies.length > 0
      ? progress.trophies.map((t) => `  🏆 ${t.name}`).join('\n')
      : '  Nenhum trofeu ainda'

    const report = `
╔══════════════════════════════════════════╗
║     RELATORIO DE PROGRESSO - PITCH       ║
║     A Escola do ${playerName.padEnd(24)}║
╚══════════════════════════════════════════╝

Data: ${date}
Jogador: ${playerName}
${profile?.age ? `Idade: ${profile.age} anos` : ''}
${profile?.favoriteTeam ? `Equipa favorita: ${profile.favoriteTeam}` : ''}

━━━ RESUMO GERAL ━━━
  📝 Palavras aprendidas: ${totalWords}
  ⭐ Estrelas ganhas: ${progress.totalStars}
  🔥 Dias seguidos: ${progress.streakDays}
  ✅ Actividades completadas: ${totalActivities}/16

━━━ PROGRESSO POR CAMPO ━━━
${campoDetails}

━━━ VOCABULARIO INGLES ━━━
${vocabDetails}

━━━ TROFEUS ━━━
${trophyList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gerado por PITCH - Play. Interact. Think. Challenge. Hone.
${date}
`.trim()

    // Create and download the report
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `PITCH-Relatorio-${playerName}-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [progress, profile, playerName, learnedSet])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <div style={styles.container} className="animate-fade-in">
      <header style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>Progresso</h1>
          <p style={styles.subtitle}>Ecra para pais e terapeutas</p>
        </div>
        <div style={styles.exportBtns} className="no-print">
          <button style={styles.exportBtn} onClick={generateReport}>
            📥 Exportar
          </button>
          <button style={styles.printBtn} onClick={handlePrint}>
            🖨️ Imprimir
          </button>
        </div>
      </header>

      {profile?.name && (
        <div style={styles.profileCard}>
          <span style={styles.profileName}>Jogador: {playerName}</span>
          {profile.age && <span style={styles.profileDetail}>Idade: {profile.age} anos</span>}
          {profile.favoriteTeam && (
            <span style={styles.profileDetail}>Equipa: {profile.favoriteTeam}</span>
          )}
        </div>
      )}

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Resumo</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <span style={styles.cardValue}>{progress.wordsLearned.length}</span>
            <span style={styles.cardLabel}>Palavras aprendidas</span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardValue}>{progress.totalStars}</span>
            <span style={styles.cardLabel}>Estrelas ganhas</span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardValue}>{progress.streakDays}</span>
            <span style={styles.cardLabel}>Dias seguidos</span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardValue}>
              {Object.keys(progress.activitiesCompleted).length}
            </span>
            <span style={styles.cardLabel}>Actividades feitas</span>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Campos</h2>
        {CAMPO_INFO.map((campo) => {
          const cp = progress.campoProgress[campo.id]
          return (
            <div key={campo.id} style={styles.campoRow}>
              <div style={styles.campoInfo}>
                <span>{campo.icon}</span>
                <span style={styles.campoName}>{campo.name}</span>
                <span style={styles.campoPct}>
                  {cp.total > 0 ? Math.round((cp.completed / cp.total) * 100) : 0}%
                </span>
              </div>
              <ProgressBar value={cp.completed} max={cp.total} color={campo.color} />
            </div>
          )
        })}
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Vocabulario Ingles</h2>
        {VOCABULARY_CATEGORIES.map((cat) => {
          const words = VOCABULARY_WORDS.filter((w) => w.category === cat.id)
          const learned = words.filter((w) => learnedSet.has(w.id))
          return (
            <div key={cat.id} style={styles.vocabRow}>
              <div style={styles.vocabHeader}>
                <span>
                  {cat.icon} {cat.labelPt}
                </span>
                <span style={styles.vocabCount}>
                  {learned.length}/{words.length}
                </span>
              </div>
              <div style={styles.wordTags}>
                {words.map((w) => (
                  <span
                    key={w.id}
                    style={{
                      ...styles.wordTag,
                      backgroundColor: learnedSet.has(w.id) ? '#E8F5E9' : '#F5F5F5',
                      color: learnedSet.has(w.id) ? '#2E7D32' : '#9E9E9E',
                      borderColor: learnedSet.has(w.id) ? '#A5D6A7' : '#E0E0E0',
                    }}
                  >
                    {w.en}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {progress.trophies.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Trofeus</h2>
          <div style={styles.trophyGrid}>
            {progress.trophies.map((t) => (
              <div key={t.id} style={styles.trophy}>
                <span style={styles.trophyIcon}>🏆</span>
                <span style={styles.trophyName}>{t.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xl)',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  subtitle: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    marginTop: '-4px',
  },
  exportBtns: {
    display: 'flex',
    gap: 'var(--space-xs)',
  },
  exportBtn: {
    padding: 'var(--space-xs) var(--space-sm)',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
  },
  printBtn: {
    padding: 'var(--space-xs) var(--space-sm)',
    backgroundColor: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: 'var(--space-md)',
    backgroundColor: '#E3F2FD',
    borderRadius: 'var(--radius-md)',
    borderLeft: '4px solid #1565C0',
  },
  profileName: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
  },
  profileDetail: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  sectionTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--space-md)',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-xs)',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
  },
  cardValue: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
    color: 'var(--color-primary)',
  },
  cardLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
  },
  campoRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  campoInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  campoName: {
    fontWeight: 600,
    flex: 1,
  },
  campoPct: {
    fontWeight: 700,
    color: 'var(--color-primary)',
    fontSize: 'var(--font-size-sm)',
  },
  vocabRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  vocabHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 600,
  },
  vocabCount: {
    color: 'var(--color-text-secondary)',
    fontSize: 'var(--font-size-sm)',
  },
  wordTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-xs)',
  },
  wordTag: {
    padding: '2px 8px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--font-size-sm)',
    border: '1px solid',
    fontWeight: 500,
  },
  trophyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--space-md)',
  },
  trophy: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-xs)',
  },
  trophyIcon: {
    fontSize: '2rem',
  },
  trophyName: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    textAlign: 'center',
  },
}
