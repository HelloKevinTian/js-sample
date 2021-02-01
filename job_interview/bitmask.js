/**
 * 位掩码应用
 */

class NewPermission {

    constructor(flag) {
        // 存储目前的权限状态
        this.flag = flag;
    }

    /**
     *  重新设置权限
     */
    setPermission(permission) {
        this.flag = permission;
    }

    /**
     *  添加一项或多项权限
     */
    enable(permission) {
        this.flag |= permission;
    }

    /**
     *  删除一项或多项权限
     */
    disable(permission) {
        this.flag &= ~permission;
    }

    /**
     *  是否拥某些权限
     */
    isAllow(permission) {
        return (this.flag & permission) == permission;
    }

    /**
     *  是否禁用了某些权限
     */
    isNotAllow(permission) {
        return (this.flag & permission) == 0;
    }

    /**
     *  是否仅仅拥有某些权限
     */
    isOnlyAllow(permission) {
        return this.flag == permission;
    }
}

//所有权限类型
const pp = {
    select: 1 << 0,
    insert: 1 << 1,
    update: 1 << 2,
    delete: 1 << 3,
    select_insert: 0b0011,
    update_delete: 0b1100,
    none: 0b0000,
    all: 0b1111
};

const user = new NewPermission(pp.select);

console.log(user.isAllow(pp.select))
console.log(user.isNotAllow(pp.delete))
console.log(user.isOnlyAllow(pp.select))