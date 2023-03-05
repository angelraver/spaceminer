import SPRITE from "./sprite";
/**
 * Extends SPRITE to add text features
 */
export default class CROSSHAIR extends SPRITE {
  constructor(props: any) {
    super(props)
    this.currentLoop = 0
    this.loops = 3
  }
  /**
   * Draw the text on canvas
   * - Apply looping
   */
  draw(): void {
    CurrentAsteroid = Hero.colisionWith(Asteroids)
    if (!CurrentAsteroid) return

    this.x = CurrentAsteroid.x
    this.y = CurrentAsteroid.y

    this.looping()
    if (this.currentLoop === this.loops) {
      this.r++
      this.r = this.r > 360 ? 0 : this.r++
      this.currentLoop = 0
    }

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.r)
    // ctx.scale(this.scaleX, this.scaleY)
    ctx.drawImage(this.image, 0, this.sheetY, this.w, this.h, 0 - this.w / 2, 0 - this.h / 2, this.w, this.h)

    // ctx.beginPath()
    // ctx.lineWidth = 6
    // ctx.strokeStyle = 'blue'
    // ctx.rect(0 - this.w / 2, 0 - this.h / 2, this.w, this.h)
    // ctx.stroke()
    

    ctx.restore()
    // pixelate(this)
  }
 
}