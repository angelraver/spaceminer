import { Mineral, AsteroidModel, Ordinal } from './types'

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

export const ASTEROIDS_MODELS_FRESH: AsteroidModel[] = [
  {
    x: 0, y: 0,
    w: 15,
    h: 13,
    sheet: {
      x: 0, y: 0,
      w: 121,
      h: 105,
      image: 'a1.png',
      frameTotal: 1
    }
  },
  {
    x: 0, y: 0,
    w: 12,
    h: 12,
    sheet: {
      x: 0, y: 0,
      w: 96,
      h: 96,
      image: 'a2.png',
      frameTotal: 1
    }
  },
  {
    x: 0, y: 0,
    w: 13,
    h: 11,
    sheet: {
      x: 0, y: 0,
      w: 104,
      h: 88,
      image: 'a3.png',
      frameTotal: 1
    }
  }
]

/**
 * Collection of minerals for the cargo
 */
export const MINERALS: Mineral[] = [
  {
    type: 'A',
    name: 'A',
    chance: [1, 50],
    sheet: {
      image: 'asteroid-samples.png',
      x: 0,
      y: 0,
      w: 32,
      h: 32,
      frameTotal: 1
    }
  },
  {
    type: 'B',
    name: 'B',
    chance: [51, 75],
    sheet: {
      image: 'asteroid-samples.png',
      x: 0,
      y: 32,
      w: 32,
      h: 32,
      frameTotal: 1
    }
  },
  {
    type: 'C',
    name: 'C',
    chance: [76, 90],
    sheet: {
      image: 'asteroid-samples.png',
      x: 0,
      y: 64,
      w: 32,
      h: 32,
      frameTotal: 1
    }
  },
  {
    type: 'D',
    name: 'D',
    chance: [91, 100],
    sheet: {
      image: 'asteroid-samples.png',
      x: 0,
      y: 96,
      w: 32,
      h: 32,
      frameTotal: 1
    }
  },
]

export const INVENTORY_SLOT = 50
export const INVENTORY_MINERAL_POSITIONS: Ordinal[] = [
  { x: 0, y: 0 }, { x: INVENTORY_SLOT, y: 0 },
  { x: 0, y: INVENTORY_SLOT }, { x: INVENTORY_SLOT, y: INVENTORY_SLOT },
  { x: 0, y: INVENTORY_SLOT * 2 }, { x: INVENTORY_SLOT, y: INVENTORY_SLOT * 2 },
  { x: 0, y: INVENTORY_SLOT * 3 }, { x: INVENTORY_SLOT, y: INVENTORY_SLOT * 3 },
]

type SoundLibrary = {
  [key: string]: string 
}

export const SOUND_LIBRARY: SoundLibrary = {
  engine: 'engines.wav',
  miningclick: 'miningclick.wav',
  asteroidEmpty: 'asteroidempty.wav',
  mineralFound: 'mineralfound.wav',
  pickoupcoin: 'pickupcoin.wav',
  powerup23: 'powerup23.wav'
}