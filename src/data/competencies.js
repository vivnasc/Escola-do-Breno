/**
 * Competency Framework — global, not tied to any country's curriculum.
 *
 * Inspired by Cambridge Primary, IB PYP, and Montessori but expressed as
 * universal competency levels instead of grade/year labels.
 *
 * Each competency has mastery levels:
 *   seed     → foundation (just starting)
 *   sprout   → developing (building skills)
 *   bloom    → established (consistent)
 *   fruit    → mastery (independent application)
 *
 * The child advances when they demonstrate mastery, not by age.
 */

export const MASTERY_LEVELS = [
  { id: 'seed', label: 'Semente', emoji: '🌱', description: 'A comecar', order: 0 },
  { id: 'sprout', label: 'Broto', emoji: '🌿', description: 'A crescer', order: 1 },
  { id: 'bloom', label: 'Flor', emoji: '🌸', description: 'A desabrochar', order: 2 },
  { id: 'fruit', label: 'Fruto', emoji: '🍎', description: 'Maduro', order: 3 },
]

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
          seed: 'Reconhece 10+ palavras',
          sprout: 'Reconhece 30+ palavras',
          bloom: 'Reconhece 50+ palavras e usa em contexto',
          fruit: 'Usa 70+ palavras com confianca',
        },
      },
      {
        id: 'c1-phonics',
        name: 'Sons e Letras',
        description: 'Associar letras a sons e ler palavras simples',
        activities: ['phonics'],
        milestones: {
          seed: 'Reconhece sons de 10 letras',
          sprout: 'Junta sons para formar silabas',
          bloom: 'Le palavras simples (CVC)',
          fruit: 'Le frases curtas com fluencia',
        },
      },
      {
        id: 'c1-listening',
        name: 'Compreensao Auditiva',
        description: 'Compreender instrucoes e historias faladas',
        activities: ['read-score', 'phonics'],
        milestones: {
          seed: 'Segue instrucoes simples',
          sprout: 'Compreende frases com 2 instrucoes',
          bloom: 'Compreende historias curtas',
          fruit: 'Segue conversas e narrativas',
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
          seed: 'Conta ate 20 e soma ate 5',
          sprout: 'Soma e subtrai ate 20',
          bloom: 'Multiplica e divide com confianca',
          fruit: 'Resolve problemas do dia-a-dia com numeros',
        },
      },
      {
        id: 'c2-time',
        name: 'Tempo e Medida',
        description: 'Ler horas, medir e comparar',
        activities: ['clock-reader'],
        milestones: {
          seed: 'Le horas exactas',
          sprout: 'Le meias horas e quartos',
          bloom: 'Le qualquer hora no relogio',
          fruit: 'Planeia o tempo e estima duracoes',
        },
      },
      {
        id: 'c2-patterns',
        name: 'Padroes e Logica',
        description: 'Reconhecer padroes, sequencias e pensar logicamente',
        activities: ['patterns'],
        milestones: {
          seed: 'Continua padroes simples (AB)',
          sprout: 'Reconhece padroes complexos (ABC, AAB)',
          bloom: 'Cria os proprios padroes',
          fruit: 'Aplica logica a problemas novos',
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
          seed: 'Identifica 5 paises',
          sprout: 'Conhece todos os continentes',
          bloom: 'Relaciona clima, cultura e geografia',
          fruit: 'Compara diferentes regioes do mundo',
        },
      },
      {
        id: 'c3-science',
        name: 'Ciencia e Corpo',
        description: 'Compreender o corpo, a saude e o mundo natural',
        activities: ['body-science', 'nature-lab'],
        milestones: {
          seed: 'Identifica partes do corpo e sentidos',
          sprout: 'Compreende funcoes basicas do corpo',
          bloom: 'Faz observacoes e previsoes',
          fruit: 'Explica causas e efeitos naturais',
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
          seed: 'Nomeia 4 emocoes basicas',
          sprout: 'Identifica emocoes nos outros',
          bloom: 'Usa estrategias para se acalmar',
          fruit: 'Gere conflitos de forma independente',
        },
      },
      {
        id: 'c4-life',
        name: 'Autonomia e Vida Pratica',
        description: 'Rotinas, seguranca e resolucao de problemas',
        activities: ['daily-routine', 'real-world', 'problem-solving'],
        milestones: {
          seed: 'Segue uma rotina com ajuda',
          sprout: 'Organiza a propria rotina',
          bloom: 'Resolve problemas simples sozinho',
          fruit: 'Toma decisoes e avalia consequencias',
        },
      },
    ],
  },
}

/**
 * Calculate mastery level based on activity performance.
 * Uses stars earned across related activities.
 */
export function calculateMastery(competencyId, progress) {
  const allComps = Object.values(COMPETENCY_AREAS).flatMap((c) => c.competencies)
  const comp = allComps.find((c) => c.id === competencyId)
  if (!comp) return 'seed'

  const completed = comp.activities.filter(
    (a) => progress.activitiesCompleted?.[a]
  )
  const totalStars = completed.reduce(
    (sum, a) => sum + (progress.activitiesCompleted[a]?.stars || 0),
    0
  )
  const maxStars = comp.activities.length * 3
  const ratio = maxStars > 0 ? totalStars / maxStars : 0

  if (ratio >= 0.85) return 'fruit'
  if (ratio >= 0.6) return 'bloom'
  if (ratio >= 0.3) return 'sprout'
  return 'seed'
}

/**
 * Get a summary of all competencies with current mastery.
 */
export function getCompetencySummary(progress) {
  const summary = {}
  for (const [campoId, campo] of Object.entries(COMPETENCY_AREAS)) {
    summary[campoId] = campo.competencies.map((comp) => ({
      ...comp,
      mastery: calculateMastery(comp.id, progress),
    }))
  }
  return summary
}
