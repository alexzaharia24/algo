export class Heap {
    constructor(capacity=10) {
        this.capacity = capacity;
        this.items = new Array(capacity);
        this.size = 0;
    }

    getLeftChildIndex(index) { return 2 * index + 1; }
    getRightChildIndex(index) { return 2 * index + 2; }
    getParentIndex(index) { return parseInt((index - 1) / 2); }

    hasLeftChild(index) { return this.getLeftChildIndex(index) < this.size; }
    hasRightChild(index) { return this.getRightChildIndex(index) < this.size; }
    hasParent(index) { return index > 0; }

    getLeftChild(index) {
        if (!this.hasLeftChild(index)) throw new Error(`No left child for index ${index}`);
        return this.items[this.getLeftChildIndex(index)];
    }

    getRightChild(index) {
        if (!this.hasRightChild(index)) throw new Error(`No left child for index ${index}`);
        return this.items[this.getRightChildIndex(index)];
    }

    getParent(index) {
        if (!this.hasParent(index)) throw new Error(`No parent for index ${index}`);
        return this.items[this.getParentIndex(index)];
    }

    ensureCapacity() {
        if (this.size === this.capacity) {
            this.items = [...this.items, ...(new Array(this.capacity))];
            this.capacity *= 2;
        }
    }

    swap(index1, index2) {
        if (index1 < 0 || index1 >= this.size) throw new Error(`Index ${index1} out of bounds`);
        if (index2 < 0 || index2 >= this.size) throw new Error(`Index ${index2} out of bounds`);
        let aux = this.items[index1];
        this.items[index1] = this.items[index2];
        this.items[index2] = aux;
    }

    peek() {
        // returns the min value
        if (this.size === 0) {
            throw new Error('Empty heap');
        }
        return this.items[0];
    }

    pop() {
        // removes and returns the min value from the heap
        if (this.size === 0) {
            throw new Error('Empty heap');
        }
        let item = this.items[0];
        // Swap with last element
        this.items[0] = this.items[this.size - 1];
        this.size--;

        if (this.size > 0) {
            this.heapifyDown();
        }

        return item;
    }

    insert(value) {
        this.ensureCapacity();
        this.items[this.size] = value;
        this.size++;
        this.heapifyUp();
    }

    size() {
        return this.size;
    }
}

export class MinHeap extends Heap {
    heapifyUp() {
        if (this.size === 0) {
            throw new Error('Empty heap');
        }
        let index = this.size - 1;
        let parentIndex = this.getParentIndex(index);
        while (this.hasParent(index) && this.items[index] < this.items[parentIndex]) {
            console.log("IDX: ", index)
            this.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = this.getParentIndex(index);
        }
    }

    heapifyDown() {
        if (this.size === 0) {
            throw new Error('Empty heap');
        }
        let index = 0;
        while (this.hasLeftChild(index)) {
            let indexOfMinValueChild = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.getRightChild(index) < this.getLeftChild(index)) {
                indexOfMinValueChild = this.getRightChildIndex(index);
            }


            if (this.items[index] > this.items[indexOfMinValueChild]) {
                this.swap(index, indexOfMinValueChild);
            } else {
                break;
            }

            index = indexOfMinValueChild;
        }
    }
}

export class MaxHeap extends Heap {
    heapifyUp() {
        if(this.size === 0) {
            throw new Error('Empty heap');
        }
        let index = this.size - 1;
        let parentIndex = this.getParentIndex(index);
        while (this.hasParent(index) && this.items[index] > this.getParent(index)) {
            this.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = this.getParentIndex(index);
        }
    }

    heapifyDown() {
        if(this.size === 0) {
            throw new Error('Empty heap');
        }
        let index = 0;
        while(this.hasLeftChild(index)) {
            let indexOfMaxValueChild = this.getLeftChildIndex(index);
            if(this.hasRightChild(index) && this.hasRightChild(index) > this.getLeftChild(index)) {
                indexOfMaxValueChild = this.getRightChildIndex(index);
            }

            if(this.items[index] < this.items[indexOfMaxValueChild]) {
                this.swap(index, indexOfMaxValueChild);
            } else {
                break;
            }

            index = indexOfMaxValueChild;
        }
    }

}

// let minHeap = new MinHeap(3);
// minHeap.insert(1);
// console.log(minHeap);
// console.log(minHeap.peek())
// console.log(minHeap.pop())
// minHeap.insert(2);
// minHeap.insert(3);
// minHeap.insert(4);
// console.log(minHeap)
// minHeap.insert(1);
// console.log(minHeap)


// let maxHeap = new MaxHeap(3);
// maxHeap.insert(1);
// console.log(maxHeap);
// console.log(maxHeap.peek())
// console.log(maxHeap.pop())
// maxHeap.insert(2);
// maxHeap.insert(3);
// maxHeap.insert(4);
// console.log(maxHeap)
// maxHeap.insert(1);
// console.log(maxHeap)