function func(n1, n2, n3) {
    const arr = ['Fizz', 'Buzz', 'Whizz'];
    let ret = [];
    for (let i = 1; i <= 100; i++) {
        let partArr = i.toString().split('');
        //规则5
        if (partArr.includes(n1.toString())) {
            ret.push(arr[0]);
            continue;
        }
        let specArr = [];
        [n1, n2, n3].forEach((item, k) => {
            specArr.push(i % item === 0 ? k : -1);
        });
        let str = '';
        for (let j = 0; j < specArr.length; j++) {
            str += (arr[specArr[j]] ? arr[specArr[j]] : '');
        }
        str ? ret.push(str) : ret.push(i);
    }
    return ret;
}

let ret = func(3, 5, 7);

console.log(ret.join(','));