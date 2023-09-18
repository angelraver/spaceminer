import IMPACT from './impact'
import { MINERAL_MODELS, ASTEROID_MODELS, SPRITE_LIBRARY } from './config'
import Utils from './utils'
import SPRITE from './sprite'
import Sound from './sound'
import { Ordinal, Sheet, MineralModel } from './types'
import TEXT from './text'
import ENEMY from './enemy'

/**
 * Extend SPRITE to add asteroid features
 */
export default class ASTEROID extends SPRITE {
  mineralType: string
  modelCurrent: number
  modelNew: number
  empty: boolean
  rotationDirection: string
  rotationSpeed: number
  constructor(props: any) {
    super(props)
    this.mineralType = props.mineralType
    this.empty = false
    this.currentLoop = 0
    this.loops = 3
    this.rotationDirection = props.rotationDirection
    this.rotationSpeed = props.rotationSpeed
    this.r = Utils.radiants(undefined, undefined, Math.random() * 180)
    this.hitsLimit = 3
    this.rotationDirection = Utils.random(0, 1) === 1 ? 'r' : 'l'
    this.rotationSpeed = Utils.random(1, 3) * 0.01
  }
   /**
   * Returns an SPRITE with random position
   * @returns SPRITE
   */
    static create(): void {
      const model: Sheet = this.getModel()
      const asteroid = new ASTEROID({
        x: model.x,
        y: model.y,
        w: model.w,
        h: model.h,
        sheet: { ...model, x: 0, y: 0 },
        mineralType: this.getRandomMineralType()
      })
      const scaleRandom = Math.random() * 1 + 0.5
      asteroid.scaleX = scaleRandom
      asteroid.scaleY = scaleRandom

      g.Asteroids.push(asteroid) 
    }
  
  /**
   * returns a list of asteorids lists
   * one big list throws error on some devices
   */
  static setGroups(totalQty: number, groupLimit: number): any[] {
    const that = this
    const listsQty = Math.ceil(totalQty / groupLimit)
    return Array.from({ length: listsQty }, () => {
      return Array.from({ length: groupLimit }, () => {
        return that.create()
      })
    })
  }

  /**
   * Manage the click on the CurrentAsteroid
   * - Update the cargo
   * - Update the asteroid sprites
   * @returns nothing
   */
  click(e: any) {
    if (!g.CurrentAsteroid.isClickIn(e)) return
    if (g.CurrentAsteroid.empty) {
      TEXT.hiting('0', this.x, this.y, 'white', 'red')
      return
    }

    if (g.Hero.checkCargoFull()) {
      TEXT.hiting('FULL', this.x, this.y, 'orange', 'black')
      return
    }

    // hit the asteroid
    this.hit()

    // update the model and xp points
    switch(this.hits) {
      case 1:
        this.impact()
        this.heroMining(3)
        break
      case 2:
        this.impact()
        this.heroMining(5)
        break
      case this.hitsLimit: // asteroid going empty
        this.impact()
        this.setEmpty()
        g.Hero.addCargoMineral()
        ENEMY.spawn()
        break
      default:
        break
    }
  }

  impact(): void {
    IMPACT.add({ x: this.x, y: this.y }, 5, this.scaleX, this.scaleY)
  }
  
  heroMining(xp: number): void {
    g.Hero.mining(xp, this.x, this.y)
    Sound.play('miningclick')
    // Sound.play('pickoupcoin')
  }
  
  setEmpty(): void {
    Sound.play('asteroidEmpty')
    this.empty = true
    this.sheet = SPRITE_LIBRARY.asteroidEmpty
    this.updateImage()
  }

  isClickIn(e: Ordinal): boolean {
    return Utils.isHiting(e, this)
  }
  
  /**
   * returns the one mineral for the asteroid, from the collection of minerals based on probability of occurrence
   *
   */
  static getRandomMineralType(): string {
    const numberRandom = Utils.random(1, 100)
    return MINERAL_MODELS.find((m: MineralModel) => numberRandom >= m.chance[0] && numberRandom <= m.chance[1]).type
  }

  static getModel(): Sheet {
    const selected = ASTEROID_MODELS[Utils.random(0, ASTEROID_MODELS.length - 1)]
    const model = {
      ...selected,
      x: Utils.random(-g.W -g.OffSetHorizontal + selected.w * 2, g.W + g.OffSetHorizontal - selected.w * 2),
      y: Utils.random(-g.H -g.OffSetVertical + selected.h * 2, g.OffSetVertical + g.H - selected.h * 2)
    }

    const modelWithDimensionsCalculated = {
      ...model,
    }

    const insideCenter = Utils.colision(model, g.CenterVoid)
    const overlaping = g.Asteroids.flat().some((a) => {
      return Utils.colision(a, model)
    })
    if (insideCenter || overlaping) {
      return this.getModel()
    } else {
      return model
    }
  }

  draw(): void {
    this.looping()
    this.positionByHero()
    if (this.currentLoop === this.loops) {
      this.r = this.rotationDirection === 'r' ? this.r + this.rotationSpeed : this.r - this.rotationSpeed
      this.currentLoop = 0
    } 
    if (this.isVisible()) {
      this.drawNormal()
    }
  }
}
