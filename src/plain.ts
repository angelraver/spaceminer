import SPRITE from "./sprite";
/**
 * Extends SPRITE to add text features
 */
export default class PLAIN extends SPRITE {
  static: boolean
  color: string
  alpha: number
  constructor(props: any) {
    super(props)
    this.color = props.color
    this.alpha = props.alpha
    this.static = props.static
  }
  /**
   * Draw the text on canvas
   * - Apply looping
   */
  draw() {
    if (!this.static) {
      this.positionByHero()
    }
    ctx.save()
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h)
    ctx.globalAlpha = this.alpha
    ctx.restore()
  }
}