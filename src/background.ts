import SPRITE from './sprite'

/**
 * Extends SPRITE to add background features
 */
export default class BACKGROUND extends SPRITE {
  constructor(props: any) {
    super(props)
    this.type = 'bkg'
  }
  draw(): void {
    this.positionByHero()

    if (this.isVisible()) {
      this.drawImage({ ...this })
    }
  }
  /**
   * Updates the x and y origin of the image relative to the movement of the Hero
  */
  positionByHero(): void {
    if (this.fixed) return

    // for the background to move different from other sprites for the ilusion of deep
    g.BkgProportion = 2
    if (g.Hero.goingTop) {
      this.y = this.y + g.SpeedHero / g.BkgProportion
    }
    if (g.Hero.goingRight) {
      this.x = this.x - g.SpeedHero / g.BkgProportion
    }
    if (g.Hero.goingBottom) {
      this.y = this.y - g.SpeedHero / g.BkgProportion
    }
    if (g.Hero.goingLeft) {
      this.x = this.x + g.SpeedHero / g.BkgProportion
    }
  }
}
