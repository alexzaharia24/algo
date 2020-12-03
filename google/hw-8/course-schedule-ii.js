// https://leetcode.com/problems/course-schedule-ii/

function findOrder(numCourses, prerequisites) {
    // Time: O(n^2) - Trece prin toate nodurile = O(n) si toate muchiile O(n*n)
    // Space: O(n^2) - Memoreaza toate nodurile si toate muchiile
    let nrOfInDeps = {}; // Nr of in dependencies for each node
    let nodesWithNoInDeps = []; // queue
    let idxNodesWithNoInDeps = 0;
    let outDeps = {}; // List of out dependencies for each node
    let order = [];

    for (let i = 0; i < numCourses; i++) {
        nrOfInDeps[i] = 0;
        outDeps[i] = [];
    }

    for (let prerequisite of prerequisites) {
        // There is an edge from prerequisite[1] to prerequisite[0]
        let a = prerequisite[0], b = prerequisite[1];
        nrOfInDeps[a]++;
        outDeps[b].push(a);
    }

    for (let key in nrOfInDeps) {
        if (nrOfInDeps[key] === 0) {
            nodesWithNoInDeps.push(key);
        }
    }

    // console.log("nrOfInDeps: ", nrOfInDeps)
    // console.log("outDeps: ", outDeps)
    // console.log("idxNodesWithNoInDeps: ", idxNodesWithNoInDeps)

    while (idxNodesWithNoInDeps < nodesWithNoInDeps.length) {
        let node = nodesWithNoInDeps[idxNodesWithNoInDeps++];
        let outDepsForNode = outDeps[node];
        // console.log("outDepsForNode: ", outDepsForNode)
        for (let outNode of outDepsForNode) {
            nrOfInDeps[outNode]--;
            if (nrOfInDeps[outNode] === 0) {
                nodesWithNoInDeps.push(outNode);
            }
        }
        order.push(node);
    }

    if (order.length < numCourses) return [];
    return order;
}

console.log(findOrder(2, [[1,0]]))
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]))
console.log(findOrder(1, []))