// Queue via Stacks: Implement a MyQueue class which implements a queue using two stacks.
// Hints: #98, #7 74

const Stack = require('../../../utils/data-structures/Stack');

class MyQueue {
    constructor() {
        this.stackNewest = new Stack.StackWithLinkedList();
        this.stackOldest = new Stack.StackWithLinkedList();
    }

    add(item) {
        // Push only on stackNewest. It will hold the most recent elements
        this.stackNewest.push(item);
    }

    remove() {
        // Remove only from stackOldest. If it is empty then move all items from stackNewest to stackOldest. This is better than continuously moving from newest to oldest and back again. This will be amortized to O(1) if there are a lot of elements in stackNewest
        if (this.isEmpty()) {
            throw new Error("Queue empty. Cannot remove");
        }
        if(this.stackOldest.isEmpty()) {
            this.moveItems(this.stackNewest, this.stackOldest);
        }

        // stackOldest holds the elements in FIFO order
        return this.stackOldest.pop();
    }

    peek() {
        // stackOldest holds the elements in FIFO order
        if (this.isEmpty()) {
            throw new Error("Queue empty. Cannot peek");
        }

        if(this.stackOldest.isEmpty()) {
            this.moveItems(this.stackNewest, this.stackOldest);
        }
        return this.stackOldest.peek();
    }

    moveItems(stackA, stackB) {
        // Pop from stack A, push to stack B
        while (!stackA.isEmpty()) {
            stackB.push(stackA.pop());
        }
    }

    isEmpty() {
        return this.stackNewest.isEmpty() && this.stackOldest.isEmpty();
    }

    toString() {
        let string = `stackNewest: ${this.stackNewest.toString()}\n`;
        string += `stackOldest: ${this.stackOldest.toString()}`;
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
console.log(queue.toString());
console.log('remove:', queue.remove());
console.log('peek:', queue.peek());