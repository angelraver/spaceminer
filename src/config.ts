import { MineralModel, ClientModel, Sheet, LibraryImage } from './types'

/**
 * Global constants setting the game sources and values
 */
export const CONFIG = {
  SPRITES_FOLDER: 'assets/sprites/',
  SOUND_FOLDER: 'assets/sounds/',
  GAME_SPEED: 45,
}

export const SPRITE_LIBRARY: LibraryImage = {
  asteroid1: { i: 'a1', x: 0, y: 0, w: 121, h: 105 },
  asteroid2: { i: 'a2', x: 0, y: 0, w: 96, h: 96 },
  asteroid3: { i: 'a3', x: 0, y: 0, w: 104, h: 88 },
  baserock: { i: 'baserock', x: 0, y: 0, w: 100, h: 100 }, 
  central: { i: 'basecentral', x: 0, y: 0, w: 76, h: 54 },
  characterMinerGlad: { i: 'palegre', x: 0, y: 0, w: 20, h: 33 },
  client1: { i: 'client1', x: 0, y: 0, w: 72, h: 85 },
  client2: { i: 'client2', x: 0, y: 0, w: 72, h: 85 },
  client3: { i: 'client3', x: 0, y: 0, w: 72, h: 85 },
  client4: { i: 'client4', x: 0, y: 0, w: 72, h: 85 },
  client5: { i: 'client5', x: 0, y: 0, w: 72, h: 85 },
  controlsIcon: { i: 'controls-icon', x: 0, y: 0, w: 64, h: 64 },
  enemy1: { i: 'enemy1', x: 0, y: 0, w: 32, h: 32, fQty: 2 },
  enemy2: { i: 'enemy2', x: 0, y: 0, w: 32, h: 32, fQty: 2 },
  enemyShoot: { i: 'enemy', x: 0, y: 0, w: 16, h: 16 },
  crossair: { x: 0, y: 0, w: 64, h: 64, i: 'crosshair' },
  flameBlue1: { i: 'flameblue1', x: 0, y: 0, w: 16, h: 16, fQty: 4 },
  flameBlue2: { i: 'flameblue2', x: 0, y: 0, w: 16, h: 16, fQty: 4 },
  hero: { i: 'ship', x: 0, y: 0, w: 72, h: 89, fQty: 9 },
  heroShoot: { i: 'heroshoot', x: 0, y: 0, w: 16, h: 16, fQty: 6 },
  inventoryPanel: { i: 'inventorypanel', x: 0, y: 0, w: 289, h: 381, },
  mineralsA: { i: 'minerals', x: 0, y: 0, w: 32, h: 32 },
  mineralsB: { i: 'minerals', x: 0, y: 32, w: 32, h: 32 },
  mineralsC: { i: 'minerals', x: 0, y: 64, w: 32, h: 32 },
  mineralsD: { i: 'minerals', x: 0, y: 96, w: 32, h: 32 },
  mineralsE: { i: 'minerals', x: 0, y: 128, w: 32, h: 32 },
  mineralsF: { i: 'minerals', x: 0, y: 160, w: 32, h: 32 },
  mineralsG: { i: 'minerals', x: 0, y: 192, w: 32, h: 32 },
  mineralsH: { i: 'minerals', x: 0, y: 224, w: 32, h: 32 },
  moneyIcon: { i: 'money-icon', x: 0, y: 0, w: 17, h: 18 },
  buttonSound: { i: 'sound', x: 0, y: 0, w: 50, h: 47, fQty: 1 },
  stars: { i: 'stars', x: 0, y: 0, w: 250, h: 250, fQty: 1 },
  title: { i: 'title', x: 0, y: 0, w: 204, h: 130 },
  titleButtonNewGame: { i: 'buttonnewgame', x: 0, y: 0, w: 280, h: 104 },
  ui: { i: 'ui', x: 0, y: 0, w: 190, h: 49, fQty: 1 },
  xpIcon: { i: 'xp-icon', x: 0, y: 0, w: 17, h: 18 },
  

}

export const CLIENT_MODELS: ClientModel[] = [
  {
    id: 'A',
    requiredXp: 10,
    period: 10,
    timeShopping: 5,
    sheet: SPRITE_LIBRARY.client1,
  },
  {
    id: 'B',
    requiredXp: 20,
    period: 15,
    timeShopping: 5,
    sheet: SPRITE_LIBRARY.client2,
  },
  {
    id: 'C',
    requiredXp: 30,
    period: 25,
    timeShopping: 5,
    sheet: SPRITE_LIBRARY.client3,
  },
  {
    id: 'D',
    requiredXp: 40,
    period: 10,
    timeShopping: 5,
    sheet: SPRITE_LIBRARY.client4,
  },
  {
    id: 'E',
    requiredXp: 50,
    period: 15,
    timeShopping: 5,
    sheet: SPRITE_LIBRARY.client5,
  }
]

export const ASTEROID_MODELS: Sheet[] = [SPRITE_LIBRARY.asteroid1, SPRITE_LIBRARY.asteroid2 , SPRITE_LIBRARY.asteroid3]

/**
 * Collection of minerals for the cargo
 */
export const MINERAL_MODELS: MineralModel[] = [
  { type: 'A', name: 'A', chance: [1, 20], sheet: SPRITE_LIBRARY.mineralsA },
  { type: 'B', name: 'B', chance: [21, 30], sheet: SPRITE_LIBRARY.mineralsB },
  { type: 'C', name: 'C', chance: [31, 40], sheet: SPRITE_LIBRARY.mineralsC },
  { type: 'D', name: 'D', chance: [41, 50], sheet: SPRITE_LIBRARY.mineralsD },
  { type: 'E', name: 'E', chance: [51, 60], sheet: SPRITE_LIBRARY.mineralsE },
  { type: 'F', name: 'F', chance: [61, 70], sheet: SPRITE_LIBRARY.mineralsF },
  { type: 'G', name: 'G', chance: [71, 80], sheet: SPRITE_LIBRARY.mineralsG },
  { type: 'H', name: 'H', chance: [81, 100], sheet: SPRITE_LIBRARY.mineralsH },
]

export const EXPLOSIONS_SHEETS: Sheet[] = [
  { i: 'explosions', x: 0, y: 0, w: 100, h: 89 },
  { i: 'explosions', x: 100, y: 0, w: 100, h: 89 },
  { i: 'explosions', x: 200, y: 0, w: 100, h: 89 },
  { i: 'explosions', x: 300, y: 0, w: 100, h: 89 },
  { i: 'explosions', x: 0, y: 89, w: 100, h: 89 },
  { i: 'explosions', x: 100, y: 89, w: 100, h: 89 },
  { i: 'explosions', x: 200, y: 89, w: 100, h: 89 },
  { i: 'explosions', x: 300, y: 89, w: 100, h: 89 },
  // { i: 'explosions', x: 0, y: 178, w: 100, h: 89 },
  { i: 'explosions', x: 100, y: 178, w: 100, h: 89 },
  { i: 'explosions', x: 200, y: 178, w: 100, h: 89 },
  // { i: 'explosions', x: 300, y: 178, w: 100, h: 89 }
]