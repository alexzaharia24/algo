class StackWithArray {
    constructor() {
        this.stack = [];
    }

    push(item) {
        this.stack.push(item);
    }

    pop() {
        if(this.isEmpty()) throw new Error("Stack is empty, cannot pop.");
        return this.stack.pop();
    }

    peek() {
        if(this.isEmpty()) throw new Error("Stack is empty, cannot peek.");
        return this.stack[this.stack.length-1];
    }

    isEmpty() {
        return this.stack.length === 0;
    }
}

class StackNode {
    constructor(value, next) {
        this.value = value ?? null;
        this.next = next ?? null;
    }
}
class StackWithLinkedList {
    constructor() {
        this.top = null;
    }

    push(item) {
        let newNode = new StackNode(item, this.top);
        this.top = newNode;
    }

    pop() {
        if(this.isEmpty()) {
            throw new Error("Stack is empty, cannot pop.");
        } 

        let item = this.top.value;
        this.top = this.top.next;
        return item;
    }

    peek() {
        if(this.isEmpty()) {
            throw new Error("Stack is empty, cannot peek.");
        } 

        return this.top.value;
    }


    isEmpty() {
        return this.top === null;
    }
}

let stack = new StackWithLinkedList();
// stack.push(1);
// stack.push(2);
// stack.push(3);
// console.log(stack.top);
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.peek());
// console.log(stack.isEmpty());
// console.log(stack.pop());
// console.log(stack.isEmpty());