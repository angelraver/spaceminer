import EXPLOSION from './explosion'
import { MINERAL_MODELS, ASTEROID_MODELS } from './config'
import Utils from './utils'
import SPRITE from './sprite'
import Sound from './sound'
import { Ordinal, AsteroidModel, MineralModel } from './types'
import TEXT from './text'

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

    if (g.Hero.cargoMineralsFull) {
      TEXT.hiting('FULL', this.x, this.y, 'orange', 'black')
      return
    }

    // hit the asteroid
    this.hit()

    // update the model and xp points
    switch(this.hits) {
      case 1:
        EXPLOSION.add({ x: this.x, y: this.y })
        this.heroMining(3)
        break
      case 2:
        EXPLOSION.add({ x: this.x, y: this.y })
        this.heroMining(5)
        break
      case this.hitsLimit: // asteroid going empty
        EXPLOSION.add({ x: this.x, y: this.y })
        this.setEmpty()
        g.Hero.addCargoMineral()
        break
      default:
        break
    }
  }
  
  
  heroMining(xp: number): void {
    g.Hero.mining(xp, this.x, this.y)
    Sound.play('miningclick')
    // Sound.play('pickoupcoin')
  }
  
  setEmpty(): void {
    Sound.play('asteroidEmpty')
    this.empty = true
    this.sheet.i = 'a-empty'
    this.updateImage()
  }

  isClickIn(e: Ordinal): boolean {
    return Utils.isHiting(e, this)
  }

  /**
   * Returns an SPRITE with random position
   * @param id string
   * @returns SPRITE
   */
  static create( id: string): ASTEROID {
    const model: AsteroidModel = this.getModel()
    const asteroid = new ASTEROID({
      id: 'a' + id,
      x: model.x,
      y: model.y,
      w: model.w,
      h: model.h,
      sheet: model.sheet,
      // scaleX: Math.random() < 0.5 ? -1 : 1,
      // scaleY: Math.random() < 0.5 ? -1 : 1,
      mineralType: this.getRandomMineralType()
    }) 

    return asteroid 
  }

  /**
   * Updates g.Asteroids, each asteroid is related with the previous ones
   * it must be this way to avoid overlaping
   */
  static createGroup(qty: number): void {
    const that = this
    for (let i = 0; i < qty; i++) {
      g.Asteroids.push(that.create(i.toString()))
    }
  }
  
  /**
   * returns the one mineral for the asteroid, from the collection of minerals based on probability of occurrence
   *
   */
  static getRandomMineralType(): string {
    const numberRandom = Utils.random(1, 100)
    return MINERAL_MODELS.find((m: MineralModel) => numberRandom >= m.chance[0] && numberRandom <= m.chance[1]).type
  }

  static getModel(): AsteroidModel {
    const selected = ASTEROID_MODELS[Utils.random(0, ASTEROID_MODELS.length - 1)]
    const model = {
      ...selected,
      x: Utils.random(-g.OffSetHorizontal + selected.w / 2, g.W + g.OffSetHorizontal - selected.w / 2),
      y: Utils.random(-g.OffSetVertical + selected.h / 2, g.OffSetVertical + g.H - selected.h / 2)
    }
    const modelWithDimensionsCalculated = {
      ...model,
      w: model.w,
      h: model.h
    }

    const insideCenter = Utils.colision(modelWithDimensionsCalculated, g.CenterVoid)
    const overlaping = g.Asteroids.some((a) => Utils.colision(a, modelWithDimensionsCalculated))

    if (insideCenter || overlaping) {
      return this.getModel()
    } else {
      return model
    }
  }
  draw(): void {
    console.log(this.rotationDirection)
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
