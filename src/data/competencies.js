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
          tree:   'Analisa questões globais simples',
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
          bud:    'Compreende ciclos naturais (água, dia/noite)',
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
    name: 'Autonomia e Vida Prática',
    icon: '🏠',
    competencies: [
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
      {
        id: 'c4-health',
        name: 'Saúde e Bem-estar',
        description: 'Escolhas saudáveis, higiene e planeamento',
        activities: ['healthy-choices', 'time-planner'],
        milestones: {
          seed:   'Reconhece hábitos básicos de higiene',
          root:   'Identifica alimentos saudáveis',
          sprout: 'Segue rotinas de higiene com ajuda',
          stem:   'Faz escolhas saudáveis simples',
          leaf:   'Planeia refeições simples',
          bud:    'Organiza o tempo com ajuda',
          flower: 'Faz escolhas saudáveis sozinho',
          fruit:  'Planeia o próprio dia',
          tree:   'Gere bem-estar de forma autónoma',
          forest: 'Autonomia total em saúde e planeamento',
        },
      },
    ],
  },

  campo5: {
    id: 'campo5',
    name: 'Expressão e Criatividade',
    icon: '🎨',
    competencies: [
      {
        id: 'c5-narrative',
        name: 'Narrativa e Imaginação',
        description: 'Construir histórias e expressar ideias',
        activities: ['story-builder', 'sound-story'],
        milestones: {
          seed:   'Escolhe imagens que lhe interessam',
          root:   'Ordena 2-3 imagens numa sequência',
          sprout: 'Conta uma história simples com ajuda',
          stem:   'Cria histórias com início, meio e fim',
          leaf:   'Adiciona detalhes e emoções às histórias',
          bud:    'Cria histórias com conflito e resolução',
          flower: 'Usa diferentes cenários e personagens',
          fruit:  'Conta histórias com expressividade',
          tree:   'Cria narrativas originais e complexas',
          forest: 'Expressa ideias e sentimentos através de histórias',
        },
      },
      {
        id: 'c5-visual',
        name: 'Expressão Visual',
        description: 'Desenhar, pintar e criar padrões',
        activities: ['color-canvas', 'pattern-art'],
        milestones: {
          seed:   'Explora cores e formas livremente',
          root:   'Faz traços e formas intencionais',
          sprout: 'Usa 3+ cores em composições',
          stem:   'Cria padrões simples (AB)',
          leaf:   'Desenha formas reconhecíveis',
          bud:    'Cria composições com simetria',
          flower: 'Usa cor e forma para expressar ideias',
          fruit:  'Cria mandalas e padrões complexos',
          tree:   'Desenvolve estilo visual próprio',
          forest: 'Expressão visual rica e intencional',
        },
      },
      {
        id: 'c5-musical',
        name: 'Expressão Musical',
        description: 'Criar ritmos, melodias e paisagens sonoras',
        activities: ['music-maker'],
        milestones: {
          seed:   'Explora sons com curiosidade',
          root:   'Distingue sons altos e baixos',
          sprout: 'Repete ritmos simples de 2 batidas',
          stem:   'Cria sequências de 4 batidas',
          leaf:   'Combina ritmo e melodia simples',
          bud:    'Cria padrões rítmicos originais',
          flower: 'Compõe melodias curtas',
          fruit:  'Combina instrumentos e ritmos',
          tree:   'Cria composições com estrutura',
          forest: 'Expressão musical criativa e autónoma',
        },
      },
    ],
  },

  campo6: {
    id: 'campo6',
    name: 'Social e Emocional',
    icon: '💚',
    competencies: [
      {
        id: 'c6-emotions',
        name: 'Inteligência Emocional',
        description: 'Identificar e gerir emoções',
        activities: ['emotion-cards', 'calm-toolkit'],
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
        id: 'c6-social',
        name: 'Competências Sociais',
        description: 'Comunicação, turnos de conversa e leitura social',
        activities: ['fair-play', 'social-detective', 'turn-talk'],
        milestones: {
          seed:   'Observa interacções com curiosidade',
          root:   'Responde a cumprimentos simples',
          sprout: 'Espera a sua vez com ajuda',
          stem:   'Identifica emoções básicas nos outros',
          leaf:   'Espera a sua vez de falar',
          bud:    'Interpreta expressões faciais',
          flower: 'Lê linguagem corporal simples',
          fruit:  'Adapta o comportamento ao contexto',
          tree:   'Resolve conflitos sociais de forma autónoma',
          forest: 'Competência social madura e empática',
        },
      },
    ],
  },

  campo7: {
    id: 'campo7',
    name: 'Literatura e Imaginação',
    icon: '📚',
    competencies: [
      {
        id: 'c7-listening',
        name: 'Compreensão Narrativa',
        description: 'Compreender e seguir histórias narradas',
        activities: ['contos-vivos', 'fabulas-mundo'],
        milestones: {
          seed:   'Ouve histórias curtas com atenção',
          root:   'Reconhece personagens principais',
          sprout: 'Segue uma história de 5 cenas',
          stem:   'Identifica início, meio e fim',
          leaf:   'Compreende motivações das personagens',
          bud:    'Antecipa o que vai acontecer',
          flower: 'Compreende metáforas simples',
          fruit:  'Interpreta mensagens implícitas',
          tree:   'Analisa histórias com pensamento crítico',
          forest: 'Compreensão literária madura',
        },
      },
      {
        id: 'c7-emotion',
        name: 'Empatia Literária',
        description: 'Reconhecer e sentir emoções das personagens',
        activities: ['contos-vivos', 'teatro-vozes'],
        milestones: {
          seed:   'Reage a tons de voz (feliz, triste)',
          root:   'Identifica se personagem está feliz ou triste',
          sprout: 'Nomeia 4 emoções em personagens',
          stem:   'Explica porque a personagem se sente assim',
          leaf:   'Relaciona emoções a situações da história',
          bud:    'Compara sentimentos de personagens diferentes',
          flower: 'Compreende emoções complexas (saudade, orgulho)',
          fruit:  'Debate escolhas morais das personagens',
          tree:   'Perspectiva-se no lugar das personagens',
          forest: 'Empatia literária profunda e autónoma',
        },
      },
      {
        id: 'c7-creative',
        name: 'Expressão Narrativa',
        description: 'Criar e recontar histórias com voz própria',
        activities: ['meu-conto', 'poesia-sonora'],
        milestones: {
          seed:   'Escolhe elementos para uma história',
          root:   'Ordena 3 eventos numa sequência',
          sprout: 'Cria uma história curta com ajuda',
          stem:   'Reconta uma história ouvida',
          leaf:   'Adiciona detalhes próprios a histórias',
          bud:    'Cria histórias com conflito e resolução',
          flower: 'Usa vocabulário expressivo',
          fruit:  'Cria narrativas originais com voz própria',
          tree:   'Experimenta estilos narrativos diferentes',
          forest: 'Expressão narrativa rica e autónoma',
        },
      },
    ],
  },
}

/**
 * PROGRESSIVE ADAPTIVE DIAGNOSTIC
 *
 * Each campo has 8+ questions ordered by difficulty (level 1→10).
 * The test climbs until the child fails 2 in a row, then stops for that campo.
 * Level = highest question answered correctly.
 *
 * This detects REAL skill level. A child who counts to 40 but can't subtract
 * gets placed at level 4-5, not level 1 or level 9.
 *
 * Can be answered by the child, parent, or therapist.
 */
export const DIAGNOSTIC_QUESTIONS = {
  // ─── MATEMÁTICA — from counting objects to multi-step problems ───
  campo2: [
    { level: 1, question: 'Conta estes objectos:', visual: '🟢🟢🟢', hint: 'Quantos círculos verdes vês?',
      options: [{ text: '3', correct: true }, { text: '5', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 2, question: 'Que número vem a seguir? 1, 2, 3, 4, 5, ...', hint: 'Continua a contar',
      options: [{ text: '6', correct: true }, { text: '7', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 3, question: 'Conta de 10 em 10: 10, 20, 30, ...', hint: 'Qual é o próximo?',
      options: [{ text: '40', correct: true }, { text: '35', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 4, question: 'Quanto é 5 + 3?', visual: '🟢🟢🟢🟢🟢 + 🟢🟢🟢',
      options: [{ text: '8', correct: true }, { text: '7', correct: false }, { text: '9', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 5, question: 'Quanto é 12 + 9?',
      options: [{ text: '21', correct: true }, { text: '19', correct: false }, { text: '20', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 6, question: 'Quanto é 13 - 7?',
      options: [{ text: '6', correct: true }, { text: '7', correct: false }, { text: '5', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 7, question: 'Quanto é 4 x 3?', hint: '4 grupos de 3',
      options: [{ text: '12', correct: true }, { text: '7', correct: false }, { text: '10', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 8, question: '24 jogadores divididos em 6 equipas. Quantos em cada equipa?',
      options: [{ text: '4', correct: true }, { text: '3', correct: false }, { text: '6', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 9, question: 'Um jogo tem 3 partes de 15 minutos e 2 intervalos de 5 minutos. Quanto tempo dura?',
      options: [{ text: '55 minutos', correct: true }, { text: '45 minutos', correct: false }, { text: '50 minutos', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
  ],
  // ─── LINGUAGEM — from letter recognition to reading comprehension ───
  campo1: [
    { level: 1, question: 'Que letra é esta?', visual: 'A', visualStyle: 'bigLetter',
      options: [{ text: 'A', correct: true }, { text: 'B', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 2, question: 'Que som faz a letra B?', visual: 'B', visualStyle: 'bigLetter', hint: 'B de...',
      options: [{ text: 'Bola, bota, banana', correct: true }, { text: 'Rato, rio, roda', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 3, question: 'O que é isto em inglês?', visual: '🐕', hint: 'É um animal de estimação',
      options: [{ text: 'Dog', correct: true }, { text: 'Table', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 4, question: 'Qual destas é a palavra "cat" (gato)?',
      options: [{ text: 'CAT', correct: true }, { text: 'CUT', correct: false }, { text: 'COT', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 5, question: 'Completa: "The ball is ___"', hint: 'A bola é...',
      options: [{ text: 'round (redonda)', correct: true }, { text: 'eat (comer)', correct: false }, { text: 'run (correr)', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 6, question: 'Lê esta frase. O que significa?', visual: 'The dog is big.', visualStyle: 'sentence',
      options: [{ text: 'O cão é grande.', correct: true }, { text: 'O gato é pequeno.', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 7, question: 'O que significa "She is running to the park"?',
      options: [{ text: 'Ela está a correr para o parque', correct: true }, { text: 'Ela está a dormir no parque', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 8, question: 'Completa a frase: "Yesterday, I ___ to school."',
      options: [{ text: 'went', correct: true }, { text: 'go', correct: false }, { text: 'going', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
  ],
  // ─── DESCOBERTA — from basic observation to scientific reasoning ───
  campo3: [
    { level: 1, question: 'Que animal é maior?', visual: '🐘 ou 🐁?',
      options: [{ text: 'Elefante', correct: true }, { text: 'Rato', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 2, question: 'Que estação do ano tem neve?',
      options: [{ text: 'Inverno', correct: true }, { text: 'Verão', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 3, question: 'De que país é esta bandeira?', flagCode: 'BR', hint: 'Verde e amarela',
      options: [{ text: 'Brasil', correct: true }, { text: 'Japão', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 4, question: 'De que precisam as plantas para crescer?',
      options: [{ text: 'Água, sol e terra', correct: true }, { text: 'Apenas chocolate', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 5, question: 'Em que continente fica Portugal?',
      options: [{ text: 'Europa', correct: true }, { text: 'África', correct: false }, { text: 'Ásia', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 6, question: 'Porque temos dia e noite?',
      options: [{ text: 'Porque a Terra gira sobre si mesma', correct: true }, { text: 'Porque o Sol se apaga', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 7, question: 'O que acontece à água quando ferve?',
      options: [{ text: 'Transforma-se em vapor (gás)', correct: true }, { text: 'Fica mais fria', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 8, question: 'Porque é que os ursos polares são brancos?',
      options: [{ text: 'Para se camuflarem na neve', correct: true }, { text: 'Porque gostam de branco', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
  ],
  // ─── AUTONOMIA — from basic routines to decision-making ───
  campo4: [
    { level: 1, question: 'O que fazes quando acordas?',
      options: [{ text: 'Lavo os dentes e tomo o pequeno-almoço', correct: true }, { text: 'Vou logo brincar', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 2, question: 'Antes de comer, o que fazes?',
      options: [{ text: 'Lavo as mãos', correct: true }, { text: 'Nada', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 3, question: 'Está a chover. O que levas quando sais?',
      options: [{ text: 'Guarda-chuva ou impermeável', correct: true }, { text: 'Óculos de sol', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 4, question: 'Encontras uma nota de 5€ no chão da escola. O que fazes?',
      options: [{ text: 'Entrego ao professor', correct: true }, { text: 'Guardo para mim', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 5, question: 'Tens teste amanhã e os amigos chamam para jogar. O que decides?',
      options: [{ text: 'Estudo primeiro, jogo depois', correct: true }, { text: 'Vou jogar, o teste é amanhã', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 6, question: 'Queres comprar um brinquedo de 15€ e tens 10€. O que fazes?',
      options: [{ text: 'Poupo mais 5€ primeiro', correct: true }, { text: 'Peço emprestado', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 7, question: 'Tens 3 tarefas para fazer e pouco tempo. O que fazes?',
      options: [{ text: 'Organizo por prioridade e começo pela mais importante', correct: true }, { text: 'Faço a mais fácil e deixo o resto', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 8, question: 'Um colega está a ser gozado por outros. O que fazes?',
      options: [{ text: 'Apoio o colega e falo com um adulto', correct: true }, { text: 'Não me meto', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
  ],
  // ─── CRIATIVIDADE ───
  campo5: [
    { level: 1, question: 'Que cor gostas mais de usar para desenhar?',
      options: [{ text: 'Gosto de muitas cores!', correct: true }, { text: 'Não gosto de desenhar', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 3, question: 'Se pudesses inventar uma história, teria...',
      options: [{ text: 'Um herói, um problema e um final feliz', correct: true }, { text: 'Nada, não sei inventar histórias', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 5, question: 'Qual destas sequências completa o padrão? 🔴🔵🔴🔵...',
      options: [{ text: '🔴🔵', correct: true }, { text: '🔵🔵', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
  ],
  // ─── SOCIAL E EMOCIONAL ───
  campo6: [
    { level: 1, question: 'Como se chama esta emoção? 😢',
      options: [{ text: 'Triste', correct: true }, { text: 'Feliz', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 3, question: 'Um amigo está triste. O que fazes?',
      options: [{ text: 'Pergunto se está bem e se posso ajudar', correct: true }, { text: 'Ignoro', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 5, question: 'Estás chateado(a) com um amigo. O que fazes?',
      options: [{ text: 'Explico como me sinto com calma', correct: true }, { text: 'Grito e vou-me embora', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 7, question: 'Alguém está a falar e tu queres dizer algo. O que fazes?',
      options: [{ text: 'Espero que acabe e depois digo', correct: true }, { text: 'Interrompo', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
  ],
  // ─── LITERATURA ───
  campo7: [
    { level: 1, question: 'O lobo soprou e a casa caiu. Como se sentiu o porquinho?',
      options: [{ text: 'Assustado', correct: true }, { text: 'Contente', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 3, question: 'O Capuchinho Vermelho foi avisar a avó. Porque achas que foi?',
      options: [{ text: 'Porque se preocupava com ela', correct: true }, { text: 'Porque queria brincar', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
    { level: 5, question: '"O meu coração ficou pequenino." O que significa?',
      options: [{ text: 'Ficou muito triste', correct: true }, { text: 'O coração encolheu de verdade', correct: false }, { text: 'Não sei', correct: false, skip: true }] },
  ],
}

/**
 * Calculate starting competency level from the ADAPTIVE diagnostic.
 *
 * New format: diagnosticResults[campo] = array of { level, correct } entries.
 * The child's level = highest level they answered correctly.
 * Falls back to old format (array of booleans) for backward compatibility.
 *
 * @param {Object} diagnosticResults - { campo1: [{level, correct}, ...], ... }
 * @param {Object} profileInfo - { age, readingLevel, supportLevel }
 * @returns {Object} - { campo1: number, campo2: number, ... }
 */
export function calculateStartingLevels(diagnosticResults, profileInfo) {
  const levels = {}

  for (const campoId of ['campo1', 'campo2', 'campo3', 'campo4', 'campo5', 'campo6', 'campo7']) {
    const answers = diagnosticResults[campoId]
    if (!answers || answers.length === 0) {
      levels[campoId] = 1
      continue
    }

    // New format: [{level, correct}, ...]
    if (typeof answers[0] === 'object' && answers[0] !== null && 'level' in answers[0]) {
      let highestCorrect = 0
      for (const a of answers) {
        if (a.correct && a.level > highestCorrect) {
          highestCorrect = a.level
        }
      }
      levels[campoId] = Math.max(1, highestCorrect)
    } else {
      // Old format fallback: [true/false, true/false, true/false]
      const low = answers[0] === true
      const mid = answers[1] === true
      const high = answers[2] === true
      let base = 1
      if (high && mid && low) base = 4
      else if (mid && low) base = 3
      else if (low) base = 2
      levels[campoId] = base
    }
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
