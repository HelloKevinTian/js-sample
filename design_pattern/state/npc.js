var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Npc = /** @class */ (function () {
    function Npc(name) {
        this.hp = 10; //初始10点血
        this.name = name;
        this.setState(new HealthyState());
        this.log();
    }
    Npc.prototype.getHp = function () {
        return this.hp;
    };
    Npc.prototype.setHp = function (hp) {
        this.hp = hp;
    };
    Npc.prototype.setState = function (state) {
        this.state = state;
        this.state.setContext(this);
    };
    Npc.prototype.getState = function () {
        return this.state;
    };
    Npc.prototype.log = function () {
        console.log(">> " + this.name + " \u7684\u5F53\u524D\u8840\u91CF\u4E3A\uFF1A" + this.hp + "\uFF0C\u5F53\u524D\u72B6\u6001\uFF1A" + this.state.name());
    };
    // public attck(npc: Npc): void {
    //     npc.debuff();
    // }
    Npc.prototype.debuff = function (hp) {
        this.state.debuff(hp);
        this.log();
    };
    Npc.prototype.addBlood = function (hp) {
        this.state.addBlood(hp);
        this.log();
    };
    Npc.prototype.reborn = function () {
        this.state.reborn();
        this.log();
    };
    return Npc;
}());
var State = /** @class */ (function () {
    function State() {
    }
    State.prototype.setContext = function (npc) {
        this.npc = npc;
    };
    return State;
}());
//初始站立状态
var HealthyState = /** @class */ (function (_super) {
    __extends(HealthyState, _super);
    function HealthyState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HealthyState.prototype.debuff = function (hp) {
        if (this.npc.getHp() <= 0)
            return;
        this.npc.setHp(this.npc.getHp() - hp);
        if (this.npc.getHp() <= 0) {
            this.npc.setState(new DieState());
        }
        else {
            this.npc.setState(new DebuffState());
        }
    };
    HealthyState.prototype.addBlood = function () {
        //nothig to do
    };
    HealthyState.prototype.reborn = function () {
        //nothig to do
    };
    HealthyState.prototype.name = function () {
        return 'HealthyState';
    };
    return HealthyState;
}(State));
//受伤状态
var DebuffState = /** @class */ (function (_super) {
    __extends(DebuffState, _super);
    function DebuffState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DebuffState.prototype.debuff = function (hp) {
        if (this.npc.getHp() <= 0)
            return;
        this.npc.setHp(Math.max(this.npc.getHp() - hp, 0));
        if (this.npc.getHp() <= 0) {
            this.npc.setState(new DieState());
        }
    };
    DebuffState.prototype.addBlood = function (hp) {
        this.npc.setHp(Math.min(this.npc.getHp() + hp, 10));
        if (this.npc.getHp() >= 10) {
            this.npc.setState(new HealthyState());
        }
    };
    DebuffState.prototype.reborn = function () {
        //nothig to do
    };
    DebuffState.prototype.name = function () {
        return 'DebuffState';
    };
    return DebuffState;
}(State));
//死亡状态
var DieState = /** @class */ (function (_super) {
    __extends(DieState, _super);
    function DieState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DieState.prototype.debuff = function () {
        //nothig to do
    };
    DieState.prototype.addBlood = function () {
        //nothig to do
    };
    DieState.prototype.reborn = function () {
        this.npc.setHp(10);
        this.npc.setState(new HealthyState());
    };
    DieState.prototype.name = function () {
        return 'DieState';
    };
    return DieState;
}(State));
var npc1 = new Npc('娜可露露');
// let npc2: Npc = new Npc('不知火舞');
npc1.debuff(3);
npc1.addBlood(5);
npc1.debuff(3);
npc1.debuff(3);
npc1.debuff(3);
npc1.debuff(3);
npc1.reborn();
