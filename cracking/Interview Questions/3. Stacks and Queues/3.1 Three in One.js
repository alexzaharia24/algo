// Three in One: Describe how you could use a single array to implement three stacks.
// Hints: #2, #72, #38, #58

class ThreeInOneStatic {
    constructor(capacity) {
        if (typeof capacity !== 'number') throw new Error("Capacity must be a number.");
        if (capacity <= 0) throw new Error("Capacity must be > 0.");
        this.capacity = capacity;

        // range for stack 1: [0. capacity/3)
        this.start1 = 0;
        this.end1 = parseInt(capacity / 3);
        // range for stack 2: [capacity/3. 2*capacity/3)
        this.start2 = this.end1;
        this.end2 = parseInt(2 * capacity / 3);
        // range for stack 3: [2*capacity/3. capacity)
        this.start3 = this.end2;
        this.end3 = capacity;

        this.idx1 = -1;
        this.idx2 = this.start2 - 1;
        this.idx3 = this.start3 - 1;

        this.array = new Array(capacity);
    }

    push(stack, item) {
        if (this.isFull(stack)) throw new Error(`Stack ${stack} is full, cannot push`);

        let { currentIdx } = this.getIndexesForStack(stack);
        this.array[++currentIdx] = item;
        this.updateIdxForStack(stack, currentIdx);

        return true;
    }

    pop(stack) {
        if (this.isEmpty(stack)) throw new Error(`Stack ${stack} is empty, cannot pop`);

        let { currentIdx } = this.getIndexesForStack(stack);
        let item = this.array[currentIdx];
        delete this.array[currentIdx];
        currentIdx--;
        this.updateIdxForStack(stack, currentIdx);

        return item;
    }

    peek(stack) {
        if (this.isEmpty(stack)) throw new Error(`Stack ${stack} is empty, cannot peek`);

        let { currentIdx } = this.getIndexesForStack(stack);
        return this.array[currentIdx];
    }

    isEmpty(stack) {
        let { currentIdx, startIdx } = this.getIndexesForStack(stack);
        return currentIdx < startIdx;
    }

    isFull(stack) {
        let { currentIdx, endIdx } = this.getIndexesForStack(stack);
        return currentIdx >= endIdx - 1;
    }

    getIndexesForStack(stack) {
        let currentIdx = -1;
        let startIdx = -1;
        let endIdx = -1;
        switch (stack) {
            case 1:
                currentIdx = this.idx1;
                startIdx = this.start1;
                endIdx = this.end1;
                break;
            case 2:
                currentIdx = this.idx2;
                startIdx = this.start2;
                endIdx = this.end2;
                break;
            case 3:
                currentIdx = this.idx3;
                startIdx = this.start3;
                endIdx = this.end3;
                break;
            default:
                throw new Error("Stack should be 1, 2 or 3");
        }

        return { currentIdx, startIdx, endIdx };
    }

    updateIdxForStack(stack, newIdx) {
        switch (stack) {
            case 1:
                this.idx1 = newIdx;
                break;
            case 2:
                this.idx2 = newIdx;
                break;
            case 3:
                this.idx3 = newIdx;
                break;
            default:
                throw new Error("Stack should be 1, 2 or 3");
        }

        return true;
    }
}

// let stack = new ThreeInOneStatic(10);
// stack.push(1, 1);
// console.log(stack.array);
// stack.push(1, 2);
// stack.push(1, 3);
// console.log(stack.array);
// stack.push(3, 100);
// stack.push(2,10);
// console.log(stack.array);
// stack.pop(1);
// console.log(stack.array);
// stack.pop(1);
// stack.pop(1);
// console.log(stack.array);

let stack = new ThreeInOneStatic(3);
stack.push(1, 1);
console.log(stack.array);
stack.push(3, 100);
stack.push(2,10);
console.log(stack.peek(1));
console.log(stack.peek(2));
console.log(stack.peek(3));
stack.pop(1);
console.log(stack.array);
stack.pop(2);
stack.pop(3);
console.log(stack.array);







