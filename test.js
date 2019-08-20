class CustomAPI {
    getAdName(a, b) {
        console.log(`a[${a}] b[${b}]`);
    }
}

class FBAPI {
    constructor() {
        this.customFuncMap = new Map();
    }

    addCustomFunc(funcName, func) {
        if (this.customFuncMap.has(funcName)) {
            throw new Error('FBAdAPI function exists');
        } else {
            this.customFuncMap.set(funcName, func);
        }
    }

    execCustomFunc(funcName, ...args) {
        console.log(this.customFuncMap)
        if (this.customFuncMap.has(funcName)) {
            const execFunc = this.customFuncMap.get(funcName);
            execFunc(...args);
        } else {
            throw new Error('FBAdAPI function not exist');
        }
    }
}

const cusAPI = new CustomAPI();

const API = new FBAPI();

API.addCustomFunc('ab', cusAPI.getAdName.bind(cusAPI));

API.execCustomFunc('ab', 111, 222, 333);