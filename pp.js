function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null);
        }, 1000);
    })
}

async function delayn() {
    await delay();
    await delay();
    console.log('11111', Date.now());
}

setTimeout(async () => {
    let arr = [1,2,3,4,5,6,7,8,9,10].map(async (item) => {
        await delay();
        await delay();
        console.log('11111', Date.now());
    });
    console.log(arr)
    console.log(delayn())
    await Promise.all(arr);
    console.log('-------', Date.now())
}, 100);