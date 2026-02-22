/**
 * Breno's pre-configured profile.
 * This is the child the platform was built for.
 * His mother (Vivianne) configured these needs.
 * He can go straight into the app without filling the intake.
 */
const BRENO_PROFILE = {
  // Identity
  name: 'Breno',
  age: 11, // born 1 October 2014
  avatar: 'lion',
  onboardingComplete: true,
  createdAt: new Date().toISOString(),

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
    timePressure: false, // no time pressure for Breno
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

  // Per-campo competency levels (1-10), starting at level 1
  // Will be adjusted by the intake diagnostic if re-taken
  competencyLevels: {
    campo1: 1,
    campo2: 1,
    campo3: 1,
    campo4: 1,
  },

  communication: {
    usesVisualSupports: false,
    prefersSimpleLanguage: true,
    needsAudioInstructions: true,
  },

  // Cosmetic defaults
  purchasedItems: [],
  equippedCelebration: 'confetti',
  equippedBadge: null,
  sharedAchievements: [],
  encouragements: [],
  weeklyProgress: {},
  lastWeekReset: null,

  // Worksheets & rewards
  worksheetSubmissions: [],
  realRewards: [],
  claimedRewards: [],
}

export { BRENO_PROFILE }
