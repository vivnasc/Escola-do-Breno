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
  name: '',
  age: null,
  avatar: 'star',
  favoriteTeam: null,
  favoritePlayer: null,
  interests: [],
  soundEnabled: true,
  animationLevel: 'normal', // 'minimal', 'normal'
  onboardingComplete: false,
  createdAt: null,
  // Purchased items from the shop
  purchasedItems: [],
  // Equipped items
  equippedCelebration: 'confetti',
  equippedBadge: null,
  // Community
  sharedAchievements: [],
  encouragements: [],
  // Weekly challenge tracking
  weeklyProgress: {},
  lastWeekReset: null,
}

function loadProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE
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
