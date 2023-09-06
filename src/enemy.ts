import SPRITE from './sprite'
import { Ordinal, ClientModel } from './types'
import Utils from "./utils"
import { CONFIG, SPRITE_LIBRARY } from "./config"
import TEXT from './text'
import Sound from './sound'
import EXPLOSION from './explosion'
import IMPACT from './impact'

/**
 * Extends SPRITE to add hero features
 */
export default class ENEMY extends SPRITE {
  origin: Ordinal
  destiny: Ordinal
  pathBlocked: boolean
  period: number
  isCloseToHero: boolean
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
    this.isCloseToHero = false
    this.origin = Utils.randomNoVisiblePoint()
    this.x = this.origin.x
    this.y = this.origin.y
    this.mini = true
    this.fixed = true
  }
  
  static create() {
    g.Enemys.push(new ENEMY({
      id: 'e' + Utils.random(1, 99999999),
      h: 64,
      w: 64,
      sheet: SPRITE_LIBRARY.enemy1,
      fVertical: true,
      hits: 1,
      hitsLimit: 100
    }))
  }

  static spawn() {
    if (Utils.random(0, g.EnemyRate) === 0) {
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
    if (g.Enemys.length === 0) return

    this.isCloseToHero = Utils.valueInMargin(this.x, g.Hero.x, g.Hero.w, 100) && Utils.valueInMargin(this.y, g.Hero.y, g.Hero.h, 100)
    const v = (value: number): number => Utils.absInt(value)

    if (this.isCloseToHero && !this.loot) {
      g.Hero.checkEnemyClose()
      this.loot = g.Hero.checkLoot()
      this.path = []
      return
    }
    
    if (this.loot) {
      // scape from hero!
      if (this.path.length === 0) {
        this.setPath(Utils.randomOuterPoint(), g.SpeedEnemy)
      }
      const currentPos = this.path[this.currentPathIndex]
      if (
        v(currentPos.x) < -g.OffSetHorizontal / 2 ||
        v(currentPos.x) > g.W + g.OffSetHorizontal / 2 ||
        v(currentPos.y) < -g.OffSetVertical / 2 ||
        v(currentPos.y) > g.W + g.OffSetHorizontal / 2
      ) {
        g.Enemys = g.Enemys.filter((e) => this.id !== e.id)
      }
    } else {
      // persuit hero!
      const target = this.path.length > 0 ? this.path[this.path.length - 1] : { x: 0, y: 0 }
      if (!Utils.valueInMargin(v(g.Hero.x), v(target.x), 0, 10) && !Utils.valueInMargin(v(g.Hero.y), v(target.y), 0, 10)) {
        // console.log('Es momento de setear el path!')
        this.setPath({ x: Utils.absInt(g.Hero.x), y: Utils.absInt(g.Hero.y) }, g.SpeedEnemy)
      }
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
