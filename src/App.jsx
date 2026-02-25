import { BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom'
import { useState, useCallback, useEffect, useRef } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import Landing from './pages/Landing'
import FAQ from './pages/FAQ'
import Suporte from './pages/Suporte'
import Campo1Bancada from './pages/Campo1Bancada'
import Campo2Marcador from './pages/Campo2Marcador'
import Campo3Mundo from './pages/Campo3Mundo'
import Campo4Vida from './pages/Campo4Vida'
import Campo5Expressao from './pages/Campo5Expressao'
import Campo6Social from './pages/Campo6Social'
import Campo7Biblioteca from './pages/Campo7Biblioteca'
import Progress from './pages/Progress'
import Intake from './pages/Intake'
import Fichas from './pages/Fichas'
import Noticias from './pages/Noticias'
import Comunidade from './pages/Comunidade'
import Loja from './pages/Loja'
import Desafios from './pages/Desafios'
import Definicoes from './pages/Definicoes'
import Dashboard from './pages/Dashboard'
import Planner from './pages/Planner'
import BancoDaCalma from './components/BancoDaCalma'
import BreakReminder from './components/BreakReminder'
import VocabularyMatch from './activities/campo1/VocabularyMatch'
import DressThePlayer from './activities/campo1/DressThePlayer'
import ColorKit from './activities/campo1/ColorKit'
import ReadScore from './activities/campo1/ReadScore'
import GoalMath from './activities/campo2/GoalMath'
import ClockReader from './activities/campo2/ClockReader'
import TeamDivision from './activities/campo2/TeamDivision'
import TicketShop from './activities/campo2/TicketShop'
import FlagMatch from './activities/campo3/FlagMatch'
import WorldExplorer from './activities/campo3/WorldExplorer'
import BodyScience from './activities/campo3/BodyScience'
import WeatherMatch from './activities/campo3/WeatherMatch'
import DailyRoutine from './activities/campo4/DailyRoutine'
import RealWorld from './activities/campo4/RealWorld'
import Phonics from './activities/campo1/Phonics'
import Patterns from './activities/campo2/Patterns'
import NatureLab from './activities/campo3/NatureLab'
import ProblemSolving from './activities/campo4/ProblemSolving'
import HealthyChoices from './activities/campo4/HealthyChoices'
import TimePlanner from './activities/campo4/TimePlanner'
import StoryBuilder from './activities/campo5/StoryBuilder'
import MusicMaker from './activities/campo5/MusicMaker'
import ColorCanvas from './activities/campo5/ColorCanvas'
import PatternArt from './activities/campo5/PatternArt'
import SoundStory from './activities/campo5/SoundStory'
import EmotionCards from './activities/campo6/EmotionCards'
import FairPlay from './activities/campo6/FairPlay'
import SocialDetective from './activities/campo6/SocialDetective'
import TurnTalk from './activities/campo6/TurnTalk'
import CalmToolkit from './activities/campo6/CalmToolkit'
import ContoVivo from './activities/campo7/ContoVivo'
import PoesiaSonora from './activities/campo7/PoesiaSonora'
import TeatroVozes from './activities/campo7/TeatroVozes'
import FabulasMundo from './activities/campo7/FabulasMundo'
import MeuConto from './activities/campo7/MeuConto'
import Planos from './pages/Planos'
import SharedProfile from './pages/SharedProfile'
import { useProgress } from './hooks/useProgress'
import { useProfile } from './hooks/useProfile'
import { useFrustration } from './hooks/useFrustration'
import { useAdaptive } from './hooks/useAdaptive'
import { usePlanner } from './hooks/usePlanner'
import { useAuth } from './hooks/useAuth'
import { useSync } from './hooks/useSync'
import { useSubscription } from './hooks/useSubscription'
import { useProfileSharing } from './hooks/useProfileSharing'
import { setTTSMode } from './hooks/useTTS'

// Public routes accessible without a profile
const PUBLIC_PATHS = ['/landing', '/faq', '/suporte', '/planos']

function SharedProfileRoute({ sharing }) {
  const { shareId } = useParams()
  const share = sharing?.sharedWithMe?.find(s => s.id === shareId) || null
  return (
    <SharedProfile
      share={share}
      onRefresh={() => sharing?.refreshSharedProfiles?.()}
    />
  )
}

function AccountNudge({ auth, onLoginSync, onDismiss }) {
  const [mode, setMode] = useState(null) // null | 'register' | 'login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email.trim()) return
    setLoading(true)
    setMsg(null)

    let result
    if (mode === 'register') {
      result = await auth.signUp(email.trim(), password)
      if (!result.error) {
        setMsg('Conta criada! Verifica o email para confirmar.')
        setTimeout(onDismiss, 3000)
      }
    } else {
      if (password) {
        result = await auth.signIn(email.trim(), password)
        if (!result.error && onLoginSync) {
          setMsg('A sincronizar...')
          await onLoginSync()
          onDismiss()
        }
      } else {
        result = await auth.signInWithMagicLink(email.trim())
        if (!result.error) {
          setMsg('Link enviado! Verifica o email.')
          setTimeout(onDismiss, 3000)
        }
      }
    }

    if (result?.error) setMsg(result.error)
    setLoading(false)
  }

  const nudgeStyles = {
    overlay: { position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' },
    card: { backgroundColor: 'white', borderRadius: '16px', padding: '24px', maxWidth: '400px', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'center' },
    title: { fontSize: '1.2rem', fontWeight: 700, color: '#1B5E20' },
    desc: { fontSize: '0.9rem', color: '#616161', lineHeight: 1.5 },
    btns: { display: 'flex', gap: '8px' },
    primaryBtn: { flex: 1, padding: '12px', backgroundColor: '#2E7D32', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, fontFamily: 'inherit', fontSize: '0.95rem', cursor: 'pointer', minHeight: '44px' },
    secondaryBtn: { flex: 1, padding: '12px', backgroundColor: 'white', color: '#2E7D32', border: '2px solid #2E7D32', borderRadius: '10px', fontWeight: 700, fontFamily: 'inherit', fontSize: '0.95rem', cursor: 'pointer', minHeight: '44px' },
    input: { padding: '12px', border: '2px solid #C8E6C9', borderRadius: '10px', fontFamily: 'inherit', fontSize: '1rem', outline: 'none', width: '100%', boxSizing: 'border-box' },
    skipBtn: { padding: '8px', backgroundColor: 'transparent', border: 'none', color: '#9E9E9E', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem', textDecoration: 'underline', minHeight: '44px' },
    msg: { fontSize: '0.85rem', color: '#E65100', fontWeight: 600 },
  }

  return (
    <div style={nudgeStyles.overlay}>
      <div style={nudgeStyles.card}>
        {!mode ? (
          <>
            <p style={nudgeStyles.title}>Perfil criado!</p>
            <p style={nudgeStyles.desc}>
              Cria uma conta para que a mãe, o pai e o terapeuta possam aceder ao mesmo perfil, de qualquer dispositivo.
            </p>
            <div style={nudgeStyles.btns}>
              <button style={nudgeStyles.primaryBtn} onClick={() => setMode('register')}>
                Criar Conta
              </button>
              <button style={nudgeStyles.secondaryBtn} onClick={() => setMode('login')}>
                Já Tenho Conta
              </button>
            </div>
            <button style={nudgeStyles.skipBtn} onClick={onDismiss}>
              Continuar sem conta (dados só neste dispositivo)
            </button>
          </>
        ) : (
          <>
            <p style={nudgeStyles.title}>
              {mode === 'register' ? 'Criar conta da família' : 'Entrar'}
            </p>
            <input
              style={nudgeStyles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              style={nudgeStyles.input}
              type="password"
              placeholder={mode === 'login' ? 'Password (ou vazio para magic link)' : 'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />
            {msg && <p style={nudgeStyles.msg}>{msg}</p>}
            <button
              style={nudgeStyles.primaryBtn}
              onClick={handleSubmit}
              disabled={loading || !email.trim()}
            >
              {loading ? 'A processar...' : mode === 'register' ? 'Criar Conta' : 'Entrar'}
            </button>
            <button style={nudgeStyles.skipBtn} onClick={() => setMode(null)}>
              Voltar
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function AppContent() {
  const location = useLocation()
  const [showCalma, setShowCalma] = useState(false)
  const [showIntake, setShowIntake] = useState(false)
  const progressData = useProgress()
  const profileData = useProfile()
  const auth = useAuth()
  const sync = useSync(
    auth.user,
    profileData.profiles,
    progressData.progress,
    profileData.activeId,
  )

  // Pull from cloud on login — bidirectional sync
  const prevUserRef = useRef(null)
  useEffect(() => {
    const wasLoggedOut = !prevUserRef.current
    const isLoggedIn = !!auth.user
    prevUserRef.current = auth.user

    if (wasLoggedOut && isLoggedIn) {
      sync.syncOnLogin().then((cloudData) => {
        if (cloudData) {
          profileData.importFromCloud(cloudData.profiles, cloudData.active_profile_id)
          progressData.importFromCloud(cloudData.progress)
        }
      })
    }
  }, [auth.user]) // eslint-disable-line react-hooks/exhaustive-deps

  // Manual sync trigger for Welcome/Landing login flows
  const handleLoginSync = useCallback(async () => {
    const cloudData = await sync.syncOnLogin()
    if (cloudData) {
      profileData.importFromCloud(cloudData.profiles, cloudData.active_profile_id)
      progressData.importFromCloud(cloudData.progress)
    }
  }, [sync, profileData, progressData])
  const adaptive = useAdaptive(profileData.profile)
  const subscription = useSubscription(profileData.profile)
  const sharing = useProfileSharing(
    auth.user,
    profileData.profiles,
    progressData.progress,
  )
  const plannerData = usePlanner(
    profileData.profile?.id,
    adaptive.prioritisedCampos,
    progressData.progress,
  )

  // Dynamic title
  useEffect(() => {
    const name = profileData.profile?.name
    if (name) {
      document.title = `PITCH - A Escola do ${name}`
    } else {
      document.title = 'PITCH - Aprendizagem Inclusiva'
    }
  }, [profileData.profile?.name])

  // Sync TTS mode from profile to module-level config
  useEffect(() => {
    const mode = profileData.profile?.sensory?.ttsMode || 'auto'
    setTTSMode(mode)
  }, [profileData.profile?.sensory?.ttsMode])

  const handleFrustration = useCallback(() => {
    if (!showIntake) setShowCalma(true)
  }, [showIntake])

  const { registerClick, registerError, registerSuccess, calmDown } =
    useFrustration(handleFrustration, { paused: showIntake })

  const handleCloseCalma = useCallback(() => {
    setShowCalma(false)
    calmDown()
  }, [calmDown])

  // New profile: show intake wizard (or skip for founder)
  const handleNewProfile = useCallback(() => {
    setShowIntake(true)
  }, [])

  // ?fundador opens Intake with pre-filled data (never auto-creates profile)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('fundador') && !profileData.profile) {
      setShowIntake(true)
      // Keep ?fundador in URL so Intake can read it for pre-fill,
      // then clean after a tick
      setTimeout(() => {
        window.history.replaceState({}, '', window.location.pathname)
      }, 100)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Switch to existing profile
  const handleSwitchProfile = useCallback((id) => {
    profileData.switchProfile(id)
  }, [profileData])

  // Post-onboarding nudge for account creation
  const [showAccountNudge, setShowAccountNudge] = useState(false)

  const handleOnboardingComplete = useCallback((data) => {
    profileData.completeOnboarding(data)
    setShowIntake(false)
    setShowCalma(false)
    calmDown()
    // If Supabase is configured but user isn't logged in, nudge to create account
    if (auth.configured && !auth.user) {
      setShowAccountNudge(true)
    }
  }, [profileData, calmDown, auth.configured, auth.user])

  // Reset profile (from settings page)
  const handleResetProfile = useCallback((type) => {
    if (type === 'intake') {
      setShowIntake(true)
    } else if (type === 'switch') {
      profileData.switchProfile(null)
    } else {
      profileData.resetAll()
      progressData.resetAll()
    }
  }, [profileData, progressData])

  // Wrap completeActivity to also mark done in planner
  const handleCompleteActivity = useCallback((activityId, stars) => {
    progressData.completeActivity(activityId, stars)
    plannerData.markDone(activityId)
  }, [progressData, plannerData])

  const soundEnabled = profileData.profile?.sensory?.soundEnabled !== false

  // Handle PayPal subscription activation
  const handleSubscribed = useCallback((data) => {
    profileData.updateProfile({
      subscriptionTier: data.tierId,
      paypalSubscriptionId: data.subscriptionId,
      subscriptionActivatedAt: data.activatedAt,
    })
  }, [profileData])

  const activityProps = {
    ...progressData,
    completeActivity: handleCompleteActivity,
    registerClick,
    registerError,
    registerSuccess,
    adaptive,
    soundEnabled,
    subscription,
  }

  // Shared profile route — accessible with or without active profile
  const isSharedRoute = location.pathname.startsWith('/shared/')
  if (isSharedRoute) {
    return (
      <Routes>
        <Route path="/shared/:shareId" element={
          <SharedProfileRoute sharing={sharing} />
        } />
      </Routes>
    )
  }

  // Public routes: always accessible without a profile
  const isPublicRoute = PUBLIC_PATHS.includes(location.pathname)
  if (isPublicRoute) {
    return (
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/suporte" element={<Suporte />} />
        <Route path="/planos" element={<Planos currentTier={profileData.profile?.subscriptionTier} onSubscribed={handleSubscribed} />} />
      </Routes>
    )
  }

  // Show Landing for first-time visitors (no profiles), Welcome for returning users
  if (!profileData.profile && !showIntake) {
    const hasProfiles = profileData.profiles && profileData.profiles.length > 0
    if (!hasProfiles) {
      return <Landing onStart={handleNewProfile} auth={auth} onLoginSync={handleLoginSync} syncStatus={sync.syncStatus} />
    }
    return (
      <Welcome
        onNewProfile={handleNewProfile}
        profiles={profileData.profiles}
        onSwitchProfile={handleSwitchProfile}
        auth={auth}
        sharing={sharing}
        onLoginSync={handleLoginSync}
        syncStatus={sync.syncStatus}
      />
    )
  }

  // Show Intake wizard (new profile or redo)
  if (showIntake) {
    return <Intake onComplete={handleOnboardingComplete} onCancel={() => setShowIntake(false)} />
  }

  return (
    <>
      {showCalma && <BancoDaCalma onClose={handleCloseCalma} />}
      {showAccountNudge && (
        <AccountNudge
          auth={auth}
          onLoginSync={handleLoginSync}
          onDismiss={() => setShowAccountNudge(false)}
        />
      )}
      {adaptive.showBreakReminder && (
        <BreakReminder
          name={profileData.profile.name}
          onDismiss={adaptive.dismissBreak}
          onEnd={adaptive.dismissBreak}
        />
      )}
      <Routes>
        {/* Public routes also accessible from within the app */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/suporte" element={<Suporte />} />

        <Route element={<Layout profile={profileData.profile} adaptive={adaptive} />}>
          <Route index element={
            <Home
              progress={progressData.progress}
              profile={profileData.profile}
              adaptive={adaptive}
              planner={plannerData}
            />
          } />
          <Route path="/campo/1" element={<Campo1Bancada {...activityProps} />} />
          <Route path="/campo/2" element={<Campo2Marcador {...activityProps} />} />
          <Route path="/campo/3" element={<Campo3Mundo {...activityProps} />} />
          <Route path="/campo/4" element={<Campo4Vida {...activityProps} />} />
          <Route path="/campo/5" element={<Campo5Expressao {...activityProps} />} />
          <Route path="/campo/6" element={<Campo6Social {...activityProps} />} />
          <Route path="/campo/7" element={<Campo7Biblioteca {...activityProps} />} />
          <Route path="/progresso" element={
            <Progress
              progress={progressData.progress}
              profile={profileData.profile}
            />
          } />
          <Route path="/fichas" element={
            <Fichas
              profile={profileData.profile}
              progress={progressData.progress}
              submitWorksheet={profileData.submitWorksheet}
            />
          } />
          <Route path="/noticias" element={
            <Noticias profile={profileData.profile} />
          } />
          <Route path="/comunidade" element={
            <Comunidade
              profile={profileData.profile}
              progress={progressData.progress}
              addEncouragement={profileData.addEncouragement}
            />
          } />
          <Route path="/loja" element={
            <Loja
              profile={profileData.profile}
              progress={progressData.progress}
              purchaseItem={profileData.purchaseItem}
              equipItem={profileData.equipItem}
              claimRealReward={profileData.claimRealReward}
            />
          } />
          <Route path="/desafios" element={
            <Desafios
              profile={profileData.profile}
              progress={progressData.progress}
            />
          } />
          <Route path="/definicoes" element={
            <Definicoes
              profile={profileData.profile}
              profiles={profileData.profiles}
              updateProfile={profileData.updateProfile}
              resetProfile={handleResetProfile}
              deleteProfile={profileData.deleteProfile}
              addRealReward={profileData.addRealReward}
              removeRealReward={profileData.removeRealReward}
              subscription={subscription}
              sharing={sharing}
            />
          } />

          <Route path="/planos" element={
            <Planos currentTier={subscription.tierId} onSubscribed={handleSubscribed} />
          } />

          <Route path="/planner" element={
            <Planner
              profile={profileData.profile}
              progress={progressData.progress}
              planner={plannerData}
              adaptive={adaptive}
            />
          } />

          <Route path="/dashboard" element={
            <Dashboard
              profile={profileData.profile}
              progress={progressData.progress}
              reviewWorksheet={profileData.reviewWorksheet}
              addEncouragement={profileData.addEncouragement}
            />
          } />

          {/* Campo 1 activities */}
          <Route path="/campo/1/vocab-match" element={<VocabularyMatch {...activityProps} />} />
          <Route path="/campo/1/dress-player" element={<DressThePlayer {...activityProps} />} />
          <Route path="/campo/1/color-kit" element={<ColorKit {...activityProps} />} />
          <Route path="/campo/1/read-score" element={<ReadScore {...activityProps} />} />
          <Route path="/campo/1/phonics" element={<Phonics {...activityProps} />} />

          {/* Campo 2 activities */}
          <Route path="/campo/2/goal-math" element={<GoalMath {...activityProps} />} />
          <Route path="/campo/2/clock-reader" element={<ClockReader {...activityProps} />} />
          <Route path="/campo/2/team-division" element={<TeamDivision {...activityProps} />} />
          <Route path="/campo/2/ticket-shop" element={<TicketShop {...activityProps} />} />
          <Route path="/campo/2/patterns" element={<Patterns {...activityProps} />} />

          {/* Campo 3 activities */}
          <Route path="/campo/3/flag-match" element={<FlagMatch {...activityProps} />} />
          <Route path="/campo/3/world-explorer" element={<WorldExplorer {...activityProps} />} />
          <Route path="/campo/3/body-science" element={<BodyScience {...activityProps} />} />
          <Route path="/campo/3/weather-match" element={<WeatherMatch {...activityProps} />} />
          <Route path="/campo/3/nature-lab" element={<NatureLab {...activityProps} />} />

          {/* Campo 4 activities */}
          <Route path="/campo/4/daily-routine" element={<DailyRoutine {...activityProps} />} />
          <Route path="/campo/4/real-world" element={<RealWorld {...activityProps} />} />
          <Route path="/campo/4/problem-solving" element={<ProblemSolving {...activityProps} />} />
          <Route path="/campo/4/healthy-choices" element={<HealthyChoices {...activityProps} />} />
          <Route path="/campo/4/time-planner" element={<TimePlanner {...activityProps} />} />

          {/* Campo 5 activities */}
          <Route path="/campo/5/story-builder" element={<StoryBuilder {...activityProps} />} />
          <Route path="/campo/5/music-maker" element={<MusicMaker {...activityProps} />} />
          <Route path="/campo/5/color-canvas" element={<ColorCanvas {...activityProps} />} />
          <Route path="/campo/5/pattern-art" element={<PatternArt {...activityProps} />} />
          <Route path="/campo/5/sound-story" element={<SoundStory {...activityProps} />} />

          {/* Campo 6 activities */}
          <Route path="/campo/6/emotion-cards" element={<EmotionCards {...activityProps} />} />
          <Route path="/campo/6/fair-play" element={<FairPlay {...activityProps} />} />
          <Route path="/campo/6/social-detective" element={<SocialDetective {...activityProps} />} />
          <Route path="/campo/6/turn-talk" element={<TurnTalk {...activityProps} />} />
          <Route path="/campo/6/calm-toolkit" element={<CalmToolkit {...activityProps} />} />

          {/* Campo 7 activities */}
          <Route path="/campo/7/contos-vivos" element={<ContoVivo {...activityProps} />} />
          <Route path="/campo/7/poesia-sonora" element={<PoesiaSonora {...activityProps} />} />
          <Route path="/campo/7/teatro-vozes" element={<TeatroVozes {...activityProps} />} />
          <Route path="/campo/7/fabulas-mundo" element={<FabulasMundo {...activityProps} />} />
          <Route path="/campo/7/meu-conto" element={<MeuConto {...activityProps} />} />
        </Route>
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
