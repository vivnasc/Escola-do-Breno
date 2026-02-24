/**
 * Breno's pre-configured profile.
 * This is the child the platform was built for.
 * His mother (Vivianne) configured these needs.
 *
 * STABLE ID: 'breno-fundador' — never changes, same across all devices.
 * This ensures cloud sync always recognises Breno's profile correctly.
 *
 * AUTO-CREATION: When VITE_FOUNDER=true is set on the deploy,
 * Breno's profile is created automatically on first visit.
 * No URL hacks, no easter eggs needed. He's a real user.
 */

// Stable ID — same across all devices, survives sync/merge
const FOUNDER_PROFILE_ID = 'breno-fundador'

const BRENO_PROFILE = {
  // Identity — stable across all devices
  id: FOUNDER_PROFILE_ID,
  name: 'Breno',
  age: 11, // born 1 October 2014, turns 12 in Oct 2026
  avatar: 'lion',
  onboardingComplete: true,
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',

  // Breno always has full access — built for him
  subscriptionTier: 'family',
  isFounder: true, // protects against tier downgrade

  // Theme — Breno loves football
  universe: 'football',
  favoriteTeam: 'Benfica',
  favoritePlayer: 'Ronaldo',

  // Filled by his mother
  filledBy: 'parent',

  // === NEEDS ===
  learningNeeds: {
    areas: ['reading', 'writing', 'attention', 'social', 'emotional-regulation'],
    readingLevel: 'beginning',
    supportLevel: 'some',
  },

  sensory: {
    soundEnabled: true,
    soundVolume: 'normal',
    animationLevel: 'normal',
    visualContrast: 'normal',
    fontSize: 'normal',
    reducedClutter: false,
    timePressure: false,
    ttsMode: 'on-demand',
  },

  attention: {
    sessionLength: 15,
    breakReminder: true,
    breakInterval: 10,
    frustrationSensitivity: 'sensitive',
  },

  goals: [
    'language-pt',
    'language-en',
    'social-skills',
    'emotional-regulation',
    'reading',
    'writing',
  ],

  competencyLevels: {
    campo1: 1,
    campo2: 1,
    campo3: 1,
    campo4: 1,
    campo5: 1,
    campo6: 1,
  },

  communication: {
    usesVisualSupports: false,
    prefersSimpleLanguage: true,
    needsAudioInstructions: true,
  },

  purchasedItems: [],
  equippedCelebration: 'confetti',
  equippedBadge: null,
  sharedAchievements: [],
  encouragements: [],
  weeklyProgress: {},
  lastWeekReset: null,

  worksheetSubmissions: [],
  realRewards: [],
  claimedRewards: [],
}

export { BRENO_PROFILE, FOUNDER_PROFILE_ID }
