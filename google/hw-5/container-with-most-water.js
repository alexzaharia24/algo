// https://leetcode.com/problems/container-with-most-water/

function maxArea(heights) {
    return solveWithBinarySearchReversed(heights);
}

function binarySearchLeft(list, end, target) {
    if (end < 0) return null;
    // Search from [0, end] in list. Returns index

    let left = 0, right = end;
    let result = null;
    while(left <= right) {
        let middle = parseInt((left + right) / 2);
        if(list[middle] >= target) {
            result = middle;
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }

    return result;
}

function binarySearchRight(list, start, target) {
    // Search from [start, list.length -1] in list. Returns index
    if (start >= list.length) return null;
    let left = start, right = list.length - 1;
    let result = null;
    while(left <= right) {
        let middle = parseInt((left + right) / 2);
        if(list[middle] >= target) {
            result = middle;
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return result;
}

function computeArea(list, leftIdx, rightIdx) {
    return Math.min(list[leftIdx], list[rightIdx]) * (rightIdx - leftIdx);
}

function solveWithBinarySearch(heights) {
    // Precompute partial maximums to left and right
    // Then fix one element and binary search for the other in the partial maximum lists

    let max = 0;
    let prefixPartialMaximums = new Array(heights.length).fill(0); // Partials maximums where A[i] = max from heights[0] to heights[i]
    let suffixPartialMaximums = new Array(heights.length).fill(0); // Partials maximums where A[i] = max from heights[n-1] to heights[i]
    
    prefixPartialMaximums[0] = heights[0];
    for (let i = 1; i < heights.length; i++) {
        prefixPartialMaximums[i] = Math.max(heights[i], prefixPartialMaximums[i - 1]);
    }

    let n = heights.length;
    suffixPartialMaximums[n - 1] = heights[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        suffixPartialMaximums[i] = Math.max(heights[i], suffixPartialMaximums[i + 1]);
    }

    // Search heights to compute max area
    for (let i = 0; i < heights.length; i++) {
        // Fix heights[i] as the smallest of the two heights.
        let leftCandidateIndex = binarySearchLeft(prefixPartialMaximums, i - 1, heights[i]);
        let rightCandidateIndex = binarySearchRight(suffixPartialMaximums, i + 1, heights[i]);
        let candidateArea = -1;

        let leftCandidateArea = computeArea(heights, leftCandidateIndex, i);
        let rightCandidateArea = computeArea(heights, i, rightCandidateIndex);

        candidateArea = Math.max(leftCandidateArea, rightCandidateArea);

        if(leftCandidateIndex !== null && rightCandidateIndex !== null) {
            let leftCandidateArea = computeArea(heights, leftCandidateIndex, i);
            let rightCandidateArea = computeArea(heights, i, rightCandidateIndex);

            candidateArea = Math.max(leftCandidateArea, rightCandidateArea);
        } else if(leftCandidateIndex !== null) {
            candidateArea = computeArea(heights, leftCandidateIndex, i);
        } else if(rightCandidateIndex !== null) {
            candidateArea = computeArea(heights, i, rightCandidateIndex);
        }

        max = Math.max(candidateArea, max);
    }

    return max;
}

// NOT WORKING. NEEDS refinment. Crapa la: [1,2], expected: 1, got: 0
function solveWithBinarySearchReversed(heights) {
    // Precompute partial maximums to left and right
    // Then fix one element and binary search for the other in the partial maximum lists
    let max = 0;
    let prefixPartialMaximums = new Array(heights.length).fill(0); // Partials maximums where A[i] = max from heights[0] to heights[i]
    let suffixPartialMaximumsReversed = new Array(heights.length).fill(0); // Partials maximums where A[i] = max from heights[i] to heights[n-1], n-length
    let reversed = Array.from(heights).reverse();

    prefixPartialMaximums[0] = heights[0];
    suffixPartialMaximumsReversed[0] = reversed[0];
    for (let i = 1; i < heights.length; i++) {
        prefixPartialMaximums[i] = Math.max(heights[i], prefixPartialMaximums[i - 1]);
        suffixPartialMaximumsReversed[i] = Math.max(reversed[i], suffixPartialMaximumsReversed[i - 1]);
    }

    // Search heights to compute max area
    for (let i = 0; i < heights.length; i++) {
        // Fix heights[i] as the smallest of the two heights.
        let leftCandidateIndex = binarySearchLeft(prefixPartialMaximums, i - 1, heights[i]);
        let rightCandidateIndex = binarySearchLeft(suffixPartialMaximumsReversed, i + 1, reversed[i]);
        let candidateArea = -1;

        let leftCandidateArea = computeArea(heights, leftCandidateIndex, i);
        let rightCandidateArea = computeArea(reversed, i, rightCandidateIndex);

        candidateArea = Math.max(leftCandidateArea, rightCandidateArea);

        if(leftCandidateIndex !== null && rightCandidateIndex !== null) {
            let leftCandidateArea = computeArea(heights, leftCandidateIndex, i);
            let rightCandidateArea = computeArea(reversed, i, rightCandidateIndex);

            candidateArea = Math.max(leftCandidateArea, rightCandidateArea);
        } else if(leftCandidateIndex !== null) {
            candidateArea = computeArea(heights, leftCandidateIndex, i);
        } else if(rightCandidateIndex !== null) {
            candidateArea = computeArea(reversed, i, rightCandidateIndex);
        }

        max = Math.max(candidateArea, max);
    }

    return max;
}

function solveTwoLoops(heights) {
    let max = 0;
    for (let i = 0; i < heights.length - 1; i++) {
        for (let j = i + 1; j < heights.length; j++) {
            max = Math.max(max, (j - i) * Math.min(heights[i], heights[j]));
        }
    }

    return max;
}

console.log(maxArea([1,8,6,2,5,4,8,3,7]))