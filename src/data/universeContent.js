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
        `O ${pick(['Benfica', 'Porto', 'Sporting'])} marcou ${a} golos na primeira parte e ${b} na segunda.`,
      subContext: (a, b) =>
        `A equipa tinha ${a} pontos e perdeu ${b}. Quantos ficaram?`,
      mulContext: (a, b) =>
        `Sao ${a} jogos e cada jogo vale ${b} pontos.`,
    },

    emotions: [
      {
        situation: 'O arbitro da-te um cartao amarelo injusto.',
        emoji: '🟨',
        emotions: [
          { name: 'Zangado', emoji: '😠', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Respira fundo 3 vezes. Fala com calma com o treinador. Nao e preciso gritar.',
      },
      {
        situation: 'Marcas o golo da vitoria no ultimo minuto!',
        emoji: '⚽',
        emotions: [
          { name: 'Alegre', emoji: '😄', correct: true },
          { name: 'Triste', emoji: '😢', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Celebra com a equipa! Abraca os teus colegas. Partilha a alegria!',
      },
      {
        situation: 'Falhas um penalti importante.',
        emoji: '😞',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Surpreso', emoji: '😲', correct: false },
        ],
        strategy: 'Todos falham penaltis, ate o Ronaldo! Levanta a cabeca, respira e pensa no proximo.',
      },
      {
        situation: 'Vais jogar no estadio pela primeira vez.',
        emoji: '🏟️',
        emotions: [
          { name: 'Nervoso', emoji: '😰', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'E normal sentir nervos! Respira devagar, concentra-te no jogo e diverte-te.',
      },
      {
        situation: 'O teu melhor amigo da equipa vai mudar de clube.',
        emoji: '👋',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Com fome', emoji: '🤤', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'E normal ficar triste. Podes continuar a ser amigo! Combina encontros e fala com ele.',
      },
      {
        situation: 'Ganhas um trofeu no final do torneio.',
        emoji: '🏆',
        emotions: [
          { name: 'Orgulhoso', emoji: '🥹', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Sente orgulho do teu trabalho! Agradece ao treinador e aos colegas.',
      },
      {
        situation: 'O treinador escolhe-te como capitao da equipa.',
        emoji: '©️',
        emotions: [
          { name: 'Surpreso', emoji: '😲', correct: true },
          { name: 'Triste', emoji: '😢', correct: false },
          { name: 'Zangado', emoji: '😠', correct: false },
        ],
        strategy: 'Que surpresa boa! Agradece ao treinador e da o teu melhor para liderar a equipa.',
      },
      {
        situation: 'Lesionas-te durante o treino e tens de parar.',
        emoji: '🤕',
        emotions: [
          { name: 'Frustrado', emoji: '😤', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'E dificil parar, mas o corpo precisa de descanso. Segue os conselhos do medico e volta mais forte!',
      },
      {
        situation: 'Um colega faz troça de ti por teres falhado um passe.',
        emoji: '😣',
        emotions: [
          { name: 'Envergonhado', emoji: '😳', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Ninguem joga sempre bem. Ignora os comentarios maldosos e continua a esforcar-te.',
      },
      {
        situation: 'A tua equipa empata um jogo que estava a perder no ultimo minuto!',
        emoji: '⏱️',
        emotions: [
          { name: 'Aliviado', emoji: '😮‍💨', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'Que alivio! Nunca se deve desistir. Celebra o esforco de toda a equipa.',
      },
    ],

    fairPlay: [
      {
        situation: 'Um colega marca um golo contra a tua equipa. O que fazes?',
        emoji: '⚽',
        options: [
          { text: 'Dou-lhe os parabens e continuo a jogar', correct: true },
          { text: 'Fico zangado e nao falo com ele', correct: false },
          { text: 'Saio do jogo', correct: false },
        ],
        lesson: 'No fair play, felicitamos o adversario. Um bom jogador sabe perder com dignidade!',
      },
      {
        situation: 'O treinador poe-te no banco. Como reages?',
        emoji: '🪑',
        options: [
          { text: 'Espero a minha vez e apoio a equipa', correct: true },
          { text: 'Reclamo e grito com o treinador', correct: false },
          { text: 'Vou-me embora', correct: false },
        ],
        lesson: 'Todos os jogadores passam pelo banco. E um momento para observar e aprender!',
      },
      {
        situation: 'Um colega novo chega a equipa e nao conhece ninguem. O que fazes?',
        emoji: '👋',
        options: [
          { text: 'Apresento-me e convido-o para brincar', correct: true },
          { text: 'Ignoro-o', correct: false },
          { text: 'Gozar com ele porque nao sabe jogar', correct: false },
        ],
        lesson: 'Receber bem os novos colegas e uma qualidade de um grande capitao de equipa!',
      },
      {
        situation: 'A tua equipa ganha o jogo. Como celebras?',
        emoji: '🎉',
        options: [
          { text: 'Celebro com a equipa e cumprimento os adversarios', correct: true },
          { text: 'Gozar com a equipa que perdeu', correct: false },
          { text: 'Celebrar sozinho e gabar-me', correct: false },
        ],
        lesson: 'Os melhores jogadores do mundo celebram com a equipa e respeitam os adversarios!',
      },
      {
        situation: 'Nao entendes uma regra do jogo. O que fazes?',
        emoji: '❓',
        options: [
          { text: 'Pergunto ao treinador ou professor', correct: true },
          { text: 'Finjo que sei e continuo', correct: false },
          { text: 'Fico calado e nao jogo mais', correct: false },
        ],
        lesson: 'Pedir ajuda e corajoso! Ate os jogadores profissionais pedem ajuda ao treinador.',
      },
      {
        situation: 'Um colega esta triste porque perdeu o jogo. O que fazes?',
        emoji: '😢',
        options: [
          { text: 'Digo-lhe que jogou bem e que da proxima vez sera melhor', correct: true },
          { text: 'Rio-me dele', correct: false },
          { text: 'Nao faco nada, nao e comigo', correct: false },
        ],
        lesson: 'Apoiar os colegas quando estao tristes mostra que es um verdadeiro amigo e jogador de equipa!',
      },
      {
        situation: 'Um jogador adversario cai no chao durante uma jogada. O que fazes?',
        emoji: '🤝',
        options: [
          { text: 'Paro o jogo e ajudo-o a levantar-se', correct: true },
          { text: 'Continuo a jogar e ignoro-o', correct: false },
          { text: 'Rio-me porque caiu', correct: false },
        ],
        lesson: 'Ajudar um adversario mostra verdadeiro espirito desportivo. O respeito esta acima do resultado!',
      },
      {
        situation: 'A bola sai mas o arbitro nao viu. So tu sabes que foi a tua equipa a tocar por ultimo. O que fazes?',
        emoji: '⚖️',
        options: [
          { text: 'Digo a verdade ao arbitro', correct: true },
          { text: 'Fico calado e aproveito', correct: false },
          { text: 'Culpo o adversario', correct: false },
        ],
        lesson: 'Ser honesto e mais importante do que ganhar. O fair play comeca com a verdade!',
      },
      {
        situation: 'Es o melhor marcador da equipa mas um colega nunca marca. O que fazes?',
        emoji: '🤜',
        options: [
          { text: 'Passo-lhe a bola para ele marcar tambem', correct: true },
          { text: 'Continuo a marcar sempre eu', correct: false },
          { text: 'Digo-lhe que nao sabe jogar', correct: false },
        ],
        lesson: 'Partilhar oportunidades faz toda a equipa crescer. Um bom jogador faz os outros melhores!',
      },
      {
        situation: 'A tua equipa perde um jogo importante. O adversario vem cumprimentar-te. O que fazes?',
        emoji: '🫱',
        options: [
          { text: 'Cumprimento-o e dou-lhe os parabens', correct: true },
          { text: 'Recuso-me a cumprimentar', correct: false },
          { text: 'Vou embora sem falar com ninguem', correct: false },
        ],
        lesson: 'Saber perder com dignidade e tao importante como saber ganhar. Os grandes campeoes respeitam sempre!',
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
      ],
    },

    dress: {
      title: 'Veste o Jogador',
      character: 'jogador',
      instruction: (en, pt) => `Coloca a ${en} no jogador. Onde vai a ${pt}?`,
      completeText: 'O jogador esta pronto para o jogo!',
      completeEmoji: '⚽',
    },

    color: {
      title: 'Pinta o Equipamento',
      completeText: 'Pintaste todos os equipamentos!',
      instruction: (name, colors) => `Pinta o equipamento do ${name}. Escolhe as cores: ${colors}.`,
      items: [
        { name: 'Benfica', detail: 'Portugal', colors: ['red', 'white'] },
        { name: 'Sporting', detail: 'Portugal', colors: ['green', 'white'] },
        { name: 'FC Porto', detail: 'Portugal', colors: ['blue', 'white'] },
        { name: 'Liverpool', detail: 'England', colors: ['red'] },
        { name: 'Real Madrid', detail: 'Spain', colors: ['white'] },
        { name: 'Barcelona', detail: 'Spain', colors: ['red', 'blue'] },
        { name: 'Brasil', detail: 'Brazil', colors: ['yellow', 'green'] },
        { name: 'Portugal', detail: 'Portugal', colors: ['red', 'green'] },
      ],
    },

    read: {
      title: 'Le o Resultado',
      completeText: 'Leste todos os resultados!',
      boardColor: '#1B5E20',
      items: [
        { home: 'Portugal', away: 'France', homeScore: 3, awayScore: 1 },
        { home: 'Brazil', away: 'Germany', homeScore: 2, awayScore: 2 },
        { home: 'England', away: 'Spain', homeScore: 0, awayScore: 1 },
        { home: 'Argentina', away: 'Italy', homeScore: 4, awayScore: 0 },
        { home: 'Benfica', away: 'Porto', homeScore: 2, awayScore: 1 },
        { home: 'Sporting', away: 'Benfica', homeScore: 1, awayScore: 3 },
      ],
    },

    routine: {
      title: 'Rotina do Campeao',
      step8: { text: 'Aulas da tarde / Treino', emoji: '⚽' },
    },
  },

  // ==================== DINOSAURS ====================
  dinosaurs: {
    math: {
      title: 'Fosseis e Contas',
      icon: '🦕',
      addContext: (a, b) =>
        `O explorador encontrou ${a} fosseis de manha e ${b} a tarde.`,
      subContext: (a, b) =>
        `A manada tinha ${a} dinossauros e ${b} migraram. Quantos ficaram?`,
      mulContext: (a, b) =>
        `Sao ${a} escavacoes e cada uma tem ${b} fosseis.`,
    },

    emotions: [
      {
        situation: 'O guia do museu culpa-te por tocar numa peca, mas nao foste tu.',
        emoji: '🦕',
        emotions: [
          { name: 'Zangado', emoji: '😠', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Respira fundo. Explica com calma o que aconteceu. Pede a alguem que confirme.',
      },
      {
        situation: 'Descobres um fossil raro durante uma escavacao!',
        emoji: '💎',
        emotions: [
          { name: 'Alegre', emoji: '😄', correct: true },
          { name: 'Triste', emoji: '😢', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Celebra com o grupo! Mostra a descoberta e partilha a alegria com todos.',
      },
      {
        situation: 'O teu dinossauro favorito nao esta na exposicao do museu.',
        emoji: '😞',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Surpreso', emoji: '😲', correct: false },
        ],
        strategy: 'Fica triste um pouco, mas procura outros dinossauros interessantes. Ha sempre coisas novas para descobrir!',
      },
      {
        situation: 'Vais entrar numa caverna escura pela primeira vez.',
        emoji: '🕳️',
        emotions: [
          { name: 'Nervoso', emoji: '😰', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'E normal ter medo do escuro! Leva uma lanterna, fica perto do grupo e respira devagar.',
      },
      {
        situation: 'O teu melhor amigo muda de grupo de exploracao.',
        emoji: '👋',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Com fome', emoji: '🤤', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'E normal ficar triste. Podes continuar a ser amigo! Combina encontros para explorar juntos.',
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
        strategy: 'Que descoberta incrivel! Chama o guia e partilha a novidade com o grupo.',
      },
      {
        situation: 'O fossil que escavaste durante horas parte-se ao meio.',
        emoji: '💔',
        emotions: [
          { name: 'Frustrado', emoji: '😤', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'E frustrante, mas acontece! Com cola especial e paciencia, muitos fosseis podem ser reparados.',
      },
      {
        situation: 'Outro grupo goza contigo porque ainda nao encontraste nenhum fossil.',
        emoji: '😣',
        emotions: [
          { name: 'Envergonhado', emoji: '😳', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Escavar leva tempo. Os maiores descobridores procuraram durante anos! Continua com calma.',
      },
      {
        situation: 'O museu convida o teu grupo para ver uma exposicao especial antes de abrir ao publico.',
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
        situation: 'Um colega encontra um fossil raro antes de ti. O que fazes?',
        emoji: '💎',
        options: [
          { text: 'Dou-lhe os parabens pela descoberta', correct: true },
          { text: 'Fico zangado e digo que era meu', correct: false },
          { text: 'Deixo de procurar', correct: false },
        ],
        lesson: 'Celebrar as descobertas dos outros mostra que es um verdadeiro explorador de equipa!',
      },
      {
        situation: 'O guia nao te escolhe para a primeira escavacao. Como reages?',
        emoji: '⛏️',
        options: [
          { text: 'Espero a minha vez e observo', correct: true },
          { text: 'Reclamo e grito com o guia', correct: false },
          { text: 'Vou-me embora da escavacao', correct: false },
        ],
        lesson: 'Saber esperar faz parte de ser explorador. Observar os outros tambem nos ensina!',
      },
      {
        situation: 'Um colega novo chega ao grupo e nao sabe nada de fosseis. O que fazes?',
        emoji: '👋',
        options: [
          { text: 'Apresento-me e ensino-lhe o basico', correct: true },
          { text: 'Ignoro-o', correct: false },
          { text: 'Gozar porque nao sabe nada', correct: false },
        ],
        lesson: 'Ajudar os novos colegas e a marca de um grande explorador!',
      },
      {
        situation: 'O teu grupo descobre o melhor fossil. Como celebras?',
        emoji: '🎉',
        options: [
          { text: 'Celebro com o grupo e mostro aos outros', correct: true },
          { text: 'Gozar com os outros grupos', correct: false },
          { text: 'Digo que fui eu sozinho', correct: false },
        ],
        lesson: 'As grandes descobertas sao feitas em equipa. Partilhar o sucesso e o mais importante!',
      },
      {
        situation: 'Nao entendes como funciona uma ferramenta de escavacao. O que fazes?',
        emoji: '❓',
        options: [
          { text: 'Pergunto ao guia como funciona', correct: true },
          { text: 'Finjo que sei usar', correct: false },
          { text: 'Nao toco em nada', correct: false },
        ],
        lesson: 'Pedir ajuda e a melhor forma de aprender. Os melhores cientistas fazem muitas perguntas!',
      },
      {
        situation: 'Um colega esta triste porque partiu o fossil dele. O que fazes?',
        emoji: '😢',
        options: [
          { text: 'Consolo-o e ajudo a colar as pecas', correct: true },
          { text: 'Rio-me dele', correct: false },
          { text: 'Nao faco nada', correct: false },
        ],
        lesson: 'Apoiar os amigos nos momentos dificeis mostra que es um verdadeiro companheiro de aventura!',
      },
      {
        situation: 'Encontras um fossil mas um colega diz que o viu primeiro. O que fazes?',
        emoji: '🦴',
        options: [
          { text: 'Partilho a descoberta e trabalhamos juntos', correct: true },
          { text: 'Digo que e so meu e escondo-o', correct: false },
          { text: 'Atiro o fossil para longe', correct: false },
        ],
        lesson: 'Partilhar descobertas e o espirito da ciencia. Os grandes cientistas trabalham em equipa!',
      },
      {
        situation: 'O guia pede-te para deixar um colega mais novo escavar primeiro. O que fazes?',
        emoji: '⛏️',
        options: [
          { text: 'Deixo-o ir primeiro e ajudo-o se precisar', correct: true },
          { text: 'Recuso e digo que sou mais experiente', correct: false },
          { text: 'Fico zangado e vou embora', correct: false },
        ],
        lesson: 'Dar a vez aos mais novos mostra maturidade. Um dia tambem te ajudaram a comecar!',
      },
      {
        situation: 'Um colega estraga a tua escavacao sem querer. O que fazes?',
        emoji: '😬',
        options: [
          { text: 'Aceito o pedido de desculpa e recomecamos juntos', correct: true },
          { text: 'Grito com ele e culpo-o', correct: false },
          { text: 'Estrago a escavacao dele tambem', correct: false },
        ],
        lesson: 'Acidentes acontecem. Perdoar e recomecar mostra que es um verdadeiro explorador!',
      },
      {
        situation: 'O teu grupo tem de escolher que sala do museu visitar e tu nao concordas com a escolha. O que fazes?',
        emoji: '🏛️',
        options: [
          { text: 'Aceito a decisao do grupo e aproveito a visita', correct: true },
          { text: 'Reclamo e insisto na minha escolha', correct: false },
          { text: 'Separo-me do grupo e vou sozinho', correct: false },
        ],
        lesson: 'Respeitar as decisoes do grupo faz parte de trabalhar em equipa. Podes sugerir a tua sala para a proxima vez!',
      },
    ],

    division: [
      { total: 12, groups: 2, context: '12 exploradores divididos em 2 grupos de escavacao.' },
      { total: 10, groups: 5, context: '10 pinceis para 5 escavadores.' },
      { total: 15, groups: 3, context: '15 garrafas de agua para 3 grupos.' },
      { total: 8, groups: 2, context: '8 capacetes para 2 equipas de escavacao.' },
      { total: 20, groups: 4, context: '20 amostras de rocha para 4 caixas.' },
      { total: 6, groups: 3, context: '6 lupas para 3 pares de exploradores.' },
      { total: 16, groups: 4, context: '16 marcadores para 4 zonas de escavacao.' },
      { total: 9, groups: 3, context: '9 exploradores divididos em 3 mini-equipas.' },
      { total: 18, groups: 6, context: '18 fosseis para guardar em 6 vitrinas do museu.' },
      { total: 24, groups: 4, context: '24 pinceis de escavacao para 4 mesas de trabalho.' },
      { total: 14, groups: 7, context: '14 amostras de terra para 7 tubos de ensaio.' },
      { total: 21, groups: 3, context: '21 livros de dinossauros para 3 prateleiras da biblioteca.' },
    ],

    shop: {
      title: 'Loja do Museu',
      items: [
        { name: 'Bilhete', emoji: '🎫', price: 50 },
        { name: 'Miniatura T-Rex', emoji: '🦕', price: 30 },
        { name: 'Livro de Fosseis', emoji: '📖', price: 100 },
        { name: 'Agua', emoji: '💧', price: 10 },
        { name: 'Kit Escavacao', emoji: '🔨', price: 20 },
        { name: 'Chapeu Explorador', emoji: '🧢', price: 40 },
      ],
    },

    dress: {
      title: 'Veste o Explorador',
      character: 'explorador',
      instruction: (en, pt) => `Coloca a ${en} no explorador. Onde vai a ${pt}?`,
      completeText: 'O explorador esta pronto para a aventura!',
      completeEmoji: '🦕',
    },

    color: {
      title: 'Pinta o Dinossauro',
      completeText: 'Pintaste todos os dinossauros!',
      instruction: (name, colors) => `Pinta o ${name}. Escolhe as cores: ${colors}.`,
      items: [
        { name: 'T-Rex', detail: 'Jurassico', colors: ['green', 'yellow'] },
        { name: 'Triceratops', detail: 'Cretaceo', colors: ['blue', 'white'] },
        { name: 'Raptor', detail: 'Jurassico', colors: ['red', 'orange'] },
        { name: 'Stegosaurus', detail: 'Jurassico', colors: ['green', 'orange'] },
        { name: 'Pterodactyl', detail: 'Cretaceo', colors: ['blue', 'yellow'] },
        { name: 'Diplodocus', detail: 'Jurassico', colors: ['green', 'white'] },
        { name: 'Ankylosaurus', detail: 'Cretaceo', colors: ['yellow', 'black'] },
        { name: 'Spinosaurus', detail: 'Cretaceo', colors: ['red', 'green'] },
      ],
    },

    read: {
      title: 'Le a Contagem',
      completeText: 'Leste todas as contagens!',
      boardColor: '#5D4037',
      items: [
        { home: 'T-Rex', away: 'Raptor', homeScore: 3, awayScore: 1 },
        { home: 'Triceratops', away: 'Stegosaurus', homeScore: 2, awayScore: 2 },
        { home: 'Pterodactyl', away: 'Diplodocus', homeScore: 0, awayScore: 1 },
        { home: 'Ankylosaurus', away: 'Spinosaurus', homeScore: 4, awayScore: 0 },
        { home: 'T-Rex', away: 'Triceratops', homeScore: 2, awayScore: 1 },
        { home: 'Raptor', away: 'Diplodocus', homeScore: 1, awayScore: 3 },
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
      title: 'Missoes e Contas',
      icon: '🚀',
      addContext: (a, b) =>
        `A nave recolheu ${a} estrelas de manha e ${b} a tarde.`,
      subContext: (a, b) =>
        `A estacao tinha ${a} astronautas e ${b} regressaram a Terra. Quantos ficaram?`,
      mulContext: (a, b) =>
        `Sao ${a} missoes e cada missao explora ${b} planetas.`,
    },

    emotions: [
      {
        situation: 'O comandante nao te deixa pilotar a nave hoje.',
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
        strategy: 'Celebra com a tripulacao! Partilha a descoberta com a base na Terra.',
      },
      {
        situation: 'A nave perde contacto com a Terra por um momento.',
        emoji: '📡',
        emotions: [
          { name: 'Nervoso', emoji: '😰', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'E normal ficar nervoso. Segue o procedimento, verifica os sistemas e espera com calma.',
      },
      {
        situation: 'O teu companheiro de missao e transferido para outra estacao.',
        emoji: '👋',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Com fome', emoji: '🤤', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'E normal ficar triste. Podem comunicar por radio! A amizade nao tem distancia.',
      },
      {
        situation: 'Uma missao que estavas a esperar foi cancelada.',
        emoji: '❌',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Surpreso', emoji: '😲', correct: false },
        ],
        strategy: 'As vezes as missoes sao adiadas. Aproveita para te preparar melhor para a proxima!',
      },
      {
        situation: 'Recebes uma medalha por completar a missao com sucesso!',
        emoji: '🏅',
        emotions: [
          { name: 'Orgulhoso', emoji: '🥹', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Sente orgulho! Agradece ao comandante e a tripulacao que te ajudou.',
      },
      {
        situation: 'Avistas uma estrela cadente pela janela da estacao espacial!',
        emoji: '🌠',
        emotions: [
          { name: 'Entusiasmado', emoji: '🤩', correct: true },
          { name: 'Triste', emoji: '😢', correct: false },
          { name: 'Zangado', emoji: '😠', correct: false },
        ],
        strategy: 'Que momento magico! Regista no diario de bordo e partilha com a tripulacao.',
      },
      {
        situation: 'O teu fato espacial avaria e nao podes sair da nave.',
        emoji: '🧑‍🚀',
        emotions: [
          { name: 'Frustrado', emoji: '😤', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'E frustrante, mas a seguranca e primeiro! Pede ajuda ao tecnico e espera com paciencia.',
      },
      {
        situation: 'Um colega diz que a tua experiencia cientifica nao vai funcionar.',
        emoji: '🔬',
        emotions: [
          { name: 'Envergonhado', emoji: '😳', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Nao fiques triste. Todos os cientistas erram. Tenta outra vez e aprende com os erros!',
      },
      {
        situation: 'Depois de meses no espaco, finalmente ves a Terra pela janela ao regressar!',
        emoji: '🌍',
        emotions: [
          { name: 'Aliviado', emoji: '😮‍💨', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'Que alivio enorme! Regressar a casa e sempre especial. Celebra com a tripulacao.',
      },
    ],

    fairPlay: [
      {
        situation: 'Um colega completa a missao antes de ti. O que fazes?',
        emoji: '🚀',
        options: [
          { text: 'Dou-lhe os parabens pela missao cumprida', correct: true },
          { text: 'Fico zangado e digo que devia ser eu', correct: false },
          { text: 'Desisto das missoes', correct: false },
        ],
        lesson: 'Na equipa espacial, o sucesso de um e o sucesso de todos!',
      },
      {
        situation: 'O comandante poe-te a limpar a estacao em vez de explorar. Como reages?',
        emoji: '🧹',
        options: [
          { text: 'Faco a minha tarefa e espero a proxima missao', correct: true },
          { text: 'Reclamo e grito com o comandante', correct: false },
          { text: 'Recuso-me a fazer', correct: false },
        ],
        lesson: 'Todas as tarefas sao importantes na estacao. Ate limpar ajuda a equipa!',
      },
      {
        situation: 'Um astronauta novo chega e nao sabe usar o fato espacial. O que fazes?',
        emoji: '🧑‍🚀',
        options: [
          { text: 'Ajudo-o a vestir o fato e explico como funciona', correct: true },
          { text: 'Ignoro-o', correct: false },
          { text: 'Rio-me porque nao sabe', correct: false },
        ],
        lesson: 'Ajudar os novos tripulantes e essencial. No espaco, dependemos uns dos outros!',
      },
      {
        situation: 'A tua equipa completa uma missao dificil. Como celebras?',
        emoji: '🎉',
        options: [
          { text: 'Celebro com a tripulacao e partilho o merito', correct: true },
          { text: 'Digo que fiz tudo sozinho', correct: false },
          { text: 'Ignoro os outros', correct: false },
        ],
        lesson: 'No espaco, ninguem faz nada sozinho. O trabalho de equipa e a chave do sucesso!',
      },
      {
        situation: 'Nao entendes os controlos da nave. O que fazes?',
        emoji: '❓',
        options: [
          { text: 'Pergunto ao comandante como funcionam', correct: true },
          { text: 'Carrego em todos os botoes', correct: false },
          { text: 'Nao toco em nada e fico parado', correct: false },
        ],
        lesson: 'Perguntar e a forma mais segura de aprender. No espaco, erros podem ser perigosos!',
      },
      {
        situation: 'Um colega esta preocupado antes de uma missao dificil. O que fazes?',
        emoji: '😟',
        options: [
          { text: 'Encorajo-o e digo que estamos juntos nisto', correct: true },
          { text: 'Digo-lhe que e fraco', correct: false },
          { text: 'Nao faco nada', correct: false },
        ],
        lesson: 'Encorajar os colegas faz toda a equipa mais forte e confiante!',
      },
      {
        situation: 'Reparas que um colega cometeu um erro nos calculos da missao, mas ninguem viu. O que fazes?',
        emoji: '🔢',
        options: [
          { text: 'Aviso-o em privado para corrigir o erro', correct: true },
          { text: 'Fico calado para ele ter problemas', correct: false },
          { text: 'Digo a todos que ele errou', correct: false },
        ],
        lesson: 'Corrigir erros em privado mostra respeito. No espaco, um pequeno erro pode ser muito grave!',
      },
      {
        situation: 'Ha so um lugar para ver a chuva de meteoritos pela janela da estacao. O que fazes?',
        emoji: '☄️',
        options: [
          { text: 'Revezamo-nos para todos verem', correct: true },
          { text: 'Fico eu no melhor lugar o tempo todo', correct: false },
          { text: 'Empurro os outros para ficar a frente', correct: false },
        ],
        lesson: 'Partilhar as experiencias especiais torna-as ainda melhores. A tripulacao e uma familia!',
      },
      {
        situation: 'A tua experiencia cientifica correu melhor do que a de um colega. O que fazes?',
        emoji: '🧪',
        options: [
          { text: 'Ajudo-o a perceber o que correu mal na dele', correct: true },
          { text: 'Gabei-me do meu resultado', correct: false },
          { text: 'Digo que a experiencia dele nao presta', correct: false },
        ],
        lesson: 'Ajudar os colegas a melhorar e o que fazem os verdadeiros cientistas. A ciencia e colaboracao!',
      },
      {
        situation: 'O comandante pede voluntarios para uma tarefa dificil e perigosa. O que fazes?',
        emoji: '🛡️',
        options: [
          { text: 'Ofereco-me e trabalho em equipa para a cumprir', correct: true },
          { text: 'Escondo-me para nao ser escolhido', correct: false },
          { text: 'Digo que os outros devem ir', correct: false },
        ],
        lesson: 'A coragem de se voluntariar mostra espirito de equipa. No espaco, todos contam uns com os outros!',
      },
    ],

    division: [
      { total: 12, groups: 2, context: '12 astronautas divididos em 2 equipas de missao.' },
      { total: 10, groups: 5, context: '10 tanques de oxigenio para 5 astronautas.' },
      { total: 15, groups: 3, context: '15 racoes de comida para 3 dias de missao.' },
      { total: 8, groups: 2, context: '8 fatos espaciais para 2 equipas.' },
      { total: 20, groups: 4, context: '20 amostras de rocha lunar para 4 laboratorios.' },
      { total: 6, groups: 3, context: '6 tablets para 3 pares de astronautas.' },
      { total: 16, groups: 4, context: '16 sensores para 4 estacoes de monitorizacao.' },
      { total: 9, groups: 3, context: '9 astronautas divididos em 3 mini-equipas.' },
      { total: 18, groups: 6, context: '18 paineis solares para 6 modulos da estacao.' },
      { total: 24, groups: 4, context: '24 racoes espaciais para 4 semanas de missao.' },
      { total: 14, groups: 7, context: '14 ferramentas para 7 astronautas na caminhada espacial.' },
      { total: 21, groups: 3, context: '21 amostras de solo marciano para 3 laboratorios.' },
    ],

    shop: {
      title: 'Loja da Estacao',
      items: [
        { name: 'Bilhete Espacial', emoji: '🎫', price: 50 },
        { name: 'Miniatura Foguetao', emoji: '🚀', price: 30 },
        { name: 'Fato Astronauta', emoji: '🧑‍🚀', price: 100 },
        { name: 'Agua Espacial', emoji: '💧', price: 10 },
        { name: 'Mapa Estelar', emoji: '🗺️', price: 20 },
        { name: 'Capacete Espacial', emoji: '⛑️', price: 40 },
      ],
    },

    dress: {
      title: 'Veste o Astronauta',
      character: 'astronauta',
      instruction: (en, pt) => `Coloca a ${en} no astronauta. Onde vai a ${pt}?`,
      completeText: 'O astronauta esta pronto para a missao!',
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
      ],
    },

    read: {
      title: 'Le a Missao',
      completeText: 'Leste todas as missoes!',
      boardColor: '#1A237E',
      items: [
        { home: 'Mars', away: 'Jupiter', homeScore: 3, awayScore: 1 },
        { home: 'Earth', away: 'Saturn', homeScore: 2, awayScore: 2 },
        { home: 'Venus', away: 'Mercury', homeScore: 0, awayScore: 1 },
        { home: 'Neptune', away: 'Pluto', homeScore: 4, awayScore: 0 },
        { home: 'Mars', away: 'Earth', homeScore: 2, awayScore: 1 },
        { home: 'Jupiter', away: 'Saturn', homeScore: 1, awayScore: 3 },
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
        `O veterinario tratou ${a} animais de manha e ${b} a tarde.`,
      subContext: (a, b) =>
        `O jardim zoologico tinha ${a} leoes e ${b} foram transferidos. Quantos ficaram?`,
      mulContext: (a, b) =>
        `Sao ${a} jaulas e cada jaula tem ${b} animais.`,
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
        strategy: 'Celebra com os colegas! Um novo animal e uma grande alegria para todos.',
      },
      {
        situation: 'O teu animal favorito esta doente.',
        emoji: '🤒',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Surpreso', emoji: '😲', correct: false },
        ],
        strategy: 'E normal ficar triste. O veterinario vai cuidar dele. Podes visitá-lo e dar-lhe carinho.',
      },
      {
        situation: 'Vais entrar na jaula do leao pela primeira vez (em seguranca).',
        emoji: '🦁',
        emotions: [
          { name: 'Nervoso', emoji: '😰', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'E normal ter nervos! Segue as instrucoes do tratador e mantem-te calmo.',
      },
      {
        situation: 'O animal que cuidaste vai ser transferido para outra reserva.',
        emoji: '👋',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Com fome', emoji: '🤤', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'E normal sentir saudades. Na nova reserva ele vai estar bem e feliz!',
      },
      {
        situation: 'Salvas um animal ferido e ele recupera totalmente!',
        emoji: '🏆',
        emotions: [
          { name: 'Orgulhoso', emoji: '🥹', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Sente orgulho! Cuidar dos animais e uma das coisas mais bonitas que se pode fazer.',
      },
      {
        situation: 'O veterinario pede-te para cuidar de um animal que te assusta um pouco.',
        emoji: '🐍',
        emotions: [
          { name: 'Nervoso', emoji: '😰', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Aborrecido', emoji: '😐', correct: false },
        ],
        strategy: 'E normal ter receio! Pede ao veterinario que te ensine como lidar com ele. Aos poucos o medo passa.',
      },
      {
        situation: 'Um colega goza contigo porque gostas de cuidar de insectos.',
        emoji: '🐛',
        emotions: [
          { name: 'Envergonhado', emoji: '😳', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Todos os animais sao importantes, ate os mais pequenos! Nao tenhas vergonha do que gostas.',
      },
      {
        situation: 'O passaro que cuidaste desde bebe finalmente aprende a voar!',
        emoji: '🕊️',
        emotions: [
          { name: 'Entusiasmado', emoji: '🤩', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Triste', emoji: '😢', correct: false },
        ],
        strategy: 'Que momento especial! Celebra e partilha a novidade com os colegas. O teu cuidado fez a diferenca!',
      },
      {
        situation: 'Chegas a reserva e descobres que o teu animal preferido fugiu durante a noite.',
        emoji: '🔍',
        emotions: [
          { name: 'Preocupado', emoji: '😟', correct: true },
          { name: 'Divertido', emoji: '🤣', correct: false },
          { name: 'Com fome', emoji: '🤤', correct: false },
        ],
        strategy: 'E normal ficar preocupado. Avisa o tratador e ajuda nas buscas. Com calma, vao encontra-lo!',
      },
    ],

    fairPlay: [
      {
        situation: 'Um colega encontra um animal raro primeiro. O que fazes?',
        emoji: '🦜',
        options: [
          { text: 'Dou-lhe os parabens pela descoberta', correct: true },
          { text: 'Fico zangado e digo que vi primeiro', correct: false },
          { text: 'Deixo de procurar', correct: false },
        ],
        lesson: 'Celebrar as descobertas dos colegas mostra que es um verdadeiro amigo dos animais!',
      },
      {
        situation: 'O veterinario poe-te a limpar as jaulas em vez de brincar com os animais. Como reages?',
        emoji: '🧹',
        options: [
          { text: 'Faco a minha parte para manter tudo limpo', correct: true },
          { text: 'Reclamo e nao faco nada', correct: false },
          { text: 'Vou-me embora', correct: false },
        ],
        lesson: 'Limpar as jaulas e cuidar dos animais. E tao importante como brincar com eles!',
      },
      {
        situation: 'Um colega novo chega e tem medo dos animais. O que fazes?',
        emoji: '😟',
        options: [
          { text: 'Ajudo-o com paciencia a conhecer os animais', correct: true },
          { text: 'Ignoro-o', correct: false },
          { text: 'Rio-me porque tem medo', correct: false },
        ],
        lesson: 'Ter medo e normal. Ajudar os outros a superar os medos e uma grande qualidade!',
      },
      {
        situation: 'O teu grupo salva um animal em perigo. Como celebras?',
        emoji: '🎉',
        options: [
          { text: 'Celebro com todos e partilho a alegria', correct: true },
          { text: 'Digo que fiz tudo sozinho', correct: false },
          { text: 'Nao ligo nenhuma', correct: false },
        ],
        lesson: 'Salvar animais e um trabalho de equipa. Todos contribuem!',
      },
      {
        situation: 'Nao sabes como alimentar um animal. O que fazes?',
        emoji: '❓',
        options: [
          { text: 'Pergunto ao veterinario como se faz', correct: true },
          { text: 'Dou-lhe a minha comida', correct: false },
          { text: 'Nao faco nada', correct: false },
        ],
        lesson: 'Cada animal tem uma dieta especial. Perguntar e a melhor forma de aprender!',
      },
      {
        situation: 'Um colega esta triste porque o animal dele nao melhorou. O que fazes?',
        emoji: '😢',
        options: [
          { text: 'Consolo-o e digo que o veterinario esta a fazer o melhor', correct: true },
          { text: 'Digo-lhe para nao ser sensivel', correct: false },
          { text: 'Nao faco nada', correct: false },
        ],
        lesson: 'Apoiar os amigos quando estao preocupados com os animais mostra empatia e bondade!',
      },
      {
        situation: 'Ha um so binouculo e dois colegas querem observar os passaros ao mesmo tempo. O que fazes?',
        emoji: '🔭',
        options: [
          { text: 'Sugiro que se revezem e partilhem', correct: true },
          { text: 'Tiro o binoculo e fico eu com ele', correct: false },
          { text: 'Vou-me embora porque nao quero esperar', correct: false },
        ],
        lesson: 'Partilhar os recursos mostra maturidade. Quando esperamos, todos acabam por aproveitar!',
      },
      {
        situation: 'Um colega tem medo de um animal inofensivo e os outros riem-se. O que fazes?',
        emoji: '🐸',
        options: [
          { text: 'Defendo-o e digo que ter medo e normal', correct: true },
          { text: 'Rio-me tambem', correct: false },
          { text: 'Ignoro a situacao', correct: false },
        ],
        lesson: 'Defender quem esta a ser gozado e corajoso. Toda a gente tem medos e isso e normal!',
      },
      {
        situation: 'O tratador pede-te para ensinares a um colega mais novo como dar comida aos coelhos. O que fazes?',
        emoji: '🐇',
        options: [
          { text: 'Ensino-lhe com paciencia e passo a passo', correct: true },
          { text: 'Digo-lhe para aprender sozinho', correct: false },
          { text: 'Faco tudo eu porque sou mais rapido', correct: false },
        ],
        lesson: 'Ensinar os mais novos e uma responsabilidade bonita. Quando ensinamos, tambem aprendemos!',
      },
      {
        situation: 'O teu grupo perde o concurso de melhor projeto sobre animais. O que fazes?',
        emoji: '📋',
        options: [
          { text: 'Dou os parabens ao grupo vencedor e penso no que posso melhorar', correct: true },
          { text: 'Digo que o concurso nao foi justo', correct: false },
          { text: 'Fico zangado e nao falo com ninguem', correct: false },
        ],
        lesson: 'Saber perder com elegancia e aprender com os outros faz-nos crescer. Da proxima vez, sera melhor!',
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
      { total: 14, groups: 7, context: '14 ninhos para 7 pares de passaros.' },
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
      ],
    },

    dress: {
      title: 'Veste o Veterinario',
      character: 'veterinario',
      instruction: (en, pt) => `Coloca a ${en} no veterinario. Onde vai a ${pt}?`,
      completeText: 'O veterinario esta pronto para cuidar dos animais!',
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
      ],
    },

    routine: {
      title: 'Rotina do Veterinario',
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
        `Sao ${a} concertos e cada concerto tem ${b} musicas.`,
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
        strategy: 'Celebra com a banda! Abracam-se todos. A musica une as pessoas!',
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
        strategy: 'E normal ficar triste. Podem continuar a tocar juntos nos fins de semana!',
      },
      {
        situation: 'O teu instrumento parte-se antes do concerto.',
        emoji: '💔',
        emotions: [
          { name: 'Triste', emoji: '😢', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Surpreso', emoji: '😲', correct: false },
        ],
        strategy: 'Pede ajuda ao professor. Talvez alguem tenha um instrumento extra. Nao te preocupes!',
      },
      {
        situation: 'Compoes a tua primeira musica e todos adoram!',
        emoji: '🎼',
        emotions: [
          { name: 'Orgulhoso', emoji: '🥹', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Assustado', emoji: '😨', correct: false },
        ],
        strategy: 'Sente orgulho da tua criacao! Agradece a quem te inspirou e continua a compor.',
      },
      {
        situation: 'O professor escolhe outro colega para o solo em vez de ti.',
        emoji: '🎤',
        emotions: [
          { name: 'Frustrado', emoji: '😤', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Divertido', emoji: '🤣', correct: false },
        ],
        strategy: 'E dificil nao ser escolhido, mas havera mais oportunidades. Continua a praticar e mostra o teu valor!',
      },
      {
        situation: 'Um colega diz que o teu instrumento e estranho e ninguem gosta dele.',
        emoji: '😣',
        emotions: [
          { name: 'Envergonhado', emoji: '😳', correct: true },
          { name: 'Alegre', emoji: '😄', correct: false },
          { name: 'Com sono', emoji: '😴', correct: false },
        ],
        strategy: 'Todos os instrumentos sao especiais! Nao deixes os outros mudar o que gostas. Toca com orgulho!',
      },
      {
        situation: 'O publico aplaude de pe no final do teu concerto!',
        emoji: '👏',
        emotions: [
          { name: 'Entusiasmado', emoji: '🤩', correct: true },
          { name: 'Zangado', emoji: '😠', correct: false },
          { name: 'Triste', emoji: '😢', correct: false },
        ],
        strategy: 'Que momento incrivel! Agradece ao publico com uma venia e celebra com a banda.',
      },
      {
        situation: 'Depois de semanas a ensaiar, o concerto e cancelado por causa da chuva.',
        emoji: '🌧️',
        emotions: [
          { name: 'Desapontado', emoji: '😞', correct: true },
          { name: 'Feliz', emoji: '😊', correct: false },
          { name: 'Com fome', emoji: '🤤', correct: false },
        ],
        strategy: 'E muito desapontante, mas o trabalho nao foi em vao. O concerto sera remarcado e vais estar ainda mais preparado!',
      },
    ],

    fairPlay: [
      {
        situation: 'Um colega ganha o solo no concerto. O que fazes?',
        emoji: '🎤',
        options: [
          { text: 'Dou-lhe os parabens e apoio-o', correct: true },
          { text: 'Fico zangado porque queria o solo', correct: false },
          { text: 'Nao toco no concerto', correct: false },
        ],
        lesson: 'Apoiar os colegas que brilham faz a musica de todos soar melhor!',
      },
      {
        situation: 'O maestro poe-te nos instrumentos de fundo. Como reages?',
        emoji: '🎶',
        options: [
          { text: 'Toco o meu melhor e apoio a banda', correct: true },
          { text: 'Reclamo e toco mal de proposito', correct: false },
          { text: 'Nao toco nada', correct: false },
        ],
        lesson: 'Os instrumentos de fundo sao essenciais! Sem eles, a musica nao soa bem.',
      },
      {
        situation: 'Um colega novo entra na banda e nao sabe tocar. O que fazes?',
        emoji: '👋',
        options: [
          { text: 'Ajudo-o a aprender com paciencia', correct: true },
          { text: 'Ignoro-o', correct: false },
          { text: 'Digo-lhe para desistir', correct: false },
        ],
        lesson: 'Todos comecam do zero! Ajudar os novos membros fortalece a banda.',
      },
      {
        situation: 'A banda ganha o concurso. Como celebras?',
        emoji: '🎉',
        options: [
          { text: 'Celebro com toda a banda e partilho o merito', correct: true },
          { text: 'Digo que ganhamos por minha causa', correct: false },
          { text: 'Celebro sozinho', correct: false },
        ],
        lesson: 'A musica e feita em conjunto. O sucesso pertence a toda a banda!',
      },
      {
        situation: 'Nao entendes uma nota na partitura. O que fazes?',
        emoji: '❓',
        options: [
          { text: 'Pergunto ao professor como se toca', correct: true },
          { text: 'Invento uma nota qualquer', correct: false },
          { text: 'Salto essa parte', correct: false },
        ],
        lesson: 'Pedir ajuda com a partitura e a melhor forma de melhorar. Ate os grandes musicos estudam!',
      },
      {
        situation: 'Um colega esta nervoso antes da actuacao. O que fazes?',
        emoji: '😟',
        options: [
          { text: 'Encorajo-o e digo que vai correr bem', correct: true },
          { text: 'Digo-lhe para nao ser medroso', correct: false },
          { text: 'Nao faco nada', correct: false },
        ],
        lesson: 'Encorajar os colegas antes de uma actuacao faz toda a banda sentir-se mais confiante!',
      },
      {
        situation: 'Reparas que um colega esta a tocar as notas erradas no ensaio. O que fazes?',
        emoji: '🎼',
        options: [
          { text: 'Falo com ele em privado e ajudo-o a corrigir', correct: true },
          { text: 'Digo a todos que ele esta a tocar mal', correct: false },
          { text: 'Nao digo nada e deixo-o errar no concerto', correct: false },
        ],
        lesson: 'Ajudar um colega em privado mostra respeito e faz toda a banda soar melhor!',
      },
      {
        situation: 'A banda tem de escolher a musica para o concerto e a tua sugestao nao foi escolhida. O que fazes?',
        emoji: '🗳️',
        options: [
          { text: 'Aceito a escolha do grupo e ensaio com entusiasmo', correct: true },
          { text: 'Recuso-me a tocar se nao for a minha musica', correct: false },
          { text: 'Toco mal de proposito para estragar', correct: false },
        ],
        lesson: 'Aceitar as decisoes do grupo faz parte de tocar em banda. A tua sugestao pode ser a proxima!',
      },
      {
        situation: 'Um colega mais novo erra durante a actuacao e fica muito envergonhado. O que fazes?',
        emoji: '😊',
        options: [
          { text: 'Digo-lhe que todos erram e que tocou bem no resto', correct: true },
          { text: 'Reclamo porque estragou a actuacao', correct: false },
          { text: 'Faco de conta que nao o conhesso', correct: false },
        ],
        lesson: 'Errar faz parte de aprender. Apoiar quem erra e o que fazem os verdadeiros musicos!',
      },
      {
        situation: 'A banda adversaria no concurso toca muito bem. O que fazes?',
        emoji: '👏',
        options: [
          { text: 'Aplaudo e reconheco que tocaram muito bem', correct: true },
          { text: 'Digo que nao foi assim tao bom', correct: false },
          { text: 'Fico de bracos cruzados sem aplaudir', correct: false },
        ],
        lesson: 'Reconhecer o talento dos outros mostra grandeza. A musica une as pessoas, nao as separa!',
      },
    ],

    division: [
      { total: 12, groups: 2, context: '12 musicos divididos em 2 bandas iguais.' },
      { total: 10, groups: 5, context: '10 partituras para 5 musicos.' },
      { total: 15, groups: 3, context: '15 instrumentos para 3 salas de ensaio.' },
      { total: 8, groups: 2, context: '8 microfones para 2 palcos.' },
      { total: 20, groups: 4, context: '20 bilhetes para 4 concertos.' },
      { total: 6, groups: 3, context: '6 guitarras para 3 pares de musicos.' },
      { total: 16, groups: 4, context: '16 cadeiras para 4 filas da orquestra.' },
      { total: 9, groups: 3, context: '9 cantores divididos em 3 grupos vocais.' },
      { total: 18, groups: 6, context: '18 palhetas de guitarra para 6 guitarristas.' },
      { total: 24, groups: 4, context: '24 folhas de partitura para 4 grupos de musicos.' },
      { total: 14, groups: 7, context: '14 estantes de partitura para 7 pares de musicos.' },
      { total: 21, groups: 3, context: '21 CDs para 3 prateleiras da loja do concerto.' },
    ],

    shop: {
      title: 'Loja do Concerto',
      items: [
        { name: 'Bilhete', emoji: '🎫', price: 50 },
        { name: 'T-shirt Banda', emoji: '👕', price: 30 },
        { name: 'Guitarra Mini', emoji: '🎸', price: 100 },
        { name: 'Agua', emoji: '💧', price: 10 },
        { name: 'CD Musica', emoji: '💿', price: 20 },
        { name: 'Chapeu Artista', emoji: '🧢', price: 40 },
      ],
    },

    dress: {
      title: 'Veste o Musico',
      character: 'musico',
      instruction: (en, pt) => `Coloca a ${en} no musico. Onde vai a ${pt}?`,
      completeText: 'O musico esta pronto para o concerto!',
      completeEmoji: '🎵',
    },

    color: {
      title: 'Pinta o Instrumento',
      completeText: 'Pintaste todos os instrumentos!',
      instruction: (name, colors) => `Pinta o ${name}. Escolhe as cores: ${colors}.`,
      items: [
        { name: 'Piano', detail: 'Classico', colors: ['black', 'white'] },
        { name: 'Guitarra', detail: 'Rock', colors: ['red', 'orange'] },
        { name: 'Tambor', detail: 'Percussao', colors: ['red', 'yellow'] },
        { name: 'Flauta', detail: 'Classico', colors: ['white', 'blue'] },
        { name: 'Saxofone', detail: 'Jazz', colors: ['yellow', 'orange'] },
        { name: 'Violino', detail: 'Classico', colors: ['orange', 'red'] },
        { name: 'Trompete', detail: 'Jazz', colors: ['yellow', 'white'] },
        { name: 'Ukulele', detail: 'Tropical', colors: ['green', 'yellow'] },
      ],
    },

    read: {
      title: 'Le a Pontuacao',
      completeText: 'Leste todas as pontuacoes!',
      boardColor: '#6A1B9A',
      items: [
        { home: 'Piano', away: 'Guitar', homeScore: 3, awayScore: 1 },
        { home: 'Drums', away: 'Violin', homeScore: 2, awayScore: 2 },
        { home: 'Flute', away: 'Trumpet', homeScore: 0, awayScore: 1 },
        { home: 'Saxophone', away: 'Clarinet', homeScore: 4, awayScore: 0 },
        { home: 'Piano', away: 'Drums', homeScore: 2, awayScore: 1 },
        { home: 'Guitar', away: 'Bass', homeScore: 1, awayScore: 3 },
      ],
    },

    routine: {
      title: 'Rotina do Musico',
      step8: { text: 'Aulas da tarde / Aula de Musica', emoji: '🎵' },
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
