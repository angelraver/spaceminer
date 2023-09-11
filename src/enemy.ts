import SPRITE from './sprite'
import { Ordinal } from './types'
import Utils from "./utils"
import { SPRITE_LIBRARY } from "./config"
import TEXT from './text'
import Sound from './sound'
import EXPLOSION from './explosion'
import IMPACT from './impact'

const u = Utils
/**
 * Extends SPRITE to add hero features
 */
export default class ENEMY extends SPRITE {
  origin: Ordinal
  destiny: Ordinal
  pathBlocked: boolean
  period: number
  loot: SPRITE

  constructor(props: any) {
    super(props);
    this.destiny = { x: g.Central.x, y: g.Central.y }
    this.loot = undefined
    this.r = 0
    this.scaleX = 1
    this.scaleY = 1
    this.path = []
    this.pathBlocked = false
    this.origin = u.randomNoVisiblePoint()
    this.x = this.origin.x
    this.y = this.origin.y
    this.mini = true
    this.fixed = true
  }
  
  static create() {
    g.Enemys.push(new ENEMY({
      id: 'e' + u.random(1, 99999999),
      h: 64,
      w: 64,
      sheet: SPRITE_LIBRARY.enemy1,
      fVertical: true,
      hits: 1,
      hitsLimit: 100
    }))
  }

  static spawn() {
    if (u.random(0, g.EnemyRate) === 0) {
      this.create()
    }
  }

  /**
   * Updates the path array positions to stay relative to the hero current position
   */
  pathByHero() {
    this.checkPath()
    if (g.Hero.goingTop) {
      this.y = this.y + g.SpeedEnemy
      this.path = this.path.map((p) => {
        return { ...p, y: p.y + g.SpeedEnemy }
      })
    }
    if (g.Hero.goingRight) {
      this.x = this.x - g.SpeedEnemy
      this.path = this.path.map((p) => {
        return { ...p, x: p.x - g.SpeedEnemy }
      })
    }
    if (g.Hero.goingBottom) {
      this.y = this.y - g.SpeedEnemy
      this.path = this.path.map((p) => {
        return { ...p, y: p.y - g.SpeedEnemy }
      })
    }
    if (g.Hero.goingLeft) {
      this.x = this.x + g.SpeedEnemy
      this.path = this.path.map((p) => {
        return { ...p, x: p.x + g.SpeedEnemy }
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
    // if (g.Enemys.length === 0) {
    //   return
    // }
    
    if (!this.loot && !this.checkCloseToHero() && g.Hero.checkCargo()) {
      console.log('perseguir!')
      this.persuitHero()
      return
    }

    if (this.checkCloseToHero()) {
      console.log('close to hero')
      this.path = []
      if (g.Hero.checkCargo()) {
        this.loot = g.Hero.checkLooted()
      }
    }
    console.log('huir!')
    this.scapeFromHero()  
    console.log('- - - - - -')
  }

  persuitHero(): void {
    const target = this.path.length > 0 ? this.path[this.path.length - 1] : { x: 0, y: 0 }
    if (!u.valueInMargin(u.absInt(g.Hero.x), u.absInt(target.x), 0, 10) && !u.valueInMargin(u.absInt(g.Hero.y), u.absInt(target.y), 0, 10)) {
      // console.log('Es momento de setear el path!')
      this.setPath({ x: u.absInt(g.Hero.x), y: u.absInt(g.Hero.y) }, g.SpeedEnemy)
    }
  }

  scapeFromHero(): void {
    if (this.path.length === 0) {
      this.setPath(u.randomOuterPoint(), g.SpeedEnemy * 1.5)
    }
    const currentPos = this.path[this.currentPathIndex]
    if (!currentPos) {
      this.setPath(u.randomOuterPoint(), g.SpeedEnemy * 1.5)
      return
    }

    if (
      u.absInt(currentPos.x) < -g.OffSetHorizontal / 2 ||
      u.absInt(currentPos.x) > g.W + g.OffSetHorizontal / 2 ||
      u.absInt(currentPos.y) < -g.OffSetVertical / 2 ||
      u.absInt(currentPos.y) > g.W + g.OffSetHorizontal / 2
    ) {
      g.Enemys = g.Enemys.filter((e) => this.id !== e.id)
    }
  }

  hit() {
    this.hits = this.hits + 1
    // console.log('ENEMY HIT!')
    const pos = this.path[this.currentPathIndex + 5]
    if (pos) {
      IMPACT.add({ x: pos.x, y: pos.y }, 3, this.scaleX, this.scaleY)
    }

    TEXT.hiting((this.hitsLimit - this.hits).toString(), this.x, this.y, 'red', 'black')

    if (this.hits === this.hitsLimit) {
      // enemy killed
      EXPLOSION.add({ x: this.x, y: this.y })
      g.Enemys = g.Enemys.filter((e) => e.id !== this.id)
    }
  }

  checkCloseToHero(): boolean {
    return u.valueInMargin(this.x, g.Hero.x, g.Hero.w, 100) && u.valueInMargin(this.y, g.Hero.y, g.Hero.h, 100)
  }

  /**
 * Overwrite draw
 * Before it checks the path by hero
 * Before it checks the path and blocked it
 */
  drawing(): void {
    this.pathByHero()
    this.draw(() => {
      const c = this.loot
      if (c) {
        this.drawImage({ ...c })
      }
    })
  }
}
