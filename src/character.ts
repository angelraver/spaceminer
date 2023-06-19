import { SPRITE_LIBRARY } from './config'
import { Ordinal, Sheet } from './types'
import Utils from './utils'
import Sound from './sound'
import SPRITE from './sprite'
import PLAIN from './plain'
type CharacterId = 'characterMinerGlad' | 'characterMinerSad'

export default class CHARACTER extends SPRITE {
  origin: Ordinal
  destiny: Ordinal
  speed: number
  xDirection: 'left' | 'right' | 'still'
  yDirection: 'top' | 'bottom' | 'still'
  dialog: string
  background: PLAIN
  loopsCompleted: number
  done: boolean
  constructor(props: any) {
    super(props)
    this.origin = props.origin
    this.destiny = props.destiny
    this.speed = props.speed
    this.x = props.origin.x
    this.y = props.origin.y
    this.xDirection = this.getXDirection()
    this.yDirection = this.getYDirection()
    this.dialog = props.dialog
    this.loopsCompleted = 0
    this.done = false
    this.background = new PLAIN({
      x: 0, y: g.H / 2 - 165,
      w: g.W, h: 330,
      color: props.backgroundColor || 'blue',
      alpha: 0.2
    })
  }
  remove(): void {
    const origin = { ...this.origin }
    const destiny = { ...this.destiny }
    this.origin = destiny
    this.destiny = origin
    this.xDirection = this.getXDirection()
    this.yDirection = this.getYDirection()
    this.dialog = ''
  }
  getX(): number {
    const speed = this.speed
    const x = this.x
    const isNear = x + speed >= this.destiny.x - speed && x - speed <= this.destiny.x + speed
    if (this.xDirection === 'still' || isNear) {
      this.xDirection = 'still'
      return this.x
    } else {
      if (this.xDirection === 'left') {
        return this.x - this.speed
      } else {
        return this.x + this.speed
      }
    }
  }
  getY(): number {
    const isNear = this.y - this.speed >= this.destiny.y || this.y + this.speed <= this.destiny.y
    if (this.yDirection === 'still' || isNear) {
      return this.y
    } else {
      if (this.yDirection === 'top') {
        return this.y - this.speed
      } else {
        return this.y + this.speed
      }
    }
  }
  getXDirection() {
    return this.destiny.x === this.origin.x ? 'still' : this.destiny.x < this.origin.x ? 'left' : 'right'
  }
  getYDirection() {
    return this.destiny.y === this.origin.y ? 'still' : this.destiny.y > this.origin.y ? 'bottom' : 'top'
  }
  checkLoops(): void {
    if (this.currentLoop === this.loops) {
      this.currentLoop = 0
      this.loopsCompleted = this.loopsCompleted + 1
      if (this.loopsCompleted === 1) {
        this.remove()
      }
    }
    this.done = this.loopsCompleted === 2
  }
  move(): void {
    if (this.isVisible()) {
      this.background.draw()
    }

    this.draw()
    this.checkLoops()
    this.x = this.getX()
    this.y = this.getY()
    if (this.dialog.length > 0 && this.xDirection === 'still' && this.yDirection === 'still') {
      ctx.font = '30px ArcadeClassic'
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      let wrappedText = Utils.wrapText(this.dialog, this.destiny.x + 150, this.y - 100, 200, 32)
      wrappedText.forEach(function(item) {
        ctx.fillText(item.line, item.x, item.y);
      })
    }
  }
  drawing() {
    if (this.done) {
      g.Characters = g.Characters.filter((c) => c.id === this.id)
      return
    }
    this.move()
  }

  static call(characterId: CharacterId, dialog: string, backgroundColor: string ) {
    const sheet = SPRITE_LIBRARY[characterId]
    g.Characters.push(new CHARACTER({
      id: characterId,
      origin: { x: -200, y: g.H / 2 },
      destiny: { x: 150, y: g.H / 2 },
      w: sheet.w, h: sheet.h, sheet: sheet,
      scaleX: 10,
      scaleY: -10,
      fixed: true,
      speed: 20,
      dialog,
      loops: 50,
      backgroundColor
    }))
  }
}
