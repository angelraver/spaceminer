import { CONFIG as C, } from './config'
import AsteroidManager from './asteroidManager'
import screenLevelStart from './screenLevelStart'
import screenAction from './screenAction'
import GAME from './game'

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
canvas.width = C.GAME_WIDTH
canvas.height = C.GAME_HEIGHT

declare global {
  var g: GAME,
  ctx: CanvasRenderingContext2D
}

globalThis.g = new GAME()
globalThis.ctx = canvas.getContext('2d')

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
  ctx.clearRect(0, 0, C.GAME_WIDTH, C.GAME_HEIGHT)
}

// Executes the correspondent screen
function rolling() {
  const now = Date.now()
  const dt = now - g.lastUpdate

  const currTime = new Date().getTime()
	const timeToCall = Math.max(0, 16 - (currTime - g.lastUpdate))

  clearGameFrame()

  g.lastUpdate = currTime
  g.delta = dt

  switch(g.CurrentScreen) {
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
