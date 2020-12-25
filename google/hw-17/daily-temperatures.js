// https://leetcode.com/problems/daily-temperatures/
// Solve again to use the concept for `largest-rectangle-in-histogram.js`

function dailyTemperatures(T) {
    let stack = [];
    let result = [];
    for (let i = 0; i < T.length; i++) {
        let elem = stack[stack.length - 1];
        while (stack.length > 0 && elem.value < T[i]) {
            result[elem.idx] = i - elem.idx;
            stack.pop();
            elem = stack[stack.length - 1];
        }
        stack.push({ value: T[i], idx: i });
    }

    while (stack.length > 0) {
        elem = stack.pop();   
        result[elem.idx] = 0;
    }

    return result;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
