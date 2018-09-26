const EventEmitter = require('events').EventEmitter;

const emitter = new EventEmitter();

const fun = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('dida...')
            resolve(1);
        }, 2000);
    });
}

emitter.on('test', async function(params) {
    
    console.log('1111', params);
    const x = await fun();
    console.log('2222', params, x);

});

emitter.emit('test', [123]);