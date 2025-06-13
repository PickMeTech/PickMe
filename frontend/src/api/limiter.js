export default class concLimiter {
    constructor({ maxRequests }) {
        this.maxRequests = maxRequests;
        this.queue = [];
        this.activeRequests = 0;
    }

    processQueue() {
        while (this.queue.length > 0 && this.activeRequests < this.maxRequests) {
            const { fn, resolve, reject } = this.queue.shift();
            this.activeRequests++;
            fn().then(resolve).catch(reject).finally(()=> {
                this.activeRequests--;
                this.processQueue();
            });
        }
    }

    enqueue(fn) {
        return new Promise((resolve, reject) => {
            this.queue.push({ fn, resolve, reject });
            this.processQueue();
        });
    }
}
