const proxy1 = new Proxy({}, {
    get: function(target, property) {
        return 35;
    }
});

let obj1 = Object.create(proxy1);
console.log(obj1.time, obj1.age)

// function observe(data) {
//     const that = this;
//     let handler = {
//         get(target, property) {
//             return target[property];
//         },
//         set(target, key, value) {
//             let res = Reflect.set(target, key, value);
//             that.subscribe[key].map(item => {
//                 item.update();
//             });
//             return res;
//         }
//     }
//     this.$data = new Proxy(data, handler);
// }