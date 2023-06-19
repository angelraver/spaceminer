import SPRITE from './sprite'
import { Ordinal, ClientModel } from './types'
import Utils from "./utils"
import { SPRITE_LIBRARY } from "./config"
import TEXT from './text'
import Sound from './sound'

/**
 * Extends SPRITE to add hero features
 */
export default class ENEMY extends SPRITE {
  origin: Ordinal
  destiny: Ordinal
  pathBlocked: boolean
  period: number
  isCloseToHero: boolean
  isOutside: Boolean
  flame1: SPRITE

  constructor(props: any) {
    super(props);
    this.period = props.period
    this.destiny = { x: g.Central.x, y: g.Central.y }
    this.r = 0
    this.scaleX = 1
    this.scaleY = 1
    this.path = []
    this.pathBlocked = false
    this.isOutside = false
    this.isCloseToHero = false
    this.origin = Utils.randomOuterPoint()
    this.x = this.origin.x
    this.y = this.origin.y
    this.mini = true
    this.fixed = true
  }
  
  static create() {
    g.Enemys.push(new ENEMY({
      id: 'a',
      h: 64,
      w: 64,
      period: 10,
      sheet: SPRITE_LIBRARY.enemy1,
      fVertical: true
    }))
  }

  /**
   * Updates the path array positions to stay relative to the hero current position
   */
  pathByHero() {
    this.checkPath()
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
  if the enemy has no path, creates one
  the target is near the hero
  if the hero is not moving, path remains
  if the hero moves the path is regenated
 */
  checkPath() {
    this.isOutside = this.x < -g.OffSetHorizontal || this.x > g.W + g.OffSetHorizontal || this.y < -g.OffSetVertical || this.y > g.H + g.OffSetVertical
    this.isCloseToHero = Utils.valueInMargin(this.x, g.Hero.x, g.Hero.w, 100) && Utils.valueInMargin(this.y, g.Hero.y, g.Hero.h, 100)

    if (this.isCloseToHero) {
      console.log('CLOSE TO HERO!')
      this.path = []
      return
    }
    const target = this.path.length > 0 ? this.path[this.path.length - 1] : { x: 0, y: 0 }
    const v = (value: number): number => Utils.absInt(value)
    if (!Utils.valueInMargin(v(g.Hero.x), v(target.x), 0, 10) && !Utils.valueInMargin(v(g.Hero.y), v(target.y), 0, 10)) {
      // console.log('Es momento de setear el path!')
      this.setPath({ x: Utils.absInt(g.Hero.x), y: Utils.absInt(g.Hero.y) })
    } else {
      // console.log('NO HACE FALTA SETEAR EL PATH')
    }
  }

  /**
 * Overwrite draw
 * Before it checks the path by hero
 * Before it checks the path and blocked it
 */
  drawing(): void {
    this.pathByHero()
    this.draw()
  }
}
