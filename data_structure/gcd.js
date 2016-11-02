/**
 * 最小公倍数
 */

function gcd(a, b) {
    var maxNum = Math.max(a, b);
    var minNum = Math.min(a, b);
    var count;
    if (a === 0 || b === 0) {
        return maxNum;
    }
    for (var i = 1; i <= maxNum; i++) {
        count = minNum * i;
        if (count % maxNum === 0) {
            return count;
            break;
        }
    }
}

var lcm = function(lst) {
    var m = 0;
    for (var i = 0; i < lst.length; i++) {
        if (lst[i] == 0)
            return 0;
        m = gcd(m, lst[i]);
    }
    return m;
};

console.log(lcm([2, 3, 4, 5]));