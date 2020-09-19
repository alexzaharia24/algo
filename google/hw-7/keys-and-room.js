// https://leetcode.com/problems/keys-and-rooms/

const { Queue } = require("../utils/Queue");

function canVisitAllRooms(rooms) {
    let result = { nrOfVisitedRooms: 0 }
    let visited = new Array(rooms.length).fill(false);
    bfs(rooms, visited, result);
    // dfs(rooms, 0, visited, result);
    return result.nrOfVisitedRooms === rooms.length;
}

function bfs(rooms, visited, result) {
    // O(V+E) time
    // O(V) space
    let queue = new Queue();
    queue.push(0);
    visited[0] = true;
    while (queue.size() > 0) {
        let vertex = queue.pop();
        for (let neighbour of rooms[vertex]) {
            if (!visited[neighbour]) {
                visited[neighbour] = true;
                queue.push(neighbour);
            }
        }

        result.nrOfVisitedRooms++;
    }

    console.log(result);
}

function dfs(rooms, currentRoom, visited, result) {
    // O(V+E) time
    // O(V+E) space
    if (visited[currentRoom]) return;
    visited[currentRoom] = true;
    result.nrOfVisitedRooms++;
    for (let neighbour of rooms[currentRoom]) {
        dfs(rooms, neighbour, visited, result); 4
    }
}

console.log(canVisitAllRooms([[1], [2], []]));