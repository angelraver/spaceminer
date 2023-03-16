import Utils from './utils'
import SPRITE from './sprite'
import TEXT from './text'
import { Mineral, Ordinal } from './types'
import { ASTEROIDS_MODELS_BREAK } from './config'

/**
 * Extend SPRITE to add asteroid features
 */
export default class ASTEROID extends SPRITE {
  mineral: Mineral
  modelCurrent: number
  modelNew: number
  empty: boolean
  constructor(props: any) {
    super(props)
    this.mineral = props.mineral
    this.empty = false
  }

  /**
   * Manage the click on the CurrentAsteroid
   * - Update the cargo
   * - Update the asteroid sprites
   * @returns nothing
   */
  click(e: any) {
    if (
      g.Hero.cargoMineralsFull
      || g.CurrentAsteroid.empty
      || !g.CurrentAsteroid.mineral
      || !g.CurrentAsteroid.isClickIn(e)
    ) {
      return
    }

    // hit the asteroid
    this.hit() 

    // update the model and xp points
    switch(this.hits) {
      case 3:
        this.modelNew = 0
        g.Hero.xp += 3
        TEXT.hiting('hit_' + this.id, 1, this.x, this.y) 
        break
      case 6:
        this.modelNew = 1
        TEXT.hiting('hit_' + this.id, 4, this.x, this.y) 
        g.Hero.xp += 5 
        break
    }

    // changing the asteroid visual
    if (this.modelCurrent != this.modelNew) {
      this.modelCurrent = this.modelNew 
      let model = ASTEROIDS_MODELS_BREAK[this.modelCurrent] 
      g.Asteroids = g.Asteroids.map((asteroid) => {
        if (asteroid.id === this.id) {
          asteroid.h = model.h 
          asteroid.w = model.w 
          asteroid.sheet = model.sheet.image
          asteroid.updateImage() 
        }
        return asteroid 
      }) 
    }

    // asteroid going empty
    if (this.hits === this.hitsLimit) {
      g.Hero.addCargoMineral()
      this.empty = true
      this.destroy() 
      g.Hero.xp += 8 
    }
  }
  
  destroy(): void {
    this.sheet = 'a-empty.png'
    this.updateImage()
  }

  isClickIn(e: Ordinal): boolean {
    return Utils.isHiting(e, this)
  }
}
