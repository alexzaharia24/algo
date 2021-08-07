// 3.2 Stack Min: How would you design a stack which, in addition to push and pop, has a function min
// which returns the minimum element? Push, pop and min should all operate in 0(1) time.
// Hints: #27, #59, #78

class MinStackWithArray {
    constructor() {
        this.stack = [];
        this.minsSoFar = [];
    }

    push(item) {
        this.stack.push(item);
        if (this.minsSoFar.length === 0) {
            this.minsSoFar.push(item);
        } else {
            this.minsSoFar.push(Math.min(item, this.minsSoFar[this.minsSoFar.length - 1]));
        }
    }

    pop() {
        if (this.isEmpty()) throw new Error("Stack is empty, cannot pop");
        this.minsSoFar.pop();
        return this.stack.pop();
    }

    peek() {
        if (this.isEmpty()) throw new Error("Stack is empty, cannot peek");
        return this.stack[this.stack.length - 1];
    }

    min() {
        if (this.isEmpty()) throw new Error("Stack is empty, cannot get min");
        return this.minsSoFar[this.minsSoFar.length - 1];
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

class Stack {
    constructor() {
        this.top = null;
    }

    push(item) {
        let newNode = new StackNode(item, this.top);
        this.top = newNode;
    }

    pop() {
        if(this.isEmpty()) throw new Error("Stack is empty, cannot pop");
        let item = this.top.value;
        this.top = this.top.next;
        return item;
    }

    peek() {
        if(this.isEmpty()) throw new Error("Stack is empty, cannot peek");
        return this.top.value;
    }

    isEmpty() {
        return this.top === null;
    }
}

class MinStackWithSecondStack extends Stack{
    constructor() {
        super();
        this.minStack = new Stack();
    }

    push(item) {
        let newNode = new StackNode(item, this.top);
        this.top = newNode;
        if(this.minStack.isEmpty() || item < this.minStack.peek()) {
            this.minStack.push(item);
        }
    }

    pop() {
        if (this.isEmpty()) throw new Error("Stack is empty, cannot pop");
        let item = this.top.value;
        this.top = this.top.next;
        if(item === this.minStack.peek()) {
            this.minStack.pop();
        }

        return item;
    }

    min() {
        if (this.isEmpty()) throw new Error("Stack is empty, cannot get min");
        return this.minStack.peek();
    }
}

let stack = new MinStackWithSecondStack();
stack.push(3);
stack.push(2);
stack.push(4);
stack.push(1);

console.log(stack.min());
stack.pop();
console.log(stack.min());
stack.pop();
console.log(stack.min());
stack.pop();
console.log(stack.min());
