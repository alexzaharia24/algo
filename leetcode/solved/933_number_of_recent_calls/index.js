var RecentCounter = function () {
    this.requests = [];
    this.cuttofIdx = 0;
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
    this.advance(t); // Delete all requests before t-3000
    this.requests.push(t);

    return this.requests.length - this.cuttofIdx;
};

RecentCounter.prototype.advance = function (t) {
    // Advance the cuttofIdx to the first request that is within the last 3000 ms
    while(this.requests[this.cuttofIdx] < t - 3000) {
        this.cuttofIdx++;
    }
}

/** 
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */

const obj = new RecentCounter();
console.log(obj.ping(1));
console.log(obj.ping(100));
console.log(obj.ping(3001));
console.log(obj.ping(3002));