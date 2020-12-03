function generateAllPossibleBSTs(n) {
    let trees = [];

    for (let i = 1; i <= n; i++) {
        let tree = new Array(n).fill(null);
        generateTreeRecursive(n, 1, 0, tree);
        console.log(`Tree with ${n} nodes and root ${i}: `, tree)
        trees.add(tree);
    }

    return trees;
}

function generateTreeRecursive(nrOfNodes, currentNrOfNodes, nodeValue, nodeIdx, tree) {
    tree.push(nodeValue);

    if (currentNrOfNodes === nrOfNodes) {
        console.log(tree);
        tree.pop();
    }

    for (let i = nodeValue + 1; i <= n; i++) {
        
    }

}
