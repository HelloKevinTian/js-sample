/**
 * 杨辉三角
 */
function pascalsTriangle(n) {
	var ret = [];
	for (var i = 0; i < n; i++) {
		for (var j = 0; j <= i; j++) {
			ret.push(Combination(i, j));
		};
	};
	return ret;
}

/**
 * 递归函数
 */
function Combination(m, n) {
	if (n == 0) {
		return 1;
	} else if (m == n) {
		return 1;
	} else {
		return Combination(m - 1, n - 1) + Combination(m - 1, n);
	}
}

console.log(pascalsTriangle(6));

/**

1
1 1
1 2 1
1 3 3 1
1 4 6 4 1
1 4 10 10 5 1

 */