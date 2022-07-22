
export default class Canvas {
  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'canvas';
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

  }

  init() {
    this.setStyle();
  }

  getCanvas() {
    return this.canvas;
  }

  test() {
    console.log(this.canvas.getContext('2d'));
  }

  setStyle() {
    const ctx = this.ctx;
  }

  draw() {
    const ctx = this.ctx;
    ctx.font = "48px serif";
    ctx.fillText("Hello world", 10, 50);
  }
  
}


