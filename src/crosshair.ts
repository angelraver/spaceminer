import { SPRITE_LIBRARY } from "./config"
import SPRITE from './sprite'
/**
 * Extends SPRITE to add text features
 */
export default class CROSSHAIR extends SPRITE {
  constructor(props: any) {
    super(props)
    this.sheet = SPRITE_LIBRARY.crossair
    this.r = 0
    this.currentLoop = 0
    this.loops = 3
    this.updateImage()
  }
  /**
   * Draw the text on canvas
   * - Apply looping
   */
  draw(): void {
    if (!g.CurrentAsteroid) return
    if (g.CurrentAsteroid.empty) return

    this.x = g.CurrentAsteroid.x
    this.y = g.CurrentAsteroid.y

    this.looping()
    if (this.currentLoop === this.loops) {
      this.r++
      this.r = this.r > 360 ? 0 : this.r++
      this.currentLoop = 0
    }

    this.drawNormal()
  }
 
}