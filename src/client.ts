import SPRITE from './sprite'
import { Ordinal, ClientModel } from './types'
import Utils from "./utils"
import { CLIENT_MODELS, MINERAL_MODELS, SPRITE_LIBRARY } from "./config"
import TEXT from './text'
import Sound from './sound'

/**
 * Extends SPRITE to add hero features
 */
export default class CLIENT extends SPRITE {
  origin: Ordinal
  destiny: Ordinal
  pathBlocked: boolean
  period: number
  isInCentral: boolean
  isOutside: Boolean
  timeArrivalCentral: number
  timeArrivalOutside: number
  timeShopping: number
  mineralTypeToBuy: string
  mineralCargo: SPRITE
  flame1: SPRITE

  constructor(props: any) {
    super(props);
    this.period = props.period
    this.timeShopping = props.timeShopping
    this.destiny = { x: g.Central.x, y: g.Central.y }
    this.r = 0
    this.scaleX = 1
    this.scaleY = 1
    this.path = []
    this.pathBlocked = false
    this.isOutside = false
    this.isInCentral = false
    this.origin = Utils.randomOuterPoint()
    this.x = this.origin.x
    this.y = this.origin.y
    this.mini = true
    this.fixed = true
    this.flame1 = new SPRITE({
      x: this.w / -2 + 8, y: this.h / -2 + 68, w: 40, h: 48,
      sheet: SPRITE_LIBRARY.flameBlue2
    })
  }
  
  /**
   * Check if there are new clients, add new clients
   */
  static create() {
    if (g.Clients.length === CLIENT_MODELS.length) return
  
    const models = CLIENT_MODELS.filter((m) => { 
      return g.XpTotal > m.requiredXp && !g.Clients.find((c: CLIENT) => m.id === c.id)
    })

    models.forEach((model: ClientModel) => {
      g.Clients.push(new CLIENT({
        id: model.id,
        h: 64,
        w: 56,
        period: model.period,
        timeShopping: model.timeShopping,
        sheet: model.sheet,
      }))
    })
  }

  /**
   * Updates the path array positions to stay relative to the hero current position
   */
  pathByHero() {
    if (g.Hero.goingTop) {
      this.y = this.y + g.Speed
      this.path = this.path.map((p) => {
        return { ...p, y: p.y + g.Speed }
      })
    }
    if (g.Hero.goingRight) {
      this.x = this.x - g.Speed
      this.path = this.path.map((p) => {
        return { ...p, x: p.x - g.Speed }
      })
    }
    if (g.Hero.goingBottom) {
      this.y = this.y - g.Speed
      this.path = this.path.map((p) => {
        return { ...p, y: p.y - g.Speed }
      })
    }
    if (g.Hero.goingLeft) {
      this.x = this.x + g.Speed
      this.path = this.path.map((p) => {
        return { ...p, x: p.x + g.Speed }
      })
    }
  }

/**
 * Check if it is time to the client to get a path to appear
 * Check if it is time to the client to leave
 * Set the mineral to buy
 */
  checkPath() {
    this.isOutside = this.x < -g.OffSetHorizontal || this.x > g.W + g.OffSetHorizontal || this.y < -g.OffSetVertical || this.y > g.H + g.OffSetVertical
    this.isInCentral = Utils.valueInMargin(this.x, g.Central.x, g.Central.w, 10) && Utils.valueInMargin(this.y, g.Central.y, g.Central.h, 10)

    if (this.path.length > 0 && this.currentPathIndex === this.path.length) {
      // console.log('no hay path')
      this.path = []
      this.currentPathIndex = 0
      this.pathBlocked = false
    }
    // console.log('isOutside: ', this.isOutside, this.x, this.y)
    // console.log('currentPathIndex: ', this.currentPathIndex, ' path.length:', this.path.length)

    if (this.isOutside) {
      // console.log('estamos afuera!')
      if (this.pathBlocked) return

      if (g.GlobalTime % this.period === 0) {
        // console.log('Es momento de setear el path!')
        this.x = this.origin.x
        this.y = this.origin.y
        this.setPath(g.Central)
        // console.log(this.path)
        this.pathBlocked = true
      }
    }
    
    if (!this.isOutside && !this.isInCentral) {
      // console.log('estamos adentro')
      this.pathBlocked = false
    }

    if (this.isInCentral) {
      // console.log('we're in central! time arrival: ', this.timeArrivalCentral)
      if (this.pathBlocked) return

      if (!this.timeArrivalCentral) {
        // console.log('set arrival time')
        this.timeArrivalCentral = g.GlobalTime
      } else if (g.GlobalTime > this.timeArrivalCentral) {
        // console.log('should we set the return path? ')
        if ((g.GlobalTime - this.timeArrivalCentral) % this.timeShopping === 0) {
          // console.log('time to take the mineral!')
          this.buyMineral()
          // console.log('---time to set the returning path')
          this.setPath(this.origin)
          // console.log('origin: ', this.origin)
          this.pathBlocked = true
          this.origin = Utils.randomOuterPoint()
          // console.log('new origin: ', this.origin)
        }
      }
    }
  }

  /**
   * updates the client mineralTypeToBuy prop
   * updates the g.MineralsOnSale
   */
  buyMineral():void {
    const mineralsOnSale = g.MineralsOnSale.filter((m) => m.qty > 0)
    if (mineralsOnSale.length > 0) {
      this.mineralTypeToBuy = mineralsOnSale[Utils.random(0, mineralsOnSale.length - 1)].type
      g.Inventory.mineralSold(this.mineralTypeToBuy)
      const mineral = MINERAL_MODELS.find((m) => m.type === this.mineralTypeToBuy)
      this.mineralCargo = new SPRITE({
        metadata: mineral,
        sheet: mineral.sheet,
        x: this.w / -2,
        y: this.h / -2,
        w: this.w,
        h: this.w, // yes the w, for square simetry
        r: Utils.random(0, 360)
      })
      const price = g.MineralsPrices.find((m) => m.type === this.mineralTypeToBuy).price
      g.MoneyTotal += price 
      TEXT.hiting(price.toString(), this.x, this.y, 'gold', 'black')
      Sound.play('clientBuy')
    } else {
      TEXT.hiting('SOLD OUT', this.x, this.y, 'red', 'white')
      Sound.play('clientNobuy')
    }
  }

  /**
 * Overwrite draw
 * Before it checks the path by hero
 * Before it checks the path and blocked it
 */
  drawing(): void {
    this.checkPath()
    this.pathByHero()

    if (this.isOutside) {
      this.mineralCargo = null
    }

    this.draw(() => {
      const c = this.mineralCargo
      if (c) {
        this.drawImage({ ...c })
      }
      if (this.moving) {
        this.flame1.framing()
        this.drawImage({ ...this.flame1 })
      }
    })
  }
}
