/**
 * 二分查找 折半查找 时间复杂度为O(logn)
 */
function binSearch(arr, value) {
    var low = 0;
    var high = arr.length - 1;

    while (low <= high) {
        var mid = Math.floor((low + high) / 2);
        if (value == arr[mid]) {
            return mid;
        } else if (value < arr[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return -1;
}

var arr = [1, 2, 3, 5, 7, 9, 12, 33, 44, 55];

console.log(binSearch(arr, 1));
console.log(binSearch(arr, 44));
console.log(binSearch(arr, 5));