/**
 * FAQ page — Perguntas Frequentes.
 * Accessible from landing page, welcome screen, and within the app.
 */
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const FAQ_SECTIONS = [
  {
    title: 'Sobre o PITCH',
    items: [
      {
        q: 'O que é o PITCH?',
        a: 'PITCH (Play. Interact. Think. Challenge. Hone.) é uma plataforma de aprendizagem inclusiva desenhada para crianças neurodivergentes. Adapta-se ao ritmo, necessidades e interesses de cada criança, com 20 actividades em 4 campos de competência.',
      },
      {
        q: 'Para que idades é adequado?',
        a: 'O PITCH não funciona por idades, mas por níveis de competência. É adequado para crianças de 4 a 14 anos, com conteúdo que vai de pré-alfabetização a competências mais avançadas. A avaliação inicial detecta o nível certo para cada criança.',
      },
      {
        q: 'É gratuito?',
        a: 'Sim. O PITCH é completamente gratuito, sem publicidade e sem venda de dados. Foi construído para ser acessível a todas as famílias, independentemente da sua situação financeira.',
      },
      {
        q: 'Que tipo de necessidades especiais suporta?',
        a: 'O PITCH foi construído a pensar em crianças com autismo, TDAH, dislexia, e outras necessidades de aprendizagem. Inclui detecção de frustração, pausas guiadas, perfil sensorial configurável (som, animações, contraste), e progresso por mestria sem pressão temporal.',
      },
    ],
  },
  {
    title: 'Como Funciona',
    items: [
      {
        q: 'Como começo?',
        a: 'Cria uma "escola" para a criança — basta o nome, idade e interesses. Depois, a plataforma faz 12 perguntas diagnósticas para detectar o nível em cada campo. A partir daí, as actividades são adaptadas automaticamente.',
      },
      {
        q: 'O que são os 4 Campos?',
        a: 'Os 4 campos organizam o currículo por áreas de competência: Linguagem e Comunicação (vocabulário, fonética, leitura), Matemática e Lógica (cálculo, padrões, lógica), Conhecimento e Descoberta (ciência, geografia, natureza), e Autonomia e Vida (rotinas, emoções, resolução de problemas).',
      },
      {
        q: 'O que são os Universos?',
        a: 'Os 5 universos (Futebol, Dinossauros, Espaço, Animais, Música) contextualizam o mesmo currículo com temas que interessam a criança. Se gosta de dinossauros, os problemas de matemática usam dinossauros. O conteúdo pedagógico é o mesmo.',
      },
      {
        q: 'Como funciona o progresso?',
        a: 'Cada campo tem 10 níveis (Semente a Floresta), agrupados em 4 fases narrativas (Germinar, Estruturar, Florescer, Sustentar). A criança avança quando demonstra mestria — nunca por tempo ou comparação com outros. Pais e terapeutas recebem relatórios com linguagem de fases.',
      },
      {
        q: 'Posso ter mais do que um perfil?',
        a: 'Sim. O PITCH suporta múltiplos perfis no mesmo dispositivo. Cada criança tem a sua própria "escola" com configurações, níveis e progresso independentes.',
      },
    ],
  },
  {
    title: 'Tecnologia',
    items: [
      {
        q: 'Funciona offline?',
        a: 'Sim. O PITCH é uma Progressive Web App (PWA) que funciona sem internet. Todas as actividades, sons e dados ficam no dispositivo. Apenas o reconhecimento de fala e a sincronização cloud precisam de internet.',
      },
      {
        q: 'Em que dispositivos funciona?',
        a: 'O PITCH funciona em qualquer dispositivo com browser moderno: telemóvel, tablet, portátil ou desktop. Recomendamos Chrome, Safari ou Edge. É optimizado para ecrãs touch.',
      },
      {
        q: 'Os dados são seguros?',
        a: 'Todos os dados ficam no dispositivo da criança por defeito (IndexedDB + localStorage). Se activar a sincronização cloud (Supabase), os dados são encriptados e protegidos por Row Level Security — cada utilizador só acede aos seus próprios dados.',
      },
      {
        q: 'Posso exportar os dados?',
        a: 'Sim. Nas Definições, pode exportar todos os dados como ficheiro JSON para backup ou transferência entre dispositivos. Também pode importar de um backup anterior.',
      },
    ],
  },
  {
    title: 'Para Pais e Terapeutas',
    items: [
      {
        q: 'Como acompanho o progresso?',
        a: 'O Dashboard para educadores mostra níveis por campo, fases narrativas, estrelas, troféus, e um histórico detalhado. Pode exportar relatórios em texto para partilhar com terapeutas ou equipas educativas.',
      },
      {
        q: 'O que é a detecção de frustração?',
        a: 'O PITCH monitoriza padrões de clicks rápidos e erros consecutivos. Quando detecta frustração, sugere uma pausa guiada (Banco da Calma) com exercício de respiração. É gentil e não-punitivo — a criança pode voltar quando estiver pronta.',
      },
      {
        q: 'Posso personalizar as recompensas?',
        a: 'Sim. Nas Definições, pode adicionar recompensas reais (ex: "30 minutos de playstation", "um gelado") que a criança pode reivindicar ao atingir objectivos. A loja virtual também tem badges, stickers e celebrações cosméticas.',
      },
      {
        q: 'Como funciona o plano diário?',
        a: 'O planeador sugere 3 actividades por dia, priorizadas pelas áreas de maior necessidade. Pode gerar um plano automático ou personalizar manualmente. Cada actividade concluída é marcada no calendário.',
      },
    ],
  },
]

export default function FAQ() {
  const navigate = useNavigate()
  const location = useLocation()
  const [openIdx, setOpenIdx] = useState(null)

  const toggleItem = (key) => {
    setOpenIdx(openIdx === key ? null : key)
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
            <button style={styles.headerLink} onClick={() => navigate('/suporte')}>Suporte</button>
            <button style={styles.headerCta} onClick={() => navigate('/')}>
              Começar
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Perguntas Frequentes</h1>
        <p style={styles.heroDesc}>
          Tudo o que precisa de saber sobre o PITCH.
        </p>
      </section>

      {/* FAQ Content */}
      <main style={styles.content}>
        {FAQ_SECTIONS.map((section) => (
          <div key={section.title} style={styles.section}>
            <h2 style={styles.sectionTitle}>{section.title}</h2>
            <div style={styles.itemList}>
              {section.items.map((item, i) => {
                const key = `${section.title}-${i}`
                const isOpen = openIdx === key
                return (
                  <div key={key} style={styles.item}>
                    <button
                      style={styles.itemQuestion}
                      onClick={() => toggleItem(key)}
                      aria-expanded={isOpen}
                    >
                      <span style={styles.itemQ}>{item.q}</span>
                      <span style={{
                        ...styles.itemArrow,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}>
                        ▾
                      </span>
                    </button>
                    {isOpen && (
                      <div style={styles.itemAnswer}>
                        <p style={styles.itemA}>{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </main>

      {/* CTA */}
      <section style={styles.cta}>
        <p style={styles.ctaText}>Não encontrou a resposta?</p>
        <div style={styles.ctaBtns}>
          <button style={styles.ctaPrimary} onClick={() => navigate('/suporte')}>
            Contactar Suporte
          </button>
          <button style={styles.ctaSecondary} onClick={() => navigate('/landing')}>
            Voltar ao Início
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
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
    gap: '32px',
  },

  // Section
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#1B5E20',
    paddingBottom: '8px',
    borderBottom: '2px solid #E8F5E9',
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  // FAQ Item
  item: {
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #E0E0E0',
  },
  itemQuestion: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: '#FAFAFA',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
    minHeight: '44px',
    gap: '12px',
  },
  itemQ: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#212121',
    flex: 1,
  },
  itemArrow: {
    fontSize: '1.2rem',
    color: '#616161',
    transition: 'transform 0.2s ease',
    flexShrink: 0,
  },
  itemAnswer: {
    padding: '0 20px 16px',
    backgroundColor: '#FAFAFA',
  },
  itemA: {
    fontSize: '0.9rem',
    color: '#37474F',
    lineHeight: 1.6,
    borderTop: '1px solid #E0E0E0',
    paddingTop: '12px',
  },

  // CTA
  cta: {
    textAlign: 'center',
    padding: '32px 24px',
    backgroundColor: '#F5F5F5',
  },
  ctaText: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#212121',
    marginBottom: '16px',
  },
  ctaBtns: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  ctaPrimary: {
    fontFamily: 'inherit',
    fontSize: '1rem',
    fontWeight: 700,
    color: 'white',
    backgroundColor: '#2E7D32',
    padding: '12px 28px',
    borderRadius: '28px',
    cursor: 'pointer',
    minHeight: '44px',
  },
  ctaSecondary: {
    fontFamily: 'inherit',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#2E7D32',
    backgroundColor: 'white',
    padding: '12px 28px',
    borderRadius: '28px',
    cursor: 'pointer',
    minHeight: '44px',
    border: '2px solid #2E7D32',
  },

  // Footer
  footer: {
    padding: '20px 24px',
    textAlign: 'center',
    borderTop: '1px solid #E0E0E0',
  },
  footerText: {
    fontSize: '0.8rem',
    color: '#9E9E9E',
  },
}
