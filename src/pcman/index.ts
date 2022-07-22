/**
 * 1. 先画出背景
 */

import Engine from "../engine";

var _COIGIG = [		//关卡
	{				//第1关
		'map': [		//地图数据
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
			[1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
			[1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
			[1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 2, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
			[1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
			[1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
			[1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
			[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		'wall_color': '#09f',
		'goods': {		//能量豆
			'1,3': 1,
			'26,3': 1,
			'1,23': 1,
			'26,23': 1
		}
	},
];


const _COLOR = ['#F00', '#F93', '#0CF', '#F9C'],	//NPC颜色
	_COS = [1, 0, -1, 0],
	_SIN = [0, 1, 0, -1],
	_LIFE = 5;			//玩家生命值
let _SCORE = 0;				//玩家得分

export default class PcMan {

	engine!: Engine;

	constructor() {
		this.init();
	}

	init() {
		this.engine = new Engine('canvas');
		this.engine.container.width = 960;
		this.engine.container.height = 640;
	}

	start() {
		this.engine.start();
		this.gameMain();
	}

	// 游戏主程序
	gameMain() {
		_COIGIG.forEach((config, index) => {
			if (index > 0) {
				return;
			}
			let map: any, player: any, beans: any, items: any;

			const stage = this.engine.getStage();
			map = stage.createMap({
				x: 60,
				y: 10,
				data: config['map'],
				// cache: true,
				draw: function (context: any) {
					context.lineWidth = 2;
					for (var j = 0; j < this.y_length; j++) {
						for (var i = 0; i < this.x_length; i++) {
							var value = this.get(i, j);
							if (value) {
								var code = [0, 0, 0, 0];
								if (this.get(i + 1, j) && !(this.get(i + 1, j - 1) && this.get(i + 1, j + 1) && this.get(i, j - 1) && this.get(i, j + 1))) {
									code[0] = 1;
								}
								if (this.get(i, j + 1) && !(this.get(i - 1, j + 1) && this.get(i + 1, j + 1) && this.get(i - 1, j) && this.get(i + 1, j))) {
									code[1] = 1;
								}
								if (this.get(i - 1, j) && !(this.get(i - 1, j - 1) && this.get(i - 1, j + 1) && this.get(i, j - 1) && this.get(i, j + 1))) {
									code[2] = 1;
								}
								if (this.get(i, j - 1) && !(this.get(i - 1, j - 1) && this.get(i + 1, j - 1) && this.get(i - 1, j) && this.get(i + 1, j))) {
									code[3] = 1;
								}
								if (code.indexOf(1) > -1) {
									context.strokeStyle = value === 2 ? "#FFF" : config['wall_color'];
									var pos = this.coord2position(i, j);
									switch (code.join('')) {
										case '1100':
											context.beginPath();
											context.arc(pos.x + this.size / 2, pos.y + this.size / 2, this.size / 2, Math.PI, 1.5 * Math.PI, false);
											context.stroke();
											context.closePath();
											break;
										case '0110':
											context.beginPath();
											context.arc(pos.x - this.size / 2, pos.y + this.size / 2, this.size / 2, 1.5 * Math.PI, 2 * Math.PI, false);
											context.stroke();
											context.closePath();
											break;
										case '0011':
											context.beginPath();
											context.arc(pos.x - this.size / 2, pos.y - this.size / 2, this.size / 2, 0, .5 * Math.PI, false);
											context.stroke();
											context.closePath();
											break;
										case '1001':
											context.beginPath();
											context.arc(pos.x + this.size / 2, pos.y - this.size / 2, this.size / 2, .5 * Math.PI, 1 * Math.PI, false);
											context.stroke();
											context.closePath();
											break;
										default:
											var dist = this.size / 2;
											// eslint-disable-next-line no-loop-func
											code.forEach(function (v, index) {
												if (v) {
													context.beginPath();
													context.moveTo(pos.x, pos.y);
													context.lineTo(pos.x - _COS[index] * dist, pos.y - _SIN[index] * dist);
													context.stroke();
													context.closePath();
												}
											});
									}
								}
							}
						}
					}
				}
			});

			// 关卡得分
			stage.createItem({
				x: 690,
				y: 80,
				draw: function (context: any) {
					context.font = 'bold 26px Helvetica';
					context.textAlign = 'left';
					context.textBaseline = 'bottom';
					context.fillStyle = '#C33';
					context.fillText('SCORE', this.x, this.y);
					context.font = '26px Helvetica';
					context.textAlign = 'left';
					context.textBaseline = 'top';
					context.fillStyle = '#FFF';
					context.fillText(_SCORE, this.x + 12, this.y);
					context.font = 'bold 26px Helvetica';
					context.textAlign = 'left';
					context.textBaseline = 'bottom';
					context.fillStyle = '#C33';
					context.fillText('LEVEL', this.x, this.y + 72);
					context.font = '26px Helvetica';
					context.textAlign = 'left';
					context.textBaseline = 'top';
					context.fillStyle = '#FFF';
					context.fillText(index + 1, this.x + 12, this.y + 72);
				}
			});

			//状态文字
			stage.createItem({
				x: 690,
				y: 285,
				frames: 25,
				draw: function (context: any) {
					if (stage.status === 2 && this.times % 2) {
						context.font = '24px Helvetica';
						context.textAlign = 'left';
						context.textBaseline = 'center';
						context.fillStyle = '#FFF';
						context.fillText('PAUSE', this.x, this.y);
					}
				}
			});

			// //生命值
			stage.createItem({
				x: 705,
				y: 510,
				width: 30,
				height: 30,
				draw: function (context: any) {
					var max = Math.min(_LIFE - 1, 5);
					for (var i = 0; i < max; i++) {
						var x = this.x + 40 * i, y = this.y;
						context.fillStyle = '#FFE600';
						context.beginPath();
						context.arc(x, y, this.width / 2, .15 * Math.PI, -.15 * Math.PI, false);
						context.lineTo(x, y);
						context.closePath();
						context.fill();
					}
					context.font = '26px Helvetica';
					context.textAlign = 'left';
					context.textBaseline = 'center';
					context.fillStyle = '#FFF';
					context.fillText('X ' + (_LIFE - 1), this.x - 15, this.y + 30);
				}
			});

			beans = stage.createMap({
				x: 60,
				y: 10,
				data: config['map'],
				frames: 8,
				draw: function (context: CanvasRenderingContext2D) {
					for (var j = 0; j < this.y_length; j++) {
						for (var i = 0; i < this.x_length; i++) {
							if (!this.get(i, j)) {
								var pos = this.coord2position(i, j);
								context.fillStyle = "#F5F5DC";
								const str: any = i + ',' + j;
								if (Object.keys(config['goods']).includes(str)) {
									context.beginPath();
									context.arc(pos.x, pos.y, 3 + this.times % 2, 0, 2 * Math.PI, true);
									context.fill();
									context.closePath();
								} else {
									context.fillRect(pos.x - 2, pos.y - 2, 4, 4);
								}
							}
						}
					}
				}
			});

			//主角
			player = stage.createItem({
				width: 30,
				height: 30,
				type: 1,
				location: map,
				coord: { x: 13.5, y: 23 },
				orientation: 2,
				speed: 2,
				frames: 10,
				update: function () {
					const coord = this.coord;
					const location = this.getLocation();
					const { x, y } = location.coord2position(coord.x, coord.y);
					this.x = x;
					this.y = y;

					// 吃豆子
					const halfWidth = 2 / 2;
					const halfHeight = 2 / 2;
					for (let _x = Math.floor(coord.x - halfWidth); _x < coord.x + halfWidth || _x < 0; _x++) {
						for (let _y = Math.floor(coord.y - halfHeight); _y < coord.y + halfHeight || _y < 0; _y++) {
							console.log('x: ' + _x + ' y: ' + _y);
							if (!beans.get(_x, _y)) {
								beans.set(_x, _y, 1);
							}
						}
					}

				},
				draw: function (context: any) {
					context.fillStyle = '#FFE600';
					context.beginPath();
					console.log('this.x: ', this.x, 'this.y: ', this.y);
					context.arc(this.x, this.y, this.width / 2, (.5 * this.orientation + .20) * Math.PI, (.5 * this.orientation - .20) * Math.PI, false);
					context.lineTo(this.x, this.y);
					context.closePath();
					context.fill();
				}
			});

			player.bindEvent('keydown', (event: KeyboardEvent) => {
				const coord = player.coord;
				console.log('coord', coord)
				switch (event.keyCode) {
					case 13: //回车
					case 32: //空格
						coord.x++;
						coord.y++;
						break;
					case 39: //右
						coord.x++;
						break;
					case 40: //下
						coord.y++;
						break;
					case 37: //左
						coord.x--;
						break;
					case 38: //上
						coord.y--;
						break;
				}

				player.coord = coord;
			});
		});
	}

	setMap() {
		console.log("SetMap");
	}
}