/**
 * Welcome screen — shown when no active profile.
 * Shows existing profiles for switching, plus Breno quick-start and new profile.
 * When Supabase is configured, shows login/register for cloud sync.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AVATARS } from '../hooks/useProfile'

export default function Welcome({ onNewProfile, profiles, onSwitchProfile, auth, sharing }) {
  const navigate = useNavigate()
  const hasProfiles = profiles && profiles.length > 0
  const [authMode, setAuthMode] = useState(null) // null | 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMsg, setAuthMsg] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)
  const [showShareCode, setShowShareCode] = useState(false)
  const [shareCodeInput, setShareCodeInput] = useState('')
  const [shareMsg, setShareMsg] = useState(null)
  const [shareLoading, setShareLoading] = useState(false)

  const handleAuth = async () => {
    if (!email.trim()) return
    setAuthLoading(true)
    setAuthMsg(null)

    let result
    if (authMode === 'register') {
      result = await auth.signUp(email.trim(), password)
      if (!result.error) {
        setAuthMsg('Conta criada! Verifica o email para confirmar.')
      }
    } else {
      if (password) {
        result = await auth.signIn(email.trim(), password)
      } else {
        result = await auth.signInWithMagicLink(email.trim())
        if (!result.error) {
          setAuthMsg('Link enviado! Verifica o email.')
        }
      }
    }

    if (result?.error) {
      setAuthMsg(result.error)
    }
    setAuthLoading(false)
  }

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

        {/* Existing profiles */}
        {hasProfiles && (
          <div style={styles.profilesSection}>
            <p style={styles.profilesTitle}>Escolas existentes:</p>
            <div style={styles.profilesList}>
              {profiles.map((p) => {
                const avatar = AVATARS.find((a) => a.id === p.avatar)
                return (
                  <button
                    key={p.id}
                    style={styles.profileBtn}
                    className="interactive-card"
                    onClick={() => onSwitchProfile(p.id)}
                  >
                    <span style={styles.profileAvatar}>{avatar?.emoji || '⭐'}</span>
                    <div>
                      <span style={styles.profileName}>A Escola do {p.name}</span>
                      <span style={styles.profileAge}>{p.age} anos</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Shared profiles (from therapists/families who shared with me) */}
        {sharing?.sharedWithMe?.length > 0 && (
          <div style={styles.profilesSection}>
            <p style={styles.profilesTitle}>Perfis partilhados comigo:</p>
            <div style={styles.profilesList}>
              {sharing.sharedWithMe.map((share) => {
                const p = share.profile_data
                const avatar = AVATARS.find((a) => a.id === p?.avatar)
                return (
                  <button
                    key={share.id}
                    style={styles.sharedProfileBtn}
                    className="interactive-card"
                    onClick={() => navigate('/shared/' + share.id)}
                  >
                    <span style={styles.profileAvatar}>{avatar?.emoji || '⭐'}</span>
                    <div style={{ flex: 1 }}>
                      <span style={styles.profileName}>A Escola do {p?.name || '?'}</span>
                      <span style={styles.profileAge}>{p?.age} anos</span>
                    </div>
                    <span style={styles.sharedBadge}>partilhado</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div style={styles.actions}>
          <button
            style={styles.newBtn}
            className="interactive-card"
            onClick={onNewProfile}
          >
            <span style={styles.newBtnIcon}>🌟</span>
            <div>
              <span style={styles.newBtnTitle}>
                {hasProfiles ? 'Criar outra escola' : 'Criar a minha escola'}
              </span>
              <span style={styles.newBtnSub}>Personalizar para {hasProfiles ? 'outra' : 'uma'} crianca</span>
            </div>
          </button>

          {/* Accept share code — only when authenticated */}
          {auth?.configured && auth?.user && (
            <>
              {!showShareCode ? (
                <button
                  style={styles.shareCodeBtn}
                  onClick={() => setShowShareCode(true)}
                >
                  <span style={styles.shareCodeBtnIcon}>🔗</span>
                  <div>
                    <span style={styles.shareCodeBtnTitle}>Tenho um codigo de partilha</span>
                    <span style={styles.newBtnSub}>Aceder a um perfil partilhado por uma familia</span>
                  </div>
                </button>
              ) : (
                <div style={styles.shareCodeForm}>
                  <p style={styles.shareCodeFormTitle}>Codigo de partilha</p>
                  <p style={styles.shareCodeFormHint}>
                    Insira o codigo de 6 caracteres que a familia lhe deu.
                  </p>
                  <input
                    style={styles.shareCodeInput}
                    type="text"
                    value={shareCodeInput}
                    onChange={(e) => setShareCodeInput(e.target.value.toUpperCase().slice(0, 6))}
                    placeholder="Ex: A3K7N2"
                    maxLength={6}
                    autoComplete="off"
                  />
                  {shareMsg && <p style={styles.shareCodeMsg}>{shareMsg}</p>}
                  <button
                    style={{
                      ...styles.shareCodeSubmitBtn,
                      ...(shareCodeInput.length !== 6 || shareLoading ? { opacity: 0.5 } : {}),
                    }}
                    onClick={async () => {
                      if (shareCodeInput.length !== 6 || shareLoading) return
                      setShareLoading(true)
                      setShareMsg(null)
                      const result = await sharing.acceptShareCode(shareCodeInput)
                      if (result) {
                        setShareMsg('Perfil partilhado aceite!')
                        setShareCodeInput('')
                        setTimeout(() => {
                          setShowShareCode(false)
                          setShareMsg(null)
                        }, 2000)
                      } else {
                        setShareMsg(sharing.error || 'Codigo invalido.')
                      }
                      setShareLoading(false)
                    }}
                    disabled={shareCodeInput.length !== 6 || shareLoading}
                  >
                    {shareLoading ? 'A verificar...' : 'Aceitar'}
                  </button>
                  <button
                    style={styles.authBackBtn}
                    onClick={() => { setShowShareCode(false); setShareMsg(null); setShareCodeInput('') }}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Cloud sync auth — only when Supabase is configured */}
        {auth?.configured && !auth?.user && (
          <div style={styles.authSection}>
            {!authMode ? (
              <>
                <p style={styles.authHint}>Sincronizar entre dispositivos?</p>
                <div style={styles.authBtns}>
                  <button style={styles.authLoginBtn} onClick={() => setAuthMode('login')}>
                    Entrar
                  </button>
                  <button style={styles.authRegBtn} onClick={() => setAuthMode('register')}>
                    Criar conta
                  </button>
                </div>
              </>
            ) : (
              <div style={styles.authForm}>
                <p style={styles.authFormTitle}>
                  {authMode === 'register' ? 'Criar conta' : 'Entrar'}
                </p>
                <input
                  style={styles.authInput}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <input
                  style={styles.authInput}
                  type="password"
                  placeholder={authMode === 'login' ? 'Password (ou vazio para magic link)' : 'Password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={authMode === 'register' ? 'new-password' : 'current-password'}
                />
                {authMsg && <p style={styles.authMsg}>{authMsg}</p>}
                <button
                  style={styles.authSubmitBtn}
                  onClick={handleAuth}
                  disabled={authLoading || !email.trim()}
                >
                  {authLoading ? 'A processar...' : authMode === 'register' ? 'Registar' : 'Entrar'}
                </button>
                <button
                  style={styles.authBackBtn}
                  onClick={() => { setAuthMode(null); setAuthMsg(null) }}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        )}

        {auth?.configured && auth?.user && (
          <div style={styles.authSynced}>
            <span>☁️ Sincronizado como {auth.user.email}</span>
            <button style={styles.authSignOutBtn} onClick={auth.signOut}>Sair</button>
          </div>
        )}

        {/* Public page links */}
        <div style={styles.publicLinks}>
          <button style={styles.publicLink} onClick={() => navigate('/landing')}>
            Sobre o PITCH
          </button>
          <span style={styles.publicLinkSep}>|</span>
          <button style={styles.publicLink} onClick={() => navigate('/faq')}>
            FAQ
          </button>
          <span style={styles.publicLinkSep}>|</span>
          <button style={styles.publicLink} onClick={() => navigate('/suporte')}>
            Suporte
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
  profilesSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  profilesTitle: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
    color: 'var(--color-text-secondary)',
    textAlign: 'left',
  },
  profilesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  profileBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-md) var(--space-lg)',
    backgroundColor: '#E3F2FD',
    border: '2px solid var(--color-primary)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  profileAvatar: {
    fontSize: '2rem',
    flexShrink: 0,
  },
  profileName: {
    display: 'block',
    fontSize: 'var(--font-size-base)',
    fontWeight: 700,
    color: 'var(--color-primary-dark)',
  },
  profileAge: {
    display: 'block',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    width: '100%',
    marginTop: 'var(--space-md)',
  },
  newBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-md) var(--space-lg)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
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
  publicLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    marginTop: 'var(--space-md)',
  },
  publicLink: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-primary)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    padding: '4px',
    textDecoration: 'underline',
  },
  publicLinkSep: {
    color: 'var(--color-border)',
    fontSize: 'var(--font-size-sm)',
  },
  footer: {
    fontSize: '0.7rem',
    color: 'var(--color-text-secondary)',
    marginTop: 'var(--space-sm)',
    lineHeight: 1.4,
  },
  // Shared profile styles
  sharedProfileBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-md) var(--space-lg)',
    backgroundColor: '#F3E5F5',
    border: '2px solid #6A1B9A',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  sharedBadge: {
    padding: '2px 8px',
    backgroundColor: '#6A1B9A',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.6rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    flexShrink: 0,
  },
  shareCodeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-md) var(--space-lg)',
    backgroundColor: '#F3E5F5',
    border: '2px solid #6A1B9A',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  shareCodeBtnIcon: {
    fontSize: '2rem',
    flexShrink: 0,
  },
  shareCodeBtnTitle: {
    display: 'block',
    fontSize: 'var(--font-size-base)',
    fontWeight: 700,
    color: '#4A148C',
  },
  shareCodeForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
    padding: 'var(--space-lg)',
    backgroundColor: '#F3E5F5',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid #6A1B9A',
  },
  shareCodeFormTitle: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    color: '#4A148C',
  },
  shareCodeFormHint: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.4,
  },
  shareCodeInput: {
    padding: 'var(--space-md)',
    border: '2px solid #6A1B9A',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'monospace',
    fontSize: '1.5rem',
    fontWeight: 800,
    textAlign: 'center',
    letterSpacing: '4px',
    outline: 'none',
    textTransform: 'uppercase',
  },
  shareCodeMsg: {
    fontSize: 'var(--font-size-sm)',
    color: '#6A1B9A',
    fontWeight: 600,
    textAlign: 'center',
  },
  shareCodeSubmitBtn: {
    padding: 'var(--space-sm)',
    backgroundColor: '#6A1B9A',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
  },
  // Auth styles
  authSection: {
    width: '100%',
    borderTop: '1px solid var(--color-border)',
    paddingTop: 'var(--space-md)',
  },
  authHint: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--space-sm)',
  },
  authBtns: {
    display: 'flex',
    gap: 'var(--space-sm)',
  },
  authLoginBtn: {
    flex: 1,
    padding: 'var(--space-sm)',
    backgroundColor: 'var(--color-bg)',
    border: '1px solid var(--color-primary)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-primary)',
  },
  authRegBtn: {
    flex: 1,
    padding: 'var(--space-sm)',
    backgroundColor: 'var(--color-primary)',
    border: '1px solid var(--color-primary)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    color: 'white',
  },
  authForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  authFormTitle: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
  },
  authInput: {
    padding: 'var(--space-sm) var(--space-md)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    outline: 'none',
  },
  authMsg: {
    fontSize: 'var(--font-size-sm)',
    color: '#E65100',
    fontWeight: 600,
    textAlign: 'center',
  },
  authSubmitBtn: {
    padding: 'var(--space-sm)',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
  },
  authBackBtn: {
    padding: 'var(--space-xs)',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-secondary)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    textDecoration: 'underline',
  },
  authSynced: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--space-sm)',
    width: '100%',
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-primary-dark)',
  },
  authSignOutBtn: {
    padding: '2px 8px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-text-secondary)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
}
