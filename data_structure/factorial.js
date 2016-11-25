/**
 * 大数字阶乘
 */
function factorial(n) {
	var a = [1];
	for (var i = 1; i <= n; i++) {
		for (var j = 0, c = 0; j < a.length || c != 0; j++) {
			var m = (j < a.length) ? (i * a[j] + c) : c;
			a[j] = m % 10;
			c = (m - a[j]) / 10;
		}
	}

	return a.reverse().join('');
}

console.log(factorial(5));