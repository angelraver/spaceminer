import BACKGROUND from './background'
import { CONFIG } from './config'


const starImages = [
  
]
/**
 * Extends BACKGROUND to add STAR features
 */
export default class STAR extends BACKGROUND {
  constructor(props: any) {
    super(props)
    this.type = 'star'
  }

  updateImage(): void {
    this.img = g.Images.stars
  }

  /**
   * returns a list of asteorids lists
   * one big list throws error on some devices
   */
  static getGroups(): STAR[] {
    return g.StarsData.map((star) => {
      return new STAR({
        x: star.x, y: star.y, w: 32,h: 32,
        sheet: { x: star.fX, y: star.fY, w: 50, h: 50, fQty: 1 }
      })
    })
  }
}
