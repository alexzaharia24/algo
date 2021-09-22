// Build Order: You are given a list of projects and a list of dependencies (which is a list of pairs of
//     projects, where the second project is dependent on the first project). All of a project's dependencies
//     must be built before the project is. Find a build order that will allow the projects to be built. If there
//     is no valid build order, return an error.
//     EXAMPLE
//     Input:
//     projects: a, b, c, d, e, f
//     dependencies: (a, d), (f, b), (b, d), (f, a), (d, c)
//     Output: f, e, a, b, d, c

function buildOrder(projects, deps) {
    // Deps can be represented as a graph. Projects are the nodes.
    // If there is a cycle then there is no possible order
    // We can find an order by doing a Topological Sort

    let inDegrees = {};
    let adjList = {};

    projects.forEach(proj => {
        inDegrees[proj] = 0;
        adjList[proj] = {};
    });


    for (let dep of deps) {
        let neighbors = adjList[dep[0]];
        neighbors[dep[1]] = true;
        inDegrees[dep[1]]++;
        adjList[dep[0]] = neighbors;
    }

    // console.log(adjList);

    // Do the topo sort
    // We need a queue
    let q = [], qIdx = 0;

    // Add nodes with no deps to the queu
    for(let key of Object.keys(inDegrees)) {
        if(inDegrees[key] === 0) {
            q.push(key)
        }
    }

    let order = [];
    while(qIdx < q.length) {
        let node = q[qIdx++];
        // Visit node and delete deps to this node
        for(let neighbor of Object.keys(adjList[node])) {
            inDegrees[neighbor]--;
            if(inDegrees[neighbor] === 0) {
                q.push(neighbor);
            }
        }

        order.push(node);
    }

    if(order.length !== projects.length) {
        // Not all nodes have been visited => Cycle
        console.error("Cycle detected. No order is possible");
        return [];
    }

    return order;
}

console.log(buildOrder(
    ["a", "b", "c", "d", "e", "f"],
    [["a", "d"], ["f", "b"], ["b", "d"], ["f", "a"], ["d", "c"]]
));