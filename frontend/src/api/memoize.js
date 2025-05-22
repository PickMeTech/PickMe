import fetch from "node-fetch";
import requestToHash from "./hasher";

function memoize(
    fetchFunction = fetch,
    hashFunction = requestToHash
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

        if (promiseCache.has(key)) {
            return promiseCache.get(key);
        }

        const p = wrapper(key, fetchFunction(url, options));
        promiseCache.set(key, p);
        return p;
    };
}
export default memoize;