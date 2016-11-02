/**
 * 判断一个坐标是否处于一个n边形内
 */
function pointInPoly(poly, point) {
    var xArr = [];
    var yArr = [];
    for (var k = 0; k < poly.length; k++) {
        xArr.push(poly[k][0]);
        yArr.push(poly[k][1]);
    };
    var maxX = Math.max.apply(null, xArr);
    var minX = Math.min.apply(null, xArr);
    var maxY = Math.max.apply(null, yArr);
    var minY = Math.min.apply(null, yArr);
    if (point[0] < minX || point[0] > maxX || point[1] < minY || point[1] > maxY) {
        return false;
    }

    var len = poly.length;
    var ret = false;
    var i, j;

    for (i = 0, j = len - 1; i < len; j = i++) {
        if (((yArr[i] > point[1]) != (yArr[j] > point[1])) && (point[0] < (xArr[j] - xArr[i]) * (point[1] - yArr[i]) / (yArr[j] - yArr[i]) + xArr[i])) {
            ret = !ret;
        }
    }

    return ret;
}

var poly = [
    [-5, -5],
    [5, -5],
    [5, 5],
    [-5, 5]
];

var point = [-6, 0]; // [1, 1];

console.log(pointInPoly(poly, point));