/**
 * Stories for Contos Vivos — Campo 7 (A Biblioteca).
 *
 * Each story has scenes narrated by TTS, with mood-based visuals,
 * ambient sounds, and interactive moments (emotion + choice).
 *
 * Universes: each story is written per universe — not templated,
 * so writers have full control over the prose.
 *
 * To add a new story:
 * 1. Add an entry to STORIES with a unique id
 * 2. Write scenes for each universe (or start with one)
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
  {
    id: 'the-dream',
    level: 1,
    universes: {
      football:  { title: 'A Bola que Sonhava',    coverEmoji: '⚽' },
      dinosaurs: { title: 'O Ovo que Sonhava',      coverEmoji: '🥚' },
      space:     { title: 'A Estrela que Sonhava',   coverEmoji: '⭐' },
      animals:   { title: 'A Pena que Sonhava',      coverEmoji: '🪶' },
      music:     { title: 'A Nota que Sonhava',      coverEmoji: '🎵' },
    },
    scenes: {
      // ═══════════════════════════════════════════════════════
      // FUTEBOL — A Bola que Sonhava
      // ═══════════════════════════════════════════════════════
      football: [
        {
          text: 'Dentro de uma velha caixa de brinquedos, no fundo de um armário esquecido, vivia uma bola. Não era uma bola qualquer — era uma bola que sonhava.',
          mood: 'warm',
          sound: null,
          visual: '⚽',
        },
        {
          text: 'Todas as noites, quando a casa ficava em silêncio, a bola sonhava que voava. Sonhava que um jogador a chutava tão alto, tão alto, que ela tocava nas nuvens.',
          mood: 'dreamy',
          sound: null,
          visual: '☁️',
        },
        {
          text: 'Num sábado de manhã, um menino chamado Tomás abriu o armário à procura de algo para brincar. Os seus olhos brilharam. "Uma bola!", disse ele, com um sorriso enorme.',
          mood: 'joyful',
          sound: 'birds',
          visual: '✨',
        },
        {
          text: 'Tomás levou a bola para o parque. Chutou-a alto. Muito alto! A bola girou no ar e pensou: "Isto é melhor do que qualquer sonho!"',
          mood: 'joyful',
          sound: null,
          visual: '🎉',
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
        {
          text: 'Mas de repente, uma rajada de vento forte levou a bola para longe. Rolou, rolou, rolou... até cair no rio. A água levou-a, cada vez mais longe.',
          mood: 'tense',
          sound: 'wind',
          visual: '🌊',
        },
        {
          text: 'Tomás correu pela margem do rio, mas a bola já não se via. Sentou-se na relva molhada e baixou a cabeça.',
          mood: 'sad',
          sound: 'rain',
          visual: '😢',
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
          mood: 'mysterious',
          sound: null,
          visual: '🤔',
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
        {
          text: 'Tomás levantou-se e seguiu o rio. O caminho era longo. As árvores pareciam sussurrar segredos e as sombras dançavam no chão.',
          mood: 'mysterious',
          sound: 'wind',
          visual: '🌲',
        },
        {
          text: 'De repente, ouviu um som. Plash, plash! Olhou para o rio e viu — a bola! Estava presa entre duas pedras grandes. E em cima dela, sentado como um rei no trono, estava um sapo verde.',
          mood: 'triumphant',
          sound: 'birds',
          visual: '🐸',
        },
        {
          text: 'O sapo olhou para o Tomás. O Tomás olhou para o sapo. Ficaram ali, em silêncio, como se se entendessem sem palavras.',
          mood: 'warm',
          sound: null,
          visual: '👀',
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
        {
          text: '"Com licença, senhor sapo", disse o Tomás com cuidado. O sapo saltou para uma pedra ao lado. Plop! Como se dissesse: "Toma lá, é tua."',
          mood: 'joyful',
          sound: null,
          visual: '🐸',
        },
        {
          text: 'Tomás pegou na bola, limpou-a com a camisola e abraçou-a contra o peito. No caminho de volta para casa, ia a sorrir.',
          mood: 'warm',
          sound: 'birds',
          visual: '💛',
        },
        {
          text: 'E a bola? A bola ia feliz, quentinha nos braços do Tomás. Pensou: "Já não preciso de sonhar. Encontrei o meu jogador."',
          mood: 'warm',
          sound: null,
          visual: '⚽',
          isEnding: true,
        },
      ],

      // ═══════════════════════════════════════════════════════
      // DINOSSAUROS — O Ovo que Sonhava
      // ═══════════════════════════════════════════════════════
      dinosaurs: [
        {
          text: 'No fundo de uma gruta antiga, coberto por camadas de poeira e tempo, vivia um ovo. Não era um ovo qualquer — era um ovo que sonhava.',
          mood: 'warm',
          sound: null,
          visual: '🥚',
        },
        {
          text: 'Todas as noites, o ovo sonhava que rachava. Sonhava que um dia ia nascer, abrir os olhos e ver o sol pela primeira vez.',
          mood: 'dreamy',
          sound: null,
          visual: '☀️',
        },
        {
          text: 'Numa manhã quente, uma exploradora chamada Marta entrou na gruta. Os seus olhos brilharam quando viu o ovo. "Um ovo de dinossauro!", disse ela, maravilhada.',
          mood: 'joyful',
          sound: 'birds',
          visual: '✨',
        },
        {
          text: 'Marta pegou no ovo com cuidado e levou-o para o acampamento. Embrulhou-o num pano macio. O ovo pensou: "Alguém me encontrou!"',
          mood: 'joyful',
          sound: null,
          visual: '🎉',
          interaction: {
            type: 'emotion',
            prompt: 'A Marta encontrou o ovo. O que achas que o ovo está a sentir?',
            options: [
              { text: 'Feliz', emoji: '😊', response: 'Sim! O ovo está radiante. Depois de tanto tempo sozinho, alguém o encontrou!' },
              { text: 'Triste', emoji: '😢', response: 'Na verdade, o ovo está feliz! Finalmente alguém o encontrou depois de tanto tempo.' },
              { text: 'Assustado', emoji: '😨', response: 'Não, o ovo sente-se seguro com a Marta. Está feliz!' },
            ],
            bestIndex: 0,
          },
        },
        {
          text: 'Mas uma tempestade terrível caiu sobre o acampamento. O vento levou o ovo pelo ar e ele rolou pela encosta abaixo, até desaparecer na selva espessa.',
          mood: 'tense',
          sound: 'wind',
          visual: '🌪️',
        },
        {
          text: 'Marta correu atrás do ovo, mas a selva era densa e escura. Sentou-se numa pedra e olhou para as árvores gigantes à sua volta.',
          mood: 'sad',
          sound: 'rain',
          visual: '😢',
          interaction: {
            type: 'emotion',
            prompt: 'A Marta perdeu o ovo. O que achas que ela está a sentir?',
            options: [
              { text: 'Triste', emoji: '😢', response: 'Sim, a Marta está muito triste. Sentia-se responsável por aquele ovo.' },
              { text: 'Feliz', emoji: '😊', response: 'Não... a Marta está triste. Perdeu o ovo que tinha prometido proteger.' },
              { text: 'Zangada', emoji: '😡', response: 'Talvez com a tempestade, mas acima de tudo sente tristeza e preocupação.' },
            ],
            bestIndex: 0,
          },
        },
        {
          text: 'A Marta olhou para os dois caminhos à sua frente. Um levava para o vale, o outro para o rio.',
          mood: 'mysterious',
          sound: null,
          visual: '🤔',
          interaction: {
            type: 'choice',
            prompt: 'O que achas que a Marta deve fazer?',
            options: [
              { text: 'Ir à procura', emoji: '🔍', response: 'Boa escolha! A Marta também decidiu isso. Não ia abandonar o ovo.' },
              { text: 'Voltar ao acampamento', emoji: '⛺', response: 'Hm... mas o ovo precisa dela. A Marta decidiu ir à procura!' },
              { text: 'Pedir ajuda', emoji: '🤝', response: 'Boa ideia, mas a equipa está longe. A Marta foi ela mesma — com coragem.' },
            ],
          },
        },
        {
          text: 'Marta caminhou pela selva. As folhas enormes tapavam o céu e sons estranhos vinham de todo o lado.',
          mood: 'mysterious',
          sound: 'wind',
          visual: '🌿',
        },
        {
          text: 'De repente, viu algo brilhar entre as raízes de uma árvore gigante. Era o ovo! E ao lado dele, uma iguana enorme olhava para ela com curiosidade.',
          mood: 'triumphant',
          sound: 'birds',
          visual: '🦎',
        },
        {
          text: 'A iguana olhou para a Marta. A Marta olhou para a iguana. Ficaram ali, em silêncio, como se se entendessem sem palavras.',
          mood: 'warm',
          sound: null,
          visual: '👀',
          interaction: {
            type: 'emotion',
            prompt: 'A Marta encontrou o ovo! O que achas que ela sentiu?',
            options: [
              { text: 'Alívio e alegria', emoji: '😮‍💨', response: 'Exactamente! Uma mistura de alívio e alegria. O ovo estava a salvo!' },
              { text: 'Medo da iguana', emoji: '😨', response: 'A iguana parece amigável! A Marta sentiu alívio e alegria.' },
              { text: 'Indiferença', emoji: '😐', response: 'Não — a Marta ficou muito contente! Caminhou tanto para o encontrar.' },
            ],
            bestIndex: 0,
          },
        },
        {
          text: '"Obrigada por cuidares dele", sussurrou a Marta. A iguana piscou um olho e desapareceu entre as folhas.',
          mood: 'joyful',
          sound: null,
          visual: '🦎',
        },
        {
          text: 'Marta pegou no ovo, embrulhou-o no casaco e começou o caminho de volta. Ia a sorrir.',
          mood: 'warm',
          sound: 'birds',
          visual: '💛',
        },
        {
          text: 'E o ovo? O ovo ia quentinho nos braços da Marta. Pensou: "Já não preciso de sonhar. Encontrei a minha exploradora."',
          mood: 'warm',
          sound: null,
          visual: '🥚',
          isEnding: true,
        },
      ],

      // ═══════════════════════════════════════════════════════
      // ESPAÇO — A Estrela que Sonhava
      // ═══════════════════════════════════════════════════════
      space: [
        {
          text: 'Num canto esquecido de uma galáxia distante, brilhava uma pequena estrela. Não era uma estrela qualquer — era uma estrela que sonhava.',
          mood: 'warm',
          sound: null,
          visual: '⭐',
        },
        {
          text: 'Todas as noites, enquanto as outras estrelas dormiam, ela sonhava que alguém a olhava. Que uma astronauta apontava o telescópio para ela e dizia: "Ali está ela!"',
          mood: 'dreamy',
          sound: null,
          visual: '🔭',
        },
        {
          text: 'Um dia, uma astronauta chamada Luna viajava pelo espaço na sua nave. Olhou pela janela e viu a pequena estrela. "Que linda!", disse ela, com os olhos a brilhar.',
          mood: 'joyful',
          sound: 'birds',
          visual: '✨',
        },
        {
          text: 'Luna marcou a estrela no seu mapa estelar. A estrela tremeu de felicidade — alguém a tinha visto! Pensou: "Sou mais do que um pontinho no céu!"',
          mood: 'joyful',
          sound: null,
          visual: '🎉',
          interaction: {
            type: 'emotion',
            prompt: 'A Luna viu a estrela. O que achas que a estrela está a sentir?',
            options: [
              { text: 'Feliz', emoji: '😊', response: 'Sim! A estrela está radiante. Finalmente alguém a viu no meio de milhões!' },
              { text: 'Triste', emoji: '😢', response: 'Na verdade, a estrela está muito feliz! Alguém reparou nela!' },
              { text: 'Assustada', emoji: '😨', response: 'Não — a estrela está feliz! Ser vista era tudo o que ela queria.' },
            ],
            bestIndex: 0,
          },
        },
        {
          text: 'Mas uma tempestade de asteróides atingiu a nave da Luna. O mapa estelar voou pela escotilha e perdeu-se no espaço negro.',
          mood: 'tense',
          sound: 'wind',
          visual: '☄️',
        },
        {
          text: 'Luna reparou a nave, mas o mapa tinha desaparecido. Sem ele, não sabia como voltar a encontrar a estrela. Sentou-se no cockpit e suspirou.',
          mood: 'sad',
          sound: 'rain',
          visual: '😢',
          interaction: {
            type: 'emotion',
            prompt: 'A Luna perdeu o mapa da estrela. O que achas que ela está a sentir?',
            options: [
              { text: 'Triste', emoji: '😢', response: 'Sim, a Luna está triste. Tinha acabado de encontrar algo especial e já o perdeu.' },
              { text: 'Feliz', emoji: '😊', response: 'Não... a Luna está triste. Perdeu o caminho para a sua estrela.' },
              { text: 'Zangada', emoji: '😡', response: 'Talvez com os asteróides, mas o que mais sente é tristeza.' },
            ],
            bestIndex: 0,
          },
        },
        {
          text: 'Luna olhou para o espaço infinito. Podia voltar à base e desistir. Ou podia voar à procura da estrela, mesmo sem mapa.',
          mood: 'mysterious',
          sound: null,
          visual: '🤔',
          interaction: {
            type: 'choice',
            prompt: 'O que achas que a Luna deve fazer?',
            options: [
              { text: 'Ir à procura', emoji: '🔍', response: 'Boa escolha! A Luna também decidiu isso. Uma astronauta nunca desiste.' },
              { text: 'Voltar à base', emoji: '🚀', response: 'Hm... mas a estrela é especial. A Luna decidiu ir à procura!' },
              { text: 'Pedir ajuda', emoji: '🤝', response: 'Boa ideia! Mas está longe de tudo. A Luna foi ela mesma — com coragem.' },
            ],
          },
        },
        {
          text: 'Luna voou entre nebulosas coloridas e campos de asteróides. O espaço era imenso e silencioso, mas ela não tinha medo.',
          mood: 'mysterious',
          sound: 'wind',
          visual: '🌌',
        },
        {
          text: 'De repente, viu uma luz a piscar. Pisca, pisca! Era a sua estrela! E à volta dela, flutuava o mapa, preso numa nuvem de poeira cósmica. Uma pequena criatura alienigena segurava-o com as suas mãos minúsculas.',
          mood: 'triumphant',
          sound: 'birds',
          visual: '👾',
        },
        {
          text: 'A criatura olhou para a Luna. A Luna olhou para a criatura. Ficaram ali, no silêncio do espaço, como se se entendessem sem palavras.',
          mood: 'warm',
          sound: null,
          visual: '👀',
          interaction: {
            type: 'emotion',
            prompt: 'A Luna encontrou a estrela! O que achas que ela sentiu?',
            options: [
              { text: 'Alívio e alegria', emoji: '😮‍💨', response: 'Exactamente! Uma mistura de alívio e alegria. Encontrou a sua estrela!' },
              { text: 'Medo da criatura', emoji: '😨', response: 'A criatura parece simpática! A Luna sentiu alívio e alegria.' },
              { text: 'Indiferença', emoji: '😐', response: 'Não — a Luna ficou muito contente! Voou tanto para a encontrar.' },
            ],
            bestIndex: 0,
          },
        },
        {
          text: '"Obrigada, pequenino", sussurrou a Luna. A criatura soltou o mapa e acenou com as mãos minúsculas, como se dissesse: "De nada."',
          mood: 'joyful',
          sound: null,
          visual: '👾',
        },
        {
          text: 'Luna guardou o mapa junto ao coração e olhou para a estrela uma última vez. A estrela brilhou mais forte do que nunca.',
          mood: 'warm',
          sound: 'birds',
          visual: '💛',
        },
        {
          text: 'E a estrela? A estrela brilhava feliz no seu canto da galáxia. Pensou: "Já não preciso de sonhar. Encontrei a minha astronauta."',
          mood: 'warm',
          sound: null,
          visual: '⭐',
          isEnding: true,
        },
      ],

      // ═══════════════════════════════════════════════════════
      // ANIMAIS — A Pena que Sonhava
      // ═══════════════════════════════════════════════════════
      animals: [
        {
          text: 'No chão de uma floresta antiga, entre folhas secas e musgo, estava uma pena. Não era uma pena qualquer — era uma pena que sonhava.',
          mood: 'warm',
          sound: null,
          visual: '🪶',
        },
        {
          text: 'Todas as noites, a pena sonhava que voava. Sonhava que voltava a subir ao céu, levada pelo vento, e tocava nas nuvens mais altas.',
          mood: 'dreamy',
          sound: null,
          visual: '☁️',
        },
        {
          text: 'Numa manhã fresca, uma menina chamada Sofia passeava pela floresta. Viu a pena e baixou-se para a apanhar. "Que pena tão bonita!", disse ela, encantada.',
          mood: 'joyful',
          sound: 'birds',
          visual: '✨',
        },
        {
          text: 'Sofia pôs a pena no chapéu e continuou a caminhar. A pena pensou: "Estou a voar outra vez!" — não no céu, mas num chapéu cheio de aventura.',
          mood: 'joyful',
          sound: null,
          visual: '🎉',
          interaction: {
            type: 'emotion',
            prompt: 'A Sofia encontrou a pena. O que achas que a pena está a sentir?',
            options: [
              { text: 'Feliz', emoji: '😊', response: 'Sim! A pena está feliz. Depois de tanto tempo no chão, voltou a viajar!' },
              { text: 'Triste', emoji: '😢', response: 'Na verdade, a pena está feliz! Finalmente saiu do chão e está a viajar.' },
              { text: 'Assustada', emoji: '😨', response: 'Não — a pena sente-se segura com a Sofia. Está feliz!' },
            ],
            bestIndex: 0,
          },
        },
        {
          text: 'Mas uma rajada de vento arrancou o chapéu da Sofia e a pena voou para longe, até desaparecer entre as árvores.',
          mood: 'tense',
          sound: 'wind',
          visual: '💨',
        },
        {
          text: 'Sofia procurou o chapéu mas não encontrou a pena. Sentou-se num tronco velho e suspirou.',
          mood: 'sad',
          sound: 'rain',
          visual: '😢',
          interaction: {
            type: 'emotion',
            prompt: 'A Sofia perdeu a pena. O que achas que ela está a sentir?',
            options: [
              { text: 'Triste', emoji: '😢', response: 'Sim, a Sofia está triste. A pena era especial para ela.' },
              { text: 'Feliz', emoji: '😊', response: 'Não... a Sofia está triste. Perdeu a pena que tanto gostava.' },
              { text: 'Zangada', emoji: '😡', response: 'Talvez com o vento, mas o que mais sente é tristeza.' },
            ],
            bestIndex: 0,
          },
        },
        {
          text: 'A Sofia olhou para a floresta. Podia ir para casa ou podia ir mais fundo entre as árvores, à procura da pena.',
          mood: 'mysterious',
          sound: null,
          visual: '🤔',
          interaction: {
            type: 'choice',
            prompt: 'O que achas que a Sofia deve fazer?',
            options: [
              { text: 'Ir à procura', emoji: '🔍', response: 'Boa escolha! A Sofia também decidiu isso. A floresta não lhe metia medo.' },
              { text: 'Ir para casa', emoji: '🏠', response: 'Hm... mas a pena é especial. A Sofia decidiu ir à procura!' },
              { text: 'Pedir ajuda', emoji: '🤝', response: 'Boa ideia! Mas está sozinha na floresta. A Sofia foi com coragem.' },
            ],
          },
        },
        {
          text: 'Sofia caminhou entre as árvores. A luz do sol filtrava-se pelas folhas e criava manchas douradas no chão.',
          mood: 'mysterious',
          sound: 'wind',
          visual: '🌳',
        },
        {
          text: 'De repente, viu algo brilhar num arbusto. Era a pena! E ao lado dela, uma raposa de pelo avermelhado olhava para a Sofia com olhos curiosos.',
          mood: 'triumphant',
          sound: 'birds',
          visual: '🦊',
        },
        {
          text: 'A raposa olhou para a Sofia. A Sofia olhou para a raposa. Ficaram ali, em silêncio, como se se entendessem sem palavras.',
          mood: 'warm',
          sound: null,
          visual: '👀',
          interaction: {
            type: 'emotion',
            prompt: 'A Sofia encontrou a pena! O que achas que ela sentiu?',
            options: [
              { text: 'Alívio e alegria', emoji: '😮‍💨', response: 'Exactamente! Uma mistura de alívio e alegria. A pena estava lá!' },
              { text: 'Medo da raposa', emoji: '😨', response: 'A raposa é mansa! A Sofia sentiu alívio e alegria.' },
              { text: 'Indiferença', emoji: '😐', response: 'Não — a Sofia ficou muito contente! Caminhou tanto.' },
            ],
            bestIndex: 0,
          },
        },
        {
          text: '"Obrigada, amiga", sussurrou a Sofia. A raposa abanou a cauda e desapareceu entre os arbustos, silenciosa como uma sombra.',
          mood: 'joyful',
          sound: null,
          visual: '🦊',
        },
        {
          text: 'Sofia pôs a pena no bolso do casaco, junto ao coração. No caminho de volta, ia a sorrir.',
          mood: 'warm',
          sound: 'birds',
          visual: '💛',
        },
        {
          text: 'E a pena? A pena ia feliz, quentinha no bolso da Sofia. Pensou: "Já não preciso de sonhar. Encontrei a minha exploradora."',
          mood: 'warm',
          sound: null,
          visual: '🪶',
          isEnding: true,
        },
      ],

      // ═══════════════════════════════════════════════════════
      // MÚSICA — A Nota que Sonhava
      // ═══════════════════════════════════════════════════════
      music: [
        {
          text: 'Dentro de um velho piano, no canto de uma sala empoeirada, vivia uma nota. Não era uma nota qualquer — era uma nota que sonhava.',
          mood: 'warm',
          sound: null,
          visual: '🎵',
        },
        {
          text: 'Todas as noites, a nota sonhava que alguém tocava nela. Sonhava que vibrava tão forte que enchia a sala inteira de música.',
          mood: 'dreamy',
          sound: null,
          visual: '🎹',
        },
        {
          text: 'Numa tarde de chuva, um menino chamado Miguel entrou na sala. Sentou-se ao piano e tocou uma tecla. Dó! A nota vibrou de alegria. "Que som bonito!", disse ele.',
          mood: 'joyful',
          sound: 'birds',
          visual: '✨',
        },
        {
          text: 'Miguel tocou mais teclas. Dó, ré, mi, fá, sol! A nota dançava com as outras, feliz. Pensou: "Isto é muito melhor do que sonhar!"',
          mood: 'joyful',
          sound: null,
          visual: '🎉',
          interaction: {
            type: 'emotion',
            prompt: 'O Miguel está a tocar piano. O que achas que a nota está a sentir?',
            options: [
              { text: 'Feliz', emoji: '😊', response: 'Sim! A nota está radiante. Finalmente alguém a fez vibrar!' },
              { text: 'Triste', emoji: '😢', response: 'Na verdade, a nota está feliz! Finalmente está a fazer música.' },
              { text: 'Assustada', emoji: '😨', response: 'Não — a nota adora ser tocada! Está feliz!' },
            ],
            bestIndex: 0,
          },
        },
        {
          text: 'Mas de repente, uma corda do piano partiu-se com um estalo! O som parou. A nota ficou presa, muda, sem conseguir vibrar.',
          mood: 'tense',
          sound: 'wind',
          visual: '💔',
        },
        {
          text: 'Miguel tentou tocar aquela tecla outra vez, mas não saía som. Fechou a tampa do piano e baixou a cabeça.',
          mood: 'sad',
          sound: 'rain',
          visual: '😢',
          interaction: {
            type: 'emotion',
            prompt: 'O piano partiu-se. O que achas que o Miguel está a sentir?',
            options: [
              { text: 'Triste', emoji: '😢', response: 'Sim, o Miguel está triste. Tinha descoberto algo que adorava e agora não funciona.' },
              { text: 'Feliz', emoji: '😊', response: 'Não... o Miguel está triste. O piano calou-se.' },
              { text: 'Zangado', emoji: '😡', response: 'Talvez um pouco, mas acima de tudo sente tristeza.' },
            ],
            bestIndex: 0,
          },
        },
        {
          text: 'O Miguel olhou para o piano. Podia desistir e ir embora. Ou podia tentar arranjar a corda.',
          mood: 'mysterious',
          sound: null,
          visual: '🤔',
          interaction: {
            type: 'choice',
            prompt: 'O que achas que o Miguel deve fazer?',
            options: [
              { text: 'Tentar arranjar', emoji: '🔧', response: 'Boa escolha! O Miguel também decidiu isso. Não ia desistir da música.' },
              { text: 'Ir embora', emoji: '🚶', response: 'Hm... mas a música é especial. O Miguel decidiu tentar arranjar!' },
              { text: 'Pedir ajuda', emoji: '🤝', response: 'Boa ideia! Mas está sozinho. O Miguel decidiu tentar ele mesmo.' },
            ],
          },
        },
        {
          text: 'Miguel abriu a tampa do piano e espreitou para dentro. Viu cordas, martelos e peças minúsculas. Era como um mundo secreto.',
          mood: 'mysterious',
          sound: 'wind',
          visual: '🔍',
        },
        {
          text: 'De repente, ouviu um som. Cri, cri! Um grilo estava sentado em cima da corda partida, cantando a sua própria música, como se dissesse: "É aqui o problema."',
          mood: 'triumphant',
          sound: 'birds',
          visual: '🦗',
        },
        {
          text: 'O grilo olhou para o Miguel. O Miguel olhou para o grilo. Ficaram ali, em silêncio, como se se entendessem sem palavras.',
          mood: 'warm',
          sound: null,
          visual: '👀',
          interaction: {
            type: 'emotion',
            prompt: 'O Miguel descobriu o problema! O que achas que ele sentiu?',
            options: [
              { text: 'Alívio e alegria', emoji: '😮‍💨', response: 'Exactamente! Agora pode tentar arranjar. Sentiu esperança!' },
              { text: 'Medo do grilo', emoji: '😨', response: 'O grilo é inofensivo! O Miguel sentiu alívio e esperança.' },
              { text: 'Indiferença', emoji: '😐', response: 'Não — o Miguel ficou contente! Agora sabe o que fazer.' },
            ],
            bestIndex: 0,
          },
        },
        {
          text: 'Com cuidado, o Miguel prendeu a corda. O grilo saltou para fora e ficou a observar. Miguel tocou a tecla. Dó! A nota vibrou, clara e forte.',
          mood: 'joyful',
          sound: null,
          visual: '🎵',
        },
        {
          text: 'Miguel sorriu e começou a tocar uma melodia. O grilo cantava junto, como se fizessem parte da mesma banda.',
          mood: 'warm',
          sound: 'birds',
          visual: '💛',
        },
        {
          text: 'E a nota? A nota vibrava feliz dentro do piano. Pensou: "Já não preciso de sonhar. Encontrei o meu músico."',
          mood: 'warm',
          sound: null,
          visual: '🎵',
          isEnding: true,
        },
      ],
    },
  },
]

/**
 * Get a story adapted for a specific universe.
 * Falls back to football if the universe variant doesn't exist.
 */
export function getStory(storyId, universeId = 'football') {
  const story = STORIES.find((s) => s.id === storyId)
  if (!story) return null

  const uid = universeId || 'football'
  const meta = story.universes[uid] || story.universes.football
  const scenes = story.scenes[uid] || story.scenes.football

  return {
    id: story.id,
    level: story.level,
    title: meta.title,
    coverEmoji: meta.coverEmoji,
    scenes,
  }
}

/**
 * Get all stories available for a universe, sorted by level.
 */
export function getStoriesForUniverse(universeId = 'football') {
  return STORIES.map((s) => {
    const uid = universeId || 'football'
    const meta = s.universes[uid] || s.universes.football
    return {
      id: s.id,
      level: s.level,
      title: meta.title,
      coverEmoji: meta.coverEmoji,
    }
  }).sort((a, b) => a.level - b.level)
}
