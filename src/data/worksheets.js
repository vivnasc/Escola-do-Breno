/**
 * Level-based worksheet system for handwriting practice.
 * Each worksheet targets a specific competency level and teaches ONE concept.
 * Letters are taught individually (not the whole alphabet at once).
 * Numbers progress based on what the child can already count to.
 * Words and sentences match the child's reading/writing level.
 */

export const WORKSHEET_CATEGORIES = [
  {
    id: 'letters',
    name: 'Letras',
    icon: '✏️',
    description: 'Uma letra de cada vez, com palavras e imagens',
    color: '#1565C0',
    campo: 'campo1',
  },
  {
    id: 'words-pt',
    name: 'Palavras',
    icon: '⚽',
    description: 'Palavras do mundo do futebol',
    color: '#2E7D32',
    campo: 'campo1',
  },
  {
    id: 'words-en',
    name: 'English',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    description: 'Vocabulário em inglês',
    color: '#E65100',
    campo: 'campo1',
  },
  {
    id: 'numbers',
    name: 'Números',
    icon: '🔢',
    description: 'Números e contas passo a passo',
    color: '#6A1B9A',
    campo: 'campo2',
  },
  {
    id: 'sentences',
    name: 'Frases',
    icon: '📝',
    description: 'Frases e textos progressivos',
    color: '#C62828',
    campo: 'campo1',
  },
]

/**
 * Generates letter worksheets — ONE letter per worksheet.
 * Each letter has: uppercase, lowercase, tracing guide, football words.
 */
const LETTER_DATA = [
  // Vowels first (Nível 1) — most frequent, easiest to write
  { letter: 'A', lower: 'a', level: 1, words: ['ÁGUIA', 'AVANÇADO', 'ARBITRO'], context: 'A de Águia — a mascote do Benfica' },
  { letter: 'E', lower: 'e', level: 1, words: ['EQUIPA', 'ESTÁDIO', 'ESTRELA'], context: 'E de Equipa — juntos somos mais fortes' },
  { letter: 'I', lower: 'i', level: 1, words: ['INTER', 'INGLATERRA', 'ÍDOLO'], context: 'I de Inter — a grande equipa de Milão' },
  { letter: 'O', lower: 'o', level: 1, words: ['OURO', 'OFFSIDE', 'OLÍMPICO'], context: 'O de Ouro — a medalha dos campeões' },
  { letter: 'U', lower: 'u', level: 1, words: ['URUGUAI', 'UNIÃO', 'UNIFORME'], context: 'U de Uruguai — campeão do primeiro Mundial' },

  // Simple consonants (Nível 2) — easy shapes, common letters
  { letter: 'B', lower: 'b', level: 2, words: ['BOLA', 'BENFICA', 'BARCELONA'], context: 'B de Bola — o objecto mais importante' },
  { letter: 'C', lower: 'c', level: 2, words: ['CAMPO', 'CAMPEÃO', 'CAMISOLA'], context: 'C de Campeão — quem ganha o troféu' },
  { letter: 'D', lower: 'd', level: 2, words: ['DEFESA', 'DRIBLE', 'DRAGÃO'], context: 'D de Dragão — a mascote do Porto' },
  { letter: 'F', lower: 'f', level: 2, words: ['FUTEBOL', 'FALTA', 'FINAL'], context: 'F de Futebol — o desporto mais bonito' },
  { letter: 'G', lower: 'g', level: 2, words: ['GOLO', 'GUARDA-REDES', 'GRANDE'], context: 'G de Golo — o momento mágico' },
  { letter: 'L', lower: 'l', level: 2, words: ['LEÃO', 'LIVERPOOL', 'LATERAL'], context: 'L de Leão — a mascote do Sporting' },
  { letter: 'M', lower: 'm', level: 2, words: ['MESSI', 'MÉDIO', 'MUNDIAL'], context: 'M de Messi — o mágico do futebol' },
  { letter: 'P', lower: 'p', level: 2, words: ['PENÁLTI', 'PASSE', 'PORTO'], context: 'P de Passe — a arte de dar a bola' },
  { letter: 'R', lower: 'r', level: 2, words: ['RONALDO', 'REMATE', 'REDE'], context: 'R de Ronaldo — o melhor marcador' },
  { letter: 'S', lower: 's', level: 2, words: ['SPORTING', 'SELECÇÃO', 'SUPLENTE'], context: 'S de Selecção — os melhores do país' },
  { letter: 'T', lower: 't', level: 2, words: ['TREINO', 'TREINADOR', 'TÁCTICAS'], context: 'T de Treino — para ser cada vez melhor' },

  // Less common consonants (Nível 3)
  { letter: 'H', lower: 'h', level: 3, words: ['HAALAND', 'HAT-TRICK', 'HERÓI'], context: 'H de Haaland — a máquina de golos' },
  { letter: 'J', lower: 'j', level: 3, words: ['JOGO', 'JOGADOR', 'JUVENTUS'], context: 'J de Jogo — 90 minutos de emoção' },
  { letter: 'K', lower: 'k', level: 3, words: ['KANE', 'KEEPER', 'KICK'], context: 'K de Kane — o capitão de Inglaterra' },
  { letter: 'N', lower: 'n', level: 3, words: ['NEYMAR', 'NÚMERO', 'NAPOLI'], context: 'N de Neymar — a habilidade brasileira' },
  { letter: 'V', lower: 'v', level: 3, words: ['VITÓRIA', 'VINÍCIUS', 'VAR'], context: 'V de Vitória — o sabor de ganhar' },
  { letter: 'X', lower: 'x', level: 3, words: ['XAVI', 'XI INICIAL'], context: 'X de Xavi — o mestre do passe' },
  { letter: 'Z', lower: 'z', level: 3, words: ['ZIDANE', 'ZERO', 'ZONA'], context: 'Z de Zidane — a elegância no campo' },

  // Rare / complex letters (Nível 4)
  { letter: 'Q', lower: 'q', level: 4, words: ['QATAR', 'QUARTOS-DE-FINAL'], context: 'Q de Qatar — sede do Mundial 2022' },
  { letter: 'W', lower: 'w', level: 4, words: ['WEMBLEY', 'WORLD CUP'], context: 'W de Wembley — o estádio lendário' },
  { letter: 'Y', lower: 'y', level: 4, words: ['YAMAL', 'YOUNG'], context: 'Y de Yamal — a jovem estrela de Barcelona' },
]

// Generate individual letter worksheets
const LETTER_WORKSHEETS = LETTER_DATA.map((l) => ({
  id: `ws-letter-${l.letter.toLowerCase()}`,
  category: 'letters',
  title: `Letra ${l.letter} ${l.lower}`,
  subtitle: l.context,
  level: l.level,
  difficulty: l.level,
  type: 'letter',
  letterData: l,
  lines: [
    { guide: `${l.letter}  ${l.letter}  ${l.letter}  ${l.letter}  ${l.letter}`, context: `Letra grande: ${l.letter}`, type: 'trace-upper' },
    { guide: `${l.lower}  ${l.lower}  ${l.lower}  ${l.lower}  ${l.lower}`, context: `Letra pequena: ${l.lower}`, type: 'trace-lower' },
    ...l.words.slice(0, 3).map((w) => ({ guide: w, context: `Escreve: ${w}`, type: 'word' })),
  ],
}))

// Letter combinations (Nível 4-5)
const DIGRAPH_WORKSHEETS = [
  {
    id: 'ws-digraph-ch',
    category: 'letters',
    title: 'CH — Chapéu, Chuto',
    subtitle: 'O som CH como em CHutar a bola',
    level: 4,
    difficulty: 4,
    type: 'digraph',
    lines: [
      { guide: 'CH  CH  CH  CH', context: 'Duas letras, um som', type: 'trace' },
      { guide: 'CHUTO', context: 'Chutar a bola com força' },
      { guide: 'CHAPÉU', context: 'Chapéu do treinador' },
      { guide: 'CHAVE', context: 'A chave do balneário' },
    ],
  },
  {
    id: 'ws-digraph-lh',
    category: 'letters',
    title: 'LH — Olho, Trabalho',
    subtitle: 'O som LH como em trabalho de equipa',
    level: 4,
    difficulty: 4,
    type: 'digraph',
    lines: [
      { guide: 'LH  LH  LH  LH', context: 'Duas letras, um som', type: 'trace' },
      { guide: 'TRABALHO', context: 'Trabalho de equipa no campo' },
      { guide: 'OLHO', context: 'Olho atento do guarda-redes' },
      { guide: 'JOELHO', context: 'Proteger o joelho no jogo' },
    ],
  },
  {
    id: 'ws-digraph-nh',
    category: 'letters',
    title: 'NH — Caminho, Minha',
    subtitle: 'O som NH como em minha equipa',
    level: 4,
    difficulty: 4,
    type: 'digraph',
    lines: [
      { guide: 'NH  NH  NH  NH', context: 'Duas letras, um som', type: 'trace' },
      { guide: 'MINHA', context: 'A minha equipa favorita' },
      { guide: 'CAMINHO', context: 'O caminho para a vitória' },
      { guide: 'LINHA', context: 'A linha do campo' },
    ],
  },
  {
    id: 'ws-digraph-ss-rr',
    category: 'letters',
    title: 'SS e RR — Passe, Corrida',
    subtitle: 'Letras dobradas mudam o som',
    level: 5,
    difficulty: 5,
    type: 'digraph',
    lines: [
      { guide: 'PASSE', context: 'O passe perfeito' },
      { guide: 'CORRIDA', context: 'Corrida rápida no contra-ataque' },
      { guide: 'ASSISTÊNCIA', context: 'Assistência para o golo' },
      { guide: 'TORNEIO', context: 'O grande torneio de futebol' },
    ],
  },
]

// Portuguese words worksheets (Nível 2-7)
const WORD_WORKSHEETS = [
  {
    id: 'ws-words-simple-3',
    category: 'words-pt',
    title: 'Palavras Pequenas',
    subtitle: 'Palavras de 3-4 letras do futebol',
    level: 2,
    difficulty: 1,
    lines: [
      { guide: 'GOL', context: 'A bola entrou!' },
      { guide: 'PÉ', context: 'Chutar com o pé' },
      { guide: 'MÃO', context: 'A mão do guarda-redes' },
      { guide: 'SOL', context: 'O sol brilha no estádio' },
      { guide: 'REI', context: 'O rei do futebol' },
    ],
  },
  {
    id: 'ws-words-football-basic',
    category: 'words-pt',
    title: 'Palavras de Futebol',
    subtitle: 'As primeiras palavras do futebol',
    level: 3,
    difficulty: 2,
    lines: [
      { guide: 'BOLA', context: 'Sem bola não há jogo' },
      { guide: 'GOLO', context: 'GOOOOLO! A bola na rede' },
      { guide: 'CAMPO', context: 'O relvado verde' },
      { guide: 'REDE', context: 'A rede da baliza' },
      { guide: 'FALTA', context: 'O árbitro marcou falta' },
    ],
  },
  {
    id: 'ws-words-positions',
    category: 'words-pt',
    title: 'Posições no Campo',
    subtitle: 'As posições dos jogadores',
    level: 4,
    difficulty: 2,
    lines: [
      { guide: 'DEFESA', context: 'Protege a baliza' },
      { guide: 'MÉDIO', context: 'Controla o meio-campo' },
      { guide: 'AVANÇADO', context: 'Marca os golos' },
      { guide: 'LATERAL', context: 'Corre pela linha' },
      { guide: 'TREINADOR', context: 'O chefe da equipa' },
    ],
  },
  {
    id: 'ws-words-teams-pt',
    category: 'words-pt',
    title: 'Equipas de Portugal',
    subtitle: 'Os grandes clubes portugueses',
    level: 4,
    difficulty: 3,
    lines: [
      { guide: 'BENFICA', context: 'O glorioso — Lisboa' },
      { guide: 'SPORTING', context: 'O leão — Lisboa' },
      { guide: 'PORTO', context: 'O dragão — Porto' },
      { guide: 'BRAGA', context: 'Os guerreiros do Minho' },
      { guide: 'PORTUGAL', context: 'A nossa selecção' },
    ],
  },
  {
    id: 'ws-words-teams-world',
    category: 'words-pt',
    title: 'Grandes Equipas do Mundo',
    subtitle: 'Clubes lendários de todo o planeta',
    level: 5,
    difficulty: 3,
    lines: [
      { guide: 'BARCELONA', context: 'Espanha — Camp Nou' },
      { guide: 'LIVERPOOL', context: 'Inglaterra — Anfield' },
      { guide: 'REAL MADRID', context: 'Espanha — Santiago Bernabéu' },
      { guide: 'BAYERN', context: 'Alemanha — Allianz Arena' },
      { guide: 'INTER', context: 'Itália — San Siro' },
    ],
  },
  {
    id: 'ws-words-players',
    category: 'words-pt',
    title: 'Nomes de Jogadores',
    subtitle: 'Os maiores craques do mundo',
    level: 5,
    difficulty: 3,
    lines: [
      { guide: 'MESSI', context: 'Argentina — o mágico' },
      { guide: 'RONALDO', context: 'Portugal — o melhor marcador' },
      { guide: 'NEYMAR', context: 'Brasil — a habilidade pura' },
      { guide: 'HAALAND', context: 'Noruega — a máquina de golos' },
      { guide: 'VINÍCIUS', context: 'Brasil — velocidade e drible' },
    ],
  },
  {
    id: 'ws-words-actions',
    category: 'words-pt',
    title: 'Acções no Futebol',
    subtitle: 'O que fazemos no campo',
    level: 6,
    difficulty: 3,
    lines: [
      { guide: 'REMATAR', context: 'Chutar para a baliza' },
      { guide: 'DRIBLAR', context: 'Passar pelo adversário' },
      { guide: 'CABECEAR', context: 'Tocar a bola com a cabeça' },
      { guide: 'DEFENDER', context: 'Proteger a nossa baliza' },
      { guide: 'ASSISTIR', context: 'Dar o passe para o golo' },
    ],
  },
  {
    id: 'ws-words-complex',
    category: 'words-pt',
    title: 'Palavras Avançadas',
    subtitle: 'Vocabulário técnico do futebol',
    level: 7,
    difficulty: 3,
    lines: [
      { guide: 'SUBSTITUIÇÃO', context: 'Trocar um jogador por outro' },
      { guide: 'PROLONGAMENTO', context: 'Mais 30 minutos de jogo' },
      { guide: 'CONTRA-ATAQUE', context: 'Atacar rápido quando se recupera a bola' },
      { guide: 'AQUECIMENTO', context: 'Preparar o corpo antes do jogo' },
      { guide: 'CLASSIFICAÇÃO', context: 'A tabela do campeonato' },
    ],
  },
]

// English words worksheets (Nível 2-7)
const ENGLISH_WORKSHEETS = [
  {
    id: 'ws-en-simple',
    category: 'words-en',
    title: 'First Words',
    subtitle: 'Palavras simples em inglês',
    level: 2,
    difficulty: 1,
    lines: [
      { guide: 'RED', context: 'Vermelho — cor do Liverpool' },
      { guide: 'BALL', context: 'Bola — sem ela não há jogo' },
      { guide: 'GOAL', context: 'Golo — o momento mágico' },
      { guide: 'RUN', context: 'Correr — essencial no futebol' },
      { guide: 'WIN', context: 'Ganhar — o objectivo' },
    ],
  },
  {
    id: 'ws-en-colours',
    category: 'words-en',
    title: 'Colours / Cores',
    subtitle: 'As cores das camisolas em inglês',
    level: 3,
    difficulty: 2,
    lines: [
      { guide: 'RED', context: 'Vermelho — Liverpool, Bayern' },
      { guide: 'BLUE', context: 'Azul — Chelsea, Porto' },
      { guide: 'GREEN', context: 'Verde — Sporting, campo' },
      { guide: 'YELLOW', context: 'Amarelo — Brasil, Dortmund' },
      { guide: 'WHITE', context: 'Branco — Real Madrid' },
    ],
  },
  {
    id: 'ws-en-animals',
    category: 'words-en',
    title: 'Animals / Animais',
    subtitle: 'Mascotes das equipas em inglês',
    level: 3,
    difficulty: 2,
    lines: [
      { guide: 'EAGLE', context: 'Águia — Benfica' },
      { guide: 'LION', context: 'Leão — Sporting' },
      { guide: 'DRAGON', context: 'Dragão — Porto' },
      { guide: 'FOX', context: 'Raposa — Leicester' },
      { guide: 'BEAR', context: 'Urso — força e poder' },
    ],
  },
  {
    id: 'ws-en-body',
    category: 'words-en',
    title: 'My Body / O meu corpo',
    subtitle: 'Partes do corpo usadas no futebol',
    level: 4,
    difficulty: 2,
    lines: [
      { guide: 'HEAD', context: 'Cabeça — para cabecear' },
      { guide: 'FOOT', context: 'Pé — para chutar' },
      { guide: 'HAND', context: 'Mão — para o guarda-redes' },
      { guide: 'LEG', context: 'Perna — para correr' },
      { guide: 'KNEE', context: 'Joelho — para proteger' },
    ],
  },
  {
    id: 'ws-en-football',
    category: 'words-en',
    title: 'Football Words',
    subtitle: 'Vocabulário de futebol em inglês',
    level: 5,
    difficulty: 3,
    lines: [
      { guide: 'TEAM', context: 'Equipa — together everyone achieves more' },
      { guide: 'MATCH', context: 'Jogo — 90 minutos de emoção' },
      { guide: 'SCORE', context: 'Resultado — quem está a ganhar?' },
      { guide: 'COACH', context: 'Treinador — o líder' },
      { guide: 'PITCH', context: 'Campo — onde se joga' },
    ],
  },
  {
    id: 'ws-en-phrases',
    category: 'words-en',
    title: 'Football Phrases',
    subtitle: 'Frases curtas em inglês',
    level: 6,
    difficulty: 3,
    lines: [
      { guide: 'NICE GOAL', context: 'Belo golo!' },
      { guide: 'GOOD PASS', context: 'Bom passe!' },
      { guide: 'WELL DONE', context: 'Muito bem!' },
      { guide: 'MY TEAM', context: 'A minha equipa' },
      { guide: 'LET US PLAY', context: 'Vamos jogar!' },
    ],
  },
]

// Numbers worksheets (Nível 1-7)
const NUMBER_WORKSHEETS = [
  {
    id: 'ws-numbers-1-5',
    category: 'numbers',
    title: 'Números 1 a 5',
    subtitle: 'Os primeiros números — como dedos da mão',
    level: 1,
    difficulty: 1,
    type: 'numbers',
    lines: [
      { guide: '1  1  1  1  1', context: 'UM — o número do guarda-redes' },
      { guide: '2  2  2  2  2', context: 'DOIS — dois pés para chutar' },
      { guide: '3  3  3  3  3', context: 'TRÊS — três pontos pela vitória' },
      { guide: '4  4  4  4  4', context: 'QUATRO — quatro cantos do campo' },
      { guide: '5  5  5  5  5', context: 'CINCO — cinco jogadores numa equipa de futsal' },
    ],
  },
  {
    id: 'ws-numbers-6-10',
    category: 'numbers',
    title: 'Números 6 a 10',
    subtitle: 'Os números das camisolas dos craques',
    level: 2,
    difficulty: 1,
    type: 'numbers',
    lines: [
      { guide: '6  6  6  6  6', context: 'SEIS — o médio defensivo' },
      { guide: '7  7  7  7  7', context: 'SETE — o número do Ronaldo' },
      { guide: '8  8  8  8  8', context: 'OITO — o médio criativo' },
      { guide: '9  9  9  9  9', context: 'NOVE — o ponta-de-lança' },
      { guide: '10  10  10  10', context: 'DEZ — o número do Messi' },
    ],
  },
  {
    id: 'ws-numbers-11-20',
    category: 'numbers',
    title: 'Números 11 a 20',
    subtitle: 'De 11 a 20 — os jogadores da equipa completa',
    level: 3,
    difficulty: 2,
    type: 'numbers',
    lines: [
      { guide: '11  12  13  14  15', context: '11 jogadores em campo' },
      { guide: '16  17  18  19  20', context: 'Os suplentes no banco' },
      { guide: '11  11  11', context: 'ONZE — uma equipa completa' },
      { guide: '15  15  15', context: 'QUINZE — minutos de intervalo' },
      { guide: '20  20  20', context: 'VINTE — jogadores numa equipa' },
    ],
  },
  {
    id: 'ws-numbers-tens',
    category: 'numbers',
    title: 'Dezenas: 10 a 100',
    subtitle: 'Conta de 10 em 10 como os minutos do jogo',
    level: 4,
    difficulty: 2,
    type: 'numbers',
    lines: [
      { guide: '10  20  30', context: 'Primeiros 30 minutos' },
      { guide: '40  50  60', context: 'Até ao 60.º minuto' },
      { guide: '70  80  90', context: '90 minutos — fim do jogo!' },
      { guide: '100', context: 'CEM — número redondo perfeito' },
    ],
  },
  {
    id: 'ws-numbers-sums',
    category: 'numbers',
    title: 'Somas Simples',
    subtitle: 'Soma os golos das equipas',
    level: 4,
    difficulty: 2,
    type: 'numbers',
    lines: [
      { guide: '1 + 1 = 2', context: 'Um golo + um golo = dois golos' },
      { guide: '2 + 3 = 5', context: 'Resultado do jogo' },
      { guide: '3 + 4 = 7', context: 'Muitos golos!' },
      { guide: '5 + 5 = 10', context: 'O Messi usa o 10' },
      { guide: '4 + 3 = ___', context: 'Completa tu!' },
    ],
  },
  {
    id: 'ws-numbers-scores',
    category: 'numbers',
    title: 'Resultados de Jogos',
    subtitle: 'Escreve os resultados como os jornalistas',
    level: 5,
    difficulty: 3,
    type: 'numbers',
    lines: [
      { guide: 'Benfica 3 - 1 Porto', context: 'O Benfica ganhou por 3 a 1' },
      { guide: 'Barcelona 2 - 0 Real Madrid', context: 'O Barcelona ganhou em casa' },
      { guide: 'Brasil 4 - 1 Itália', context: 'Goleada do Brasil' },
      { guide: 'Liverpool 2 - 2 Bayern', context: 'Empate emocionante' },
    ],
  },
  {
    id: 'ws-numbers-multiply',
    category: 'numbers',
    title: 'Multiplicação no Futebol',
    subtitle: 'Se cada equipa marca 3 golos...',
    level: 6,
    difficulty: 3,
    type: 'numbers',
    lines: [
      { guide: '2 x 3 = 6', context: '2 equipas, 3 golos cada = 6 golos' },
      { guide: '3 x 4 = 12', context: '3 jogos, 4 golos em cada' },
      { guide: '5 x 2 = 10', context: '5 jogadores, 2 golos cada' },
      { guide: '4 x 5 = 20', context: '4 equipas, 5 jogadores cada' },
      { guide: '6 x 3 = ___', context: 'Completa tu!' },
    ],
  },
  {
    id: 'ws-numbers-division',
    category: 'numbers',
    title: 'Divisão no Futebol',
    subtitle: 'Dividir jogadores em equipas iguais',
    level: 7,
    difficulty: 3,
    type: 'numbers',
    lines: [
      { guide: '10 ÷ 2 = 5', context: '10 jogadores em 2 equipas de 5' },
      { guide: '12 ÷ 3 = 4', context: '12 bolas para 3 grupos' },
      { guide: '20 ÷ 4 = 5', context: '20 alunos em 4 grupos' },
      { guide: '15 ÷ 5 = 3', context: '15 troféus para 5 equipas' },
      { guide: '18 ÷ 3 = ___', context: 'Completa tu!' },
    ],
  },
]

// Sentences worksheets (Nível 4-9)
const SENTENCE_WORKSHEETS = [
  {
    id: 'ws-sentences-2words',
    category: 'sentences',
    title: 'Duas Palavras',
    subtitle: 'Começa com frases curtinhas',
    level: 3,
    difficulty: 2,
    lines: [
      { guide: 'BOLA GRANDE', context: 'Descrever a bola' },
      { guide: 'GOLO BONITO', context: 'Um golo incrível' },
      { guide: 'EQUIPA FORTE', context: 'Uma equipa poderosa' },
      { guide: 'CAMPO VERDE', context: 'O relvado brilhante' },
      { guide: 'TREINO BOM', context: 'O treino correu bem' },
    ],
  },
  {
    id: 'ws-sentences-simple',
    category: 'sentences',
    title: 'Frases Curtas',
    subtitle: 'Escreve frases sobre futebol',
    level: 4,
    difficulty: 2,
    lines: [
      { guide: 'EU GOSTO DE FUTEBOL', context: 'O que sentes' },
      { guide: 'A BOLA É REDONDA', context: 'Descrever a bola' },
      { guide: 'O JOGO FOI BOM', context: 'Como foi o jogo' },
      { guide: 'A EQUIPA GANHOU', context: 'O resultado' },
    ],
  },
  {
    id: 'ws-sentences-favourite',
    category: 'sentences',
    title: 'O Meu Favorito',
    subtitle: 'Escreve sobre as tuas coisas favoritas',
    level: 5,
    difficulty: 3,
    lines: [
      { guide: 'O MEU JOGADOR FAVORITO É', context: 'Completa com o nome' },
      { guide: 'A MINHA EQUIPA FAVORITA É', context: 'Completa com a equipa' },
      { guide: 'EU GOSTO DE JOGAR PORQUE', context: 'Explica porquê' },
      { guide: 'O MELHOR GOLO QUE VI FOI', context: 'Descreve o golo' },
    ],
  },
  {
    id: 'ws-sentences-diary',
    category: 'sentences',
    title: 'Diário do Jogador',
    subtitle: 'Escreve sobre o teu dia como jogador',
    level: 6,
    difficulty: 3,
    lines: [
      { guide: 'HOJE TREINEI MUITO BEM', context: 'Como foi o treino' },
      { guide: 'MARQUEI UM GRANDE GOLO', context: 'O momento especial' },
      { guide: 'A MINHA EQUIPA GANHOU', context: 'O resultado do jogo' },
      { guide: 'AMANHÃ QUERO TREINAR MAIS', context: 'Os teus objectivos' },
    ],
  },
  {
    id: 'ws-sentences-report',
    category: 'sentences',
    title: 'Relato de Jogo',
    subtitle: 'Escreve como um jornalista desportivo',
    level: 7,
    difficulty: 3,
    lines: [
      { guide: 'O JOGO COMEÇOU ÀS TRÊS HORAS DA TARDE.', context: 'Quando começou' },
      { guide: 'O PRIMEIRO GOLO FOI AOS 20 MINUTOS.', context: 'O golo decisivo' },
      { guide: 'O PÚBLICO FESTEJOU COM GRANDE ALEGRIA.', context: 'A emoção' },
    ],
  },
  {
    id: 'ws-sentences-creative',
    category: 'sentences',
    title: 'Escrita Criativa',
    subtitle: 'Inventa a tua própria história de futebol',
    level: 8,
    difficulty: 3,
    lines: [
      { guide: 'ERA UMA VEZ UM JOGADOR QUE...', context: 'Começa a tua história' },
      { guide: '', context: 'Continua aqui...' },
      { guide: '', context: 'E depois...' },
      { guide: '', context: 'No final...' },
    ],
  },
]

export const WORKSHEETS = [
  ...LETTER_WORKSHEETS,
  ...DIGRAPH_WORKSHEETS,
  ...WORD_WORKSHEETS,
  ...ENGLISH_WORKSHEETS,
  ...NUMBER_WORKSHEETS,
  ...SENTENCE_WORKSHEETS,
]

/**
 * Get worksheets appropriate for a given competency level.
 * Returns worksheets at or below the child's level, prioritizing their current level.
 */
export function getWorksheetsForLevel(competencyLevels, category = null) {
  const campo1Level = competencyLevels?.campo1 || 1
  const campo2Level = competencyLevels?.campo2 || 1
  const maxLevel = Math.max(campo1Level, campo2Level)

  let sheets = WORKSHEETS.filter((ws) => ws.level <= maxLevel + 1)

  if (category) {
    sheets = sheets.filter((ws) => ws.category === category)
  }

  // Sort: current level first, then descending
  sheets.sort((a, b) => {
    const aAtLevel = a.level === maxLevel ? 1 : 0
    const bAtLevel = b.level === maxLevel ? 1 : 0
    if (aAtLevel !== bAtLevel) return bAtLevel - aAtLevel
    return b.level - a.level
  })

  return sheets
}
