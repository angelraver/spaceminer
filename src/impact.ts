import { IMPACTS_SHEETS } from './config'
import SPRITE from './sprite'
import { Ordinal, Sheet } from './types'
import Utils from './utils'
/**
 * Extends SPRITE to add text features
 */
export default class IMPACT extends SPRITE {
  constructor(props: any) {
    super(props)
  }

/**
 * Returns one IMPACT
 */
  static get(pos: Ordinal, loops: number, scaleX: number, scaleY: number): IMPACT {
    const sheet: Sheet = IMPACTS_SHEETS[Utils.random(0, IMPACTS_SHEETS.length - 1)]
    return new IMPACT({
      x: pos.x, y: pos.y, w: 100, h: 89,
      r: Utils.random(0, 180),
      sheet: sheet,
      loops,
      scaleX,
      scaleY
    })
  }

  /**
   * add 1 impact to g.Impacts
   */
  static add(pos: Ordinal, loops: number, scaleX: number, scaleY: number) {
    g.Impacts.push(IMPACT.get(pos, loops, scaleX, scaleY))
  }
  
  /**
   * Draw the text on canvas
   * - Apply looping
   */
  drawing(): void {
    this.draw()
    g.Impacts = g.Impacts.filter((e) => e.currentLoop > 0)
  }
}