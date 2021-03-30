/**
 * @description 直接定址法
 * 特点：不存在hash冲突，但键值分布很散时会浪费大量存储空间
 */
 class Hash1 {
    constructor() {
        this.items = {};
    }
    hash(k) {
        return 1 * k + 0;
    }
    set(k, v) {
        this.items[this.hash(k)] = v;
    }
    get(k) {
        return this.items[this.hash(k)];
    }
    static test() {
        let a = new Hash1();
        a.set(1, 111);
        a.set(12, 121212);
        console.log('Hash1:', a.items);
    }
}
/**
 * @description 取模hash & 开放定址法处理冲突
 * 取模法：一般来讲，越是质数，mod取余就越可能分布的均匀
 */
class Hash2 {
    constructor() {
        this.items = {};
        this.conflict = 0;
    }
    hash(k) {
        return (k % 13) + this.conflict;
    }
    set(k, v) {
        if (this.items.hasOwnProperty(this.hash(k))) {
            this.conflict++;
        }
        this.items[this.hash(k)] = v;
    }
    get(k) {
        return this.items[this.hash(k)];
    }
    static test() {
        let a = new Hash2();
        a.set(1, 111);
        a.set(11, 111111);
        a.set(2, 222);
        a.set(22, 222222);
        console.log('Hash1:', a.items, a.conflict);
    }
}

Hash1.test();
Hash2.test();