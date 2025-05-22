import requestToHash from "./hasher.js";

function memoize(
    fetchFunction = fetch,
    hashFunction = requestToHash,
    expirationTime = 1000 * 60 * 5
) {
    const promiseCache = new Map();

    async function wrapper(key, promise) {
        try {
            await promise;
        } finally {
            promiseCache.delete(key);
        }
        return promise;
    }

    return function (url, options) {
        const key = hashFunction(url, options);
//чи час більший ніж коли дата в нас має зникнути
        if (promiseCache.has(key)) {
           if (expirationTime > Date.now()) {
               return promiseCache.get(key);
           }
        }
        const p = wrapper(key, fetchFunction(url, options));
        promiseCache.set(key, {p, expiresDate: Date.now() + expirationTime });
        return p;
    };
}
export default memoize;