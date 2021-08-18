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
graphWithClass.nodes.push(n0, n1, n2, n3);
// graphWithClass.print();

// // 1.2 Adjancey list with integer list
let graphWithIntegerList = [
    [1, 2], // 0
    [0, 2], // 1
    [0, 1, 3], // 2
    [2]  // 3
]

// // 2.1 Adjancey matrix
let graphWithAdjanceyMatrix = [
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
 * @param {number[]} graph The graph
 */
function dfsWithIntegerAdjanceyList(graph) {
    let visited = new Map();
    // Go through the vertices
    for (let node = 0; node < graph.length; node++) {
        // console.log('V: ', node, visited)
        if (visited.get(node) === undefined) {
            dfsWithIntegerAdjanceyListRecursion(node, visited, graph);
        }
    }

    function dfsWithIntegerAdjanceyListRecursion(node, visited, graph) {
        if (node === null) return;
        visited.set(node, true);
        console.log("visited: ", node);
        let neighbours = graph[node];
        for (let neighbour of neighbours) {
            // console.log('neighbour:', neighbour);
            if (visited.get(neighbour) === undefined) {
                // console.log("not visited: ", neighbour);
                // Node not visited yet
                dfsWithIntegerAdjanceyListRecursion(neighbour, visited, graph);
            }
        }
    }
}

function bfs(root) {

}

// DFS example
// dfsWithGraphClass(graphWithClass);
dfsWithIntegerAdjanceyList(graphWithIntegerList);