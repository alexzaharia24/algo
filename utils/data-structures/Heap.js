const { Dequeue } = require('./Queue');

class HeapWithTree {
    constructor(root) {
        this.root = null;
        this.size = 0;
        this.currentFree = null;
        this.freeNodes = new Dequeue();
        if (root !== null) this.addRoot(root);
    }

    addRoot(root) {
        if (root === null) throw new Error("Given root is null. Cannot add");
        this.currentFree = root;
        this.size = 1;
        this.root = root;
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("Heap empty. Cannot peek");
        }

        return this.root.value;
    }

    isEmpty() {
        return this.size === 0;
    }
}

class HeapNode {
    constructor(value, parent, left, right) {
        this.value = value ?? null;
        this.parent = parent ?? null;
        this.left = left ?? null;
        this.right = right ?? null;
    }

    toString() {
        return this.value;
    }
}

// Not working
class MinHeap extends HeapWithTree {
    constructor(root) {
        super(root);
    }

    push(item) {
        // Push on the last level to the rightmost free node.
        // Then swap with parent until you find an appropiate place
        if (!this.isCurrentFree()) {
            this.currentFree = this.freeNodes.popBack();
        }

        let newNode = new HeapNode(item, this.currentFree);
        if (this.currentFree.left === null) {
            // Add to left
            this.currentFree.left = newNode;
        } else {
            // Add to right
            this.currentFree.right = newNode;
        }

        this.size++;
        this.freeNodes.pushFront(newNode);
        this.bubbleUp(newNode);
    }

    isCurrentFree() {
        return this.currentFree !== null && this.currentFree.right === null;
    }

    bubbleUp(node) {
        if (node.parent === null) return;
        // Recurse until you find a parent smaller than node
        if (node.value < node.parent.value) {
            [node.value, node.parent.value] = [node.parent.value, node.value];
            this.bubbleUp(node.parent);
        }
    }

    pop() {
        // Swap the root with the rightmost element on the last level
        // Then remove the rightmost element on the last level
        // Then bubble down the new root until you find an appropiate place

        if (this.isEmpty()) throw new Error("Heap is empty. Cannot pop");
        // Special case: only one element in the heap
        if (this.size === 1) {
            this.root = null;
            this.size = 0;
            return;
        }

        let item = this.peek();
        let lastNode;
        // this.currentFree holds the last element
        console.log("Current free: ", this.currentFree)
        console.log('Free nodes 1: ', this.freeNodes.toString())
        if (this.currentFree.right !== null) {
            lastNode = this.currentFree.right;
        } else if (this.currentFree.left !== null) {
            lastNode = this.currentFree.left;
        } else {
            this.freeNodes.pushFront(this.currentFree);
            lastNode = this.freeNodes.popBack();
            this.currentFree = lastNode.parent;
        }
        console.log('lastNode: ', lastNode);
        console.log("Current free: ", this.currentFree)
        console.log('Free nodes 2: ', this.freeNodes.toString())

        // Swap
        this.swapNodes(this.root, lastNode);
        // Remove last element
        if (this.currentFree.right !== null) {
            this.currentFree.right = null;
        } else {
            this.currentFree.left = null;
        }
        console.log('Free nodes 3: ', this.freeNodes.toString())

        console.log("After remove")
        this.printInorder();

        this.size--;
        this.bubbleDown(this.root);
        return item;
    }

    swapNodes(node1, node2) {
        if (node1.parent !== null) {
            if (node1.parent.right === node1) {
                node1.parent.right = node2;
            } else {
                node1.parent.left = node2;
            }
        }
        if (node2.parent !== null) {
            if (node2.parent.right === node2) {
                node2.parent.right = node1;
            } else {
                node2.parent.left = node1;
            }
        }
        let parent1 = node1.parent;
        node1.parent = node2.parent;
        node2.parent = parent1;

        let left1 = node1.left, right1 = node1.right;
        node1.left = node2.left;
        node1.right = node2.right;
        node2.left = left1;
        node2.right = right1;
    }

    bubbleDown(node) {
        if (node === null || (node.left === null && node.right === null)) return;
        let leftValue = node.left !== null ? node.left.value : Infinity;
        let rightValue = node.right !== null ? node.right.value : Infinity;
        let min = Math.min(leftValue, rightValue, node.value);

        if (min === node.value) {
            return;
        } else if (min === leftValue) {
            // Swap with left
            // [node.value, node.left.value] = [node.left.value, node.value];
            this.swapNodes(node, node.left);
            this.bubbleDown(node.left);
        } else {
            // Swap with right
            // [node.value, node.right.value] = [node.right.value, node.value];
            this.swapNodes(node, node.right);
            this.bubbleDown(node.right);
        }
    }

    printInorder() {
        this.inorder(this.root);
    }

    inorder(node) {
        if (node === null) return;
        this.inorder(node.left);
        console.log(node.toString());
        this.inorder(node.right);
    }

}

//// Heap with array
class HeapWithArray {
    constructor() {
        // Since the binary heap is a complete binary tree, we can represent it using an array. The children of a parent node with index p will be 2*p+1 and 2*p+2
        this.items = [];
    }

    hasParent(idx) {
        this.verifyIndexOutOfBounds(idx);
        return idx > 0;
    }

    hasLeftChild(idx) {
        this.verifyIndexOutOfBounds(idx);

        return (2 * idx + 1) < this.size();
    }

    hasRightChild(idx) {
        this.verifyIndexOutOfBounds(idx);

        return (2 * idx + 2) < this.size();
    }

    getParentIdx(idx) {
        this.verifyIndexOutOfBounds(idx);
        if (!this.hasParent(idx)) return -1;

        return parseInt((idx - 1) / 2);
    }

    getLeftChildIdx(idx) {
        this.verifyIndexOutOfBounds(idx);
        if (!this.hasLeftChild(idx)) return -1;

        return 2 * idx + 1;
    }

    getRightChildIdx(idx) {
        this.verifyIndexOutOfBounds(idx);
        if (!this.hasRightChild(idx)) return -1;

        return 2 * idx + 2;
    }

    verifyIndexOutOfBounds(idx) {
        if (idx < 0 || idx >= this.size()) throw new Error(`Index ${idx} out of bounds.`);
    }

    push(item) {
        this.items.push(item);
        // Bubble up the added element
        this.bubbleUp(this.size() - 1);
    }

    pop() {
        // Swap root with last element
        [this.items[0], this.items[this.size() - 1]] = [this.items[this.size() - 1], this.items[0]];
        // Remove last element
        this.items.pop();
        // Bubble down the new root
        this.bubbleDown(0);
    }

    peek() {
        if (this.isEmpty()) throw new Error("Heap is empty. Cannot peek");
        return this.items[this.size() - 1];
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.items.length;
    }

    bubbleUp(idx) {
        throw new Error("This is a function of the abstract class Heap. Cannot use");
    }

    bubbleDown(idx) {
        throw new Error("This is a function of the abstract class Heap. Cannot use");
    }

    toString() {
        return this.items.toString();
    }
}

class MinHeapWithArray extends HeapWithArray {
    constructor() {
        super();
    }

    bubbleUp(idx) {
        if (!this.hasParent(idx)) return;
        let parentIdx = this.getParentIdx(idx);
        if (this.items[idx] < this.items[parentIdx]) {
            // Swap child with parent
            [this.items[idx], this.items[parentIdx]] = [this.items[parentIdx], this.items[idx]];
            this.bubbleUp(parentIdx);
        }
    }

    bubbleDown(idx) {
        let minChildIdx = -1;
        if(this.hasLeftChild(idx)) {
            let leftIdx = this.getLeftChildIdx(idx);
            minChildIdx = leftIdx;
            if(this.hasRightChild(idx)) {
                let rightIdx = this.getRightChildIdx(idx);
                minChildIdx = this.items[leftIdx] < this.items[rightIdx] ? leftIdx : rightIdx; 
            }
        }

        if(minChildIdx !== -1) {
            if(this.items[idx] > this.items[minChildIdx]) {
                // Swap with min child
                [this.items[idx], this.items[minChildIdx]] = [this.items[minChildIdx], this.items[idx]];
                this.bubbleDown(minChildIdx);
            }
        }
    }
}

class MaxHeapWithArray extends HeapWithArray {
    constructor() {
        super();
    }

    bubbleUp(idx) {
        if (!this.hasParent(idx)) return;
        let parentIdx = this.getParentIdx(idx);
        if (this.items[idx] > this.items[parentIdx]) {
            // Swap child with parent
            [this.items[idx], this.items[parentIdx]] = [this.items[parentIdx], this.items[idx]];
            this.bubbleUp(parentIdx);
        }
    }

    bubbleDown(idx) {
        let maxChildIdx = -1;
        if(this.hasLeftChild(idx)) {
            let leftIdx = this.getLeftChildIdx(idx);
            maxChildIdx = leftIdx;
            if(this.hasRightChild(idx)) {
                let rightIdx = this.getRightChildIdx(idx);
                maxChildIdx = this.items[leftIdx] > this.items[rightIdx] ? leftIdx : rightIdx; 
            }
        }

        if(maxChildIdx !== -1) {
            if(this.items[idx] < this.items[maxChildIdx]) {
                // Swap with max child
                [this.items[idx], this.items[maxChildIdx]] = [this.items[maxChildIdx], this.items[idx]];
                this.bubbleDown(maxChildIdx);
            }
        }
    }
}

//// Example MinHeapWithTree 

// let minHeapRoot = new HeapNode(4);
// let minHeap = new MinHeap(minHeapRoot);
// minHeap.push(50);
// minHeap.push(7);
// minHeap.push(55);
// minHeap.push(90);
// minHeap.push(87);
// // minHeap.push(2);
// // minHeap.push(10);

// // console.log(minHeap.root);
// // console.log(minHeap.freeNodes.toString());
// // console.log(minHeap.currentFree);
// // minHeap.printInorder();

// console.log('pop: ', minHeap.pop());
// minHeap.printInorder();
// console.log();
// console.log('pop: ', minHeap.pop());
// minHeap.printInorder();

//// Example MinHeapWithArray & MaxHeapWithArray
// let minHeapArray = new MinHeapWithArray();
let minHeapArray = new MaxHeapWithArray();
minHeapArray.push(10);
minHeapArray.push(7);
minHeapArray.push(6);
minHeapArray.push(5);
minHeapArray.push(3);
minHeapArray.pop();
minHeapArray.pop();
minHeapArray.pop();
console.log(minHeapArray.toString());

module.exports = {
    MinHeap: MinHeapWithArray,
    MaxHeap: MaxHeapWithArray
}