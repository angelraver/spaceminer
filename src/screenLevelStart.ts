import { SPRITE_LIBRARY } from './config'
import HERO from './hero'
import SPRITE from './sprite'
import BACKGROUND from './background'
import CROSSHAIR from './crosshair'
import Utils from './utils'
import PLAIN from './plain'
import INVENTORY from './inventory'
import UI from './uiPanel'
import ASTEROID from './asteroid'

/**
 * Prepare the game stats before the action screen
 */
export default function screenLevelStart() {
  if (g.SetNewGame) {
    g.GameOver = false
    g.SetNewGame = false

    g.Background = new PLAIN({ x: 0, y: 0, w: g.W, h: g.H, color: '#2c2137', alpha: 1 })

    g.Anchor = new SPRITE({ id: 'anchor', x: 0, y: 0, w: g.W / 8, h: g.H / 8 })

    g.VisibleArea = new PLAIN({ id: 'visiblArea', x: 0, y: 0, w: g.W, h: g.H })

    g.Stars = g.StarsData.map((star) => {
      return new BACKGROUND({
        x: star.x, y: star.y, w: 32,h: 32,
        sheet: { i: 'stars', x: star.fX, y: star.fY, w: 50, h: 50, fQty: 1 }
      })
    })

    ASTEROID.createGroup(200)

    g.BaseRock = new SPRITE({
      w: 150, h: 150,
      x: g.W / 2, y: g.H / 2,
      sheet: SPRITE_LIBRARY.baserock,
      r: 0,
      scaleX: 3, scaleY: -3
    })

    g.Central = new SPRITE({
      w: 80, h: 64,
      x: g.W / 2, y: g.H / 2,
      sheet: SPRITE_LIBRARY.central,
      r: 0,
      scaleX: 2, scaleY: -2,
      mini: true
    })

    g.Hero = new HERO({ h: 80, w: 64 })
    g.Hero.target = { x: g.Hero.x, y: g.Hero.y }
    
    g.Clients = []

    g.Crosshair = new CROSSHAIR({ w: 64, h: 64 })
    g.Inventory = new INVENTORY()
    g.UiPanel = new UI()
  }

  g.CurrentScreen = 'action'
  g.MarkTime = 0
  g.GlobalTime = 0

  g.MineralsPrices = [
    { type: 'A', price: 5 },
    { type: 'B', price: 10 },
    { type: 'C', price: 20 },
    { type: 'D', price: 50 },
    { type: 'E', price: 60 },
    { type: 'F', price: 70 },
    { type: 'G', price: 80 },
    { type: 'H', price: 90 },
    { type: 'I', price: 100 }
  ]

  function click(e: any): void {
    g.Hero.click(e)
    g.CurrentAsteroid?.click(e)
    g.UiPanel.click(e)
    g.Inventory.click(e)
  }

  document.body.removeEventListener('click', g.ScreenTitle.click)
  document.body.addEventListener('click', click)
}
