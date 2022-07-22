

export default class MyMap {
  _params: any;
  _id: number;
  _stage: null;
  x: number;
  y: number;
  size: number;
  data: any[];
  x_length: number;
  y_length: number;
  frames: number;
  times: number;
  cache: boolean;
  update: () => void;
  draw: () => void;
  constructor(options: any) {
    this._params = options || {};
    this._id = 0;               //标志符
    this._stage = null;         //与所属布景绑定

    this.x = 0;				//地图起点坐标
    this.y = 0;
    this.size = 20;				//地图单元的宽度
    this.data = [];				//地图数据
    this.x_length = 0;				//二维数组x轴长度
    this.y_length = 0;				//二维数组y轴长度
    this.frames = 1;				//速度等级;内部计算器times多少帧变化一次
    this.times = 0;				//刷新画布计数(用于循环动画状态判断)
    this.cache = false;    		//是否静态（如静态则设置缓存）
    this.update = function () { };	//更新地图数据
    this.draw = function () { };		//绘制地图

    Object.assign(this, this._params);

  }

  //获取地图上某点的值
  get(x: number, y: number) {
    if (this.data[y] && typeof this.data[y][x] != 'undefined') {
      return this.data[y][x];
    }
    return -1;
  }
  //设置地图上某点的值
  set(x: number, y: number, value: any) {
    if (this.data[y]) {
      this.data[y][x] = value;
    }
  }
  //地图坐标转画布坐标
  coord2position(cx: number, cy: number) {
    return {
      x: this.x + cx * this.size + this.size / 2,
      y: this.y + cy * this.size + this.size / 2
    };
  }

  //画布坐标转地图坐标
  position2coord(x: number, y: number) {
    const fx = Math.abs(x - this.x) % this.size - this.size / 2;
    const fy = Math.abs(y - this.y) % this.size - this.size / 2;
    return {
      x: Math.floor((x - this.x) / this.size),
      y: Math.floor((y - this.y) / this.size),
      offset: Math.sqrt(fx * fx + fy * fy)
    };
  }

  //寻址算法
  finder(params: any) {
    var defaults = {
      map: null,
      start: {},
      end: {},
      type: 'path'
    };
    var options = Object.assign({}, defaults, params);
    if (options.map[options.start.y][options.start.x] || options.map[options.end.y][options.end.x]) { //当起点或终点设置在墙上
      return [];
    }
    var finded = false;
    var result = [];
    var y_length = options.map.length;
    var x_length = options.map[0].length;
    var steps = Array(y_length).fill(0).map(() => Array(x_length).fill(0));     //步骤的映射
    var _getValue = function (x: number, y: number) {  //获取地图上的值
      if (options.map[y] && options.map[y][x]) {
        return options.map[y][x];
      }
      return -1;
    };
    var _next = function (to: { x: any; y: any; change?: any; }) { //判定是否可走,可走放入列表
      var value = _getValue(to.x, to.y);
      if (value < 1) {
        if (value === -1) {
          to.x = (to.x + x_length) % x_length;
          to.y = (to.y + y_length) % y_length;
          to.change = 1;
        }
        if (!steps[to.y][to.x]) {
          result.push(to);
        }
      }
    };
    var _render = function (list: any[]) {//找线路
      var new_list:Array<any> = [];
      var next = function (from: any, to: { y: any; x: any; change?: any; }) {
        var value = _getValue(to.x, to.y);
        if (value < 1) {	//当前点是否可以走
          if (value === -1) {
            to.x = (to.x + x_length) % x_length;
            to.y = (to.y + y_length) % y_length;
            to.change = 1;
          }
          if (to.x === options.end.x && to.y === options.end.y) {
            steps[to.y][to.x] = from;
            finded = true;
          } else if (!steps[to.y][to.x]) {
            steps[to.y][to.x] = from;
            new_list.push(to);
          }
        }
      };
      list.forEach(function (current) {
        next(current, { y: current.y + 1, x: current.x });
        next(current, { y: current.y, x: current.x + 1 });
        next(current, { y: current.y - 1, x: current.x });
        next(current, { y: current.y, x: current.x - 1 });
      });
      if (!finded && new_list.length) {
        _render(new_list);
      }
    };
    _render([options.start]);
    if (finded) {
      var current = options.end;
      if (options.type === 'path') {
        while (current.x !== options.start.x || current.y !== options.start.y) {
          result.unshift(current);
          current = steps[current.y][current.x];
        }
      } else if (options.type === 'next') {
        _next({ x: current.x + 1, y: current.y });
        _next({ x: current.x, y: current.y + 1 });
        _next({ x: current.x - 1, y: current.y });
        _next({ x: current.x, y: current.y - 1 });
      }
    }
    return result;
  };


}