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
      // for the background to move different from other sprites for the ilusion of deep
      g.bkgProportion = 2
      if (g.Hero.goingTop) {
        this.y = this.y + g.Speed / g.bkgProportion
      }
      if (g.Hero.goingRight) {
        this.x = this.x - g.Speed / g.bkgProportion
      }
      if (g.Hero.goingBottom) {
        this.y = this.y - g.Speed / g.bkgProportion
      }
      if (g.Hero.goingLeft) {
        this.x = this.x + g.Speed / g.bkgProportion
      }
    }
}
