import { useNavigate } from 'react-router-dom'
import { TIERS } from '../data/tiers'

/**
 * Modal overlay shown when a user tries to access locked content.
 * Gentle, non-punitive. Shows what they'd get by upgrading.
 */
export default function UpgradePrompt({ onClose, feature }) {
  const navigate = useNavigate()
  const familyTier = TIERS.family

  const featureLabels = {
    activity: 'Esta actividade',
    universe: 'Este universo',
    fichas: 'As fichas para impressão',
    desafios: 'Os desafios semanais',
    loja: 'A loja de cosméticos',
    dashboard: 'O painel do educador',
  }

  const label = featureLabels[feature] || 'Esta funcionalidade'

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        <span style={styles.emoji}>{familyTier.emoji}</span>

        <h2 style={styles.title}>{label} faz parte do plano {familyTier.name}</h2>

        <p style={styles.desc}>
          O plano Semente é gratuito e inclui 4 actividades com progressão completa.
          Para desbloquear tudo, experimenta o plano {familyTier.name}.
        </p>

        <div style={styles.features}>
          {familyTier.features.slice(0, 4).map((f) => (
            <div key={f} style={styles.featureRow}>
              <span style={styles.check}>✓</span>
              <span style={styles.featureText}>{f}</span>
            </div>
          ))}
        </div>

        <button
          style={styles.upgradeBtn}
          onClick={() => {
            onClose()
            navigate('/planos')
          }}
        >
          Ver planos — a partir de {familyTier.priceLabel}
        </button>

        <button style={styles.laterBtn} onClick={onClose}>
          Agora não
        </button>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 300,
    padding: 'var(--space-md)',
  },
  modal: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-xl)',
    maxWidth: '380px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    position: 'relative',
    textAlign: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 'var(--space-sm)',
    right: 'var(--space-sm)',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '1px solid var(--color-border)',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-secondary)',
  },
  emoji: {
    fontSize: '3rem',
  },
  title: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-text)',
    lineHeight: 1.3,
  },
  desc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.5,
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
    width: '100%',
    textAlign: 'left',
  },
  featureRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  check: {
    color: '#4CAF50',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    flexShrink: 0,
  },
  featureText: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-text)',
  },
  upgradeBtn: {
    width: '100%',
    padding: 'var(--space-md)',
    backgroundColor: '#1565C0',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
  },
  laterBtn: {
    padding: 'var(--space-sm)',
    backgroundColor: 'transparent',
    color: 'var(--color-text-secondary)',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
  },
}
