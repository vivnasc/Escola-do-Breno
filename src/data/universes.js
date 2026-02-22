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
      campo1: { name: 'A Bancada', subtitle: 'Linguagem e Comunicacao', icon: '🗣️' },
      campo2: { name: 'O Marcador', subtitle: 'Matematica e Logica', icon: '🔢' },
      campo3: { name: 'O Mundo', subtitle: 'Conhecimento e Descoberta', icon: '🌍' },
      campo4: { name: 'A Vida', subtitle: 'Autonomia e Competencias Sociais', icon: '🤝' },
    },
    // Context words used across activities
    vocabulary: {
      place: 'estadio',
      hero: 'jogador',
      action: 'marcar golos',
      group: 'equipa',
      score: 'golo',
      event: 'jogo',
    },
    feedbackPositive: ['Golooo!', 'Grande jogada!', 'Fantastico!'],
    feedbackTryAgain: ['Quase! Tenta de novo.', 'Boa tentativa!'],
  },
  {
    id: 'dinosaurs',
    name: 'Dinossauros',
    icon: '🦕',
    color: '#795548',
    description: 'Explora o mundo dos dinossauros',
    campos: {
      campo1: { name: 'A Caverna', subtitle: 'Linguagem e Comunicacao', icon: '🗣️' },
      campo2: { name: 'Os Fosseis', subtitle: 'Matematica e Logica', icon: '🔢' },
      campo3: { name: 'O Jurassico', subtitle: 'Conhecimento e Descoberta', icon: '🌍' },
      campo4: { name: 'A Manada', subtitle: 'Autonomia e Competencias Sociais', icon: '🤝' },
    },
    vocabulary: {
      place: 'museu',
      hero: 'explorador',
      action: 'descobrir fosseis',
      group: 'manada',
      score: 'descoberta',
      event: 'escavacao',
    },
    feedbackPositive: ['Descoberta incrivel!', 'Grande explorador!', 'Fantastico!'],
    feedbackTryAgain: ['Quase! Escava mais um pouco.', 'Boa tentativa!'],
  },
  {
    id: 'space',
    name: 'Espaco',
    icon: '🚀',
    color: '#1A237E',
    description: 'Viaja pelo universo',
    campos: {
      campo1: { name: 'A Base', subtitle: 'Linguagem e Comunicacao', icon: '🗣️' },
      campo2: { name: 'O Painel', subtitle: 'Matematica e Logica', icon: '🔢' },
      campo3: { name: 'As Galaxias', subtitle: 'Conhecimento e Descoberta', icon: '🌍' },
      campo4: { name: 'A Tripulacao', subtitle: 'Autonomia e Competencias Sociais', icon: '🤝' },
    },
    vocabulary: {
      place: 'estacao espacial',
      hero: 'astronauta',
      action: 'explorar planetas',
      group: 'tripulacao',
      score: 'missao',
      event: 'lancamento',
    },
    feedbackPositive: ['Missao cumprida!', 'Grande astronauta!', 'Fantastico!'],
    feedbackTryAgain: ['Quase! Tenta outra orbita.', 'Boa tentativa!'],
  },
  {
    id: 'animals',
    name: 'Animais',
    icon: '🐾',
    color: '#E65100',
    description: 'Descobre o reino animal',
    campos: {
      campo1: { name: 'O Ninho', subtitle: 'Linguagem e Comunicacao', icon: '🗣️' },
      campo2: { name: 'As Pegadas', subtitle: 'Matematica e Logica', icon: '🔢' },
      campo3: { name: 'A Selva', subtitle: 'Conhecimento e Descoberta', icon: '🌍' },
      campo4: { name: 'A Matilha', subtitle: 'Autonomia e Competencias Sociais', icon: '🤝' },
    },
    vocabulary: {
      place: 'reserva natural',
      hero: 'veterinario',
      action: 'cuidar dos animais',
      group: 'matilha',
      score: 'animal salvo',
      event: 'safari',
    },
    feedbackPositive: ['Animal salvo!', 'Grande veterinario!', 'Fantastico!'],
    feedbackTryAgain: ['Quase! Tenta outra vez.', 'Boa tentativa!'],
  },
  {
    id: 'music',
    name: 'Musica',
    icon: '🎵',
    color: '#6A1B9A',
    description: 'Aprende com ritmo e melodia',
    campos: {
      campo1: { name: 'O Palco', subtitle: 'Linguagem e Comunicacao', icon: '🗣️' },
      campo2: { name: 'O Ritmo', subtitle: 'Matematica e Logica', icon: '🔢' },
      campo3: { name: 'O Concerto', subtitle: 'Conhecimento e Descoberta', icon: '🌍' },
      campo4: { name: 'A Banda', subtitle: 'Autonomia e Competencias Sociais', icon: '🤝' },
    },
    vocabulary: {
      place: 'sala de concertos',
      hero: 'musico',
      action: 'tocar musica',
      group: 'banda',
      score: 'nota perfeita',
      event: 'concerto',
    },
    feedbackPositive: ['Nota perfeita!', 'Grande musico!', 'Fantastico!'],
    feedbackTryAgain: ['Quase! Afina outra vez.', 'Boa tentativa!'],
  },
]

export function getUniverse(id) {
  return UNIVERSES.find((u) => u.id === id) || UNIVERSES[0]
}
