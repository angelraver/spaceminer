import { Mineral } from './types'


const GAME_WIDTH = window.innerWidth
const GAME_HEIGHT = window.innerHeight
/**
 * Location of 4 points around the screen center
 */
const CENTER_LIMITS = {
  x1: GAME_WIDTH / 4,
  x2: GAME_WIDTH - GAME_WIDTH / 4,
  y1: GAME_HEIGHT / 4,
  y2: GAME_HEIGHT - GAME_HEIGHT / 4
}

/**
 * Limits around the center of the screen
 */
const CENTER_VOID = {
  x: CENTER_LIMITS.x1,
  y: CENTER_LIMITS.y1,
  w: CENTER_LIMITS.x2 - CENTER_LIMITS.x1,
  h: CENTER_LIMITS.y2 - CENTER_LIMITS.y1
}

/**
 * Global constants setting the game sources and values
 */
export const CONFIG = {
  SPRITES_FOLDER: './assets/sprites/',
  SOUND_FOLDER: './assets/sounds/',
  BLOCK_UNITY: 10,
  GAME_SPEED: 45,
  GAME_WIDTH: GAME_WIDTH,
  GAME_HEIGHT: GAME_HEIGHT,
  GAME_MID_H: GAME_WIDTH / 2,
  GAME_MID_V: GAME_HEIGHT / 2,
  CENTER_LIMITS: CENTER_LIMITS,
  CENTER_VOID: CENTER_VOID,
}

/**
 * Collection of Asteroid sprites
 */
export const ASTEROIDS_MODELS = [
  { w: 121, h: 105, sheet: 'a1.png' },
  { w: 107, h: 106, sheet: 'a2.png' },
  { w: 112, h: 89, sheet: 'a3.png' }
]

/**
 * Collection of minerals for the cargo
 */
export const MINERALS: Mineral[] = [
  {
    type: 'A',
    name: 'A',
    chance: [1, 50],
    sheet: { x: 0, y: 0, w: 32, h: 32, image: 'asteroid-samples.png' }   
  },
  {
    type: 'B',
    name: 'B',
    chance: [51, 75],
    sheet: { x: 0, y: 32, w: 32, h: 32, image: 'asteroid-samples.png' }   
  },
  {
    type: 'C',
    name: 'C',
    chance: [76, 90],
    sheet: { x: 0, y: 64, w: 32, h: 32, image: 'asteroid-samples.png' }   
  },
  {
    type: 'D',
    name: 'D',
    chance: [91, 100],
    sheet: { x: 0, y: 96, w: 32, h: 32, image: 'asteroid-samples.png' }   
  },
]
