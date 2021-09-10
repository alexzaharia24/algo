// Route Between Nodes: Given a directed graph, design an algorithm to find out whether there is a
// route between two nodes.
// Hints: #127

// Time: O(N+M), Extra Space: O(N+M)
function isRoute(n1, n2, adjList) {
    return canReach(n1, n2, adjList) || canReach(n2, n1, adjList);
}

function canReach(root, target, adjList) {
    // dfs
    return canReachRecursive(root, target, adjList, new Map());
}

function canReachRecursive(node, target, adjList, visited) {
    if(node === target) return true;
    if(node === null) return false;
    let result = false;
    // console.log(node, target, visited);
    // console.log(adjList)
    for(let neighbor of adjList[node]) {
        if(!visited.get(neighbor)) {
            visited.set(neighbor, true);
            result = result || canReachRecursive(neighbor, target, adjList, visited);
            if(result) {
                // console.log(node, target, visited);
                return true;
            }
        }
    }
    return result;
}

let adjList = [
    [1,2], // 0,
    [], // 1,
    [4], // 2,
    [0], // 3,
    [5], // 4,
    [], // 5,
]

console.log(isRoute(0,5, adjList));