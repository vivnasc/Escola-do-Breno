/**
 * Welcome screen — shown on first launch.
 * Breno gets instant access ("Sou o Breno!").
 * Other children go through the full Intake.
 */
export default function Welcome({ onBreno, onNewProfile }) {
  return (
    <div style={styles.container} className="animate-fade-in">
      <div style={styles.content}>
        <img
          src="/logos/pitch-robo.png"
          alt="PITCH Robot"
          style={styles.mascot}
        />

        <img
          src="/logos/pitch-completo.png"
          alt="PITCH - Plataforma de Aprendizagem Inclusiva"
          style={styles.logo}
        />

        <p style={styles.tagline}>
          Play. Interact. Think. Challenge. Hone.
        </p>

        <div style={styles.actions}>
          <button
            style={styles.brenoBtn}
            onClick={onBreno}
          >
            <span style={styles.brenoBtnIcon}>⚽</span>
            <div>
              <span style={styles.brenoBtnTitle}>Sou o Breno!</span>
              <span style={styles.brenoBtnSub}>Entrar na minha escola</span>
            </div>
          </button>

          <button
            style={styles.newBtn}
            onClick={onNewProfile}
          >
            <span style={styles.newBtnIcon}>🌟</span>
            <div>
              <span style={styles.newBtnTitle}>Criar a minha escola</span>
              <span style={styles.newBtnSub}>Personalizar para outra crianca</span>
            </div>
          </button>
        </div>

        <p style={styles.footer}>
          Plataforma de aprendizagem inclusiva para criancas neurodivergentes
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    maxWidth: '480px',
    margin: '0 auto',
    backgroundColor: 'var(--color-surface)',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-xl)',
    textAlign: 'center',
  },
  mascot: {
    width: '120px',
    height: '120px',
    objectFit: 'contain',
  },
  logo: {
    width: '240px',
    maxWidth: '80%',
    objectFit: 'contain',
  },
  tagline: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
    letterSpacing: '0.5px',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    width: '100%',
    marginTop: 'var(--space-md)',
  },
  brenoBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    backgroundColor: '#E8F5E9',
    border: '3px solid var(--color-primary)',
    borderRadius: 'var(--radius-lg)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
    transition: 'all 0.2s',
  },
  brenoBtnIcon: {
    fontSize: '2.5rem',
    flexShrink: 0,
  },
  brenoBtnTitle: {
    display: 'block',
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-primary-dark)',
  },
  brenoBtnSub: {
    display: 'block',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    marginTop: '2px',
  },
  newBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-md) var(--space-lg)',
    backgroundColor: 'var(--color-bg)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
    transition: 'all 0.2s',
  },
  newBtnIcon: {
    fontSize: '2rem',
    flexShrink: 0,
  },
  newBtnTitle: {
    display: 'block',
    fontSize: 'var(--font-size-base)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  newBtnSub: {
    display: 'block',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    marginTop: '2px',
  },
  footer: {
    fontSize: '0.7rem',
    color: 'var(--color-text-secondary)',
    marginTop: 'var(--space-lg)',
    lineHeight: 1.4,
  },
}
