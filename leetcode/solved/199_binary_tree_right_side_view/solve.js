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

/**
 * Add to order the right most node at each level.
 * The first time you visit a node on a level it should be the right most node.
 * So add it to the order.
 * After that if you visit other nodes on the same level ignore them
 * and just keep traversing the node down.
 * @param {TreeNode} node Current node
 * @param {{maxLevel, order}} memory Remember maxLevel so far and result order 
 * @returns 
 */
const dfs = (node, currentLevel, memory) => {
    if(node === null) {
        return;
    }

    if(currentLevel > memory.maxLevel) {
        memory.maxLevel = currentLevel;
        memory.order.push(node.val);
    }

    dfs(node.right, currentLevel + 1, memory);
    dfs(node.left, currentLevel + 1, memory);
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

// Time: O(N)
// Space: O(H), where H is the height of the tree
const rightSideViewDfs = (root) => {
    const memory = {maxLevel: 0, order: []};

    dfs(root, 1, memory);

    return memory.order;
}

const rightSideView = (root) => {
    // Option 1 - BFS with selecting the last element on each level
    // return rightSideViewBfs(root);

    // Option 2 - DFS select the right most node at each level
    return rightSideViewDfs(root);
}

const node4 = new TreeNode(4, null, null);
const node5 = new TreeNode(5, null, null);
const node3 = new TreeNode(3, null, node4);
const node2 = new TreeNode(2, null, node5);
const node1 = new TreeNode(1, node2, node3);

console.log(rightSideView(node1));