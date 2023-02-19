import SPRITE from "./sprite";
const gt = globalThis

export default class TEXT extends SPRITE {
  constructor(props: any) {
    super(props);
    this.text = props.text;
  }

  draw() {
    gt.ctx.fillStyle = "white";
    gt.ctx.font = "30px Arial";
    gt.ctx.fillText(this.text, this.x, this.y);
    this.looping();
  }
}