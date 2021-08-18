const { Queue } = require('./Queue');

// A graph can be represented as:
// - Adjacency list
//     - Using classes
//     - Using integer lists
// - Adjacency matrix

// Representing the same graph in all 3 variations
// 1.1 Adjaceny list with classes
class GraphNode {
    constructor(value) {
        this.value = value ?? null;
        this.neighbours = []; // GraphNode[]
    }

    toString() {
        return this.value;
    }
}

class Graph {
    constructor() {
        this.nodes = []; // GraphNode[]
    }

    print() {
        for (let node of this.nodes) {
            console.log(`${node.toString()}: ${node.neighbours}`);
        }
    }
}

let n0 = new GraphNode(0);
let n1 = new GraphNode(1);
let n2 = new GraphNode(2);
let n3 = new GraphNode(3);
// edges: n0<->n1, n0<->n2, n1<->n2, n2<->n3
n0.neighbours.push(n1);
n1.neighbours.push(n0);
n0.neighbours.push(n2);
n2.neighbours.push(n0);
n1.neighbours.push(n2);
n2.neighbours.push(n1);
n2.neighbours.push(n3);
n3.neighbours.push(n2);

let graphWithClass = new Graph();
graphWithClass.nodes.push(n0);
// graphWithClass.print();

// // 1.2 Adjaceny list with integer list
let graphWithIntegerList = [
    [1, 2], // 0
    [0, 2], // 1
    [0, 1, 3], // 2
    [2]  // 3
]

// // 2.1 Adjaceny matrix
let graphWithAdjacenyMatrix = [
    [false, true, true, false], // 0
    [true, false, true, false], // 1
    [true, true, false, true], // 2
    [false, false, true, false] // 3
]

/**
 * Visit the nodes of the graph, represented with a Graph class, in DFS order
 * @param {Graph} graph The graph
 */
function dfsWithGraphClass(graph) {
    let visited = new Map();
    for (let node of graph.nodes) {
        if (visited.get(node) === undefined) {
            dfsWithGraphClassRecursion(node, visited);
        }
    }

    function dfsWithGraphClassRecursion(node, visited) {
        if (node === null) return;
        visited.set(node, true);
        console.log("visited: ", node);
        for (let neighbour of node.neighbours) {
            if (visited.get(neighbour) === undefined) {
                // Node not visited yet
                dfsWithGraphClassRecursion(neighbour, visited);
            }
        }
    }
}

/**
 * Visit the nodes of the graph, represented with an integer adjaceny list, in DFS order
 * @param {number[][]} graph The graph
 */
function dfsWithIntegerAdjacenyList(graph) {
    let visited = new Map();
    // Go through the vertices
    for (let node = 0; node < graph.length; node++) {
        // console.log('V: ', node, visited)
        if (visited.get(node) === undefined) {
            dfsWithIntegerAdjacenyListRecursion(node, visited, graph);
        }
    }

    function dfsWithIntegerAdjacenyListRecursion(node, visited, graph) {
        if (node === null) return;
        visited.set(node, true);
        console.log("visited: ", node);
        let neighbours = graph[node];
        for (let neighbour of neighbours) {
            // console.log('neighbour:', neighbour);
            if (visited.get(neighbour) === undefined) {
                // console.log("not visited: ", neighbour);
                // Node not visited yet
                dfsWithIntegerAdjacenyListRecursion(neighbour, visited, graph);
            }
        }
    }
}

/**
 * Visit the nodes of the graph, represented with a boolean adjaceny matrix, in DFS order
 * @param {boolean[][]} graph The graph
 */
function dfsWithIntegerAdjacenyMatrix(graph) {
    let visited = new Map();
    // Go through the vertices
    for (let node = 0; node < graph.length; node++) {
        // console.log('V: ', node, visited)
        if (visited.get(node) === undefined) {
            dfsWithIntegerAdjacenyMatrixRecursion(node, visited, graph);
        }
    }

    function dfsWithIntegerAdjacenyMatrixRecursion(node, visited, graph) {
        if (node === null) return;
        visited.set(node, true);
        console.log("visited: ", node);
        for (let neighbour = 0; neighbour < graph.length; neighbour++) {
            // console.log('neighbour:', neighbour);
            // Verify if there is an edge between the vertices
            if (graph[node][neighbour]) {
                if (visited.get(neighbour) === undefined) {
                    // console.log("not visited: ", neighbour);
                    // Node not visited yet
                    dfsWithIntegerAdjacenyMatrixRecursion(neighbour, visited, graph);
                }
            }

        }
    }
}

/**
 * Visit the nodes of the graph, represented with a Graph class, in BFS order
 * @param {Graph} graph The graph
 */
function bfsWithGraphClass(graph) {
    if (graph === null || graph.nodes.length === 0) return;
    let queue = new Queue(), visited = new Map();
    for (let node of graph.nodes) {
        queue.add(node);
        visited.set(node, true);
    }

    while (!queue.isEmpty()) {
        let node = queue.remove();
        visited.set(node, true);
        console.log("visited: ", node.toString());

        for (let neighbour of node.neighbours) {
            if (visited.get(neighbour) === undefined) {
                console.log("not visited: ", neighbour.toString())
                // Not yet visited
                visited.set(neighbour, true);
                queue.add(neighbour);
            }
        }
    }
}

/**
 * Visit the nodes of the graph, represented with an integer adjaceny list, in BFS order
 * @param {number[][]} graph The graph
 * @param {number} root The root
 */
function bfsWithIntegerAdjacenyList(graph, root) {
    if (graph === null || graph.length === 0 || root === null || root < 0 || root > graph.length) return;
    let queue = new Queue(), visited = new Map();
    queue.add(root);
    visited.set(root, true)

    while (!queue.isEmpty()) {
        let node = queue.remove();
        console.log("visited: ", node.toString());

        for (let neighbour of graph[node]) {
            if (visited.get(neighbour) === undefined) {
                console.log("not visited: ", neighbour.toString())
                // Not yet visited
                visited.set(neighbour, true);
                queue.add(neighbour);
            }
        }
    }
}

/**
 * Visit the nodes of the graph, represented with a boolean adjaceny matrix, in BFS order
 * @param {boolean[][]} graph The graph
 * @param {number} root The root
 */
function bfsWithIntegerAdjacenyMatrix(graph, root) {
    if (graph === null || graph.length === 0) return;
    let queue = new Queue(), visited = new Map();
    queue.add(root);
    visited.set(root, true);

    while (!queue.isEmpty()) {
        let node = queue.remove();
        console.log("visited: ", node.toString());

        for (let neighbour = 0; neighbour < graph.length; neighbour++) {
            if(graph[node][neighbour]) {
                // there is an edge between the 2 nodes
                if (visited.get(neighbour) === undefined) {
                    console.log("not visited: ", neighbour.toString())
                    // Not yet visited
                    visited.set(neighbour, true);
                    queue.add(neighbour);
                }
            }
        }
    }
}

//// DFS example
// dfsWithGraphClass(graphWithClass);
// dfsWithIntegerAdjacenyList(graphWithIntegerList);
// dfsWithIntegerAdjacenyMatrix(graphWithAdjacenyMatrix);

//// BFS example
// bfsWithGraphClass(graphWithClass);
// bfsWithIntegerAdjacenyList(graphWithIntegerList, 3);
bfsWithIntegerAdjacenyMatrix(graphWithAdjacenyMatrix, 2);