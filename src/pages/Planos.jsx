import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TIERS, TIER_ORDER } from '../data/tiers'
import PayPalSubscribeButton from '../components/PayPalSubscribeButton'

/**
 * Pricing page — shows the 3 tiers with features and CTAs.
 * Gentle, informative, non-aggressive.
 * PayPal buttons appear when user clicks "Escolher".
 */
export default function Planos({ currentTier, onSubscribed }) {
  const navigate = useNavigate()
  const tierId = currentTier || 'free'
  const [expandedTier, setExpandedTier] = useState(null)

  const handleSubscribed = (data) => {
    onSubscribed?.(data)
    setExpandedTier(null)
  }

  return (
    <div style={styles.container} className="animate-fade-in">
      <header style={styles.header}>
        <h1 style={styles.title}>Planos</h1>
        <p style={styles.subtitle}>
          Escolhe o plano que melhor se adapta à tua família.
          Todas as crianças merecem aprender ao seu ritmo.
        </p>
      </header>

      <div style={styles.grid}>
        {TIER_ORDER.map((id) => {
          const tier = TIERS[id]
          const isCurrent = id === tierId
          const isPopular = id === 'family'

          return (
            <div
              key={id}
              style={{
                ...styles.card,
                borderColor: isPopular ? tier.color : 'var(--color-border)',
                ...(isPopular ? styles.cardPopular : {}),
              }}
            >
              {isPopular && (
                <span style={{ ...styles.popularBadge, backgroundColor: tier.color }}>
                  Mais popular
                </span>
              )}

              <span style={styles.emoji}>{tier.emoji}</span>
              <h2 style={{ ...styles.tierName, color: tier.color }}>{tier.name}</h2>
              <p style={styles.tierDesc}>{tier.description}</p>

              <div style={styles.priceRow}>
                {tier.price === 0 ? (
                  <span style={styles.priceFree}>Grátis</span>
                ) : (
                  <>
                    <span style={styles.priceAmount}>{tier.price.toFixed(2).replace('.', ',')}€</span>
                    <span style={styles.pricePeriod}>/mês</span>
                  </>
                )}
              </div>

              <div style={styles.features}>
                {tier.features.map((f) => (
                  <div key={f} style={styles.featureRow}>
                    <span style={{ ...styles.check, color: tier.color }}>✓</span>
                    <span style={styles.featureText}>{f}</span>
                  </div>
                ))}
                {tier.limitations.map((l) => (
                  <div key={l} style={styles.featureRow}>
                    <span style={styles.cross}>✕</span>
                    <span style={styles.limitationText}>{l}</span>
                  </div>
                ))}
              </div>

              {isCurrent ? (
                <div style={{ ...styles.currentBadge, borderColor: tier.color, color: tier.color }}>
                  Plano actual
                </div>
              ) : id === 'free' ? (
                <div style={styles.freeNote}>Sempre disponível</div>
              ) : expandedTier === id ? (
                <div style={styles.paypalSection}>
                  <PayPalSubscribeButton
                    tierId={id}
                    onSubscribed={handleSubscribed}
                  />
                  <button
                    style={styles.cancelBtn}
                    onClick={() => setExpandedTier(null)}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  style={{ ...styles.upgradeBtn, backgroundColor: tier.color }}
                  onClick={() => setExpandedTier(id)}
                >
                  Escolher {tier.name}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <section style={styles.faq}>
        <h2 style={styles.faqTitle}>Perguntas Frequentes</h2>

        <div style={styles.faqItem}>
          <h3 style={styles.faqQ}>O plano grátis é limitado?</h3>
          <p style={styles.faqA}>
            Não. O plano Semente inclui 6 actividades reais (1 por campo) com progressão
            completa nos 10 níveis. A criança aprende de verdade, sem limites de tempo.
          </p>
        </div>

        <div style={styles.faqItem}>
          <h3 style={styles.faqQ}>A acessibilidade é paga?</h3>
          <p style={styles.faqA}>
            Nunca. Alto contraste, instruções por voz, detecção de frustração,
            Banco da Calma — tudo gratuito, em todos os planos.
          </p>
        </div>

        <div style={styles.faqItem}>
          <h3 style={styles.faqQ}>Posso cancelar a qualquer momento?</h3>
          <p style={styles.faqA}>
            Sim. Sem período mínimo, sem penalizações. Se cancelares, manténs
            o acesso até ao fim do período pago e depois volta ao plano Semente.
          </p>
        </div>

        <div style={styles.faqItem}>
          <h3 style={styles.faqQ}>Os dados do meu filho ficam seguros?</h3>
          <p style={styles.faqA}>
            Os dados ficam no dispositivo. Com conta cloud, ficam encriptados no Supabase.
            Zero publicidade, zero venda de dados. Sempre.
          </p>
        </div>

        <div style={styles.faqItem}>
          <h3 style={styles.faqQ}>Como funciona a comunidade?</h3>
          <p style={styles.faqA}>
            O mural familiar está disponível em todos os planos — pais enviam mensagens de encorajamento.
            A comunidade social entre famílias (rankings gentis, conquistas partilhadas) é exclusiva dos planos
            Flor e Floresta, e é sempre opcional. Cada família escolhe se quer participar.
          </p>
        </div>
      </section>

      <button style={styles.backBtn} onClick={() => navigate('/')}>
        Voltar à escola
      </button>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xl)',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
  },
  title: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  subtitle: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.5,
    marginTop: 'var(--space-sm)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 'var(--space-md)',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-xl)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid',
    borderRadius: 'var(--radius-lg)',
    position: 'relative',
    textAlign: 'center',
  },
  cardPopular: {
    boxShadow: '0 4px 20px rgba(21, 101, 192, 0.15)',
  },
  popularBadge: {
    position: 'absolute',
    top: '-12px',
    padding: '4px 12px',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.65rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  emoji: {
    fontSize: '3rem',
  },
  tierName: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
  },
  tierDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '2px',
  },
  priceFree: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
    color: '#4CAF50',
  },
  priceAmount: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  pricePeriod: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
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
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    flexShrink: 0,
  },
  cross: {
    color: '#BDBDBD',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    flexShrink: 0,
  },
  featureText: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 500,
    color: 'var(--color-text)',
  },
  limitationText: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 500,
    color: '#BDBDBD',
    textDecoration: 'line-through',
  },
  upgradeBtn: {
    width: '100%',
    padding: 'var(--space-md)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
    marginTop: 'auto',
  },
  currentBadge: {
    width: '100%',
    padding: 'var(--space-sm)',
    border: '2px solid',
    borderRadius: 'var(--radius-md)',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    textAlign: 'center',
    marginTop: 'auto',
  },
  freeNote: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
    marginTop: 'auto',
  },
  faq: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    backgroundColor: '#F5F5F5',
    borderRadius: 'var(--radius-lg)',
  },
  faqTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-text)',
    textAlign: 'center',
  },
  faqItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  faqQ: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  faqA: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.5,
  },
  paypalSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
    marginTop: 'auto',
  },
  cancelBtn: {
    padding: 'var(--space-xs)',
    backgroundColor: 'transparent',
    color: 'var(--color-text-secondary)',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
  },
  backBtn: {
    alignSelf: 'center',
    padding: 'var(--space-sm) var(--space-lg)',
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    border: '2px solid var(--color-primary)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
  },
}
