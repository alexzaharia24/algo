// Sort Stack: Write a program to sort a stack such that the smallest items are on the top. You can use
// an additional temporary stack, but you may not copy the elements into any other data structure
// (such as an array). The stack supports the following operations: push, pop, peek, and isEmpty.
// Hints: # 75, #32, #43

const { Stack } = require('../../../utils/data-structures/Stack');

// O(N^2) time and O(N) space
function sortStackFindMax(stack) {
    let tempStack = new Stack();
    let size = getSize(stack);
    let maxCount = 1;
    for (let searchSpace = size; searchSpace > 0; searchSpace -= maxCount) {
        let max = -Infinity;
        for (let nrOfElemes = 0; nrOfElemes < searchSpace; nrOfElemes++) {
            let topItem = stack.peek();
            if(topItem > max) {
                max = topItem;
                maxCount = 1;
            } else if(topItem === max) {
                maxCount++;
            }

            tempStack.push(stack.pop());
        }

        for(let i=0; i<maxCount; i++) {
            stack.push(max);
        }

        while(!tempStack.isEmpty()) {
            let item = tempStack.pop();
            if(item !== max) {
                stack.push(item);
            }
        }
    }
}

// O(N^2) time and O(N) space
function sortStackWithInsert(stack) {
    // Temp stack will be ordered in descending order
    let tempStack = new Stack();
    while(!stack.isEmpty()) {
        let item = stack.pop();
        while(!tempStack.isEmpty() && tempStack.peek() > item) {
            stack.push(tempStack.pop());
        }
        tempStack.push(item);
    }

    // Put the elements in ascending order
    while(!tempStack.isEmpty()) {
        stack.push(tempStack.pop());
    }
}

function getSize(stack) {
    let tempStack = new Stack();
    let size = 0;
    while (!stack.isEmpty()) {
        size++;
        tempStack.push(stack.pop());
    }

    while (!tempStack.isEmpty()) {
        stack.push(tempStack.pop());
    }

    return size;
}

let stack = new Stack();
stack.push(4);
stack.push(1);
stack.push(6);
stack.push(3);
stack.push(3);
stack.push(2);

console.log(stack.toString());

sortStackWithInsert(stack);

console.log(stack.toString());