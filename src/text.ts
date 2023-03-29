import SPRITE from "./sprite";
/**
 * Extends SPRITE to add text features
 */
export default class TEXT extends SPRITE {
  text: string
  color: string
  colorLine: string
  size: number
  align: string // start / end / left / center / right
  constructor(props: any) {
    super(props)
    this.text = props.text
    this.color = props.color
    this.colorLine = props.colorLine
    this.size = props.size
    this.align = props.align || 'start'
  }
  /**
   * Draw the text on canvas
   * - Apply looping
   */
  draw() {
    this.fadeOut()
    ctx.font = `${this.size}px ArcadeClassic`
    ctx.fillStyle = this.color
    ctx.textAlign = 'end'
    ctx.fillText(this.text, this.x, this.y)
    ctx.strokeStyle = this.colorLine
    ctx.strokeText(this.text, this.x, this.y)
    this.looping()
  }

  /**
 * Adds a hit label (SPRITE type TEXT) to the global array of Hitlabels
 */
  static hiting(number: number, x: number, y: number) {
    const hitLabel: TEXT = new TEXT({
      text: '+' + number,
      x: x,
      y: y,
      color: 'white',
      colorLine: 'black',
      size: 32,
      loops: 30,
    }) 
    g.HitsLabels.push(hitLabel) 
  } 
}