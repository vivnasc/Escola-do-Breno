/**
 * Breno's pre-configured profile data.
 * Reference for the needs/settings of the child the platform was built for.
 * Not auto-loaded — Vivianne creates the profile through the normal Intake.
 */
const BRENO_PROFILE = {
  name: 'Breno',
  age: 11, // born 1 October 2014, turns 12 in Oct 2026
  avatar: 'lion',
  onboardingComplete: true,
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',

  // Breno always has full access — built for him
  subscriptionTier: 'family',
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

export { BRENO_PROFILE }
