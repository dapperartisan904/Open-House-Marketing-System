

export default promiseTimeout = function (ms, promise) {
    let id;
    let timeout = new Promise((resolve, reject) => {
        id = setTimeout(() => {
            clearTimeout(id);
            reject('Time out in' + ms + 'ms.');
            alert('Network request is rejected. Try again')
        }, ms)
    })

    return Promise.race([
        promise,
        timeout
    ]).then((result) => {
        clearTimeout(id);
        return result;
    })
}