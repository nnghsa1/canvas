import { MOUSEDOWN, MOUSEMOVE, MOUSEUP } from '../button/consts';
import Engine from '../engine';
import Component from '../engine/component';

interface ITABLEINFO {
  table: any[];
  x: number;
  y: number;
  cellInfo: any;
}

export default class MTextArea extends Component {
  text: string;
  engine: Engine;
  context: CanvasRenderingContext2D;
  backgroundColor: string | undefined;
  posX!: number;
  posY!: number;
  width!: number;
  height!: number;
  font!: string;
  tableInfo: ITABLEINFO;
  intervalCursor: any;
  imageData!: ImageData;
  cursorColor: number;
  cursorPosition: { x: number; y: number; };
  preCursorPosition: { x: number; y: number; };
  mouseInfo: { mousedown: boolean; mousemove: boolean, mousedownX: number, mousedownY: number };
  input!: HTMLInputElement;
  constructor() {
    super();

    this.engine = new Engine('canvas');
    this.engine.childs.push(this);
    this.context = this.engine.getContext() as CanvasRenderingContext2D;

    // 存储文字
    this.text = '';
    this.tableInfo = { x: 0, y: 0, table: [], cellInfo: {} };
    this.init();
    // 光标相关
    this.intervalCursor = 0;
    this.cursorPosition = { x: 18, y: 25 };
    this.cursorColor = 1;
    this.preCursorPosition = { x: 18, y: 25 };

    // 鼠标相关信息
    this.mouseInfo = {
      mousedown: false,
      mousemove: false,
      mousedownX: 18,
      mousedownY: 25
    }
  }

  init() {
    this.setPosition();
    this.setRect();
    this.setFont();
    this.initTable();
    this.createInput();
    this.setMousedown(() => { })
    this.setMouseUp(() => { })
    this.setMouseMove(() => { })
  }
  setFont(font = '16px sans-serif') {
    this.font = font;
  }
  setRect(width = 0, height = 0) {
    this.width = width || 300;
    this.height = height || 300;
  }
  setPosition(x = 0, y = 0) {
    this.posX = x;
    this.posY = y;
  }

  /**
   * textarea采用表格布局
   */
  private initTable() {
    this.tableInfo.x = Math.floor(this.width / 20);
    this.tableInfo.y = Math.floor(this.height / 20);
    this.tableInfo.table = new Array(this.tableInfo.x);
    for (let i = 0; i < this.tableInfo.y; i++) {
      this.tableInfo.table[i] = new Array(this.tableInfo.y);
      this.tableInfo.table[i].fill('');
    }
  }

  draw() {
    // 1. 画textarea的背景
    this.context.fillStyle = this.backgroundColor || 'white';
    this.context.fillRect(this.posX, this.posY, this.width, this.height);
    this.context.strokeRect(this.posX, this.posY, this.width, this.height);

    // 2. 画出textarea的内容
    /**
     * textarea的内容是文字
     * 现在的排版方式是表格排版
     */
    for (let i = 0; i < this.text.length; i++) {
      let oneText = this.text[i];

      // 计算得出这个字所在的行号
      const row = Math.floor(i / this.tableInfo.y);
      const column = i - row * this.tableInfo.x;
      this.tableInfo.table[row][column] = oneText;
    }

    // 写字
    this.context.fillStyle = 'black';
    this.context.font = this.font;
    this.tableInfo.table.forEach((row, rowIndex) => {
      row.forEach((text: string, colIndex: number) => {
        // 计算文字的位置
        if (text) {
          const posX = colIndex * 20;
          const posY = rowIndex * 20 + 20;
          this.context.fillText(text, posX, posY, 20);
        }
      });
    });

    this.imageData = this.context.getImageData(0, 0, this.width, this.height);

    this.showCursor();
  }

  setText(text: string) {
    this.text = text;
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

  setMouseMove(cb: Function) {
    this.events.push({
      name: MOUSEMOVE,
      fn: (e: any) => {
        this._onMousemove(e);
        cb(e);
      }
    });
  }

  _onMouseDown(e: any) {
    this.mouseInfo.mousedown = true;
    this.mouseInfo.mousedownX = e.clientX;
    this.mouseInfo.mousedownY = e.clientY;
    this.draw();
  }

  _onMOuseUp(e: MouseEvent) {
    this.mouseInfo.mousedown = false;

    // 更新光标的位置
    const { clientX, clientY } = e;
    const x = Math.round(clientX / 20);
    const y = Math.round(clientY / 20);
    const _x = x * 20 - 2;
    const _y = y * 20 - 14;
    this.setCursorPosition(_x, _y);
    // 将前一次绘画光标取消掉
    this.context.fillStyle = 'white';
    this.context.fillRect(this.preCursorPosition.x, this.preCursorPosition.y, 1, 18);
    // setTimeout(() => {
      this.input.style.left = `${_x}px`;
      this.input.style.top = `${_y}px`;
      this.input.focus();
    // });
  }

  _onMousemove(event: MouseEvent): void {
    // 绘制鼠标选区效果
    if (this.mouseInfo.mousedown) {
      const fromX = Math.round(this.mouseInfo.mousedownX / 20) * 20 - 2;
      const fromY = Math.round(this.mouseInfo.mousedownY / 20) * 20 - 14;

      console.log('ddd')
      const { clientX, clientY } = event;
      const x = Math.round(clientX / 20) * 20 - 2;
      const y = Math.round(clientY / 20) * 20;

      this.context.fillStyle = 'rgba(0,0,255, 0.05)';
      this.context.fillRect(fromX, fromY, x - fromX, y - fromY);
      console.log('fromX', fromX, "fromY", fromY, 'width: ', x - fromX, 'height: ', y - fromY);
      // this.draw();
    }
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

  private setCursorPosition(x: number, y: number) {
    this.cursorPosition.x = x;
    this.cursorPosition.y = y;
  }

  private getCursorPosition() {
    const { x, y } = this.cursorPosition;
    return { x, y };
  }

  // 实现光标闪动
  showCursor() {
    if (this.intervalCursor) {
      clearInterval(this.intervalCursor);
      this.intervalCursor = 0;
    }
    this.intervalCursor = setInterval(() => {
      const { x, y } = this.getCursorPosition();
      this.preCursorPosition.x = x;
      this.preCursorPosition.y = y;
      // 确定光标所在的位置
      // 每0.5s闪动一次
      if (this.cursorColor === 1) {
        this.context.fillStyle = 'black';
        this.cursorColor = -this.cursorColor;
      } else {
        this.context.fillStyle = 'white';
        this.cursorColor = -this.cursorColor;
      }
      this.context.fillRect(x, y, 1, 18);
    }, 500);
  }

  getInput(e: KeyboardEvent) {
    console.log('getInput: ', e);
    // 1. 获取input 的value
    if (e.code === 'Backspace') {
      // 删除一个
      // 2. 获取当前光标位置
      const { x, y } = this.getCursorPosition();
      const row = Math.floor(x / 20);
      const column = Math.floor(y / 20);
      const offset = column * 15 + row
      this.text = this.text.substring(0, offset) + this.text.substring(offset + 1);
      this.draw();
      return;
    }
    const value = this.input.value;
    if (value.length) {
      this.input.value = '';
      // 2. 获取当前光标位置
      const { x, y } = this.getCursorPosition();
      const row = Math.floor(x / 20);
      const column = Math.floor(y / 20);
      const offset = column * 15 + row
      this.text = this.text.substring(0, offset + 1) + value + this.text.substring(offset + value.length);

      // 3. draw
      this.draw();
    }
  }

  // 实现input
  createInput() {
    this.input = document.createElement('input');
    this.input.setAttribute('type', 'text');
    this.input.id = 'virtual-focus';
    this.input.style.width = '1px';
    this.input.style.opacity = '0';
    this.input.style.position = 'fixed';
    this.input.style.pointerEvents = 'none';
    this.input.onkeyup = this.getInput.bind(this);
    document.body.appendChild(this.input);
  }
}
