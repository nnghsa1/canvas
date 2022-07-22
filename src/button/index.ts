import Engine from '../engine';
import Component from '../engine/component';
import { BUTTON_HEIGHT, BUTTON_WIDTH, MOUSEDOWN, MOUSEUP } from './consts';

export default class MButton extends Component {
  engine: Engine;
  text: string;
  image: any;
  width!: number;
  height!: number;
  posX!: number;
  posY!: number;
  context: CanvasRenderingContext2D;
  font!: string;
  backgroundColor: string | undefined;
  constructor() {
    super();
    this.engine = new Engine('canvas');
    this.engine.childs.push(this);
    this.context = this.engine.getContext() as CanvasRenderingContext2D;
    this.text = '';
    this.init();
  }

  init() {
    this.setPosition();
    this.setRect();
    this.setFont();
  }

  draw() {
    // 1. 画button的背景
    this.context.fillStyle = this.backgroundColor || 'white';
    this.context.fillRect(this.posX, this.posY, this.width, this.height);
    this.context.strokeRect(this.posX, this.posY, this.width, this.height);

    // 2. 画button的内容
    this.context.fillStyle = 'black';
    if (this.text) {
      this.context.font = this.font;
      this.context.fillText(this.text, this.posX + this.width * 0.1, this.posY + this.height * 0.8, this.width * 0.8);
    } else if (this.image) {
      this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
  }

  setRect(width = 0, height = 0) {
    this.width = width || BUTTON_WIDTH;
    this.height = height || BUTTON_HEIGHT;
  }

  start() {
    this.engine.start();
  }

  setImage(image: any) {
    this.image = image;
  }

  setText(text: string) {
    this.text = text;
  }

  /**
   * 设置事件
   *
   * */
  setClick(cb: Function) {
    this.events.push({ name: MOUSEUP, fn: cb });
  }

  setHover(cb: Function) {
    this.events.push({ name: 'hover', fn: cb });
  }

  setMousedown(cb: Function) {
    this.events.push({
      name: MOUSEDOWN,
      fn: (e: any) => {
        this._onMouseDown(e);
        cb(e);
      },
    });
  }

  setMouseUp(cb: Function) {
    this.events.push({
      name: MOUSEUP,
      fn: (e: any) => {
        this._onMOuseUp(e);
        cb(e);
      },
    });
  }

  _onMouseDown(e: any) {
    this.backgroundColor = 'gray';
    this.draw();
  }

  _onMOuseUp(e: any) {
    this.backgroundColor = undefined;
    this.draw();
  }

  setPosition(x = 0, y = 0) {
    this.posX = x;
    this.posY = y;
  }

  setFont(font = '16px sans-serif') {
    this.font = font;
  }

  X() {
    return this.posX;
  }
  Y() {
    return this.posY;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
}
