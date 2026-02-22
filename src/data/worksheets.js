/**
 * Worksheet templates for printable handwriting practice.
 * Each worksheet has a type, content, and difficulty level.
 */

export const WORKSHEET_CATEGORIES = [
  {
    id: 'letters',
    name: 'Letras',
    icon: '✏️',
    description: 'Pratica a escrita de letras',
    color: '#1565C0',
  },
  {
    id: 'words-pt',
    name: 'Palavras em Portugues',
    icon: '⚽',
    description: 'Escreve palavras de futebol',
    color: '#2E7D32',
  },
  {
    id: 'words-en',
    name: 'Words in English',
    icon: '🇬🇧',
    description: 'Pratica vocabulario em ingles',
    color: '#E65100',
  },
  {
    id: 'numbers',
    name: 'Numeros',
    icon: '🔢',
    description: 'Escreve numeros e resultados',
    color: '#6A1B9A',
  },
  {
    id: 'sentences',
    name: 'Frases',
    icon: '📝',
    description: 'Escreve frases sobre futebol',
    color: '#C62828',
  },
]

export const WORKSHEETS = [
  // Letters
  {
    id: 'ws-letters-uppercase',
    category: 'letters',
    title: 'Letras Maiusculas',
    subtitle: 'Escreve as letras grandes como os nomes dos jogadores',
    difficulty: 1,
    lines: [
      { guide: 'A B C D E', context: 'A de Aguia, B de Bola, C de Campeao' },
      { guide: 'F G H I J', context: 'F de Futebol, G de Golo' },
      { guide: 'K L M N O', context: 'L de Leao, M de Messi' },
      { guide: 'P Q R S T', context: 'R de Ronaldo, S de Sol' },
      { guide: 'U V W X Y Z', context: 'V de Vitoria' },
    ],
  },
  {
    id: 'ws-letters-lowercase',
    category: 'letters',
    title: 'Letras Minusculas',
    subtitle: 'Escreve as letras pequenas',
    difficulty: 1,
    lines: [
      { guide: 'a b c d e', context: 'a de avancado, b de bola' },
      { guide: 'f g h i j', context: 'f de futebol, g de guarda-redes' },
      { guide: 'k l m n o', context: 'l de lateral, m de medio' },
      { guide: 'p q r s t', context: 'p de penalti, t de treinador' },
      { guide: 'u v w x y z', context: 'v de vitoria' },
    ],
  },
  // Portuguese Words
  {
    id: 'ws-words-teams',
    category: 'words-pt',
    title: 'Nomes de Equipas',
    subtitle: 'Escreve o nome das grandes equipas',
    difficulty: 2,
    lines: [
      { guide: 'BARCELONA', context: 'A grande equipa de Espanha' },
      { guide: 'LIVERPOOL', context: 'O orgulho de Inglaterra' },
      { guide: 'REAL MADRID', context: 'Os reis do futebol europeu' },
      { guide: 'BRASIL', context: 'O pais do futebol' },
      { guide: 'ARGENTINA', context: 'A terra de Messi' },
    ],
  },
  {
    id: 'ws-words-football',
    category: 'words-pt',
    title: 'Palavras de Futebol',
    subtitle: 'Pratica palavras do mundo do futebol',
    difficulty: 1,
    lines: [
      { guide: 'GOLO', context: 'Quando a bola entra na baliza' },
      { guide: 'BOLA', context: 'O objecto mais importante' },
      { guide: 'CAMPO', context: 'Onde se joga o jogo' },
      { guide: 'EQUIPA', context: 'Um grupo de jogadores' },
      { guide: 'TREINO', context: 'Para ser cada vez melhor' },
    ],
  },
  {
    id: 'ws-words-positions',
    category: 'words-pt',
    title: 'Posicoes dos Jogadores',
    subtitle: 'Escreve as posicoes de futebol',
    difficulty: 2,
    lines: [
      { guide: 'GUARDA-REDES', context: 'Defende a baliza' },
      { guide: 'DEFESA', context: 'Protege a equipa' },
      { guide: 'MEDIO', context: 'Controla o jogo' },
      { guide: 'AVANCADO', context: 'Marca os golos' },
      { guide: 'TREINADOR', context: 'Manda na equipa' },
    ],
  },
  // English Words
  {
    id: 'ws-en-animals',
    category: 'words-en',
    title: 'Animals / Animais',
    subtitle: 'Write the team mascots in English',
    difficulty: 1,
    lines: [
      { guide: 'EAGLE', context: 'Aguia - mascote' },
      { guide: 'LION', context: 'Leao - rei da selva' },
      { guide: 'DRAGON', context: 'Dragao - criatura lendaria' },
      { guide: 'BIRD', context: 'Canario - passaro' },
      { guide: 'BEAR', context: 'Mascote forte - urso' },
    ],
  },
  {
    id: 'ws-en-colours',
    category: 'words-en',
    title: 'Colours / Cores',
    subtitle: 'Write the team colours in English',
    difficulty: 1,
    lines: [
      { guide: 'RED', context: 'Liverpool, Bayern - vermelho' },
      { guide: 'BLUE', context: 'Chelsea, Inter - azul' },
      { guide: 'GREEN', context: 'Sporting, campo - verde' },
      { guide: 'YELLOW', context: 'Brasil - amarelo' },
      { guide: 'WHITE', context: 'Real Madrid - branco' },
    ],
  },
  {
    id: 'ws-en-body',
    category: 'words-en',
    title: 'Body / Corpo',
    subtitle: 'Write body parts in English',
    difficulty: 2,
    lines: [
      { guide: 'HEAD', context: 'Cabecear a bola - cabeca' },
      { guide: 'FOOT', context: 'Chutar a bola - pe' },
      { guide: 'HAND', context: 'Guarda-redes - mao' },
      { guide: 'LEG', context: 'Correr no campo - perna' },
      { guide: 'ARM', context: 'Lancar a bola - braco' },
    ],
  },
  // Numbers
  {
    id: 'ws-numbers-basic',
    category: 'numbers',
    title: 'Numeros 1-10',
    subtitle: 'Escreve os numeros das camisolas',
    difficulty: 1,
    lines: [
      { guide: '1  2  3  4  5', context: 'Guarda-redes usa o numero 1' },
      { guide: '6  7  8  9  10', context: 'Ronaldo usa o 7, Messi o 10' },
    ],
  },
  {
    id: 'ws-numbers-scores',
    category: 'numbers',
    title: 'Resultados',
    subtitle: 'Escreve resultados de jogos',
    difficulty: 2,
    lines: [
      { guide: 'Barcelona 3 - 1 Liverpool', context: 'O Barcelona ganhou por 3 a 1' },
      { guide: 'Brasil 2 - 0 Argentina', context: 'O Brasil ganhou por 2 a 0' },
      { guide: 'Real Madrid 1 - 1 Bayern', context: 'Empataram 1 a 1' },
    ],
  },
  // Sentences
  {
    id: 'ws-sentences-simple',
    category: 'sentences',
    title: 'Frases Simples',
    subtitle: 'Escreve frases curtas sobre futebol',
    difficulty: 2,
    lines: [
      { guide: 'EU GOSTO DE FUTEBOL', context: 'Diz o que sentes' },
      { guide: 'O MESSI E INCRIVEL', context: 'O teu jogador favorito' },
      { guide: 'ADORO A MINHA EQUIPA', context: 'Orgulho no futebol' },
    ],
  },
  {
    id: 'ws-sentences-diary',
    category: 'sentences',
    title: 'Diario do Jogador',
    subtitle: 'Escreve sobre o teu dia como jogador',
    difficulty: 3,
    lines: [
      { guide: 'HOJE TREINEI MUITO BEM', context: 'Como foi o treino' },
      { guide: 'MARQUEI UM GRANDE GOLO', context: 'O momento especial' },
      { guide: 'A MINHA EQUIPA GANHOU', context: 'O resultado do jogo' },
    ],
  },
]
