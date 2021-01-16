// https://leetcode.com/problems/redundant-connection/

function findRedundantConnection(edges) {
    return findRedundantConnectionWithDFS(edges);
}

function findRedundantConnectionWithDFS(edges) {
    let adjList = getAdjList(edges);
    let cycle = getCycleWithDFS(adjList);
    let cycleMap = {};

    for (let node of cycle) {
        cycleMap[node] = true;
    }

    for (let i = edges.length - 1; i >= 0; i--) {
        if(edges[i][0] in cycleMap && edges[i][1] in cycleMap) {
            return edges[i];
        }
    }
}

function getCycleWithDFS(adjList) {
    let nodes = Object.keys(adjList).map((n) => parseInt(n));
    let visited = new Array(nodes.length).fill(false);
    let path = [];
    let cycle = [];
    dfs(nodes[0], visited, path, adjList, cycle);

    return cycle;
}

function dfs(node, visited, path, adjList, cycle) {
    visited[node] = true;
    path.push(node);
    let neighbors = adjList[node] ? adjList[node] : [];
    for (let neighbor of neighbors) {
        if (cycle.length > 0) return;
        if (!visited[neighbor]) {
            dfs(neighbor, visited, path, adjList, cycle);
        } else {
            // If neighbor is not parent => this is the end of the cycle
            if (path[path.length - 2] !== neighbor) {
                let cycleStart = neighbor;
                let p = 0;
                while (path[p] !== cycleStart) {
                    p++;
                }
                cycle.push(...path.slice(p));

                return;
            }
        }
    }
    path.pop(node)
}

function findRedundantConnectionWithTopoSort(edges) {
    // O(NR_EDGES + NR_NODES)
    let adjList = getAdjList(edges); // O(NR_EDGES)
    let topoSort = topologicalSort(adjList); // O(NR_NODES + NR_EDGES)
    let cycleNodes = getCycle(topoSort, adjList); // O(NR_NODES)

    for (let idx = edges.length - 1; idx >= 0; idx--) {
        if (edges[idx][0] in cycleNodes && edges[idx][1] in cycleNodes) {
            return edges[idx];
        }
    }
}

function topologicalSort(adjList) {
    // Find the cycle using topological sort
    let inEdges = {};
    let queue = [];
    let qIdx = 0;
    let order = [];


    for (let node of Object.keys(adjList)) {
        inEdges[node] = adjList[node].length;

        if (adjList[node].length === 1) {
            queue.push(parseInt(node));
        }
    }

    while (qIdx < queue.length) {
        let node = queue[qIdx++];

        for (let neighbor of adjList[node]) {
            inEdges[neighbor]--;
            if (inEdges[neighbor] === 1) {
                queue.push(neighbor);
            }
        }

        order.push(node);
    }

    return order;
}

function getCycle(topoSort, adjList) {
    let topoSortMap = {}
    let cycleNodes = {}

    for (let node of topoSort) {
        topoSortMap[node] = true
    }

    for (let node of Object.keys(adjList)) {
        if (!(parseInt(node) in topoSortMap)) {
            cycleNodes[node] = true
        }
    }

    return cycleNodes;
}

function findRedundantConnectionWithBFS(edges) {
    // O(N^2) time
    let nrOfNodes = 0
    let nodes = {}
    for (let edge of edges) {
        nodes[edge[0]] = 1
        nodes[edge[1]] = 1
    }

    nrOfNodes = Object.keys(nodes).length

    for (let idx = edges.length - 1; idx >= 0; idx--) {
        newEdges = [...edges];
        newEdges.splice(idx, 1);
        // console.log("Remove: ", edges[idx])
        if (isTree(newEdges, nrOfNodes)) {
            return edges[idx];
        }
    }

    return null
}

function getAdjList(edges) {
    // O(N) time
    let adjList = {}
    for (let edge of edges) {
        if (!adjList[edge[0]]) {
            adjList[edge[0]] = []
        }
        adjList[edge[0]].push(edge[1])
        if (!adjList[edge[1]]) {
            adjList[edge[1]] = []
        }
        adjList[edge[1]].push(edge[0])
    }
    return adjList;
}

function isTree(edges, nrOfNodes) {
    // O(N) time
    let queue = [];
    let qIdx = 0;
    let visited = new Array(edges.length).fill(false)

    let adjList = getAdjList(edges)

    let nodes = Object.keys(adjList)

    queue.push(nodes[0])
    visited[nodes[0]] = true
    while (qIdx < queue.length) {
        let node = queue[qIdx++]
        // console.log(node)
        let neighbors = adjList[node] ? adjList[node] : []
        for (let neighbor of neighbors) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor)
            }
        }
    }

    // console.log("queue: ", queue)
    // console.log("nrOfNodes: ", nrOfNodes)
    return queue.length === nrOfNodes
}

// console.log(findRedundantConnection([[1, 2], [1, 3], [2, 3]]))
// console.log(findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]))
// console.log(findRedundantConnection([[1, 3], [3, 4], [1, 5], [3, 5], [2, 3]]))
// console.log(findRedundantConnection([[9, 10], [5, 8], [2, 6], [1, 5], [3, 8], [4, 9], [8, 10], [4, 10], [6, 8], [7, 9]]))
console.log(findRedundantConnection([[1,2],[2,3],[2,4],[4,5],[1,5]]))

// console.log(topologicalSort([[1, 2], [1, 3]]))