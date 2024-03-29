import { EXPLOSIONS_SHEETS } from './config'
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
      x: pos.x, y: pos.y, w: 160, h: 160,
      r: Utils.random(0, 180),
      sheet: sheet,
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
  drawing(): void {
    this.draw()
    g.Explosions = g.Explosions.filter((e) => e.currentLoop > 0)
  }
}