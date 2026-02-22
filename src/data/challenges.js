/**
 * Weekly challenges - time-limited missions that reset every week.
 */

export function getWeekNumber() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60000
  return Math.floor(diff / 604800000)
}

// Rotating challenge sets - each week picks a different set
const CHALLENGE_SETS = [
  [
    {
      id: 'wc-vocab-5',
      name: 'Linguista da Semana',
      icon: '🗣️',
      description: 'Aprende 5 palavras novas em inglês',
      target: 5,
      type: 'words',
      reward: 10,
      campo: 'campo1',
    },
    {
      id: 'wc-math-3',
      name: 'Matemático de Ouro',
      icon: '🔢',
      description: 'Completa 3 actividades de matemática',
      target: 3,
      type: 'activities-campo2',
      reward: 8,
      campo: 'campo2',
    },
    {
      id: 'wc-streak-3',
      name: 'Jogador Dedicado',
      icon: '🔥',
      description: 'Joga 3 dias seguidos esta semana',
      target: 3,
      type: 'streak',
      reward: 12,
      campo: null,
    },
  ],
  [
    {
      id: 'wc-vocab-8',
      name: 'Super Vocabulário',
      icon: '📚',
      description: 'Aprende 8 palavras novas em inglês',
      target: 8,
      type: 'words',
      reward: 15,
      campo: 'campo1',
    },
    {
      id: 'wc-world-2',
      name: 'Explorador do Mundo',
      icon: '🌍',
      description: 'Completa 2 actividades de conhecimento',
      target: 2,
      type: 'activities-campo3',
      reward: 8,
      campo: 'campo3',
    },
    {
      id: 'wc-stars-10',
      name: 'Caça-Estrelas',
      icon: '⭐',
      description: 'Ganha 10 estrelas esta semana',
      target: 10,
      type: 'stars',
      reward: 10,
      campo: null,
    },
  ],
  [
    {
      id: 'wc-all-campos',
      name: 'Jogador Completo',
      icon: '🏟️',
      description: 'Faz pelo menos 1 actividade em cada campo',
      target: 4,
      type: 'all-campos',
      reward: 20,
      campo: null,
    },
    {
      id: 'wc-vida-2',
      name: 'Campeão da Vida',
      icon: '🤝',
      description: 'Completa 2 actividades de competências sociais',
      target: 2,
      type: 'activities-campo4',
      reward: 8,
      campo: 'campo4',
    },
    {
      id: 'wc-worksheet-2',
      name: 'Escritor do Estádio',
      icon: '✏️',
      description: 'Completa 2 fichas de escrita',
      target: 2,
      type: 'worksheets',
      reward: 10,
      campo: null,
    },
  ],
  [
    {
      id: 'wc-vocab-10',
      name: 'Mestre das Palavras',
      icon: '🏆',
      description: 'Aprende 10 palavras em inglês',
      target: 10,
      type: 'words',
      reward: 18,
      campo: 'campo1',
    },
    {
      id: 'wc-streak-5',
      name: 'Imparável',
      icon: '🔥',
      description: 'Joga 5 dias seguidos esta semana',
      target: 5,
      type: 'streak',
      reward: 20,
      campo: null,
    },
    {
      id: 'wc-stars-20',
      name: 'Constelação',
      icon: '🌟',
      description: 'Ganha 20 estrelas esta semana',
      target: 20,
      type: 'stars',
      reward: 15,
      campo: null,
    },
  ],
]

export function getCurrentChallenges() {
  const week = getWeekNumber()
  return CHALLENGE_SETS[week % CHALLENGE_SETS.length]
}

export function getDaysUntilReset() {
  const now = new Date()
  const dayOfWeek = now.getDay()
  return dayOfWeek === 0 ? 0 : 7 - dayOfWeek
}
