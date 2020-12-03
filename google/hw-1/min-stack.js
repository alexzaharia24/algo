// https://leetcode.com/problems/min-stack/

class MinStack {
    constructor() {
        this.elems = [];
        this.mins = [];
    }


    push(x) {
        this.elems.push(x)
        if (this.mins.length === 0) {
            this.mins.push(x)
        } else {
            let currentMin = this.mins[this.mins.length - 1];
            if (x <= currentMin) {
                this.mins.push(x)
            } else {
                this.mins.push(currentMin)
            }
        }
    }

    pop() {
        if (this.elems.length > 0) {
            this.elems.pop();
            this.mins.pop();
        } else {
            throw new Error("Empty stack")
        }
    }

    top() {
        if (this.elems.length > 0) {
            return this.elems[this.elems.length - 1];
        } else {
            throw new Error("Empty stack")
        }
    }

    getMin() {
        if (this.mins.length > 0) {
            return this.mins[this.mins.length - 1]
        } else {
            throw new Error("Empty stack")
        }
    }
}

let minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// console.log(minStack.getMin()); // return -3
// minStack.pop();
// console.log(minStack.top());    // return 0
// console.log(minStack.getMin()); // return -2

// console.log("Elems: ", minStack.elems)
// console.log("Mins: ", minStack.mins)

minStack.push(-1)
console.log(minStack.top())
console.log(minStack.getMin())