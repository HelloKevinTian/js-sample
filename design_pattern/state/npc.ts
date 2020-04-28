class Npc {

    private hp: number = 10; //初始10点血
    private name: string; //npc名字
    private state: State;

    constructor(name: string) {
        this.name = name;
        this.setState(new HealthyState());
        this.log();
    }

    public getHp(): number {
        return this.hp;
    }

    public setHp(hp: number): void {
        this.hp = hp;
    }

    public setState(state: State): void {
        this.state = state;
        this.state.setContext(this);
    }

    public getState(): State {
        return this.state;
    }

    public log(): void {
        console.log(`>> ${this.name} 的当前血量为：${this.hp}，当前状态：${this.state.name()}`);
    }

    // public attck(npc: Npc): void {
    //     npc.debuff();
    // }

    public debuff(hp: number): void {
        this.state.debuff(hp);
        this.log();
    }

    public addBlood(hp: number): void {
        this.state.addBlood(hp);
        this.log();
    }

    public reborn(): void {
        this.state.reborn();
        this.log();
    }
}

abstract class State {

    protected npc: Npc;

    public setContext(npc: Npc) {
        this.npc = npc;
    }

    public abstract debuff(hp: number): void;
    public abstract addBlood(hp: number): void;
    public abstract reborn(): void;
    public abstract name(): string;

}

//初始站立状态
class HealthyState extends State {
    public debuff(hp: number): void {
        if (this.npc.getHp() <= 0) return;
        this.npc.setHp(this.npc.getHp() - hp);
        if (this.npc.getHp() <= 0) {
            this.npc.setState(new DieState());
        } else {
            this.npc.setState(new DebuffState());
        }
    }

    public addBlood(): void {
        //nothig to do
    }

    public reborn(): void {
        //nothig to do
    }

    public name(): string {
        return 'HealthyState';
    }
}

//受伤状态
class DebuffState extends State {
    public debuff(hp: number): void {
        if (this.npc.getHp() <= 0) return;
        this.npc.setHp(Math.max(this.npc.getHp() - hp, 0));
        if (this.npc.getHp() <= 0) {
            this.npc.setState(new DieState());
        }
    }
    public addBlood(hp: number): void {
        this.npc.setHp(Math.min(this.npc.getHp() + hp, 10));
        if (this.npc.getHp() >= 10) {
            this.npc.setState(new HealthyState());
        }
    }
    public reborn(): void {
        //nothig to do
    }
    public name(): string {
        return 'DebuffState';
    }
}

//死亡状态
class DieState extends State {
    public debuff(): void {
        //nothig to do
    }
    public addBlood(): void {
        //nothig to do
    }
    public reborn(): void {
        this.npc.setHp(10);
        this.npc.setState(new HealthyState());
    }
    public name(): string {
        return 'DieState';
    }
}

let npc1: Npc = new Npc('娜可露露');
// let npc2: Npc = new Npc('不知火舞');

npc1.debuff(3);
npc1.addBlood(5);
npc1.debuff(3);
npc1.debuff(3);
npc1.debuff(3);
npc1.debuff(3);
npc1.reborn();