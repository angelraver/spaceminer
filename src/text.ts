import SPRITE from "./sprite";
const gt = globalThis
/**
 * Extends SPRITE to add text features
 */
export default class TEXT extends SPRITE {
  constructor(props: any) {
    super(props);
    this.text = props.text;
  }
  /**
   * Draw the text on canvas
   * - Apply looping
   */
  draw() {
    gt.ctx.fillStyle = "white";
    gt.ctx.font = "30px Arial";
    gt.ctx.fillText(this.text, this.x, this.y);
    this.looping();
  }
}