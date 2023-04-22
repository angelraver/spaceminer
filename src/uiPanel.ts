import { SPRITE_LIBRARY } from './config'
import Utils from './utils'
import { Ordinal } from './types'
import BACKGROUND from './background'
import TEXT from './text'
import SPRITE from './sprite'
import Sound from './sound'

export default class UI {
  controlsButton: SPRITE
  xpPanel: BACKGROUND
  xpText: TEXT
  xpIcon: SPRITE
  moneyPanel: BACKGROUND
  moneyText: TEXT
  moneyIcon: SPRITE
  fontSize: number
  constructor() {
    this.fontSize = g.Block * 3
    this.create()
  }

  create() {
    this.setXp()
    this.setMoney()
    this.setControls()
  }

  setControls() {
    this.controlsButton = new BACKGROUND({
      fixed: true,
      w: 8,
      h: 8,
      fX: 0,
      fY: 0,
      fW: 64,
      fH: 64,
      fQty: 1,
      sheet: SPRITE_LIBRARY.controlsIcon
    })
    this.controlsButton.x = g.W / 2 - this.controlsButton.w / 2
    this.controlsButton.y = g.H - this.controlsButton.h * 1.5
  }

  setXp() {
    this.xpPanel = new BACKGROUND({
      fixed: true,
      w: 18,
      h: 3,
      fX: 0,
      fY: 0,
      fW: 190,
      fH: 49 ,
      fQty: 1,
      sheet: SPRITE_LIBRARY.ui
    })
    this.xpPanel.x = g.W / 2 + g.W / 10
    this.xpPanel.y = this.xpPanel.h

    this.xpIcon = new SPRITE({
      fixed: true,
      w: 3,
      h: 3,
      fX: 0,
      fY: 0,
      fW: 17,
      fH: 18,
      fVertical: false,
      sheet: SPRITE_LIBRARY.xpIcon
    })
    this.xpIcon.x = this.xpPanel.x + this.xpPanel.w - this.xpIcon.w / 2
    this.xpIcon.y = this.xpPanel.y + this.xpIcon.h / 1.8

    this.xpText = new TEXT({
      x: this.xpPanel.x + this.xpPanel.w - this.xpIcon.w,
      y: this.xpPanel.y + g.Block * 2.4,
      size: this.fontSize,
      color: 'black',
      colorLine: 'black',
      align: 'end'
    })
  }

  setMoney() {
    this.moneyPanel = new BACKGROUND({
      fixed: true,
      w: 18,
      h: 3,
      fX: 0,
      fY: 0,
      fW: 190,
      fH: 49 ,
      fQty: 1,
      sheet: SPRITE_LIBRARY.ui
    })
    this.moneyPanel.x = g.W / 2 - this.moneyPanel.w - g.W / 10
    this.moneyPanel.y = this.moneyPanel.h

    this.moneyIcon = new SPRITE({
      fixed: true,
      w: 3,
      h: 3,
      fX: 0,
      fY: 0,
      fW: 17,
      fH: 18,
      fVertical: false,
      sheet: SPRITE_LIBRARY.moneyIcon
    })
    this.moneyIcon.x = this.moneyPanel.x + this.moneyPanel.w - this.moneyIcon.w / 2
    this.moneyIcon.y = this.moneyPanel.y + this.xpIcon.h / 1.8

    this.moneyText = new TEXT({
      x: this.moneyPanel.x + this.moneyPanel.w - this.moneyIcon.w,
      y: this.moneyPanel.y + g.Block * 2.4,
      size: this.fontSize,
      color: 'black',
      colorLine: 'black',
      align: 'end'
    })    
  }

/**
 * Show / Hide inventory
 */
  click(e: Ordinal) {
    // hitting control button
    if (Utils.isHiting(e, this.controlsButton)) {
      g.Inventory.showInventory = true
    } else {
      // not hitting control button
      // hitting the inventory panel
      if (g.Inventory.showInventory && !Utils.isHiting(e, g.Inventory.panel)) {
        g.Inventory.showInventory = false
      }
    }
  }

  draw() {
    this.xpText.text = Utils.getNumberAscending(Number(this.xpText.text), g.XpTotal).toString()
    this.moneyText.text = Utils.getNumberAscending(Number(this.moneyText.text), g.MoneyTotal).toString()

    this.xpPanel.draw()
    this.xpIcon .draw()
    this.xpText .draw()
    this.moneyPanel.draw()
    this.moneyIcon.draw()
    this.moneyText.draw()
    this.controlsButton.draw()
  } 
}
