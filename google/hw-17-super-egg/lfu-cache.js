// https://leetcode.com/problems/lfu-cache/

class Node {
    constructor(key, value) {
        this.prev = null;
        this.next = null;
        this.key = key;
        this.value = value;
        this.frequency = 0;
    }
}

class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.nodes = {}; // Mapping of key -> Node
        this.frequencies = {}; // Will be a mapping of frequency -> [head, tail], where head is the most recently used node with that frequency, the next node will be te 2nd most recently used and so on, and tail will be the least recently used with that frequency
        this.lowestFreq = 0;
    }

    get(key) {
        // console.log("GET enter:", "\n\tnodes: ", this.nodes, "\n\tfreqs: ", this.frequencies);
        let result;
        if (this.capacity > 0 && this.nodes[key]) {
            let node = this.nodes[key];
            this.incrementFrequency(node);
            result = node.value;
        } else {
            result = -1;
        }
        // console.log("GET exit:", "\n\tnodes: ", this.nodes, "\n\tfreqs: ", this.frequencies);
        return result;
    }

    put(key, value) {
        // console.log("PUT enter:", "\n\tnodes: ", this.nodes, "\n\tfreqs: ", this.frequencies);
        if(this.capacity > 0) {
            if (this.get(key) === -1) {
                // Insert value
                let node = new Node(key, value);
                node.frequency = 1;
                this.insertAtFrequency(node, 1); // This handles the case when capacity is full as well
                this.nodes[key] = node;
            } else {
                // Update value
                let node = this.nodes[key];
                node.value = value;
                this.incrementFrequency(node);
            }
        }
        // console.log("PUT exit:", "\n\tnodes: ", this.nodes, "\n\tfreqs: ", this.frequencies);
    }

    insertAtFrequency(node, freq) {
        if (this.capacity === 0) return;
        if (this.size === this.capacity) {
            // Need to evict element with lowest frequency
            // For the moment find the lowest frequency in O(n) time
            // let lowestFreq = this.getLowestFrequency();
            this.removeLastRecentlyUsed(this.lowestFreq);
            this.lowestFreq = 1;
        }

        if (!this.frequencies[freq]) {
            this.frequencies[freq] = [node, node];
        } else {
            let f = this.frequencies[freq];
            let head = f[0], tail = f[1];
            node.next = head;
            head.prev = node;
            this.frequencies[freq] = [node, tail]; // node becomes the new head for freq
        }
        this.size++;
    }

    incrementFrequency(node) {
        // Remove from current frequency
        this.removeFromCurrentFrequency(node);
        node.frequency++;
        this.insertAtFrequency(node, node.frequency);
    }

    removeFromCurrentFrequency(node) {
        let freq = node.frequency;
        let f = this.frequencies[freq];
        let head = f[0], tail = f[1];

        if (node === head) {
            if (node === tail) {
                delete this.frequencies[freq];
            } else {
                head.next.prev === null;
                this.frequencies[freq] = [head.next, tail];
            }
        } else if (node === tail) {
            tail.prev.next = null;
            this.frequencies[freq] = [head, tail.prev];
        } else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        this.size--;
    }

    getLowestFrequency() {
        // return Math.min(...Object.keys(this.frequencies));
        return Object.keys(this.frequencies)[0];
    }

    removeLastRecentlyUsed(freq) {
        let f = this.frequencies[freq];
        let head = f[0], tail = f[1];

        if (head === tail) {
            delete this.frequencies[freq];
        } else {
            tail.prev.next = null;
            this.frequencies[freq] = [head, tail.prev];
        }
        delete this.nodes[tail.key];
        this.size--;
    }
}

let lfu = new LFUCache(2);
lfu.put(1,1);
lfu.put(2,2);
console.log(lfu.get(1));
lfu.put(3,3);
console.log(lfu.get(2));
console.log(lfu.get(3));
lfu.put(4,4);
console.log(lfu.get(1));
console.log(lfu.get(3));
console.log(lfu.get(4));
