import { useNavigate } from 'react-router-dom'
import { useTTS } from '../hooks/useTTS'
import { useEffect } from 'react'

export default function ActivityShell({
  title,
  instruction,
  color = 'var(--color-primary)',
  backPath,
  children,
  score,
  total,
}) {
  const navigate = useNavigate()
  const { speak } = useTTS()

  useEffect(() => {
    if (instruction) {
      const timer = setTimeout(() => speak(instruction), 500)
      return () => clearTimeout(timer)
    }
  }, [instruction, speak])

  return (
    <div style={styles.container} className="animate-fade-in">
      <header style={styles.header}>
        <button
          style={styles.backBtn}
          onClick={() => navigate(backPath || -1)}
          aria-label="Voltar"
        >
          ← Voltar
        </button>
        {score !== undefined && (
          <span style={styles.score}>
            {score}/{total}
          </span>
        )}
      </header>

      <h2 style={{ ...styles.title, color }}>{title}</h2>

      {instruction && (
        <button
          style={styles.instruction}
          onClick={() => speak(instruction)}
          aria-label={`Ouvir instrucao: ${instruction}`}
        >
          🔊 {instruction}
        </button>
      )}

      <div style={styles.content}>{children}</div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    minHeight: 'calc(100vh - 100px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    padding: 'var(--space-sm) var(--space-md)',
    color: 'var(--color-text-secondary)',
    fontWeight: 600,
    fontSize: 'var(--font-size-base)',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
  },
  score: {
    padding: 'var(--space-xs) var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-sm)',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
  },
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    textAlign: 'center',
  },
  instruction: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    cursor: 'pointer',
    textAlign: 'left',
    lineHeight: 1.4,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
}
