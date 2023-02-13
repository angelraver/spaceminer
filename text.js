class TEXT extends SPRITE {
  constructor(props) {
    super(props);
    this.text = props.text;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(this.text, this.x, this.y);
    this.looping();
  }
}