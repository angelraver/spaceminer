import SPRITE from "./sprite";

/**
 * Extends SPRITE to add background features
 */
export default class BACKGROUND extends SPRITE {
  ht: number
  wt: number
  yt: number
  xt: number
  constructor(props: any) {
    super(props);
    this.ht = props.ht
    this.wt = props.wt
    this.yt = props.yt
    this.xt = props.xt
  }
  /**
   * Overwrite draw
   */
  draw(): void {
    this.positionByHero()
    const image = this.image,
    sourceX = this.x, 
    sourceY = this.y,
    sourceW = this.w,
    sourceH = this.h,
    destinyX = this.xt,
    destinyY = this.yt,
    destinyW = this.wt,
    destinyH = this.ht
    ctx.drawImage(image, sourceX, sourceY, sourceW, sourceH, destinyX, destinyY, destinyW, destinyH)
  }
    /**
   * Updates the x and y origin of the image relative to the movement of the Hero
   */
    positionByHero(): void {
      bkgProportion = 2
      if (Hero.goingTop) {
        this.yt = this.yt + Speed / bkgProportion
      }
      if (Hero.goingRight) {
        this.xt = this.xt - Speed / bkgProportion
      }
      if (Hero.goingBottom) {
        this.yt = this.yt - Speed / bkgProportion
      }
      if (Hero.goingLeft) {
        this.xt = this.xt + Speed / bkgProportion
      }
    }
}
