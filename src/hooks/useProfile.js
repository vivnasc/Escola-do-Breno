import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'pitch-profile'

const AVATARS = [
  { id: 'star', emoji: '⭐', label: 'Estrela' },
  { id: 'eagle', emoji: '🦅', label: 'Aguia' },
  { id: 'lion', emoji: '🦁', label: 'Leao' },
  { id: 'dragon', emoji: '🐉', label: 'Dragao' },
  { id: 'rocket', emoji: '🚀', label: 'Foguetao' },
  { id: 'crown', emoji: '👑', label: 'Coroa' },
  { id: 'lightning', emoji: '⚡', label: 'Relampago' },
  { id: 'fire', emoji: '🔥', label: 'Fogo' },
]

const DEFAULT_PROFILE = {
  // Identity
  name: '',
  age: null,
  avatar: 'star',
  onboardingComplete: false,
  createdAt: null,

  // Theme — NOT just football
  universe: 'football', // football, dinosaurs, space, animals, music
  favoriteTeam: null,
  favoritePlayer: null,

  // === NEEDS (the core of real personalisation) ===

  // Who is filling this in?
  filledBy: 'parent', // 'parent', 'therapist', 'teacher', 'self'

  // Learning profile
  learningNeeds: {
    // Areas of difficulty (multi-select)
    areas: [],
    // 'reading', 'writing', 'math', 'attention', 'social',
    // 'emotional-regulation', 'motor-fine', 'motor-gross',
    // 'speech', 'comprehension'

    // Reading level affects text complexity
    readingLevel: 'beginning', // 'pre-reader', 'beginning', 'fluent'

    // Support level affects UI complexity & scaffolding
    supportLevel: 'some', // 'independent', 'some', 'full'
  },

  // Sensory needs
  sensory: {
    soundEnabled: true,
    soundVolume: 'normal', // 'quiet', 'normal'
    animationLevel: 'normal', // 'minimal', 'normal'
    visualContrast: 'normal', // 'normal', 'high'
    fontSize: 'normal', // 'normal', 'large', 'extra-large'
    reducedClutter: false, // fewer items per screen
    timePressure: true, // false = no timers, no countdowns
  },

  // Attention & session management
  attention: {
    sessionLength: 15, // minutes: 5, 10, 15, 20, 30
    breakReminder: true,
    breakInterval: 10, // minutes between break reminders
    frustrationSensitivity: 'moderate', // 'sensitive', 'moderate', 'resilient'
  },

  // Therapeutic/learning goals (what to prioritise)
  goals: [],
  // 'language-pt', 'language-en', 'math', 'social-skills',
  // 'emotional-regulation', 'daily-living', 'reading', 'writing',
  // 'attention-focus', 'communication'

  // Communication preferences
  communication: {
    usesVisualSupports: false, // show more images, fewer words
    prefersSimpleLanguage: false,
    needsAudioInstructions: true,
  },

  // Cosmetic / engagement
  purchasedItems: [],
  equippedCelebration: 'confetti',
  equippedBadge: null,
  sharedAchievements: [],
  encouragements: [],
  weeklyProgress: {},
  lastWeekReset: null,
}

function loadProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return DEFAULT_PROFILE
    const parsed = JSON.parse(saved)
    // Deep merge to preserve nested defaults for new fields
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      learningNeeds: { ...DEFAULT_PROFILE.learningNeeds, ...parsed.learningNeeds },
      sensory: { ...DEFAULT_PROFILE.sensory, ...parsed.sensory },
      attention: { ...DEFAULT_PROFILE.attention, ...parsed.attention },
      communication: { ...DEFAULT_PROFILE.communication, ...parsed.communication },
    }
  } catch {
    return DEFAULT_PROFILE
  }
}

export { AVATARS }

export function useProfile() {
  const [profile, setProfile] = useState(loadProfile)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  }, [profile])

  const updateProfile = useCallback((updates) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }, [])

  const completeOnboarding = useCallback((data) => {
    setProfile((prev) => ({
      ...prev,
      ...data,
      onboardingComplete: true,
      createdAt: new Date().toISOString(),
    }))
  }, [])

  const purchaseItem = useCallback((item, starCost) => {
    setProfile((prev) => {
      if (prev.purchasedItems.find((i) => i.id === item.id)) return prev
      return {
        ...prev,
        purchasedItems: [...prev.purchasedItems, { ...item, purchasedAt: new Date().toISOString() }],
      }
    })
    return starCost
  }, [])

  const equipItem = useCallback((type, itemId) => {
    setProfile((prev) => {
      if (type === 'celebration') return { ...prev, equippedCelebration: itemId }
      if (type === 'badge') return { ...prev, equippedBadge: itemId }
      return prev
    })
  }, [])

  const shareAchievement = useCallback((achievement) => {
    setProfile((prev) => ({
      ...prev,
      sharedAchievements: [
        ...prev.sharedAchievements,
        { ...achievement, sharedAt: new Date().toISOString() },
      ],
    }))
  }, [])

  const addEncouragement = useCallback((from, message) => {
    setProfile((prev) => ({
      ...prev,
      encouragements: [
        ...prev.encouragements,
        { from, message, date: new Date().toISOString(), id: Date.now() },
      ],
    }))
  }, [])

  const updateWeeklyProgress = useCallback((challengeId, progress) => {
    setProfile((prev) => ({
      ...prev,
      weeklyProgress: { ...prev.weeklyProgress, [challengeId]: progress },
    }))
  }, [])

  const resetWeekly = useCallback(() => {
    setProfile((prev) => ({
      ...prev,
      weeklyProgress: {},
      lastWeekReset: new Date().toISOString(),
    }))
  }, [])

  return {
    profile,
    updateProfile,
    completeOnboarding,
    purchaseItem,
    equipItem,
    shareAchievement,
    addEncouragement,
    updateWeeklyProgress,
    resetWeekly,
  }
}
