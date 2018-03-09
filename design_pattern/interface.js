'use strict';
/**
 * 支持多重继承的接口实现
 */
var Interface = function(name, methods) {
    if (arguments.length != 2) {
        throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
    }
    this.name = name;
    this.methods = [];
    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error("Interface constructor expects method names to be " + "passed in as a string.");
        }
        this.methods.push(methods[i]);
    }
};


/**
 * 接口检查方法
 * 使用方法：
            var CPU = new Interface('CPU', ['process']);
            var Memery = new Interface('Memery', ['get', 'set']);
            var Hdd = new Interface('Hdd', ['read', 'write']);
            var Computer = function() {}
            Interface.ensureImplements(Computer, CPU, Memery, Hdd) //Computer需要实现CPU、Memery、Hdd这三个接口
 */
Interface.ensureImplements = function(object) { //object为待实现某些接口的类
    if (arguments.length < 2) {
        throw new Error("Function Interface.ensureImplements called with " + arguments.length + "arguments, but expected at least 2.");
    }
    for (var i = 1, len = arguments.length; i < len; i++) { //index >= 1 以后为多个需要实现的接口
        var interface = arguments[i];
        if (interface.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments" + "two and above to be instances of Interface.");
        }
        for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object " + "does not implement the " + interface.name + " interface. Method " + method + " was not found.");
            }
        }
    }
};

//-------------------------------------------interface sample------------------------------------------------
//定义了一个USB接口
var USB = new Interface('USB', ['read', 'write']);

//FlashDisk类，需要实现USB接口
function FlashDisk() {}

FlashDisk.prototype.read = function() {};

FlashDisk.prototype.write = function() {};

//MP3类，同样需要实现USB接口
function MP3() {}

MP3.prototype.read = function() {};

MP3.prototype.write = function() {};

//没有实现USB接口或没有全部实现
function BadDevice() {}

BadDevice.prototype.write = function() {};

//没有实现该接口
/*BadDevice.prototype.read = function () {
}*/

//USB设备管理类
function USBManager() {
    this.devices = [];
}

USBManager.prototype.add = function(device) {
    Interface.ensureImplements(device, USB); //确保添加的设备实现了USB接口，没有实现的话会抛出异常

    this.devices.push(device);
};

var disk = new FlashDisk();
var mp3 = new MP3();
var bad = new BadDevice();

var manager = new USBManager();

manager.add(disk);
manager.add(mp3);

manager.add(bad); //此处会抛出异常