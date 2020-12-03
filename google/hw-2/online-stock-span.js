class StockSpanner {
    constructor() {
        this.prices = [];
        this.stack = [];
        this.idx = 0;
    }

    next(price) {
        nextWithMonotonicStacFromBeginning(price);
    }

    nextWithMonotonicStacFromBeginning(price) {
        let span = 1;
        if (this.prices.length > 0) {
            while (this.stack.length > 0 && this.prices[this.stack[this.stack.length - 1]] <= price) {
                this.stack.pop();
            }
            if (this.stack.length > 0) {
                span = this.idx - this.stack[this.stack.length - 1];
            } else {
                span = this.idx + 1;
            }
        }

        this.prices.push(price);
        this.stack.push(this.idx++)
        return span;
    }

}


function solveWithMonotonicStackFromEnd(prices) {
    // O(n) amortized time
    // O(n) space
    let stack = [];
    let result = [];

    for (let i = prices.length - 1; i >= 0; i--) {
        while (stack.length > 0 && prices[stack[stack.length - 1]] < prices[i]) {
            result[stack[stack.length - 1]] = stack[stack.length - 1] - i;
            stack.pop();
        }
        stack.push(i);
    }

    while (stack.length > 0) {
        result[stack[stack.length - 1]] = stack[stack.length - 1] + 1;
        stack.pop();
    }


    return result;
}

function solveWithJumps(prices) {
    // O(n) amortized time
    // O(n) space
    let result = [];

    for (let i = 0; i < prices.length; i++) {
        let span = i + 1;
        for (let j = i - 1; j >= 0; j -= result[j]) {
            if (prices[j] > prices[i]) {
                span = i - j;
            }
        }
        result[i] = span;
    }

    return result;
}

let S = new StockSpanner();

// console.log(S.next(100))
// console.log(S.next(80)) 
// console.log(S.next(60)) 
// console.log(S.next(70)) 
// console.log(S.next(60)) 
// console.log(S.next(75)) 
// console.log(S.next(85)) 

// console.log(S.next(1))
// console.log(S.next(1))
// console.log(S.next(1))
// console.log(S.next(1))
// console.log(S.next(1))

console.log(solveWithMonotonicStackFromEnd([100, 80, 60, 70, 60, 75, 85]))
console.log(solveWithJumps([100, 80, 60, 70, 60, 75, 85]))
console.log(solveWithMonotonicStackFromEnd([1, 1, 1, 1, 1]))
console.log(solveWithJumps([1, 1, 1, 1, 1]))