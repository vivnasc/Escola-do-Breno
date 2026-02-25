/**
 * Stories for Contos Vivos — Campo 7 (A Biblioteca).
 *
 * Each story is UNIQUE to its universe — not a re-skin of the same
 * narrative. Different characters, different arcs, different themes.
 *
 * To add a new story:
 * 1. Add an entry to STORIES with a unique id
 * 2. Write scenes for one or more universes
 * 3. Each scene needs: text, mood, visual (emoji)
 * 4. Optional: sound ('birds'|'rain'|'wind'|'sea'), interaction
 */

export const MOODS = {
  warm:       { bg: '#FFF8E1', border: '#FFD54F' },
  dreamy:     { bg: '#E3F2FD', border: '#90CAF9' },
  joyful:     { bg: '#FFF9C4', border: '#FFF176' },
  tense:      { bg: '#ECEFF1', border: '#B0BEC5' },
  sad:        { bg: '#F3E5F5', border: '#CE93D8' },
  mysterious: { bg: '#E8F5E9', border: '#A5D6A7' },
  triumphant: { bg: '#FFF3E0', border: '#FFB74D' },
}

export const STORIES = [
  // ═════════════════════════════════════════════════════════
  // FUTEBOL — A Bola que Sonhava
  // Tema: persistência e pertença
  // ═════════════════════════════════════════════════════════
  {
    id: 'the-dream',
    level: 1,
    universes: {
      football: { title: 'A Bola que Sonhava', coverEmoji: '⚽' },
    },
    scenes: {
      football: [
        { text: 'Dentro de uma velha caixa de brinquedos, no fundo de um armário esquecido, vivia uma bola. Não era uma bola qualquer — era uma bola que sonhava.', mood: 'warm', sound: null, visual: '⚽' },
        { text: 'Todas as noites, quando a casa ficava em silêncio, a bola sonhava que voava. Sonhava que um jogador a chutava tão alto, tão alto, que ela tocava nas nuvens.', mood: 'dreamy', sound: null, visual: '☁️' },
        { text: 'Num sábado de manhã, um menino chamado Tomás abriu o armário à procura de algo para brincar. Os seus olhos brilharam. "Uma bola!", disse ele, com um sorriso enorme.', mood: 'joyful', sound: 'birds', visual: '✨' },
        {
          text: 'Tomás levou a bola para o parque. Chutou-a alto. Muito alto! A bola girou no ar e pensou: "Isto é melhor do que qualquer sonho!"',
          mood: 'joyful', sound: null, visual: '🎉',
          interaction: {
            type: 'emotion',
            prompt: 'O Tomás e a bola estão a brincar juntos. O que achas que a bola está a sentir?',
            options: [
              { text: 'Feliz', emoji: '😊', response: 'Sim! A bola está radiante de felicidade. Finalmente alguém a encontrou!' },
              { text: 'Triste', emoji: '😢', response: 'Na verdade, a bola está muito feliz! Finalmente está a fazer aquilo com que sempre sonhou.' },
              { text: 'Assustada', emoji: '😨', response: 'Não, a bola não tem medo — está feliz! Voar é o que ela sempre quis.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Mas de repente, uma rajada de vento forte levou a bola para longe. Rolou, rolou, rolou... até cair no rio. A água levou-a, cada vez mais longe.', mood: 'tense', sound: 'wind', visual: '🌊' },
        {
          text: 'Tomás correu pela margem do rio, mas a bola já não se via. Sentou-se na relva molhada e baixou a cabeça.',
          mood: 'sad', sound: 'rain', visual: '😢',
          interaction: {
            type: 'emotion',
            prompt: 'O Tomás perdeu a bola. O que achas que ele está a sentir?',
            options: [
              { text: 'Triste', emoji: '😢', response: 'Sim, o Tomás está muito triste. Tinha acabado de encontrar a bola e já a perdeu.' },
              { text: 'Feliz', emoji: '😊', response: 'Não... o Tomás está triste. Perdeu a bola que tanto gostava.' },
              { text: 'Zangado', emoji: '😡', response: 'Talvez um pouco, mas mais do que raiva, o Tomás sente tristeza. Perdeu algo especial.' },
            ],
            bestIndex: 0,
          },
        },
        {
          text: 'O Tomás olhou para o rio. Podia ir para casa e esquecer a bola. Ou podia ir à procura dela.',
          mood: 'mysterious', sound: null, visual: '🤔',
          interaction: {
            type: 'choice',
            prompt: 'O que achas que o Tomás deve fazer?',
            options: [
              { text: 'Ir à procura', emoji: '🔍', response: 'Boa escolha! O Tomás também decidiu isso. Não ia desistir.' },
              { text: 'Ir para casa', emoji: '🏠', response: 'Hm... mas a bola é tão especial. O Tomás decidiu ir à procura. Não ia desistir!' },
              { text: 'Pedir ajuda', emoji: '🤝', response: 'Boa ideia! Mas está sozinho. O Tomás decidiu ir ele mesmo — com coragem.' },
            ],
          },
        },
        { text: 'Tomás levantou-se e seguiu o rio. O caminho era longo. As árvores pareciam sussurrar segredos e as sombras dançavam no chão.', mood: 'mysterious', sound: 'wind', visual: '🌲' },
        { text: 'De repente, ouviu um som. Plash, plash! Olhou para o rio e viu — a bola! Estava presa entre duas pedras grandes. E em cima dela, sentado como um rei no trono, estava um sapo verde.', mood: 'triumphant', sound: 'birds', visual: '🐸' },
        {
          text: 'O sapo olhou para o Tomás. O Tomás olhou para o sapo. Ficaram ali, em silêncio, como se se entendessem sem palavras.',
          mood: 'warm', sound: null, visual: '👀',
          interaction: {
            type: 'emotion',
            prompt: 'O Tomás encontrou a bola! O que achas que ele sentiu neste momento?',
            options: [
              { text: 'Alívio e alegria', emoji: '😮‍💨', response: 'Exactamente! Uma mistura de alívio e alegria. Encontrou a sua bola!' },
              { text: 'Medo do sapo', emoji: '😨', response: 'O sapo parece simpático! O Tomás sentiu alívio e alegria por encontrar a bola.' },
              { text: 'Indiferença', emoji: '😐', response: 'Não — o Tomás ficou muito contente! Andou tanto para a encontrar.' },
            ],
            bestIndex: 0,
          },
        },
        { text: '"Com licença, senhor sapo", disse o Tomás com cuidado. O sapo saltou para uma pedra ao lado. Plop! Como se dissesse: "Toma lá, é tua."', mood: 'joyful', sound: null, visual: '🐸' },
        { text: 'Tomás pegou na bola, limpou-a com a camisola e abraçou-a contra o peito. No caminho de volta para casa, ia a sorrir.', mood: 'warm', sound: 'birds', visual: '💛' },
        { text: 'E a bola? A bola ia feliz, quentinha nos braços do Tomás. Pensou: "Já não preciso de sonhar. Encontrei o meu jogador."', mood: 'warm', sound: null, visual: '⚽', isEnding: true },
      ],
    },
  },

  // ═════════════════════════════════════════════════════════
  // DINOSSAUROS — O Último Ovo
  // Tema: proteger os vulneráveis, amor sem posse
  // ═════════════════════════════════════════════════════════
  {
    id: 'last-egg',
    level: 1,
    universes: {
      dinosaurs: { title: 'O Último Ovo', coverEmoji: '🥚' },
    },
    scenes: {
      dinosaurs: [
        { text: 'Num museu silencioso, depois de todos os visitantes irem embora, havia uma sala especial. E nessa sala, dentro de uma caixa de vidro, estava um ovo. Um ovo muito, muito antigo.', mood: 'warm', sound: null, visual: '🥚' },
        { text: 'Naquela noite, algo diferente aconteceu. O ovo mexeu-se. Só um bocadinho. Depois outra vez. Crac! Uma linha fina apareceu na casca.', mood: 'mysterious', sound: null, visual: '🌙' },
        { text: 'Carlos, o guarda noturno, ouviu o som. Correu até à sala e não acreditou no que viu. O ovo estava a partir-se! "Não pode ser...", sussurrou.', mood: 'joyful', sound: null, visual: '✨' },
        {
          text: 'Do ovo saiu uma criatura pequenina. Verde, com olhos enormes e brilhantes. Olhou para o Carlos e fez um som suave, como um gatinho a ronronar.',
          mood: 'joyful', sound: null, visual: '🦕',
          interaction: {
            type: 'emotion',
            prompt: 'Um dinossauro acabou de nascer! O que achas que o Carlos está a sentir?',
            options: [
              { text: 'Espantado', emoji: '😲', response: 'Sim! O Carlos nunca viu nada assim. Está completamente espantado!' },
              { text: 'Assustado', emoji: '😨', response: 'Talvez um pouco, mas o bebé é tão pequeno e inofensivo que o espanto é maior que o medo.' },
              { text: 'Zangado', emoji: '😡', response: 'Não, o Carlos não está zangado! Está maravilhado com este momento único.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Carlos tirou a tampa da garrafa de água e pôs um pouco na mão. O bebé dinossauro bebeu, devagar. Depois encostou a cabeça à mão do Carlos e fechou os olhos.', mood: 'warm', sound: null, visual: '💧' },
        { text: 'Carlos pegou no bebé ao colo e passearam pelo museu. O dinossaurinho olhava para os esqueletos gigantes nas paredes. Parou diante de um esqueleto enorme.', mood: 'mysterious', sound: null, visual: '🦴' },
        {
          text: 'O bebé olhou para o esqueleto durante muito tempo. Depois fez um som baixinho, triste, e encostou-se ao peito do Carlos.',
          mood: 'sad', sound: null, visual: '😢',
          interaction: {
            type: 'emotion',
            prompt: 'O bebé está a olhar para os esqueletos dos dinossauros. O que achas que ele está a sentir?',
            options: [
              { text: 'Saudade', emoji: '💭', response: 'Talvez sim. Mesmo sem nunca os ter conhecido, o bebé sente que aqueles eram como ele.' },
              { text: 'Medo', emoji: '😨', response: 'Talvez um pouco. Os esqueletos são grandes! Mas mais do que medo, parece sentir saudade.' },
              { text: 'Nada', emoji: '😐', response: 'O bebé parece sentir algo sim. Está quieto e triste, como se reconhecesse algo.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'A noite estava a acabar. Pelas janelas do museu, Carlos viu o céu ficar mais claro. Daqui a pouco, as pessoas iam chegar.', mood: 'tense', sound: null, visual: '☀️' },
        {
          text: 'Carlos olhou para o bebé nos seus braços. Se as pessoas o vissem, iam querer estudá-lo, pô-lo numa jaula. O bebé não era uma coisa. Era um ser vivo.',
          mood: 'mysterious', sound: null, visual: '🤔',
          interaction: {
            type: 'choice',
            prompt: 'O que achas que o Carlos deve fazer?',
            options: [
              { text: 'Proteger o bebé', emoji: '🛡️', response: 'O Carlos pensou o mesmo. Não ia deixar ninguém tratar o bebé como uma coisa.' },
              { text: 'Deixar no museu', emoji: '🏛️', response: 'Hmm... mas no museu iam pôr o bebé numa jaula. O Carlos decidiu protegê-lo.' },
              { text: 'Pedir ajuda a uma amiga', emoji: '🤝', response: 'Boa ideia! O Carlos conhece alguém que pode ajudar — uma amiga que cuida de animais especiais.' },
            ],
          },
        },
        { text: 'Carlos embrulhou o bebé no casaco e pôs na mochila, com muito cuidado. O dinossaurinho olhou para cima e piscou os olhos, como se dissesse: "Confio em ti."', mood: 'warm', sound: null, visual: '🎒' },
        { text: 'Carlos levou o bebé a uma amiga que vivia no campo. Ela tinha um jardim enorme, com árvores, um lago e espaço para correr. "Aqui vais ser feliz", disse o Carlos.', mood: 'joyful', sound: 'birds', visual: '🌿' },
        {
          text: 'O Carlos pôs o bebé no chão. O dinossaurinho deu os primeiros passos na relva. Depois olhou para trás, para o Carlos.',
          mood: 'warm', sound: 'birds', visual: '💛',
          interaction: {
            type: 'emotion',
            prompt: 'O Carlos está a despedir-se do bebé. O que achas que ele está a sentir?',
            options: [
              { text: 'Feliz e triste', emoji: '🥹', response: 'Exactamente. Está feliz porque o bebé vai ficar bem. E triste porque vai ter saudades.' },
              { text: 'Só feliz', emoji: '😊', response: 'Está feliz sim, mas também um pouco triste. Despedir-se de quem amamos é sempre difícil.' },
              { text: 'Só triste', emoji: '😢', response: 'Está triste sim, mas também feliz. Sabe que fez a coisa certa.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Todas as semanas, o Carlos visitava o bebé. E o bebé, que já não era tão bebé, corria sempre para ele quando o via. Alguns amigos não vivem na mesma casa. Mas o amor não precisa de paredes.', mood: 'warm', sound: null, visual: '🦕', isEnding: true },
      ],
    },
  },

  // ═════════════════════════════════════════════════════════
  // ESPAÇO — A Estrela que Caiu
  // Tema: amar é deixar ir
  // ═════════════════════════════════════════════════════════
  {
    id: 'fallen-star',
    level: 1,
    universes: {
      space: { title: 'A Estrela que Caiu', coverEmoji: '🌠' },
    },
    scenes: {
      space: [
        { text: 'Numa noite de agosto, uma menina chamada Inês estava deitada no jardim a olhar para o céu. Gostava de contar estrelas antes de adormecer.', mood: 'warm', sound: null, visual: '⭐' },
        { text: 'De repente, uma estrela mexeu-se. Riscou o céu com uma linha de luz e... caiu! Caiu ali mesmo, no jardim da Inês, atrás do limoeiro.', mood: 'dreamy', sound: null, visual: '🌠' },
        { text: 'Inês correu até ao limoeiro. No chão, entre as folhas, brilhava uma coisinha minúscula. Era a estrela. Tinha o tamanho de uma moeda, mas brilhava tanto que iluminava a cara da Inês.', mood: 'joyful', sound: null, visual: '✨' },
        {
          text: 'Inês pôs a estrela num frasco de vidro. A estrela iluminou o quarto inteiro com uma luz dourada e quente. Era como ter um pedacinho do céu em casa.',
          mood: 'joyful', sound: null, visual: '🫙',
          interaction: {
            type: 'emotion',
            prompt: 'A Inês encontrou uma estrela! O que achas que ela está a sentir?',
            options: [
              { text: 'Maravilhada', emoji: '🤩', response: 'Sim! Ninguém no mundo inteiro tem uma estrela. A Inês está encantada!' },
              { text: 'Assustada', emoji: '😨', response: 'Talvez um bocadinho, mas a estrela é tão bonita que o encanto é maior que o medo.' },
              { text: 'Indiferente', emoji: '😐', response: 'Não... a Inês está fascinada! Uma estrela no jardim não acontece todos os dias.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Nos primeiros dias, a estrela brilhava muito. Inês adormecia com aquela luz suave na mesa de cabeceira. Era como ter uma luz de presença mágica.', mood: 'warm', sound: null, visual: '🌟' },
        { text: 'Mas aos poucos, a estrela foi ficando mais fraca. A luz, que era dourada, ficou amarela. Depois quase branca. A estrela tremia, como se tivesse frio.', mood: 'sad', sound: 'wind', visual: '😟' },
        {
          text: 'Uma noite, Inês acordou e viu que a estrela quase não brilhava. Pegou no frasco e encostou-o ao peito. A estrela tremeu.',
          mood: 'sad', sound: 'rain', visual: '💧',
          interaction: {
            type: 'emotion',
            prompt: 'A estrela está a ficar fraca. O que achas que a estrela está a sentir?',
            options: [
              { text: 'Saudade do céu', emoji: '💭', response: 'Sim. A estrela sente falta do céu, das outras estrelas, da imensidão. Está longe de casa.' },
              { text: 'Está doente', emoji: '🤒', response: 'De certa forma sim, mas o que a faz sofrer é a saudade. As estrelas pertencem ao céu.' },
              { text: 'Está zangada', emoji: '😡', response: 'Não está zangada. Está triste e com saudade. Precisa de voltar para casa.' },
            ],
            bestIndex: 0,
          },
        },
        {
          text: 'Inês percebeu. A estrela não podia viver num frasco. Pertencia ao céu. Mas como é que se devolve uma estrela?',
          mood: 'mysterious', sound: null, visual: '🤔',
          interaction: {
            type: 'choice',
            prompt: 'O que achas que a Inês deve fazer?',
            options: [
              { text: 'Soltar a estrela', emoji: '🕊️', response: 'A Inês também pensou isso. Se ama a estrela, tem de a deixar ir.' },
              { text: 'Guardar a estrela', emoji: '🫙', response: 'Hmm... mas a estrela está a sofrer. Às vezes amar é deixar ir.' },
              { text: 'Pedir um desejo', emoji: '🙏', response: 'Bonita ideia! Mas primeiro, a estrela precisa de voltar a brilhar.' },
            ],
          },
        },
        { text: 'Inês levou o frasco para o jardim. Abriu a tampa com cuidado. A estrela ficou ali, quieta, como se não acreditasse.', mood: 'warm', sound: 'wind', visual: '🌙' },
        { text: 'Depois, devagar, a estrela levantou-se. Flutuou. Subiu um pouco. A luz ficou mais forte. Dourada outra vez! Subiu mais. E mais.', mood: 'triumphant', sound: 'birds', visual: '🌟' },
        {
          text: 'A estrela parou no ar, olhou para a Inês uma última vez e brilhou com toda a força. Era o obrigada mais bonito que alguém pode dar.',
          mood: 'warm', sound: null, visual: '💛',
          interaction: {
            type: 'emotion',
            prompt: 'A Inês soltou a estrela. O que achas que ela está a sentir?',
            options: [
              { text: 'Feliz por ter feito o certo', emoji: '😊', response: 'Sim! A Inês sabe que fez a coisa certa. E a estrela vai brilhar para sempre.' },
              { text: 'Triste por perder a estrela', emoji: '😢', response: 'Um pouco triste sim, mas mais feliz do que triste. O amor verdadeiro deixa ir.' },
              { text: 'Arrependida', emoji: '😣', response: 'Não, a Inês não se arrepende. Viu a estrela brilhar de novo. Isso vale tudo.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'A estrela subiu até ao céu e encontrou o seu lugar. Agora, todas as noites, quando a Inês olha para cima, há uma estrela que brilha um pouco mais do que as outras. É a dela. E a Inês sorri, porque aprendeu que amar de verdade é deixar brilhar.', mood: 'warm', sound: null, visual: '⭐', isEnding: true },
      ],
    },
  },

  // ═════════════════════════════════════════════════════════
  // ANIMAIS — O Gato que Não Sabia Miar
  // Tema: neurodiversidade, encontrar a sua voz
  // ═════════════════════════════════════════════════════════
  {
    id: 'silent-cat',
    level: 1,
    universes: {
      animals: { title: 'O Gato que Não Sabia Miar', coverEmoji: '🐱' },
    },
    scenes: {
      animals: [
        { text: 'Numa rua estreita de uma cidade antiga, vivia um gato chamado Simão. Tinha pelo cinzento, olhos amarelos e uma cauda muito comprida. Mas havia uma coisa estranha no Simão.', mood: 'warm', sound: null, visual: '🐱' },
        { text: 'O Simão não sabia miar. Quando abria a boca, em vez de "miau", saía um assobio. Fiiiiiuuu! Como um pássaro.', mood: 'mysterious', sound: null, visual: '🎵' },
        { text: 'Os outros gatos riam-se dele. "Isso não é um gato!", dizia a Gata Malhada. "É um pássaro com bigodes!", dizia o Gato Gordo. O Simão baixava a cabeça e ia embora.', mood: 'sad', sound: null, visual: '😿' },
        {
          text: 'Todas as noites, o Simão tentava. Abria a boca: fiiiiuuu. Outra vez: fiiiiiuuuu. Nunca saía um miau. Fechava os olhos e pensava: "Porque é que eu sou diferente?"',
          mood: 'sad', sound: 'rain', visual: '😢',
          interaction: {
            type: 'emotion',
            prompt: 'O Simão não consegue miar como os outros. O que achas que ele está a sentir?',
            options: [
              { text: 'Triste e sozinho', emoji: '😢', response: 'Sim. Ser diferente pode ser muito solitário. O Simão sente que não pertence.' },
              { text: 'Zangado', emoji: '😡', response: 'Talvez um pouco, mas mais do que raiva, o Simão sente tristeza.' },
              { text: 'Normal', emoji: '😐', response: 'Na verdade, o Simão está triste. Sente que não encaixa com os outros gatos.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Numa manhã, o Simão estava sentado no muro quando ouviu algo. Um assobio! Igual ao dele! Olhou para cima e viu um melro pousado num fio.', mood: 'mysterious', sound: 'birds', visual: '🐦' },
        { text: 'O melro assoviou. O Simão assoviou de volta. O melro inclinou a cabeça, como se dissesse: "Tu falas a minha língua!" E assoviou outra vez.', mood: 'joyful', sound: 'birds', visual: '✨' },
        {
          text: 'O Simão e o melro começaram a fazer música juntos. Fiiiu-fiii! Tiu-tiu! Um gato e um pássaro, a cantar em dueto no telhado.',
          mood: 'joyful', sound: 'birds', visual: '🎶',
          interaction: {
            type: 'emotion',
            prompt: 'O Simão encontrou alguém que o entende. O que achas que ele está a sentir?',
            options: [
              { text: 'Feliz', emoji: '😊', response: 'Sim! Pela primeira vez, o Simão não se sente diferente. Sente-se especial!' },
              { text: 'Confuso', emoji: '🤔', response: 'Talvez um pouco surpreso, mas acima de tudo está feliz. Alguém fala a sua língua!' },
              { text: 'Triste', emoji: '😢', response: 'Não, desta vez o Simão está feliz! Encontrou um amigo que o entende.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Todos os dias, o Simão e o melro encontravam-se no telhado. Cantavam juntos ao pôr do sol. As pessoas paravam na rua para ouvir.', mood: 'warm', sound: 'birds', visual: '🌆' },
        { text: 'Um dia, os outros gatos vieram ver. A Gata Malhada ficou de boca aberta. O Gato Gordo arregalou os olhos. Nunca tinham ouvido nada tão bonito.', mood: 'triumphant', sound: null, visual: '👀' },
        {
          text: 'A Gata Malhada aproximou-se do Simão. "Desculpa por me ter rido de ti", disse ela. "Ensinas-me a assobiar?"',
          mood: 'warm', sound: null, visual: '🤔',
          interaction: {
            type: 'choice',
            prompt: 'A Gata Malhada pediu desculpa. O que achas que o Simão deve fazer?',
            options: [
              { text: 'Perdoar e ensinar', emoji: '😊', response: 'O Simão sorriu. Nem pensou duas vezes. "Claro que sim!"' },
              { text: 'Dizer que não', emoji: '🙅', response: 'Hmm... mas o Simão tem bom coração. Decidiu perdoar.' },
              { text: 'Pensar primeiro', emoji: '🤔', response: 'Boa. O Simão pensou um momento. Depois sorriu e disse: "Claro que sim."' },
            ],
          },
        },
        { text: 'E assim, o telhado encheu-se de sons. Gatos a tentar assobiar, pássaros a tentar miar, e no meio de tudo, o Simão — o gato que transformou a sua diferença em música.', mood: 'joyful', sound: 'birds', visual: '🎵' },
        { text: 'O Simão nunca aprendeu a miar. E nunca mais quis. Porque descobriu algo melhor: a sua voz, mesmo sendo diferente, era a mais bonita de todas. Às vezes, o que nos faz estranhos é exactamente o que nos faz especiais.', mood: 'warm', sound: null, visual: '🐱', isEnding: true },
      ],
    },
  },

  // ═════════════════════════════════════════════════════════
  // MÚSICA — O Silêncio que Cantava
  // Tema: sobrecarga sensorial, ouvir diferente é ouvir melhor
  // ═════════════════════════════════════════════════════════
  {
    id: 'singing-silence',
    level: 1,
    universes: {
      music: { title: 'O Silêncio que Cantava', coverEmoji: '🤫' },
    },
    scenes: {
      music: [
        { text: 'O Rui vivia numa cidade barulhenta. Carros, buzinas, obras, gritos, sirenes. Barulho de manhã, barulho à tarde, barulho à noite. O Rui tapava os ouvidos.', mood: 'tense', sound: null, visual: '🏙️' },
        { text: 'Na escola, o barulho era pior. Trinta crianças a falar ao mesmo tempo. Cadeiras a arrastar. O Rui fechava os olhos e queria desaparecer.', mood: 'sad', sound: null, visual: '😣' },
        {
          text: 'Os amigos diziam: "Rui, vem brincar!" Mas ele não conseguia. Havia barulho a mais. Doía-lhe por dentro, como se o som fosse peso.',
          mood: 'sad', sound: null, visual: '🙁',
          interaction: {
            type: 'emotion',
            prompt: 'O Rui sofre com o barulho. O que achas que ele está a sentir?',
            options: [
              { text: 'Sobrecarregado', emoji: '😵', response: 'Sim. O Rui sente-se sobrecarregado. Para ele, o barulho é muito mais intenso do que para os outros.' },
              { text: 'Preguiçoso', emoji: '😴', response: 'Não é preguiça! O Rui sente o barulho com mais intensidade. É como se o volume estivesse no máximo, sempre.' },
              { text: 'Normal', emoji: '😐', response: 'Na verdade, o Rui sente o barulho de uma forma muito intensa. É real e é difícil.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Um dia, a caminho de casa, o Rui entrou por uma rua que não conhecia. Era estreita, com paredes de pedra antiga e plantas a sair das fendas.', mood: 'mysterious', sound: null, visual: '🌿' },
        { text: 'E de repente... silêncio. O barulho da cidade desapareceu. O Rui parou. Tirou as mãos dos ouvidos. Respirou fundo.', mood: 'dreamy', sound: 'wind', visual: '🤫' },
        { text: 'Mas o silêncio não era vazio. O Rui começou a ouvir coisas que nunca tinha ouvido. O vento a passar entre as folhas. Uma gota de água a cair. Um pássaro muito longe.', mood: 'warm', sound: 'birds', visual: '👂' },
        {
          text: 'O Rui fechou os olhos e ouviu. O vento tinha um ritmo. A gota de água marcava o tempo. O pássaro fazia a melodia. O silêncio... cantava!',
          mood: 'joyful', sound: 'birds', visual: '🎵',
          interaction: {
            type: 'emotion',
            prompt: 'O Rui descobriu música no silêncio. O que achas que ele está a sentir?',
            options: [
              { text: 'Paz', emoji: '😌', response: 'Sim! Pela primeira vez, o Rui sente paz. O silêncio é o lugar dele.' },
              { text: 'Medo', emoji: '😨', response: 'Não, o Rui sente o contrário do medo. Sente-se seguro e em paz.' },
              { text: 'Aborrecido', emoji: '😒', response: 'Não! O Rui está encantado. Encontrou algo que não sabia que existia.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'O Rui voltou àquela rua no dia seguinte. E no outro. Sentava-se no chão de pedra e ouvia. Cada dia, descobria um som novo.', mood: 'warm', sound: null, visual: '🏡' },
        { text: 'Na escola, o Rui começou a notar sons bonitos no meio do barulho. O riso da sua amiga Clara. O lápis a desenhar no papel. O vento na janela.', mood: 'joyful', sound: null, visual: '✨' },
        {
          text: 'Um dia, a Clara perguntou: "Rui, porque é que sorris sozinho?" O Rui pensou. Devia contar o segredo?',
          mood: 'warm', sound: null, visual: '🤔',
          interaction: {
            type: 'choice',
            prompt: 'A Clara perguntou porque é que o Rui sorri. O que achas que ele deve fazer?',
            options: [
              { text: 'Contar o segredo', emoji: '🤝', response: 'O Rui decidiu partilhar. "Estou a ouvir a música escondida", disse ele. A Clara quis saber mais.' },
              { text: 'Guardar para si', emoji: '🤫', response: 'Hmm... mas partilhar algo bonito torna-o ainda mais bonito. O Rui decidiu contar.' },
              { text: 'Encolher os ombros', emoji: '🤷', response: 'Mas a Clara é amiga. O Rui respirou fundo e decidiu partilhar o seu segredo.' },
            ],
          },
        },
        { text: 'O Rui levou a Clara à rua silenciosa. "Fecha os olhos e ouve", disse ele. A Clara fechou os olhos. Depois de um minuto, abriu-os, espantada. "Rui... eu ouço!"', mood: 'joyful', sound: 'birds', visual: '👧' },
        { text: 'O Rui sorriu. Nem toda a gente ia ouvir. Mas não faz mal. Ele sabia que o mundo está cheio de música escondida — basta parar e ouvir. E às vezes, as pessoas que ouvem de maneira diferente são as que ouvem melhor.', mood: 'warm', sound: null, visual: '🎶', isEnding: true },
      ],
    },
  },

  // ═════════════════════════════════════════════════════════
  // ANIMAIS (Nível 2) — A Raposa que Tinha Medo do Escuro
  // Tema: enfrentar medos com ajuda, ter medo não impede ser corajoso
  // ═════════════════════════════════════════════════════════
  {
    id: 'afraid-fox',
    level: 2,
    universes: {
      animals: { title: 'A Raposa que Tinha Medo do Escuro', coverEmoji: '🦊' },
    },
    scenes: {
      animals: [
        { text: 'No fundo de uma floresta antiga, onde as árvores eram tão altas que pareciam tocar as nuvens, vivia uma família de raposas. Todas as raposas caçavam à noite, quando a lua iluminava os caminhos entre as árvores.', mood: 'warm', sound: 'wind', visual: '🦊' },
        { text: 'Todas menos uma. A Rubi, a raposa mais nova, tinha medo do escuro. Quando o sol se punha e as sombras cresciam, a Rubi encolhia-se na toca e tapava os olhos com a cauda fofa.', mood: 'sad', sound: null, visual: '🙈' },
        {
          text: '"Rubi, vem connosco!", chamava a mãe todas as noites. Mas a Rubi abanava a cabeça. O escuro parecia-lhe enorme, cheio de sons estranhos e formas assustadoras.',
          mood: 'tense', sound: 'wind', visual: '🌑',
          interaction: {
            type: 'emotion',
            prompt: 'A Rubi não consegue sair à noite como as outras raposas. O que achas que ela está a sentir?',
            options: [
              { text: 'Medo e vergonha', emoji: '😰', response: 'Sim. A Rubi tem medo do escuro e sente vergonha por ser diferente das outras raposas.' },
              { text: 'Preguiça', emoji: '😴', response: 'Não é preguiça! A Rubi queria ir, mas o medo é maior. É um sentimento muito real.' },
              { text: 'Felicidade', emoji: '😊', response: 'Na verdade, a Rubi está assustada e triste. Gostava de ser corajosa como as outras.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Numa noite quente de verão, enquanto a família saía para caçar, a Rubi espreitou pela entrada da toca. Foi então que viu algo que nunca tinha visto: um pontinho de luz a dançar no ar.', mood: 'mysterious', sound: null, visual: '✨' },
        { text: 'O pontinho aproximou-se. Era um pirilampo! Tinha uma barriga que brilhava como uma pequena lanterna verde. "Olá!", disse o pirilampo. "Chamo-me Lume. E tu, porque estás aqui sozinha?"', mood: 'joyful', sound: null, visual: '🪲' },
        {
          text: '"Tenho medo do escuro", disse a Rubi, com a voz baixinha. O Lume pousou no nariz dela e disse: "Queres que te mostre uma coisa? O escuro não é o que tu pensas."',
          mood: 'warm', sound: null, visual: '💡',
          interaction: {
            type: 'choice',
            prompt: 'O Lume ofereceu-se para guiar a Rubi pela noite. O que achas que ela deve fazer?',
            options: [
              { text: 'Aceitar e ir devagar', emoji: '🐾', response: 'A Rubi respirou fundo e deu o primeiro passo para fora da toca. Com o Lume ao seu lado, sentia-se um pouco mais segura.' },
              { text: 'Dizer que não', emoji: '🙅', response: 'O Lume esperou. Sem pressas. A Rubi olhou para aquela luzinha amiga e decidiu tentar. Um passo de cada vez.' },
              { text: 'Pedir para ficar perto', emoji: '🤝', response: '"Fico sempre ao pé de ti", prometeu o Lume. E a Rubi, com o coração a bater muito rápido, saiu da toca.' },
            ],
          },
        },
        { text: 'O Lume voou à frente e a Rubi seguiu-o. A cada passo, o mundo da noite revelava-se. Os cogumelos brilhavam com um tom azulado. As gotas de orvalho cintilavam como diamantes nas folhas. As estrelas pintavam o céu de prata.', mood: 'dreamy', sound: 'wind', visual: '🌌' },
        { text: '"Ouve", sussurrou o Lume. A Rubi parou e ouviu. O canto suave dos grilos. O murmúrio do riacho. Uma coruja a chamar ao longe. A noite tinha a sua própria música, e era bonita.', mood: 'warm', sound: 'birds', visual: '🎵' },
        {
          text: 'De repente, ouviram um som aflito. Perto do riacho, uma traça estava presa numa teia de aranha abandonada. Debatia-se, mas quanto mais se mexia, mais presa ficava. "Socorro! Alguém me ajude!", chorava a traça.',
          mood: 'tense', sound: null, visual: '🦋',
          interaction: {
            type: 'emotion',
            prompt: 'A traça está presa e assustada. O que achas que a Rubi está a sentir ao ver isto?',
            options: [
              { text: 'Vontade de ajudar', emoji: '💪', response: 'Sim! A Rubi sabe o que é ter medo. E isso faz com que queira ajudar quem também está assustado.' },
              { text: 'Medo de se aproximar', emoji: '😨', response: 'Talvez um pouco, mas a Rubi conhece bem o medo. E por isso sente empatia pela traça.' },
              { text: 'Indiferença', emoji: '😐', response: 'Não, a Rubi importa-se! Sabe muito bem o que é sentir medo. Quer ajudar.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'A Rubi aproximou-se com cuidado. Com as suas patas ágeis, afastou os fios da teia, um por um. A traça libertou-se e voou à volta da Rubi, feliz. "Obrigada, obrigada! És muito corajosa!"', mood: 'triumphant', sound: null, visual: '🌟' },
        {
          text: '"Corajosa? Eu?", disse a Rubi, espantada. O Lume pousou no seu ombro e disse: "Coragem não é não ter medo, Rubi. Coragem é ter medo e mesmo assim ajudar."',
          mood: 'warm', sound: null, visual: '💛',
          interaction: {
            type: 'emotion',
            prompt: 'A Rubi salvou a traça mesmo com medo do escuro. O que achas que ela descobriu sobre si mesma?',
            options: [
              { text: 'Que é mais corajosa do que pensava', emoji: '🦁', response: 'Exactamente! A Rubi descobriu que ter medo não a impede de ser corajosa. O medo e a coragem podem existir juntos.' },
              { text: 'Que o escuro já não mete medo', emoji: '😊', response: 'O escuro ainda a assusta um pouco, mas agora sabe que consegue enfrentá-lo. E isso é ser corajosa.' },
              { text: 'Que não precisa dos outros', emoji: '💪', response: 'Na verdade, foi graças ao Lume que ela saiu da toca. Pedir ajuda também é coragem!' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'A Rubi voltou para casa com o Lume a iluminar o caminho. A mãe esperava à entrada da toca. "Onde foste?", perguntou, surpresa. A Rubi sorriu. "Fui descobrir que a noite é bonita. E que sou corajosa, mesmo quando tenho medo."', mood: 'triumphant', sound: 'birds', visual: '🦊' },
        { text: 'A partir daquela noite, a Rubi começou a sair com a família. Ainda tinha medo às vezes — e não faz mal. O Lume aparecia sempre que ela precisava. Porque ter um amigo que nos ajuda a enfrentar o escuro faz toda a diferença. E ter medo não significa que não possamos ser os mais corajosos de todos.', mood: 'warm', sound: null, visual: '🌙', isEnding: true },
      ],
    },
  },

  // ═════════════════════════════════════════════════════════
  // MÚSICA (Nível 2) — O Tambor do Avô
  // Tema: memória, ligação entre gerações, o ritmo da vida
  // ═════════════════════════════════════════════════════════
  {
    id: 'grandpa-drum',
    level: 2,
    universes: {
      music: { title: 'O Tambor do Avô', coverEmoji: '🥁' },
    },
    scenes: {
      music: [
        { text: 'O Kiko tinha sete anos quando o avô partiu. O avô Manuel era grande, com mãos fortes e um sorriso que aquecia qualquer dia frio. Tocava tambor nas festas da aldeia e toda a gente dançava.', mood: 'warm', sound: null, visual: '👴' },
        { text: 'Depois do funeral, a avó deu ao Kiko uma caixa de madeira. "O teu avô queria que ficasses com isto." Dentro da caixa estava o tambor. Velho, gasto, com a pele esticada e marcas de muitos anos de música.', mood: 'sad', sound: null, visual: '🥁' },
        {
          text: 'O Kiko levou o tambor para o quarto e tentou tocar. Bateu com força. Pum! O som foi seco, feio, sem vida. Bateu outra vez, mais forte. Pum! Nada. O tambor parecia mudo.',
          mood: 'tense', sound: null, visual: '😤',
          interaction: {
            type: 'emotion',
            prompt: 'O Kiko bate com força no tambor e ele não faz um som bonito. O que achas que ele está a sentir?',
            options: [
              { text: 'Frustrado e triste', emoji: '😞', response: 'Sim. O Kiko queria ouvir o som que o avô fazia, mas não consegue. Sente frustração e saudade.' },
              { text: 'Zangado com o tambor', emoji: '😡', response: 'Talvez um pouco, mas mais do que raiva, o Kiko sente saudade do avô e frustração consigo mesmo.' },
              { text: 'Indiferente', emoji: '😐', response: 'Na verdade, o Kiko importa-se muito. O tambor é a última coisa que tem do avô.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'O Kiko pôs o tambor debaixo da cama e tentou esquecê-lo. Mas todas as noites, antes de adormecer, pensava no avô. Nas suas mãos grandes a tocarem suavemente. Suavemente? Sim! O avô nunca batia com força.', mood: 'dreamy', sound: null, visual: '💭' },
        {
          text: 'No sábado seguinte, o Kiko tirou o tambor de debaixo da cama. Desta vez, em vez de bater, tocou com as pontas dos dedos. Muito de leve. Toc... toc... toc.',
          mood: 'mysterious', sound: null, visual: '🤲',
          interaction: {
            type: 'choice',
            prompt: 'O Kiko está a tentar tocar com suavidade. O que achas que vai acontecer?',
            options: [
              { text: 'O tambor vai responder', emoji: '🎵', response: 'Sim! Quando o Kiko tocou com delicadeza, o tambor respondeu com um som quente e profundo.' },
              { text: 'Vai ser igual', emoji: '😕', response: 'Desta vez é diferente! O toque suave fez o tambor vibrar com um som bonito e profundo.' },
              { text: 'O tambor vai partir-se', emoji: '💔', response: 'Não! Pelo contrário. O toque suave acordou o tambor. Ele respondeu com um som lindo.' },
            ],
          },
        },
        { text: 'O tambor vibrou. Um som quente e profundo encheu o quarto, como se viesse de muito longe. O Kiko sentiu um arrepio. Tocou outra vez. Toc-toc... toc. E de repente, com os olhos fechados, viu algo.', mood: 'dreamy', sound: null, visual: '✨' },
        { text: 'Viu o avô. Não a sério — mais como um sonho acordado. O avô estava sentado na varanda da casa da aldeia, com o tambor no colo, a tocar para as estrelas. O ritmo era como uma canção de embalar. Toc-toc-tá... toc-toc-tá.', mood: 'warm', sound: null, visual: '🌟' },
        {
          text: 'O Kiko abriu os olhos. O coração batia-lhe depressa. Tinha acabado de ouvir uma memória. O tambor guardava os ritmos do avô, e quando o Kiko tocava com carinho, os ritmos voltavam.',
          mood: 'joyful', sound: null, visual: '💛',
          interaction: {
            type: 'emotion',
            prompt: 'O Kiko descobriu que o tambor guarda memórias do avô. O que achas que ele está a sentir?',
            options: [
              { text: 'Emocionado e feliz', emoji: '🥹', response: 'Sim! O Kiko sente uma alegria misturada com saudade. O avô deixou-lhe algo mágico.' },
              { text: 'Assustado', emoji: '😨', response: 'Talvez um pouco surpreso, mas não assustado. É uma sensação boa, como um abraço.' },
              { text: 'Confuso', emoji: '🤔', response: 'Pode estar um pouco surpreendido, mas acima de tudo sente-se emocionado e perto do avô.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Nos dias seguintes, o Kiko tocava o tambor todas as tardes. Com delicadeza, sem pressa. Cada ritmo novo trazia uma memória diferente. O avô a pescar no rio. O avô a contar histórias. O avô a rir com a boca toda.', mood: 'warm', sound: 'sea', visual: '🎶' },
        {
          text: 'Um dia, a avó ouviu o tambor e veio ao quarto. Tinha os olhos brilhantes. "Esse ritmo...", disse ela, com a voz a tremer. "O teu avô tocava esse ritmo no dia em que nos casámos."',
          mood: 'warm', sound: null, visual: '👵',
          interaction: {
            type: 'emotion',
            prompt: 'A avó reconheceu o ritmo do dia do casamento. O que achas que ela está a sentir?',
            options: [
              { text: 'Saudade e ternura', emoji: '🥹', response: 'Sim. A avó sente saudade, mas também uma ternura enorme. O neto está a trazer de volta algo precioso.' },
              { text: 'Tristeza profunda', emoji: '😢', response: 'Há tristeza sim, mas também há alegria. Ouvir aquele ritmo é como receber um abraço do avô.' },
              { text: 'Surpresa', emoji: '😲', response: 'Está surpresa sim, mas o sentimento mais forte é a saudade misturada com ternura.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'O Kiko pegou na mão da avó e sentou-a ao seu lado. Tocou o ritmo outra vez, devagarinho. A avó fechou os olhos e sorriu. As lágrimas que caíram não eram de tristeza — eram de amor, do tipo que não acaba.', mood: 'warm', sound: null, visual: '💕' },
        { text: 'O Kiko aprendeu algo que os livros não ensinam. Há coisas que não respondem à força — respondem à paciência. O tambor do avô não estava mudo. Estava à espera de mãos gentis. E agora, sempre que o Kiko toca, o avô está ali — no ritmo, na vibração, no amor que ficou. Porque as pessoas que amamos nunca desaparecem de verdade. Vivem no ritmo que deixaram em nós.', mood: 'warm', sound: null, visual: '🥁', isEnding: true },
      ],
    },
  },

  // ═════════════════════════════════════════════════════════
  // FUTEBOL (Nível 2) — O Treinador Invisível
  // Tema: aprender com o fracasso, persistência após derrota
  // ═════════════════════════════════════════════════════════
  {
    id: 'invisible-coach',
    level: 2,
    universes: {
      football: { title: 'O Treinador Invisível', coverEmoji: '📋' },
    },
    scenes: {
      football: [
        { text: 'O Pedro era o capitão da equipa dos Falcões. Treinava todos os dias, dava tudo em cada jogo. Mas naquela tarde, o apito final trouxe o resultado mais duro da temporada: tinham perdido a final por três golos.', mood: 'sad', sound: null, visual: '⚽' },
        { text: 'No balneário, ninguém falava. O Pedro sentou-se no banco com a cabeça entre as mãos. Sentia que tinha falhado — não só a ele, mas a toda a equipa. As lágrimas vieram devagar, sem som.', mood: 'sad', sound: 'rain', visual: '😢' },
        {
          text: 'No dia seguinte, o Pedro não queria ir ao treino. Olhou para as chuteiras ao pé da porta e pensou em deixá-las ali. Para quê continuar se não era suficientemente bom?',
          mood: 'tense', sound: null, visual: '👟',
          interaction: {
            type: 'emotion',
            prompt: 'O Pedro perdeu um jogo importante. O que achas que ele está a sentir?',
            options: [
              { text: 'Desiludido consigo mesmo', emoji: '😞', response: 'Sim. O Pedro sente que deu tudo e não foi suficiente. Essa desilusão é pesada, mas é humana.' },
              { text: 'Indiferente', emoji: '😐', response: 'Na verdade, o Pedro importa-se muito. A derrota deixou-o muito desiludido consigo mesmo.' },
              { text: 'Aliviado', emoji: '😮‍💨', response: 'Não... o Pedro não está aliviado. Está desiludido porque queria muito ganhar.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Mesmo assim, o Pedro foi ao treino. Quando chegou, encontrou algo estranho no seu banco: um papel dobrado. Dentro, com letra cuidadosa, alguém tinha escrito: "O fracasso não é o oposto do sucesso. É parte do caminho."', mood: 'mysterious', sound: null, visual: '📝' },
        { text: 'No dia seguinte, outro papel. Este dizia: "Treina o pé esquerdo durante dez minutos. Só o pé esquerdo. Amanhã vais perceber porquê." O Pedro achou estranho, mas fez o que dizia.', mood: 'mysterious', sound: null, visual: '📋' },
        {
          text: 'Os papéis continuaram a aparecer. Todos os dias, um novo conselho. "Observa o guarda-redes antes de chutar." "Respira três vezes antes de um livre." O Pedro seguia cada instrução.',
          mood: 'warm', sound: 'birds', visual: '✨',
          interaction: {
            type: 'choice',
            prompt: 'O Pedro está a seguir conselhos de alguém que não conhece. O que achas que ele deve fazer?',
            options: [
              { text: 'Continuar a seguir os conselhos', emoji: '📝', response: 'Os conselhos estão a resultar. O Pedro decidiu confiar e continuar a praticar.' },
              { text: 'Tentar descobrir quem é', emoji: '🔍', response: 'A curiosidade é natural! Mas por agora, o Pedro decidiu focar-se nos treinos. O mistério pode esperar.' },
              { text: 'Ignorar os papéis', emoji: '🗑️', response: 'Hmm... mas os conselhos são bons. O Pedro decidiu continuar a segui-los. Estava a melhorar!' },
            ],
          },
        },
        { text: 'Semanas passaram. O Pedro treinava com uma energia nova. O pé esquerdo ficou mais forte. A leitura de jogo melhorou. Os colegas notaram a diferença. "Pedro, estás diferente", disse o Rafa, admirado.', mood: 'joyful', sound: null, visual: '💪' },
        {
          text: 'Chegou o dia do grande jogo seguinte. O Pedro fez dois golos — um deles com o pé esquerdo! No final, a equipa ganhou. Mas em vez de festejar, o Pedro olhou para as bancadas, à procura de alguém.',
          mood: 'triumphant', sound: null, visual: '🏆',
          interaction: {
            type: 'emotion',
            prompt: 'O Pedro ganhou o jogo, mas em vez de festejar está a procurar alguém. O que achas que ele está a sentir?',
            options: [
              { text: 'Gratidão', emoji: '🙏', response: 'Exactamente. O Pedro sabe que esta vitória não é só dele. Quer agradecer a quem o ajudou.' },
              { text: 'Orgulho', emoji: '😤', response: 'Há orgulho sim, mas acima de tudo há gratidão. O Pedro quer agradecer a quem o ajudou.' },
              { text: 'Indiferença', emoji: '😐', response: 'Não, o Pedro importa-se muito. Sente gratidão e quer encontrar quem o ajudou em segredo.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Depois do jogo, o Pedro esperou no campo até todos irem embora. E então viu: um senhor idoso, sentado sozinho na última fila da bancada, com um cachecol dos Falcões ao pescoço.', mood: 'mysterious', sound: 'wind', visual: '👴' },
        {
          text: 'O Pedro subiu as bancadas e sentou-se ao lado do senhor. "Foi o senhor, não foi? Os papéis no banco." O senhor sorriu. "Chamo-me Augusto. Joguei neste campo há quarenta anos."',
          mood: 'warm', sound: null, visual: '🤝',
          interaction: {
            type: 'choice',
            prompt: 'O Pedro descobriu quem escrevia os papéis. O que achas que ele deve dizer ao senhor Augusto?',
            options: [
              { text: 'Obrigado por acreditar em mim', emoji: '🙏', response: 'O Pedro disse exactamente isso. O senhor Augusto sorriu e respondeu: "Eu vi em ti o que tu ainda não vias."' },
              { text: 'Porque não me disse quem era?', emoji: '🤔', response: 'Boa pergunta! O senhor Augusto respondeu: "Porque precisavas de acreditar em ti, não em mim." O Pedro entendeu.' },
              { text: 'Quer vir ao próximo jogo?', emoji: '😊', response: 'O senhor Augusto riu-se. "Eu venho a todos os jogos, rapaz. Só que tu nunca olhavas para cima."' },
            ],
          },
        },
        { text: 'O senhor Augusto contou que tinha sido avançado dos Falcões, há muitos anos. Uma lesão acabou com a sua carreira. Mas nunca deixou de amar o jogo. "Não podia correr, mas podia ensinar", disse ele.', mood: 'warm', sound: null, visual: '💛' },
        { text: 'Desde esse dia, o Pedro e o senhor Augusto encontravam-se antes de cada jogo. E o Pedro aprendeu a lição mais importante de todas: a ajuda nem sempre vem de quem esperamos. Às vezes, quem mais nos ensina é quem nos observa em silêncio, à espera do momento certo para estender a mão.', mood: 'warm', sound: 'birds', visual: '⚽', isEnding: true },
      ],
    },
  },

  // ═════════════════════════════════════════════════════════
  // DINOSSAUROS (Nível 2) — A Floresta dos Gigantes
  // Tema: coragem de explorar, respeitar a natureza
  // ═════════════════════════════════════════════════════════
  {
    id: 'giant-forest',
    level: 2,
    universes: {
      dinosaurs: { title: 'A Floresta dos Gigantes', coverEmoji: '🌿' },
    },
    scenes: {
      dinosaurs: [
        { text: 'A Sofia adorava explorar. Enquanto as outras crianças brincavam no recreio, ela desenhava mapas imaginários no caderno. Mapas de lugares que ainda ninguém tinha descoberto.', mood: 'warm', sound: null, visual: '🗺️' },
        { text: 'Num domingo de outono, a Sofia foi passear com o avô à serra. Enquanto ele descansava debaixo de um carvalho, a Sofia viu algo entre as árvores: um brilho verde, intenso, que não parecia natural.', mood: 'mysterious', sound: 'wind', visual: '✨' },
        {
          text: 'O coração da Sofia batia depressa. Olhou para o avô, que dormitava tranquilo. O brilho verde pulsava entre as árvores, como se a chamasse. Ir ou ficar?',
          mood: 'tense', sound: null, visual: '💚',
          interaction: {
            type: 'choice',
            prompt: 'A Sofia viu algo estranho na floresta. O que achas que ela deve fazer?',
            options: [
              { text: 'Ir investigar com cuidado', emoji: '🔍', response: 'A Sofia decidiu ir, devagar, sem perder o caminho de volta. A curiosidade era mais forte que o medo.' },
              { text: 'Acordar o avô primeiro', emoji: '👴', response: 'Boa ideia! Mas o brilho parecia estar a desaparecer. A Sofia decidiu ir depressa, marcando o caminho.' },
              { text: 'Ignorar e ficar', emoji: '🏠', response: 'Hmm... mas a Sofia é exploradora de coração. Não ia conseguir esquecer aquele brilho. Decidiu ir ver.' },
            ],
          },
        },
        { text: 'A Sofia seguiu o brilho por um trilho estreito entre fetos gigantes. As plantas iam ficando maiores a cada passo. Os fetos chegavam-lhe à cintura. Depois ao peito. Depois acima da cabeça.', mood: 'mysterious', sound: 'birds', visual: '🌿' },
        { text: 'De repente, o trilho acabou e a Sofia ficou de boca aberta. À sua frente estendia-se um vale escondido, cheio de plantas enormes. Árvores tão altas que pareciam tocar as nuvens. Flores do tamanho de guarda-chuvas. Era como voltar atrás no tempo, milhões de anos.', mood: 'dreamy', sound: 'birds', visual: '🌳' },
        {
          text: 'E no meio daquele vale impossível, a Sofia viu uma criatura. Era enorme — do tamanho de um autocarro — com pescoço longo e pele verde-azulada. Um dinossauro. Um dinossauro verdadeiro, a comer folhas de uma árvore gigante.',
          mood: 'mysterious', sound: null, visual: '🦕',
          interaction: {
            type: 'emotion',
            prompt: 'A Sofia está a ver um dinossauro verdadeiro. O que achas que ela está a sentir?',
            options: [
              { text: 'Espanto e maravilha', emoji: '🤩', response: 'Sim! A Sofia sente que o mundo é muito maior e mais mágico do que imaginava. É puro espanto.' },
              { text: 'Terror', emoji: '😱', response: 'O dinossauro é herbívoro e parece gentil. Mais do que medo, a Sofia sente espanto e maravilha.' },
              { text: 'Descrença', emoji: '🤔', response: 'É difícil de acreditar, sim! Mas os olhos da Sofia não mentem. E o espanto é mais forte que a dúvida.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'O dinossauro virou a cabeça lentamente e olhou para a Sofia. Tinha olhos castanhos, grandes e mansos, como os de uma vaca. Inclinou o pescoço na direção dela e soprou um ar quente pelo nariz. Não era uma ameaça. Era um olá.', mood: 'warm', sound: null, visual: '💛' },
        { text: 'A Sofia passou a tarde no vale. Observou o dinossauro comer, beber água de um riacho cristalino e deitar-se à sombra de uma árvore colossal. Reparou que o vale estava cheio de plantas que já não existiam no mundo lá fora. Era um pedaço de história viva.', mood: 'dreamy', sound: 'sea', visual: '🌺' },
        {
          text: 'Quando o sol começou a descer, a Sofia soube que tinha de voltar. Mas um pensamento pesava-lhe na mente: se contasse às pessoas, viriam cientistas, câmaras, multidões. O vale deixaria de ser seguro. O dinossauro deixaria de ser livre.',
          mood: 'tense', sound: 'wind', visual: '🤔',
          interaction: {
            type: 'choice',
            prompt: 'A Sofia tem de decidir: contar ao mundo ou guardar o segredo. O que achas que ela deve fazer?',
            options: [
              { text: 'Guardar o segredo', emoji: '🤫', response: 'A Sofia pensou o mesmo. Nem todos os tesouros precisam de ser mostrados. Alguns precisam de ser protegidos.' },
              { text: 'Contar a toda a gente', emoji: '📢', response: 'Hmm... mas se toda a gente soubesse, o vale podia ser destruído. A Sofia decidiu proteger o segredo.' },
              { text: 'Contar só ao avô', emoji: '👴', response: 'Boa escolha! O avô é de confiança. A Sofia decidiu partilhar o segredo com ele e mais ninguém.' },
            ],
          },
        },
        { text: 'A Sofia voltou pelo trilho, gravando cada passo na memória. Quando chegou ao carvalho, o avô estava a acordar. "Onde foste, pequena exploradora?", perguntou. A Sofia sorriu. "Fui descobrir um lugar especial, avô. Um dia levo-te lá."', mood: 'warm', sound: 'birds', visual: '😊' },
        {
          text: 'Nos meses seguintes, a Sofia voltou ao vale muitas vezes. O dinossauro já a reconhecia — baixava o pescoço para ela lhe tocar no focinho. Eram amigos, sem precisarem de palavras.',
          mood: 'joyful', sound: 'birds', visual: '🦕',
          interaction: {
            type: 'emotion',
            prompt: 'A Sofia tem um amigo que ninguém conhece. O que achas que ela sente quando o visita?',
            options: [
              { text: 'Responsabilidade e carinho', emoji: '🛡️', response: 'Sim! A Sofia sente que proteger o vale é a sua missão. E o carinho pelo dinossauro cresce a cada visita.' },
              { text: 'Solidão', emoji: '😢', response: 'Não, a Sofia não se sente sozinha. Tem o dinossauro e o seu segredo. Sente-se responsável e feliz.' },
              { text: 'Aborrecimento', emoji: '😒', response: 'De todo! A Sofia adora cada visita. Sente responsabilidade e um carinho profundo pelo seu amigo.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'A Sofia nunca contou o segredo do vale a mais ninguém. Porque aprendeu que a verdadeira coragem nem sempre é gritar o que sabemos — às vezes é guardar em silêncio aquilo que amamos, para que continue a existir. Há tesouros que valem mais quando protegidos do que quando mostrados ao mundo inteiro.', mood: 'warm', sound: null, visual: '🌿', isEnding: true },
      ],
    },
  },

  // ═════════════════════════════════════════════════════════
  // ESPAÇO (Nível 2) — O Planeta das Cores
  // Tema: diversidade, cada perspectiva importa
  // ═════════════════════════════════════════════════════════
  {
    id: 'color-planet',
    level: 2,
    universes: {
      space: { title: 'O Planeta das Cores', coverEmoji: '🎨' },
    },
    scenes: {
      space: [
        { text: 'A astronauta Luna viajava sozinha há meses. A sua nave, a Íris, deslizava silenciosa pelo espaço. Um dia, os sensores detectaram algo inesperado: um planeta que não estava em nenhum mapa.', mood: 'mysterious', sound: null, visual: '🚀' },
        { text: 'Quando a nave se aproximou, a Luna franziu a testa. O planeta era completamente cinzento. Não havia azul de oceanos, nem verde de florestas, nem branco de nuvens. Tudo cinzento, como um desenho a lápis antes de ser pintado.', mood: 'dreamy', sound: null, visual: '🌍' },
        {
          text: 'A Luna aterrou numa planície suave. Quando saiu da nave, o chão era cinzento, o céu era cinzento, até o ar parecia cinzento. Sentiu uma tristeza estranha, como se o mundo à sua volta estivesse incompleto.',
          mood: 'sad', sound: 'wind', visual: '🌫️',
          interaction: {
            type: 'emotion',
            prompt: 'A Luna chegou a um planeta completamente cinzento. O que achas que ela está a sentir?',
            options: [
              { text: 'Curiosidade e tristeza', emoji: '🤔', response: 'Sim. A Luna sente curiosidade pelo mistério, mas também tristeza. Um mundo sem cor parece tão vazio.' },
              { text: 'Entusiasmo', emoji: '🤩', response: 'Há curiosidade sim, mas o cinzento traz uma certa tristeza. A Luna sente que algo falta neste mundo.' },
              { text: 'Indiferença', emoji: '😐', response: 'A Luna não é indiferente. Sente curiosidade pelo mistério e tristeza pela falta de cor.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'De repente, uma figura apareceu. Tinha forma humana, mas era feita de luz suave. "Bem-vinda ao Cromia", disse a figura. "O meu nome é Rubi." Os olhos de Rubi brilhavam num vermelho intenso — a única cor em todo o planeta.', mood: 'mysterious', sound: null, visual: '🔴' },
        { text: '"Eu vejo vermelho", explicou Rubi. "Só vermelho. Quando olho para uma flor, vejo o vermelho das pétalas. Mas o resto... é cinzento para mim." A Luna ficou em silêncio, a tentar compreender.', mood: 'warm', sound: null, visual: '🌹' },
        {
          text: 'Rubi levou a Luna pela cidade. Encontraram mais habitantes: Celeste, que só via azul. Solaris, que só via amarelo. Flora, que só via verde. Cada um vivia no seu mundo de uma só cor.',
          mood: 'warm', sound: null, visual: '🏘️',
          interaction: {
            type: 'emotion',
            prompt: 'Cada habitante vê apenas uma cor. O que achas que os habitantes sentem?',
            options: [
              { text: 'Estão acostumados mas incompletos', emoji: '💭', response: 'Sim. Para eles é normal, mas sentem que falta algo. Cada um vê um pedaço da realidade, nunca o todo.' },
              { text: 'Estão felizes assim', emoji: '😊', response: 'Estão habituados, sim, mas há uma inquietação. Sabem que existe mais do que aquilo que veem.' },
              { text: 'Estão zangados', emoji: '😡', response: 'Não estão zangados. Estão habituados, mas sentem que lhes falta algo — como uma canção sem algumas notas.' },
            ],
            bestIndex: 0,
          },
        },
        { text: '"Há muito tempo, o nosso planeta tinha todas as cores", contou Celeste, com os seus olhos azuis. "Mas houve uma grande tempestade e as cores partiram-se. Cada família ficou com apenas um fragmento."', mood: 'sad', sound: 'wind', visual: '💔' },
        {
          text: 'A Luna teve uma ideia. "E se juntássemos as vossas cores? Se cada um partilhar o que vê, talvez consigam ver tudo juntos!" Os habitantes olharam uns para os outros, desconfiados. Nunca tinham tentado.',
          mood: 'warm', sound: null, visual: '💡',
          interaction: {
            type: 'choice',
            prompt: 'A Luna sugeriu que os habitantes juntem as suas cores. Como achas que devem fazer isso?',
            options: [
              { text: 'Darem as mãos e fecharem os olhos', emoji: '🤝', response: 'A Luna pensou o mesmo! Quando se ligam uns aos outros, podem partilhar o que cada um vê.' },
              { text: 'Pintarem um quadro juntos', emoji: '🎨', response: 'Bonita ideia! Mas primeiro precisam de se ligar uns aos outros. A Luna sugeriu darem as mãos.' },
              { text: 'Pedirem à Luna para descrever as cores', emoji: '🗣️', response: 'Descrever ajuda, mas não é suficiente. A Luna sugeriu algo mais poderoso: darem as mãos e partilharem o que veem.' },
            ],
          },
        },
        { text: 'Rubi, Celeste, Solaris e Flora deram as mãos num círculo. A Luna ficou no centro. "Agora fechem os olhos", disse ela. "E pensem na vossa cor com toda a força."', mood: 'dreamy', sound: null, visual: '🫂' },
        { text: 'Aconteceu devagar. Primeiro, uma luz vermelha saiu de Rubi. Depois, azul de Celeste. Amarelo de Solaris. Verde de Flora. As luzes giraram no ar, misturaram-se, fundiram-se. E de repente — cor. Cor por todo o lado!', mood: 'triumphant', sound: null, visual: '🌈' },
        {
          text: 'O céu ficou azul. A relva ficou verde. As flores ganharam vermelho, amarelo, laranja, violeta. Os habitantes abriram os olhos e, pela primeira vez, viram o mundo inteiro. Rubi viu o azul do céu e chorou. Celeste viu o verde da relva e riu. Estavam todos espantados.',
          mood: 'joyful', sound: 'birds', visual: '✨',
          interaction: {
            type: 'emotion',
            prompt: 'Os habitantes veem todas as cores pela primeira vez. O que achas que estão a sentir?',
            options: [
              { text: 'Alegria imensa', emoji: '🥹', response: 'Sim! É uma alegria que nunca sentiram. Finalmente veem o mundo como ele realmente é — cheio de cores.' },
              { text: 'Confusão', emoji: '😵', response: 'Talvez um pouco, com tantas cores novas! Mas a alegria é muito maior que a confusão.' },
              { text: 'Medo da mudança', emoji: '😨', response: 'A mudança pode assustar, mas esta é tão bonita que o medo desaparece. Sentem alegria imensa.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'A Luna sorriu e olhou para o céu colorido de Cromia. Antes de voltar à sua nave, Rubi abraçou-a. "Obrigado. Nós tínhamos as cores todas, mas cada um só via a sua. Precisámos de alguém de fora para nos lembrar de olhar juntos."', mood: 'warm', sound: null, visual: '💛' },
        { text: 'A Luna partiu naquela noite, com Cromia a brilhar atrás de si como uma joia colorida no escuro do espaço. E levou consigo a maior lição da viagem: sozinhos, vemos apenas uma parte do mundo. Juntos, vemos tudo. Cada pessoa carrega uma cor que mais ninguém tem — e é por isso que precisamos uns dos outros.', mood: 'warm', sound: null, visual: '🌈', isEnding: true },
      ],
    },
  },

  // ═════════════════════════════════════════════════════════
  // FUTEBOL (Nível 3) — O Estádio dos Sonhos
  // Tema: lidar com a pressão, o valor do esforço vs resultado
  // ═════════════════════════════════════════════════════════
  {
    id: 'dream-stadium',
    level: 3,
    universes: {
      football: { title: 'O Estádio dos Sonhos', coverEmoji: '🏟️' },
    },
    scenes: {
      football: [
        { text: 'A Mariana adorava futebol. Treinava todos os dias no quintal, com uma baliza feita de duas mochilas. Sonhava com o dia em que jogaria num estádio a sério.', mood: 'warm', sound: null, visual: '⚽' },
        { text: 'Um dia, a treinadora disse: "Mariana, foste selecionada para o torneio da cidade! Vamos jogar no Estádio Municipal." A Mariana não acreditou.', mood: 'joyful', sound: null, visual: '✨' },
        { text: 'Nos treinos, tudo corria bem. A Mariana driblava, passava, marcava. Mas a cada dia que passava, o torneio ficava mais perto e o estômago da Mariana apertava mais.', mood: 'tense', sound: null, visual: '😰' },
        {
          text: 'Na véspera do jogo, a Mariana não conseguiu dormir. Pensava: "E se eu falhar? E se fizer asneira à frente de toda a gente?"',
          mood: 'sad', sound: 'rain', visual: '🌙',
          interaction: {
            type: 'emotion',
            prompt: 'A Mariana não consegue dormir antes do grande jogo. O que achas que ela está a sentir?',
            options: [
              { text: 'Ansiedade', emoji: '😰', response: 'Sim. A Mariana tem ansiedade. É normal sentir isso antes de algo importante. O corpo reage ao medo de falhar.' },
              { text: 'Preguiça', emoji: '😴', response: 'Não é preguiça. A Mariana quer muito jogar, mas tem medo de não ser boa o suficiente.' },
              { text: 'Indiferença', emoji: '😐', response: 'A Mariana não está indiferente. Importa-se tanto que a preocupação não a deixa descansar.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'No dia do jogo, o estádio parecia enorme. Havia bancadas, luzes, um relvado verde perfeito. A Mariana olhou à volta e sentiu as pernas a tremer.', mood: 'tense', sound: null, visual: '🏟️' },
        { text: 'O jogo começou. A Mariana estava tão nervosa que errou o primeiro passe. Depois o segundo. A bola não ia para onde ela queria.', mood: 'sad', sound: null, visual: '😣' },
        {
          text: 'Ao intervalo, a treinadora sentou-se ao lado dela. "Mariana, estás a jogar para quem? Para as bancadas ou para ti?"',
          mood: 'warm', sound: null, visual: '🤔',
          interaction: {
            type: 'choice',
            prompt: 'A treinadora fez uma pergunta importante. O que achas que a Mariana deve responder?',
            options: [
              { text: '"Para as bancadas... tenho medo de desiludir."', emoji: '😟', response: 'A Mariana foi honesta. Muitas vezes jogamos para agradar aos outros em vez de jogarmos por nós.' },
              { text: '"Para mim! Eu adoro futebol!"', emoji: '😊', response: 'A Mariana lembrou-se do que importa: ela joga porque ama o jogo.' },
              { text: '"Já não sei..."', emoji: '😢', response: 'Às vezes a pressão faz-nos esquecer porque começámos. A treinadora vai ajudar a Mariana a lembrar-se.' },
            ],
          },
        },
        { text: 'A treinadora sorriu. "Lembras-te de quando treinávamos no quintal? Não havia ninguém a ver. E tu rias-te sempre. Joga assim. Joga como no quintal."', mood: 'warm', sound: null, visual: '💛' },
        { text: 'A segunda parte começou. A Mariana respirou fundo e pensou no quintal. Correu, driblou, passou. Não estava a pensar nas bancadas. Estava a divertir-se.', mood: 'joyful', sound: 'birds', visual: '⚽' },
        {
          text: 'Nos últimos minutos, a Mariana teve a bola nos pés à frente da baliza. Chutou com força... e a bola bateu no poste. Não entrou.',
          mood: 'tense', sound: null, visual: '😮',
          interaction: {
            type: 'emotion',
            prompt: 'A Mariana falhou o golo no último minuto. O que achas que ela está a sentir?',
            options: [
              { text: 'Desiludida, mas orgulhosa', emoji: '🥹', response: 'Exactamente. Dói falhar, mas a Mariana sabe que deu tudo. E isso é o mais importante.' },
              { text: 'Furiosa consigo mesma', emoji: '😡', response: 'Talvez um pouco, mas a Mariana aprendeu algo hoje: o resultado não define o esforço.' },
              { text: 'Indiferente', emoji: '😐', response: 'A Mariana importa-se, sim. Mas aprendeu que dar o melhor é mais importante do que o resultado.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'A equipa perdeu por 1-0. Mas quando a Mariana saiu do campo, a treinadora abraçou-a. "Na segunda parte, jogaste o melhor futebol que já te vi jogar."', mood: 'warm', sound: null, visual: '🤗' },
        { text: 'Naquela noite, a Mariana dormiu como um bebé. Não tinha ganho o jogo, mas tinha ganho algo maior: a certeza de que o importante não é ser perfeita, mas ser verdadeira.', mood: 'warm', sound: null, visual: '⭐', isEnding: true },
      ],
    },
  },

  // ═════════════════════════════════════════════════════════
  // DINOSSAUROS (Nível 3) — O Mapa dos Ossos
  // Tema: paciência, descoberta, valor do processo
  // ═════════════════════════════════════════════════════════
  {
    id: 'bone-map',
    level: 3,
    universes: {
      dinosaurs: { title: 'O Mapa dos Ossos', coverEmoji: '🗺️' },
    },
    scenes: {
      dinosaurs: [
        { text: 'A avó da Mafalda tinha sido paleontóloga — alguém que estuda ossos de dinossauros. Quando morreu, deixou à Mafalda uma caixa de madeira com um mapa antigo dentro.', mood: 'warm', sound: null, visual: '📦' },
        { text: 'O mapa mostrava um lugar na serra, com um X vermelho e uma nota: "Aqui dorme algo maravilhoso. Tem paciência, Mafalda."', mood: 'mysterious', sound: null, visual: '🗺️' },
        { text: 'No sábado seguinte, a Mafalda e o pai foram à serra. Levavam pás, pincéis, e o mapa. O X ficava perto de umas rochas grandes, junto a um ribeiro.', mood: 'joyful', sound: 'birds', visual: '🏔️' },
        {
          text: 'Escavaram durante uma hora. Nada. Duas horas. Nada. A Mafalda estava a ficar cansada e frustrada. "Se calhar o mapa está errado", disse.',
          mood: 'sad', sound: null, visual: '😤',
          interaction: {
            type: 'emotion',
            prompt: 'A Mafalda está frustrada depois de escavar sem encontrar nada. O que achas que ela está a sentir?',
            options: [
              { text: 'Frustração e dúvida', emoji: '😤', response: 'Sim. Quando trabalhamos muito e não vemos resultado, é normal sentir frustração. A paciência é difícil.' },
              { text: 'Raiva da avó', emoji: '😡', response: 'A Mafalda não está zangada com a avó. Está frustrada com a espera. A paciência é das coisas mais difíceis.' },
              { text: 'Tédio', emoji: '😒', response: 'Mais do que tédio, é frustração. A Mafalda quer muito encontrar algo, mas a espera é difícil.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'O pai sentou-se ao lado dela. "A tua avó passava semanas a escavar sem encontrar nada. Sabes o que ela dizia? Que a terra fala, mas fala devagar."', mood: 'warm', sound: 'wind', visual: '👨' },
        {
          text: 'A Mafalda olhou para o mapa outra vez. Depois olhou para a terra. Podia ir embora ou podia continuar.',
          mood: 'mysterious', sound: null, visual: '🤔',
          interaction: {
            type: 'choice',
            prompt: 'A Mafalda está cansada. O que achas que ela deve fazer?',
            options: [
              { text: 'Continuar com calma', emoji: '🧘', response: 'A Mafalda respirou fundo e pegou no pincel. Com calma, sem pressa.' },
              { text: 'Ir embora e voltar outro dia', emoji: '🏠', response: 'Descansar também é importante. Mas a Mafalda decidiu tentar mais um bocadinho.' },
              { text: 'Cavar mais rápido', emoji: '⛏️', response: 'Hmm... a pressa pode estragar o que está escondido. A avó dizia: "com calma." A Mafalda decidiu abrandar.' },
            ],
          },
        },
        { text: 'A Mafalda pegou num pincel pequeno e começou a limpar a terra com cuidado. Grão por grão. De repente, o pincel bateu em algo duro. Não era uma pedra.', mood: 'mysterious', sound: null, visual: '🪥' },
        { text: 'Com muito cuidado, a Mafalda limpou à volta. Apareceu uma forma curva, castanha, lisa. Um osso! Um osso verdadeiro, antigo, de milhões de anos!', mood: 'triumphant', sound: null, visual: '🦴' },
        {
          text: 'A Mafalda ficou a olhar para o osso com os olhos a brilhar. Tocou-lhe com a ponta dos dedos, como se fosse o objeto mais precioso do mundo.',
          mood: 'joyful', sound: 'birds', visual: '✨',
          interaction: {
            type: 'emotion',
            prompt: 'A Mafalda encontrou o osso de dinossauro. O que achas que ela está a sentir?',
            options: [
              { text: 'Admiração e ligação à avó', emoji: '🥹', response: 'Sim! A Mafalda sente que a avó lhe deixou algo mais do que um osso — deixou-lhe uma lição.' },
              { text: 'Vontade de vender o osso', emoji: '💰', response: 'Não. Para a Mafalda, este osso vale mais do que dinheiro. É a ligação com a avó.' },
              { text: 'Alívio por ter acabado', emoji: '😮‍💨', response: 'Alívio sim, mas muito mais do que isso. A Mafalda sente admiração e ligação com a avó.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'O pai tirou uma fotografia da Mafalda com o osso. Tinha exactamente o mesmo sorriso da avó. "Ela estaria orgulhosa de ti", disse.', mood: 'warm', sound: null, visual: '📸' },
        { text: 'No caminho de volta, a Mafalda segurava a caixa da avó contra o peito. Lá dentro, ao lado do mapa, pôs o pincel. Porque aprendeu que as coisas mais bonitas da vida não se encontram à pressa. Encontram-se grão a grão.', mood: 'warm', sound: null, visual: '💛', isEnding: true },
      ],
    },
  },

  // ═════════════════════════════════════════════════════════
  // ESPAÇO (Nível 3) — A Mensagem do Outro Lado
  // Tema: comunicação, empatia, entender o diferente
  // ═════════════════════════════════════════════════════════
  {
    id: 'message-beyond',
    level: 3,
    universes: {
      space: { title: 'A Mensagem do Outro Lado', coverEmoji: '📡' },
    },
    scenes: {
      space: [
        { text: 'Na estação espacial Horizonte, a astronauta Vera trabalhava sozinha. Monitorizava sinais do espaço profundo. A maioria era ruído — o murmúrio do universo.', mood: 'dreamy', sound: null, visual: '🛸' },
        { text: 'Mas uma noite, um sinal diferente apareceu no ecrã. Não era ruído. Tinha um padrão. Repetia-se: três pulsos, pausa, três pulsos, pausa.', mood: 'mysterious', sound: null, visual: '📡' },
        { text: 'Vera sentou-se direita na cadeira. O coração batia depressa. Alguém — ou algo — estava a enviar uma mensagem.', mood: 'tense', sound: null, visual: '💓' },
        {
          text: 'Vera olhou para o botão de resposta. Devia responder? E se fosse perigoso? E se fosse algo maravilhoso?',
          mood: 'mysterious', sound: null, visual: '🤔',
          interaction: {
            type: 'choice',
            prompt: 'Vera recebeu um sinal misterioso do espaço. O que achas que ela deve fazer?',
            options: [
              { text: 'Responder com o mesmo padrão', emoji: '📡', response: 'Vera repetiu o padrão: três pulsos, pausa. Uma forma de dizer "Estou aqui. Ouvi-te."' },
              { text: 'Ignorar e avisar a Terra', emoji: '🌍', response: 'Prudente, mas Vera sentiu que devia responder primeiro. Repetiu o padrão: "Ouvi-te."' },
              { text: 'Esperar para ver se se repete', emoji: '⏳', response: 'Vera esperou um pouco. O sinal repetiu-se. Então respondeu com o mesmo padrão.' },
            ],
          },
        },
        { text: 'Vera enviou a resposta. Depois esperou. Minutos passaram. De repente, um novo padrão: cinco pulsos, pausa, dois pulsos. Diferente. A mensagem estava a mudar.', mood: 'mysterious', sound: null, visual: '✨' },
        { text: 'Durante dias, Vera e o sinal trocaram padrões. Primeiro números simples. Depois formas. Depois algo que parecia... emoções. Pulsos rápidos para excitação. Pulsos lentos para calma.', mood: 'warm', sound: null, visual: '💫' },
        {
          text: 'Vera apercebeu-se de algo extraordinário: não estava a comunicar com uma máquina. Estava a comunicar com alguém que sentia. Alguém tão diferente dela que não tinha palavras — mas que sentia as mesmas coisas.',
          mood: 'joyful', sound: null, visual: '💛',
          interaction: {
            type: 'emotion',
            prompt: 'Vera percebeu que está a comunicar com um ser que sente emoções. O que achas que ela está a sentir?',
            options: [
              { text: 'Maravilhada e emocionada', emoji: '🤩', response: 'Sim! Descobrir que não estamos sozinhos — que alguém sente como nós, mesmo sendo tão diferente — é extraordinário.' },
              { text: 'Assustada', emoji: '😨', response: 'Talvez um pouco, mas o maravilhamento é mais forte. Alguém sente como ela, mesmo do outro lado do universo.' },
              { text: 'Confusa', emoji: '🤔', response: 'É confuso sim, mas acima de tudo é maravilhoso. Não estamos sozinhos.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Um dia, o sinal ficou mais fraco. Os pulsos abrandaram. Como alguém a despedir-se.', mood: 'sad', sound: null, visual: '😢' },
        {
          text: 'Vera enviou os pulsos mais gentis que conseguiu. Lentos, regulares, como um abraço feito de luz.',
          mood: 'warm', sound: null, visual: '🫂',
          interaction: {
            type: 'emotion',
            prompt: 'O sinal está a desaparecer. Vera está a despedir-se. O que achas que ela está a sentir?',
            options: [
              { text: 'Triste mas grata', emoji: '🥹', response: 'Sim. Despedidas são tristes, mas Vera sabe que viveu algo que ninguém mais viveu. E isso é um presente.' },
              { text: 'Desesperada', emoji: '😭', response: 'É triste, mas Vera aprendeu algo precioso: a ligação que tiveram vai ficar com ela para sempre.' },
              { text: 'Aliviada', emoji: '😮‍💨', response: 'Não. Vera está triste por perder este amigo. Mas está grata por tudo o que partilharam.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'O último pulso chegou. Depois, silêncio. Vera ficou sentada no escuro, a ouvir o murmúrio do universo. Mas agora, o murmúrio já não era ruído. Era música.', mood: 'dreamy', sound: null, visual: '🌌' },
        { text: 'Vera nunca contou a ninguém. Não porque fosse segredo, mas porque algumas experiências vivem melhor no coração. Aprendeu que para comunicar de verdade, não precisamos da mesma língua. Precisamos de querer ouvir.', mood: 'warm', sound: null, visual: '💫', isEnding: true },
      ],
    },
  },

  // ═════════════════════════════════════════════════════════
  // ANIMAIS (Nível 3) — A Baleia que Cantava Diferente
  // Tema: solidão, encontrar a sua comunidade, ser ouvido
  // ═════════════════════════════════════════════════════════
  {
    id: 'whale-song',
    level: 3,
    universes: {
      animals: { title: 'A Baleia que Cantava Diferente', coverEmoji: '🐋' },
    },
    scenes: {
      animals: [
        { text: 'No fundo do oceano, vivia uma baleia chamada Ondina. Tinha o corpo azul-escuro, olhos gentis, e uma cauda enorme. Mas Ondina tinha um problema.', mood: 'warm', sound: 'sea', visual: '🐋' },
        { text: 'Quando cantava, a sua voz saía num tom diferente de todas as outras baleias. As outras cantavam grave e lento. A Ondina cantava agudo e rápido.', mood: 'sad', sound: null, visual: '🎵' },
        { text: 'As outras baleias não a ouviam. Passavam por ela sem parar. A Ondina cantava e cantava, mas ninguém respondia. Era como falar para o vazio.', mood: 'sad', sound: null, visual: '😢' },
        {
          text: 'Ondina começou a nadar sozinha, em silêncio. Pensava: "Se ninguém me ouve, para que é que eu canto?"',
          mood: 'sad', sound: 'sea', visual: '🌊',
          interaction: {
            type: 'emotion',
            prompt: 'Ninguém ouve o canto da Ondina. O que achas que ela está a sentir?',
            options: [
              { text: 'Solidão profunda', emoji: '😢', response: 'Sim. A Ondina sente uma solidão imensa. Quer ser ouvida, mas a sua voz é diferente.' },
              { text: 'Raiva das outras baleias', emoji: '😡', response: 'Talvez um pouco, mas mais do que raiva, a Ondina sente solidão. Quer pertencer.' },
              { text: 'Indiferença', emoji: '😐', response: 'A Ondina importa-se, e muito. Sente solidão porque o que mais quer é ser ouvida.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Um dia, enquanto nadava perto da superfície, Ondina ouviu algo. Não era uma baleia. Era um som estranho, metálico, vindo de um barco. Um som repetitivo, como um chamamento.', mood: 'mysterious', sound: null, visual: '🚢' },
        { text: 'Era uma cientista chamada Clara, que estudava sons do oceano. O microfone dela captou o canto da Ondina. Clara ficou espantada: "Esta baleia canta num tom que nunca ouvi!"', mood: 'joyful', sound: null, visual: '🎧' },
        {
          text: 'Clara transmitiu o canto da Ondina pelo altifalante, para o oceano. E algo incrível aconteceu. De muito longe, veio uma resposta. Outra voz, no mesmo tom da Ondina.',
          mood: 'triumphant', sound: 'sea', visual: '✨',
          interaction: {
            type: 'emotion',
            prompt: 'Ondina ouviu alguém a responder-lhe pela primeira vez. O que achas que ela está a sentir?',
            options: [
              { text: 'Alegria e esperança', emoji: '🤩', response: 'Sim! Pela primeira vez, alguém respondeu. Ondina não é a única. Há mais alguém como ela!' },
              { text: 'Desconfiança', emoji: '🤔', response: 'Talvez um instante de dúvida, mas a alegria é mais forte. Alguém a ouviu!' },
              { text: 'Medo', emoji: '😨', response: 'Não. A Ondina sente o contrário do medo. Sente esperança e alegria.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Ondina nadou na direcção da voz. Nadou durante dias. E ao terceiro dia, encontrou outra baleia. Uma baleia cinzenta, mais pequena, com olhos brilhantes. Cantava no mesmo tom.', mood: 'joyful', sound: 'sea', visual: '🐋' },
        {
          text: 'As duas baleias cantaram juntas. O som ecoou pelo oceano inteiro. Não era o canto mais bonito do mar. Mas era o mais verdadeiro.',
          mood: 'warm', sound: null, visual: '🎶',
          interaction: {
            type: 'choice',
            prompt: 'Ondina encontrou outra baleia que canta como ela. O que achas que aprendemos com isto?',
            options: [
              { text: 'Há sempre alguém que nos entende', emoji: '💛', response: 'Exactamente. Mesmo quando nos sentimos sozinhos, há alguém no mundo que fala a nossa língua.' },
              { text: 'Devemos mudar para ser iguais', emoji: '🔄', response: 'Não! A Ondina não mudou. Continuou a cantar à sua maneira e encontrou quem a entende.' },
              { text: 'É melhor ficar sozinho', emoji: '🏝️', response: 'Não. A Ondina estava triste sozinha. Encontrar alguém que nos entende faz toda a diferença.' },
            ],
          },
        },
        { text: 'E a Ondina nunca mais nadou em silêncio. Cantava todos os dias, alto e claro, no seu tom especial. Porque aprendeu que não precisamos de ser ouvidos por todos. Basta ser ouvido por alguém.', mood: 'warm', sound: 'sea', visual: '🐋', isEnding: true },
      ],
    },
  },

  // ═════════════════════════════════════════════════════════
  // MÚSICA (Nível 3) — A Orquestra dos Diferentes
  // Tema: inclusão, cada contribuição importa
  // ═════════════════════════════════════════════════════════
  {
    id: 'different-orchestra',
    level: 3,
    universes: {
      music: { title: 'A Orquestra dos Diferentes', coverEmoji: '🎻' },
    },
    scenes: {
      music: [
        { text: 'Na escola de música da vila, todos os alunos tocavam instrumentos normais: piano, violino, flauta. Mas a nova professora, Dona Melodia, tinha ideias diferentes.', mood: 'warm', sound: null, visual: '🎵' },
        { text: '"Esta semana vamos criar uma orquestra", disse ela. "Mas não podem usar instrumentos normais. Têm de encontrar os vossos próprios sons."', mood: 'joyful', sound: null, visual: '👩‍🏫' },
        { text: 'Os alunos ficaram confusos. O André trouxe dois paus. A Sofia trouxe um balde velho. O Tomé trouxe folhas secas. A Lia trouxe... nada. Tinha as mãos vazias.', mood: 'mysterious', sound: null, visual: '🤷' },
        {
          text: '"Eu não encontrei nenhum som", disse a Lia, envergonhada. "Tentei, mas nada soava bem."',
          mood: 'sad', sound: null, visual: '😞',
          interaction: {
            type: 'emotion',
            prompt: 'A Lia não encontrou um instrumento e sente-se envergonhada. O que achas que ela está a sentir?',
            options: [
              { text: 'Vergonha e medo de não pertencer', emoji: '😳', response: 'Sim. A Lia quer participar, mas tem medo de não ter nada para oferecer.' },
              { text: 'Preguiça', emoji: '😴', response: 'Não é preguiça! A Lia tentou. Às vezes é difícil encontrar o nosso lugar.' },
              { text: 'Indiferença', emoji: '😐', response: 'A Lia importa-se muito. Está envergonhada porque quer participar mas não sabe como.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'Dona Melodia sorriu. "Lia, o teu corpo é um instrumento. Podes bater palmas, estalar os dedos, bater os pés no chão, ou até fazer sons com a boca."', mood: 'warm', sound: null, visual: '👏' },
        { text: 'Começaram a ensaiar. O André batia os paus: tac-tac-tac! A Sofia tamboritava no balde: bum-bum! O Tomé amachucava folhas: crush-crush! E a Lia? Batia palmas no ritmo.', mood: 'joyful', sound: null, visual: '🎶' },
        {
          text: 'Mas os sons não combinavam. Cada um tocava no seu ritmo. Era uma confusão. O André ficou frustrado. "Isto não funciona! Cada um faz uma coisa diferente!"',
          mood: 'tense', sound: null, visual: '😤',
          interaction: {
            type: 'choice',
            prompt: 'Os sons não combinam e o André está frustrado. O que achas que devem fazer?',
            options: [
              { text: 'Ouvir uns aos outros antes de tocar', emoji: '👂', response: 'Exactamente! A chave é ouvir. Quando cada um ouve os outros, os sons começam a encaixar.' },
              { text: 'Desistir porque não funciona', emoji: '🙅', response: 'Hmm... coisas novas demoram a funcionar. A solução é ouvirem-se uns aos outros.' },
              { text: 'Que só um toque de cada vez', emoji: '☝️', response: 'Isso é um começo! Mas o objectivo é tocarem juntos. A chave é ouvirem-se uns aos outros.' },
            ],
          },
        },
        { text: 'Dona Melodia pediu silêncio. "Agora, a Lia vai bater palmas. Só a Lia. Ouçam." Plap... plap... plap. Um ritmo simples e constante, como um coração.', mood: 'warm', sound: null, visual: '💓' },
        { text: '"André, junta os teus paus ao ritmo da Lia." Tac-tac... tac-tac. "Sofia, agora tu." Bum... bum. Um a um, cada som encontrou o seu lugar.', mood: 'joyful', sound: null, visual: '🎵' },
        {
          text: 'E de repente, a sala encheu-se de música. Não era perfeita, mas era real. Era deles. A Lia, que pensava que não tinha nada para oferecer, era o coração de tudo.',
          mood: 'triumphant', sound: null, visual: '✨',
          interaction: {
            type: 'emotion',
            prompt: 'A Lia, que veio de mãos vazias, tornou-se o coração da orquestra. O que achas que ela está a sentir?',
            options: [
              { text: 'Orgulho e pertença', emoji: '🥹', response: 'Sim! A Lia descobriu que tinha algo valioso para dar. Às vezes o mais simples é o mais importante.' },
              { text: 'Surpresa', emoji: '😮', response: 'Surpresa sim, mas também orgulho. A Lia encontrou o seu lugar.' },
              { text: 'Nada de especial', emoji: '😐', response: 'A Lia sente muito! Descobriu que tinha algo para oferecer, mesmo de mãos vazias.' },
            ],
            bestIndex: 0,
          },
        },
        { text: 'No concerto da escola, a orquestra dos diferentes tocou. Ninguém tinha ouvido nada assim. Era estranho, era novo, era lindo. E a Lia batia palmas no centro de tudo.', mood: 'joyful', sound: null, visual: '👏' },
        { text: 'Naquela noite, o André disse à Lia: "Sabes, tu eras a peça que faltava." A Lia sorriu. Porque aprendeu que não precisamos de ser extraordinários para fazer parte de algo extraordinário. Basta estarmos presentes.', mood: 'warm', sound: null, visual: '💛', isEnding: true },
      ],
    },
  },
]

/**
 * Get a story for a specific universe.
 * Returns null if the story has no scenes for that universe.
 */
export function getStory(storyId, universeId = 'football') {
  const story = STORIES.find((s) => s.id === storyId)
  if (!story) return null

  const uid = universeId || 'football'
  const scenes = story.scenes[uid]
  if (!scenes) return null

  const meta = story.universes[uid]
  return {
    id: story.id,
    level: story.level,
    title: meta?.title || story.id,
    coverEmoji: meta?.coverEmoji || '📖',
    scenes,
  }
}

/**
 * Get all stories that have scenes for a given universe, sorted by level.
 */
export function getStoriesForUniverse(universeId = 'football') {
  const uid = universeId || 'football'
  return STORIES
    .filter((s) => s.scenes[uid])
    .map((s) => {
      const meta = s.universes[uid]
      return {
        id: s.id,
        level: s.level,
        title: meta?.title || s.id,
        coverEmoji: meta?.coverEmoji || '📖',
      }
    })
    .sort((a, b) => a.level - b.level)
}
