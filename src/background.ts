import SPRITE from "./sprite";

/**
 * Extends SPRITE to add background features
 */
export default class BACKGROUND extends SPRITE {
  constructor(props: any) {
    super(props);
  }
  /**
   * Updates the x and y origin of the image relative to the movement of the Hero
   */
    positionByHero(): void {
      bkgProportion = 2
      if (Hero.goingTop) {
        this.y = this.y + Speed / bkgProportion
      }
      if (Hero.goingRight) {
        this.x = this.x - Speed / bkgProportion
      }
      if (Hero.goingBottom) {
        this.y = this.y - Speed / bkgProportion
      }
      if (Hero.goingLeft) {
        this.x = this.x + Speed / bkgProportion
      }
    }
}
