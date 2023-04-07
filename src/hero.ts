import SPRITE from './sprite'
import { Ordinal } from './types'
import { MINERAL_MODELS } from './config'
import Utils from './utils'
import Sound from './sound'
import TEXT from './text'

/**
 * Extends SPRITE to add hero features
 */
export default class HERO extends SPRITE {
  goingLeft: boolean
  goingRight: boolean
  goingTop: boolean
  goingBottom: boolean
  xp: number
  cargoMineralsFull: boolean
  cargoMineralsPositions: Ordinal[]
  cargoMinerals: SPRITE[]
  
  constructor(props: any) {
    super(props)
    this.x = g.W / 2
    this.y = g.H / 2
    this.sheet = 'ship'
    this.fX = 0
    this.fY = 0
    this.fW = 72
    this.fH = 89
    this.fQty = 1
    this.r = 0
    this.scaleX = 1
    this.scaleY = 1
    this.goingLeft = false
    this.goingRight = false
    this.goingTop = false
    this.goingBottom = false
    this.updateImage()
    this.resetCargo()
  }
  /**
   * Overwrite draw
   */
  draw(): void {
    this.unloadCargo()
    this.checkDirection()
    this.going()

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(-this.r)
    ctx.scale(this.scaleX, this.scaleY)
    ctx.drawImage(this.img, this.fX, this.fY, this.fW, this.fH, 0 - this.w / 2, 0 - this.h / 2, this.w, this.h)

    this.cargoMinerals.forEach((c) => {
      ctx.drawImage(c.img, c.fX, c.fY, c.fW, c.fH, c.x, c.y, c.w, c.h)
    })

    ctx.restore()
    this.tweenUpdate()
  }
  /**
   * Manage click event
   * @param e 
   */
  click(e: Ordinal) {
    // if the inventory is on dont move
    if (g.Inventory.showInventory) return
    // if the click is on the controls button dont move
    if (Utils.isHiting(e, g.UiPanel.controlsButton)) return
    // if not hitting the asteroid move!
    if (!Utils.isHiting(e, g.CurrentAsteroid)) {
      Sound.play('engine')
    }
    this.setPath({ x: e.x, y: e.y })
  }

  /**
   * When the hero is clicking on an asteorid
   * - Adds xp
   * - Prepare xp to drop on central
   * - Triggers the hit label
   */
  mining(xp: number, x: number, y: number) {
    this.xp += xp
    g.XpTotal += xp
    TEXT.hiting(xp, x, y)
  }

  /**
   * add the cargo sprite to the Hero CargoMinerals prop
   * the cargo is based on the asteroid mineral
   */
  addCargoMineral(): void {
    this.xp += 8
    const position = this.getCargoMineralsPosition()
    const mineral = MINERAL_MODELS.find((min) => min.type === g.CurrentAsteroid.mineralType)
    const mineralInfo = {
      name: mineral.name,
      chance: mineral.chance,
      type: mineral.type 
    }
    const mineralCargo = new SPRITE({
      metadata: mineralInfo,
      fX: mineral.sheet.x,
      fY: mineral.sheet.y,
      fW: mineral.sheet.w,
      fH: mineral.sheet.h,
      sheet: mineral.sheet.img,
      x: position.x,
      y: position.y,
      w: this.w / g.Block / 2,
      h: this.w / g.Block / 2, // yes the w, for square simetry
      r: Utils.random(0, 360)
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
   * Unloads the cargo in the central
   * - Creates the hit label
   * - Updates the XpTotal
   * - Updates the MineralsTotal
   * - Resets the xp
   */
  unloadCargo(): void {
    if (g.InCentral && g.Hero.xp > 0) {
      Sound.play('powerup23')
      TEXT.hiting(g.Hero.xp, g.Hero.x, g.Hero.y)
      g.XpTotal += this.xp
      this.cargoMinerals.forEach(m => g.MineralsTotal.push(m.metadata.type))
      this.resetCargo()
      g.Inventory.updateMinerals()
    }
  }

  /**
   * Resets the cargo relative props
   * Resets the xp
   */
  resetCargo(): void {
    this.xp = 0
    this.cargoMineralsFull = false
    this.cargoMinerals = []
    this.cargoMineralsPositions = [
      { x: -this.w / 7, y: -this.h / 2 },
      { x: -this.w / 2.5, y: -this.h / 2 },
      { x: -this.w / 7, y: -this.h / 3 },
      { x: -this.w / 2.5, y: -this.h / 3 }
    ]
  }

  /**
  * Update the global Going family top, right, bottom ,left to know where the hero is going
  */
  checkDirection() {
    if (this.currentPos) {
      this.goingTop = this.currentPos.y < this.previousPos.y // the hero is moving up
        && this.y < g.Margin // the hero is inside the top margin
        && g.Anchor.y + g.Anchor.h + g.Speed < g.LevelLimits.b //the anchor will not cross the bottom limit

      this.goingRight = this.currentPos.x > this.previousPos.x // the hero is moving right
        && this.x > g.W - g.Margin // the hero is inside the right margin
        && g.Anchor.x - g.Speed > g.LevelLimits.l // the anchor will not cross the left limit

      this.goingBottom = this.currentPos.y > this.previousPos.y // the hero is going bottom
        && this.y + this.h > g.H - g.Margin // the hero is inside the bottom margin
        && g.Anchor.y - g.Speed > g.LevelLimits.t // the anchor will not cross the top limit

      this.goingLeft = this.currentPos.x < this.previousPos.x // the hero is moving left
        && this.x < g.Margin // the hero is inside the left margin
        && g.Anchor.x + g.Anchor.w + g.Speed < g.LevelLimits.r // the anchor will not cross the right limit
    }
  }
}
