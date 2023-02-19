import { CONFIG } from './config'
import Utils from './utils'

const gt = globalThis

export default class SPRITE {
  id: string
  h: number
  w: number
  y: number
  x: number
  target: any
  r: number
  sheet: string
  totalFrames: number
  currentFrame: number
  sheetY: number
  path: Array<any>
  currentPathPosition: number
  hits: number
  hitsLimit: number
  loops: number
  currentLoop: number
  scaleX: number
  scaleY: number
  text: string
  image: HTMLImageElement
  constructor(props: any) {
    this.id = props.id;
    this.h = props.h;
    this.w = props.w;
    this.y = props.y;
    this.x = props.x;
    this.target = props.target;
    this.r = props.r;
    this.sheet = props.sheet;
    this.totalFrames = props.totalFrames;
    this.currentFrame = 0;
    this.sheetY = 0;
    this.path = [];
    this.currentPathPosition = 0;
    this.hits = 0;
    this.hitsLimit = props.hitsLimit ? props.hitsLimit : 1;
    this.loops = props.loops;
    this.currentLoop = 0;
    this.scaleX = props.scaleX || 1;
    this.scaleY = -props.scaleY || 1;
    this.text = props.text;
    if (this.sheet) {
      this.updateImage();
    }
  }
  updateImage(): void {
    var img = new Image();
    // img.crossOrigin = "Anonymous";
    img.src = CONFIG.SPRITES_FOLDER + this.sheet;
    this.image = img;
  }

  /**
   * Move the spritesheet to show the next frame in animation 
   */
  framing(): void {
    this.sheetY = this.currentFrame * this.h;
    if (this.currentFrame < this.totalFrames - 1) {
      this.currentFrame++;
    } else {
      this.currentFrame = 0;
    }
  }
  flipVertically(direction: number): void {
    if (Math.sign(direction) == 1) {
      this.scaleY = -Math.abs(this.scaleY);
    } else {
      this.scaleY = Math.abs(this.scaleY);
    }
  }
  flipHorizontally(direction: number): void {
    if (Math.sign(direction) == 1) {
      this.scaleX = -Math.abs(this.scaleX);
    } else {
      this.scaleX = Math.abs(this.scaleX);
    }
  }
  colisionWith(elements: SPRITE[]): SPRITE {
    const that = this;
    return elements.find((e) => Utils.colision(e, that));
  }
  draw(): void {
    // ctx.scale(this.scaleX, this.scaleY);
    gt.ctx.drawImage(this.image, 0, this.sheetY, this.w, this.h, this.x, this.y, this.w, this.h);
  }
  drawing(): void {
    gt.ctx.save()
    gt.ctx.translate(this.x, this.y);
    // ctx.rotate(270 * (Math.PI / 180));
    gt.ctx.rotate(-this.r);
    gt.ctx.scale(this.scaleX, this.scaleY);
    gt.ctx.drawImage(this.image, 0, this.sheetY, this.w, this.h, 0 - this.w / 2, 0 - this.h / 2, this.w, this.h);
    gt.ctx.restore();
    // pixelate(this);
  }
  setPath(target: any): void {
    this.currentPathPosition = 0;
    const origin = { x: this.x, y: this.y }
    let targetFit = { x: target.x, y: target.y }
    this.path = Utils.pathLinear(origin, targetFit, gt.Speed);
    this.r = Utils.radiants(origin, targetFit);
  }
  going(): void {
    if (this.path[this.currentPathPosition]) {
      this.x = this.path[this.currentPathPosition].x;
      this.y = this.path[this.currentPathPosition].y;
      this.currentPathPosition++;
    }
  }
  hit(): void {
    this.hits++;
  }
  looping(): void {
    this.currentLoop++;
  }
  fadeOut(): void {
    if (this.currentLoop < this.loops) this.y = this.y - 2;
  }
}
