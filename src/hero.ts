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
    ctx.drawImage(this.image, this.frameX, this.frameY, this.w, this.h, 0 - this.w / 2, 0 - this.h / 2, this.w, this.h)
    ctx.restore()
  }
  /**
   * Manage click event
   * @param e 
   */
  click(e: Ordinal) {
    const hittingAsteroid = Utils.hit(e, CurrentAsteroid)
    if (!hittingAsteroid) {
      engineSound.play()
      Hero.setPath({ x: e.x, y: e.y })
    }
  }
  /**
  * Update the global Going family top, right, bottom ,left to know where the hero is going
  */
  checkDirection() {
    if (this.currenPosition) {
      this.goingTop = this.currenPosition.y < this.previousPosition.y // the hero is moving up
        && this.y < Margin // the hero is inside the top margin
        && Anchor.y + Anchor.h + Speed < LevelLimits.b //the anchor will not cross the bottom limit

      this.goingRight = this.currenPosition.x > this.previousPosition.x // the hero is moving right
        && this.x > CONFIG.GAME_WIDTH - Margin // the hero is inside the right margin
        && Anchor.x - Speed > LevelLimits.l // the anchor will not cross the left limit

      this.goingBottom = this.currenPosition.y > this.previousPosition.y // the hero is going bottom
        && this.y + this.h > CONFIG.GAME_HEIGHT - Margin // the hero is inside the bottom margin
        && Anchor.y - Speed > LevelLimits.t // the anchor will not cross the top limit

      this.goingLeft = this.currenPosition.x < this.previousPosition.x // the hero is moving left
        && this.x < Margin // the hero is inside the left margin
        && Anchor.x + Anchor.w + Speed < LevelLimits.r // the anchor will not cross the right limit
    }
  }
}
