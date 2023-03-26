import SPRITE from "./sprite";
/**
 * Extends SPRITE to add text features
 */
export default class CROSSHAIR extends SPRITE {
  constructor(props: any) {
    super(props)
    this.currentLoop = 0
    this.loops = 3
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

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.r)
    ctx.drawImage(this.image, this.frameX, this.frameY, this.frameW, this.frameH, 0 - this.w / 2, 0 - this.h / 2, this.w, this.h)
    ctx.restore()
  }
 
}