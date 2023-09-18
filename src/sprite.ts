import { Ordinal, Sheet } from './types'
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
  fVertical: boolean
  fCurrent: number
  sheet: Sheet
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
    this.h = props.h
    this.w = props.w
    this.fVertical = props.fVertical
    this.target = props.target
    this.r = props.r

    if (props.id) {
      this.id = props.id
    }
    if (props.fixed) {
      this.fixed = props.fixed
    }
    if (props.hits) {
      this.hits = props.hits
    }
    if (props.hitsLimit) {
      this.hitsLimit = props.hitsLimit
    }
    if (props.loops) {
      this.loops = props.loops
      this.currentLoop = 1
    }
    if (props.metadata) {
      this.metadata = props.metadata
    }
    if (props.mini) {
      this.mini = props.mini
    }
    if (props.sheet) {
      this.sheet = props.sheet
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
  }
  /**
   * Set the spritesheet
   */
  updateImage(): void {
    this.img = g.Sprites[this.sheet.k]
  }

  /**
   * Move the spritesheet to show the next frame in animation 
   */
  framing(): void {
    if (!this.sheet.fQty) return

    if (this.fVertical) {
      this.sheet.y = this.fCurrent * this.sheet.h
    } else {
      this.sheet.x = this.fCurrent * this.sheet.w
    }
    if (this.fCurrent < this.sheet.fQty - 1) {
      this.fCurrent++
    } else {
      this.fCurrent = 0
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
   * Complex draw on the canvas with rotation and scaling and mini
   * can receive a inner callback to execute inside
   */
  draw(callBackInner = () => {}): void {
    this.looping()
    this.positionByHero()
    this.framing()
    this.going()

    if (this.isVisible()) {
      this.drawNormal(callBackInner)
    } else {
      this.drawMini()
    }
  }

  /**
   * executes applis rotation, scaleing and call the drawImage
   * can receive a inner callback to execute inside
   */
  drawNormal(callBackInner = () => {}): void {
    ctx.imageSmoothingEnabled = false
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(-this.r)
    ctx.scale(this.scaleX, this.scaleY)
    this.drawImage({ ...this, x: this.w / -2, y: this.h / -2 })
    callBackInner()
    ctx.restore()
    TWEEN.update()
  }

/**
 * executes the ctx.drawImage
 * can receive a inner callback to execute inside
 */
  drawImage({ x, y, w, h, img, sheet }: any) {
    ctx.drawImage(img, sheet.x, sheet.y, sheet.w, sheet.h, x, y, w, h)
  }

  /**
 * Draw the mini version of the sprite a the border of the screen in the direcction
 * of the original sprite, when is not visible
 */
  drawMini(): void {
    if (!this.mini) return

    const position: Ordinal = { x: 0, y: 0 }
    if (this.x + this.w < 0) position.x = 0
    if (this.x > g.VisibleArea.w) position.x = g.VisibleArea.w - this.w / 4
    if (this.x >= 0 && this.x <= g.VisibleArea.w) position.x = this.x
    if (this.y + this.y < 0) position.y = 0
    if (this.y > g.VisibleArea.h) position.y = g.VisibleArea.h - this.w / 4
    if (this.y >= 0 && this.y <= g.VisibleArea.h) position.y = this.y

    this.drawImage({ ...this, x: position.x, y: position.y, w: this.w / 4, h: this.h / 4 })
  }
  
  /**
   * Set the SPRITE.path property with the list of positions between the current position and the given target
   * Set the SPRITE.r (rotation) to follow the generated path
   * @param target 
   */
  setPath(target: Ordinal, speed: number): void {
    this.currentPathIndex = 0
    const origin = { x: this.x, y: this.y }
    const targetFit = { x: target.x, y: target.y }
    this.path = Utils.pathLinear(origin, targetFit, speed)
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
    this.hits = this.hits + 1
  }
  /**
   * Increase the currentLoop prop
   */
  looping(): void {
    this.currentLoop = this.currentLoop === this.loops ? 0 : this.currentLoop + 1
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
    if (this.fixed) return
    if (this.id === 'hero') return

    if (g.Hero) {
      if (g.Hero.goingTop) {
        this.y = this.y + g.SpeedHero
      }
      if (g.Hero.goingRight) {
        this.x = this.x - g.SpeedHero
      }
      if (g.Hero.goingBottom) {
        this.y = this.y - g.SpeedHero
      }
      if (g.Hero.goingLeft) {
        this.x = this.x + g.SpeedHero
      }
    }
  }
/**
 * returns if the curren sprite is on the visible game area
 * it has tolerance of the same this size in every direction
   * @returns boolean
 */
  isVisible(): boolean {
    if (!g.VisibleArea) return true

    return Utils.colision(g.VisibleArea, {
      x: this.x - this.w,
      y: this.y - this.h,
      w: this.w + this.w,
      h: this.h + this.h
    })
  }
}
