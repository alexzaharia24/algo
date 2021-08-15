// On the spot dirty queue:
// let queue = [],  qIdx = 0;
// queue.add(item) is queue.push(item)
// queue.remove(item) is queue[qIdx++]


class QueueNode {
    constructor(value, next) {
        this.value = value ?? null;
        this.next = next ?? null;
    }
}

/**
 * Proper Queue implementation using Linked List 
 */
class Queue {
    constructor() {
        this.start = null;
        this.end = null;
    }

    add(item) {
        let newNode = new QueueNode(item);
        if (this.end !== null) {
            this.end.next = newNode;
        } else {
            this.start = newNode;
        }
        this.end = newNode;
    }

    remove() {
        if (this.isEmpty()) throw new Error("Queue is empty, cannot remove");
        let item = this.start.value;
        if (this.start === this.end) {
            this.end = null;
        }
        this.start = this.start.next;
        return item;
    }

    peek() {
        if (this.isEmpty()) throw new Error("Queue is empty, cannot peek");
        return this.start.value;
    }

    isEmpty() {
        return this.start === null;
    }
}

//// Double Ended Queue

class DequeueNode {
    constructor(value, next, prev) {
        this.value = value ?? null;
        this.next = next ?? null;
        this.prev = prev ?? null;
    }

    toString() {
        return this.value;
    }
}

class Dequeue {
    constructor(capacity) {
        this.capacity = capacity ?? Infinity;
        this.size = 0;
        this.front = null;
        this.back = null;
    }

    pushFront(item) {
        if (this.isFull()) {
            throw new Error("Dequeue full. Cannot push");
        }

        if (this.front === null) {
            this.front = new DequeueNode(item);
            this.back = this.front;
            return true;
        }

        let newFront = new DequeueNode(item, this.front);
        this.front.prev = newFront;
        this.front = newFront;
        if (this.back === newFront.next) {
            // In case of only 1 element in the dequeue
            this.back.prev = newFront;
        }

        this.size++;
        return true;
    }

    pushBack(item) {
        if (this.isFull()) {
            throw new Error("Dequeue full. Cannot push");
        }

        if (this.front === null) {
            this.front = new DequeueNode(item);
            this.back = this.front;
            return true;
        }

        let newBack = new DequeueNode(item, null, this.back);
        this.back.next = newBack;
        this.back = newBack;
        if (this.front = newBack.prev) {
            // In case of only 1 element in the dequeue
            this.front.next = newBack;
        }

        this.size++;
        return true;
    }

    popFront() {
        if (this.isEmpty()) {
            throw new Error("Dequeue empty. Cannot pop");
        }

        let item = this.peekFront();

        if (this.back === this.front) {
            this.front = null;
            this.back = null;
        } else {
            this.front = this.front.next;

            if (this.front !== null) {
                this.front.prev = null;
            }
        }

        this.size--;

        return item;
    }

    peekFront() {
        if (this.isEmpty()) {
            throw new Error("Dequeue empty. Cannot peek");
        }

        return this.front.value;
    }

    popBack() {
        if (this.isEmpty()) {
            throw new Error("Dequeue empty. Cannot pop");
        }

        let item = this.peekBack();

        if (this.back === this.front) {
            this.front = null;
            this.back = null;
        } else {
            this.back = this.back.prev;

            if (this.back !== null) {
                this.back.next = null;
            }
        }

        this.size--;

        return item;
    }

    peekBack() {
        if (this.isEmpty()) {
            throw new Error("Dequeue empty. Cannot peek");
        }

        return this.back.value;
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.capacity;
    }

    toString() {
        let string = "";
        let node = this.front;
        while (node !== null) {
            string += node.toString();
            if (node.next !== null) {
                string += " -> ";
            }
            node = node.next;
        }

        return string;
    }
}

//// Queue Example

// let queue = new Queue();
// queue.add(1);
// queue.add(2);
// queue.add(3);
// console.log('start', queue.start);
// console.log('end', queue.end);
// console.log(queue.isEmpty());
// console.log(queue.remove());
// console.log(queue.remove());
// console.log(queue.peek());
// console.log(queue.remove());
// console.log(queue.isEmpty());
// console.log('start', queue.start);
// console.log('end', queue.end);
// queue.add(1);
// console.log(queue.peek());

//// Dequeue Example

let dequeue = new Dequeue(3);
dequeue.pushBack(1);
console.log(dequeue.toString())
dequeue.pushBack(2);
console.log(dequeue.toString())
dequeue.pushFront(3);
console.log(dequeue.toString())
console.log('pop: ', dequeue.popBack());
console.log(dequeue.toString())
console.log('pop: ', dequeue.popFront());
console.log(dequeue.toString())