import TEXT from "./text"
import Utils from "./utils"
import { CONFIG, ASTEROIDS_MODELS, MINERALS } from "./config"
import { Mineral } from './types'
import ASTEROID from "./asteroid"

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
   * Refesh the Asteroids array excluding the given id
   * @param id 
   */
  static destroy(id: string) {
    g.Asteroids = g.Asteroids.map((a) => {
      if (a.id === id) {
        a.sheet = 'a-empty.png'
      }
      a.updateImage()
      return a
    })
  }

  /**
   * Manage the click on the asteroids
   * - Update the cargo
   * - Update the asteroid sprites
   * @returns nothing
   */
  static click(e: any) {
    if (!g.CurrentAsteroid) return false 
    if (!Utils.hit(e, g.CurrentAsteroid)) return false
    if (g.Hero.cargoMineralsFull) return false

    // hit the asteroid
    g.CurrentAsteroid.hit() 

    // update the model and cargo points
    switch(g.CurrentAsteroid.hits) {
      case 3:
        g.CurrentAsteroid.modelNew = 1 
        g.Hero.cargo += 3 
        this.hiting('hit_' + g.CurrentAsteroid.id, 1, g.CurrentAsteroid.x, g.CurrentAsteroid.y) 
        break
      case 6:
        g.CurrentAsteroid.modelNew = 2 
        this.hiting('hit_' + g.CurrentAsteroid.id, 4, g.CurrentAsteroid.x, g.CurrentAsteroid.y) 
        g.Hero.cargo += 5 
        break
    }

    // changing the asteroid visual
    if (g.CurrentAsteroid.modelCurrent != g.CurrentAsteroid.modelNew) {
      g.CurrentAsteroid.modelCurrent = g.CurrentAsteroid.modelNew 
      let model = ASTEROIDS_MODELS[g.CurrentAsteroid.modelCurrent] 
      g.Asteroids = g.Asteroids.map((asteroid) => {
        if (asteroid.id === g.CurrentAsteroid.id) {
          asteroid.h = model.h 
          asteroid.w = model.w 
          asteroid.sheet = model.sheet 
          asteroid.updateImage() 
        }
        return asteroid 
      }) 
    }

    // asteroid going empty
    if (g.CurrentAsteroid.hits === g.CurrentAsteroid.hitsLimit) {
      g.Hero.addCargoMineral()
      g.CurrentAsteroid.empty = true
      this.destroy(g.CurrentAsteroid.id) 
      g.Hero.cargo += 8 
    }
  }

  /**
   * Adds a hit label (SPRITE type TEXT) to the global array of Hitlabels
   * @param id 
   * @param number 
   * @param x 
   * @param y 
   */
  static hiting(id: string, number: number, x: number, y: number) {
    const hitLabel: TEXT = new TEXT({
      id: id,
      text: '+' + number,
      x: x,
      y: y,
      loops: 30
    }) 
    g.HitsLabels.push(hitLabel) 
  } 

  static getMineral(): Mineral {
    const numberRandom = Utils.random(0, 100)
    return MINERALS.find((m: Mineral) => numberRandom > m.chance[0] && numberRandom < m.chance[1])
  }
}
