class Base {
    constructor() {
        this.sayChild();
    }

    sayChild() {
        console.log('sayBaseChild');
    }

    sayBase() {
        console.log('sayBase', this.c);
        return 'hahah';
    }
}

class Child extends Base {
    constructor() {
        super();

        this.c = '/root';
    }

    say() {
        let a = this.sayBase();
        console.log('>>>>>> ', a)
    }

    sayChild() {
        console.log('sayChild');
    }
}

let c = new Child();
c.say()