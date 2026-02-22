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
 *   6  Botao      (Bud)        — ready to bloom
 *   7  Flor       (Flower)     — skills blooming
 *   8  Fruto      (Fruit)      — producing results
 *   9  Arvore     (Tree)       — strong and independent
 *  10  Floresta   (Forest)     — mastery, can teach others
 *
 * Phases (communication layer for therapists/parents):
 *   Germinar    (1-3)  — Exploracao, tentativa, curiosidade
 *   Estruturar  (4-6)  — Competencia a formar-se, menos apoio
 *   Florescer   (7-8)  — Autonomia emergente
 *   Sustentar   (9-10) — Autonomia consolidada, pode ajudar outros
 */

export const MASTERY_LEVELS = [
  { id: 'seed',    order: 1,  label: 'Semente',  emoji: '🌱', description: 'A explorar' },
  { id: 'root',    order: 2,  label: 'Raiz',     emoji: '🌿', description: 'A criar bases' },
  { id: 'sprout',  order: 3,  label: 'Broto',    emoji: '🌾', description: 'Primeiros sinais' },
  { id: 'stem',    order: 4,  label: 'Caule',    emoji: '🪴', description: 'A ganhar estrutura' },
  { id: 'leaf',    order: 5,  label: 'Folha',    emoji: '🍃', description: 'A expandir' },
  { id: 'bud',     order: 6,  label: 'Botao',    emoji: '🌷', description: 'Pronto a florescer' },
  { id: 'flower',  order: 7,  label: 'Flor',     emoji: '🌸', description: 'A florescer' },
  { id: 'fruit',   order: 8,  label: 'Fruto',    emoji: '🍎', description: 'A produzir' },
  { id: 'tree',    order: 9,  label: 'Arvore',   emoji: '🌳', description: 'Forte e autonomo' },
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
    description: 'Exploracao, tentativa, curiosidade',
    reportText: 'em fase de Germinar',
    color: '#81C784',
  },
  {
    id: 'estruturar',
    label: 'Estruturar',
    emoji: '🌿',
    range: [4, 6],
    description: 'Competencia a formar-se, menos apoio necessario',
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
    name: 'Linguagem e Comunicacao',
    icon: '🗣️',
    competencies: [
      {
        id: 'c1-vocab-en',
        name: 'Vocabulario Ingles',
        description: 'Compreender e usar palavras em ingles',
        activities: ['vocab-match', 'dress-player', 'color-kit', 'read-score'],
        milestones: {
          seed:   'Ouve palavras em ingles com curiosidade',
          root:   'Reconhece 5-10 palavras basicas',
          sprout: 'Reconhece 15-20 palavras e repete',
          stem:   'Reconhece 30+ palavras com imagem',
          leaf:   'Usa 40+ palavras em contexto simples',
          bud:    'Compreende frases curtas em ingles',
          flower: 'Usa 60+ palavras e forma frases',
          fruit:  'Comunica ideias simples em ingles',
          tree:   'Le e compreende textos simples',
          forest: 'Usa ingles com confianca e fluencia',
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
          stem:   'Junta sons para formar silabas',
          leaf:   'Le palavras simples (CVC)',
          bud:    'Le palavras com digrafos',
          flower: 'Le frases curtas com apoio',
          fruit:  'Le frases curtas sozinho',
          tree:   'Le paragrafos simples',
          forest: 'Le textos com fluencia e compreensao',
        },
      },
      {
        id: 'c1-listening',
        name: 'Compreensao Auditiva',
        description: 'Compreender instrucoes e historias faladas',
        activities: ['read-score', 'phonics'],
        milestones: {
          seed:   'Atende a sons e vozes',
          root:   'Segue instrucoes de 1 passo',
          sprout: 'Segue instrucoes de 2 passos',
          stem:   'Compreende perguntas simples',
          leaf:   'Compreende historias curtas (3-4 frases)',
          bud:    'Reconta historias com ajuda',
          flower: 'Compreende instrucoes complexas',
          fruit:  'Reconta historias sozinho',
          tree:   'Segue conversas e narrativas longas',
          forest: 'Infere significados e interpreta',
        },
      },
    ],
  },

  campo2: {
    id: 'campo2',
    name: 'Matematica e Logica',
    icon: '🔢',
    competencies: [
      {
        id: 'c2-number',
        name: 'Sentido de Numero',
        description: 'Compreender quantidades, contar e calcular',
        activities: ['goal-math', 'ticket-shop', 'team-division'],
        milestones: {
          seed:   'Conta objectos ate 5',
          root:   'Conta ate 10 e reconhece numeros',
          sprout: 'Conta ate 20 e soma ate 5',
          stem:   'Soma e subtrai ate 10',
          leaf:   'Soma e subtrai ate 20',
          bud:    'Compreende multiplicacao basica',
          flower: 'Multiplica e divide ate 5',
          fruit:  'Opera com numeros ate 100',
          tree:   'Resolve problemas multi-passo',
          forest: 'Aplica operacoes a situacoes reais',
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
          sprout: 'Le horas exactas',
          stem:   'Le meias horas',
          leaf:   'Le quartos de hora',
          bud:    'Le qualquer hora no relogio',
          flower: 'Estima duracoes (5min, 1h)',
          fruit:  'Planeia usando o tempo',
          tree:   'Converte unidades de tempo',
          forest: 'Gere o proprio tempo de forma autonoma',
        },
      },
      {
        id: 'c2-patterns',
        name: 'Padroes e Logica',
        description: 'Reconhecer padroes, sequencias e pensar logicamente',
        activities: ['patterns'],
        milestones: {
          seed:   'Reconhece cores e formas',
          root:   'Agrupa objectos por caracteristica',
          sprout: 'Continua padroes simples (AB)',
          stem:   'Reconhece padroes ABC e AAB',
          leaf:   'Completa sequencias numericas simples',
          bud:    'Cria os proprios padroes',
          flower: 'Identifica padroes em contextos novos',
          fruit:  'Resolve problemas logicos simples',
          tree:   'Aplica raciocinio logico a situacoes reais',
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
        description: 'Conhecer paises, continentes e culturas',
        activities: ['flag-match', 'world-explorer', 'weather-match'],
        milestones: {
          seed:   'Sabe que existem outros paises',
          root:   'Identifica 3-5 paises',
          sprout: 'Identifica 8-10 paises e bandeiras',
          stem:   'Conhece os 6 continentes',
          leaf:   'Localiza paises nos continentes',
          bud:    'Relaciona clima e geografia',
          flower: 'Compara culturas e costumes',
          fruit:  'Compreende relacoes entre regioes',
          tree:   'Analisa questoes globais simples',
          forest: 'Pensamento global e intercultural',
        },
      },
      {
        id: 'c3-science',
        name: 'Ciencia e Corpo',
        description: 'Compreender o corpo, a saude e o mundo natural',
        activities: ['body-science', 'nature-lab'],
        milestones: {
          seed:   'Mostra curiosidade pelo mundo',
          root:   'Identifica partes do corpo',
          sprout: 'Conhece os 5 sentidos',
          stem:   'Compreende necessidades basicas dos seres vivos',
          leaf:   'Faz observacoes e previsoes',
          bud:    'Compreende ciclos naturais (agua, dia/noite)',
          flower: 'Conhece cadeias alimentares simples',
          fruit:  'Explica causas e efeitos naturais',
          tree:   'Desenha experiencias simples',
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
        name: 'Inteligencia Emocional',
        description: 'Identificar e gerir emocoes',
        activities: ['emotion-cards', 'fair-play'],
        milestones: {
          seed:   'Expressa emocoes basicas',
          root:   'Nomeia 4 emocoes (feliz, triste, zangado, medo)',
          sprout: 'Identifica emocoes nos outros',
          stem:   'Descreve o que causa emocoes',
          leaf:   'Usa 1 estrategia para se acalmar',
          bud:    'Escolhe estrategias diferentes por situacao',
          flower: 'Gere emocoes em conflitos simples',
          fruit:  'Gere conflitos de forma autonoma',
          tree:   'Apoia outros a gerir emocoes',
          forest: 'Inteligencia emocional madura',
        },
      },
      {
        id: 'c4-life',
        name: 'Autonomia e Vida Pratica',
        description: 'Rotinas, seguranca e resolucao de problemas',
        activities: ['daily-routine', 'real-world', 'problem-solving'],
        milestones: {
          seed:   'Reconhece rotinas com ajuda',
          root:   'Segue uma rotina simples com apoio',
          sprout: 'Segue rotina com lembretes',
          stem:   'Organiza a propria rotina com ajuda',
          leaf:   'Organiza a rotina sozinho',
          bud:    'Resolve problemas simples do dia-a-dia',
          flower: 'Toma decisoes simples entre opcoes',
          fruit:  'Planeia e executa tarefas multi-passo',
          tree:   'Avalia consequencias antes de decidir',
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
      question: 'O que e isto em ingles?',
      emoji: '🐕',
      hint: 'Dog / Cat / Fish',
      options: [
        { text: 'Dog', correct: true },
        { text: 'Table', correct: false },
        { text: 'Nao sei', correct: false, skip: true },
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
        { text: 'Nao sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'high',
      question: 'O que significa "She is running to the park"?',
      emoji: '🏃‍♀️',
      options: [
        { text: 'Ela esta a correr para o parque', correct: true },
        { text: 'Ela esta a dormir', correct: false },
        { text: 'Nao sei', correct: false, skip: true },
      ],
    },
  ],
  campo2: [
    {
      tier: 'low',
      question: 'Quanto e 3 + 2?',
      emoji: '🔢',
      options: [
        { text: '5', correct: true },
        { text: '4', correct: false },
        { text: 'Nao sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'mid',
      question: 'Quanto e 15 - 8?',
      emoji: '🔢',
      options: [
        { text: '7', correct: true },
        { text: '6', correct: false },
        { text: 'Nao sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'high',
      question: 'Se 4 equipas tem 6 jogadores cada, quantos jogadores ha?',
      emoji: '⚽',
      options: [
        { text: '24', correct: true },
        { text: '10', correct: false },
        { text: 'Nao sei', correct: false, skip: true },
      ],
    },
  ],
  campo3: [
    {
      tier: 'low',
      question: 'De que pais e esta bandeira? 🇧🇷',
      emoji: '🏴',
      options: [
        { text: 'Brasil', correct: true },
        { text: 'Japao', correct: false },
        { text: 'Nao sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'mid',
      question: 'De que precisam as plantas para crescer?',
      emoji: '🌱',
      options: [
        { text: 'Agua, sol e terra', correct: true },
        { text: 'Apenas chocolate', correct: false },
        { text: 'Nao sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'high',
      question: 'Porque temos dia e noite?',
      emoji: '🌍',
      options: [
        { text: 'Porque a Terra gira', correct: true },
        { text: 'Porque o Sol se apaga', correct: false },
        { text: 'Nao sei', correct: false, skip: true },
      ],
    },
  ],
  campo4: [
    {
      tier: 'low',
      question: 'Como se chama esta emocao? 😢',
      emoji: '🎭',
      options: [
        { text: 'Triste', correct: true },
        { text: 'Feliz', correct: false },
        { text: 'Nao sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'mid',
      question: 'Um amigo esta triste. O que fazes?',
      emoji: '🤝',
      options: [
        { text: 'Pergunto se esta bem e se posso ajudar', correct: true },
        { text: 'Ignoro', correct: false },
        { text: 'Nao sei', correct: false, skip: true },
      ],
    },
    {
      tier: 'high',
      question: 'Tens teste amanha e os amigos chamam para jogar. O que decides?',
      emoji: '📚',
      options: [
        { text: 'Estudo primeiro, jogo depois', correct: true },
        { text: 'Vou jogar, nao estudo', correct: false },
        { text: 'Nao sei', correct: false, skip: true },
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
