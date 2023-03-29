import Utils from './utils'
import SPRITE from './sprite'
import Sound from './sound'
import { Ordinal } from './types'

/**
 * Extend SPRITE to add asteroid features
 */
export default class ASTEROID extends SPRITE {
  mineralType: string
  modelCurrent: number
  modelNew: number
  empty: boolean
  constructor(props: any) {
    super(props)
    this.mineralType = props.mineralType
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
        g.Hero.mining(3, this.x, this.y)
        Sound.play('pickoupcoin')
        break
      case 6:
        this.modelNew = 1
        g.Hero.mining(5, this.x, this.y)
        Sound.play('pickoupcoin')
        break
      default:
        Sound.play('miningclick')
        break
    }

    // changing the asteroid visual
    // if (this.modelCurrent != this.modelNew) {
    //   this.modelCurrent = this.modelNew 
    //   let model = ASTEROIDS_MODELS_BREAK[this.modelCurrent] 
    //   g.Asteroids = g.Asteroids.map((asteroid) => {
    //     if (asteroid.id === this.id) {
    //       asteroid.h = model.h 
    //       asteroid.w = model.w 
    //       asteroid.sheet = model.sheet.img
    //       asteroid.updateImage() 
    //     }
    //     return asteroid 
    //   }) 
    // }

    // asteroid going empty
    if (this.hits === this.hitsLimit) {
      this.setEmpty()
      g.Hero.addCargoMineral()
    }
  }
  
  setEmpty(): void {
    Sound.play('asteroidEmpty')
    this.empty = true
    this.sheet = 'a-empty'
    this.updateImage()
  }

  isClickIn(e: Ordinal): boolean {
    return Utils.isHiting(e, this)
  }
}
