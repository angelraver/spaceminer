import { CONFIG as C, MINERALS, INVENTORY_SLOT, INVENTORY_MINERAL_POSITIONS } from './config'
import BACKGROUND from './background'
import TEXT from './text'
import SPRITE from './sprite'

export default class UIPANEL {
  panel: BACKGROUND
  xp: TEXT
  xpIcon: SPRITE
  money: TEXT
  moneyIcon: SPRITE
  constructor() {
    this.create()
  }

  create() {
    this.panel = new BACKGROUND({
      fixed: true,
      id: 'ui_panel',
      x: C.GAME_WIDTH / 2 - 150,
      y: C.GAME_HEIGHT / 30,
      w: 300,
      h: 75,
      frameX: 0,
      frameY: 0,
      frameW: 190,
      frameH: 49 ,
      totaFrames: 1,
      sheet: 'ui.png'
    })
    this.xp = new TEXT({
      x: this.panel.x + this.panel.w - 40,
      y: this.panel.y + 28,
      size: 24,
      color: 'black',
      colorLine: 'black',
      align: 'end'
    })
    this.xpIcon = new SPRITE({
      fixed: true,
      x: this.xp.x + 15,
      y: this.xp.y - 5,
      w: 30,
      h: 30,
      frameX: 0,
      frameY: 0,
      frameW: 17,
      frameH: 18,
      frameVertical: false,
      frameTotal: 1,
      sheet: 'xpicon.png'
    })
    this.money = new TEXT({
      x: this.panel.x + this.panel.w - 40,
      y: this.panel.y + 54,
      size: 24,
      color: 'black',
      colorLine: 'black',
      align: 'end'
    })
    this.moneyIcon = new SPRITE({
      fixed: true,
      x: this.money.x + 15,
      y: this.money.y - 5,
      w: 30,
      h: 30,
      frameX: 0,
      frameY: 0,
      frameW: 17,
      frameH: 18,
      frameVertical: false,
      frameTotal: 1,
      sheet: 'moneyicon.png'
    })
  }

  draw() {
    this.xp.text = g.XpTotal.toString()
    this.money.text = g.MoneyTotal.toString()
    
    this.panel.draw()
    this.xp.draw()
    this.xpIcon.draw()
    this.money.draw()
    this.moneyIcon.draw()
  } 
}
