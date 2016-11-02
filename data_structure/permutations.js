/**
 * 排列组合
 */
function permutations(string) {
    var arr = string.split('');
    var size = arr.length;
    var ret = [];

    (function(arr, size, result) {
        if (result.length == size) {
            var value = result.join('')
            if (ret.indexOf(value) === -1) {
                ret.push(value);
            }
        } else {
            for (var i = 0, len = arr.length; i < len; i++) {
                var newArr = [].concat(arr);
                var curItem = newArr.splice(i, 1);
                arguments.callee(newArr, size, [].concat(result, curItem));
            }
        }
    })(arr, size, []);

    return ret;
}

console.log(permutations('aabb')); // [ 'aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa' ]