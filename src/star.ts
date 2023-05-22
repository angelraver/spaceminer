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
}
