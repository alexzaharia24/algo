function solve(T) {
    return solveWithMonotonicStackStartFromBeginning(T);
}

function solveTwoLoops(T) {
    let result = [];

    for (let i = 0; i < T.length - 1; i++) {
        result.push(0);
        let j = i + 1;
        while (j < T.length) {
            if (T[i] < T[j]) {
                result[i] = j - i;
                break;
            }
            j++;
        }
    }

    result.push(0);

    return result;
}

/**
 *  O(n) amortized time
    for the case 5, 1, 2, 3, 4
        for x = 4 => second for loop called 0 times
        for x = 3 => second for loop called 1 time
        for x = 2 => s/**ond for loop called 1 time
        for x = 1 => sond for loop called 1 time
        for x = 0 => second for loop called 4 times
        total : 7 times = ~ 2 * O(n) = O(n)
    for the case 1, 2, 3, 4, 5
        for x = 4 => second for loop called 0 times
        for x = 3 => second for loop called 1 time
        for x = 2 => s/**ond for loop called 1 time
        for x = 1 => sond for loop called 1 time
        for x = 0 => second for loop called 1 time
        total : 4 times = O(n)
    for the case 5, 4, 3, 2, 1
        for x = 4 => second for loop called 0 times
        for x = 3 => second for loop called 1 time
        for x = 2 => s/**ond for loop called 1 time
        for x = 1 => sond for loop called 1 time
        for x = 0 => second for loop called 1 time
        total : 4 times = O(n)

    O(n) space  (O(1) if not taking the result collection into consideration)
 * @param {*} T 
 */
function solveSkipTestsPolinomialAmortized(T) {
    let result = [];

    for (let i = T.length - 1; i >= 0; i--) {
        result[i] = 0;
        for (let j = i + 1; j < T.length; j += result[j]) {
            if (T[i] < T[j]) {
                result[i] = j - i;
                break;
            }
            if (result[j] === 0) break;
        }
    }

    return result;
}

function solveWithMonotonicStackStartFromEnd(T) {
    // O(n) amortized time
    // O(n) space
    let stack = [];
    let result = [];

    for (let i = T.length - 1; i >= 0; i--) {
        result[i] = 0;
        while (stack.length > 0 && T[stack[stack.length - 1]] <= T[i]) {
            stack.pop()
        }
        if (stack.length > 0) {
            result[i] = stack[stack.length - 1] - i;
        }
        stack.push(i);
    }
    return result;
}


/**
 * Explaination
 * 
 * 
 * 
 * @param {*} T 
 */
function solveWithMonotonicStackStartFromBeginning(T) {
    // O(n) amortized time
    // O(n) space
    let result = [];
    let stack = [];

    for (let i = 0; i < T.length; i++) {
        result[i] = 0;
        while (stack.length > 0 && T[stack[stack.length - 1]] < T[i]) {
            let j = stack[stack.length - 1];
            result[j] = i - j;
            stack.pop();
        }

        stack.push(i);
    }


    return result;
}

console.log(solve([73, 74, 75, 71, 69, 72, 76, 73]))
console.log(solve([89,62,70,58,47,47,46,76,100,70]))

