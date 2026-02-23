import { BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom'
import { useState, useCallback, useEffect } from 'react'
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
import FairPlay from './activities/campo4/FairPlay'
import EmotionCards from './activities/campo4/EmotionCards'
import RealWorld from './activities/campo4/RealWorld'
import Phonics from './activities/campo1/Phonics'
import Patterns from './activities/campo2/Patterns'
import NatureLab from './activities/campo3/NatureLab'
import ProblemSolving from './activities/campo4/ProblemSolving'
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
import { BRENO_PROFILE } from './data/brenoProfile'

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

  // Auto-load founder profile when ?fundador param is present (skip intake entirely)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('fundador') && !profileData.profile) {
      profileData.completeOnboarding(BRENO_PROFILE)
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Switch to existing profile
  const handleSwitchProfile = useCallback((id) => {
    profileData.switchProfile(id)
  }, [profileData])

  const handleOnboardingComplete = useCallback((data) => {
    profileData.completeOnboarding(data)
    setShowIntake(false)
    setShowCalma(false)
    calmDown()
  }, [profileData, calmDown])

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
      return <Landing onStart={handleNewProfile} />
    }
    return (
      <Welcome
        onNewProfile={handleNewProfile}
        profiles={profileData.profiles}
        onSwitchProfile={handleSwitchProfile}
        auth={auth}
        sharing={sharing}
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
          <Route path="/campo/4/fair-play" element={<FairPlay {...activityProps} />} />
          <Route path="/campo/4/emotion-cards" element={<EmotionCards {...activityProps} />} />
          <Route path="/campo/4/real-world" element={<RealWorld {...activityProps} />} />
          <Route path="/campo/4/problem-solving" element={<ProblemSolving {...activityProps} />} />
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
