class TreeNode {
    constructor(val, left, right) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}


const recurse1 = (currentNode, depth) => {
    if(currentNode === null) {
        return depth;
    } 

    const leftD = recurse1(currentNode.left, depth+1);
    const rightD = recurse1(currentNode.right, depth+1);

    return Math.max(leftD, rightD);
}

const recurse2 = (currentNode, depth, result) => {
    if(currentNode === null) {
        return depth;
    } 

    recurse2(currentNode.left, depth+1, result);
    recurse2(currentNode.right, depth+1, result);

    result.maxD = Math.max(result.maxD, depth);
}

const recurse3 = (currentNode) => {
    if(currentNode === null) {
        return 0;
    }

    return Math.max(
        recurse3(currentNode.left) + 1,
        recurse3(currentNode.right) + 1
    )
}

const maxDepth = (root) => {
    // Option 1
    // return recurse1(root, 0);

    // Option 2
    // const result = { maxD: -1 };
    // recurse2(root, 0, result);
    
    // return result.maxD + 1;

    // Option 3
    return recurse3(root);
}


// const node15 = new TreeNode(15, null, null);
// const node7 = new TreeNode(7, null, null);
// const node20 = new TreeNode(20, node15, node7);
// const node9 = new TreeNode(9, null, null);
// const node3 = new TreeNode(3, node9, node20);

const node2 = new TreeNode(2, null, null);
const node1 = new TreeNode(1, null, node2);


console.log(maxDepth(node1));



