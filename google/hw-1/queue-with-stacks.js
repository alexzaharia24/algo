class MyQueue {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }

    push(x) {
        this.stack1.push(x);
    }

    pop() {
        let elem = this.peek();
        this.stack2.pop();
        return elem;
    }

    peek() {
        if (this.stack2.length === 0) {
            if (this.stack1.length === 0) {
                throw new Error("Empty queue")
            }

            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop())
            }

        }

        return this.stack2[this.stack2.length - 1];
    }

    empty() {
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
}

let q = new MyQueue();
q.push(1)
console.log(q.peek())
q.push(2)
q.push(3)
console.log(q.pop())
q.push(4)
console.log(q.pop())
console.log(q.pop())
console.log(q.empty())
console.log(q.pop())
console.log(q.empty())