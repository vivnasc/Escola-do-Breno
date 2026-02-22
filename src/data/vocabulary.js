/**
 * Cambridge Pre A1 Starters vocabulary contextualized for the football universe.
 * Each word includes: english, portuguese, category, context hint, and emoji.
 */

export const VOCABULARY_CATEGORIES = [
  {
    id: 'animals',
    label: 'Animals',
    labelPt: 'Animais',
    icon: '🦅',
    description: 'Mascotes de equipas mundiais',
    color: '#4CAF50',
  },
  {
    id: 'body',
    label: 'Body',
    labelPt: 'Corpo',
    icon: '🏃',
    description: 'Partes do corpo do jogador',
    color: '#2196F3',
  },
  {
    id: 'clothes',
    label: 'Clothes',
    labelPt: 'Roupa',
    icon: '👕',
    description: 'Equipamentos de futebol',
    color: '#FF9800',
  },
  {
    id: 'colours',
    label: 'Colours',
    labelPt: 'Cores',
    icon: '🎨',
    description: 'Cores das equipas',
    color: '#E91E63',
  },
  {
    id: 'food',
    label: 'Food & Drink',
    labelPt: 'Comida e Bebida',
    icon: '🍎',
    description: 'Alimentacao de atletas',
    color: '#F44336',
  },
  {
    id: 'numbers',
    label: 'Numbers',
    labelPt: 'Numeros',
    icon: '🔢',
    description: 'Resultados e dorsais',
    color: '#9C27B0',
  },
  {
    id: 'home',
    label: 'Home',
    labelPt: 'Casa',
    icon: '🏠',
    description: 'Casa do jogador',
    color: '#795548',
  },
  {
    id: 'school',
    label: 'School',
    labelPt: 'Escola',
    icon: '📚',
    description: 'Escola de futebol',
    color: '#607D8B',
  },
  {
    id: 'transport',
    label: 'Transport',
    labelPt: 'Transporte',
    icon: '✈️',
    description: 'Como a equipa viaja',
    color: '#00BCD4',
  },
  {
    id: 'sports',
    label: 'Sports',
    labelPt: 'Desportos',
    icon: '⚽',
    description: 'Treino cruzado',
    color: '#8BC34A',
  },
]

export const VOCABULARY_WORDS = [
  // Animals — team mascots
  { id: 1, en: 'eagle', pt: 'aguia', category: 'animals', context: 'Benfica', emoji: '🦅' },
  { id: 2, en: 'lion', pt: 'leao', category: 'animals', context: 'Sporting', emoji: '🦁' },
  { id: 3, en: 'dragon', pt: 'dragao', category: 'animals', context: 'FC Porto', emoji: '🐉' },
  { id: 4, en: 'rooster', pt: 'galo', category: 'animals', context: 'Tottenham', emoji: '🐓' },
  { id: 5, en: 'cat', pt: 'gato', category: 'animals', context: 'Sunderland', emoji: '🐱' },
  { id: 6, en: 'dog', pt: 'cao', category: 'animals', context: 'Mascote fiel', emoji: '🐕' },
  { id: 7, en: 'bird', pt: 'passaro', category: 'animals', context: 'Canario', emoji: '🐦' },
  { id: 8, en: 'fish', pt: 'peixe', category: 'animals', context: 'Aquario do estadio', emoji: '🐟' },
  { id: 9, en: 'horse', pt: 'cavalo', category: 'animals', context: 'Policia montada no jogo', emoji: '🐴' },
  { id: 10, en: 'bear', pt: 'urso', category: 'animals', context: 'Mascote forte', emoji: '🐻' },

  // Body — player body parts
  { id: 11, en: 'head', pt: 'cabeca', category: 'body', context: 'Cabecear a bola', emoji: '🗣️' },
  { id: 12, en: 'foot', pt: 'pe', category: 'body', context: 'Chutar a bola', emoji: '🦶' },
  { id: 13, en: 'hand', pt: 'mao', category: 'body', context: 'Guarda-redes', emoji: '✋' },
  { id: 14, en: 'leg', pt: 'perna', category: 'body', context: 'Correr no campo', emoji: '🦵' },
  { id: 15, en: 'arm', pt: 'braco', category: 'body', context: 'Lancar a bola', emoji: '💪' },
  { id: 16, en: 'eye', pt: 'olho', category: 'body', context: 'Ver o jogo', emoji: '👁️' },
  { id: 17, en: 'ear', pt: 'orelha', category: 'body', context: 'Ouvir o apito', emoji: '👂' },
  { id: 18, en: 'mouth', pt: 'boca', category: 'body', context: 'Gritar golo', emoji: '👄' },
  { id: 19, en: 'nose', pt: 'nariz', category: 'body', context: 'Respirar durante o treino', emoji: '👃' },

  // Clothes — football equipment
  { id: 20, en: 'shirt', pt: 'camisola', category: 'clothes', context: 'Camisola da equipa', emoji: '👕' },
  { id: 21, en: 'shorts', pt: 'calcoes', category: 'clothes', context: 'Calcoes do jogador', emoji: '🩳' },
  { id: 22, en: 'boots', pt: 'chuteiras', category: 'clothes', context: 'Chuteiras de futebol', emoji: '👟' },
  { id: 23, en: 'socks', pt: 'meias', category: 'clothes', context: 'Meias do equipamento', emoji: '🧦' },
  { id: 24, en: 'hat', pt: 'chapeu', category: 'clothes', context: 'Chapeu do treinador', emoji: '🧢' },
  { id: 25, en: 'jacket', pt: 'casaco', category: 'clothes', context: 'Casaco de treino', emoji: '🧥' },

  // Colours — team colours
  { id: 26, en: 'red', pt: 'vermelho', category: 'colours', context: 'Benfica, Liverpool', emoji: '🔴' },
  { id: 27, en: 'blue', pt: 'azul', category: 'colours', context: 'FC Porto, Chelsea', emoji: '🔵' },
  { id: 28, en: 'green', pt: 'verde', category: 'colours', context: 'Sporting, campo de futebol', emoji: '🟢' },
  { id: 29, en: 'yellow', pt: 'amarelo', category: 'colours', context: 'Brasil, cartao amarelo', emoji: '🟡' },
  { id: 30, en: 'white', pt: 'branco', category: 'colours', context: 'Real Madrid', emoji: '⚪' },
  { id: 31, en: 'black', pt: 'preto', category: 'colours', context: 'Arbitro', emoji: '⚫' },
  { id: 32, en: 'orange', pt: 'laranja', category: 'colours', context: 'Holanda', emoji: '🟠' },

  // Food & Drink — athlete nutrition
  { id: 33, en: 'water', pt: 'agua', category: 'food', context: 'Hidratar no intervalo', emoji: '💧' },
  { id: 34, en: 'banana', pt: 'banana', category: 'food', context: 'Energia rapida', emoji: '🍌' },
  { id: 35, en: 'rice', pt: 'arroz', category: 'food', context: 'Refeicao do atleta', emoji: '🍚' },
  { id: 36, en: 'chicken', pt: 'frango', category: 'food', context: 'Proteina para musculos', emoji: '🍗' },
  { id: 37, en: 'bread', pt: 'pao', category: 'food', context: 'Pequeno-almoco', emoji: '🍞' },
  { id: 38, en: 'milk', pt: 'leite', category: 'food', context: 'Ossos fortes', emoji: '🥛' },
  { id: 39, en: 'apple', pt: 'maca', category: 'food', context: 'Lanche saudavel', emoji: '🍎' },
  { id: 40, en: 'juice', pt: 'sumo', category: 'food', context: 'Sumo de laranja', emoji: '🧃' },

  // Numbers — scores and shirt numbers
  { id: 41, en: 'one', pt: 'um', category: 'numbers', context: 'Guarda-redes', emoji: '1️⃣', value: 1 },
  { id: 42, en: 'seven', pt: 'sete', category: 'numbers', context: 'Ronaldo', emoji: '7️⃣', value: 7 },
  { id: 43, en: 'ten', pt: 'dez', category: 'numbers', context: 'Messi', emoji: '🔟', value: 10 },
  { id: 44, en: 'eleven', pt: 'onze', category: 'numbers', context: 'Di Maria', emoji: '1️⃣1️⃣', value: 11 },
  { id: 45, en: 'nine', pt: 'nove', category: 'numbers', context: 'Avancado', emoji: '9️⃣', value: 9 },

  // Transport — how teams travel
  { id: 46, en: 'bus', pt: 'autocarro', category: 'transport', context: 'Autocarro da equipa', emoji: '🚌' },
  { id: 47, en: 'plane', pt: 'aviao', category: 'transport', context: 'Viajar para fora', emoji: '✈️' },
  { id: 48, en: 'train', pt: 'comboio', category: 'transport', context: 'Viagem curta', emoji: '🚂' },
  { id: 49, en: 'car', pt: 'carro', category: 'transport', context: 'Carro do treinador', emoji: '🚗' },

  // Sports — cross training
  { id: 50, en: 'football', pt: 'futebol', category: 'sports', context: 'O desporto principal', emoji: '⚽' },
]

export const TEAMS = [
  { name: 'Benfica', country: 'Portugal', colors: ['red', 'white'], mascot: 'eagle' },
  { name: 'Sporting', country: 'Portugal', colors: ['green', 'white'], mascot: 'lion' },
  { name: 'FC Porto', country: 'Portugal', colors: ['blue', 'white'], mascot: 'dragon' },
  { name: 'Liverpool', country: 'England', colors: ['red'], mascot: 'bird' },
  { name: 'Real Madrid', country: 'Spain', colors: ['white'], mascot: 'eagle' },
  { name: 'Barcelona', country: 'Spain', colors: ['red', 'blue'], mascot: 'lion' },
  { name: 'Brasil', country: 'Brazil', colors: ['yellow', 'green'], mascot: 'bird' },
  { name: 'Portugal', country: 'Portugal', colors: ['red', 'green'], mascot: 'rooster' },
]

export const PLAYERS = [
  { name: 'Ronaldo', number: 7, team: 'Portugal', position: 'Avancado' },
  { name: 'Messi', number: 10, team: 'Argentina', position: 'Avancado' },
  { name: 'Di Maria', number: 11, team: 'Argentina', position: 'Medio' },
  { name: 'Eusebio', number: 10, team: 'Mocambique/Benfica', position: 'Avancado' },
]
