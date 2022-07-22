import Model from '..';
import MyMap from '../map';

// 布景对象构造器
export default class Stage {
  private _params: any;
  items: any[];
  index: number;
  status: any;
  maps: any[];
  audio: any[];
  images: any[];
  timeout: number;
  update: () => void;

  constructor(params: any) {
    this._params = params || {};
    this.index = 0; //布景索引
    this.status = 0; //布景状态,0表示未激活/结束,1表示正常,2表示暂停,3表示临时状态
    this.maps = []; //地图队列
    this.audio = []; //音频资源
    this.images = []; //图片资源
    this.items = []; //对象队列
    this.timeout = 0; //倒计时(用于过程动画状态判断)
    this.update = () => { }; //嗅探,处理布局下不同对象的相对关
  }

  //添加对象
  createItem(options: any) {
    let item = new Model(options);
    //动态属性
    const location = item.getLocation() as any;
    if (location) {
      Object.assign(item, location.coord2position(item.coord.x, item.coord.y));
    }
    //关系绑定
    item.setStage(this);
    item.setId(this.items.length);
    this.items.push(item);
    return item;
  }

  //重置物体位置
  resetItems() {
    this.status = 1;
    this.items.forEach(function (item: any) {
      Object.assign(item, item._settings, item._params);
      if (item.location) {
        Object.assign(item, item.location.coord2position(item.coord.x, item.coord.y));
      }
    });
  }

  //获取对象列表
  getItemsByType(type: any) {
    return this.items.filter(function (item: any) {
      return item.type === type;
    });
  }
  //添加地图
  createMap(options: any) {
    var map = new MyMap(options) as any;
    //动态属性
    map.data = JSON.parse(JSON.stringify(map._params.data));
    map.y_length = map.data.length;
    map.x_length = map.data[0].length;
    map.imageData = null;
    //关系绑定
    map._stage = this;
    map._id = this.maps.length;
    this.maps.push(map);
    return map;
  }

  // 重置地图
  resetMaps() {
    this.status = 1;
    this.maps.forEach(function (map) {
      Object.assign(map, map._settings, map._params);
      map.data = JSON.parse(JSON.stringify(map._params.data));
      map.y_length = map.data.length;
      map.x_length = map.data[0].length;
      map.imageData = null;
    });
  }

  // 重置
  reset() {
    this.resetItems();
    this.resetMaps();
  }

  bindEvents(eventType: string, cb: (params: any) => void): void {
    window.addEventListener(eventType, cb.bind(this));
  }
}
