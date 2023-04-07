import { EXPLOSIONS_SHEETS, SPRITE_LIBRARY } from './config'
import SPRITE from './sprite'
import { Ordinal, Sheet } from './types'
import Utils from './utils'
/**
 * Extends SPRITE to add text features
 */
export default class EXPLOSION extends SPRITE {
  constructor(props: any) {
    super(props)
  }

/**
 * Returns one EXPLOSION
 */
  static get(pos: Ordinal): EXPLOSION {
    const sheet: Sheet = EXPLOSIONS_SHEETS[Utils.random(0, EXPLOSIONS_SHEETS.length - 1)]
    return new EXPLOSION({
      id: `explosion_${Utils.random(0, 100000)}`,
      x: pos.x, y: pos.y, w: 26, h: 26,
      r: Utils.random(0, 180),
      fX: sheet.x, fY: sheet.y, fW: sheet.w, fH: sheet.h, 
      sheet: SPRITE_LIBRARY.explosions,
      loops: 5
    })
  }

  /**
   * add 1 explosion to g.Explosions
   */
  static add(pos: Ordinal) {
    g.Explosions.push(EXPLOSION.get(pos))
  }
  
  /**
   * Draw the text on canvas
   * - Apply looping
   */
  draw(): void {
    this.looping()
    if (this.currentLoop === this.loops) {
      this.currentLoop = 0
    }

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.r)
    ctx.drawImage(this.img, this.fX, this.fY, this.fW, this.fH, 0 - this.w / 2, 0 - this.h / 2, this.w, this.h)
    ctx.restore()

    if (this.currentLoop === 0) {
      g.Explosions = g.Explosions.filter((e) => e.id !== this.id)
    }
  }
}