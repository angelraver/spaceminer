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
    ctx.font = "42px ArcadeClassic";
    ctx.fillStyle = "white";
    ctx.fillText(this.text, this.x, this.y);
    this.looping();
  }
}