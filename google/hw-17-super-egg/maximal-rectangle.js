// https://leetcode.com/problems/maximal-rectangle/
function maximalRectangle(matrix) {
    let rows = matrix.length;
    if (rows === 0) return 0;
    let cols = matrix[0].length;

    let levelHeights = new Array(rows).fill().map(() => new Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            if (matrix[i][j] === '1') {
                levelHeights[i][j] = 1;

                if (i - 1 >= 0 && matrix[i - 1][j] === '1') {
                    levelHeights[i][j] += levelHeights[i - 1][j];
                }
            }

        }
    }

    // console.log(levelHeights)

    let maxArea = 0;

    // for (let row = 0; row < rows; row++) {
    //     for (let col = 0; col < cols; col++) {
    //         maxArea = Math.max(maxArea, getMaxAreaMSquared(row, col, matrix, rows, cols, levelHeights));
    //     }
    // }

    for (let row = 0; row < rows; row++) {
        maxArea = Math.max(maxArea, getMaxAreaHistogramLike(row, matrix, cols, levelHeights));
    }



    return maxArea;
}

function getMaxAreaHistogramLike(row, matrix, cols, levelHeights) {
    /**
     * Optimized. Reduced problem to finding the max rectangle in histogram: https://leetcode.com/problems/largest-rectangle-in-histogram/
     * Time: O(N)
     * Space: O(N)
     */

    let maxArea = 0;

    let firstSmallestToLeft = getFirstSmallestToLeft(levelHeights[row]);
    let firstSmallestToRight = getFirstSmallestToRight(levelHeights[row]);

    // console.log(`levelHeights[${row}]: ${levelHeights[row]}`)
    // console.log(`smallestToLeft[${levelHeights[row]}]: ${firstSmallestToLeft}`)
    // console.log(`smallestToRight[${levelHeights[row]}]: ${firstSmallestToRight}`)

    let areas = [];
    for (let i = 0; i < cols; i++) {
        let area = levelHeights[row][i] * Math.abs(firstSmallestToLeft[i] - firstSmallestToRight[i] + 1);
        areas.push(area);
        maxArea = Math.max(maxArea, area);
    }
    // console.log("matrix:", matrix)
    // console.log(`row: ${row}, areas: ${areas}`)


    // console.log(`maxArea: ${maxArea}`)
    // console.log("-----------")

    return maxArea;
}

function getFirstSmallestToLeft(histogram) {
    /**
     * Use a stack to maintain elements from 0 to N. Before pushing an element to the stack you remove the bigger ones first. Then, if there are samller elements on the stack, the top one is the smallest to the left, or -1 if there are none left. Then push the element to the stack.
     
     2,0,2,1,1
     */
    let stack = [];
    let idxOfSmallests = new Array(histogram.length).fill(-1);

    for (let i = 0; i < histogram.length; i++) {
        let elem = stack[stack.length - 1];

        while (stack.length > 0 && histogram[i] <= elem.value) {
            stack.pop();
            elem = stack[stack.length - 1];
        }

        let idxOfSmallest = stack.length > 0 && stack[stack.length - 1].value < histogram[i] ? stack[stack.length - 1].idx : -1;
        idxOfSmallests[i] = idxOfSmallest;
        stack.push({ value: histogram[i], idx: i });
    }
    return idxOfSmallests;
}

function getFirstSmallestToRight(histogram) {
    /**
     * Use a stack to maintain elements from 0 to N. Before pushing an element to the stack you remove the bigger ones first. Then, if there are samller elements on the stack, the top one is the smallest to the left, or -1 if there are none left. Then push the element to the stack.
     */
    let stack = [];
    let idxOfSmallests = new Array(histogram.length).fill(-1);
    let array = [...histogram];
    array.reverse();
    histogram = array;

    for (let i = 0; i < histogram.length; i++) {
        let elem = stack[stack.length - 1];

        while (stack.length > 0 && histogram[i] <= elem.value) {
            stack.pop();
            elem = stack[stack.length - 1];
        }


        let idxOfSmallest = stack.length > 0 && stack[stack.length - 1].value < histogram[i] ? stack[stack.length - 1].idx : histogram.length;
        idxOfSmallests[i] = idxOfSmallest;
        stack.push({ value: histogram[i], idx: histogram.length - i - 1 });
    }
    return idxOfSmallests.reverse();
}

function getMaxAreaMSquared(endRow, endCol, levelHeights) {
    /**
     * Brute approach. O(COLS*COLS)
     */
    let maxArea = 0;

    // console.log(`endRow: ${endRow}; endCol: ${endCol}; levelHeights: ${levelHeights}`);

    for (let width = 1; width <= endCol + 1; width++) {
        let minLevelHeight = Infinity;
        for (let col = endCol; col >= endCol - width + 1; col--) {
            minLevelHeight = Math.min(minLevelHeight, levelHeights[endRow][col]);
        }
        maxArea = Math.max(maxArea, width * minLevelHeight);
    }
    return maxArea;
}

// console.log(maximalRectangle(
//     [["1", "0", "1", "0", "0"],
//     ["1", "0", "1", "1", "1"],
//     ["1", "1", "1", "1", "1"],
//     ["1", "0", "0", "1", "0"]]
// ))


// console.log(maximalRectangle(
//     [["1"]]
// ))

console.log(maximalRectangle(
    [
        ["0", "1", "1", "0", "1"],
        ["1", "1", "0", "1", "0"],
        ["0", "1", "1", "1", "0"],
        ["1", "1", "1", "1", "0"],
        ["1", "1", "1", "1", "1"],
        ["0", "0", "0", "0", "0"]
    ]
))
// [["0","1","1","0","1"],["1","1","0","1","0"],["0","1","1","1","0"],["1","1","1","1","0"],["1","1","1","1","1"],["0","0","0","0","0"]]
// console.log(getFirstSmallestToLeft([2,0,2,1,1]));
// console.log(getFirstSmallestToRight([3, 4, 2, 4, 2]));