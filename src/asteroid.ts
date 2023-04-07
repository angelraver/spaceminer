import Utils from './utils'
import SPRITE from './sprite'
import Sound from './sound'
import { Ordinal } from './types'
import EXPLOSION from './explosion'

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
        EXPLOSION.add({ x: this.x, y: this.y })
        this.heroMining(3)
        console.log(1)
        break
      case 6:
        EXPLOSION.add({ x: this.x, y: this.y })
        this.heroMining(5)
        console.log(2)
        break
      case this.hitsLimit: // asteroid going empty
        EXPLOSION.add({ x: this.x, y: this.y })
        this.setEmpty()
        g.Hero.addCargoMineral()
        console.log(3)
        break
      default:
        console.log(4 )
        Sound.play('miningclick')
        break
    }
  }
  
  
  heroMining(xp: number): void {
    g.Hero.mining(xp, this.x, this.y)
    Sound.play('pickoupcoin')
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
