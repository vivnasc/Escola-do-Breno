import { useState, useEffect } from 'react'

const PHASES = ['Inspira...', 'Segura...', 'Expira...']
const PHASE_DURATIONS = [4000, 2000, 4000]

export default function BancoDaCalma({ onClose }) {
  const [phase, setPhase] = useState(0)
  const [cycles, setCycles] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextPhase = (phase + 1) % 3
      setPhase(nextPhase)
      if (nextPhase === 0) setCycles((c) => c + 1)
    }, PHASE_DURATIONS[phase])
    return () => clearTimeout(timer)
  }, [phase])

  const scale = phase === 0 ? 1.3 : phase === 1 ? 1.3 : 0.8

  return (
    <div style={styles.overlay} role="dialog" aria-label="Banco da Calma">
      <div style={styles.container} className="animate-fade-in">
        <div style={styles.field}>
          <div style={styles.fieldLines}>
            <div style={styles.centerCircle} />
          </div>
        </div>

        <div
          style={{
            ...styles.breathCircle,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        />

        <p style={styles.phaseText}>{PHASES[phase]}</p>

        <p style={styles.message}>
          Respira devagar. Estas num campo tranquilo.
        </p>

        {cycles >= 2 && (
          <div style={styles.buttons}>
            <button style={styles.continueBtn} onClick={onClose}>
              Estou pronto para continuar
            </button>
            <button style={styles.changeBtn} onClick={onClose}>
              Quero mudar de actividade
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(30, 70, 32, 0.95)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: '400px',
    padding: 'var(--space-xl)',
    textAlign: 'center',
    position: 'relative',
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-xl)',
  },
  field: {
    position: 'absolute',
    inset: 0,
    opacity: 0.15,
    overflow: 'hidden',
  },
  fieldLines: {
    position: 'absolute',
    inset: '10%',
    border: '2px solid white',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCircle: {
    width: '120px',
    height: '120px',
    border: '2px solid white',
    borderRadius: '50%',
  },
  breathCircle: {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '3px solid rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    top: '40%',
    left: '50%',
    transition: 'transform 3s ease-in-out',
  },
  phaseText: {
    color: 'white',
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
    marginTop: '120px',
  },
  message: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 'var(--font-size-lg)',
    lineHeight: 1.6,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    width: '100%',
  },
  continueBtn: {
    padding: 'var(--space-md) var(--space-lg)',
    backgroundColor: 'white',
    color: 'var(--color-primary-dark)',
    borderRadius: 'var(--radius-md)',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    border: 'none',
    cursor: 'pointer',
  },
  changeBtn: {
    padding: 'var(--space-md) var(--space-lg)',
    backgroundColor: 'transparent',
    color: 'white',
    borderRadius: 'var(--radius-md)',
    fontWeight: 600,
    fontSize: 'var(--font-size-base)',
    border: '2px solid rgba(255,255,255,0.4)',
    cursor: 'pointer',
  },
}
