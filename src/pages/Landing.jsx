/**
 * Public landing page — the first thing visitors see.
 * Showcases features, campos, competency framework, and call-to-action.
 */
import { useNavigate } from 'react-router-dom'

const FEATURES = [
  {
    icon: '🧩',
    title: 'Adaptativo',
    desc: 'Cada crianca tem um perfil unico. A plataforma ajusta dificuldade, opcoes, tempo e suporte visual automaticamente.',
  },
  {
    icon: '🎮',
    title: '20 Actividades',
    desc: 'Vocabulario, matematica, ciencia, autonomia — tudo integrado em 4 campos de aprendizagem interactivos.',
  },
  {
    icon: '🌍',
    title: '5 Universos',
    desc: 'Futebol, Dinossauros, Espaco, Animais ou Musica. O mesmo curriculo, contextualizado pelo interesse da crianca.',
  },
  {
    icon: '📊',
    title: 'Progresso por Mestria',
    desc: '10 niveis de competencia (Semente a Floresta). Avanca quando domina, sem pressao temporal ou comparacoes.',
  },
  {
    icon: '🔊',
    title: 'Audio e Fala',
    desc: 'Instrucoes por voz, efeitos sonoros gentis, e reconhecimento de fala para praticar pronuncia.',
  },
  {
    icon: '💚',
    title: 'Gentil e Inclusivo',
    desc: 'Deteccao de frustracao, pausas guiadas, animacoes suaves. Zero pressao, zero punicao.',
  },
]

const CAMPOS = [
  { icon: '📚', name: 'Linguagem', color: '#1565C0', desc: 'Vocabulario, fonetica, leitura, cores' },
  { icon: '🔢', name: 'Matematica', color: '#E65100', desc: 'Calculo, relogio, padroes, logica' },
  { icon: '🌎', name: 'Descoberta', color: '#2E7D32', desc: 'Bandeiras, corpo, clima, natureza' },
  { icon: '🏠', name: 'Autonomia', color: '#6A1B9A', desc: 'Rotinas, emocoes, resolucao de problemas' },
]

const PHASES = [
  { emoji: '🌱', name: 'Germinar', levels: '1-3', desc: 'Exploracao e curiosidade' },
  { emoji: '🌿', name: 'Estruturar', levels: '4-6', desc: 'Competencia a formar-se' },
  { emoji: '🌸', name: 'Florescer', levels: '7-8', desc: 'Autonomia emergente' },
  { emoji: '🌳', name: 'Sustentar', levels: '9-10', desc: 'Autonomia consolidada' },
]

const TESTIMONIALS = [
  {
    quote: 'O Breno agora pede para estudar. Nunca achei que ia dizer isto.',
    author: 'Mae do Breno, 12 anos',
    avatar: '👩',
  },
  {
    quote: 'Finalmente uma ferramenta que respeita o ritmo do meu filho.',
    author: 'Pai do Miguel, 8 anos',
    avatar: '👨',
  },
  {
    quote: 'Uso com 3 alunos neurodivergentes. Cada um tem o seu perfil proprio.',
    author: 'Terapeuta Educacional',
    avatar: '🧑‍⚕️',
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={styles.page}>
      {/* Header / Navigation */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.headerLogo}>
            <img src="/logos/pitch-robo.png" alt="" style={styles.headerLogoImg} />
            <span style={styles.headerLogoText}>PITCH</span>
          </div>
          <nav style={styles.headerNav}>
            <button style={styles.headerLink} onClick={() => navigate('/faq')}>FAQ</button>
            <button style={styles.headerLink} onClick={() => navigate('/suporte')}>Suporte</button>
            <button style={styles.headerCta} onClick={() => navigate('/')}>
              Comecar
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <img src="/logos/pitch-robo.png" alt="PITCH mascot" style={styles.heroMascot} />
          <h1 style={styles.heroTitle}>
            A escola que se adapta a cada crianca.
          </h1>
          <p style={styles.heroSubtitle}>
            <strong>P</strong>lay. <strong>I</strong>nteract. <strong>T</strong>hink. <strong>C</strong>hallenge. <strong>H</strong>one.
          </p>
          <p style={styles.heroDesc}>
            Plataforma de aprendizagem inclusiva para criancas neurodivergentes.
            Adaptativa, gentil, e construida por competencia — nao por idade.
          </p>
          <div style={styles.heroBtns}>
            <button style={styles.heroPrimary} onClick={() => navigate('/')}>
              Comecar Gratis
            </button>
            <button style={styles.heroSecondary} onClick={() => {
              document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Como Funciona
            </button>
          </div>
          <p style={styles.heroNote}>
            Sem pagamento. Sem publicidade. Offline-first.
          </p>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section style={styles.socialBar}>
        <div style={styles.socialInner}>
          <div style={styles.socialStat}>
            <span style={styles.socialNumber}>20</span>
            <span style={styles.socialLabel}>Actividades</span>
          </div>
          <div style={styles.socialDivider} />
          <div style={styles.socialStat}>
            <span style={styles.socialNumber}>4</span>
            <span style={styles.socialLabel}>Campos</span>
          </div>
          <div style={styles.socialDivider} />
          <div style={styles.socialStat}>
            <span style={styles.socialNumber}>5</span>
            <span style={styles.socialLabel}>Universos</span>
          </div>
          <div style={styles.socialDivider} />
          <div style={styles.socialStat}>
            <span style={styles.socialNumber}>10</span>
            <span style={styles.socialLabel}>Niveis</span>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Como Funciona</h2>
          <p style={styles.sectionSubtitle}>
            Tres passos para comecar a aprender ao seu ritmo.
          </p>
          <div style={styles.stepsGrid}>
            <div style={styles.step}>
              <div style={{ ...styles.stepCircle, backgroundColor: '#E8F5E9', borderColor: '#4CAF50' }}>
                <span style={styles.stepNumber}>1</span>
              </div>
              <h3 style={styles.stepTitle}>Cria a Escola</h3>
              <p style={styles.stepDesc}>
                Nome, idade, interesses, necessidades especificas. Cada perfil e unico.
              </p>
            </div>
            <div style={styles.step}>
              <div style={{ ...styles.stepCircle, backgroundColor: '#E3F2FD', borderColor: '#1565C0' }}>
                <span style={styles.stepNumber}>2</span>
              </div>
              <h3 style={styles.stepTitle}>Avaliacao Inicial</h3>
              <p style={styles.stepDesc}>
                12 perguntas diagnosticas. A plataforma detecta o nivel em cada campo.
              </p>
            </div>
            <div style={styles.step}>
              <div style={{ ...styles.stepCircle, backgroundColor: '#FFF3E0', borderColor: '#E65100' }}>
                <span style={styles.stepNumber}>3</span>
              </div>
              <h3 style={styles.stepTitle}>Aprende e Evolui</h3>
              <p style={styles.stepDesc}>
                Actividades adaptadas, progresso visivel, sem pressao. Cada vitoria conta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Campos */}
      <section style={{ ...styles.section, backgroundColor: '#F5F5F5' }}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>4 Campos de Aprendizagem</h2>
          <p style={styles.sectionSubtitle}>
            Curriculo completo organizado por areas de competencia, nao por disciplinas.
          </p>
          <div style={styles.campoGrid}>
            {CAMPOS.map((campo) => (
              <div key={campo.name} style={{ ...styles.campoCard, borderLeftColor: campo.color }}>
                <span style={styles.campoIcon}>{campo.icon}</span>
                <div>
                  <h3 style={{ ...styles.campoName, color: campo.color }}>{campo.name}</h3>
                  <p style={styles.campoDesc}>{campo.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Porque PITCH?</h2>
          <p style={styles.sectionSubtitle}>
            Tecnologia de ponta ao servico da inclusao.
          </p>
          <div style={styles.featGrid}>
            {FEATURES.map((feat) => (
              <div key={feat.title} style={styles.featCard}>
                <span style={styles.featIcon}>{feat.icon}</span>
                <h3 style={styles.featTitle}>{feat.title}</h3>
                <p style={styles.featDesc}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competency Framework */}
      <section style={{ ...styles.section, backgroundColor: '#E8F5E9' }}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Crescimento por Fases</h2>
          <p style={styles.sectionSubtitle}>
            Comunicacao elegante com pais e terapeutas. Cada crianca esta numa fase — sem rotulos, com narrativa.
          </p>
          <div style={styles.phaseTimeline}>
            {PHASES.map((phase, i) => (
              <div key={phase.name} style={styles.phaseItem}>
                <div style={styles.phaseEmoji}>{phase.emoji}</div>
                <div style={styles.phaseInfo}>
                  <h3 style={styles.phaseName}>{phase.name}</h3>
                  <span style={styles.phaseLevels}>Niveis {phase.levels}</span>
                  <p style={styles.phaseDesc}>{phase.desc}</p>
                </div>
                {i < PHASES.length - 1 && <div style={styles.phaseConnector} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Universes */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>5 Universos Tematicos</h2>
          <p style={styles.sectionSubtitle}>
            O mesmo curriculo, contextualizado pelo interesse da crianca.
          </p>
          <div style={styles.universeRow}>
            {[
              { emoji: '⚽', name: 'Futebol' },
              { emoji: '🦕', name: 'Dinossauros' },
              { emoji: '🚀', name: 'Espaco' },
              { emoji: '🐾', name: 'Animais' },
              { emoji: '🎵', name: 'Musica' },
            ].map((u) => (
              <div key={u.name} style={styles.universeCard}>
                <span style={styles.universeEmoji}>{u.emoji}</span>
                <span style={styles.universeName}>{u.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ ...styles.section, backgroundColor: '#FFF8E1' }}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>O Que Dizem</h2>
          <div style={styles.testimonialGrid}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={styles.testimonialCard}>
                <p style={styles.testimonialQuote}>"{t.quote}"</p>
                <div style={styles.testimonialAuthor}>
                  <span style={styles.testimonialAvatar}>{t.avatar}</span>
                  <span style={styles.testimonialName}>{t.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Acessibilidade em Primeiro</h2>
          <div style={styles.a11yGrid}>
            <div style={styles.a11yItem}>
              <span style={styles.a11yIcon}>👆</span>
              <span style={styles.a11yText}>Touch targets 44x44px (WCAG)</span>
            </div>
            <div style={styles.a11yItem}>
              <span style={styles.a11yIcon}>🔤</span>
              <span style={styles.a11yText}>Fonte dyslexia-friendly (Quicksand)</span>
            </div>
            <div style={styles.a11yItem}>
              <span style={styles.a11yIcon}>🎭</span>
              <span style={styles.a11yText}>Animacoes reduzidas (prefers-reduced-motion)</span>
            </div>
            <div style={styles.a11yItem}>
              <span style={styles.a11yIcon}>🌗</span>
              <span style={styles.a11yText}>Alto contraste (forced-colors)</span>
            </div>
            <div style={styles.a11yItem}>
              <span style={styles.a11yIcon}>📴</span>
              <span style={styles.a11yText}>Funciona offline (PWA)</span>
            </div>
            <div style={styles.a11yItem}>
              <span style={styles.a11yIcon}>🔇</span>
              <span style={styles.a11yText}>Perfil sensorial configuravel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.sectionInner}>
          <h2 style={styles.ctaTitle}>Pronto para comecar?</h2>
          <p style={styles.ctaDesc}>
            Cria a escola da tua crianca em menos de 2 minutos. Gratuito, sem publicidade, sem dados vendidos.
          </p>
          <button style={styles.ctaBtn} onClick={() => navigate('/')}>
            Criar a Minha Escola
          </button>
          <div style={styles.ctaLinks}>
            <button style={styles.ctaLink} onClick={() => navigate('/faq')}>
              Perguntas Frequentes
            </button>
            <span style={styles.ctaLinkSep}>|</span>
            <button style={styles.ctaLink} onClick={() => navigate('/suporte')}>
              Contacto e Suporte
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLogo}>
            <img src="/logos/pitch-robo.png" alt="" style={styles.footerLogoImg} />
            <span style={styles.footerLogoText}>PITCH</span>
          </div>
          <p style={styles.footerTagline}>
            Play. Interact. Think. Challenge. Hone.
          </p>
          <div style={styles.footerLinks}>
            <button style={styles.footerLink} onClick={() => navigate('/faq')}>FAQ</button>
            <button style={styles.footerLink} onClick={() => navigate('/suporte')}>Suporte</button>
            <button style={styles.footerLink} onClick={() => navigate('/landing')}>Sobre</button>
          </div>
          <p style={styles.footerCopy}>
            PITCH — Plataforma de aprendizagem inclusiva para criancas neurodivergentes.
          </p>
        </div>
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

  // Header
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid #E0E0E0',
  },
  headerInner: {
    maxWidth: '960px',
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
  },
  headerLogoImg: {
    width: '32px',
    height: '32px',
    objectFit: 'contain',
  },
  headerLogoText: {
    fontWeight: 700,
    fontSize: '1.25rem',
    color: '#1B5E20',
    letterSpacing: '2px',
  },
  headerNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
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
    transition: 'all 0.2s',
  },

  // Hero
  hero: {
    background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)',
    padding: '60px 24px 48px',
  },
  heroInner: {
    maxWidth: '640px',
    margin: '0 auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  heroMascot: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
  },
  heroTitle: {
    fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
    fontWeight: 700,
    color: '#1B5E20',
    lineHeight: 1.2,
  },
  heroSubtitle: {
    fontSize: '1rem',
    color: '#2E7D32',
    fontWeight: 500,
    letterSpacing: '1px',
  },
  heroDesc: {
    fontSize: '1rem',
    color: '#37474F',
    lineHeight: 1.6,
    maxWidth: '480px',
  },
  heroBtns: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  heroPrimary: {
    fontFamily: 'inherit',
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'white',
    backgroundColor: '#2E7D32',
    padding: '14px 32px',
    borderRadius: '32px',
    cursor: 'pointer',
    minHeight: '44px',
    boxShadow: '0 4px 16px rgba(46, 125, 50, 0.3)',
    transition: 'all 0.2s',
  },
  heroSecondary: {
    fontFamily: 'inherit',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#2E7D32',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: '14px 28px',
    borderRadius: '32px',
    cursor: 'pointer',
    minHeight: '44px',
    border: '2px solid #2E7D32',
  },
  heroNote: {
    fontSize: '0.8rem',
    color: '#558B2F',
    fontWeight: 600,
    marginTop: '4px',
  },

  // Social proof bar
  socialBar: {
    backgroundColor: '#1B5E20',
    padding: '20px 24px',
  },
  socialInner: {
    maxWidth: '640px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  socialStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  socialNumber: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'white',
  },
  socialLabel: {
    fontSize: '0.7rem',
    color: '#A5D6A7',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  socialDivider: {
    width: '1px',
    height: '32px',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  // Section
  section: {
    padding: '48px 24px',
  },
  sectionInner: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: 700,
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: '8px',
  },
  sectionSubtitle: {
    fontSize: '1rem',
    color: '#616161',
    textAlign: 'center',
    lineHeight: 1.5,
    marginBottom: '32px',
  },

  // Steps
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '12px',
  },
  stepCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    border: '3px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#1B5E20',
  },
  stepTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#212121',
  },
  stepDesc: {
    fontSize: '0.9rem',
    color: '#616161',
    lineHeight: 1.5,
  },

  // Campos
  campoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
  },
  campoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: 'white',
    borderLeft: '4px solid',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  campoIcon: {
    fontSize: '2rem',
    flexShrink: 0,
  },
  campoName: {
    fontWeight: 700,
    fontSize: '1rem',
  },
  campoDesc: {
    fontSize: '0.85rem',
    color: '#616161',
    lineHeight: 1.4,
    marginTop: '2px',
  },

  // Features
  featGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
  },
  featCard: {
    padding: '24px',
    backgroundColor: '#FAFAFA',
    borderRadius: '16px',
    border: '1px solid #E0E0E0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  featIcon: {
    fontSize: '2rem',
  },
  featTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#212121',
  },
  featDesc: {
    fontSize: '0.9rem',
    color: '#616161',
    lineHeight: 1.5,
  },

  // Phases
  phaseTimeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    maxWidth: '400px',
    margin: '0 auto',
  },
  phaseItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    position: 'relative',
    paddingBottom: '24px',
  },
  phaseEmoji: {
    fontSize: '2rem',
    flexShrink: 0,
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '50%',
    border: '2px solid #A5D6A7',
    zIndex: 1,
  },
  phaseInfo: {
    flex: 1,
    paddingTop: '4px',
  },
  phaseName: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#1B5E20',
  },
  phaseLevels: {
    fontSize: '0.8rem',
    color: '#4CAF50',
    fontWeight: 600,
  },
  phaseDesc: {
    fontSize: '0.9rem',
    color: '#37474F',
    marginTop: '2px',
  },
  phaseConnector: {
    position: 'absolute',
    left: '23px',
    top: '48px',
    width: '2px',
    height: '24px',
    backgroundColor: '#A5D6A7',
  },

  // Universes
  universeRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  universeCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 20px',
    backgroundColor: '#FAFAFA',
    borderRadius: '16px',
    border: '1px solid #E0E0E0',
    minWidth: '100px',
  },
  universeEmoji: {
    fontSize: '2.5rem',
  },
  universeName: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#212121',
  },

  // Testimonials
  testimonialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
  },
  testimonialCard: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  testimonialQuote: {
    fontSize: '0.95rem',
    color: '#37474F',
    lineHeight: 1.5,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  testimonialAvatar: {
    fontSize: '1.5rem',
  },
  testimonialName: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#616161',
  },

  // Accessibility
  a11yGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
  },
  a11yItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    backgroundColor: '#FAFAFA',
    borderRadius: '12px',
    border: '1px solid #E0E0E0',
  },
  a11yIcon: {
    fontSize: '1.3rem',
    flexShrink: 0,
  },
  a11yText: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#37474F',
  },

  // Final CTA
  ctaSection: {
    background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #4CAF50 100%)',
    padding: '48px 24px',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: 700,
    color: 'white',
    marginBottom: '12px',
  },
  ctaDesc: {
    fontSize: '1rem',
    color: '#C8E6C9',
    lineHeight: 1.5,
    maxWidth: '480px',
    margin: '0 auto 24px',
  },
  ctaBtn: {
    fontFamily: 'inherit',
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#1B5E20',
    backgroundColor: 'white',
    padding: '14px 40px',
    borderRadius: '32px',
    cursor: 'pointer',
    minHeight: '44px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    transition: 'all 0.2s',
  },
  ctaLinks: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    marginTop: '20px',
  },
  ctaLink: {
    fontFamily: 'inherit',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#C8E6C9',
    cursor: 'pointer',
    padding: '8px',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'underline',
  },
  ctaLinkSep: {
    color: 'rgba(255,255,255,0.3)',
  },

  // Footer
  footer: {
    backgroundColor: '#0D3C10',
    padding: '32px 24px',
    textAlign: 'center',
  },
  footerInner: {
    maxWidth: '640px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  footerLogoImg: {
    width: '24px',
    height: '24px',
    objectFit: 'contain',
    opacity: 0.8,
  },
  footerLogoText: {
    fontWeight: 700,
    fontSize: '1rem',
    color: '#A5D6A7',
    letterSpacing: '2px',
  },
  footerTagline: {
    fontSize: '0.8rem',
    color: '#81C784',
    fontWeight: 500,
  },
  footerLinks: {
    display: 'flex',
    gap: '16px',
  },
  footerLink: {
    fontFamily: 'inherit',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#A5D6A7',
    cursor: 'pointer',
    padding: '8px',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'underline',
  },
  footerCopy: {
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.4)',
    marginTop: '8px',
  },
}
