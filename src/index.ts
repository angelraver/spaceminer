import { CONFIG } from './config'
import SPRITE from './sprite'
import TEXT from './text'
import Asteroid from './asteroid'
import screenLevelStart from './screenLevelStart'
import screenAction from './screenAction'

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
canvas.width = CONFIG.GAME_WIDTH
canvas.height = CONFIG.GAME_HEIGHT

declare global {
  var GlobalTime: number,
  ctx: CanvasRenderingContext2D,
  MarkTime: number,
  Speed: number,
  CurrentScreen: string,
  GameOver: boolean,
  Pause: boolean,
  SetNewGame: boolean,
  Background: SPRITE,
  Hero: SPRITE,
  Central: SPRITE,
  AsteroidsNumber: number,
  Asteroids: SPRITE[],
  AsteroidModelCurrent: number,
  AsteroidModelNew: number,
  CurrentAsteroid: SPRITE,
  Cargo: number,
  CargoTotal: number,
  CargoGoal: number,
  InCentral: boolean,
  HitsLabels: TEXT[]
}

const gt = globalThis

gt.ctx = canvas.getContext('2d');
gt.GlobalTime = 0
gt.MarkTime = 0
gt.Speed = 5
gt.CurrentScreen = 'levelStart'
gt.GameOver = false
gt.Pause = false
gt.SetNewGame = true
gt.Background = undefined
gt.Hero = undefined
gt.Central = undefined
gt.Asteroids = []
gt.AsteroidsNumber = 20
gt.AsteroidModelCurrent = undefined
gt.AsteroidModelNew = undefined
gt.Cargo = 0
gt.CargoTotal = 0
gt.CargoGoal = 0
gt.InCentral = false
gt.HitsLabels = []

// Increase the internal game time counter
function timing() {
  gt.GlobalTime = globalThis.GlobalTime + .5;
}

// Restart the game loop
function go() {
  start = setInterval(rolling, CONFIG.GAME_SPEED);
}

// Stop the game loop
function stop() {
  clearInterval(start);
}

// Empty the canvas (before drawing again)
function clearGameFrame() {
  gt.ctx.clearRect(0, 0, CONFIG.GAME_WIDTH, CONFIG.GAME_HEIGHT);
}

// Executes the correspondent screen
function rolling() {
  clearGameFrame();
  switch(gt.CurrentScreen) {
    // case 'title' :
    //   titleScreen();
    //   break;
    case 'levelStart' :
      screenLevelStart();
      break;
    case 'action' :
      screenAction();
      break;
    // case 'gameOver' :
    //   gameOverScreen();
    //   break;
    // case 'levelCompleted':
    //   levelCompletedScreen();
    //   break;
  }
}

// Catch all mouse click events
function click(e: any) {
  if (!gt.CurrentAsteroid) {
    gt.Hero.setPath({ x: e.x, y: e.y });
  }

  Asteroid.click();
}
document.body.addEventListener('click', click);

// Internal game time counter
setInterval(timing, 500);

// Running the game at the given speed
var start = setInterval(rolling, CONFIG.GAME_SPEED);
