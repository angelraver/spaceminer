import SPRITE from './sprite'
import { Ordinal } from './types'
import { MINERAL_MODELS, SPRITE_LIBRARY } from './config'
import Utils from './utils'
import Sound from './sound'
import TEXT from './text'
import CHARACTER from './character'
import ENEMY from './enemy'

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
  flame1: SPRITE
  flame2: SPRITE
  shoot: SPRITE
  enemyTarget: ENEMY

  constructor(props: any) {
    super(props)
    this.id = 'hero'
    this.x = g.W / 2
    this.y = g.H / 2
    this.sheet = SPRITE_LIBRARY.hero
    this.fVertical = true
    this.r = 0
    this.scaleX = 1
    this.scaleY = -1
    this.goingLeft = false
    this.goingRight = false
    this.goingTop = false
    this.goingBottom = false
    this.updateImage()
    this.resetCargo()
    this.flame1 = new SPRITE({
      x: (this.w / -2) - 16, y: (this.h / -2) - 6, w: 40, h: 48,
      sheet: SPRITE_LIBRARY.flameBlue1
    })
    this.flame2 = new SPRITE({
      x: (this.w / -2) + 40, y: (this.h / -2) - 6, w: 40, h: 48,
      sheet: SPRITE_LIBRARY.flameBlue1
    })
  }

  /**
   * Manage click event
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

    this.setPath({ x: e.x, y: e.y }, g.SpeedHero)
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
    TEXT.hiting(xp.toString(), x, y, 'blue', 'white')
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
      sheet: mineral.sheet,
      x: position.x,
      y: position.y,
      w: this.w / 2,
      h: this.w / 2, // yes the w, for square simetry
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
   * - Updates the MineralsStock
   * - Resets the xp
   */
  unloadCargo(): void {
    if (g.InCentral && g.Hero.xp > 0) {
      Sound.play('powerup23')
      TEXT.hiting(g.Hero.xp.toString(), g.Hero.x, g.Hero.y, 'blue', 'white')
      g.XpTotal += this.xp
      this.cargoMinerals.forEach((m) => {
        g.MineralsHistory = Utils.updateQtyList(g.MineralsHistory, m.metadata.type, true)
        g.MineralsStock = Utils.updateQtyList(g.MineralsStock, m.metadata.type, true)
      })
      this.resetCargo()
      g.Inventory.mineralsUpdateSlots()
      CHARACTER.call('characterMinerGlad', 'WELL DONE!', 'blue')
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
        && g.Anchor.y + g.Anchor.h + g.SpeedHero < g.LevelLimits.b //the anchor will not cross the bottom limit

      this.goingRight = this.currentPos.x > this.previousPos.x // the hero is moving right
        && this.x > g.W - g.Margin // the hero is inside the right margin
        && g.Anchor.x - g.SpeedHero > g.LevelLimits.l // the anchor will not cross the left limit

      this.goingBottom = this.currentPos.y > this.previousPos.y // the hero is going bottom
        && this.y + this.h > g.H - g.Margin // the hero is inside the bottom margin
        && g.Anchor.y - g.SpeedHero > g.LevelLimits.t // the anchor will not cross the top limit

      this.goingLeft = this.currentPos.x < this.previousPos.x // the hero is moving left
        && this.x < g.Margin // the hero is inside the left margin
        && g.Anchor.x + g.Anchor.w + g.SpeedHero < g.LevelLimits.r // the anchor will not cross the right limit
    }
  }

  going(): void {
    const pathPos = this.currentPathIndex
    if (this.path && this.path[pathPos]) {
      this.currentPos = this.path[pathPos]
      this.previousPos = this.path[pathPos > 0 ? pathPos - 1 : pathPos]
      this.moving = true
      this.currentPathIndex++
      const pathX = this.path[pathPos].x
      const pathY = this.path[pathPos].y

      if (pathX > g.Margin - 11 && pathX < g.W - g.Margin + 11) {
        this.x = pathX;
      }
      
      if (pathY > g.Margin - 11 && pathY < g.H - g.Margin) {
        this.y = pathY;
      }

    } else {
      this.moving = false
    }
  }

  checkMoving(): boolean {
    return this.moving || this.goingTop || this.goingRight || this.goingBottom || this.goingLeft 
  }

  checkEmemys(): void {
    if (g.Enemys.length > 0) {
      const visibleEnemys = g.Enemys.filter((e) => e.isVisible())
      if (visibleEnemys.length > 0) {
        this.enemyTarget = visibleEnemys[0]
      }
    } else {
      this.enemyTarget = null
    }
  }

  checkShoot(): void {
    this.checkEmemys()
    if (this.enemyTarget) {
      if (!this.shoot) {
        this.shoot = new SPRITE({
          x: g.Hero.x,
          y: g.Hero.y,
          h: 20,
          w: 20,
          r: this.r,
          sheet: SPRITE_LIBRARY.heroShoot,
        })
        this.shoot.setPath({ x: this.enemyTarget.x, y: this.enemyTarget.y }, g.SpeedHeroShoot)
      }

      if (this.shoot) {
        if (Utils.colision(this.shoot, this.enemyTarget)) {
          this.enemyTarget.hit()
        }

        if (this.shoot.currentPathIndex > this.shoot.path.length - 2) {
          this.shoot = null
          return
        }

        this.shoot.draw()
      }
    }
  }

  drawing(): void {
    this.unloadCargo()
    this.checkDirection()
    this.framing()
    this.checkShoot()
    this.draw(() => {
      this.cargoMinerals.forEach((c) => {
        this.drawImage({ ...c })
      })
      if (this.checkMoving()) {
        this.flame1.framing()
        this.drawImage({ ...this.flame1 })
        this.flame2.framing()
        this.drawImage({ ...this.flame2 })
      }
    })
  }
}
