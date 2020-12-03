// https://www.hackerearth.com/practice/algorithms/graphs/topological-sort/tutorial/

/**
 * Return the topological order of the given graph
 * @param {number} nrOfNodes Nr of nodes in graph. From 0 to nrOfNodes-1
 * @param {number[][2]} listOfEdges List of edges between vertices. Ex: [0,1] is an edge from node 0 to node 1
 */
function topoSort(nrOfNodes, listOfEdges) {
    return topoSortDFS(nrOfNodes, listOfEdges);
}

function topoSortBFS(nrOfNodes, listOfEdges) {
    // Time: O(n + m), n=nr vertices, m=nr edges
    // Space: O(n + m)
    let inEdges = new Array(nrOfNodes).fill(0); // inEdges[i] = nr of edges from any node to node i
    let adjList = new Array(nrOfNodes).fill()
        .map(() => new Array());

    for (let edge of listOfEdges) {
        let outNode = edge[0], inNode = edge[1];
        inEdges[inNode]++;
        adjList[outNode].push(inNode);
    }

    let queue = []; // We will add nodes with inEdges[node] = 0 to the queue
    let queueIdx = 0;
    let order = []; // The topological order, which is the result

    for (let i = 0; i < inEdges.length; i++) {
        if (inEdges[i] === 0) {
            queue.push(i); // Add nodes with 0 in edges as starting points
        }
    }

    while (queueIdx < queue.length) {
        let node = queue[queueIdx++]; // queue pop_front

        // // Non optimal. Use an adjaceny list for O(1) edge retrieval
        // for (let i = 0; i < inEdges.length; i++) {
        //     if (listOfEdges[i][0] === node) {
        //         inEdges[listOfEdges[i][1]]--; // Decrease the nr of in edges for the neighbours of 'node'
        //         if (inEdges[listOfEdges[i][1]] === 0) {
        //             queue.push(listOfEdges[i][1]); // Add to queue if there are no more incoming edges to the neighbour
        //         }
        //     }
        // }

        // Optimal with use of an adjaceny list for O(1) edge retrieval
        for (let neighbour of adjList[node]) {
            inEdges[neighbour]--; // Decrease the nr of in edges for the neighbours of 'node'
            if (inEdges[neighbour] === 0) {
                queue.push(neighbour); // Add to queue if there are no more incoming edges to the neighbour
            }
        }

        order.push(node);
    }

    return order;
}

function topoSortDFS(nrOfNodes, listOfEdges) {
    // Time: O(n + (m*log(m)))
    // Space: O(n + m)
    let inEdges = new Array(nrOfNodes).fill(0);
    let adjList = new Array(nrOfNodes).fill()
        .map(() => new Array());

    for (let edge of listOfEdges) {
        let outNode = edge[0], inNode = edge[1];
        inEdges[inNode]++;
        adjList[outNode].push(inNode);
    }

    // Need to sort edges by decreasing nr of in edges since we want to take the most dependant node first.
    for (let neighbours of adjList) { // O(n  + (m*log(m))) time
        neighbours.sort((a, b) => inEdges[b] - inEdges[a]); // sort neighbours decreasing by nr of in edges
    }

    let order = new Array(); // result

    for (let node = 0; node < nrOfNodes; node++) {
        if (inEdges[node] === 0) {
            topoSortDFSRecursion(node, nrOfNodes, inEdges, adjList, order)
        }
    }

    // Reverse the order, since DFS adds the most dependant node first
    return order.reverse();

}

function topoSortDFSRecursion(node, nrOfNodes, inEdges, adjList, order) {
    // adjList[i] values are sorted decreasing by the number of in edges
    for (let neighbour of adjList[node]) {
        if (inEdges[neighbour] > 0) {
            topoSortDFSRecursion(neighbour, nrOfNodes, inEdges, adjList, order);
        }
    }

    order.push(node);
    // Remove in edges
    inEdges[node] = -1; // In edges works like a 'visited' array. 
}

function topoSortRecursiveSimple(nrOfNodes, listOfEdges) {
    let adjList = new Array(nrOfNodes).fill()
        .map(() => new Array());

    for (let edge of listOfEdges) {
        let outNode = edge[0], inNode = edge[1];
        adjList[outNode].push(inNode);
    }

    let stack = []; // A stack
    let visited = new Array(nrOfNodes).fill(false);
    for (let i = 0; i < nrOfNodes; i++) {
        if (!visited[i]) {
            topoSortRecursiveSimpleRecursion(i, adjList, stack, visited);
        }
    }

    return stack.reverse();
}

function topoSortRecursiveSimpleRecursion(node, adjList, stack, visited) {
    visited[node] = true;
    
    for (let neighbour of adjList[node]) {
        if (!visited[neighbour]) {
            topoSortRecursiveSimpleRecursion(neighbour, adjList, stack, visited);
        }
    }

    stack.push(node);
}

// console.log(topoSortDFS(5,
//     [[1, 0], [0, 2], [1, 2], [1, 3], [3, 4]]
// ))

// console.log(topoSortBFS(5,
//     [[1, 0], [0, 2], [1, 2], [1, 3], [3, 4]]
// ))

console.log(topoSortBFS(5,
    [[1, 2], [1, 3], [2, 3], [2, 4], [3, 4], [3, 5]]
))

console.log(topoSortDFS(5,
    [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [2, 4]]
))


console.log(topoSortRecursiveSimple(5,
    [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [2, 4]]
))

