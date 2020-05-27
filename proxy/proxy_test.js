const rows = { name: "Billy ' Bob", age: 15 };
const handler = {
    get(target, key, proxy) {
        if (typeof target[key] == 'string') {
            return target[key].replace(/'/g, "\\'");
            // target[key] = target[key].replace(/'/g, "\\'");
            // return Reflect.get(target, key, proxy);
        } else {
            return target[key];
        }
    }
};
const proxy = new Proxy(rows, handler);
console.log(rows.name);
console.log(proxy.name, proxy.age);