/**
 * Activity definitions for all 4 Campos.
 * Each activity has a type, difficulty, and configuration.
 */

export const CAMPO_INFO = [
  {
    id: 'campo1',
    name: 'A Bancada',
    subtitle: 'Linguagem e Comunicacao',
    icon: '🗣️',
    emoji: '⚽',
    color: 'var(--color-campo1)',
    description: 'Na bancada, ouvimos, falamos, lemos e escrevemos.',
    path: '/campo/1',
  },
  {
    id: 'campo2',
    name: 'O Marcador',
    subtitle: 'Matematica e Logica',
    icon: '🔢',
    emoji: '⚽',
    color: 'var(--color-campo2)',
    description: 'O marcador e onde os numeros contam a historia do jogo.',
    path: '/campo/2',
  },
  {
    id: 'campo3',
    name: 'O Mundo',
    subtitle: 'Conhecimento e Descoberta',
    icon: '🌍',
    emoji: '⚽',
    color: 'var(--color-campo3)',
    description: 'O futebol e jogado em todo o planeta.',
    path: '/campo/3',
  },
  {
    id: 'campo4',
    name: 'A Vida',
    subtitle: 'Autonomia e Competencias Sociais',
    icon: '🤝',
    emoji: '⚽',
    color: 'var(--color-campo4)',
    description: 'Saber viver e o jogo mais importante.',
    path: '/campo/4',
  },
]

export const CAMPO1_ACTIVITIES = [
  {
    id: 'vocab-match',
    name: 'Liga a Palavra',
    description: 'Associa a palavra em ingles a imagem correcta.',
    icon: '🔗',
    type: 'vocabulary-match',
    difficulty: 1,
  },
  {
    id: 'dress-player',
    name: 'Veste o Jogador',
    description: 'Arrasta as pecas de roupa para vestir o jogador.',
    icon: '👕',
    type: 'dress-player',
    difficulty: 1,
  },
  {
    id: 'color-kit',
    name: 'Pinta o Equipamento',
    description: 'Pinta o equipamento com as cores da equipa.',
    icon: '🎨',
    type: 'color-kit',
    difficulty: 1,
  },
  {
    id: 'read-score',
    name: 'Le o Resultado',
    description: 'Le o resultado do jogo em ingles.',
    icon: '📊',
    type: 'read-score',
    difficulty: 2,
  },
  {
    id: 'phonics',
    name: 'Sons e Letras',
    description: 'Associa letras a sons e descobre palavras.',
    icon: '🔤',
    type: 'phonics',
    difficulty: 1,
  },
]

export const CAMPO2_ACTIVITIES = [
  {
    id: 'goal-math',
    name: 'Golos e Contas',
    description: 'Soma e subtrai golos para encontrar o resultado.',
    icon: '⚽',
    type: 'goal-math',
    difficulty: 1,
  },
  {
    id: 'clock-reader',
    name: 'Hora do Jogo',
    description: 'Le as horas no relogio do estadio.',
    icon: '⏰',
    type: 'clock-reader',
    difficulty: 2,
  },
  {
    id: 'team-division',
    name: 'Divide a Equipa',
    description: 'Divide jogadores em equipas iguais.',
    icon: '👥',
    type: 'team-division',
    difficulty: 2,
  },
  {
    id: 'ticket-shop',
    name: 'Loja do Clube',
    description: 'Compra bilhetes e calcula o troco.',
    icon: '🎫',
    type: 'ticket-shop',
    difficulty: 3,
  },
  {
    id: 'patterns',
    name: 'Padroes e Sequencias',
    description: 'Descobre o padrao e continua a sequencia.',
    icon: '🧩',
    type: 'patterns',
    difficulty: 1,
  },
]

export const CAMPO3_ACTIVITIES = [
  {
    id: 'flag-match',
    name: 'Bandeiras do Mundo',
    description: 'Associa a bandeira ao pais da seleccao.',
    icon: '🏴',
    type: 'flag-match',
    difficulty: 1,
  },
  {
    id: 'world-explorer',
    name: 'Explorador do Mundo',
    description: 'Descobre onde ficam os paises das grandes seleccoes.',
    icon: '🗺️',
    type: 'world-explorer',
    difficulty: 2,
  },
  {
    id: 'body-science',
    name: 'Ciencia do Corpo',
    description: 'Como funciona o corpo durante o exercicio.',
    icon: '🫀',
    type: 'body-science',
    difficulty: 2,
  },
  {
    id: 'weather-match',
    name: 'Tempo no Estadio',
    description: 'Le a temperatura e veste o jogador para o clima.',
    icon: '🌤️',
    type: 'weather-match',
    difficulty: 1,
  },
  {
    id: 'nature-lab',
    name: 'Laboratorio Natural',
    description: 'Descobre como funciona a natureza e a ciencia.',
    icon: '🔬',
    type: 'nature-lab',
    difficulty: 2,
  },
]

export const CAMPO4_ACTIVITIES = [
  {
    id: 'daily-routine',
    name: 'Rotina do Campeao',
    description: 'Organiza a rotina diaria como um jogador profissional.',
    icon: '📋',
    type: 'daily-routine',
    difficulty: 1,
  },
  {
    id: 'fair-play',
    name: 'Fair Play',
    description: 'Escolhe a melhor resposta em situacoes sociais.',
    icon: '🤝',
    type: 'fair-play',
    difficulty: 1,
  },
  {
    id: 'emotion-cards',
    name: 'Cartoes das Emocoes',
    description: 'Identifica e gere emocoes como um verdadeiro jogador.',
    icon: '🟨',
    type: 'emotion-cards',
    difficulty: 1,
  },
  {
    id: 'real-world',
    name: 'No Mundo Real',
    description: 'Pratica habilidades para o dia-a-dia.',
    icon: '🏙️',
    type: 'real-world',
    difficulty: 2,
  },
  {
    id: 'problem-solving',
    name: 'Resolver Problemas',
    description: 'Pensa criticamente e resolve situacoes da vida.',
    icon: '🧠',
    type: 'problem-solving',
    difficulty: 2,
  },
]
