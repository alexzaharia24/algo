// https://leetcode.com/problems/remove-k-digits/

function reverseStack(stack) {
    // O(n) time
    // O(n) space
    let result = [];
    while(stack.length > 0) {
        result.push(stack.pop());
    }
    return result;
}

function removeLeadingZeros(stack) {
    // O(n) time
    // O(n) space
    stack = reverseStack(stack);

    while(stack.length > 0 && stack[stack.length - 1] === '0') {
        stack.pop();
    }

    return reverseStack(stack);
}

function removeKdigits(num, k) {
    // O(n) amortized time
    // O(n) space
    let stack = [];

    for (let i = 0; i < num.length; i++) {
        while (stack.length > 0 && stack[stack.length - 1] > num[i] && k > 0) {
            stack.pop();
            k--;
        }
        stack.push(num[i]);
    }

    while(k > 0) {
        stack.pop();
        k--;
    }

    stack = removeLeadingZeros(stack);

    if(stack.length === 0) stack.push('0');

    return stack.join("")
}

/**
 * 1432219, k =4
 * 9
 * [1, 2, 1 9] k = 1
 *
 * 1111 k = 3
 * 1
 * [1,1,1,1] k =3
 *
 * 1234 k = 1
 *
 * [1, 2, 3, 4] k = 1
 *
 * [1,2,1,9,1] k = 1
 * 
 * [1, 1, 9, 1] k = 0 
 * 
 * 10200, k = 1
 * 
 * [0, 2, 0, 0 ] k = 0
 */

 console.log(removeKdigits("1432219", 3));
 console.log(removeKdigits("10200", 1));
 console.log(removeKdigits("10", 2));