import SPRITE from "./sprite";
/**
 * Extends SPRITE to add text features
 */
export default class PLAIN extends SPRITE {
  color: string
  alpha: number
  constructor(props: any) {
    super(props)
    this.color = props.color
    this.alpha = props.alpha
  }
  /**
   * Draw
   */
  draw() {
    ctx.save()
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h)
    ctx.globalAlpha = this.alpha
    ctx.restore()
  }
}