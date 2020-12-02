// https://leetcode.com/problems/all-paths-from-source-to-target/

function allPathsSourceTarget(graph) {
    let paths = [];
    let visited = new Array(graph.length).fill(false);
    generatePathsNoCloning(graph, [0], paths, visited);
    return paths;
}

function generatePathsNoCloning(graph, path, paths, visited) {
    if (path[path.length - 1] === graph.length - 1) {
        paths.push([...path]);
        return; // Reached node n-1
    }

    let node = path[path.length - 1];
    for (let i=0; i<graph[node].length; i++) {
        let neighbor = graph[node][i];
        if(!visited[neighbor]) {
            visited[neighbor] = true;
            path.push(neighbor);
            generatePathsNoCloning(graph, path, paths, visited);
            visited[neighbor] = false;
            path.pop();
        }
    }
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