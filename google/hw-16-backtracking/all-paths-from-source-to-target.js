// https://leetcode.com/problems/all-paths-from-source-to-target/

function allPathsSourceTarget(graph) {
    let paths = [];
    generatePaths(graph, [0], paths);
    return paths;
}

function generatePaths(graph, path, paths) {
    if (path[path.length - 1] === graph.length - 1) {
        paths.push(path);
        return; // Reached node n-1
    }

    let node = path[path.length - 1];
    for (let neighbor of graph[node]) {
        let newPath = [...path];
        newPath.push(neighbor);
        generatePaths(graph, newPath, paths);
    }
}

console.log(allPathsSourceTarget( [[1,2],[3],[3],[]]));