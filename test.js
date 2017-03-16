function diffDay(start, end) {
	var startDate = new Date(start);
	var endDate = new Date(end);

	var sY = startDate.getFullYear();
	var sM = startDate.getMonth() + 1;
	var sD = startDate.getDate();

	var eY = endDate.getFullYear();
	var eM = endDate.getMonth() + 1;
	var eD = endDate.getDate();

	var Date1 = new Date(sY + '-' + sM + '-' + sD);
	var Date2 = new Date(eY + '-' + eM + '-' + eD);
	var iDays = parseInt(Math.abs(Date2 - Date1) / (1000 * 24 * 60 * 60));

	return iDays;
}

var a = '2017/02/03';

var b = '2017/02/05';

console.log(diffDay(new Date(a), new Date(b)));