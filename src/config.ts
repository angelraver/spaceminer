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
  asteroidEmpty: { k: 'asteroidEmpty', i: 'aempty', x: 0, y: 0, w: 121, h: 105 },
  asteroid1: { k: 'asteroid1', i: 'a1', x: 0, y: 0, w: 121, h: 105 },
  asteroid2: { k: 'asteroid2', i: 'a2', x: 0, y: 0, w: 96, h: 96 },
  asteroid3: { k: 'asteroid3', i: 'a3', x: 0, y: 0, w: 104, h: 88 },
  central: { k: 'central', i: 'basecentral', x: 0, y: 0, w: 76, h: 54, fQty: 5 },
  client1: { k: 'client1', i: 'client1', x: 0, y: 0, w: 72, h: 85 },
  client2: { k: 'client2', i: 'client2', x: 0, y: 0, w: 72, h: 85 },
  client3: { k: 'client3', i: 'client3', x: 0, y: 0, w: 72, h: 85 },
  client4: { k: 'client4', i: 'client4', x: 0, y: 0, w: 72, h: 85 },
  client5: { k: 'client5', i: 'client5', x: 0, y: 0, w: 72, h: 85 },
  enemy1: { k: 'enemy1', i: 'enemy1', x: 0, y: 0, w: 32, h: 32, fQty: 2 },
  enemy2: { k: 'enemy2', i: 'enemy2', x: 0, y: 0, w: 32, h: 32, fQty: 2 },
  explosion: { k: 'explosion1', i: 'explosion1', x: 0, y: 0, w: 16, h: 16, fQty: 8 },
  crossair: { k: 'crossair', i: 'crosshair', x: 0, y: 0, w: 64, h: 64 },
  flameBlue1: { k: 'flameBlue1', i: 'flameblue1', x: 0, y: 0, w: 16, h: 16, fQty: 4 },
  flameBlue2: { k: 'flameBlue2', i: 'flameblue2', x: 0, y: 0, w: 16, h: 16, fQty: 4 },
  hero: { k: 'hero', i: 'ship', x: 0, y: 0, w: 72, h: 89, fQty: 9 },
  heroShoot: { k: 'heroShoot', i: 'heroshoot', x: 0, y: 0, w: 16, h: 16, fQty: 6 },
  inventoryPanel: { k: 'inventoryPanel', i: 'inventorypanel', x: 0, y: 0, w: 289, h: 381, },
  mineralsA: { k: 'mineralsA', i: 'minerals', x: 0, y: 0, w: 32, h: 32 },
  mineralsB: { k: 'mineralsB', i: 'minerals', x: 0, y: 32, w: 32, h: 32 },
  mineralsC: { k: 'mineralsC', i: 'minerals', x: 0, y: 64, w: 32, h: 32 },
  mineralsD: { k: 'mineralsD', i: 'minerals', x: 0, y: 96, w: 32, h: 32 },
  mineralsE: { k: 'mineralsE', i: 'minerals', x: 0, y: 128, w: 32, h: 32 },
  mineralsF: { k: 'mineralsF', i: 'minerals', x: 0, y: 160, w: 32, h: 32 },
  mineralsG: { k: 'mineralsG', i: 'minerals', x: 0, y: 192, w: 32, h: 32 },
  mineralsH: { k: 'mineralsH', i: 'minerals', x: 0, y: 224, w: 32, h: 32 },
  moneyIcon: { k: 'moneyIcon', i: 'money-icon', x: 0, y: 0, w: 17, h: 18 },
  buttonSound: { k: 'buttonSound', i: 'sound', x: 0, y: 0, w: 50, h: 47, fQty: 1 },
  stars: { k: 'stars', i: 'stars', x: 0, y: 0, w: 250, h: 250, fQty: 1 },
  titleLogo: { k: 'titleLogo', i: 'title', x: 0, y: 0, w: 204, h: 130 },
  titleButtonNewGame: { k: 'titleButtonNewGame', i: 'buttonnewgame', x: 0, y: 0, w: 280, h: 104 },
  ui: { k: 'ui', i: 'ui', x: 0, y: 0, w: 200, h: 50, fQty: 2 },
  xpIcon: { k: 'xpIcon', i: 'xp-icon', x: 0, y: 0, w: 17, h: 18 },

  character1Glad: { k: 'character1Glad', i: 'p1alegre', x: 0, y: 0, w: 20, h: 33 },
  character1Angry: { k: 'character1Angry', i: 'p1enojado', x: 0, y: 0, w: 20, h: 33 },
  character1Normal: { k: 'character1Normal', i: 'p1normal', x: 0, y: 0, w: 20, h: 33 },
  character1Surprise: { k: 'character1Surprise', i: 'p1sorprendido', x: 0, y: 0, w: 20, h: 33 },
  character1Sad: { k: 'character1Sad', i: 'p1Triste', x: 0, y: 0, w: 20, h: 33 },
  
  character2Glad: { k: 'character2Glad', i: 'p2alegre', x: 0, y: 0, w: 20, h: 33 },
  character2Angry: { k: 'character2Angry', i: 'p2enojado', x: 0, y: 0, w: 20, h: 33 },
  character2Normal: { k: 'character2Normal', i: 'p2normal', x: 0, y: 0, w: 20, h: 33 },
  character2Surprise: { k: 'character2Surprise', i: 'p2sorprendido', x: 0, y: 0, w: 20, h: 33 },
  character2Sad: { k: 'character2Sad', i: 'p2triste', x: 0, y: 0, w: 20, h: 33 },
  
  character3Glad: { k: 'character3Glad', i: 'p3alegre', x: 0, y: 0, w: 20, h: 33 },
  character3Angry: { k: 'character3Angry', i: 'p3enojado', x: 0, y: 0, w: 20, h: 33 },
  character3Normal: { k: 'character3Normal', i: 'p3normal', x: 0, y: 0, w: 20, h: 33 },
  character3Surprise: { k: 'character3Surprise', i: 'p3sorprendido', x: 0, y: 0, w: 20, h: 33 },
  character3Sad: { k: 'character3Sad', i: 'p3triste', x: 0, y: 0, w: 20, h: 33 },

  character4Glad: { k: 'character4Glad', i: 'p4alegre', x: 0, y: 0, w: 20, h: 33 },
  character4Angry: { k: 'character4Angry', i: 'p4enojado', x: 0, y: 0, w: 20, h: 33 },
  character4Normal: { k: 'character4Normal', i: 'p4normal', x: 0, y: 0, w: 20, h: 33 },
  character4Surprise: { k: 'character4Surprise', i: 'p4sorprendido', x: 0, y: 0, w: 20, h: 33 },
  character4Sad: { k: 'character4Sad', i: 'p4triste', x: 0, y: 0, w: 20, h: 33 },

  impact1: { k: 'impact1', i: 'impacts', x: 0, y: 0, w: 100, h: 89 },
  impact2: { k: 'impact2', i: 'impacts', x: 100, y: 0, w: 100, h: 89 },
  impact3: { k: 'impact3', i: 'impacts', x: 200, y: 0, w: 100, h: 89 },
  impact4: { k: 'impact4', i: 'impacts', x: 300, y: 0, w: 100, h: 89 },
  impact5: { k: 'impact5', i: 'impacts', x: 0, y: 89, w: 100, h: 89 },
  impact6: { k: 'impact6', i: 'impacts', x: 100, y: 89, w: 100, h: 89 },
  impact7: { k: 'impact7', i: 'impacts', x: 200, y: 89, w: 100, h: 89 },
  impact8: { k: 'impact8', i: 'impacts', x: 300, y: 89, w: 100, h: 89 },
  impact9: { k: 'impact9', i: 'impacts', x: 100, y: 178, w: 100, h: 89 },
  impact10: { k: 'impact10', i: 'impacts', x: 200, y: 178, w: 100, h: 89 },
}

export const IMPACTS_SHEETS: Sheet[] = [
  SPRITE_LIBRARY.impact1, 
  SPRITE_LIBRARY.impact2,
  SPRITE_LIBRARY.impact3,
  SPRITE_LIBRARY.impact4,
  SPRITE_LIBRARY.impact5,
  SPRITE_LIBRARY.impact6,
  SPRITE_LIBRARY.impact7,
  SPRITE_LIBRARY.impact8,
  SPRITE_LIBRARY.impact9,
  SPRITE_LIBRARY.impact10,
]

export const EXPLOSIONS_SHEETS: Sheet[] = [
  SPRITE_LIBRARY.explosion
]

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
