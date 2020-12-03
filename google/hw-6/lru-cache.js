// https://leetcode.com/problems/lru-cache/

class Node {
    constructor(key, value, next, prev) {
        this.key = key;
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.head = new Node(null, null, null, null);
        this.tail = new Node(null, null, null, null);
        this.hash = new Map();
    }

    moveElementToStartOfList(element) {
        if (this.size > 1) { // If == 1 then head is this node so no need to change the position in the list
            if (this.head.next !== element) {
                // If node is not already head then we need to move to start of list
                if (this.tail.prev === element) {
                    // Element is tail => need new tail
                    // element.prev.next = null;
                    this.tail.prev = element.prev;
                } else {
                    // If not tail then it has "next"
                    element.next.prev = element.prev;
                }

                let oldHead = this.head.next;

                oldHead.prev = element;
                element.prev.next = element.next;
                element.next = oldHead
                element.prev = null;
                this.head.next = element;
            }
        }
    }

    get(key) {
        let element = this.hash.get(key);
        if (element === undefined) return -1;

        // Move to start of list
        this.moveElementToStartOfList(element);


        return element.value;
    }
    put(key, value) {
        let element = this.hash.get(key);
        if (element !== undefined) {
            // Already exists => only update
            // Move to start of list
            this.moveElementToStartOfList(element);

            // Update value
            element.value = value;
            this.hash.set(key, element);

        } else {
            // New element
            let node = new Node(key, value, null, null);
            // Move to start of list
            if (this.head.next !== null) {
                let oldHead = this.head.next;
                node.next = oldHead;
                oldHead.prev = node;
                this.head.next = node; // new list start
            } else {
                // First element added
                this.head.next = node;
                this.tail.prev = node;
            }

            this.size++;
            if (this.size > this.capacity) {
                // Remove last element
                this.hash.set(this.tail.prev.key, undefined); // Remove from hashmap
                this.tail.prev = this.tail.prev.prev;
                this.tail.prev.next = null;

                this.size--;
            }

            this.hash.set(key, node);
        }
    }
}

let cache = new LRUCache(3 /* capacity */);

cache.put(1, 1);
cache.put(2, 2);
cache.put(3, 3);    // evicts key 2
cache.put(4, 4);    // evicts key 1
cache.get(4);       // returns 1
cache.get(3);       // returns -1 (not found)
cache.get(2);       // returns -1 (not found)
cache.get(1);
cache.put(5, 5);    // evicts key 1
cache.get(1);
cache.get(2);
cache.get(3);
cache.get(4);
cache.get(5);       
