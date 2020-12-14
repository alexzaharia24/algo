// https://leetcode.com/problems/house-robber-iii/

function rob(root) {
    return robMaxLootWithAndWithoutNode(root);
}

function robMaxLootWithAndWithoutNode(root) {
    // Time: O(nr of nodes)
    // Space: O(height of tree) for recursion stack
    // let maxLoot = 0;
    return Math.max(...recursion(root));
    // return maxLoot;
}

function recursion(node) {
    // [x,y]: x = max loot starting from node, including the node; y = max loot starting from node, not include the node
    if (node === null) return [0, 0];

    let left = recursion(node.left);
    let right = recursion(node.right);

    let maxLootWithNode = node.val + left[1] + right[1];
    let maxLootWithoutNoode = Math.max(...left) + Math.max(...right);

    return [maxLootWithNode, maxLootWithoutNoode];
}

function robWrong(root) {
    if (root === null) return 0;
    let sumOnLevels = getSumOnLevels(root);
    // Now we solve the classic house-robber problem

    let dp = new Array(sumOnLevels.length);
    // dp[i] = max loot until house i, without including it necessarily
    // dp[i] = max(dp[i-1], sumOnLevels[i] + dp[i-1])

    // base case
    dp[0] = sumOnLevels[0];
    if (sumOnLevels.length === 1) return sumOnLevels[0];
    dp[1] = Math.max(dp[0], sumOnLevels[1]);

    for (let i = 2; i < sumOnLevels.length; i++) {
        dp[i] = Math.max(dp[i - 1], sumOnLevels[i] + dp[i - 2]);
    }

    return dp[dp.length - 1];
}

function getSumOnLevels(root) {
    let levelSum = [];
    levelSumRecursion(root, 0, levelSum);
    return levelSum;
}

function levelSumRecursion(node, lvl, levelSum) {
    if (node === null) return;

    if (levelSum[lvl] === undefined) levelSum[lvl] = 0;
    levelSum[lvl] += node.val;

    levelSumRecursion(node.left, lvl + 1, levelSum);
    levelSumRecursion(node.right, lvl + 1, levelSum);
}

function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

let n3_1 = new TreeNode(3);
let n3_2 = new TreeNode(3);
let n3_3 = new TreeNode(3);
let n1_1 = new TreeNode(1);
let n1_2 = new TreeNode(1);
let n1_3 = new TreeNode(1);
let n1_4 = new TreeNode(1);
let n2_1 = new TreeNode(2);
let n2_2 = new TreeNode(2);
let n5 = new TreeNode(5);
let n6 = new TreeNode(6);
let n7 = new TreeNode(7);

n3_1.left = n1_1;
n3_1.right = n1_2;
n1_1.left = n1_3;
n1_1.right = n2_1;
n1_2.left = n2_2;
n1_2.right = n3_2;
n1_3.left = n7;
n2_1.left = n1_4;
n1_4.left = n6;
n3_2.left = n5;
n3_2.right = n3_3;


console.log(rob(n3_1));