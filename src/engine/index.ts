import { KEYDOWN, KEYPRESS, KEYUP, MOUSEDOWN, MOUSEMOVE, MOUSEUP } from '../button/consts';
import Stage from './objectModel/stage';

export default class Engine {
  enginHandler: any;
  gameHandler: any;
  context: any;
  container: any;
  stage: Stage;
  frameTimeStamp: number;
  keyboardEvents: any[];
  childs: any[];

  constructor(type: string) {
    if (type === 'canvas') {
      this.container = document.getElementById('canvas');
    } else {
      this.container = document.getElementById('svg');
    }
    this.stage = new Stage(this.container);
    this.context = this.container.getContext('2d');
    this.frameTimeStamp = 0;
    this.setContainerSize();
    this.bingEvent();

    this.keyboardEvents = [];
    this.childs = [];
  }

  init() {
    // this.start();
  }

  start() {
    const frame = (timeStamp: number) => {
      const context = this.getContext();
      this.setBackground(context);
      let t = 0;
      if (this.frameTimeStamp) {
        t = timeStamp - this.frameTimeStamp;
      }
      this.frameTimeStamp = timeStamp;
      context.textBaseline = 'middle';
      context.fillStyle = '#FFF';
      context.fillText(`fps: ${Math.floor((1 / t) * 1000)}`, 100, 20);

      this.stage.maps.forEach(map => {
        map.update?.();
        map.draw(context);
      });

      this.stage.items.forEach((item: any) => {
        item.update?.();
        item.draw(this.context);
      });

      this.gameHandler = requestAnimationFrame(frame);
    };

    this.gameHandler = requestAnimationFrame(frame);
  }

  // 清除画布
  clearScreen() {
    this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
  }

  drawScreen(imageData: any, dx = 0, dy = 0, dirtyX = 0, dirtyY = 0, dirtywidth = 0, dirtyheight = 0) {
    this.context.putImageData(imageData, 0, 0);
  }

  getWidth(): number {
    return this.container.width;
  }

  getHeight(): number {
    return this.container.height;
  }

  setContainerSize(width = 300, height = 300) {
    this.container.width = width;
    this.container.height = height;
  }

  getStage(): Stage {
    return this.stage;
  }

  getContext() {
    return this.context;
  }

  setBackground(context: any) {
    // TODO: 暂时这样设置背景
    context.fillStyle = 'white';
    context.fillRect(0, 0, this.getWidth(), this.getHeight());
  }

  /**
   * 绑定鼠标事件和键盘事件
   * 用于派发给child组件
   */
  bingEvent(): void {
    window.addEventListener(KEYDOWN, this._dispatchEvent.bind(this), false);
    window.addEventListener(KEYUP, this._dispatchEvent.bind(this), false);
    window.addEventListener(KEYPRESS, this._dispatchEvent.bind(this), false);
    window.addEventListener(MOUSEMOVE, this._dispatchEvent.bind(this), false);
    // window.addEventListener('mouseout', this._dispatchEvent, false);
    // window.addEventListener('mouseover', this._dispatchEvent, false);
    window.addEventListener(MOUSEDOWN, this._dispatchEvent.bind(this), false);
    window.addEventListener(MOUSEUP, this._dispatchEvent.bind(this), false);
  }

  // 派发事件给子组件
  _dispatchEvent(event: any): void {
    switch (event.type) {
      case KEYDOWN:
      case KEYPRESS:
      case KEYUP:
        this._dispatchKeyEvent(event);
        break;
      case MOUSEDOWN:
      case MOUSEUP:
      case MOUSEMOVE:
        this._dispatchMouseEvent(event);
        break;
      default:
        break;
    }
  }

  /**
   *
   * @param event
   */
  private _dispatchKeyEvent(event: KeyboardEvent) {
    this.childs.some(child => {
      child.triggerEvent(event);
      return event.cancelBubble
    });
  }

  private _dispatchMouseEvent(event: MouseEvent) {
    const { clientX, clientY } = event;
    this.childs.some(child => {
      const x = child.X();
      const y = child.Y();
      const width = child.getWidth();
      const height = child.getHeight();
      if (clientX >= x && clientX <= x + width && clientY >= y && clientY <= y + height) {
        child.triggerEvent(event);
      }
      return event.cancelBubble;
    });
  }

  // void ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
}
