/**
 * Universe-specific content for all activities.
 * Each universe provides themed scenarios, items, and contexts
 * while maintaining the same learning objectives.
 */

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const CONTENT = {
  // ==================== FOOTBALL ====================
  football: {
    math: {
      title: 'Golos e Contas',
      icon: '⚽',
      addContext: (a, b) =>
        `O ${pick(['Barcelona', 'Liverpool', 'Real Madrid', 'Bayern', 'Brasil'])} marcou ${a} golos na primeira parte e ${b} na segunda.`,
      subContext: (a, b) =>
        `A equipa tinha ${a} pontos e perdeu ${b}. Quantos ficaram?`,
      mulContext: (a, b) =>
        `São ${a} jogos e cada jogo vale ${b} pontos.`,
    },

    emotions: [
      {
        situation: 'O árbitro dá-te um cartão amarelo injusto.',
        emoji: '🟨',
        emotions: [
          { name: 'Zangado', emoji: '😠', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Respira fundo 3 vezes. Fala com calma com o treinador. Não é preciso gritar.',
      },
      {
        situation: 'Marcas o golo da vitória no último minuto!',
        emoji: '⚽',
        emotions: [
          { name: 'Alegre', emoji: '😄', correct: true },
          { name: 'Triste', emoji: '😢', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Celebra com a equipa! Abraça os teus colegas. Partilha a alegria!',
      },
      {
        situation: 'Falhas um penalti importante.',
        emoji: '😞',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Surpreso', emoji: '😲', correct: false },
        ],
        strategy: 'Todos falham penaltis, até o Ronaldo! Levanta a cabeça, respira e pensa no próximo.',
      },
      {
        situation: 'Vais jogar no estádio pela primeira vez.',
        emoji: '🏟️',
        emotions: [
          { name: 'Nervoso', emoji: '😰', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'É normal sentir nervos! Respira devagar, concentra-te no jogo e diverte-te.',
      },
      {
        situation: 'O teu melhor amigo da equipa vai mudar de clube.',
        emoji: '👋',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Com fome', emoji: '🤤', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'É normal ficar triste. Podes continuar a ser amigo! Combina encontros e fala com ele.',
      },
      {
        situation: 'Ganhas um troféu no final do torneio.',
        emoji: '🏆',
        emotions: [
          { name: 'Orgulhoso', emoji: '🥹', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Sente orgulho do teu trabalho! Agradece ao treinador e aos colegas.',
      },
      {
        situation: 'O treinador escolhe-te como capitão da equipa.',
        emoji: '©️',
        emotions: [
          { name: 'Surpreso', emoji: '😲', correct: true },
          { name: 'Triste', emoji: '😢', correct: false },
          { name: 'Zangado', emoji: '😠', correct: false },
        ],
        strategy: 'Que surpresa boa! Agradece ao treinador e dá o teu melhor para liderar a equipa.',
      },
      {
        situation: 'Lesionas-te durante o treino e tens de parar.',
        emoji: '🤕',
        emotions: [
          { name: 'Frustrado', emoji: '😤', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'É difícil parar, mas o corpo precisa de descanso. Segue os conselhos do médico e volta mais forte!',
      },
      {
        situation: 'Um colega faz troça de ti por teres falhado um passe.',
        emoji: '😣',
        emotions: [
          { name: 'Envergonhado', emoji: '😳', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Ninguém joga sempre bem. Ignora os comentários maldosos e continua a esforçar-te.',
      },
      {
        situation: 'A tua equipa empata um jogo que estava a perder no último minuto!',
        emoji: '⏱️',
        emotions: [
          { name: 'Aliviado', emoji: '😮‍💨', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'Que alívio! Nunca se deve desistir. Celebra o esforço de toda a equipa.',
      },
    ],

    fairPlay: [
      {
        situation: 'Um colega marca um golo contra a tua equipa. O que fazes?',
        emoji: '⚽',
        options: [
          { text: 'Dou-lhe os parabéns e continuo a jogar', correct: true },
          { text: 'Fico zangado e não falo com ele', correct: false },
          { text: 'Saio do jogo', correct: false },
        ],
        lesson: 'No fair play, felicitamos o adversário. Um bom jogador sabe perder com dignidade!',
      },
      {
        situation: 'O treinador põe-te no banco. Como reages?',
        emoji: '🪑',
        options: [
          { text: 'Espero a minha vez e apoio a equipa', correct: true },
          { text: 'Reclamo e grito com o treinador', correct: false },
          { text: 'Vou-me embora', correct: false },
        ],
        lesson: 'Todos os jogadores passam pelo banco. É um momento para observar e aprender!',
      },
      {
        situation: 'Um colega novo chega à equipa e não conhece ninguém. O que fazes?',
        emoji: '👋',
        options: [
          { text: 'Apresento-me e convido-o para brincar', correct: true },
          { text: 'Ignoro-o', correct: false },
          { text: 'Gozar com ele porque não sabe jogar', correct: false },
        ],
        lesson: 'Receber bem os novos colegas é uma qualidade de um grande capitão de equipa!',
      },
      {
        situation: 'A tua equipa ganha o jogo. Como celebras?',
        emoji: '🎉',
        options: [
          { text: 'Celebro com a equipa e cumprimento os adversários', correct: true },
          { text: 'Gozar com a equipa que perdeu', correct: false },
          { text: 'Celebrar sozinho e gabar-me', correct: false },
        ],
        lesson: 'Os melhores jogadores do mundo celebram com a equipa e respeitam os adversários!',
      },
      {
        situation: 'Não entendes uma regra do jogo. O que fazes?',
        emoji: '❓',
        options: [
          { text: 'Pergunto ao treinador ou professor', correct: true },
          { text: 'Finjo que sei e continuo', correct: false },
          { text: 'Fico calado e não jogo mais', correct: false },
        ],
        lesson: 'Pedir ajuda é corajoso! Até os jogadores profissionais pedem ajuda ao treinador.',
      },
      {
        situation: 'Um colega está triste porque perdeu o jogo. O que fazes?',
        emoji: '😢',
        options: [
          { text: 'Digo-lhe que jogou bem e que da próxima vez será melhor', correct: true },
          { text: 'Rio-me dele', correct: false },
          { text: 'Não faço nada, não é comigo', correct: false },
        ],
        lesson: 'Apoiar os colegas quando estão tristes mostra que és um verdadeiro amigo e jogador de equipa!',
      },
      {
        situation: 'Um jogador adversário cai no chão durante uma jogada. O que fazes?',
        emoji: '🤝',
        options: [
          { text: 'Paro o jogo e ajudo-o a levantar-se', correct: true },
          { text: 'Continuo a jogar e ignoro-o', correct: false },
          { text: 'Rio-me porque caiu', correct: false },
        ],
        lesson: 'Ajudar um adversário mostra verdadeiro espírito desportivo. O respeito está acima do resultado!',
      },
      {
        situation: 'A bola sai mas o árbitro não viu. Só tu sabes que foi a tua equipa a tocar por último. O que fazes?',
        emoji: '⚖️',
        options: [
          { text: 'Digo a verdade ao árbitro', correct: true },
          { text: 'Fico calado e aproveito', correct: false },
          { text: 'Culpo o adversário', correct: false },
        ],
        lesson: 'Ser honesto é mais importante do que ganhar. O fair play começa com a verdade!',
      },
      {
        situation: 'És o melhor marcador da equipa mas um colega nunca marca. O que fazes?',
        emoji: '🤜',
        options: [
          { text: 'Passo-lhe a bola para ele marcar também', correct: true },
          { text: 'Continuo a marcar sempre eu', correct: false },
          { text: 'Digo-lhe que não sabe jogar', correct: false },
        ],
        lesson: 'Partilhar oportunidades faz toda a equipa crescer. Um bom jogador faz os outros melhores!',
      },
      {
        situation: 'A tua equipa perde um jogo importante. O adversário vem cumprimentar-te. O que fazes?',
        emoji: '🫱',
        options: [
          { text: 'Cumprimento-o e dou-lhe os parabéns', correct: true },
          { text: 'Recuso-me a cumprimentar', correct: false },
          { text: 'Vou embora sem falar com ninguém', correct: false },
        ],
        lesson: 'Saber perder com dignidade é tão importante como saber ganhar. Os grandes campeões respeitam sempre!',
      },
    ],

    division: [
      { total: 12, groups: 2, context: '12 jogadores divididos em 2 equipas iguais.' },
      { total: 10, groups: 5, context: '10 bolas para 5 jogadores.' },
      { total: 15, groups: 3, context: '15 bidoes de agua para 3 equipas.' },
      { total: 8, groups: 2, context: '8 coletes para 2 grupos de treino.' },
      { total: 20, groups: 4, context: '20 medalhas para 4 equipas vencedoras.' },
      { total: 6, groups: 3, context: '6 pares de luvas para 3 guarda-redes.' },
      { total: 16, groups: 4, context: '16 cones para marcar 4 zonas do campo.' },
      { total: 9, groups: 3, context: '9 jogadores divididos em 3 mini-equipas.' },
      { total: 18, groups: 6, context: '18 garrafas de agua para 6 jogadores.' },
      { total: 24, groups: 4, context: '24 chuteiras para 4 bancadas do balneario.' },
      { total: 14, groups: 7, context: '14 caneleiras para 7 jogadores.' },
      { total: 21, groups: 3, context: '21 camisolas para 3 equipas do torneio.' },
    ],

    shop: {
      title: 'Loja do Clube',
      items: [
        { name: 'Bilhete', emoji: '🎫', price: 50 },
        { name: 'Cachecol', emoji: '🧣', price: 30 },
        { name: 'Camisola', emoji: '👕', price: 100 },
        { name: 'Agua', emoji: '💧', price: 10 },
        { name: 'Pipocas', emoji: '🍿', price: 20 },
        { name: 'Chapeu', emoji: '🧢', price: 40 },
        { name: 'Apito', emoji: '🔔', price: 15 },
        { name: 'Bola', emoji: '🏐', price: 75 },
        { name: 'Poster', emoji: '⚽', price: 25 },
        { name: 'Caneca', emoji: '🏆', price: 35 },
      ],
    },

    dress: {
      title: 'Veste o Jogador',
      character: 'jogador',
      instruction: (en, pt) => `Coloca a ${en} no jogador. Onde vai a ${pt}?`,
      completeText: 'O jogador está pronto para o jogo!',
      completeEmoji: '⚽',
    },

    color: {
      title: 'Pinta o Equipamento',
      completeText: 'Pintaste todos os equipamentos!',
      instruction: (name, colors) => `Pinta o equipamento do ${name}. Escolhe as cores: ${colors}.`,
      items: [
        { name: 'Barcelona', detail: 'Espanha', colors: ['red', 'blue'] },
        { name: 'Liverpool', detail: 'Inglaterra', colors: ['red'] },
        { name: 'Real Madrid', detail: 'Espanha', colors: ['white'] },
        { name: 'Bayern Munich', detail: 'Alemanha', colors: ['red', 'white'] },
        { name: 'Brasil', detail: 'Seleção', colors: ['yellow', 'green'] },
        { name: 'Argentina', detail: 'Seleção', colors: ['white', 'blue'] },
        { name: 'Juventus', detail: 'Italia', colors: ['black', 'white'] },
        { name: 'PSG', detail: 'Franca', colors: ['blue', 'red'] },
        { name: 'Benfica', detail: 'Portugal', colors: ['red', 'white'] },
        { name: 'Manchester City', detail: 'Inglaterra', colors: ['blue', 'white'] },
        { name: 'Borussia Dortmund', detail: 'Alemanha', colors: ['yellow', 'black'] },
        { name: 'AC Milan', detail: 'Italia', colors: ['red', 'black'] },
        { name: 'Santos', detail: 'Brasil', colors: ['white', 'black'] },
        { name: 'Seleção', detail: 'Moçambique', colors: ['green', 'red'] },
      ],
    },

    read: {
      title: 'Le o Resultado',
      completeText: 'Leste todos os resultados!',
      boardColor: '#1B5E20',
      items: [
        { home: 'Brazil', away: 'Argentina', homeScore: 3, awayScore: 1 },
        { home: 'Spain', away: 'Germany', homeScore: 2, awayScore: 2 },
        { home: 'England', away: 'France', homeScore: 0, awayScore: 1 },
        { home: 'Italy', away: 'Japan', homeScore: 4, awayScore: 0 },
        { home: 'Barcelona', away: 'Liverpool', homeScore: 2, awayScore: 1 },
        { home: 'Real Madrid', away: 'Bayern', homeScore: 1, awayScore: 3 },
        { home: 'Portugal', away: 'Morocco', homeScore: 0, awayScore: 1 },
        { home: 'Nigeria', away: 'Ghana', homeScore: 2, awayScore: 0 },
        { home: 'Juventus', away: 'PSG', homeScore: 3, awayScore: 2 },
        { home: 'Japan', away: 'South Korea', homeScore: 1, awayScore: 1 },
        { home: 'Mexico', away: 'USA', homeScore: 2, awayScore: 3 },
        { home: 'Benfica', away: 'Manchester City', homeScore: 0, awayScore: 2 },
      ],
    },

    routine: {
      title: 'Rotina do Campeão',
      step8: { text: 'Aulas da tarde / Treino', emoji: '⚽' },
    },
  },

  // ==================== DINOSAURS ====================
  dinosaurs: {
    math: {
      title: 'Fósseis e Contas',
      icon: '🦕',
      addContext: (a, b) =>
        `O explorador encontrou ${a} fósseis de manhã e ${b} a tarde.`,
      subContext: (a, b) =>
        `A manada tinha ${a} dinossauros e ${b} migraram. Quantos ficaram?`,
      mulContext: (a, b) =>
        `São ${a} escavações e cada uma tem ${b} fósseis.`,
    },

    emotions: [
      {
        situation: 'O guia do museu culpa-te por tocar numa peça, mas não foste tu.',
        emoji: '🦕',
        emotions: [
          { name: 'Zangado', emoji: '😠', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Respira fundo. Explica com calma o que aconteceu. Pede a alguem que confirme.',
      },
      {
        situation: 'Descobres um fóssil raro durante uma escavação!',
        emoji: '💎',
        emotions: [
          { name: 'Alegre', emoji: '😄', correct: true },
          { name: 'Triste', emoji: '😢', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Celebra com o grupo! Mostra a descoberta e partilha a alegria com todos.',
      },
      {
        situation: 'O teu dinossauro favorito não está na exposição do museu.',
        emoji: '😞',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Surpreso', emoji: '😲', correct: false },
        ],
        strategy: 'Fica triste um pouco, mas procura outros dinossauros interessantes. Há sempre coisas novas para descobrir!',
      },
      {
        situation: 'Vais entrar numa caverna escura pela primeira vez.',
        emoji: '🕳️',
        emotions: [
          { name: 'Nervoso', emoji: '😰', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'É normal ter medo do escuro! Leva uma lanterna, fica perto do grupo e respira devagar.',
      },
      {
        situation: 'O teu melhor amigo muda de grupo de exploração.',
        emoji: '👋',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Com fome', emoji: '🤤', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'É normal ficar triste. Podes continuar a ser amigo! Combina encontros para explorar juntos.',
      },
      {
        situation: 'Ganhas o premio de melhor explorador do campo de ferias.',
        emoji: '🏆',
        emotions: [
          { name: 'Orgulhoso', emoji: '🥹', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Sente orgulho do teu trabalho! Agradece ao guia e aos colegas de equipa.',
      },
      {
        situation: 'Encontras uma pegada gigante de dinossauro na rocha!',
        emoji: '🦶',
        emotions: [
          { name: 'Surpreso', emoji: '😲', correct: true },
          { name: 'Triste', emoji: '😢', correct: false },
          { name: 'Zangado', emoji: '😠', correct: false },
        ],
        strategy: 'Que descoberta incrível! Chama o guia e partilha a novidade com o grupo.',
      },
      {
        situation: 'O fóssil que escavaste durante horas parte-se ao meio.',
        emoji: '💔',
        emotions: [
          { name: 'Frustrado', emoji: '😤', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'É frustrante, mas acontece! Com cola especial e paciência, muitos fósseis podem ser reparados.',
      },
      {
        situation: 'Outro grupo goza contigo porque ainda não encontraste nenhum fóssil.',
        emoji: '😣',
        emotions: [
          { name: 'Envergonhado', emoji: '😳', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Escavar leva tempo. Os maiores descobridores procuraram durante anos! Continua com calma.',
      },
      {
        situation: 'O museu convida o teu grupo para ver uma exposição especial antes de abrir ao público.',
        emoji: '🎟️',
        emotions: [
          { name: 'Entusiasmado', emoji: '🤩', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'Que privilegio! Aproveita cada momento e tira notas sobre o que viste.',
      },
    ],

    fairPlay: [
      {
        situation: 'Um colega encontra um fóssil raro antes de ti. O que fazes?',
        emoji: '💎',
        options: [
          { text: 'Dou-lhe os parabéns pela descoberta', correct: true },
          { text: 'Fico zangado e digo que era meu', correct: false },
          { text: 'Deixo de procurar', correct: false },
        ],
        lesson: 'Celebrar as descobertas dos outros mostra que és um verdadeiro explorador de equipa!',
      },
      {
        situation: 'O guia não te escolhe para a primeira escavação. Como reages?',
        emoji: '⛏️',
        options: [
          { text: 'Espero a minha vez e observo', correct: true },
          { text: 'Reclamo e grito com o guia', correct: false },
          { text: 'Vou-me embora da escavação', correct: false },
        ],
        lesson: 'Saber esperar faz parte de ser explorador. Observar os outros também nos ensina!',
      },
      {
        situation: 'Um colega novo chega ao grupo e não sabe nada de fósseis. O que fazes?',
        emoji: '👋',
        options: [
          { text: 'Apresento-me e ensino-lhe o básico', correct: true },
          { text: 'Ignoro-o', correct: false },
          { text: 'Gozar porque não sabe nada', correct: false },
        ],
        lesson: 'Ajudar os novos colegas e a marca de um grande explorador!',
      },
      {
        situation: 'O teu grupo descobre o melhor fóssil. Como celebras?',
        emoji: '🎉',
        options: [
          { text: 'Celebro com o grupo e mostro aos outros', correct: true },
          { text: 'Gozar com os outros grupos', correct: false },
          { text: 'Digo que fui eu sozinho', correct: false },
        ],
        lesson: 'As grandes descobertas são feitas em equipa. Partilhar o sucesso é o mais importante!',
      },
      {
        situation: 'Não entendes como funciona uma ferramenta de escavação. O que fazes?',
        emoji: '❓',
        options: [
          { text: 'Pergunto ao guia como funciona', correct: true },
          { text: 'Finjo que sei usar', correct: false },
          { text: 'Não toco em nada', correct: false },
        ],
        lesson: 'Pedir ajuda é a melhor forma de aprender. Os melhores cientistas fazem muitas perguntas!',
      },
      {
        situation: 'Um colega está triste porque partiu o fóssil dele. O que fazes?',
        emoji: '😢',
        options: [
          { text: 'Consolo-o e ajudo a colar as peças', correct: true },
          { text: 'Rio-me dele', correct: false },
          { text: 'Não faço nada', correct: false },
        ],
        lesson: 'Apoiar os amigos nos momentos difíceis mostra que és um verdadeiro companheiro de aventura!',
      },
      {
        situation: 'Encontras um fóssil mas um colega diz que o viu primeiro. O que fazes?',
        emoji: '🦴',
        options: [
          { text: 'Partilho a descoberta e trabalhamos juntos', correct: true },
          { text: 'Digo que é só meu e escondo-o', correct: false },
          { text: 'Atiro o fóssil para longe', correct: false },
        ],
        lesson: 'Partilhar descobertas é o espírito da ciência. Os grandes cientistas trabalham em equipa!',
      },
      {
        situation: 'O guia pede-te para deixar um colega mais novo escavar primeiro. O que fazes?',
        emoji: '⛏️',
        options: [
          { text: 'Deixo-o ir primeiro e ajudo-o se precisar', correct: true },
          { text: 'Recuso e digo que sou mais experiente', correct: false },
          { text: 'Fico zangado e vou embora', correct: false },
        ],
        lesson: 'Dar a vez aos mais novos mostra maturidade. Um dia também te ajudaram a comecar!',
      },
      {
        situation: 'Um colega estraga a tua escavação sem querer. O que fazes?',
        emoji: '😬',
        options: [
          { text: 'Aceito o pedido de desculpa e recomeçamos juntos', correct: true },
          { text: 'Grito com ele e culpo-o', correct: false },
          { text: 'Estrago a escavação dele também', correct: false },
        ],
        lesson: 'Acidentes acontecem. Perdoar e recomeçar mostra que és um verdadeiro explorador!',
      },
      {
        situation: 'O teu grupo tem de escolher que sala do museu visitar e tu não concordas com a escolha. O que fazes?',
        emoji: '🏛️',
        options: [
          { text: 'Aceito a decisão do grupo e aproveito a visita', correct: true },
          { text: 'Reclamo e insisto na minha escolha', correct: false },
          { text: 'Separo-me do grupo e vou sozinho', correct: false },
        ],
        lesson: 'Respeitar as decisões do grupo faz parte de trabalhar em equipa. Podes sugerir a tua sala para a próxima vez!',
      },
    ],

    division: [
      { total: 12, groups: 2, context: '12 exploradores divididos em 2 grupos de escavação.' },
      { total: 10, groups: 5, context: '10 pincéis para 5 escavadores.' },
      { total: 15, groups: 3, context: '15 garrafas de agua para 3 grupos.' },
      { total: 8, groups: 2, context: '8 capacetes para 2 equipas de escavação.' },
      { total: 20, groups: 4, context: '20 amostras de rocha para 4 caixas.' },
      { total: 6, groups: 3, context: '6 lupas para 3 pares de exploradores.' },
      { total: 16, groups: 4, context: '16 marcadores para 4 zonas de escavação.' },
      { total: 9, groups: 3, context: '9 exploradores divididos em 3 mini-equipas.' },
      { total: 18, groups: 6, context: '18 fósseis para guardar em 6 vitrinas do museu.' },
      { total: 24, groups: 4, context: '24 pincéis de escavação para 4 mesas de trabalho.' },
      { total: 14, groups: 7, context: '14 amostras de terra para 7 tubos de ensaio.' },
      { total: 21, groups: 3, context: '21 livros de dinossauros para 3 prateleiras da biblioteca.' },
    ],

    shop: {
      title: 'Loja do Museu',
      items: [
        { name: 'Bilhete', emoji: '🎫', price: 50 },
        { name: 'Miniatura T-Rex', emoji: '🦕', price: 30 },
        { name: 'Livro de Fósseis', emoji: '📖', price: 100 },
        { name: 'Agua', emoji: '💧', price: 10 },
        { name: 'Kit Escavação', emoji: '🔨', price: 20 },
        { name: 'Chapeu Explorador', emoji: '🧢', price: 40 },
        { name: 'Poster', emoji: '🦕', price: 25 },
        { name: 'Lupa', emoji: '🔍', price: 15 },
        { name: 'Caderno', emoji: '📓', price: 35 },
        { name: 'Puzzle', emoji: '🧩', price: 75 },
      ],
    },

    dress: {
      title: 'Veste o Explorador',
      character: 'explorador',
      instruction: (en, pt) => `Coloca a ${en} no explorador. Onde vai a ${pt}?`,
      completeText: 'O explorador está pronto para a aventura!',
      completeEmoji: '🦕',
    },

    color: {
      title: 'Pinta o Dinossauro',
      completeText: 'Pintaste todos os dinossauros!',
      instruction: (name, colors) => `Pinta o ${name}. Escolhe as cores: ${colors}.`,
      items: [
        { name: 'T-Rex', detail: 'Jurássico', colors: ['green', 'yellow'] },
        { name: 'Triceratops', detail: 'Cretáceo', colors: ['blue', 'white'] },
        { name: 'Raptor', detail: 'Jurássico', colors: ['red', 'orange'] },
        { name: 'Stegosaurus', detail: 'Jurássico', colors: ['green', 'orange'] },
        { name: 'Pterodactyl', detail: 'Cretáceo', colors: ['blue', 'yellow'] },
        { name: 'Diplodocus', detail: 'Jurássico', colors: ['green', 'white'] },
        { name: 'Ankylosaurus', detail: 'Cretáceo', colors: ['yellow', 'black'] },
        { name: 'Spinosaurus', detail: 'Cretáceo', colors: ['red', 'green'] },
        { name: 'Brachiosaurus', detail: 'Jurássico', colors: ['green', 'brown'] },
        { name: 'Parasaurolophus', detail: 'Cretáceo', colors: ['blue', 'green'] },
        { name: 'Velociraptor', detail: 'Cretáceo', colors: ['orange', 'brown'] },
        { name: 'Archaeopteryx', detail: 'Jurássico', colors: ['black', 'yellow'] },
        { name: 'Mosasaurus', detail: 'Cretáceo', colors: ['blue', 'black'] },
        { name: 'Iguanodon', detail: 'Cretáceo', colors: ['green', 'yellow'] },
      ],
    },

    read: {
      title: 'Lê a Contagem',
      completeText: 'Leste todas as contagens!',
      boardColor: '#5D4037',
      items: [
        { home: 'T-Rex', away: 'Raptor', homeScore: 3, awayScore: 1 },
        { home: 'Triceratops', away: 'Stegosaurus', homeScore: 2, awayScore: 2 },
        { home: 'Pterodactyl', away: 'Diplodocus', homeScore: 0, awayScore: 1 },
        { home: 'Ankylosaurus', away: 'Spinosaurus', homeScore: 4, awayScore: 0 },
        { home: 'T-Rex', away: 'Triceratops', homeScore: 2, awayScore: 1 },
        { home: 'Raptor', away: 'Diplodocus', homeScore: 1, awayScore: 3 },
        { home: 'Brachiosaurus', away: 'Parasaurolophus', homeScore: 5, awayScore: 2 },
        { home: 'Velociraptor', away: 'Archaeopteryx', homeScore: 1, awayScore: 4 },
        { home: 'Mosasaurus', away: 'Iguanodon', homeScore: 3, awayScore: 3 },
        { home: 'Spinosaurus', away: 'Ankylosaurus', homeScore: 2, awayScore: 0 },
        { home: 'Diplodocus', away: 'T-Rex', homeScore: 6, awayScore: 1 },
        { home: 'Triceratops', away: 'Velociraptor', homeScore: 0, awayScore: 2 },
      ],
    },

    routine: {
      title: 'Rotina do Explorador',
      step8: { text: 'Aulas da tarde / Clube de Ciencias', emoji: '🔬' },
    },
  },

  // ==================== SPACE ====================
  space: {
    math: {
      title: 'Missões e Contas',
      icon: '🚀',
      addContext: (a, b) =>
        `A nave recolheu ${a} estrelas de manhã e ${b} a tarde.`,
      subContext: (a, b) =>
        `A estação tinha ${a} astronautas e ${b} regressaram a Terra. Quantos ficaram?`,
      mulContext: (a, b) =>
        `São ${a} missões e cada missão explora ${b} planetas.`,
    },

    emotions: [
      {
        situation: 'O comandante não te deixa pilotar a nave hoje.',
        emoji: '🚀',
        emotions: [
          { name: 'Zangado', emoji: '😠', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Respira fundo. Todos os astronautas esperam a sua vez. Aproveita para estudar os mapas!',
      },
      {
        situation: 'Aterras num planeta novo e descobres agua!',
        emoji: '💧',
        emotions: [
          { name: 'Alegre', emoji: '😄', correct: true },
          { name: 'Triste', emoji: '😢', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Celebra com a tripulação! Partilha a descoberta com a base na Terra.',
      },
      {
        situation: 'A nave perde contacto com a Terra por um momento.',
        emoji: '📡',
        emotions: [
          { name: 'Nervoso', emoji: '😰', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'É normal ficar nervoso. Segue o procedimento, verifica os sistemas e espera com calma.',
      },
      {
        situation: 'O teu companheiro de missão é transferido para outra estação.',
        emoji: '👋',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Com fome', emoji: '🤤', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'É normal ficar triste. Podem comunicar por rádio! A amizade não tem distância.',
      },
      {
        situation: 'Uma missão que estavas a esperar foi cancelada.',
        emoji: '❌',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Surpreso', emoji: '😲', correct: false },
        ],
        strategy: 'Às vezes as missões são adiadas. Aproveita para te preparar melhor para a próxima!',
      },
      {
        situation: 'Recebes uma medalha por completar a missão com sucesso!',
        emoji: '🏅',
        emotions: [
          { name: 'Orgulhoso', emoji: '🥹', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Sente orgulho! Agradece ao comandante e à tripulação que te ajudou.',
      },
      {
        situation: 'Avistas uma estrela cadente pela janela da estação espacial!',
        emoji: '🌠',
        emotions: [
          { name: 'Entusiasmado', emoji: '🤩', correct: true },
          { name: 'Triste', emoji: '😢', correct: false },
          { name: 'Zangado', emoji: '😠', correct: false },
        ],
        strategy: 'Que momento mágico! Regista no diário de bordo e partilha com a tripulação.',
      },
      {
        situation: 'O teu fato espacial avaria e não podes sair da nave.',
        emoji: '🧑‍🚀',
        emotions: [
          { name: 'Frustrado', emoji: '😤', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'É frustrante, mas a segurança é primeiro! Pede ajuda ao técnico e espera com paciência.',
      },
      {
        situation: 'Um colega diz que a tua experiência científica não vai funcionar.',
        emoji: '🔬',
        emotions: [
          { name: 'Envergonhado', emoji: '😳', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Não fiques triste. Todos os cientistas erram. Tenta outra vez e aprende com os erros!',
      },
      {
        situation: 'Depois de meses no espaço, finalmente ves a Terra pela janela ao regressar!',
        emoji: '🌍',
        emotions: [
          { name: 'Aliviado', emoji: '😮‍💨', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'Que alívio enorme! Regressar a casa é sempre especial. Celebra com a tripulação.',
      },
    ],

    fairPlay: [
      {
        situation: 'Um colega completa a missão antes de ti. O que fazes?',
        emoji: '🚀',
        options: [
          { text: 'Dou-lhe os parabéns pela missão cumprida', correct: true },
          { text: 'Fico zangado e digo que devia ser eu', correct: false },
          { text: 'Desisto das missões', correct: false },
        ],
        lesson: 'Na equipa espacial, o sucesso de um é o sucesso de todos!',
      },
      {
        situation: 'O comandante põe-te a limpar a estação em vez de explorar. Como reages?',
        emoji: '🧹',
        options: [
          { text: 'Faço a minha tarefa e espero a próxima missão', correct: true },
          { text: 'Reclamo e grito com o comandante', correct: false },
          { text: 'Recuso-me a fazer', correct: false },
        ],
        lesson: 'Todas as tarefas são importantes na estação. Até limpar ajuda a equipa!',
      },
      {
        situation: 'Um astronauta novo chega e não sabe usar o fato espacial. O que fazes?',
        emoji: '🧑‍🚀',
        options: [
          { text: 'Ajudo-o a vestir o fato e explico como funciona', correct: true },
          { text: 'Ignoro-o', correct: false },
          { text: 'Rio-me porque não sabe', correct: false },
        ],
        lesson: 'Ajudar os novos tripulantes é essencial. No espaço, dependemos uns dos outros!',
      },
      {
        situation: 'A tua equipa completa uma missão difícil. Como celebras?',
        emoji: '🎉',
        options: [
          { text: 'Celebro com a tripulação e partilho o mérito', correct: true },
          { text: 'Digo que fiz tudo sozinho', correct: false },
          { text: 'Ignoro os outros', correct: false },
        ],
        lesson: 'No espaço, ninguém faz nada sozinho. O trabalho de equipa é a chave do sucesso!',
      },
      {
        situation: 'Não entendes os controlos da nave. O que fazes?',
        emoji: '❓',
        options: [
          { text: 'Pergunto ao comandante como funcionam', correct: true },
          { text: 'Carrego em todos os botões', correct: false },
          { text: 'Não toco em nada e fico parado', correct: false },
        ],
        lesson: 'Perguntar é a forma mais segura de aprender. No espaço, erros podem ser perigosos!',
      },
      {
        situation: 'Um colega está preocupado antes de uma missão difícil. O que fazes?',
        emoji: '😟',
        options: [
          { text: 'Encorajo-o e digo que estamos juntos nisto', correct: true },
          { text: 'Digo-lhe que é fraco', correct: false },
          { text: 'Não faço nada', correct: false },
        ],
        lesson: 'Encorajar os colegas faz toda a equipa mais forte e confiante!',
      },
      {
        situation: 'Reparas que um colega cometeu um erro nos cálculos da missão, mas ninguém viu. O que fazes?',
        emoji: '🔢',
        options: [
          { text: 'Aviso-o em privado para corrigir o erro', correct: true },
          { text: 'Fico calado para ele ter problemas', correct: false },
          { text: 'Digo a todos que ele errou', correct: false },
        ],
        lesson: 'Corrigir erros em privado mostra respeito. No espaço, um pequeno erro pode ser muito grave!',
      },
      {
        situation: 'Ha só um lugar para ver a chuva de meteoritos pela janela da estação. O que fazes?',
        emoji: '☄️',
        options: [
          { text: 'Revezamo-nos para todos verem', correct: true },
          { text: 'Fico eu no melhor lugar o tempo todo', correct: false },
          { text: 'Empurro os outros para ficar à frente', correct: false },
        ],
        lesson: 'Partilhar as experiências especiais torna-as ainda melhores. A tripulação é uma família!',
      },
      {
        situation: 'A tua experiência científica correu melhor do que a de um colega. O que fazes?',
        emoji: '🧪',
        options: [
          { text: 'Ajudo-o a perceber o que correu mal na dele', correct: true },
          { text: 'Gabei-me do meu resultado', correct: false },
          { text: 'Digo que a experiência dele não presta', correct: false },
        ],
        lesson: 'Ajudar os colegas a melhorar é o que fazem os verdadeiros cientistas. A ciência é colaboração!',
      },
      {
        situation: 'O comandante pede voluntários para uma tarefa difícil e perigosa. O que fazes?',
        emoji: '🛡️',
        options: [
          { text: 'Ofereço-me e trabalho em equipa para a cumprir', correct: true },
          { text: 'Escondo-me para não ser escolhido', correct: false },
          { text: 'Digo que os outros devem ir', correct: false },
        ],
        lesson: 'A coragem de se voluntariar mostra espírito de equipa. No espaço, todos contam uns com os outros!',
      },
    ],

    division: [
      { total: 12, groups: 2, context: '12 astronautas divididos em 2 equipas de missão.' },
      { total: 10, groups: 5, context: '10 tanques de oxigénio para 5 astronautas.' },
      { total: 15, groups: 3, context: '15 rações de comida para 3 dias de missão.' },
      { total: 8, groups: 2, context: '8 fatos espaciais para 2 equipas.' },
      { total: 20, groups: 4, context: '20 amostras de rocha lunar para 4 laboratórios.' },
      { total: 6, groups: 3, context: '6 tablets para 3 pares de astronautas.' },
      { total: 16, groups: 4, context: '16 sensores para 4 estáções de monitorização.' },
      { total: 9, groups: 3, context: '9 astronautas divididos em 3 mini-equipas.' },
      { total: 18, groups: 6, context: '18 painéis solares para 6 módulos da estação.' },
      { total: 24, groups: 4, context: '24 rações espaciais para 4 semanas de missão.' },
      { total: 14, groups: 7, context: '14 ferramentas para 7 astronautas na caminhada espacial.' },
      { total: 21, groups: 3, context: '21 amostras de solo marciano para 3 laboratórios.' },
    ],

    shop: {
      title: 'Loja da Estação',
      items: [
        { name: 'Bilhete Espacial', emoji: '🎫', price: 50 },
        { name: 'Miniatura Foguetao', emoji: '🚀', price: 30 },
        { name: 'Fato Astronauta', emoji: '🧑‍🚀', price: 100 },
        { name: 'Agua Espacial', emoji: '💧', price: 10 },
        { name: 'Mapa Estelar', emoji: '🗺️', price: 20 },
        { name: 'Capacete Espacial', emoji: '⛑️', price: 40 },
        { name: 'Poster', emoji: '🌌', price: 25 },
        { name: 'Telescopio Mini', emoji: '🔭', price: 75 },
        { name: 'Caderno', emoji: '📓', price: 35 },
        { name: 'Globo', emoji: '🌍', price: 15 },
      ],
    },

    dress: {
      title: 'Veste o Astronauta',
      character: 'astronauta',
      instruction: (en, pt) => `Coloca a ${en} no astronauta. Onde vai a ${pt}?`,
      completeText: 'O astronauta está pronto para a missão!',
      completeEmoji: '🚀',
    },

    color: {
      title: 'Pinta o Planeta',
      completeText: 'Pintaste todos os planetas!',
      instruction: (name, colors) => `Pinta o planeta ${name}. Escolhe as cores: ${colors}.`,
      items: [
        { name: 'Terra', detail: 'Sistema Solar', colors: ['blue', 'green'] },
        { name: 'Marte', detail: 'Sistema Solar', colors: ['red', 'orange'] },
        { name: 'Saturno', detail: 'Sistema Solar', colors: ['yellow', 'orange'] },
        { name: 'Jupiter', detail: 'Sistema Solar', colors: ['orange', 'white'] },
        { name: 'Neptuno', detail: 'Sistema Solar', colors: ['blue', 'white'] },
        { name: 'Sol', detail: 'Estrela', colors: ['yellow', 'red'] },
        { name: 'Lua', detail: 'Satelite', colors: ['white', 'black'] },
        { name: 'Venus', detail: 'Sistema Solar', colors: ['yellow', 'white'] },
        { name: 'Urano', detail: 'Sistema Solar', colors: ['blue', 'green'] },
        { name: 'Mercurio', detail: 'Sistema Solar', colors: ['orange', 'brown'] },
        { name: 'Cometa Halley', detail: 'Espaço', colors: ['white', 'blue'] },
        { name: 'Estação Espacial', detail: 'Órbita', colors: ['white', 'black'] },
        { name: 'Estrela Cadente', detail: 'Espaço', colors: ['yellow', 'white'] },
        { name: 'Buraco Negro', detail: 'Espaço', colors: ['black', 'purple'] },
      ],
    },

    read: {
      title: 'Lê a Missão',
      completeText: 'Leste todas as missões!',
      boardColor: '#1A237E',
      items: [
        { home: 'Mars', away: 'Jupiter', homeScore: 3, awayScore: 1 },
        { home: 'Earth', away: 'Saturn', homeScore: 2, awayScore: 2 },
        { home: 'Venus', away: 'Mercury', homeScore: 0, awayScore: 1 },
        { home: 'Neptune', away: 'Pluto', homeScore: 4, awayScore: 0 },
        { home: 'Mars', away: 'Earth', homeScore: 2, awayScore: 1 },
        { home: 'Jupiter', away: 'Saturn', homeScore: 1, awayScore: 3 },
        { home: 'Uranus', away: 'Neptune', homeScore: 5, awayScore: 2 },
        { home: 'Mercury', away: 'Venus', homeScore: 1, awayScore: 4 },
        { home: 'Moon', away: 'Mars', homeScore: 3, awayScore: 3 },
        { home: 'Sun', away: 'Jupiter', homeScore: 0, awayScore: 2 },
        { home: 'Saturn', away: 'Pluto', homeScore: 6, awayScore: 1 },
        { home: 'Earth', away: 'Moon', homeScore: 2, awayScore: 0 },
      ],
    },

    routine: {
      title: 'Rotina do Astronauta',
      step8: { text: 'Aulas da tarde / Clube de Astronomia', emoji: '🔭' },
    },
  },

  // ==================== ANIMALS ====================
  animals: {
    math: {
      title: 'Animais e Contas',
      icon: '🐾',
      addContext: (a, b) =>
        `O veterinário tratou ${a} animais de manhã e ${b} a tarde.`,
      subContext: (a, b) =>
        `O jardim zoológico tinha ${a} leões e ${b} foram transferidos. Quantos ficaram?`,
      mulContext: (a, b) =>
        `São ${a} jaulas e cada jaula tem ${b} animais.`,
    },

    emotions: [
      {
        situation: 'Alguem maltrata um animal a tua frente.',
        emoji: '🐕',
        emotions: [
          { name: 'Zangado', emoji: '😠', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Respira fundo. Conta a um adulto o que viste. Nunca devemos maltratar animais.',
      },
      {
        situation: 'Um animal bebe nasce na reserva!',
        emoji: '🐣',
        emotions: [
          { name: 'Alegre', emoji: '😄', correct: true },
          { name: 'Triste', emoji: '😢', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Celebra com os colegas! Um novo animal é uma grande alegria para todos.',
      },
      {
        situation: 'O teu animal favorito está doente.',
        emoji: '🤒',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Surpreso', emoji: '😲', correct: false },
        ],
        strategy: 'É normal ficar triste. O veterinário vai cuidar dele. Podes visitá-lo e dar-lhe carinho.',
      },
      {
        situation: 'Vais entrar na jaula do leão pela primeira vez (em segurança).',
        emoji: '🦁',
        emotions: [
          { name: 'Nervoso', emoji: '😰', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'É normal ter nervos! Segue as instruções do tratador e mantém-te calmo.',
      },
      {
        situation: 'O animal que cuidaste vai ser transferido para outra reserva.',
        emoji: '👋',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Com fome', emoji: '🤤', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'É normal sentir saudades. Na nova reserva ele vai estar bem e feliz!',
      },
      {
        situation: 'Salvas um animal ferido e ele recupera totalmente!',
        emoji: '🏆',
        emotions: [
          { name: 'Orgulhoso', emoji: '🥹', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Sente orgulho! Cuidar dos animais é uma das coisas mais bonitas que se pode fazer.',
      },
      {
        situation: 'O veterinário pede-te para cuidar de um animal que te assusta um pouco.',
        emoji: '🐍',
        emotions: [
          { name: 'Nervoso', emoji: '😰', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'É normal ter receio! Pede ao veterinário que te ensine como lidar com ele. Aos poucos o medo passa.',
      },
      {
        situation: 'Um colega goza contigo porque gostas de cuidar de insectos.',
        emoji: '🐛',
        emotions: [
          { name: 'Envergonhado', emoji: '😳', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Todos os animais são importantes, até os mais pequenos! Não tenhas vergonha do que gostas.',
      },
      {
        situation: 'O passaro que cuidaste desde bebe finalmente aprende a voar!',
        emoji: '🕊️',
        emotions: [
          { name: 'Entusiasmado', emoji: '🤩', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Triste', emoji: '😢', correct: false },
        ],
        strategy: 'Que momento especial! Celebra e partilha a novidade com os colegas. O teu cuidado fez a diferença!',
      },
      {
        situation: 'Chegas a reserva e descobres que o teu animal preferido fugiu durante a noite.',
        emoji: '🔍',
        emotions: [
          { name: 'Preocupado', emoji: '😟', correct: true },
          { name: 'Divertido', emoji: '🤣', correct: false },
          { name: 'Com fome', emoji: '🤤', correct: false },
        ],
        strategy: 'É normal ficar preocupado. Avisa o tratador e ajuda nas buscas. Com calma, vão encontrá-lo!',
      },
    ],

    fairPlay: [
      {
        situation: 'Um colega encontra um animal raro primeiro. O que fazes?',
        emoji: '🦜',
        options: [
          { text: 'Dou-lhe os parabéns pela descoberta', correct: true },
          { text: 'Fico zangado e digo que vi primeiro', correct: false },
          { text: 'Deixo de procurar', correct: false },
        ],
        lesson: 'Celebrar as descobertas dos colegas mostra que és um verdadeiro amigo dos animais!',
      },
      {
        situation: 'O veterinário põe-te a limpar as jaulas em vez de brincar com os animais. Como reages?',
        emoji: '🧹',
        options: [
          { text: 'Faço a minha parte para manter tudo limpo', correct: true },
          { text: 'Reclamo e não faço nada', correct: false },
          { text: 'Vou-me embora', correct: false },
        ],
        lesson: 'Limpar as jaulas é cuidar dos animais. É tão importante como brincar com eles!',
      },
      {
        situation: 'Um colega novo chega e tem medo dos animais. O que fazes?',
        emoji: '😟',
        options: [
          { text: 'Ajudo-o com paciência a conhecer os animais', correct: true },
          { text: 'Ignoro-o', correct: false },
          { text: 'Rio-me porque tem medo', correct: false },
        ],
        lesson: 'Ter medo é normal. Ajudar os outros a superar os medos é uma grande qualidade!',
      },
      {
        situation: 'O teu grupo salva um animal em perigo. Como celebras?',
        emoji: '🎉',
        options: [
          { text: 'Celebro com todos e partilho a alegria', correct: true },
          { text: 'Digo que fiz tudo sozinho', correct: false },
          { text: 'Não ligo nenhuma', correct: false },
        ],
        lesson: 'Salvar animais é um trabalho de equipa. Todos contribuem!',
      },
      {
        situation: 'Não sabes como alimentar um animal. O que fazes?',
        emoji: '❓',
        options: [
          { text: 'Pergunto ao veterinário como se faz', correct: true },
          { text: 'Dou-lhe a minha comida', correct: false },
          { text: 'Não faço nada', correct: false },
        ],
        lesson: 'Cada animal tem uma dieta especial. Perguntar é a melhor forma de aprender!',
      },
      {
        situation: 'Um colega está triste porque o animal dele não melhorou. O que fazes?',
        emoji: '😢',
        options: [
          { text: 'Consolo-o e digo que o veterinário está a fazer o melhor', correct: true },
          { text: 'Digo-lhe para não ser sensível', correct: false },
          { text: 'Não faço nada', correct: false },
        ],
        lesson: 'Apoiar os amigos quando estão preocupados com os animais mostra empatia e bondade!',
      },
      {
        situation: 'Há um só binóculo e dois colegas querem observar os pássaros ao mesmo tempo. O que fazes?',
        emoji: '🔭',
        options: [
          { text: 'Sugiro que se revezem e partilhem', correct: true },
          { text: 'Tiro o binóculo e fico eu com ele', correct: false },
          { text: 'Vou-me embora porque não quero esperar', correct: false },
        ],
        lesson: 'Partilhar os recursos mostra maturidade. Quando esperamos, todos acabam por aproveitar!',
      },
      {
        situation: 'Um colega tem medo de um animal inofensivo e os outros riem-se. O que fazes?',
        emoji: '🐸',
        options: [
          { text: 'Defendo-o e digo que ter medo é normal', correct: true },
          { text: 'Rio-me também', correct: false },
          { text: 'Ignoro a situação', correct: false },
        ],
        lesson: 'Defender quem está a ser gozado é corajoso. Toda a gente tem medos e isso é normal!',
      },
      {
        situation: 'O tratador pede-te para ensinares a um colega mais novo como dar comida aos coelhos. O que fazes?',
        emoji: '🐇',
        options: [
          { text: 'Ensino-lhe com paciência e passo a passo', correct: true },
          { text: 'Digo-lhe para aprender sozinho', correct: false },
          { text: 'Faço tudo eu porque sou mais rápido', correct: false },
        ],
        lesson: 'Ensinar os mais novos é uma responsabilidade bonita. Quando ensinamos, também aprendemos!',
      },
      {
        situation: 'O teu grupo perde o concurso de melhor projeto sobre animais. O que fazes?',
        emoji: '📋',
        options: [
          { text: 'Dou os parabéns ao grupo vencedor e penso no que posso melhorar', correct: true },
          { text: 'Digo que o concurso não foi justo', correct: false },
          { text: 'Fico zangado e não falo com ninguém', correct: false },
        ],
        lesson: 'Saber perder com elegância é aprender com os outros faz-nos crescer. Da próxima vez, será melhor!',
      },
    ],

    division: [
      { total: 12, groups: 2, context: '12 tratadores divididos em 2 equipas.' },
      { total: 10, groups: 5, context: '10 tigelas de comida para 5 animais.' },
      { total: 15, groups: 3, context: '15 litros de leite para 3 crias.' },
      { total: 8, groups: 2, context: '8 coleiras para 2 grupos de caes.' },
      { total: 20, groups: 4, context: '20 biscoitos para 4 animais.' },
      { total: 6, groups: 3, context: '6 escovas para 3 pares de tratadores.' },
      { total: 16, groups: 4, context: '16 brinquedos para 4 grupos de animais.' },
      { total: 9, groups: 3, context: '9 tratadores divididos em 3 mini-equipas.' },
      { total: 18, groups: 6, context: '18 cenouras para 6 coelhos da reserva.' },
      { total: 24, groups: 4, context: '24 peixes para 4 golfinhos do aquario.' },
      { total: 14, groups: 7, context: '14 ninhos para 7 pares de pássaros.' },
      { total: 21, groups: 3, context: '21 maças para 3 grupos de elefantes.' },
    ],

    shop: {
      title: 'Loja da Reserva',
      items: [
        { name: 'Bilhete Zoo', emoji: '🎫', price: 50 },
        { name: 'Peluche Leao', emoji: '🦁', price: 30 },
        { name: 'Livro Animais', emoji: '📖', price: 100 },
        { name: 'Agua', emoji: '💧', price: 10 },
        { name: 'Binoculos', emoji: '🔭', price: 20 },
        { name: 'Chapeu Safari', emoji: '🧢', price: 40 },
        { name: 'Poster', emoji: '🐾', price: 25 },
        { name: 'Caderno', emoji: '📓', price: 35 },
        { name: 'Puzzle', emoji: '🧩', price: 75 },
        { name: 'Adesivos', emoji: '🐻', price: 15 },
      ],
    },

    dress: {
      title: 'Veste o Veterinário',
      character: 'veterinário',
      instruction: (en, pt) => `Coloca a ${en} no veterinário. Onde vai a ${pt}?`,
      completeText: 'O veterinário está pronto para cuidar dos animais!',
      completeEmoji: '🐾',
    },

    color: {
      title: 'Pinta o Animal',
      completeText: 'Pintaste todos os animais!',
      instruction: (name, colors) => `Pinta o ${name}. Escolhe as cores: ${colors}.`,
      items: [
        { name: 'Tigre', detail: 'Asia', colors: ['orange', 'black'] },
        { name: 'Zebra', detail: 'Africa', colors: ['black', 'white'] },
        { name: 'Papagaio', detail: 'Brasil', colors: ['red', 'green'] },
        { name: 'Flamingo', detail: 'Africa', colors: ['red', 'white'] },
        { name: 'Sapo', detail: 'Amazonia', colors: ['green', 'yellow'] },
        { name: 'Panda', detail: 'China', colors: ['black', 'white'] },
        { name: 'Tucano', detail: 'Brasil', colors: ['yellow', 'orange'] },
        { name: 'Golfinho', detail: 'Oceano', colors: ['blue', 'white'] },
        { name: 'Coruja', detail: 'Europa', colors: ['brown', 'white'] },
        { name: 'Canguru', detail: 'Australia', colors: ['brown', 'orange'] },
        { name: 'Urso Polar', detail: 'Artico', colors: ['white', 'black'] },
        { name: 'Camaleao', detail: 'Africa', colors: ['green', 'yellow'] },
        { name: 'Polvo', detail: 'Oceano', colors: ['purple', 'pink'] },
        { name: 'Abelha', detail: 'Jardim', colors: ['yellow', 'black'] },
      ],
    },

    read: {
      title: 'Le o Censo',
      completeText: 'Leste todas as contagens!',
      boardColor: '#E65100',
      items: [
        { home: 'Lions', away: 'Tigers', homeScore: 3, awayScore: 1 },
        { home: 'Eagles', away: 'Hawks', homeScore: 2, awayScore: 2 },
        { home: 'Dolphins', away: 'Whales', homeScore: 0, awayScore: 1 },
        { home: 'Pandas', away: 'Bears', homeScore: 4, awayScore: 0 },
        { home: 'Wolves', away: 'Foxes', homeScore: 2, awayScore: 1 },
        { home: 'Parrots', away: 'Toucans', homeScore: 1, awayScore: 3 },
        { home: 'Elephants', away: 'Giraffes', homeScore: 5, awayScore: 2 },
        { home: 'Owls', away: 'Penguins', homeScore: 1, awayScore: 4 },
        { home: 'Kangaroos', away: 'Koalas', homeScore: 3, awayScore: 3 },
        { home: 'Sharks', away: 'Octopuses', homeScore: 0, awayScore: 2 },
        { home: 'Crocodiles', away: 'Hippos', homeScore: 6, awayScore: 1 },
        { home: 'Bees', away: 'Butterflies', homeScore: 2, awayScore: 0 },
      ],
    },

    routine: {
      title: 'Rotina do Veterinário',
      step8: { text: 'Aulas da tarde / Cuidar dos animais', emoji: '🐾' },
    },
  },

  // ==================== MUSIC ====================
  music: {
    math: {
      title: 'Ritmo e Contas',
      icon: '🎵',
      addContext: (a, b) =>
        `A banda tocou ${a} musicas na primeira parte e ${b} na segunda.`,
      subContext: (a, b) =>
        `O concerto tinha ${a} espectadores e ${b} sairam no intervalo. Quantos ficaram?`,
      mulContext: (a, b) =>
        `São ${a} concertos e cada concerto tem ${b} musicas.`,
    },

    emotions: [
      {
        situation: 'O professor diz que desafinaste, mas tocaste bem.',
        emoji: '🎵',
        emotions: [
          { name: 'Zangado', emoji: '😠', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Respira fundo. Explica com calma que praticaste muito. Pede para tocar outra vez.',
      },
      {
        situation: 'A banda ganha o concurso de talentos!',
        emoji: '🏆',
        emotions: [
          { name: 'Alegre', emoji: '😄', correct: true },
          { name: 'Triste', emoji: '😢', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Celebra com a banda! Abracam-se todos. A música une as pessoas!',
      },
      {
        situation: 'Esqueces a letra no meio do concerto.',
        emoji: '😬',
        emotions: [
          { name: 'Nervoso', emoji: '😰', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'Acontece aos melhores! Continua a melodia, improvisa, ou espera que a letra volte.',
      },
      {
        situation: 'O teu colega de banda muda de escola.',
        emoji: '👋',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Com fome', emoji: '🤤', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'É normal ficar triste. Podem continuar a tocar juntos nos fins de semana!',
      },
      {
        situation: 'O teu instrumento parte-se antes do concerto.',
        emoji: '💔',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Surpreso', emoji: '😲', correct: false },
        ],
        strategy: 'Pede ajuda ao professor. Talvez alguém tenha um instrumento extra. Não te preocupes!',
      },
      {
        situation: 'Compoes a tua primeira música e todos adoram!',
        emoji: '🎼',
        emotions: [
          { name: 'Orgulhoso', emoji: '🥹', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Sente orgulho da tua criação! Agradece a quem te inspirou e continua a compor.',
      },
      {
        situation: 'O professor escolhe outro colega para o solo em vez de ti.',
        emoji: '🎤',
        emotions: [
          { name: 'Frustrado', emoji: '😤', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'É difícil não ser escolhido, mas haverá mais oportunidades. Continua a praticar e mostra o teu valor!',
      },
      {
        situation: 'Um colega diz que o teu instrumento e estranho e ninguém gosta dele.',
        emoji: '😣',
        emotions: [
          { name: 'Envergonhado', emoji: '😳', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Todos os instrumentos são especiais! Não deixes os outros mudar o que gostas. Toca com orgulho!',
      },
      {
        situation: 'O público aplaude de pé no final do teu concerto!',
        emoji: '👏',
        emotions: [
          { name: 'Entusiasmado', emoji: '🤩', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Triste', emoji: '😢', correct: false },
        ],
        strategy: 'Que momento incrível! Agradece ao público com uma vénia e celebra com a banda.',
      },
      {
        situation: 'Depois de semanas a ensaiar, o concerto é cancelado por causa da chuva.',
        emoji: '🌧️',
        emotions: [
          { name: 'Desapontado', emoji: '😞', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Com fome', emoji: '🤤', correct: false },
        ],
        strategy: 'É muito desapontante, mas o trabalho não foi em vão. O concerto será remarcado e vais estar ainda mais preparado!',
      },
    ],

    fairPlay: [
      {
        situation: 'Um colega ganha o solo no concerto. O que fazes?',
        emoji: '🎤',
        options: [
          { text: 'Dou-lhe os parabéns e apoio-o', correct: true },
          { text: 'Fico zangado porque queria o solo', correct: false },
          { text: 'Não toco no concerto', correct: false },
        ],
        lesson: 'Apoiar os colegas que brilham faz a música de todos soar melhor!',
      },
      {
        situation: 'O maestro põe-te nos instrumentos de fundo. Como reages?',
        emoji: '🎶',
        options: [
          { text: 'Toco o meu melhor e apoio a banda', correct: true },
          { text: 'Reclamo e toco mal de proposito', correct: false },
          { text: 'Não toco nada', correct: false },
        ],
        lesson: 'Os instrumentos de fundo são essenciais! Sem eles, a música não soa bem.',
      },
      {
        situation: 'Um colega novo entra na banda e não sabe tocar. O que fazes?',
        emoji: '👋',
        options: [
          { text: 'Ajudo-o a aprender com paciência', correct: true },
          { text: 'Ignoro-o', correct: false },
          { text: 'Digo-lhe para desistir', correct: false },
        ],
        lesson: 'Todos começam do zero! Ajudar os novos membros fortalece a banda.',
      },
      {
        situation: 'A banda ganha o concurso. Como celebras?',
        emoji: '🎉',
        options: [
          { text: 'Celebro com toda a banda e partilho o mérito', correct: true },
          { text: 'Digo que ganhamos por minha causa', correct: false },
          { text: 'Celebro sozinho', correct: false },
        ],
        lesson: 'A música e feita em conjunto. O sucesso pertence a toda a banda!',
      },
      {
        situation: 'Não entendes uma nota na partitura. O que fazes?',
        emoji: '❓',
        options: [
          { text: 'Pergunto ao professor como se toca', correct: true },
          { text: 'Invento uma nota qualquer', correct: false },
          { text: 'Salto essa parte', correct: false },
        ],
        lesson: 'Pedir ajuda com a partitura é a melhor forma de melhorar. Até os grandes músicos estudam!',
      },
      {
        situation: 'Um colega está nervoso antes da atuação. O que fazes?',
        emoji: '😟',
        options: [
          { text: 'Encorajo-o e digo que vai correr bem', correct: true },
          { text: 'Digo-lhe para não ser medroso', correct: false },
          { text: 'Não faço nada', correct: false },
        ],
        lesson: 'Encorajar os colegas antes de uma atuação faz toda a banda sentir-se mais confiante!',
      },
      {
        situation: 'Reparas que um colega está a tocar as notas erradas no ensaio. O que fazes?',
        emoji: '🎼',
        options: [
          { text: 'Falo com ele em privado e ajudo-o a corrigir', correct: true },
          { text: 'Digo a todos que ele está a tocar mal', correct: false },
          { text: 'Não digo nada e deixo-o errar no concerto', correct: false },
        ],
        lesson: 'Ajudar um colega em privado mostra respeito e faz toda a banda soar melhor!',
      },
      {
        situation: 'A banda tem de escolher a música para o concerto e a tua sugestão não foi escolhida. O que fazes?',
        emoji: '🗳️',
        options: [
          { text: 'Aceito a escolha do grupo e ensaio com entusiasmo', correct: true },
          { text: 'Recuso-me a tocar se não for a minha música', correct: false },
          { text: 'Toco mal de proposito para estragar', correct: false },
        ],
        lesson: 'Aceitar as decisões do grupo faz parte de tocar em banda. A tua sugestão pode ser a próxima!',
      },
      {
        situation: 'Um colega mais novo erra durante a atuação e fica muito envergonhado. O que fazes?',
        emoji: '😊',
        options: [
          { text: 'Digo-lhe que todos erram e que tocou bem no resto', correct: true },
          { text: 'Reclamo porque estragou a atuação', correct: false },
          { text: 'Faço de conta que não o conheço', correct: false },
        ],
        lesson: 'Errar faz parte de aprender. Apoiar quem erra é o que fazem os verdadeiros músicos!',
      },
      {
        situation: 'A banda adversaria no concurso toca muito bem. O que fazes?',
        emoji: '👏',
        options: [
          { text: 'Aplaudo e reconheço que tocaram muito bem', correct: true },
          { text: 'Digo que não foi assim tão bom', correct: false },
          { text: 'Fico de braços cruzados sem aplaudir', correct: false },
        ],
        lesson: 'Reconhecer o talento dos outros mostra grandeza. A música une as pessoas, não as separa!',
      },
    ],

    division: [
      { total: 12, groups: 2, context: '12 músicos divididos em 2 bandas iguais.' },
      { total: 10, groups: 5, context: '10 partituras para 5 músicos.' },
      { total: 15, groups: 3, context: '15 instrumentos para 3 salas de ensaio.' },
      { total: 8, groups: 2, context: '8 microfones para 2 palcos.' },
      { total: 20, groups: 4, context: '20 bilhetes para 4 concertos.' },
      { total: 6, groups: 3, context: '6 guitarras para 3 pares de músicos.' },
      { total: 16, groups: 4, context: '16 cadeiras para 4 filas da orquestra.' },
      { total: 9, groups: 3, context: '9 cantores divididos em 3 grupos vocais.' },
      { total: 18, groups: 6, context: '18 palhetas de guitarra para 6 guitarristas.' },
      { total: 24, groups: 4, context: '24 folhas de partitura para 4 grupos de músicos.' },
      { total: 14, groups: 7, context: '14 estantes de partitura para 7 pares de músicos.' },
      { total: 21, groups: 3, context: '21 CDs para 3 prateleiras da loja do concerto.' },
    ],

    shop: {
      title: 'Loja do Concerto',
      items: [
        { name: 'Bilhete', emoji: '🎫', price: 50 },
        { name: 'T-shirt Banda', emoji: '👕', price: 30 },
        { name: 'Guitarra Mini', emoji: '🎸', price: 100 },
        { name: 'Agua', emoji: '💧', price: 10 },
        { name: 'CD Música', emoji: '💿', price: 20 },
        { name: 'Chapeu Artista', emoji: '🧢', price: 40 },
        { name: 'Poster', emoji: '🎵', price: 25 },
        { name: 'Afinador', emoji: '🎼', price: 15 },
        { name: 'Caderno', emoji: '📓', price: 35 },
        { name: 'Vinil', emoji: '🎶', price: 75 },
      ],
    },

    dress: {
      title: 'Veste o Músico',
      character: 'músico',
      instruction: (en, pt) => `Coloca a ${en} no músico. Onde vai a ${pt}?`,
      completeText: 'O músico está pronto para o concerto!',
      completeEmoji: '🎵',
    },

    color: {
      title: 'Pinta o Instrumento',
      completeText: 'Pintaste todos os instrumentos!',
      instruction: (name, colors) => `Pinta o ${name}. Escolhe as cores: ${colors}.`,
      items: [
        { name: 'Piano', detail: 'Clássico', colors: ['black', 'white'] },
        { name: 'Guitarra', detail: 'Rock', colors: ['red', 'orange'] },
        { name: 'Tambor', detail: 'Percussão', colors: ['red', 'yellow'] },
        { name: 'Flauta', detail: 'Clássico', colors: ['white', 'blue'] },
        { name: 'Saxofone', detail: 'Jazz', colors: ['yellow', 'orange'] },
        { name: 'Violino', detail: 'Clássico', colors: ['orange', 'red'] },
        { name: 'Trompete', detail: 'Jazz', colors: ['yellow', 'white'] },
        { name: 'Ukulele', detail: 'Tropical', colors: ['green', 'yellow'] },
        { name: 'Bateria', detail: 'Percussão', colors: ['red', 'black'] },
        { name: 'Harpa', detail: 'Clássico', colors: ['yellow', 'brown'] },
        { name: 'Acordeão', detail: 'Folk', colors: ['red', 'white'] },
        { name: 'Tuba', detail: 'Clássico', colors: ['yellow', 'white'] },
        { name: 'Banjo', detail: 'Country', colors: ['brown', 'white'] },
        { name: 'Maracas', detail: 'Latina', colors: ['red', 'green'] },
      ],
    },

    read: {
      title: 'Lê a Pontuação',
      completeText: 'Leste todas as pontuações!',
      boardColor: '#6A1B9A',
      items: [
        { home: 'Piano', away: 'Guitar', homeScore: 3, awayScore: 1 },
        { home: 'Drums', away: 'Violin', homeScore: 2, awayScore: 2 },
        { home: 'Flute', away: 'Trumpet', homeScore: 0, awayScore: 1 },
        { home: 'Saxophone', away: 'Clarinet', homeScore: 4, awayScore: 0 },
        { home: 'Piano', away: 'Drums', homeScore: 2, awayScore: 1 },
        { home: 'Guitar', away: 'Bass', homeScore: 1, awayScore: 3 },
        { home: 'Harp', away: 'Cello', homeScore: 5, awayScore: 2 },
        { home: 'Accordion', away: 'Banjo', homeScore: 1, awayScore: 4 },
        { home: 'Tuba', away: 'Trombone', homeScore: 3, awayScore: 3 },
        { home: 'Maracas', away: 'Bongos', homeScore: 0, awayScore: 2 },
        { home: 'Ukulele', away: 'Mandolin', homeScore: 6, awayScore: 1 },
        { home: 'Violin', away: 'Flute', homeScore: 2, awayScore: 0 },
      ],
    },

    routine: {
      title: 'Rotina do Músico',
      step8: { text: 'Aulas da tarde / Aula de Música', emoji: '🎵' },
    },
  },
}

/**
 * Get content for a specific universe.
 * Falls back to football if universe not found.
 */
export function getContent(universeId) {
  return CONTENT[universeId] || CONTENT.football
}
