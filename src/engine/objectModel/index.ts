
interface IEvents {
  [key: string]: any;
}

export default class Model {
  private _params: any;
  private _id: number;
  private _stage: any;


  private _events: IEvents;
  location: null;
  x: number;
  y: number;
  width: number;
  height: number;
  type: number;
  color: string;
  status: number;
  orientation: number;
  speed: number;
  coord: any;
  path: never[];
  vector: null;
  frames: number;
  times: number;
  timeout: number;
  control: {};
  update: () => void;
  draw: () => void;
  constructor(params: any) {
    this._params = params || {};
    this._id = 0;               //标志符
    this._stage = null;         //与所属布景绑定
    this.x = 0;					//位置坐标:横坐标
    this.y = 0;					//位置坐标:纵坐标
    this.width = 20;				//宽
    this.height = 20;				//高
    this.type = 0;					//对象类型,0表示普通对象(不与地图绑定),1表示玩家控制对象,2表示程序控制对象
    this.color = '#F00'			//标识颜色
    this.status = 1;			//对象状态,0表示未激活/结束,1表示正常,2表示暂停,3表示临时,4表示异常
    this.orientation = 0;			//当前定位方向,0表示右,1表示下,2表示左,3表示上
    this.speed = 0;				//移动速度
    //地图相关
    this.location = null;			//定位地图,Map对象
    this.coord = null;			//如果对象与地图绑定,需设置地图坐标;若不绑定,则设置位置坐标
    this.path = [];				//NPC自动行走的路径
    this.vector = null;			//目标坐标
    //布局相关
    this.frames = 1;				//速度等级,内部计算器times多少帧变化一次
    this.times = 0;				//刷新画布计数(用于循环动画状态判断)
    this.timeout = 0;				//倒计时(用于过程动画状态判断)
    this.control = {};			//控制缓存,到达定位点时处理
    this.update = function () { };	//更新参数信息
    this.draw = function () { };		//绘制
    this._events = {};
    this.location = null;
    Object.assign(this, this._params);
  }

  bindEvent(eventType: string, cb: Function) {
    const wrap =  (cb: Function) => {
      return (e: Event) => {
        cb.bind(this)(e);
        e.stopPropagation();
        e.preventDefault();
      }
    }
    window.addEventListener(eventType, wrap(cb));
  }

  setStage(stage: any) {
    this._stage = stage;
  }

  setId(id: number) {
    this._id = id;
  }

  getLocation() {
    return this.location;
  }
}