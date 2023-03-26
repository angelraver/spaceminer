import { CONFIG as C, CONFIG } from './config'
import HERO from './hero'
import SPRITE from './sprite'
import BACKGROUND from './background'
import AsteroidManager from './asteroidManager'
import CROSSHAIR from './crosshair'
import Utils from './utils'
import PLAIN from './plain'
import INVENTORY from './inventory'
import UIPANEL from './uiPanel'

/**
 * Prepare the game stats before the action screen
 */
export default function screenLevelStart() {
  g.LevelLimits = {
    t: -g.OffSetVertical,
    r: g.W + g.OffSetHorizontal,
    b: g.H + g.OffSetVertical,
    l: -g.OffSetHorizontal
  }

  if (g.SetNewGame) {
    g.GameOver = false
    g.SetNewGame = false

    g.Background = new PLAIN({ x: 0, y: 0, w: g.W, h: g.H, color: '#2c2137', alpha: 1 })

    g.Anchor = new SPRITE({ id: 'anchor', x: 0, y: 0, w: g.W / g.Block, h: g.H / g.Block })

    g.VisibleArea = new PLAIN({ id: 'visiblArea', x: 0, y: 0, w: g.W, h: g.H })

    g.Stars = Array.from({ length: 1000 }, function (v, i) {
      return new BACKGROUND({
        id: 'star_' + i,
        x: Utils.random(g.LevelLimits.l, g.LevelLimits.r),
        y: Utils.random(g.LevelLimits.t, g.LevelLimits.b),
        w: 4,
        h: 4,
        frameX: Utils.random(0, 4) * 50,
        frameY: Utils.random(0, 4) * 50,
        frameW: 50,
        frameH: 50,
        totaFrames: 1,
        sheet: 'stars.png'
      })
    })

    g.AsteroidsNumber = 400
    AsteroidManager.createGroup()

    g.Central = new SPRITE({
      id: 'central',
      x: g.W / 2,
      y: g.H / 2,
      w: 10,
      h: 10,
      sheet: 'central.png',
      frameX: 0,
      frameY: 0,
      frameW: 91,
      frameH: 90,
      frameTotal: 1,
      r: 20,
      scaleX: 2,
      scaleY: 2,
      mini: true
    })

    g.Hero = new HERO({
      id: 'hero',
      x: g.W / 2,
      y: g.H / 2,
      h: 6,
      w: 6,
      sheet: 'ship.png',
      frameX: 0,
      frameY: 0,
      frameW: 50,
      frameH: 50,
      frameTotal: 1,
      r: 0,
      scaleX: 1,
      scaleY: 1,
    })
    g.Hero.target = { x: g.Hero.x, y: g.Hero.y }

    g.Crosshair = new CROSSHAIR({
      id: 'crosshair',
      w: 8,
      h: 8,
      frameX: 0,
      frameY: 0,
      frameW: 64,
      frameH: 64,
      sheet: 'crosshair158.png',
      frameTotal: 1,
      r: 0
    })

    g.Inventory = new INVENTORY()
    g.UiPanel = new UIPANEL()
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
