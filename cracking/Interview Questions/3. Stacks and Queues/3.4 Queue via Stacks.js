// Queue via Stacks: Implement a MyQueue class which implements a queue using two stacks.
// Hints: #98, #7 74

const Stack = require('../../../utils/data-structures/Stack');

class MyQueue {
    constructor() {
        this.stack1 = new Stack.StackWithLinkedList();
        this.stack2 = new Stack.StackWithLinkedList();
    }

    add(item) {
        // Stack1 should be empty right now and Stack2 will hold all the elements so far in FIFO order
        this.moveItems(this.stack2, this.stack1);
        this.stack2.push(item);
        this.moveItems(this.stack1, this.stack2);
    }

    remove() {
        // Stack2 holds all the elements so far in FIFO order.
        if (this.isEmpty()) {
            throw new Error("Queue empty. Cannot remove");
        }
        return this.stack2.pop();
    }

    peek() {
        // Stack2 holds all the elements so far in FIFO order.
        if (this.isEmpty()) {
            throw new Error("Queue empty. Cannot peek");
        }
        return this.stack2.peek();
    }

    moveItems(stackA, stackB) {
        // Pop from stack A, push to stack B
        while (!stackA.isEmpty()) {
            stackB.push(stackA.pop());
        }
    }

    isEmpty() {
        return this.stack2.isEmpty();
    }

    toString() {
        let string = `stack1: ${this.stack1.toString()}\n`;
        string += `stack2: ${this.stack2.toString()}`;
        return string;
    }
}

let queue = new MyQueue();
queue.add(1);
console.log(queue.toString());
queue.add(2);
console.log(queue.toString());
queue.add(3);
console.log(queue.toString());
console.log('remove:', queue.remove());
console.log('remove:', queue.remove());
console.log('peek:', queue.peek());