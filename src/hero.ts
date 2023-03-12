import SPRITE from "./sprite";
import { Mineral, Ordinal } from './types'
import { CONFIG, MINERALS } from './config'
import Utils from './utils'

/**
 * Extends SPRITE to add hero features
 */
export default class HERO extends SPRITE {
  goingLeft: boolean
  goingRight: boolean
  goingTop: boolean
  goingBottom: boolean
  cargo: number
  cargoMineralsFull: boolean
  cargoMineralsPositions: Ordinal[]
  cargoMinerals: SPRITE[]
  
  constructor(props: any) {
    super(props);
    this.goingLeft = false
    this.goingRight = false
    this.goingTop = false
    this.goingBottom = false
    this.resetCargo()
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

    this.cargoMinerals.forEach((cargo) => {
      ctx.drawImage(cargo.image, cargo.frameX, cargo.frameY, cargo.frameW, cargo.frameH, cargo.x, cargo.y, cargo.w, cargo.h)
    })

    ctx.restore()
  }
  /**
   * Manage click event
   * @param e 
   */
  click(e: Ordinal) {
    const hittingAsteroid = Utils.isHiting(e, g.CurrentAsteroid)
    if (!hittingAsteroid) {
      g.engineSound.play()
      this.setPath({ x: e.x, y: e.y })
    }
  }

  /**
   * add the cargo sprite to the Hero CargoMinerals prop
   * the cargo is based on the asteroid mineral
   */
  addCargoMineral(): void {
    const position = this.getCargoMineralsPosition()
    const mineralCargo = new SPRITE({
      id: 'cargo-' + g.CurrentAsteroid.id,
      frameX: g.CurrentAsteroid.mineral.sheet.x,
      frameY: g.CurrentAsteroid.mineral.sheet.y,
      frameW: g.CurrentAsteroid.mineral.sheet.w,
      frameH: g.CurrentAsteroid.mineral.sheet.h,
      sheet: g.CurrentAsteroid.mineral.sheet.image,
      x: position.x,
      y: position.y,
      w: this.w / 2,
      h: this.w / 2 // yes the w, for square simetry
    })
    this.cargoMinerals.push(mineralCargo)
    if (this.cargoMineralsPositions.length === 0) {
      this.cargoMineralsFull = true
    }
  }

  /**
   * Returns one of the 4 cargo position available if it is.
   */
  getCargoMineralsPosition(): Ordinal {
    return this.cargoMineralsPositions.pop()
  }

  /**
   * Resets the cargo relative props
   */
  resetCargo(): void {
    this.cargo = 0
    this.cargoMineralsFull = false
    this.cargoMinerals = []
    this.cargoMineralsPositions = [
      { x: 0, y: 0 },
      { x: 0, y: 0 - this.w / 2 },
      { x: 0 - this.w / 2, y: 0 },
      { x: 0 - this.w / 2, y: 0 - this.w / 2 }
    ]
  }

  /**
  * Update the global Going family top, right, bottom ,left to know where the hero is going
  */
  checkDirection() {
    if (this.currenPosition) {
      this.goingTop = this.currenPosition.y < this.previousPosition.y // the hero is moving up
        && this.y < g.Margin // the hero is inside the top margin
        && g.Anchor.y + g.Anchor.h + g.Speed < g.LevelLimits.b //the anchor will not cross the bottom limit

      this.goingRight = this.currenPosition.x > this.previousPosition.x // the hero is moving right
        && this.x > CONFIG.GAME_WIDTH - g.Margin // the hero is inside the right margin
        && g.Anchor.x - g.Speed > g.LevelLimits.l // the anchor will not cross the left limit

      this.goingBottom = this.currenPosition.y > this.previousPosition.y // the hero is going bottom
        && this.y + this.h > CONFIG.GAME_HEIGHT - g.Margin // the hero is inside the bottom margin
        && g.Anchor.y - g.Speed > g.LevelLimits.t // the anchor will not cross the top limit

      this.goingLeft = this.currenPosition.x < this.previousPosition.x // the hero is moving left
        && this.x < g.Margin // the hero is inside the left margin
        && g.Anchor.x + g.Anchor.w + g.Speed < g.LevelLimits.r // the anchor will not cross the right limit
    }
  }
}
