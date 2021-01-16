// https://leetcode.com/problems/largest-rectangle-in-histogram/

function largestRectangleArea(heights) {
    return largestRectangleAreaWithStack(heights);
}

function largestRectangleAreaWithStack(heights) {
    // Time: O(N)
    // Space: O(N)
    let maxArea = 0;
    let firstSmallestToLeft = computeFirstSmallest(heights, "left");
    let firstSmallestToRight = computeFirstSmallest(heights, "right");
    console.log(firstSmallestToLeft);
    console.log(firstSmallestToRight);

    for (let i = 0; i < heights.length; i++) {
        let area = heights[i] * (firstSmallestToRight[i] - firstSmallestToLeft[i] - 1)
        maxArea = Math.max(maxArea, area);
    }


    return maxArea;
}

function computeFirstSmallest(heights, direction) {
    let result = new Array(heights.length);
    let stack = [];
    if (direction === "right") {
        heights = [...heights].reverse();
    }

    for (let i = heights.length - 1; i >= 0; i--) {
        let elem = stack[stack.length - 1];
        while (stack.length > 0 && elem.value > heights[i]) {
            result[elem.idx] = i;
            stack.pop();
            elem = stack[stack.length - 1];
        }
        stack.push({ value: heights[i], idx: i });
    }

    while (stack.length > 0) {
        elem = stack.pop();
        result[elem.idx] = direction === "right" ? heights.length : -1;
    }

    if(direction === "right") {
        result.reverse();
    } 
    return result;
}

function computeFirstSmallestToLeft(heights) {
    let result = new Array(heights.length);
    let stack = [];
    for (let i = heights.length - 1; i >= 0; i--) {
        let elem = stack[stack.length - 1];
        while (stack.length > 0 && elem.value > heights[i]) {
            result[elem.idx] = i;
            stack.pop();
            elem = stack[stack.length - 1];
        }
        stack.push({ value: heights[i], idx: i });
    }

    while (stack.length > 0) {
        elem = stack.pop();
        result[elem.idx] = -1;
    }

    return result;
}

function computeFirstSmallestToRight(heights) {
    let result = new Array(heights.length);
    let stack = [];
    for (let i = 0; i < heights.length; i++) {
        let elem = stack[stack.length - 1];
        while (stack.length > 0 && elem.value > heights[i]) {
            result[elem.idx] = i;
            stack.pop();
            elem = stack[stack.length - 1];
        }
        stack.push({ value: heights[i], idx: i });
    }

    while (stack.length > 0) {
        elem = stack.pop();
        result[elem.idx] = heights.length;
    }

    return result;
}


function largestRectangleAreaNonOptimal(heights) {
    // Time: O(N^2)
    // Space: O(1)
    let maxArea = 0;
    for (let i = 0; i < heights.length; i++) {
        let area = heights[i];
        for (let j = i - 1; j >= 0; j--) {
            if (heights[j] < heights[i]) break;
            area += heights[i];
        }
        for (let j = i + 1; j < heights.length; j++) {
            if (heights[j] < heights[i]) break;
            area += heights[i];
        }
        maxArea = Math.max(maxArea, area);
    }
    return maxArea;
}



// console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]));
console.log(largestRectangleArea([2, 2, 5, 6, 3]));

// console.log(computeFirstSmallestToLeft([2, 2, 5, 6, 3]));
