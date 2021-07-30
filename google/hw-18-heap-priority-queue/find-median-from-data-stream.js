// https://leetcode.com/problems/find-median-from-data-stream/

import { MinHeap, MaxHeap } from './Heap.js';

class MedianFinderWithArray {
    constructor() {
        this.numbers = [];
    }

    /**
     * Adds a number from the stream to the structure
     * @param {number} num the number from the stream
     */
    addNum(num) {
        this.numbers.push(num);
    }

    /**
     * Returns the median of all the numbers from the structure
     */
    findMedian() {
        if (this.size() === 0) {
            throw new Error('Empty structure')
        }

        this.numbers.sort();

        if (this.size() % 2 === 1) {
            return this.numbers[parseInt(this.size() / 2)]
        } else {
            return (this.numbers[this.size() / 2 - 1] + this.numbers[this.size() / 2]) / 2;
        }
    }

    size() {
        return this.numbers.length;
    }
}

class MedianFinderWithHeap {
    constructor() {
        this.min = new MinHeap();
        this.max = new MaxHeap();
    }

    /**
     * Adds a number from the stream to the structure
     * @param {number} num the number from the stream
     */
    addNum(num) {
        // TIME: O(logN)
        if (this.max.size === 0) {
            this.max.insert(num);
        } else if (this.min.size === 0) {
            this.min.insert(num);
        } else {
            if(this.max.size === this.min.size) {
                if(num > this.max.peek()) {
                    // Add to min
                    this.min.insert(num);
                } else {
                    this.max.insert(num);
                }
            } else if(this.max.size > this.min.size) {
                if(num > this.max.peek()) {
                    // Need to add to min
                    this.min.insert(num);
                } else {
                    // Need to move one from max to min and then add 'num' to max
                    this.min.insert(this.max.pop());
                    this.max.insert(num);
                }
            } else {
                if(num > this.max.peek()) {
                    // Need to move one from min to max and then add 'num' to min
                    this.max.insert(this.min.pop());
                    this.min.insert(num);
                } else {
                    this.max.insert(num);
                }
            }
        }
        console.log("Inserted: ", num)
        console.log("MIN: ", this.min, "\nMAX: ", this.max, "\n")
    }

    /**
     * Returns the median of all the numbers from the structure
     */
    findMedian() {
        // TIME: O(1)
        let count = this.min.size + this.max.size;
        if(count === 0) {
            throw new Error('Empty structure')
        }
        
        if (count % 2 === 1) {
            if(this.min.size > this.max.size) {
                // console.log("MIN PEEK: ", this.min.peek());
                return this.min.peek();
            } else {
                // console.log("MAX PEEK: ", this.min.peek());
                return this.max.peek();
            }
        } else {
            return (this.min.peek() + this.max.peek()) / 2;
        }
    }
}

// let medianFinder = new MedianFinderWithArray();
// medianFinder.addNum(1);
// medianFinder.addNum(2);
// medianFinder.addNum(3);
// console.log(medianFinder);
// console.log(medianFinder.findMedian());
// medianFinder.addNum(3);
// console.log(medianFinder);
// console.log(medianFinder.findMedian());

console.log("#### Heaps")

// let medianFinderH = new MedianFinderWithHeap();
// medianFinderH.addNum(1);
// medianFinderH.addNum(2);
// medianFinderH.addNum(3);
// console.log(medianFinderH);
// console.log(medianFinderH.findMedian());
// medianFinderH.addNum(3);
// console.log(medianFinderH);
// console.log(medianFinderH.findMedian());
// medianFinderH.addNum(4);
// console.log(medianFinderH.findMedian());
// medianFinderH.addNum(5);
// console.log(medianFinderH.findMedian());
// medianFinderH.addNum(1);
// console.log(medianFinderH.findMedian());

let medianFinderH = new MedianFinderWithHeap();
medianFinderH.addNum(-1);
console.log(medianFinderH.findMedian());
medianFinderH.addNum(-2);
console.log(medianFinderH.findMedian());
medianFinderH.addNum(-3);
console.log(medianFinderH.findMedian());
medianFinderH.addNum(-4);
console.log(medianFinderH.findMedian());
medianFinderH.addNum(-5);
console.log(medianFinderH.findMedian());

