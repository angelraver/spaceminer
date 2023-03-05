import SPRITE from "./sprite";
import { CONFIG, Ordinal } from './config'
import Utils from './utils'

/**
 * Extends SPRITE to add background features
 */
export default class HERO extends SPRITE {
  goingLeft: boolean
  goingRight: boolean
  goingTop: boolean
  goingBottom: boolean
  constructor(props: any) {
    super(props);
    this.goingLeft = false
    this.goingRight = false
    this.goingTop = false
    this.goingBottom = false
  }
  /**
   * Overwrite draw
   */
  draw(): void {
    this.checkDirection()
    this.going()

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(-this.r)
    ctx.scale(this.scaleX, this.scaleY)
    ctx.drawImage(this.image, 0, this.sheetY, this.w, this.h, 0 - this.w / 2, 0 - this.h / 2, this.w, this.h)
    // console.log(this.y)
    ctx.restore()
  }
  /**
   * Manage click event
   * @param e 
   */
  click (e: Ordinal) {
    const hittingAsteroid = Utils.hit(e, this)
    if (!hittingAsteroid) {
      Hero.setPath({ x: e.x, y: e.y })
    }
  }
  /**
  * Update the global Going family top, right, bottom ,left to know where the hero is going
  */
  checkDirection() {
    if (this.currenPosition) {
      this.goingTop = this.currenPosition.y < this.previousPosition.y && this.y < Margin
      this.goingRight = this.currenPosition.x > this.previousPosition.x && this.x > CONFIG.GAME_WIDTH - Margin
      this.goingBottom = this.currenPosition.y > this.previousPosition.y && this.y > CONFIG.GAME_HEIGHT - Margin
      this.goingLeft = this.currenPosition.x < this.previousPosition.x && this.x < Margin
    }
  }
}
