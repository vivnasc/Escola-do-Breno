/**
 * Subscription tiers for PITCH.
 *
 * Principles:
 * - Free tier is real, not a demo — 1 universe, 1 activity per campo, full progression
 * - Accessibility features are NEVER gated (TTS, contrast, frustration detection, Banco da Calma)
 * - No child's progress is ever blocked by a paywall
 * - Breno always has full access (hardcoded bypass)
 */

export const TIERS = {
  free: {
    id: 'free',
    name: 'Semente',
    emoji: '🌱',
    price: 0,
    priceLabel: 'Gratis',
    color: '#4CAF50',
    description: 'Para comecar a aprender',
    maxProfiles: 1,
    // 1 activity per campo (the first/easiest one)
    activitiesPerCampo: 1,
    // Only football universe
    universes: ['football'],
    features: [
      '1 perfil',
      '1 universo (Futebol)',
      '4 actividades (1 por campo)',
      'Progressao completa (10 niveis)',
      'Deteccao de frustracao',
      'Instrucoes por voz',
      'Funciona offline',
    ],
    limitations: [
      'Sem fichas para impressao',
      'Sem desafios semanais',
      'Sem loja de cosmeticos',
    ],
  },

  family: {
    id: 'family',
    name: 'Flor',
    emoji: '🌸',
    price: 5.99,
    priceLabel: '5,99 /mes',
    color: '#1565C0',
    description: 'Para a familia toda',
    maxProfiles: 5,
    // All 5 activities per campo
    activitiesPerCampo: 5,
    // All 5 universes
    universes: ['football', 'dinosaurs', 'space', 'animals', 'music'],
    features: [
      'Ate 5 perfis',
      '5 universos tematicos',
      '20 actividades (todas)',
      'Fichas para impressao',
      'Desafios semanais',
      'Loja de cosmeticos',
      'Backup cloud',
      'Painel do educador',
    ],
    limitations: [],
  },

  therapist: {
    id: 'therapist',
    name: 'Floresta',
    emoji: '🌲',
    price: 14.99,
    priceLabel: '14,99 /mes',
    color: '#6A1B9A',
    description: 'Para terapeutas e escolas',
    maxProfiles: 20,
    activitiesPerCampo: 5,
    universes: ['football', 'dinosaurs', 'space', 'animals', 'music'],
    features: [
      'Ate 20 perfis',
      'Tudo do plano Flor',
      'Dashboard avancado',
      'Relatorios exportaveis',
      'Notas clinicas',
      'Suporte prioritario',
    ],
    limitations: [],
  },
}

export const TIER_ORDER = ['free', 'family', 'therapist']

/**
 * Which activities are available per campo for a given tier.
 * Free: first activity only. Family/Therapist: all.
 */
export const FREE_ACTIVITIES = {
  campo1: ['vocab-match'],
  campo2: ['goal-math'],
  campo3: ['flag-match'],
  campo4: ['daily-routine'],
}

/**
 * Check if an activity is available for a tier.
 */
export function isActivityAvailable(activityId, campoId, tierId) {
  if (tierId === 'family' || tierId === 'therapist') return true
  const freeList = FREE_ACTIVITIES[campoId]
  return freeList ? freeList.includes(activityId) : false
}

/**
 * Check if a universe is available for a tier.
 */
export function isUniverseAvailable(universeId, tierId) {
  const tier = TIERS[tierId]
  if (!tier) return true
  return tier.universes.includes(universeId)
}
