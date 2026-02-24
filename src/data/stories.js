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
