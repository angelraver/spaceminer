const BLOCK_UNITY = 10,
GAME_SPEED = 45,
GAME_WIDTH = window.innerWidth,
GAME_HEIGHT = window.innerHeight,
GAME_MID_H =  GAME_WIDTH / 2,
GAME_MID_V =  GAME_HEIGHT / 2,
CENTER_LIMITS = {
  x1: GAME_WIDTH / 4,
  x2: GAME_WIDTH - GAME_WIDTH / 4,
  y1: GAME_HEIGHT / 4,
  y2: GAME_HEIGHT - GAME_HEIGHT / 4
},
CENTER_VOID = {
  x: CENTER_LIMITS.x1,
  y: CENTER_LIMITS.y1,
  w: CENTER_LIMITS.x2 - CENTER_LIMITS.x1,
  h: CENTER_LIMITS.y2 - CENTER_LIMITS.y1
},
SPRITES_FOLDER = './assets/sprites/',
SOUND_FOLDER = './assets/sounds/';

const canvas = document.getElementById('canvas');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
const ctx = canvas.getContext("2d");

