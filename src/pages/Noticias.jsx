import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { NEWS_TEMPLATES, personalizeNews } from '../data/news'
import { useTTS } from '../hooks/useTTS'

const CATEGORY_FILTERS = [
  { id: 'all', label: 'Todas', icon: '📰' },
  { id: 'language', label: 'Linguas', icon: '🗣️' },
  { id: 'math', label: 'Matematica', icon: '🔢' },
  { id: 'geography', label: 'Geografia', icon: '🌍' },
  { id: 'science', label: 'Ciencia', icon: '🫀' },
  { id: 'life-skills', label: 'Vida', icon: '🤝' },
]

export default function Noticias({ profile }) {
  const navigate = useNavigate()
  const { speak } = useTTS()
  const [filter, setFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const [answeredQuestions, setAnsweredQuestions] = useState({})

  const news = useMemo(
    () => personalizeNews(NEWS_TEMPLATES, profile || {}),
    [profile]
  )

  const filtered = filter === 'all' ? news : news.filter((n) => n.category === filter)

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleAnswer = (newsId) => {
    setAnsweredQuestions((prev) => ({ ...prev, [newsId]: true }))
  }

  return (
    <div style={styles.container} className="animate-fade-in">
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>
            Noticias do {profile?.name || 'Jogador'}
          </h1>
          <p style={styles.subtitle}>Aprende com as noticias de futebol!</p>
        </div>
        <span style={styles.headerEmoji}>📰</span>
      </header>

      <div style={styles.filterRow}>
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat.id}
            style={{
              ...styles.filterBtn,
              ...(filter === cat.id ? styles.filterBtnActive : {}),
            }}
            onClick={() => setFilter(cat.id)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      <div style={styles.newsList}>
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id
          const isAnswered = answeredQuestions[item.id]

          return (
            <article
              key={item.id}
              style={styles.newsCard}
            >
              <button
                style={styles.newsHeader}
                onClick={() => handleExpand(item.id)}
              >
                <span style={styles.newsIcon}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={styles.newsHeadline}>{item.headline}</h3>
                  <span style={styles.newsCampo}>
                    {item.category === 'language' && '🗣️ Linguagem'}
                    {item.category === 'math' && '🔢 Matematica'}
                    {item.category === 'geography' && '🌍 Geografia'}
                    {item.category === 'science' && '🫀 Ciencia'}
                    {item.category === 'life-skills' && '🤝 Vida'}
                  </span>
                </div>
                <span style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</span>
              </button>

              {isExpanded && (
                <div style={styles.newsBody} className="animate-slide-up">
                  <p style={styles.newsText}>{item.body}</p>

                  <div style={styles.factBox}>
                    <span style={styles.factLabel}>Sabias que?</span>
                    <p style={styles.factText}>{item.fact}</p>
                  </div>

                  <div style={styles.englishBox}>
                    <span style={styles.englishLabel}>Palavra em Ingles</span>
                    <div style={styles.englishRow}>
                      <span style={styles.englishWord}>{item.english}</span>
                      <span style={styles.englishPt}>= {item.englishPt}</span>
                      <button
                        style={styles.listenBtn}
                        onClick={() => speak(item.english, { lang: 'en-GB' })}
                      >
                        🔊
                      </button>
                    </div>
                  </div>

                  {!isAnswered ? (
                    <div style={styles.questionBox}>
                      <p style={styles.questionText}>{item.question}</p>
                      <button
                        style={styles.answerBtn}
                        onClick={() => handleAnswer(item.id)}
                      >
                        Sei a resposta!
                      </button>
                    </div>
                  ) : (
                    <div style={styles.answeredBox}>
                      <span style={styles.answeredEmoji}>⭐</span>
                      <span style={styles.answeredText}>Boa, campeao!</span>
                    </div>
                  )}

                  <button
                    style={styles.goToActivityBtn}
                    onClick={() => navigate(`/${item.campo?.replace('campo', 'campo/')}`)}
                  >
                    Ir para actividades →
                  </button>
                </div>
              )}
            </article>
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
  headerEmoji: {
    fontSize: '2.5rem',
  },
  filterRow: {
    display: 'flex',
    gap: 'var(--space-xs)',
    overflowX: 'auto',
    paddingBottom: 'var(--space-xs)',
  },
  filterBtn: {
    padding: 'var(--space-xs) var(--space-sm)',
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
  filterBtnActive: {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    borderColor: 'var(--color-primary)',
  },
  newsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  newsCard: {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
  },
  newsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    textAlign: 'left',
    fontFamily: 'inherit',
  },
  newsIcon: {
    fontSize: '1.8rem',
  },
  newsHeadline: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    lineHeight: 1.3,
  },
  newsCampo: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  expandIcon: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  newsBody: {
    padding: '0 var(--space-md) var(--space-md)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  newsText: {
    fontSize: 'var(--font-size-base)',
    lineHeight: 1.5,
    color: 'var(--color-text)',
  },
  factBox: {
    padding: 'var(--space-md)',
    backgroundColor: '#FFF8E1',
    borderRadius: 'var(--radius-sm)',
    borderLeft: '3px solid #FFD54F',
  },
  factLabel: {
    fontWeight: 700,
    fontSize: 'var(--font-size-sm)',
    color: '#F57F17',
    display: 'block',
    marginBottom: '4px',
  },
  factText: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
    lineHeight: 1.4,
  },
  englishBox: {
    padding: 'var(--space-md)',
    backgroundColor: '#E3F2FD',
    borderRadius: 'var(--radius-sm)',
    borderLeft: '3px solid #1565C0',
  },
  englishLabel: {
    fontWeight: 700,
    fontSize: 'var(--font-size-sm)',
    color: '#1565C0',
    display: 'block',
    marginBottom: '6px',
  },
  englishRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  englishWord: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: '#1565C0',
  },
  englishPt: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
  },
  listenBtn: {
    padding: 'var(--space-xs)',
    border: 'none',
    background: 'none',
    fontSize: '1.3rem',
    cursor: 'pointer',
  },
  questionBox: {
    padding: 'var(--space-md)',
    backgroundColor: '#F3E5F5',
    borderRadius: 'var(--radius-sm)',
    borderLeft: '3px solid #6A1B9A',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  questionText: {
    fontWeight: 600,
    color: '#6A1B9A',
  },
  answerBtn: {
    alignSelf: 'flex-start',
    padding: 'var(--space-xs) var(--space-md)',
    backgroundColor: '#6A1B9A',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'inherit',
  },
  answeredBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-sm)',
  },
  answeredEmoji: {
    fontSize: '1.5rem',
  },
  answeredText: {
    fontWeight: 700,
    color: 'var(--color-primary)',
  },
  goToActivityBtn: {
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    textAlign: 'center',
  },
}
