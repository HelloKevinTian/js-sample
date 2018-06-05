function getLastMonth(n) {
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth() + 1; //0~11 +1 1~12
    if (nowMonth > n) {
        let m = nowMonth - n;
        m = ('00' + m).substr(('' + m).length);
        return nowYear + m;
    } else {
        let y = nowYear - 1;
        let m = 12 - (n - nowMonth);
        m = ('00' + m).substr(('' + m).length);
        return y + m;
    }
}

console.log(getLastMonth(1));
console.log(getLastMonth(2));
console.log(getLastMonth(3));
console.log(getLastMonth(4));
console.log(getLastMonth(5));
console.log(getLastMonth(6));
console.log(getLastMonth(7));
console.log(getLastMonth(8));
console.log(getLastMonth(9));
console.log(getLastMonth(10));
console.log(getLastMonth(11));