import { Limits } from './types'
import { CONFIG as C, CONFIG } from './config'
import SPRITE from './sprite'
import ASTEROID from './asteroid'
import TEXT from './text'
import AsteroidManager from './asteroidManager'
import screenLevelStart from './screenLevelStart'
import screenAction from './screenAction'
import CROSSHAIR from './crosshair'
import HERO from './hero'
import BACKGROUND from './background'
import PLAIN from './plain'

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
  Background: PLAIN,
  Hero: HERO,
  Central: SPRITE,
  Crosshair: CROSSHAIR,
  AsteroidsNumber: number,
  Asteroids: ASTEROID[],
  CurrentAsteroid: ASTEROID,
  CargoTotal: number,
  CargoGoal: number,
  InCentral: boolean,
  HitsLabels: TEXT[],
  OffSetHorizontal: number,
  OffSetVertical: number,
  bkgProportion: number,
  Stars: BACKGROUND[],
  Margin: number,
  Anchor: SPRITE,
  VisibleArea: PLAIN,
  LevelLimits: Limits,
  engineSound: HTMLAudioElement
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
gt.CurrentAsteroid = undefined
gt.Asteroids = []
gt.AsteroidsNumber = 0
gt.CargoTotal = 0
gt.CargoGoal = 0
gt.InCentral = false
gt.HitsLabels = []
gt.bkgProportion = 4
gt.OffSetHorizontal = C.GAME_WIDTH
gt.OffSetVertical = C.GAME_HEIGHT
gt.Stars = []
gt.Margin = 100
gt.VisibleArea = undefined
gt.Anchor = undefined
gt.LevelLimits = undefined
gt.engineSound = undefined

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
  Hero.click(e)
  AsteroidManager.click(e)
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
