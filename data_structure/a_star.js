'use strict';

/**
	利用A*计算A到B的最小路径

	-----------------------------
	|   |   |   |   |   |   |   |
	-----------------------------
	|   |   |   |---|   |   |   |
	-----------------------------
	|   | A | C |---|   | B |   |
	-----------------------------
	|   |   |   |---|   |   |   |
	-----------------------------
	|   |   |   |   |   |   |   |
	-----------------------------
	//G 表示从起点 A 移动到网格上指定方格的移动耗费 (可沿斜方向移动).
	//H 表示从指定的方格移动到终点 B 的预计耗费 (H 有很多计算方法, 这里我们设定只可以上下左右移动)
	//F = G + H

	1 找出A能到达的所有格子，并计算出各自的F值
	2 找出F值最小的格子，把它从 "开启列表" 中删除, 并放到 "关闭列表" 中
	3 我们从 "开启列表" 找出 F 值最小的, 将它从 "开启列表" 中移掉, 添加到 "关闭列表". 再继续找出它周围可以到达的方块, 如此循环下去
	4 直到终点B出现在开启列表中，停止操作
	5 除了起始方块, 每一个曾经或者现在还在 "开启列表" 里的方块, 它都有一个 "父方块", 通过 "父方块" 可以索引到最初的 "起始方块", 这就是路径
 */

//---------------------test----------------
var MAP = {
	rows: 8,
	cols: 12,
	arr: [ //1表示障碍
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1],
		[1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
		[1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	]
};

var ret = findPath(1, 2, 1, 2);
console.log('ret:', ret);
//---------------------test----------------

/**
 * 其中的MAP.arr是二维数组
 * startX, startY 为起始点的x y坐标
 * endX, endY 为要到达的终点x y坐标
 * return [] 从起点到终点的路径点数组，不含起点坐标点
 */
function findPath(startX, startY, endX, endY) {
	if (startX == endX && startY == endY) {
		return [];
	}
	var openList = [], //开启列表
		closeList = [], //关闭列表
		result = [], //结果数组
		resultIndex; //结果数组在开启列表中的序号

	//把当前点加入到开启列表中，并且G是0
	openList.push({
		x: startX,
		y: startY,
		G: 0
	});

	do {
		var currentPoint = openList.pop();
		closeList.push(currentPoint);
		var surroundPoint = getSurroundPoint(currentPoint);
		surroundPoint.forEach(function(item) { //遍历周围的八个点
			if (item.x >= 0 && //判断是否在地图上
				item.y >= 0 &&
				item.x < MAP.rows &&
				item.y < MAP.cols &&
				MAP.arr[item.x][item.y] != 1 && //判断是否是障碍物
				!checkInList(item, closeList) && //判断是否在关闭列表中
				MAP.arr[item.x][currentPoint.y] != 1 && //判断之间是否有障碍物，如果有障碍物是过不去的
				MAP.arr[currentPoint.x][item.y] != 1) {
				//g 到父节点的位置
				//如果是上下左右位置的则g等于10，斜对角的就是14
				var g = currentPoint.G + ((currentPoint.x - item.x) * (currentPoint.y - item.y) == 0 ? 10 : 14);
				if (!checkInList(item, openList)) { //如果不在开启列表中
					//计算H，通过水平和垂直距离进行确定
					item['H'] = Math.abs(endX - item.x) * 10 + Math.abs(endY - item.y) * 10;
					item['G'] = g;
					item['F'] = item.H + item.G;
					item['parent'] = currentPoint;
					openList.push(item);
				} else { //存在在开启列表中，比较目前的g值和之前的g的大小
					var index = checkInList(item, openList);
					//如果当前点的g更小
					if (g < openList[index].G) {
						openList[index].parent = currentPoint;
						openList[index].G = g;
						openList[index].F = g + openList[index].H;
					}

				}
			}
		});

		//如果开启列表空了，没有通路，结果为空
		if (openList.length == 0) {
			break;
		}

		//降序排列。这一步是为了循环回去的时候，找出 F 值最小的, 将它从 "开启列表" 中移掉
		openList.sort(function(a, b) {
			return b.F - a.F;
		});
	} while (!(resultIndex = checkInList({
			x: endX,
			y: endY
		}, openList)));

	//判断结果列表是否为空
	if (!resultIndex) {
		result = [];
	} else {
		var currentObj = openList[resultIndex];
		do {
			//把路径节点添加到result当中
			result.unshift({
				x: currentObj.x,
				y: currentObj.y
			});
			currentObj = currentObj.parent;
		} while (currentObj.x != startX || currentObj.y != startY);

	}
	return result;
}

//获取周围八个点的值
function getSurroundPoint(curPoint) {
	var x = curPoint.x,
		y = curPoint.y;
	return [{
		x: x - 1,
		y: y - 1
	}, {
		x: x,
		y: y - 1
	}, {
		x: x + 1,
		y: y - 1
	}, {
		x: x + 1,
		y: y
	}, {
		x: x + 1,
		y: y + 1
	}, {
		x: x,
		y: y + 1
	}, {
		x: x - 1,
		y: y + 1
	}, {
		x: x - 1,
		y: y
	}]
}

//判断点是否在列表中，返回index
function checkInList(point, list) {
	for (var i = 0; i < list.length; i++) {
		if (point.x == list[i].x && point.y == list[i].y) {
			return i;
		}
	};
}