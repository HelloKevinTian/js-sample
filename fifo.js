/**
 * key-value缓存队列，含过期时间
 */

module.exports = FifoCache;

function FifoCache(options) {
    if (!(this instanceof FifoCache)) {
        return new FifoCache();
    }
    if (typeof options === 'number') {
        options = {
            max: options
        };
    }

    options = options || {};

    this._max = options.max;
        // Kind of weird to have a default max of Infinity, but oh well.
    if (!this._max || !(typeof this._max === 'number') || this._max <= 0) {
        this._max = Infinity;
    }

    this._maxAge = options.maxAge || null;

    this._cache = new Map();
}

FifoCache.prototype.set = function(key, value, maxAge) {
    maxAge = maxAge || this._maxAge;
    var now = maxAge ? Date.now() : 0;
    var entry;
    if (this._cache.has(key)) {
        entry = this._cache.get(key);
        entry.now = now;
        entry.maxAge = maxAge;
        entry.value = value;
        return;
    }
    entry = new Entry(key, value, now, maxAge);
    this._cache.set(key, entry);
    if (this._cache.size > this._max) {
        trim(this);
    }
}

/**
 * return expired object if stale
 *
 */
FifoCache.prototype.get = function(key, stale) {
    var entry = this._cache.get(key);
    if (entry && isStale(this, entry)) {
        del(this, entry);
        if (!stale) entry = undefined;
    }
    return entry && entry.value;
}

FifoCache.prototype.del = function(key) {
    del(this, this._cache.get(key));
}

function trim(self) {
    var max = self._max;
    while (self._cache.size > max) {
        var popKey = self._cache.keys().next().value;
        self._cache.delete(popKey);
    }
}

function isStale(self, entry) {
    if (!entry || (!entry.maxAge && !self._maxAge)) return false;
    var stale = false;
    var diff = Date.now() - entry.now;
    if (entry.maxAge) {
        stale = diff > entry.maxAge;
    } else {
        stale = self._maxAge && (diff > self._maxAge);
    }
    return stale;
}

function del(self, entry) {
    if (entry) {
        if (self._dispose) self._dispose(entry.key, entry.value);
        self._cache.delete(entry.key);
    }
}

function Entry(key, value, now, maxAge) {
    this.key = key;
    this.value = value;
    this.now = now;
    if (maxAge) this.maxAge = maxAge;
}

/* test--------
var FifoCache = require('./fifo');

var cache = new FifoCache({
    max: 3,
    maxAge: 1000
});

console.log(cache);

var obj = {
    'hello': 'world'
};

//set
cache.set('foo1', obj);
cache.set('foo2', obj);
cache.set('foo3', obj);
cache.set('foo4', obj);

//get
console.log('result1:', cache.get('foo1'));
console.log('result2:', cache.get('foo2'));
console.log('result3:', cache.get('foo3'));
console.log('result4:', cache.get('foo4'));
console.log(cache);

//del
cache.del('foo4');
console.log(cache);

//timeout del
cache.set('t1', 'v1', 124);

setTimeout(function() {
    console.log('after 125:', cache.get('t1'));
}, 125);
*/