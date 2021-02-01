/**
 * 从一个数组中找出所有和为m的n个数的组合
 */

/**
 * 从arr中找出count个数，其和为sum
 * @param {Array} arr 大数组
 * @param {Number} count 个数
 * @param {Number} sum 和
 */
const search = (arr, count, sum) => {
    // 计算某选择情况下有几个 `1`，也就是选择元素的个数
    const n = num => {
        let count = 0
        while (num) {
            num &= (num - 1)
            count++
        }
        return count
    }

    let len = arr.length,
        bit = 1 << len,
        res = []

    // 遍历所有的选择情况
    for (let i = 1; i < bit; i++) {
        // 满足选择的元素个数 === count
        if (n(i) === count) {
            let s = 0,
                temp = []

            // 每一种满足个数为 N 的选择情况下，继续判断是否满足 和为 M
            for (let j = 0; j < len; j++) {
                // 建立映射，找出选择位上的元素
                if ((i & 1 << j) !== 0) {
                    s += arr[j]
                    temp.push(arr[j])
                }
            }

            // 如果这种选择情况满足和为 M
            if (s === sum) {
                res.push(temp)
            }
        }
    }

    return res
}

// console.log(search([1,2,3,4,5,6,7,8,9,10,11], 5, 25))

// 写一个很大的数组进行测试
const arr = Array.from({ length: 10000000 }, (item, index) => index);
// 测试不同选取容量
const mocks = sum => [3, 300, 3000, 30000, 300000, 3000000].map(count => ({ count, sum }));

mocks(3000).forEach(({ count, sum }) => {
    let str = count + '-' + sum;
    console.time(str);
    search(arr, count, sum);
    console.timeEnd(str);
});

const n = num => {
    let count = 0
    while (num) {
        num &= (num - 1)
        count++
    }
    return count
}

console.log(n(15))