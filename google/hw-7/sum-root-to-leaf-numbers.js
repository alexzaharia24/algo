// https://leetcode.com/problems/sum-root-to-leaf-numbers/
function sumNumbers(root) {
    // Time: O(n)
    // Space: O(n) for stack

    // return solveWithDfsWithParam(root);
    return solveWithDfsNoParams(root);
}

function solveWithDfsWithParam(root) {
    let result = { sum: 0 };
    if (root === null) return 0;
    dfsWithParam(root, 0, result);
    return result.sum;
}

function dfsWithParam(node, number, result) {
    if (node === null) return;
    if (node.left === null && node.right === null) {
        result.sum += (number * 10 + node.val);
        return;
    }

    let newNumber = (number * 10) + node.val;
    dfsWithParam(node.left, newNumber, result);
    dfsWithParam(node.right, newNumber, result);
}

function solveWithDfsNoParams(node) {
    return dfsNoParam(node, 0);
}

function dfsNoParam(node, number) {
    if (node === null) return 0;
    if (node.left === null && node.right === null) {
        return number * 10 + node.val;
    }

    let newNumber = (number * 10) + node.val;
    return dfsNoParam(node.left, newNumber) + dfsNoParam(node.right, newNumber);
    
}
