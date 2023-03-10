const GAME_WIDTH = window.innerWidth;
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
 * Collection of Asteroid sprites
 */
const ASTEROIDS_MODEL = [
  { w: 121, h: 105, sheet: 'a1.png' },
  { w: 107, h: 106, sheet: 'a2.png' },
  { w: 112, h: 89, sheet: 'a3.png' }
];

export type Ordinal = { 
  x: number, 
  y: number
}

export type Limits = {
  t: number,
  r: number,
  b: number,
  l: number
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
  ASTEROIDS_MODEL: ASTEROIDS_MODEL
}
