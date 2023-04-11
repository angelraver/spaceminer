import SPRITE from './sprite'
import { Ordinal, ClientModel } from './types'
import Utils from "./utils"
import { CLIENT_MODELS } from "./config"

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
 */
  checkPath() {
    this.isOutside = this.x < -g.OffSetHorizontal || this.x > g.W + g.OffSetHorizontal || this.y < -g.OffSetVertical || this.y > g.H + g.OffSetVertical
    this.isInCentral = Utils.valueInMargin(this.x, g.Central.x, 10) && Utils.valueInMargin(this.x, g.Central.x, 10)

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
   * Check if there are new clients, add new clients
   */
  static checkIn() {
    if (g.Clients.length === CLIENT_MODELS.length) return
  
    CLIENT_MODELS.forEach((model: ClientModel) => {
      if (model.requiredXp >= g.XpTotal) {
        const existing = g.Clients.find((c: CLIENT) => model.id === c.id)
        if (!existing) {
          g.Clients.push(new CLIENT({
            id: model.id,
            h: 6,
            w: 6,
            period: model.period,
            timeShopping: model.timeShopping,
            sheet: model.sheet.img,
            fX: model.sheet.x,
            fY: model.sheet.y,
            fQty: model.sheet.fQty,
            fH: model.sheet.h,
            fW: model.sheet.w
          }))
        }
      }    
    })
  }

  /**
 * Overwrite draw
 * Before it checks the path by hero
 * Before it checks the path and blocked it
 */
  draw(): void {
    if (g.XpTotal < 10 && this.path.length === 0) return

    this.going()
    this.checkPath()
    this.pathByHero()

    if (this.isOutside) return

    if(this.isVisible()) {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(-this.r)
      ctx.scale(this.scaleX, this.scaleY)
      ctx.drawImage(this.img, this.fX, this.fY, this.fW, this.fH, 0 - this.w / 2, 0 - this.h / 2, this.w, this.h)
      ctx.restore()
      this.tweenUpdate()
    } else {
      this.drawMini()
    }
  }
}
