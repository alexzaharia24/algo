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
        if(this.isFull()) {
            throw new StackFullException("Stack is full, cannot push");
        }

        this.top = new StackNode(item, this.top);
        this.size++;
    }

    pop() {
        if(this.isEmpty()) {
            throw new StackEmptyException("Stack is empty, cannot pop");
        }

        let item = this.top.value;
        this.top = this.top.next;
        this.size--;
        return item;
    }

    peek() {
        if(this.isEmpty()) {
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

class SetOfStacks {
    constructor(capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.topStack = null;
    }

    push(item) {
        if(this.isEmpty() || this.isLastStackFull()) {
            this.addNewStack();
        }

        this.topStack.value.push(item);
    }

    pop() {
        if(this.isEmpty()) {
            throw new StackEmptyException("Set of Stacks is empty, cannot pop");
        }

        let item = this.topStack.value.pop();
        if(this.isLastStackEmpty()) {
            // Pop the empty stack from the set
            this.topStack = this.topStack.next;
        }
        return item;
    }

    peek() {
        if(this.isEmpty()) {
            throw new StackEmptyException("Set of Stacks is empty, cannot peek");
        }

        return this.topStack.value.peek();
    }

    addNewStack() {
        let newStack = new Stack(this.capacity);
        this.topStack = new StackNode(newStack, this.topStack);
    }

    isLastStackFull() {
        if(this.isEmpty()) throw new NoStackException("No stack yet.");
        
        return this.topStack.value.isFull();
    }

    isLastStackEmpty() {
        if(this.isEmpty()) throw new NoStackException("No stack yet.");

        return this.topStack.value.isEmpty();
    }
    
    isEmpty() {
        return this.topStack === null;
    }
}

let setOfStacks = new SetOfStacks(3);
setOfStacks.push(1);
setOfStacks.push(2);
setOfStacks.push(3);
setOfStacks.push(4);
console.log(setOfStacks.peek());
console.log(setOfStacks.topStack)
setOfStacks.pop();
setOfStacks.pop();
setOfStacks.pop();
console.log(setOfStacks.peek());
setOfStacks.pop();
setOfStacks.pop();

