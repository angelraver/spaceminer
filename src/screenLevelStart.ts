import HERO from './hero'
import SPRITE from './sprite'
import BACKGROUND from './background'
import AsteroidManager from './asteroidManager'
import CROSSHAIR from './crosshair'
import Utils from './utils'
import PLAIN from './plain'
import INVENTORY from './inventory'
import UI from './uiPanel'
import CLIENT from './client'

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
        fX: Utils.random(0, 4) * 50,
        fY: Utils.random(0, 4) * 50,
        fW: 50,
        fH: 50,
        fQty: 1,
        sheet: 'st'
      })
    })

    g.AsteroidsNumber = 400
    AsteroidManager.createGroup()

    g.Central = new SPRITE({
      x: g.W / 2,
      y: g.H / 2,
      w: 10,
      h: 10,
      sheet: 'central',
      fX: 0,
      fY: 0,
      fW: 91,
      fH: 90,
      r: 20,
      scaleX: 2,
      scaleY: 2,
      mini: true
    })

    g.Hero = new HERO({
      x: g.W / 2,
      y: g.H / 2,
      h: 10,
      w: 8,
      sheet: 'ship',
      fX: 0,
      fY: 0,
      fW: 72,
      fH: 89,
      fQty: 1,
      r: 0,
      scaleX: 1,
      scaleY: 1,
    })
    g.Hero.target = { x: g.Hero.x, y: g.Hero.y }

    g.Clients = []

    g.Crosshair = new CROSSHAIR({
      id: 'crosshair',
      w: 8,
      h: 8,
      fX: 0,
      fY: 0,
      fW: 64,
      fH: 64,
      sheet: 'crosshair',
      r: 0
    })

    g.Inventory = new INVENTORY()
    g.UiPanel = new UI()
  }

  g.CurrentScreen = 'action'
  g.MarkTime = 0
  g.GlobalTime = 0

  // Catch all mouse click events
  function click(e: any): void {
    g.Hero.click(e)
    g.CurrentAsteroid?.click(e)
    g.UiPanel.click(e)
    g.Inventory.click(e)
  }

  document.body.addEventListener('click', click)
  Utils.randomOuterPoint()
}
