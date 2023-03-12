import Utils from './utils'
import { CONFIG, MINERALS } from './config'
import { Mineral } from './types'
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
    const asteroid = new ASTEROID({
      id: 'asteroid_' + id,
      h: 105,
      w: 121,
      sheet: 'a1.png',
      frameTotal: 1,
      scaleX: Math.random() < 0.5 ? -1 : 1,
      scaleY: Math.random() < 0.5 ? -1 : 1,
      r: Utils.radiants(undefined, undefined, Math.random() * 180),
      hitsLimit: 9
    }) 
  
    asteroid.x = Utils.random(-g.OffSetHorizontal + asteroid.w / 2, CONFIG.GAME_WIDTH + g.OffSetHorizontal - asteroid.w / 2) 
    asteroid.y = Utils.random(-g.OffSetVertical + asteroid.h / 2, g.OffSetVertical + CONFIG.GAME_HEIGHT - asteroid.h / 2) 
  
    const insideCenter = Utils.colision(asteroid, CONFIG.CENTER_VOID)
    const overlaping = g.Asteroids.some((a) => Utils.colision(a, asteroid)) 
    if (insideCenter || overlaping) {
      return this.create(id) 
    }

    asteroid.mineral = this.getMineral()  
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
    const numberRandom = Utils.random(0, 100)
    return MINERALS.find((m: Mineral) => numberRandom > m.chance[0] && numberRandom < m.chance[1])
  }
}
