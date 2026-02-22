/**
 * Breno's pre-configured profile.
 * This is the child the platform was built for.
 * His mother (Vivianne) configured these needs.
 * He can go straight into the app without filling the intake.
 */
const BRENO_PROFILE = {
  // Identity
  name: 'Breno',
  age: 8,
  avatar: 'lion',
  onboardingComplete: true,
  createdAt: new Date().toISOString(),

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
}

export { BRENO_PROFILE }
