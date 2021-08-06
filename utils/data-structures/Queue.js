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

