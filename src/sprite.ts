import { Ordinal } from './types'
import { CONFIG } from './config'
import Utils from './utils'
const TWEEN = require('@tweenjs/tween.js')

/**
 * Sprite class
 */
export default class SPRITE {
  id: string
  type: string
  y: number
  x: number
  h: number
  w: number
  frameX: number
  frameY: number
  frameW: number
  frameH: number
  frameVertical: boolean
  frameTotal: number
  frameCurrent: number
  sheet: string
  target: any
  r: number
  path: Array<Ordinal>
  currentPathPosition: number
  currentPosition: Ordinal
  previousPosition: Ordinal
  hits: number
  hitsLimit: number
  loops: number
  currentLoop: number
  scaleX: number
  scaleY: number
  image: HTMLImageElement
  moving: boolean
  mini: boolean
  metadata: any
  fixed: boolean
  internalState: {
    rotationInterval: any
  }
  constructor(props: any) {
    this.type = 'sprite'
    this.id = props.id
    this.y = props.y
    this.x = props.x
    this.h = props.h * g.Block
    this.w = props.w * g.Block
    this.frameX = props.frameX || 0
    this.frameY = props.frameY || 0
    this.frameW = props.frameW || this.w
    this.frameH = props.frameH || this.h
    this.frameVertical = props.frameDirection
    this.target = props.target
    this.r = props.r
    this.sheet = props.sheet
    this.frameTotal = props.frameTotal || 1
    this.frameCurrent = 0
    this.path = []
    this.currentPathPosition = 0
    this.currentPosition = undefined
    this.previousPosition = undefined
    this.hits = 0
    this.hitsLimit = props.hitsLimit ? props.hitsLimit : 1
    this.loops = props.loops
    this.currentLoop = 0
    this.scaleX = props.scaleX || 1
    this.scaleY = -props.scaleY || 1
    this.moving = false
    this.mini = props.mini || false
    this.metadata = props.metadata
    if (this.sheet) {
      this.updateImage()
    }
    this.internalState = { rotationInterval: undefined }
    this.fixed = props.fixed || false
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
    if (this.frameVertical) {
      this.frameY = this.frameCurrent * this.frameH
    } else {
      this.frameX = this.frameCurrent * this.frameW
    }
    if (this.frameCurrent < this.frameTotal - 1) {
      this.frameCurrent++
    } else {
      this.frameCurrent = 0
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
  colisionWith(elements: any[]): any {
    const that = this
    return elements.find((el) => Utils.colision(el, that))
  }

  /**
   * Complex draw on the canvas with rotation and scaling
   */
  draw(): void {
    if (!this.fixed) {
      this.positionByHero()
    }
    // if this is in colision with the VisibleArea, then is visible, then draw it
    if (this.isVisible()) {
      this.framing()
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(-this.r)
      ctx.scale(this.scaleX, this.scaleY)
      // ctx.fillStyle = 'red'
      // ctx.fillRect(0 - this.w / 2, 0 - this.h / 2, this.w, this.h)
      ctx.drawImage(this.image, this.frameX, this.frameY, this.frameW, this.frameH,  0 - this.w / 2,   0 - this.h / 2,     this.w,    this.h)
      ctx.restore()
      // pixelate(this)

    } else {
      if (this.mini) {
        this.drawMini()
      }
    }

    this.tweenUpdate()
  }

  tweenUpdate(): void {
    TWEEN.update()
  }

  /**
 * Draw the mini version of the sprite a the border of the screen in the direcction
 * of the original sprite, when is not visible
 */
  drawMini(): void {
    const position: Ordinal = { x: 0, y: 0 }
    if (this.x + this.w < 0) position.x = 0
    if (this.x > g.VisibleArea.w) position.x = g.VisibleArea.w - this.w / 4
    if (this.x >= 0 && this.x <= g.VisibleArea.w) position.x = this.x
    if (this.y + this.y < 0) position.y = 0
    if (this.y > g.VisibleArea.h) position.y = g.VisibleArea.h - this.w / 4
    if (this.y >= 0 && this.y <= g.VisibleArea.h) position.y = this.y

    ctx.drawImage(this.image, this.frameX, this.frameY, this.frameW, this.frameH,  position.x,   position.y,     this.w / 4,    this.h / 4)
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
    this.path = Utils.pathLinear(origin, targetFit, g.Speed)
    // this.r = Utils.radiants(origin, targetFit)
    this.internalState.rotationInterval = new TWEEN.Tween({r: this.r})
      .to({r: Utils.radiants(origin, targetFit)}, 550)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate((object: any) => this.r = object.r)
      .start()
  }
  /**
   * Set the x and y SPRITE props following the current position inside the phat prop.
   * Move forward inside the path prop elements
   */
  going(): void {
    const pathPos = this.currentPathPosition
    if (this.path[pathPos]) {
      this.currentPosition = this.path[pathPos]
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
    if (g.Hero.goingTop) {
      this.y = this.y + g.Speed
    }
    if (g.Hero.goingRight) {
      this.x = this.x - g.Speed
    }
    if (g.Hero.goingBottom) {
      this.y = this.y - g.Speed
    }
    if (g.Hero.goingLeft) {
      this.x = this.x + g.Speed
    }
  }
/**
 * returns if the curren sprite is on the visible game area
 * it has tolerance of the same this size in every direction
   * @returns boolean
 */
  isVisible(): boolean {
    return Utils.colision(g.VisibleArea, {
      x: this.x - this.w,
      y: this.y - this.h,
      w: this.w + this.w,
      h: this.h + this.h
    })
  }
}
