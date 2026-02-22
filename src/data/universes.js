/**
 * Thematic universes — the child picks their world, not just football.
 * Each universe recontextualizes the same learning objectives.
 */

export const UNIVERSES = [
  {
    id: 'football',
    name: 'Futebol',
    icon: '⚽',
    color: '#2E7D32',
    description: 'Aprende com o mundo do futebol',
    // How campo names adapt
    campos: {
      campo1: { name: 'A Bancada', subtitle: 'Linguagem e Comunicação', icon: '🗣️' },
      campo2: { name: 'O Marcador', subtitle: 'Matemática e Lógica', icon: '🔢' },
      campo3: { name: 'O Mundo', subtitle: 'Conhecimento e Descoberta', icon: '🌍' },
      campo4: { name: 'A Vida', subtitle: 'Autonomia e Competências Sociais', icon: '🤝' },
    },
    // Context words used across activities
    vocabulary: {
      place: 'estádio',
      hero: 'jogador',
      action: 'marcar golos',
      group: 'equipa',
      score: 'golo',
      event: 'jogo',
    },
    feedbackPositive: ['Golooo!', 'Grande jogada!', 'Fantástico!'],
    feedbackTryAgain: ['Quase! Tenta de novo.', 'Boa tentativa!'],
  },
  {
    id: 'dinosaurs',
    name: 'Dinossauros',
    icon: '🦕',
    color: '#795548',
    description: 'Explora o mundo dos dinossauros',
    campos: {
      campo1: { name: 'A Caverna', subtitle: 'Linguagem e Comunicação', icon: '🗣️' },
      campo2: { name: 'Os Fósseis', subtitle: 'Matemática e Lógica', icon: '🔢' },
      campo3: { name: 'O Jurássico', subtitle: 'Conhecimento e Descoberta', icon: '🌍' },
      campo4: { name: 'A Manada', subtitle: 'Autonomia e Competências Sociais', icon: '🤝' },
    },
    vocabulary: {
      place: 'museu',
      hero: 'explorador',
      action: 'descobrir fósseis',
      group: 'manada',
      score: 'descoberta',
      event: 'escavação',
    },
    feedbackPositive: ['Descoberta incrível!', 'Grande explorador!', 'Fantástico!'],
    feedbackTryAgain: ['Quase! Escava mais um pouco.', 'Boa tentativa!'],
  },
  {
    id: 'space',
    name: 'Espaço',
    icon: '🚀',
    color: '#1A237E',
    description: 'Viaja pelo universo',
    campos: {
      campo1: { name: 'A Base', subtitle: 'Linguagem e Comunicação', icon: '🗣️' },
      campo2: { name: 'O Painel', subtitle: 'Matemática e Lógica', icon: '🔢' },
      campo3: { name: 'As Galáxias', subtitle: 'Conhecimento e Descoberta', icon: '🌍' },
      campo4: { name: 'A Tripulação', subtitle: 'Autonomia e Competências Sociais', icon: '🤝' },
    },
    vocabulary: {
      place: 'estação espacial',
      hero: 'astronauta',
      action: 'explorar planetas',
      group: 'tripulação',
      score: 'missão',
      event: 'lançamento',
    },
    feedbackPositive: ['Missão cumprida!', 'Grande astronauta!', 'Fantástico!'],
    feedbackTryAgain: ['Quase! Tenta outra órbita.', 'Boa tentativa!'],
  },
  {
    id: 'animals',
    name: 'Animais',
    icon: '🐾',
    color: '#E65100',
    description: 'Descobre o reino animal',
    campos: {
      campo1: { name: 'O Ninho', subtitle: 'Linguagem e Comunicação', icon: '🗣️' },
      campo2: { name: 'As Pegadas', subtitle: 'Matemática e Lógica', icon: '🔢' },
      campo3: { name: 'A Selva', subtitle: 'Conhecimento e Descoberta', icon: '🌍' },
      campo4: { name: 'A Matilha', subtitle: 'Autonomia e Competências Sociais', icon: '🤝' },
    },
    vocabulary: {
      place: 'reserva natural',
      hero: 'veterinário',
      action: 'cuidar dos animais',
      group: 'matilha',
      score: 'animal salvo',
      event: 'safari',
    },
    feedbackPositive: ['Animal salvo!', 'Grande veterinário!', 'Fantástico!'],
    feedbackTryAgain: ['Quase! Tenta outra vez.', 'Boa tentativa!'],
  },
  {
    id: 'music',
    name: 'Música',
    icon: '🎵',
    color: '#6A1B9A',
    description: 'Aprende com ritmo e melodia',
    campos: {
      campo1: { name: 'O Palco', subtitle: 'Linguagem e Comunicação', icon: '🗣️' },
      campo2: { name: 'O Ritmo', subtitle: 'Matemática e Lógica', icon: '🔢' },
      campo3: { name: 'O Concerto', subtitle: 'Conhecimento e Descoberta', icon: '🌍' },
      campo4: { name: 'A Banda', subtitle: 'Autonomia e Competências Sociais', icon: '🤝' },
    },
    vocabulary: {
      place: 'sala de concertos',
      hero: 'músico',
      action: 'tocar música',
      group: 'banda',
      score: 'nota perfeita',
      event: 'concerto',
    },
    feedbackPositive: ['Nota perfeita!', 'Grande musico!', 'Fantástico!'],
    feedbackTryAgain: ['Quase! Afina outra vez.', 'Boa tentativa!'],
  },
]

export function getUniverse(id) {
  return UNIVERSES.find((u) => u.id === id) || UNIVERSES[0]
}
