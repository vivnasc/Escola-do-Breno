/**
 * Reward shop items purchasable with stars.
 */

export const SHOP_CATEGORIES = [
  { id: 'celebrations', name: 'Celebracoes', icon: '🎉', description: 'Animacoes de golo' },
  { id: 'badges', name: 'Emblemas', icon: '🛡️', description: 'Emblemas para o perfil' },
  { id: 'stickers', name: 'Autocolantes', icon: '🏷️', description: 'Coleccao de autocolantes' },
  { id: 'stadium', name: 'Estadio', icon: '🏟️', description: 'Melhora o teu estadio' },
]

export const SHOP_ITEMS = [
  // Celebrations (unlock new goal celebration animations)
  {
    id: 'cele-confetti',
    category: 'celebrations',
    name: 'Confetti',
    icon: '🎊',
    description: 'Chuva de confetti quando acertas',
    cost: 0,
    owned: true,
  },
  {
    id: 'cele-fireworks',
    category: 'celebrations',
    name: 'Fogo de Artificio',
    icon: '🎆',
    description: 'Explosao de cores no ceu',
    cost: 15,
  },
  {
    id: 'cele-dance',
    category: 'celebrations',
    name: 'Danca da Vitoria',
    icon: '💃',
    description: 'Danca especial de celebracao',
    cost: 25,
  },
  {
    id: 'cele-thunder',
    category: 'celebrations',
    name: 'Trovao de Golo',
    icon: '⚡',
    description: 'Um trovao poderoso ecoa no estadio',
    cost: 30,
  },

  // Badges (profile emblems)
  {
    id: 'badge-rookie',
    category: 'badges',
    name: 'Iniciante',
    icon: '🌱',
    description: 'O comeco de uma grande carreira',
    cost: 5,
  },
  {
    id: 'badge-scorer',
    category: 'badges',
    name: 'Goleador',
    icon: '⚽',
    description: 'Marca muitos golos nas actividades',
    cost: 20,
  },
  {
    id: 'badge-captain',
    category: 'badges',
    name: 'Capitao',
    icon: '©️',
    description: 'Lidera a equipa com o braco de capitao',
    cost: 40,
  },
  {
    id: 'badge-legend',
    category: 'badges',
    name: 'Lenda',
    icon: '👑',
    description: 'Uma verdadeira lenda do futebol',
    cost: 80,
  },

  // Stickers (collectible)
  {
    id: 'sticker-ball',
    category: 'stickers',
    name: 'Bola Dourada',
    icon: '🏅',
    description: 'A bola de ouro do melhor jogador',
    cost: 10,
  },
  {
    id: 'sticker-trophy',
    category: 'stickers',
    name: 'Taca do Mundo',
    icon: '🏆',
    description: 'O maior trofeu do futebol',
    cost: 15,
  },
  {
    id: 'sticker-boots',
    category: 'stickers',
    name: 'Chuteiras Magicas',
    icon: '👟',
    description: 'As chuteiras que marcam golos sozinhas',
    cost: 10,
  },
  {
    id: 'sticker-gloves',
    category: 'stickers',
    name: 'Luvas do Guarda-Redes',
    icon: '🧤',
    description: 'Defende tudo com estas luvas',
    cost: 10,
  },
  {
    id: 'sticker-flag',
    category: 'stickers',
    name: 'Bandeira de Portugal',
    icon: '🇵🇹',
    description: 'Orgulho portugues',
    cost: 5,
  },
  {
    id: 'sticker-medal',
    category: 'stickers',
    name: 'Medalha de Ouro',
    icon: '🥇',
    description: 'Primeiro lugar sempre',
    cost: 20,
  },

  // Stadium upgrades
  {
    id: 'stadium-lights',
    category: 'stadium',
    name: 'Luzes LED',
    icon: '💡',
    description: 'Ilumina o estadio com luzes coloridas',
    cost: 30,
  },
  {
    id: 'stadium-fans',
    category: 'stadium',
    name: 'Mais Adeptos',
    icon: '👥',
    description: 'Enche as bancadas com mais adeptos',
    cost: 25,
  },
  {
    id: 'stadium-vip',
    category: 'stadium',
    name: 'Zona VIP',
    icon: '🌟',
    description: 'Uma zona especial so para ti',
    cost: 50,
  },
  {
    id: 'stadium-screen',
    category: 'stadium',
    name: 'Ecra Gigante',
    icon: '📺',
    description: 'Um ecra gigante que mostra os teus golos',
    cost: 45,
  },
]
