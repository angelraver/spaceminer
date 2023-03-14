import SPRITE from "./sprite";
/**
 * Extends SPRITE to add text features
 */
export default class TEXT extends SPRITE {
  text: string
  constructor(props: any) {
    super(props);
    this.text = props.text;
  }
  /**
   * Draw the text on canvas
   * - Apply looping
   */
  draw() {
    this.fadeOut()
    ctx.font = "42px ArcadeClassic";
    ctx.fillStyle = "white";
    ctx.fillText(this.text, this.x, this.y);
    ctx.strokeStyle = "black";
    ctx.strokeText(this.text, this.x, this.y);
    this.looping();
  }

  /**
 * Adds a hit label (SPRITE type TEXT) to the global array of Hitlabels
 */
  static hiting(id: string, number: number, x: number, y: number) {
    const hitLabel: TEXT = new TEXT({
      id: id,
      text: '+' + number,
      x: x,
      y: y,
      loops: 30
    }) 
    g.HitsLabels.push(hitLabel) 
  } 
}