// function Hello() {
// 	var name;

// 	this.setName = function(thyName) {
// 		name = thyName;
// 	};

// 	this.sayHello = function() {
// 		console.log('Hello ' + name);
// 	};
// };

// exports.Hello = Hello;

//----------------------------
function Hello() {
	var name;

	this.setName = function(thyName) {
		name = thyName;
	};

	this.sayHello = function() {
		console.log('Hello ' + name);
	};
};

module.exports = Hello;