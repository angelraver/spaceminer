import SPRITE from "./sprite";
const gt = globalThis
/**
 * Extends SPRITE to add background features
 */
export default class SCENARIO extends SPRITE {
  hd: number
  wd: number
  yd: number
  xd: number
  constructor(props: any) {
    super(props);
    this.hd = props.hd
    this.wd = props.wd
    this.yd = props.yd
    this.xd = props.xd
  }
  /**
   * Overwrite draw
   */
  draw(): void {
    CanGoLeft = false
    CanGoRight = false
    CanGoTop = false
    CanGoBottom = false
    if (GoingLeft && this.xd < 0) {
      CanGoLeft = true
      this.xd = this.xd + Speed
    }
    if (GoingRight && this.xd > OffSetHorizontal * -2) {
      CanGoRight = true
      this.xd = this.xd - Speed
    }
    if (GoingTop && this.yd < 0) {
      CanGoTop = true
      this.yd = this.yd + Speed
    }
    if (GoingBottom && this.yd > OffSetVertical * -2) {
      CanGoBottom = true
      this.yd = this.yd - Speed
    }
  
    const image = this.image,
    sourceX = 0, 
    sourceY = this.sheetY,
    sourceW = this.w,
    sourceH = this.h,
    destinyX = this.xd,
    destinyY = this.yd,
    destinyW = this.wd,
    destinyH = this.hd
    ctx.drawImage(image, sourceX, sourceY, sourceW, sourceH, destinyX, destinyY, destinyW, destinyH)
  }
}
