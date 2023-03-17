import { CONFIG as C, CONFIG } from './config'
import HERO from './hero'
import SPRITE from './sprite'
import BACKGROUND from './background'
import AsteroidManager from './asteroidManager'
import CROSSHAIR from './crosshair'
import Utils from './utils'
import PLAIN from './plain'
import INVENTORY from './inventory'

/**
 * Prepare the game stats before the action screen
 */
export default function screenLevelStart() {
  g.engineSound = new Audio(CONFIG.SOUND_FOLDER + 'engines.wav')

  g.LevelLimits = {
    t: -g.OffSetVertical,
    r: CONFIG.GAME_WIDTH + g.OffSetHorizontal,
    b: CONFIG.GAME_HEIGHT + g.OffSetVertical,
    l: -g.OffSetHorizontal
  }

  if (g.SetNewGame) {
    g.GameOver = false
    g.SetNewGame = false

    g.Background = new PLAIN({
      x: 0,
      y: 0,
      w: CONFIG.GAME_WIDTH,
      h: CONFIG.GAME_HEIGHT,
      color: '#2c2137',
      alpha: 1
    })

    g.Anchor = new SPRITE({
      id: 'anchor',
      x: 0,
      y: 0,
      w: CONFIG.GAME_WIDTH,
      h: CONFIG.GAME_HEIGHT
    })

    g.VisibleArea = new PLAIN({
      id: 'visiblArea',
      x: 0,
      y: 0,
      w: CONFIG.GAME_WIDTH,
      h: CONFIG.GAME_HEIGHT,
    })

    g.Stars = Array.from({ length: 1000 }, function (v, i) {
      return new BACKGROUND({
        id: 'star_' + i,
        x: Utils.random(g.LevelLimits.l, g.LevelLimits.r),
        y: Utils.random(g.LevelLimits.t, g.LevelLimits.b),
        w: 30,
        h: 30,
        frameX: Utils.random(0, 4) * 50,
        frameY: Utils.random(0, 4) * 50,
        frameW: 50,
        frameH: 50,
        totaFrames: 1,
        sheet: 'stars.png'
      })
    })

    g.AsteroidsNumber = 50
    AsteroidManager.createGroup()

    g.Central = new SPRITE({
      id: 'central',
      x: C.GAME_WIDTH / 2,
      y: C.GAME_HEIGHT / 2,
      w: 91,
      h: 90,
      sheet: 'central.png',
      frameTotal: 1,
      r: 20,
      scaleX: 2,
      scaleY: 2,
      mini: true
    })

    g.Hero = new HERO({
      id: 'hero',
      x: C.GAME_MID_H,
      y: C.GAME_MID_V,
      h: 74,
      w: 50,
      sheet: 'ship.png',
      frameTotal: 1,
      r: 0,
      scaleX: 1,
      scaleY: 1,
    })
    g.Hero.target = { x: g.Hero.x, y: g.Hero.y }

    g.Crosshair = new CROSSHAIR({
      id: 'crosshair',
      h: 64,
      w: 64, 
      sheet: 'crosshair158.png',
      frameTotal: 1,
      r: 0
    })

    g.Inventory = new INVENTORY()
  }

  g.CurrentScreen = 'action'
  g.MarkTime = 0
  g.GlobalTime = 0

  // Catch all mouse click events
  function click(e: any): void {
    g.Hero.click(e)
    g.CurrentAsteroid?.click(e)
  }

  document.body.addEventListener('click', click)
}
