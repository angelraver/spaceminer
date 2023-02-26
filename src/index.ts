import { CONFIG as C, CONFIG } from './config'
import SPRITE from './sprite'
import TEXT from './text'
import Asteroid from './asteroid'
import screenLevelStart from './screenLevelStart'
import screenAction from './screenAction'
import CROSSHAIR from './crosshair'

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
canvas.width = C.GAME_WIDTH
canvas.height = C.GAME_HEIGHT

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
  Crosshair: CROSSHAIR,
  AsteroidModelCurrent: number,
  AsteroidModelNew: number,
  CurrentAsteroid: SPRITE,
  Cargo: number,
  CargoTotal: number,
  CargoGoal: number,
  InCentral: boolean,
  HitsLabels: TEXT[],
  GoingLeft: boolean,
  GoingRight: boolean,
  GoingTop: boolean,
  GoingBottom: boolean,
  CanGoLeft: boolean,
  CanGoRight: boolean,
  CanGoTop: boolean,
  CanGoBottom: boolean,
  OffSetHorizontal: number,
  OffSetVertical: number
}

const gt = globalThis

gt.ctx = canvas.getContext('2d')
gt.GlobalTime = 0
gt.MarkTime = 0
gt.Speed = 10
gt.CurrentScreen = 'levelStart'
gt.GameOver = false
gt.Pause = false
gt.SetNewGame = true
gt.Background = undefined
gt.Hero = undefined
gt.Central = undefined
gt.Crosshair = undefined
gt. CurrentAsteroid = undefined
gt.Asteroids = []
gt.AsteroidsNumber = 20
gt.AsteroidModelCurrent = undefined
gt.AsteroidModelNew = undefined
gt.Cargo = 0
gt.CargoTotal = 0
gt.CargoGoal = 0
gt.InCentral = false
gt.HitsLabels = []
gt.GoingLeft = false
gt.GoingRight = false
gt.GoingTop = false
gt.GoingBottom = false
gt.OffSetHorizontal = C.GAME_WIDTH / 4
gt.OffSetVertical = C.GAME_HEIGHT / 4
gt.CanGoLeft = false
gt.CanGoRight = false
gt.CanGoTop = false
gt.CanGoBottom = false

// Increase the internal game time counter
function timing() {
  GlobalTime = globalThis.GlobalTime + .5
}

// Restart the game loop
function go() {
  start = setInterval(rolling, C.GAME_SPEED)
}

// Stop the game loop
function stop() {
  clearInterval(start)
}

// Empty the canvas (before drawing again)
function clearGameFrame() {
  ctx.clearRect(0, 0, C.GAME_WIDTH, C.GAME_HEIGHT)
}

// Catch all mouse click events
function click(e: any) {
  // if (!CurrentAsteroid && clickValid(e)) {
    Hero.click(e)
  // }

  Asteroid.click(e)
}

function clickValid(e: any) {
  return e.x > CONFIG.BLOCK_UNITY * 4
    && e.x < CONFIG.GAME_WIDTH - CONFIG.BLOCK_UNITY * 4
    && e.y > CONFIG.BLOCK_UNITY * 4
    && e.y < CONFIG.GAME_HEIGHT - CONFIG.BLOCK_UNITY * 4
}


document.body.addEventListener('click', click)


// Executes the correspondent screen
function rolling() {
  clearGameFrame()
  switch(CurrentScreen) {
    // case 'title' :
    //   titleScreen()
    //   break
    case 'levelStart' :
      screenLevelStart()
      break
    case 'action' :
      screenAction()
      break
    // case 'gameOver' :
    //   gameOverScreen()
    //   break
    // case 'levelCompleted':
    //   levelCompletedScreen()
    //   break  
  }
}

// Internal game time counter
setInterval(timing, 500)

// Running the game at the given speed
var start = setInterval(rolling, C.GAME_SPEED)
