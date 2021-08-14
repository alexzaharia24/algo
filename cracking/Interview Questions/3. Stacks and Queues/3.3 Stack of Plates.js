// Stack of Plates: Imagine a (literal) stack of plates. If the stack gets too high, it might topple.
// Therefore, in real life, we would likely start a new stack when the previous stack exceeds some
// threshold. Implement a data structure SetOfStacks that mimics this. SetOfStacks should be
// composed of several stacks and should create a new stack once the previous one exceeds capacity.
// SetOfStacks. push () and SetOfStacks. pop () should behave identically to a single stack
// (that is, pop ( ) should return the same values as it would if there were just a single stack).
// FOLLOW UP
// Implement a function popAt (int index) which performs a pop operation on a specific sub-stack.
// Hints: #64, #87

class StackFullException extends Error {
    constructor(message) {
        super(message);
    }
}

class StackEmptyException extends Error {
    constructor(message) {
        super(message);
    }
}

class NoStackException extends Error {
    constructor(message) {
        super(message);
    }
}

class StackNode {
    constructor(value, next) {
        this.value = value ?? null;
        this.next = next ?? null;
    }
}

class Stack {
    constructor(capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.top = null;
    }

    push(item) {
        if (this.isFull()) {
            throw new StackFullException("Stack is full, cannot push");
        }

        this.top = new StackNode(item, this.top);
        this.size++;
    }

    pop() {
        if (this.isEmpty()) {
            throw new StackEmptyException("Stack is empty, cannot pop");
        }

        let item = this.top.value;
        this.top = this.top.next;
        this.size--;
        return item;
    }

    peek() {
        if (this.isEmpty()) {
            throw new StackEmptyException("Stack is empty, cannot peek");
        }

        return this.top.value;;
    }


    isFull() {
        return this.size === this.capacity;
    }

    isEmpty() {
        return this.top === null;
    }
}

class SetOfStacksWithStackOfStacks {
    constructor(capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.topStack = null;
    }

    push(item) {
        if (this.isEmpty() || this.isLastStackFull()) {
            this.addNewStack();
        }

        this.topStack.value.push(item);
    }

    pop() {
        if (this.isEmpty()) {
            throw new StackEmptyException("Set of Stacks is empty, cannot pop");
        }

        let item = this.topStack.value.pop();
        if (this.isLastStackEmpty()) {
            // Pop the empty stack from the set
            this.topStack = this.topStack.next;
        }
        return item;
    }

    peek() {
        if (this.isEmpty()) {
            throw new StackEmptyException("Set of Stacks is empty, cannot peek");
        }

        return this.topStack.value.peek();
    }

    addNewStack() {
        let newStack = new Stack(this.capacity);
        this.topStack = new StackNode(newStack, this.topStack);
    }

    isLastStackFull() {
        if (this.isEmpty()) throw new NoStackException("No stack yet.");

        return this.topStack.value.isFull();
    }

    isLastStackEmpty() {
        if (this.isEmpty()) throw new NoStackException("No stack yet.");

        return this.topStack.value.isEmpty();
    }

    isEmpty() {
        return this.topStack === null;
    }
}

class SetOfStacksWithListOfStacks {
    constructor(capacity) {
        this.capacity = capacity;
        this.set = [];
    }

    push(item) {
        if (this.isEmpty() || this.isLastStackFull()) {
            this.addNewStack();
        }

        this.getLastStack().push(item);
    }

    pop() {
        if (this.isEmpty()) {
            throw new StackEmptyException("Set of Stacks is empty, cannot pop");
        }

        let item = this.getLastStack().pop();
        if (this.isLastStackEmpty()) {
            // Pop the empty stack from the set
            this.set.pop();
        }
        return item;
    }

    popAt(index) {
        if (this.isEmpty()) {
            throw new StackEmptyException("Set of Stacks is empty, cannot pop");
        }

        if (index >= this.set.length) throw new Error(`No stack with index ${index} in the set`);

        let stack = this.set[index];
        let item = stack.pop();
        if (stack.isEmpty()) {
            // Pop the empty stack from the set
            this.set.splice(index, 1);
        }

        return item;
    }

    peek() {
        if (this.isEmpty()) {
            throw new StackEmptyException("Set of Stacks is empty, cannot peek");
        }

        return this.getLastStack().peek();
    }

    addNewStack() {
        this.set.push(new Stack(this.capacity))
    }

    isLastStackFull() {
        if (this.isEmpty()) throw new NoStackException("No stack yet.");

        return this.getLastStack().isFull();
    }

    isLastStackEmpty() {
        if (this.isEmpty()) throw new NoStackException("No stack yet.");

        return this.getLastStack().isEmpty();
    }

    getLastStack() {
        return this.set[this.set.length - 1];
    }

    isEmpty() {
        return this.set.length === 0;
    }
}



// Set of stacks with popAt() and rollover when popping from a middle stack
class StackNodeDouble {
    constructor(value, next, prev) {
        this.value = value ?? null;
        this.next = next ?? null;
        this.prev = prev ?? null;
    }

    toString() {
        return this.value;
    }
}

class StackRollover {
    constructor(capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.top = null;
        this.bottom = null;
    }

    pushFront(item) {
        if (this.isFull()) {
            throw new StackFullException("Stack is full, cannot push");
        }

        let newTop = new StackNodeDouble(item, this.top);
        this.size++;

        if (this.top === null) {
            this.top = newTop;
            this.bottom = this.top;
            return;
        }

        this.top.prev = newTop;
        this.top = newTop;

        if (newTop.next === this.bottom) {
            this.bottom.prev = newTop;
        }
    }

    pushBack(item) {
        if (this.isFull()) {
            throw new StackFullException("Stack is full, cannot push");
        }

        let newBottom = new StackNodeDouble(item, null, this.bottom);
        this.size++;

        if (this.top === null) {
            this.top = newBottom;
            this.bottom = this.top;
            return;
        }

        this.bottom.next = newBottom;
        this.bottom = newBottom;

        if (newBottom.prev === this.top) {
            this.top.next = newBottom;
        }

    }

    popFront() {
        if (this.isEmpty()) {
            throw new StackEmptyException("Stack is empty, cannot pop");
        }

        let item = this.top.value;
        if (this.bottom === this.top) this.bottom = null;
        this.top = this.top.next;
        this.size--;
        return item;
    }

    popBottom() {
        if (this.isEmpty()) {
            throw new StackEmptyException("Stack is empty, cannot pop");
        }

        let item = this.bottom.value;
        if (this.top === this.bottom) this.top = null;
        this.bottom = this.bottom.prev;
        this.size--;
        return item;
    }

    peekFront() {
        if (this.isEmpty()) {
            throw new StackEmptyException("Stack is empty, cannot peek");
        }

        return this.top.value;
    }


    isFull() {
        return this.size === this.capacity;
    }

    isEmpty() {
        return this.top === null;
    }

    toString() {
        let string = "";
        let node = this.top;
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

class SetOfStacksWithListOfStacksAndRolloverOnPop {
    constructor(capacity) {
        this.capacity = capacity;
        this.set = [];
    }

    push(item) {
        if (this.isEmpty() || this.isLastStackFull()) {
            this.addNewStack();
        }

        this.getLastStack().pushFront(item);
    }

    pop() {
        if (this.isEmpty()) {
            throw new StackEmptyException("Set of Stacks is empty, cannot pop");
        }

        let item = this.getLastStack().popFront();
        if (this.isLastStackEmpty()) {
            // Pop the empty stack from the set
            this.set.pop();
        }
        return item;
    }

    popAt(index) {
        if (this.isEmpty()) {
            throw new StackEmptyException("Set of Stacks is empty, cannot pop");
        }

        if (index >= this.set.length) throw new Error(`No stack with index ${index} in the set`);

        let stack = this.set[index];
        let item = stack.popFront();
        if (stack.isEmpty()) {
            // Pop the empty stack from the set
            this.set.splice(index, 1);
        } else {
            // Rollover element from the next stack;
            for (let idx = index + 1; idx < this.set.length; idx++) {
                let front = this.set[idx].popFront();
                stack.pushBack(front);
                stack = this.set[idx];
            }

            // Remove empty stacks after rollover
            let idx = 0;
            while(idx < this.set.length) {
                if(this.set[idx].isEmpty()) {
                    this.set.splice(idx, 1);
                } else {
                    idx++;
                }
            }
        }

        return item;
    }

    rolloverRecursive(index) {
        // Pop from bottom of stack set[index] and push to stack set[index-1]
        if (index - 1 < 0) return null;
        this.set[index - 1].pushBack(this.set[index].popFront());
        this.rollover(index + 1);
    }

    peek() {
        if (this.isEmpty()) {
            throw new StackEmptyException("Set of Stacks is empty, cannot peek");
        }

        return this.getLastStack().peekFront();
    }

    addNewStack() {
        this.set.push(new StackRollover(this.capacity))
    }

    isLastStackFull() {
        if (this.isEmpty()) throw new NoStackException("No stack yet.");

        return this.getLastStack().isFull();
    }

    isLastStackEmpty() {
        if (this.isEmpty()) throw new NoStackException("No stack yet.");

        return this.getLastStack().isEmpty();
    }

    getLastStack() {
        return this.set[this.set.length - 1];
    }

    isEmpty() {
        return this.set.length === 0;
    }

    print() {
        for (let i = 0; i < this.set.length; i++) {
            console.log(`Stack ${i}: ${this.set[i].toString()}`);
        }
    }
}

// let setOfStacks = new SetOfStacksWithListOfStacks(3);
SetOfStacksWithListOfStacksAndRolloverOnPop
// setOfStacks.push(1);
// setOfStacks.push(2);
// setOfStacks.push(3);
// setOfStacks.push(4);
// console.log(setOfStacks.peek());
// console.log(setOfStacks.set)
// setOfStacks.pop();
// setOfStacks.pop();
// setOfStacks.pop();
// console.log(setOfStacks.peek());
// setOfStacks.pop();

let setOfStacks = new SetOfStacksWithListOfStacksAndRolloverOnPop(3);

setOfStacks.push(1);
setOfStacks.push(2);
setOfStacks.push(3);
setOfStacks.push(4);
setOfStacks.push(5);
setOfStacks.push(6);
setOfStacks.push(7);
setOfStacks.print();
console.log()

setOfStacks.popAt(0);
setOfStacks.print();

setOfStacks.push(8);
setOfStacks.push(9);
console.log()
setOfStacks.print();

// setOfStacks.popAt(0);
// console.log(setOfStacks.peek());
// setOfStacks.popAt(1);
// console.log(setOfStacks.peek());
// console.log(setOfStacks.set)
// console.log(setOfStacks.pop())
// console.log(setOfStacks.pop())