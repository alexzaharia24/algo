class TreeNode {
    constructor(val, left, right) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}
/**
 * 
 * @param {array} queue 
 * @param {array} order 
 */
const bfsPerLevel = (queue, order, currentLevelIdx) => {
    while (currentLevelIdx < queue.length) {
        const level = queue[currentLevelIdx];
        const nextLevel = [];
        order.push(level);

        for (let i = 0; i < level.length; i++) {
            const node = level[i];

            if (node.left !== null) {
                nextLevel.push(node.left);
            }

            if (node.right !== null) {
                nextLevel.push(node.right);
            }
        }

        if (nextLevel.length > 0) {
            queue.push(nextLevel);
        }

        currentLevelIdx++;
    }
}

const dfs = (node, memory) => {
    if (node === null || memory.done) {
        return;
    }

    if (node.left === null && node.right === null) {
        memory.done = true;
    }

    memory.order.push(node.val);

    dfs(node.right, memory);
    dfs(node.left, memory);
}

const rightSideViewBfs = (root) => {
    const perLevelOrder = [];
    const rightView = [];

    if (root === null) return [];

    bfsPerLevel([[root]], perLevelOrder, 0);

    for (const level of perLevelOrder) {
        rightView.push(level[level.length - 1].val);
    }

    return rightView;
}

const rightSideView = (root) => {
    // Option 1 - BFS with selecting the last element on each level
    // return rightSideViewBfs(root);

    // Option 2 - DFS to right first and stop at first leaf
    //
}

const node4 = new TreeNode(4, null, null);
const node5 = new TreeNode(5, null, null);
const node3 = new TreeNode(3, null, node4);
const node2 = new TreeNode(2, null, node5);
const node1 = new TreeNode(1, node2, node3);

console.log(rightSideView(node1));