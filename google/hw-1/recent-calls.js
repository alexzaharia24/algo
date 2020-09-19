// https://leetcode.com/problems/number-of-recent-calls/
class Queue {
    constructor() {
        this.q = []
        this.firstElemIdx = 0;
    }

    push(x) {
        this.q.push(x)
    }

    pop() {
        let elem = this.top()
        if(this.q.length > 0) {
            this.firstElemIdx++;
        } else {
           throw new Error("Empty queue") 
        }
        return elem
    }

    top() {
        return this.q[this.firstElemIdx]
    }

    isEmpty() {
        return this.size() === 0
    }

    size() {
        return this.q.length - this.firstElemIdx;
    }
}

class RecentCounter {
    constructor() {
        this.pings = [];
        this.oldestValidPingIndex = 0;
        this.queue = new Queue();
    }

    ping(t) {
        return this.pingQueue(t);
    }

    pingLinear(t) {
        // O(n)
        // 712 ms
        this.pings.push(t);

        let nrOfValidPings = 0;
        for (let i = this.pings.length - 1; i >= 0; i--) {
            let ping = this.pings[i];
            if ((ping >= t - 3000) && (ping <= t)) {
                nrOfValidPings++;
            }
        }

        return nrOfValidPings;
    }

    pingPointer(t) {
        // O(1) amortized
        // 236 ms
        this.pings.push(t);
        let nrOfValidPings = 0;

        while (this.oldestValidPingIndex < this.pings.length && this.pings[this.oldestValidPingIndex] < t - 3000) {
            // Increase oldest ping index until we find a valid ping
            this.oldestValidPingIndex++;
        }

        nrOfValidPings = this.pings.length - this.oldestValidPingIndex;
        return nrOfValidPings
    }

    pingQueue(t) {
        this.queue.push(t)
        console.log("queue: ", this.queue);
        while(!this.queue.isEmpty() && this.queue.top() < t - 3000) {
            this.queue.pop()
        }
        return this.queue.size();
    }


}

let recentCounter = new RecentCounter();

console.log(recentCounter.ping(1));
console.log(recentCounter.ping(100));
console.log(recentCounter.ping(3001));
console.log(recentCounter.ping(3002));
console.log(recentCounter.ping(6005));