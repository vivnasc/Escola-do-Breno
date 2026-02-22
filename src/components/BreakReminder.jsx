/**
 * Break reminder overlay — triggered by the adaptive system
 * when the child has been playing for too long based on their
 * attention profile settings.
 */
export default function BreakReminder({ onDismiss, onEnd, name }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.card} className="animate-scale-in">
        <span style={styles.emoji}>🧘</span>
        <h2 style={styles.title}>Hora de uma pausa!</h2>
        <p style={styles.text}>
          {name || 'Campeao'}, ja jogaste bastante. Que tal levantar, beber agua, ou simplesmente descansar os olhos?
        </p>
        <div style={styles.tips}>
          <div style={styles.tip}>💧 Bebe um copo de agua</div>
          <div style={styles.tip}>🚶 Levanta e estica o corpo</div>
          <div style={styles.tip}>👁️ Olha pela janela 20 segundos</div>
        </div>
        <div style={styles.actions}>
          <button style={styles.continueBtn} onClick={onDismiss}>
            Estou pronto, continuar!
          </button>
          <button style={styles.endBtn} onClick={onEnd}>
            Vou descansar
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(46, 125, 50, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 300,
    padding: 'var(--space-md)',
  },
  card: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-xl)',
    maxWidth: '380px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    textAlign: 'center',
  },
  emoji: {
    fontSize: '4rem',
  },
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-primary-dark)',
  },
  text: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    lineHeight: 1.5,
  },
  tips: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
    width: '100%',
  },
  tip: {
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-sm)',
    fontWeight: 500,
    fontSize: 'var(--font-size-sm)',
    textAlign: 'left',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
    width: '100%',
    marginTop: 'var(--space-sm)',
  },
  continueBtn: {
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
  endBtn: {
    padding: 'var(--space-sm)',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 500,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
}
