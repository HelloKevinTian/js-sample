/**
 * 工厂模式
 */

var BikeFactory = function() {}

BikeFactory.prototype = {
	createBike: function(model) {
		var bike;

		switch (model) {
			case 'aaa':
				bike = new AAA();
				break;
			case 'bbb':
				bike = new BBB();
				break;
			default:
				bike = new CCC();
		}

		return bike;
	}
}