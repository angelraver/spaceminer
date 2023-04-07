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
  fX: number
  fY: number
  fW: number
  fH: number
  fVertical: boolean
  fQty: number
  fCurrent: number
  sheet: string
  target: any
  r: number
  path: Array<Ordinal>
  currentPathIndex: number
  currentPos: Ordinal
  previousPos: Ordinal
  hits: number
  hitsLimit: number
  loops: number
  currentLoop: number
  scaleX: number
  scaleY: number
  img: HTMLImageElement
  moving: boolean
  mini: boolean
  metadata: any
  fixed: boolean
  internalState: {
    rotationInterval: any
  }
  constructor(props: any) {
    this.type = 'spr'
    this.y = props.y
    this.x = props.x
    this.h = props.h * g.Block
    this.w = props.w * g.Block
    this.fX = props.fX || 0
    this.fY = props.fY || 0
    this.fW = props.fW || this.w
    this.fH = props.fH || this.h
    this.fVertical = props.fVertical
    this.target = props.target
    this.r = props.r

    if (props.id) {
      this.id = props.id
    }

    if (props.sheet) {
      this.sheet = props.sheet
    }

    if (props.metadata) {
      this.metadata = props.metadata
    }

    if (props.loops) {
      this.loops = props.loops
      this.currentLoop = 0
    }
    if (props.mini) {
      this.mini = props.mini
    }
    if (props.fQty) {
      this.fQty = props.fQty
    }
    if (props.hitsLimit) {
      this.hitsLimit = props.hitsLimit
    }
    if (props.scaleX) {
      this.scaleX = props.scaleX
    }
    if (props.scaleY) {
      this.scaleY = -props.scaleY
    }
    if (this.sheet) {
      this.updateImage()
    }
    if (props.fixed) {
      this.fixed = props.fixed
    }
  }
  /**
   * Set the spritesheet
   */
  updateImage(): void {
    var img = new Image()
    // img.crossOrigin = "Anonymous"
    img.src = CONFIG.SPRITES_FOLDER + this.sheet + '.png'
    this.img = img
  }

  /**
   * Move the spritesheet to show the next frame in animation 
   */
  framing(): void {
    if (this.fVertical) {
      this.fY = this.fCurrent * this.fH
    } else {
      this.fX = this.fCurrent * this.fW
    }
    if (this.fCurrent < this.fQty - 1) {
      this.fCurrent++
    } else {
      this.fCurrent = 0
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

      if (this.fQty) {
        this.framing()
      }
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(-this.r)
      ctx.scale(this.scaleX, this.scaleY)
      // ctx.fillStyle = 'red'
      // ctx.fillRect(0 - this.w / 2, 0 - this.h / 2, this.w, this.h)
      ctx.drawImage(this.img, this.fX, this.fY, this.fW, this.fH,  0 - this.w / 2,   0 - this.h / 2,     this.w,    this.h)
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

    ctx.drawImage(this.img, this.fX, this.fY, this.fW, this.fH,  position.x,   position.y,     this.w / 4,    this.h / 4)
  }
  
  /**
   * Set the SPRITE.path property with the list of positions between the current position and the given target
   * Set the SPRITE.r (rotation) to follow the generated path
   * @param target 
   */
  setPath(target: any): void {
    this.currentPathIndex = 0
    const origin = { x: this.x, y: this.y }
    let targetFit = { x: target.x, y: target.y }
    this.path = Utils.pathLinear(origin, targetFit, g.Speed)
    this.internalState = { rotationInterval: 0 }
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
    const pathPos = this.currentPathIndex
    if (this.path && this.path[pathPos]) {
      this.currentPos = this.path[pathPos]
      this.previousPos = this.path[pathPos > 0 ? pathPos - 1 : pathPos]
      this.moving = true
      this.x = this.path[pathPos].x
      this.y = this.path[pathPos].y
      this.currentPathIndex++
    } else {
      this.moving = false
    }

  }
  /**
   * Increase the hits prop
   */
  hit(): void {
    if (!this.hits) {
      this.hits = 0
    }
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
