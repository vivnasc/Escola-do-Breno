/**
 * Support/Contact page.
 * Provides help resources, contact form placeholder, and common troubleshooting.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HELP_TOPICS = [
  {
    icon: '🚀',
    title: 'Começar',
    desc: 'Como criar uma escola, configurar o perfil, e fazer a avaliação inicial.',
    action: 'Ver FAQ',
    link: '/faq',
  },
  {
    icon: '🔧',
    title: 'Problemas Técnicos',
    desc: 'A app não abre, o áudio não funciona, ou os dados desapareceram.',
    action: 'Ver soluções',
    link: '#troubleshooting',
  },
  {
    icon: '📊',
    title: 'Progresso e Relatórios',
    desc: 'Como interpretar níveis, fases, e exportar relatórios para terapeutas.',
    action: 'Ver FAQ',
    link: '/faq',
  },
  {
    icon: '💬',
    title: 'Feedback e Sugestões',
    desc: 'Partilhar ideias para novas actividades, universos, ou melhorias.',
    action: 'Enviar mensagem',
    link: '#contact',
  },
]

const TROUBLESHOOTING = [
  {
    problem: 'A app não abre ou fica em branco',
    solution: 'Limpe a cache do browser (Ctrl+Shift+Delete) e recarregue. Se usar iOS Safari, vá a Definições > Safari > Limpar dados. Se o problema persistir, tente noutro browser (Chrome recomendado).',
  },
  {
    problem: 'O áudio/voz não funciona',
    solution: 'Verifique que o volume não está silenciado. O TTS (texto-para-voz) depende das vozes instaladas no dispositivo. No iOS, vá a Definições > Acessibilidade > Conteúdo Falado. No Android, verifique Google TTS nas definições.',
  },
  {
    problem: 'Os dados desapareceram',
    solution: 'Os dados ficam no browser (IndexedDB). Se limpou a cache ou usou modo privado, os dados podem ter sido apagados. Recomendamos activar a sincronização cloud (Supabase) ou fazer backups regulares nas Definições > Exportar.',
  },
  {
    problem: 'O reconhecimento de fala não funciona',
    solution: 'O STT (fala-para-texto) requer internet e um browser compatível (Chrome/Edge). Verifique as permissões do microfone. O Safari tem suporte limitado. Se não funcionar, as actividades continuam a funcionar sem esta funcionalidade.',
  },
  {
    problem: 'A app está lenta',
    solution: 'Feche outros separadores do browser. Se usar um dispositivo antigo, desactive animações nas Definições do perfil (Perfil Sensorial > Animações). A app funciona melhor em Chrome.',
  },
]

export default function Suporte() {
  const navigate = useNavigate()
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMsg, setContactMsg] = useState('')
  const [contactSent, setContactSent] = useState(false)

  const handleContactSubmit = () => {
    if (!contactName.trim() || !contactMsg.trim()) return

    // For now, construct a mailto link. In production, this would hit an API.
    const subject = encodeURIComponent(`[PITCH Suporte] Mensagem de ${contactName.trim()}`)
    const body = encodeURIComponent(
      `Nome: ${contactName.trim()}\nEmail: ${contactEmail.trim() || 'Não fornecido'}\n\nMensagem:\n${contactMsg.trim()}`
    )
    window.open(`mailto:suporte@pitch-app.com?subject=${subject}&body=${body}`, '_blank')
    setContactSent(true)
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <button style={styles.headerLogo} onClick={() => navigate('/landing')}>
            <img src="/logos/pitch-robo.png" alt="" style={styles.headerLogoImg} />
            <span style={styles.headerLogoText}>PITCH</span>
          </button>
          <nav style={styles.headerNav}>
            <button style={styles.headerLink} onClick={() => navigate('/faq')}>FAQ</button>
            <button style={styles.headerCta} onClick={() => navigate('/')}>
              Começar
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Suporte e Contacto</h1>
        <p style={styles.heroDesc}>
          Estamos aqui para ajudar. Encontre respostas ou envie-nos uma mensagem.
        </p>
      </section>

      <main style={styles.content}>
        {/* Help Topics */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Como Podemos Ajudar?</h2>
          <div style={styles.topicGrid}>
            {HELP_TOPICS.map((topic) => (
              <button
                key={topic.title}
                style={styles.topicCard}
                onClick={() => {
                  if (topic.link.startsWith('/')) {
                    navigate(topic.link)
                  } else {
                    document.querySelector(topic.link)?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                <span style={styles.topicIcon}>{topic.icon}</span>
                <h3 style={styles.topicTitle}>{topic.title}</h3>
                <p style={styles.topicDesc}>{topic.desc}</p>
                <span style={styles.topicAction}>{topic.action} →</span>
              </button>
            ))}
          </div>
        </section>

        {/* Troubleshooting */}
        <section id="troubleshooting" style={styles.section}>
          <h2 style={styles.sectionTitle}>Resolução de Problemas</h2>
          <div style={styles.troubleList}>
            {TROUBLESHOOTING.map((item, i) => (
              <div key={i} style={styles.troubleItem}>
                <div style={styles.troubleProblem}>
                  <span style={styles.troubleIcon}>⚠️</span>
                  <span style={styles.troubleQ}>{item.problem}</span>
                </div>
                <p style={styles.troubleA}>{item.solution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" style={styles.section}>
          <h2 style={styles.sectionTitle}>Enviar Mensagem</h2>
          <p style={styles.contactDesc}>
            Tem uma pergunta, sugestão, ou problema? Envie-nos uma mensagem.
          </p>

          {contactSent ? (
            <div style={styles.contactSuccess}>
              <span style={styles.contactSuccessIcon}>✅</span>
              <p style={styles.contactSuccessText}>
                O seu cliente de email foi aberto com a mensagem preparada. Envie-a para nos contactar.
              </p>
              <button
                style={styles.contactResetBtn}
                onClick={() => {
                  setContactSent(false)
                  setContactName('')
                  setContactEmail('')
                  setContactMsg('')
                }}
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <div style={styles.contactForm}>
              <div style={styles.contactField}>
                <label style={styles.contactLabel} htmlFor="contact-name">Nome</label>
                <input
                  id="contact-name"
                  style={styles.contactInput}
                  type="text"
                  placeholder="O seu nome"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div style={styles.contactField}>
                <label style={styles.contactLabel} htmlFor="contact-email">Email (opcional)</label>
                <input
                  id="contact-email"
                  style={styles.contactInput}
                  type="email"
                  placeholder="Para respondermos"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div style={styles.contactField}>
                <label style={styles.contactLabel} htmlFor="contact-msg">Mensagem</label>
                <textarea
                  id="contact-msg"
                  style={styles.contactTextarea}
                  placeholder="Descreva a sua pergunta, sugestão ou problema..."
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  rows={5}
                />
              </div>
              <button
                style={{
                  ...styles.contactSubmit,
                  opacity: (!contactName.trim() || !contactMsg.trim()) ? 0.5 : 1,
                }}
                onClick={handleContactSubmit}
                disabled={!contactName.trim() || !contactMsg.trim()}
              >
                Enviar Mensagem
              </button>
            </div>
          )}
        </section>

        {/* System Info */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Informação do Sistema</h2>
          <div style={styles.sysInfo}>
            <div style={styles.sysRow}>
              <span style={styles.sysLabel}>Versão</span>
              <span style={styles.sysValue}>PITCH 1.0</span>
            </div>
            <div style={styles.sysRow}>
              <span style={styles.sysLabel}>Tipo</span>
              <span style={styles.sysValue}>Progressive Web App (PWA)</span>
            </div>
            <div style={styles.sysRow}>
              <span style={styles.sysLabel}>Stack</span>
              <span style={styles.sysValue}>React + Vite + Supabase + Vercel</span>
            </div>
            <div style={styles.sysRow}>
              <span style={styles.sysLabel}>Offline</span>
              <span style={styles.sysValue}>Sim (Service Worker + CacheFirst)</span>
            </div>
            <div style={styles.sysRow}>
              <span style={styles.sysLabel}>Dados</span>
              <span style={styles.sysValue}>IndexedDB (local) + Supabase (cloud)</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerLinks}>
          <button style={styles.footerLink} onClick={() => navigate('/landing')}>Início</button>
          <button style={styles.footerLink} onClick={() => navigate('/faq')}>FAQ</button>
        </div>
        <p style={styles.footerText}>PITCH — Plataforma de aprendizagem inclusiva</p>
      </footer>
    </div>
  )
}

const styles = {
  page: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
    fontFamily: "'Quicksand', sans-serif",
  },

  // Header (shared pattern)
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid #E0E0E0',
  },
  headerInner: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    minHeight: '44px',
    padding: '4px',
  },
  headerLogoImg: {
    width: '28px',
    height: '28px',
    objectFit: 'contain',
  },
  headerLogoText: {
    fontWeight: 700,
    fontSize: '1.1rem',
    color: '#1B5E20',
    letterSpacing: '2px',
  },
  headerNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  headerLink: {
    fontFamily: 'inherit',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#616161',
    cursor: 'pointer',
    padding: '8px',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
  },
  headerCta: {
    fontFamily: 'inherit',
    fontSize: '0.875rem',
    fontWeight: 700,
    color: 'white',
    backgroundColor: '#2E7D32',
    padding: '10px 20px',
    borderRadius: '24px',
    cursor: 'pointer',
    minHeight: '44px',
  },

  // Hero
  hero: {
    background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
    padding: '40px 24px 32px',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: 700,
    color: '#1B5E20',
    marginBottom: '8px',
  },
  heroDesc: {
    fontSize: '1rem',
    color: '#37474F',
  },

  // Content
  content: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },

  // Section
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#1B5E20',
  },

  // Help Topics
  topicGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
  },
  topicCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '20px',
    backgroundColor: '#FAFAFA',
    borderRadius: '16px',
    border: '1px solid #E0E0E0',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
    minHeight: '44px',
    transition: 'all 0.2s',
  },
  topicIcon: {
    fontSize: '2rem',
  },
  topicTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#212121',
  },
  topicDesc: {
    fontSize: '0.85rem',
    color: '#616161',
    lineHeight: 1.5,
    flex: 1,
  },
  topicAction: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#2E7D32',
  },

  // Troubleshooting
  troubleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  troubleItem: {
    padding: '16px 20px',
    backgroundColor: '#FFF8E1',
    borderRadius: '12px',
    border: '1px solid #FFE082',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  troubleProblem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  troubleIcon: {
    fontSize: '1.2rem',
    flexShrink: 0,
  },
  troubleQ: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#E65100',
  },
  troubleA: {
    fontSize: '0.9rem',
    color: '#37474F',
    lineHeight: 1.6,
    paddingLeft: '28px',
  },

  // Contact Form
  contactDesc: {
    fontSize: '0.9rem',
    color: '#616161',
  },
  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  contactField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  contactLabel: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#212121',
  },
  contactInput: {
    padding: '12px 16px',
    border: '1px solid #E0E0E0',
    borderRadius: '12px',
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
    minHeight: '44px',
  },
  contactTextarea: {
    padding: '12px 16px',
    border: '1px solid #E0E0E0',
    borderRadius: '12px',
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
    resize: 'vertical',
    minHeight: '100px',
  },
  contactSubmit: {
    fontFamily: 'inherit',
    fontSize: '1rem',
    fontWeight: 700,
    color: 'white',
    backgroundColor: '#2E7D32',
    padding: '14px 28px',
    borderRadius: '28px',
    cursor: 'pointer',
    minHeight: '44px',
    alignSelf: 'flex-start',
    transition: 'opacity 0.2s',
  },
  contactSuccess: {
    padding: '24px',
    backgroundColor: '#E8F5E9',
    borderRadius: '16px',
    border: '1px solid #A5D6A7',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  contactSuccessIcon: {
    fontSize: '2rem',
  },
  contactSuccessText: {
    fontSize: '0.95rem',
    color: '#1B5E20',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  contactResetBtn: {
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#2E7D32',
    cursor: 'pointer',
    padding: '8px 16px',
    minHeight: '44px',
    textDecoration: 'underline',
  },

  // System Info
  sysInfo: {
    backgroundColor: '#FAFAFA',
    borderRadius: '16px',
    border: '1px solid #E0E0E0',
    overflow: 'hidden',
  },
  sysRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    borderBottom: '1px solid #E0E0E0',
  },
  sysLabel: {
    fontSize: '0.9rem',
    fontWeight: 700,
    color: '#212121',
  },
  sysValue: {
    fontSize: '0.85rem',
    color: '#616161',
    fontWeight: 500,
  },

  // Footer
  footer: {
    padding: '24px',
    textAlign: 'center',
    borderTop: '1px solid #E0E0E0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  footerLinks: {
    display: 'flex',
    gap: '16px',
  },
  footerLink: {
    fontFamily: 'inherit',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#2E7D32',
    cursor: 'pointer',
    padding: '8px',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'underline',
  },
  footerText: {
    fontSize: '0.8rem',
    color: '#9E9E9E',
  },
}
