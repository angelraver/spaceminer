import { CONFIG as C, } from './config'
import { screenTitle, screenTitleSetup } from './screenTitle'
import screenLevelStart from './screenLevelStart'
import screenAction from './screenAction'
import GAME from './game'

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
declare global {
  var g: GAME,
  ctx: CanvasRenderingContext2D
}

globalThis.g = new GAME()
globalThis.ctx = canvas.getContext('2d')

canvas.width = g.W
canvas.height = g.H

// Increase the internal game time counter
function timing() {
  g.GlobalTime = g.GlobalTime + .5
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
  ctx.clearRect(0, 0, g.W, g.H)
}

// Executes the correspondent screen
function rolling() {
  clearGameFrame()

  switch(g.CurrentScreen) {
    case 'titleSetup' :
      screenTitleSetup()
      break
    case 'title' :
      screenTitle()
      break
    case 'levelStart' :
      g.newgame()
      g.load()
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
