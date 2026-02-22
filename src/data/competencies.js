/**
 * Competency Framework — 10 progressive levels, globally universal.
 *
 * Not tied to any country's curriculum, grade or age.
 * Inspired by Cambridge, IB PYP and Montessori but expressed as
 * competency tiers that the child advances through by demonstrating mastery.
 *
 * Each competency can be at a DIFFERENT level (e.g. level 7 in language,
 * level 3 in math). The intake wizard detects starting levels.
 *
 * Levels use a growth metaphor:
 *   1  Semente    (Seed)       — just beginning to explore
 *   2  Raiz       (Root)       — building foundations
 *   3  Broto      (Sprout)     — first skills emerging
 *   4  Caule      (Stem)       — structure forming
 *   5  Folha      (Leaf)       — knowledge expanding
 *   6  Botão     (Bud)        — ready to bloom
 *   7  Flor       (Flower)     — skills blooming
 *   8  Fruto      (Fruit)      — producing results
 *   9  Árvore    (Tree)       — strong and independent
 *  10  Floresta   (Forest)     — mastery, can teach others
 *
 * Phases (communication layer for therapists/parents):
 *   Germinar    (1-3)  — Exploração, tentativa, curiosidade
 *   Estruturar  (4-6)  — Competência a formar-se, menos apoio
 *   Florescer   (7-8)  — Autonomia emergente
 *   Sustentar   (9-10) — Autonomia consolidada, pode ajudar outros
 */

export const MASTERY_LEVELS = [
  { id: 'seed',    order: 1,  label: 'Semente',  emoji: '🌱', description: 'A explorar' },
  { id: 'root',    order: 2,  label: 'Raiz',     emoji: '🌿', description: 'A criar bases' },
  { id: 'sprout',  order: 3,  label: 'Broto',    emoji: '🌾', description: 'Primeiros sinais' },
  { id: 'stem',    order: 4,  label: 'Caule',    emoji: '🪴', description: 'A ganhar estrutura' },
  { id: 'leaf',    order: 5,  label: 'Folha',    emoji: '🍃', description: 'A expandir' },
  { id: 'bud',     order: 6,  label: 'Botão',    emoji: '🌷', description: 'Pronto a florescer' },
  { id: 'flower',  order: 7,  label: 'Flor',     emoji: '🌸', description: 'A florescer' },
  { id: 'fruit',   order: 8,  label: 'Fruto',    emoji: '🍎', description: 'A produzir' },
  { id: 'tree',    order: 9,  label: 'Árvore',   emoji: '🌳', description: 'Forte e autónomo' },
  { id: 'forest',  order: 10, label: 'Floresta', emoji: '🌲', description: 'Mestria total' },
]

/**
 * Convert numeric level (1-10) to mastery level id.
 */
export function levelToId(num) {
  const clamped = Math.max(1, Math.min(10, Math.round(num)))
  return MASTERY_LEVELS[clamped - 1].id
}

/**
 * Convert mastery level id to numeric level (1-10).
 */
export function idToLevel(id) {
  const found = MASTERY_LEVELS.find((l) => l.id === id)
  return found ? found.order : 1
}

/**
 * Phases — narrative communication layer over the 10 levels.
 * Designed for therapist reports and parent communication.
 */
export const PHASES = [
  {
    id: 'germinar',
    label: 'Germinar',
    emoji: '🌱',
    range: [1, 3],
    description: 'Exploração, tentativa, curiosidade',
    reportText: 'em fase de Germinar',
    color: '#81C784',
  },
  {
    id: 'estruturar',
    label: 'Estruturar',
    emoji: '🌿',
    range: [4, 6],
    description: 'Competência a formar-se, menos apoio necessário',
    reportText: 'em fase de Estruturar',
    color: '#4CAF50',
  },
  {
    id: 'florescer',
    label: 'Florescer',
    emoji: '🌸',
    range: [7, 8],
    description: 'Autonomia emergente',
    reportText: 'em fase de Florescer',
    color: '#E91E63',
  },
  {
    id: 'sustentar',
    label: 'Sustentar',
    emoji: '🌳',
    range: [9, 10],
    description: 'Autonomia consolidada, pode ajudar outros',
    reportText: 'em fase de Sustentar',
    color: '#2E7D32',
  },
]

/**
 * Get the phase for a numeric level (1-10).
 */
export function getPhase(level) {
  const num = typeof level === 'string' ? idToLevel(level) : level
  return PHASES.find((p) => num >= p.range[0] && num <= p.range[1]) || PHASES[0]
}

export const COMPETENCY_AREAS = {
  campo1: {
    id: 'campo1',
    name: 'Linguagem e Comunicação',
    icon: '🗣️',
    competencies: [
      {
        id: 'c1-vocab-en',
        name: 'Vocabulário Inglês',
        description: 'Compreender e usar palavras em inglês',
        activities: ['vocab-match', 'dress-player', 'color-kit', 'read-score'],
        milestones: {
          seed:   'Ouve palavras em inglês com curiosidade',
          root:   'Reconhece 5-10 palavras básicas',
          sprout: 'Reconhece 15-20 palavras e repete',
          stem:   'Reconhece 30+ palavras com imagem',
          leaf:   'Usa 40+ palavras em contexto simples',
          bud:    'Compreende frases curtas em inglês',
          flower: 'Usa 60+ palavras e forma frases',
          fruit:  'Comunica ideias simples em inglês',
          tree:   'Lê e compreende textos simples',
          forest: 'Usa inglês com confiança e fluência',
        },
      },
      {
        id: 'c1-phonics',
        name: 'Sons e Letras',
        description: 'Associar letras a sons e ler palavras simples',
        activities: ['phonics'],
        milestones: {
          seed:   'Explora sons com curiosidade',
          root:   'Reconhece sons de 5 letras',
          sprout: 'Reconhece sons de 10+ letras',
          stem:   'Junta sons para formar sílabas',
          leaf:   'Lê palavras simples (CVC)',
          bud:    'Lê palavras com digrafos',
          flower: 'Lê frases curtas com apoio',
          fruit:  'Lê frases curtas sozinho',
          tree:   'Lê parágrafos simples',
          forest: 'Lê textos com fluência e compreensão',
        },
      },
      {
        id: 'c1-listening',
        name: 'Compreensão Auditiva',
        description: 'Compreender instruções e histórias faladas',
        activities: ['read-score', 'phonics'],
        milestones: {
          seed:   'Atende a sons e vozes',
          root:   'Segue instruções de 1 passo',
          sprout: 'Segue instruções de 2 passos',
          stem:   'Compreende perguntas simples',
          leaf:   'Compreende histórias curtas (3-4 frases)',
          bud:    'Reconta histórias com ajuda',
          flower: 'Compreende instruções complexas',
          fruit:  'Reconta histórias sozinho',
          tree:   'Segue conversas e narrativas longas',
          forest: 'Infere significados e interpreta',
        },
      },
    ],
  },

  campo2: {
    id: 'campo2',
    name: 'Matemática e Lógica',
    icon: '🔢',
    competencies: [
      {
        id: 'c2-number',
        name: 'Sentido de Número',
        description: 'Compreender quantidades, contar e calcular',
        activities: ['goal-math', 'ticket-shop', 'team-division'],
        milestones: {
          seed:   'Conta objectos até 5',
          root:   'Conta até 10 e reconhece números',
          sprout: 'Conta até 20 e soma até 5',
          stem:   'Soma e subtrai até 10',
          leaf:   'Soma e subtrai até 20',
          bud:    'Compreende multiplicação básica',
          flower: 'Multiplica e divide até 5',
          fruit:  'Opera com números até 100',
          tree:   'Resolve problemas multi-passo',
          forest: 'Aplica operações a situações reais',
        },
      },
      {
        id: 'c2-time',
        name: 'Tempo e Medida',
        description: 'Ler horas, medir e comparar',
        activities: ['clock-reader'],
        milestones: {
          seed:   'Distingue dia e noite',
          root:   'Conhece as partes do dia',
          sprout: 'Lê horas exactas',
          stem:   'Lê meias horas',
          leaf:   'Lê quartos de hora',
          bud:    'Lê qualquer hora no relógio',
          flower: 'Estima durações (5min, 1h)',
          fruit:  'Planeia usando o tempo',
          tree:   'Converte unidades de tempo',
          forest: 'Gere o próprio tempo de forma autónoma',
        },
      },
      {
        id: 'c2-patterns',
        name: 'Padrões e Lógica',
        description: 'Reconhecer padrões, sequências e pensar logicamente',
        activities: ['patterns'],
        milestones: {
          seed:   'Reconhece cores e formas',
          root:   'Agrupa objectos por característica',
          sprout: 'Continua padrões simples (AB)',
          stem:   'Reconhece padrões ABC e AAB',
          leaf:   'Completa sequências numéricas simples',
          bud:    'Cria os próprios padrões',
          flower: 'Identifica padrões em contextos novos',
          fruit:  'Resolve problemas lógicos simples',
          tree:   'Aplica raciocínio lógico a situações reais',
          forest: 'Pensa abstractamente e generaliza regras',
        },
      },
    ],
  },

  campo3: {
    id: 'campo3',
    name: 'Conhecimento e Descoberta',
    icon: '🌍',
    competencies: [
      {
        id: 'c3-world',
        name: 'Mundo e Geografia',
        description: 'Conhecer países, continentes e culturas',
        activities: ['flag-match', 'world-explorer', 'weather-match'],
        milestones: {
          seed:   'Sabe que existem outros países',
          root:   'Identifica 3-5 países',
          sprout: 'Identifica 8-10 países e bandeiras',
          stem:   'Conhece os 6 continentes',
          leaf:   'Localiza países nos continentes',
          bud:    'Relaciona clima e geografia',
          flower: 'Compara culturas e costumes',
          fruit:  'Compreende relações entre regiões',
          tree:   'Analisa questoes globais simples',
          forest: 'Pensamento global e intercultural',
        },
      },
      {
        id: 'c3-science',
        name: 'Ciência e Corpo',
        description: 'Compreender o corpo, a saúde e o mundo natural',
        activities: ['body-science', 'nature-lab'],
        milestones: {
          seed:   'Mostra curiosidade pelo mundo',
          root:   'Identifica partes do corpo',
          sprout: 'Conhece os 5 sentidos',
          stem:   'Compreende necessidades básicas dos seres vivos',
          leaf:   'Faz observações e previsões',
          bud:    'Compreende ciclos naturais (agua, dia/noite)',
          flower: 'Conhece cadeias alimentares simples',
          fruit:  'Explica causas e efeitos naturais',
          tree:   'Desenha experiências simples',
          forest: 'Pensa cientificamente e questiona',
        },
      },
    ],
  },

  campo4: {
    id: 'campo4',
    name: 'Autonomia e Vida',
    icon: '🤝',
    competencies: [
      {
        id: 'c4-emotions',
        name: 'Inteligência Emocional',
        description: 'Identificar e gerir emoções',
        activities: ['emotion-cards', 'fair-play'],
        milestones: {
          seed:   'Expressa emoções básicas',
          root:   'Nomeia 4 emoções (feliz, triste, zangado, medo)',
          sprout: 'Identifica emoções nos outros',
          stem:   'Descreve o que causa emoções',
          leaf:   'Usa 1 estratégia para se acalmar',
          bud:    'Escolhe estratégias diferentes por situação',
          flower: 'Gere emoções em conflitos simples',
          fruit:  'Gere conflitos de forma autónoma',
          tree:   'Apoia outros a gerir emoções',
          forest: 'Inteligência emocional madura',
        },
      },
      {
        id: 'c4-life',
        name: 'Autonomia e Vida Prática',
        description: 'Rotinas, segurança e resolução de problemas',
        activities: ['daily-routine', 'real-world', 'problem-solving'],
        milestones: {
          seed:   'Reconhece rotinas com ajuda',
          root:   'Segue uma rotina simples com apoio',
          sprout: 'Segue rotina com lembretes',
          stem:   'Organiza a própria rotina com ajuda',
          leaf:   'Organiza a rotina sozinho',
          bud:    'Resolve problemas simples do dia-a-dia',
          flower: 'Toma decisões simples entre opções',
          fruit:  'Planeia e executa tarefas multi-passo',
          tree:   'Avalia consequências antes de decidir',
          forest: 'Autonomia total na vida quotidiana',
        },
      },
    ],
  },
}

/**
 * Diagnostic questions for the intake placement test.
 * 3 questions per campo, at tiers low (1-3), mid (4-6), high (7-10).
 * Used to detect starting competency level per campo.
 */
export const DIAGNOSTIC_QUESTIONS = {
  campo1: [
    {
      tier: 'low',
      question: 'O que é isto em inglês?',
      emoji: '🐕',
      hint: 'Dog / Cat / Fish',
      options: [
        { text: 'Dog', correct: true },
        { text: 'Table', correct: false },
        { text: 'Não sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'mid',
      question: 'Completa: "The ball is ___"',
      emoji: '⚽',
      hint: 'red / big / on the table',
      options: [
        { text: 'red', correct: true },
        { text: 'eat', correct: false },
        { text: 'Não sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'high',
      question: 'O que significa "She is running to the park"?',
      emoji: '🏃‍♀️',
      options: [
        { text: 'Ela está a correr para o parque', correct: true },
        { text: 'Ela está a dormir', correct: false },
        { text: 'Não sei', correct: false, skip: true },
      ],
    },
  ],
  campo2: [
    {
      tier: 'low',
      question: 'Quanto é 3 + 2?',
      emoji: '🔢',
      options: [
        { text: '5', correct: true },
        { text: '4', correct: false },
        { text: 'Não sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'mid',
      question: 'Quanto é 15 - 8?',
      emoji: '🔢',
      options: [
        { text: '7', correct: true },
        { text: '6', correct: false },
        { text: 'Não sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'high',
      question: 'Se 4 equipas têm 6 jogadores cada, quantos jogadores há?',
      emoji: '⚽',
      options: [
        { text: '24', correct: true },
        { text: '10', correct: false },
        { text: 'Não sei', correct: false, skip: true },
      ],
    },
  ],
  campo3: [
    {
      tier: 'low',
      question: 'De que país é esta bandeira? 🇧🇷',
      emoji: '🏴',
      options: [
        { text: 'Brasil', correct: true },
        { text: 'Japão', correct: false },
        { text: 'Não sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'mid',
      question: 'De que precisam as plantas para crescer?',
      emoji: '🌱',
      options: [
        { text: 'Água, sol e terra', correct: true },
        { text: 'Apenas chocolate', correct: false },
        { text: 'Não sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'high',
      question: 'Porque temos dia e noite?',
      emoji: '🌍',
      options: [
        { text: 'Porque a Terra gira', correct: true },
        { text: 'Porque o Sol se apaga', correct: false },
        { text: 'Não sei', correct: false, skip: true },
      ],
    },
  ],
  campo4: [
    {
      tier: 'low',
      question: 'Como se chama esta emoção? 😢',
      emoji: '🎭',
      options: [
        { text: 'Triste', correct: true },
        { text: 'Feliz', correct: false },
        { text: 'Não sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'mid',
      question: 'Um amigo está triste. O que fazes?',
      emoji: '🤝',
      options: [
        { text: 'Pergunto se está bem e se posso ajudar', correct: true },
        { text: 'Ignoro', correct: false },
        { text: 'Não sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'high',
      question: 'Tens teste amanhã e os amigos chamam para jogar. O que decides?',
      emoji: '📚',
      options: [
        { text: 'Estudo primeiro, jogo depois', correct: true },
        { text: 'Vou jogar, não estudo', correct: false },
        { text: 'Não sei', correct: false, skip: true },
      ],
    },
  ],
}

/**
 * Calculate starting competency level (1-10) from diagnostic results + profile info.
 *
 * @param {Object} diagnosticResults - { campo1: [true/false, ...], campo2: [...], ... }
 * @param {Object} profileInfo - { age, readingLevel, supportLevel }
 * @returns {Object} - { campo1: number, campo2: number, campo3: number, campo4: number }
 */
export function calculateStartingLevels(diagnosticResults, profileInfo) {
  const levels = {}
  const age = profileInfo.age || 8
  const support = profileInfo.supportLevel || 'some'

  for (const campoId of ['campo1', 'campo2', 'campo3', 'campo4']) {
    const answers = diagnosticResults[campoId] || [false, false, false]
    const low = answers[0] === true
    const mid = answers[1] === true
    const high = answers[2] === true

    // Base level from diagnostic answers
    let base
    if (high && mid && low) {
      base = 8    // Got all 3 right — high level
    } else if (mid && low) {
      base = 6    // Got low + mid right
    } else if (low && high) {
      base = 5    // Got low + high but missed mid (inconsistent, place mid)
    } else if (low) {
      base = 3    // Only got the easy one
    } else if (mid) {
      base = 4    // Got mid but not low (guessing? place cautiously)
    } else if (high) {
      base = 5    // Only got hard one (lucky guess? place mid)
    } else {
      base = 1    // Got nothing right or skipped all
    }

    // Age modifier: older children who score low may still be higher than young ones
    // This is subtle — just a nudge, not a jump
    const ageMod = age >= 12 ? 1 : age >= 10 ? 0.5 : 0

    // Support level modifier
    const supportMod = support === 'full' ? -0.5 : support === 'independent' ? 0.5 : 0

    // Reading level affects campo1 specifically
    let readingMod = 0
    if (campoId === 'campo1') {
      if (profileInfo.readingLevel === 'pre-reader') readingMod = -1
      else if (profileInfo.readingLevel === 'fluent') readingMod = 1
    }

    const final = Math.max(1, Math.min(10, Math.round(base + ageMod + supportMod + readingMod)))
    levels[campoId] = final
  }

  return levels
}

/**
 * Calculate current mastery level based on starting level + activity performance.
 * The starting level (from intake) sets the baseline.
 * Activity performance can advance beyond it.
 */
export function calculateMastery(competencyId, progress, competencyLevels) {
  const allComps = Object.values(COMPETENCY_AREAS).flatMap((c) =>
    c.competencies.map((comp) => ({ ...comp, campoId: c.id }))
  )
  const comp = allComps.find((c) => c.id === competencyId)
  if (!comp) return 'seed'

  // Get the starting level for this campo (from intake diagnostic)
  const startingLevel = competencyLevels?.[comp.campoId] || 1

  const completed = comp.activities.filter(
    (a) => progress.activitiesCompleted?.[a]
  )
  const totalStars = completed.reduce(
    (sum, a) => sum + (progress.activitiesCompleted[a]?.stars || 0),
    0
  )
  const maxStars = comp.activities.length * 3

  // Performance ratio from activities
  const ratio = maxStars > 0 ? totalStars / maxStars : 0

  // Performance can push the level UP from starting level
  // Each activity completion with 3 stars adds ~1 level, 2 stars adds ~0.5
  const performanceBoost = ratio >= 0.9 ? 3
    : ratio >= 0.7 ? 2
    : ratio >= 0.5 ? 1
    : ratio >= 0.3 ? 0.5
    : 0

  // But only count if they've actually done activities
  const hasActivity = completed.length > 0
  const effectiveLevel = hasActivity
    ? Math.min(10, startingLevel + performanceBoost)
    : startingLevel

  return levelToId(effectiveLevel)
}

/**
 * Get a summary of all competencies with current mastery.
 */
export function getCompetencySummary(progress, competencyLevels) {
  const summary = {}
  for (const [campoId, campo] of Object.entries(COMPETENCY_AREAS)) {
    summary[campoId] = campo.competencies.map((comp) => {
      const mastery = calculateMastery(comp.id, progress, competencyLevels)
      const numericLevel = idToLevel(mastery)
      return {
        ...comp,
        mastery,
        numericLevel,
        phase: getPhase(numericLevel),
      }
    })
  }
  return summary
}

/**
 * Get a per-campo phase summary (for reports and therapist communication).
 * Returns the dominant phase per campo based on average competency level.
 */
export function getCampoPhases(progress, competencyLevels) {
  const summary = getCompetencySummary(progress, competencyLevels)
  const result = {}
  for (const [campoId, comps] of Object.entries(summary)) {
    const avg = comps.reduce((s, c) => s + c.numericLevel, 0) / comps.length
    result[campoId] = {
      averageLevel: Math.round(avg * 10) / 10,
      phase: getPhase(Math.round(avg)),
    }
  }
  return result
}
