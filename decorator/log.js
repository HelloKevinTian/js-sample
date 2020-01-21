/**
 * 通过装饰器为目标函数自动加入打印日志
 * Node运行需要label支持，故需 npm i @babel/cli @babel/node @babel/core @babel/preset-env @babel/plugin-proposal-decorators --save-dev
 * 配置 .babelrc
    {
        "presets": [
            "@babel/preset-env"
        ],
        "plugins": [
            ["@babel/plugin-proposal-decorators", { "legacy": true }]
        ]
    }
 */

class Math {
    @log
    add(a, b) {
        return a + b;
    }
}

function log(target, name, descriptor) {
    var oldValue = descriptor.value;

    descriptor.value = function() {
        console.log(`Calling ${name} with`, arguments);
        return oldValue.apply(this, arguments);
    };

    return descriptor;
}

const math = new Math();

// passed parameters should get logged now
math.add(2, 4);
/**
 * @author tianwen
 * @date   2020-01-10 18:16:57
 * @description TODO
 */

function mixins(...list) {
    return function(target) {
        Object.assign(target.prototype, ...list);
    };
}