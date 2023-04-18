import { MineralModel, AsteroidModel, ClientModel, LibraryItem, Sheet } from './types'

/**
 * Global constants setting the game sources and values
 */
export const CONFIG = {
  SPRITES_FOLDER: './assets/sprites/',
  SOUND_FOLDER: './assets/sounds/',
  GAME_SPEED: 45,
  BLOCK_DESKTOP: 8,
  BLOCK_MOBILE: 6,
  OFFSET_MOBILE_X: 2,
  OFFSET_MOBILE_Y: 2,
  OFFSET_DESKTOP_X: 2,
  OFFSET_DESKTOP_Y: 2
}

export const SOUND_LIBRARY: LibraryItem = {
  engine: 'engines.mp3',
  // miningclick: 'miningclick.mp3',
  miningclick: 'asteroidempty.mp3',
  asteroidEmpty: 'asteroidempty.mp3',
  mineralFound: 'mineralfound.mp3',
  pickoupcoin: 'pickupcoin.mp3',
  powerup23: 'powerup23.mp3'
}

export const SPRITE_LIBRARY: LibraryItem = {
  asteroid1: 'a1',
  asteroid2: 'a2',
  asteroid3: 'a3',
  asteroid4: 'a4',
  asteroid5: 'a5',
  asteroid6: 'a6',
  central: 'central',
  client1: 'client1',
  client2: 'client2',
  client3: 'client3',
  client4: 'client4',
  client5: 'client5',
  controlsIcon: 'controls-icon',
  explosions: 'explosions',
  inventoryPanel: 'inventorypanel',
  minerals: 'minerals',
  moneyIcon: 'money-icon',
  stars: 'stars',
  sound: 'sound',
  ui: 'ui',
  xpIcon: 'xp-icon'
}

export const CLIENT_MODELS: ClientModel[] = [
  {
    id: 'A',
    requiredXp: 10,
    period: 10,
    timeShopping: 5,
    sheet: { img: SPRITE_LIBRARY.client1, x: 0, y: 0, w: 50, h: 50 }
  },
  {
    id: 'B',
    requiredXp: 20,
    period: 15,
    timeShopping: 5,
    sheet: { img: SPRITE_LIBRARY.client2, x: 0, y: 0, w: 50, h: 50 }
  },
  {
    id: 'C',
    requiredXp: 30,
    period: 25,
    timeShopping: 5,
    sheet: { img: SPRITE_LIBRARY.client3, x: 0, y: 0, w: 50, h: 50 }
  },
  {
    id: 'D',
    requiredXp: 40,
    period: 10,
    timeShopping: 5,
    sheet: { img: SPRITE_LIBRARY.client4, x: 0, y: 0, w: 50, h: 50 }
  },
  {
    id: 'E',
    requiredXp: 50,
    period: 15,
    timeShopping: 5,
    sheet: { img: SPRITE_LIBRARY.client5, x: 0, y: 0, w: 50, h: 50 }
  }
]

export const ASTEROID_MODELS: AsteroidModel[] = [
  {
    x: 0, y: 0,
    w: 15,
    h: 13,
    sheet: { x: 0, y: 0, w: 121, h: 105, img: SPRITE_LIBRARY.asteroid1 }
  },
  {
    x: 0, y: 0,
    w: 12,
    h: 12,
    sheet: { x: 0, y: 0, w: 96, h: 96, img: SPRITE_LIBRARY.asteroid2 }
  },
  {
    x: 0, y: 0,
    w: 13,
    h: 11,
    sheet: { x: 0, y: 0, w: 104, h: 88, img: SPRITE_LIBRARY.asteroid3 }
  }
]

/**
 * Collection of minerals for the cargo
 */
export const MINERAL_MODELS: MineralModel[] = [
  {
    type: 'A', name: '1', chance: [1, 20],
    sheet: { img: SPRITE_LIBRARY.minerals, x: 0, y: 0, w: 32, h: 32 }
  },
  {
    type: 'B', name: '2', chance: [21, 30],
    sheet: { img: SPRITE_LIBRARY.minerals, x: 0, y: 32, w: 32, h: 32 }
  },
  {
    type: 'C', name: '3', chance: [31, 40],
    sheet: { img: SPRITE_LIBRARY.minerals, x: 0, y: 64, w: 32, h: 32 }
  },
  {
    type: 'D', name: '4', chance: [41, 50],
    sheet: { img: SPRITE_LIBRARY.minerals, x: 0, y: 96, w: 32, h: 32 }
  },
  {
    type: 'E', name: '5', chance: [51, 60],
    sheet: { img: SPRITE_LIBRARY.minerals, x: 0, y: 128, w: 32, h: 32 }
  },
  {
    type: 'F', name: '6', chance: [61, 70],
    sheet: { img: SPRITE_LIBRARY.minerals, x: 0, y: 160, w: 32, h: 32 }
  },
  {
    type: 'G', name: '7', chance: [71, 80],
    sheet: { img: SPRITE_LIBRARY.minerals, x: 0, y: 192, w: 32, h: 32 }
  },
  {
    type: 'H', name: '8', chance: [81, 100],
    sheet: { img: SPRITE_LIBRARY.minerals, x: 0, y: 224, w: 32, h: 32 }
  },
]

export const EXPLOSIONS_SHEETS: Sheet[] = [
  { x: 0, y: 0, w: 100, h: 89 },
  { x: 100, y: 0, w: 100, h: 89 },
  { x: 200, y: 0, w: 100, h: 89 },
  { x: 300, y: 0, w: 100, h: 89 },
  { x: 0, y: 89, w: 100, h: 89 },
  { x: 100, y: 89, w: 100, h: 89 },
  { x: 200, y: 89, w: 100, h: 89 },
  { x: 300, y: 89, w: 100, h: 89 },
  // { x: 0, y: 178, w: 100, h: 89 },
  { x: 100, y: 178, w: 100, h: 89 },
  { x: 200, y: 178, w: 100, h: 89 },
  // { x: 300, y: 178, w: 100, h: 89 }
]