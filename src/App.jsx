import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useCallback } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
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
import { useProgress } from './hooks/useProgress'
import { useProfile } from './hooks/useProfile'
import { useFrustration } from './hooks/useFrustration'
import { useAdaptive } from './hooks/useAdaptive'

export default function App() {
  const [showCalma, setShowCalma] = useState(false)
  const progressData = useProgress()
  const profileData = useProfile()
  const adaptive = useAdaptive(profileData.profile)

  const handleFrustration = useCallback(() => {
    setShowCalma(true)
  }, [])

  const { registerClick, registerError, registerSuccess, calmDown } =
    useFrustration(handleFrustration)

  const handleCloseCalma = useCallback(() => {
    setShowCalma(false)
    calmDown()
  }, [calmDown])

  const handleOnboardingComplete = useCallback((data) => {
    profileData.completeOnboarding(data)
  }, [profileData])

  const activityProps = {
    ...progressData,
    registerClick,
    registerError,
    registerSuccess,
    adaptive,
  }

  // Show onboarding if not completed
  if (!profileData.profile.onboardingComplete) {
    return <Intake onComplete={handleOnboardingComplete} />
  }

  return (
    <BrowserRouter>
      {showCalma && <BancoDaCalma onClose={handleCloseCalma} />}
      {adaptive.showBreakReminder && (
        <BreakReminder
          name={profileData.profile.name}
          onDismiss={adaptive.dismissBreak}
          onEnd={adaptive.dismissBreak}
        />
      )}
      <Routes>
        <Route element={<Layout profile={profileData.profile} adaptive={adaptive} />}>
          <Route index element={
            <Home
              progress={progressData.progress}
              profile={profileData.profile}
              adaptive={adaptive}
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
              completeActivity={progressData.completeActivity}
              addTrophy={progressData.addTrophy}
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
            />
          } />
          <Route path="/desafios" element={
            <Desafios
              profile={profileData.profile}
              progress={progressData.progress}
            />
          } />

          {/* Campo 1 activities */}
          <Route path="/campo/1/vocab-match" element={<VocabularyMatch {...activityProps} />} />
          <Route path="/campo/1/dress-player" element={<DressThePlayer {...activityProps} />} />
          <Route path="/campo/1/color-kit" element={<ColorKit {...activityProps} />} />
          <Route path="/campo/1/read-score" element={<ReadScore {...activityProps} />} />

          {/* Campo 2 activities */}
          <Route path="/campo/2/goal-math" element={<GoalMath {...activityProps} />} />
          <Route path="/campo/2/clock-reader" element={<ClockReader {...activityProps} />} />
          <Route path="/campo/2/team-division" element={<TeamDivision {...activityProps} />} />
          <Route path="/campo/2/ticket-shop" element={<TicketShop {...activityProps} />} />

          {/* Campo 3 activities */}
          <Route path="/campo/3/flag-match" element={<FlagMatch {...activityProps} />} />
          <Route path="/campo/3/world-explorer" element={<WorldExplorer {...activityProps} />} />
          <Route path="/campo/3/body-science" element={<BodyScience {...activityProps} />} />
          <Route path="/campo/3/weather-match" element={<WeatherMatch {...activityProps} />} />

          {/* Campo 4 activities */}
          <Route path="/campo/4/daily-routine" element={<DailyRoutine {...activityProps} />} />
          <Route path="/campo/4/fair-play" element={<FairPlay {...activityProps} />} />
          <Route path="/campo/4/emotion-cards" element={<EmotionCards {...activityProps} />} />
          <Route path="/campo/4/real-world" element={<RealWorld {...activityProps} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
