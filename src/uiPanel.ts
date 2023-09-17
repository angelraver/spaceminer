import { SPRITE_LIBRARY } from './config'
import Utils from './utils'
import { Ordinal } from './types'
import BACKGROUND from './background'
import TEXT from './text'
import SPRITE from './sprite'
import Sound from './sound'

export default class UI {
  xpPanel: BACKGROUND
  xpText: TEXT
  xpIcon: SPRITE
  moneyPanel: BACKGROUND
  moneyText: TEXT
  moneyIcon: SPRITE
  fontSize: number
  soundButton: BACKGROUND

  constructor() {
    this.fontSize = 24
    this.create()
    this.setSoundButton()
  }

  create() {
    this.setXp()
    this.setMoney()
  }

  setXp() {
    this.xpPanel = new BACKGROUND({ fixed: true, w: 144, h: 24, sheet: SPRITE_LIBRARY.ui })
    this.xpPanel.x = g.W / 2 + g.W / 10
    this.xpPanel.y = this.xpPanel.h

    this.xpIcon = new SPRITE({ fixed: true, w: 24, h: 24, fVertical: false, sheet: SPRITE_LIBRARY.xpIcon })
    this.xpIcon.x = this.xpPanel.x + this.xpPanel.w - this.xpIcon.w / 2
    this.xpIcon.y = this.xpPanel.y + this.xpIcon.h / 1.8

    this.xpText = new TEXT({
      x: this.xpPanel.x + this.xpPanel.w - this.xpIcon.w,
      y: this.xpPanel.y + 20,
      size: this.fontSize,
      color: 'black',
      colorLine: 'white',
      align: 'end'
    })
  }

  setMoney() {
    this.moneyPanel = new BACKGROUND({ fixed: true, w: 144, h: 24, sheet: SPRITE_LIBRARY.ui })
    this.moneyPanel.x = g.W / 2 - this.moneyPanel.w - g.W / 10
    this.moneyPanel.y = this.moneyPanel.h

    this.moneyIcon = new SPRITE({ fixed: true, w: 24, h: 24, fVertical: false, sheet: SPRITE_LIBRARY.moneyIcon })
    this.moneyIcon.x = this.moneyPanel.x + this.moneyPanel.w - this.moneyIcon.w / 2
    this.moneyIcon.y = this.moneyPanel.y + this.xpIcon.h / 1.8

    this.moneyText = new TEXT({
      x: this.moneyPanel.x + this.moneyPanel.w - this.moneyIcon.w,
      y: this.moneyPanel.y + 20,
      size: this.fontSize,
      color: 'black',
      colorLine: 'white',
      align: 'end'
    })    
  }

/**
 * Show / Hide inventory
 */
  click(e: Ordinal) {
    // SOUND BUTTON
    if (Utils.isHiting(e, this.soundButton)) {
      if (g.SoundOn) {
        g.SoundOn = false
        this.soundButton.sheet.y = 47
      } else {
        g.SoundOn = true
        this.soundButton.sheet.y = 0
      }
    }
  }


  /**
   * sets the button for the sound ON / OFF
   */
  setSoundButton() {
    this.soundButton = new BACKGROUND({ fixed: true, w: 32, h: 32 , sheet: SPRITE_LIBRARY.buttonSound })
    this.soundButton.x = g.W - this.soundButton.w - 5
    this.soundButton.y = 5
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
    this.soundButton.draw()
  }
}
