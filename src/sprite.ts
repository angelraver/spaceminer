import { CONFIG, Ordinal } from './config'
import Utils from './utils'

/**
 * Sprite class
 */
export default class SPRITE {
  id: string
  h: number
  w: number
  y: number
  x: number
  target: any
  r: number
  sheet: string
  totalFrames: number
  currentFrame: number
  sheetY: number
  path: Array<Ordinal>
  currentPathPosition: number
  currenPosition: Ordinal
  previousPosition: Ordinal
  hits: number
  hitsLimit: number
  loops: number
  currentLoop: number
  scaleX: number
  scaleY: number
  image: HTMLImageElement
  moving: boolean
  constructor(props: any) {
    this.id = props.id
    this.h = props.h
    this.w = props.w
    this.y = props.y
    this.x = props.x
    this.target = props.target
    this.r = props.r
    this.sheet = props.sheet
    this.totalFrames = props.totalFrames
    this.currentFrame = 0
    this.sheetY = 0
    this.path = []
    this.currentPathPosition = 0
    this.currenPosition = undefined
    this.previousPosition = undefined
    this.hits = 0
    this.hitsLimit = props.hitsLimit ? props.hitsLimit : 1
    this.loops = props.loops
    this.currentLoop = 0
    this.scaleX = props.scaleX || 1
    this.scaleY = -props.scaleY || 1
    this.moving = false
    if (this.sheet) {
      this.updateImage()
    }
  }
  /**
   * Set the spritesheet
   */
  updateImage(): void {
    var img = new Image()
    // img.crossOrigin = "Anonymous"
    img.src = CONFIG.SPRITES_FOLDER + this.sheet
    this.image = img
  }

  /**
   * Move the spritesheet to show the next frame in animation 
   */
  framing(): void {
    this.sheetY = this.currentFrame * this.h
    if (this.currentFrame < this.totalFrames - 1) {
      this.currentFrame++
    } else {
      this.currentFrame = 0
    }
  }
  /**
   * flip vertically through the canvas scale prop
   * @param direction 
   */
  flipVertically(direction: number): void {
    if (Math.sign(direction) == 1) {
      this.scaleY = -Math.abs(this.scaleY)
    } else {
      this.scaleY = Math.abs(this.scaleY)
    }
  }
  /**
   * flip horizontally through the canvas scale prop
   * @param direction 
   */
  flipHorizontally(direction: number): void {
    if (Math.sign(direction) == 1) {
      this.scaleX = -Math.abs(this.scaleX)
    } else {
      this.scaleX = Math.abs(this.scaleX)
    }
  }
  /**
   * Given an sprite array it returs the fist with collision
   * @param elements list of SPRITEs to check
   * @returns SPRITE collisioning with
   */
  colisionWith(elements: SPRITE[]): SPRITE {
    const that = this
    return elements.find((e) => Utils.colision(e, that))
  }
  /**
   * Complex draw on the canvas with rotation and scaling
   */
  draw(): void {
    this.framing()
    this.positionByHero()

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(-this.r)
    ctx.scale(this.scaleX, this.scaleY)
    ctx.drawImage(this.image, 0, this.sheetY, this.w, this.h, 0 - this.w / 2, 0 - this.h / 2, this.w, this.h)
    ctx.restore()
    // pixelate(this)
  }
  /**
   * Set the SPRITE.path property with the list of positions between the current position and the given target
   * Set the SPRITE.r (rotation) to follow the generated path
   * @param target 
   */
  setPath(target: any): void {
    this.currentPathPosition = 0
    const origin = { x: this.x, y: this.y }
    let targetFit = { x: target.x, y: target.y }
    this.path = Utils.pathLinear(origin, targetFit, Speed)
    this.r = Utils.radiants(origin, targetFit)
  }
  /**
   * Set the x and y SPRITE props following the current position inside the phat prop.
   * Move forward inside the path prop elements
   */
  going(): void {
    const pathPos = this.currentPathPosition
    if (this.path[pathPos]) {
      this.currenPosition = this.path[pathPos]
      this.previousPosition = this.path[pathPos > 0 ? pathPos - 1 : pathPos]
      this.moving = true
      this.x = this.path[pathPos].x
      this.y = this.path[pathPos].y
      this.currentPathPosition++
    } else {
      this.moving = false
    }

  }
  /**
   * Increase the hits prop
   */
  hit(): void {
    this.hits++
  }
  /**
   * Increase the currentLoop prop
   */
  looping(): void {
    this.currentLoop++
  }
  /**
   * Move the SPRITE up during the loop
   */
  fadeOut(): void {
    if (this.currentLoop < this.loops) this.y = this.y - 2
  }
  /**
   * Updates the x and y relative to the movement of the Hero
   */
  positionByHero(): void {
    if (Hero.goingTop) {
      console.log('goingTop')
      this.y = this.y + Speed
    }
    if (Hero.goingRight) {
      console.log('goingRight')
      this.x = this.x - Speed
    }
    if (Hero.goingBottom) {
      console.log('goingBottom')
      this.y = this.y - Speed
    }
    if (Hero.goingLeft) {
      console.log('goingLeft')
      this.x = this.x + Speed
    }
  }
}
