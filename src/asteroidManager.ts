import Utils from './utils'
import { CONFIG, MINERALS, ASTEROIDS_MODELS_FRESH } from './config'
import { Mineral, AsteroidModel } from './types'
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
      id: 'asteroid_' + id,
      x: model.x,
      y: model.y,
      w: model.w,
      h: model.h,
      sheet: model.sheet.image,
      frameTotal: model.sheet.frameTotal,
      scaleX: Math.random() < 0.5 ? -1 : 1,
      scaleY: Math.random() < 0.5 ? -1 : 1,
      r: Utils.radiants(undefined, undefined, Math.random() * 180),
      hitsLimit: 9,
      mineral: this.getMineral()
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
  static getMineral(): Mineral {
    const numberRandom = Utils.random(1, 100)
    return MINERALS.find((m: Mineral) => numberRandom >= m.chance[0] && numberRandom <= m.chance[1])
  }

  static getModel(): AsteroidModel {
    const selected = ASTEROIDS_MODELS_FRESH[Utils.random(0, ASTEROIDS_MODELS_FRESH.length - 1)]
    const model = {
      ...selected,
      x: Utils.random(-g.OffSetHorizontal + selected.w / 2, CONFIG.GAME_WIDTH + g.OffSetHorizontal - selected.w / 2),
      y: Utils.random(-g.OffSetVertical + selected.h / 2, g.OffSetVertical + CONFIG.GAME_HEIGHT - selected.h / 2)   
    }

    const insideCenter = Utils.colision(model, CONFIG.CENTER_VOID)
    const overlaping = g.Asteroids.some((a) => Utils.colision(a, model))

    if (insideCenter || overlaping) {
      return this.getModel()
    } else {
      return model
    }
  }
}
