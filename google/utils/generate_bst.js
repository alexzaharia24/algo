function generateAllPossibleBSTs(n) {
    let trees = [];

    for (let i = 1; i <= n; i++) {
        let tree = new Array(n).fill(null);
        generateTreeRecursive(n, 1, 0, tree);
        trees.add(tree);
    }

    return trees;
}

function generateTreeRecursive(nrOfNodes, nodeValue, nodeIdx, tree) {
    tree[nodeIdx] = nodeValue;

    if(nodeValue === nrOfNodes) {
        return tree;
    }

    
}
