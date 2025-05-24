import requestToHash from "./hasher.js";

function memoize(
    fetchFunction = fetch,
    hashFunction = requestToHash,
    expirationTime = 1000 * 60 * 5
) {
    const promiseCache = new Map();

    return function (url, options) {
        const key = hashFunction(url, options);
        const cached = promiseCache.get(key);

        if (cached) {
            if (cached.expiresDate > Date.now()) {
                return cached.promise;
            } else {
                promiseCache.delete(key);
            }
        }
        const promise = fetchFunction(url, options);
        promiseCache.set(key, {
            promise,
            expiresDate: Date.now() + expirationTime
        });

        return promise;
    };
}

export default memoize;