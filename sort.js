var _ = require('underscore');
var a = [8, 11, 1, 5, 23, 9, 2, 4, 15, 0];

/**
 * 冒泡排序
 * 时间复杂度为O(N^2)
 * 空间复杂度为O(1)
 */
function bubbleSort(arr) {
    var arr = _.clone(arr);
    var len = arr.length;
    var tempValue;

    //每次从后往前冒一个最小值，且每次能确定一个数在序列中的最终位置
    for (var i = 0; i < len - 1; i++) { //比较n-1次
        var exchange = true; //冒泡的改进，若在一趟中没有发生逆序，则该序列已有序
        for (var j = len - 1; j > i; j--) { // 每次从后边冒出一个最小值
            // console.log(i, j);
            if (arr[j] < arr[j - 1]) { //发生逆序，则交换
                tempValue = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = tempValue;
                exchange = false;
            }
        }
        if (exchange) {
            return arr;
        }
    }

    return arr;
}

/**
 * 插入排序
 */
function insertSort(arr) {
    var arr = _.clone(arr);
    //每次把当前的数往前插入，可以顺序插入，改进的可以进行二分插入
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) { //发生逆序，往前插入
            var temp = arr[i];
            for (var j = i - 1; j >= 0 && arr[j] > temp; j--) {
                arr[j + 1] = arr[j];
            }
            arr[j + 1] = temp;
        }
    }
    return arr;
}

console.log(a);
console.log('bubbleSort', bubbleSort(a));
console.log('insertSort', insertSort(a));