import Utils from './utils'
import { MINERAL_MODELS, ASTEROID_MODELS } from './config'
import { MineralModel, AsteroidModel } from './types'
import ASTEROID from './asteroid'

/**
 * Static class to manage the SPRITES asteroids
 */
export default class AsteroidManager {
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
      sheet: model.sheet.img,
      fX: model.sheet.x,
      fY: model.sheet.y,
      fW: model.sheet.w,
      fH: model.sheet.h,
      fQty: model.sheet.fQty,
      // scaleX: Math.random() < 0.5 ? -1 : 1,
      // scaleY: Math.random() < 0.5 ? -1 : 1,
      r: Utils.radiants(undefined, undefined, Math.random() * 180),
      hitsLimit: 9,
      mineralType: this.getRandomMineralType()
    }) 
 
    return asteroid 
  }

  /**
   * Returns an array of SPRITES Asteroids
   * @param n amount of SPRITES
   * @returns SPRITE[]
   */
  static createGroup(): void {
    const that = this
    for (let i = 0; i < g.AsteroidsNumber; i++) {
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
      w: model.w * g.Block,
      h: model.h * g.Block
    }

    const insideCenter = Utils.colision(modelWithDimensionsCalculated, g.CenterVoid)
    const overlaping = g.Asteroids.some((a) => Utils.colision(a, modelWithDimensionsCalculated))

    if (insideCenter || overlaping) {
      return this.getModel()
    } else {
      return model
    }
  }
}
