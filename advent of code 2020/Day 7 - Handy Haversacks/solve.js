function run1() {
    const fs = require('fs');
    const { EOL } = require('os');
    const data = fs.readFileSync('./data.in', { encoding: 'utf-8' });
    const lines = data.split(EOL);

    let adjList = new Map(); // bag color -> bag color in which it can be part of

    // Build graph
    for (let line of lines) {
        let tokens = line.split(/ bags /);
        let toVertex = tokens[0];
        let fromVertices = tokens[1].split(',');
        for (let i = 0; i < fromVertices.length; i++) {
            if (i === fromVertices.length - 1 && fromVertices[i].indexOf("contain no") !== -1) {
                // no inner bags possible
                continue;
            }

            let digitMatches = fromVertices[i].match(/\d/);
            let lastDigitIdx = fromVertices[i].lastIndexOf(digitMatches[digitMatches.length - 1]);
            let indexOfBag = fromVertices[i].indexOf("bag");
            let justColor = fromVertices[i].substring(lastDigitIdx + 2, indexOfBag - 1);

            let outVertices = adjList.get(justColor) ?? [];
            outVertices.push(toVertex);
            adjList.set(justColor, outVertices);
        }
    }

    console.log(countUniqueSuccessors(adjList, 'shiny gold', new Map()));
    // console.log(adjList);
}

function countUniqueSuccessors(adjList, vertex, visited) {
    let neighbours = adjList.get(vertex) ?? [];
    let count = 0;
    for (let neighbour of neighbours) {
        if (!visited.get(neighbour)) {
            visited.set(neighbour, true);
            count = count + 1 + countUniqueSuccessors(adjList, neighbour, visited);
        }
    }

    return count;
}

function run2() {
    const fs = require('fs');
    const { EOL } = require('os');
    const data = fs.readFileSync('./data.in', { encoding: 'utf-8' });
    const lines = data.split(EOL);

    let adjList = new Map(); // bag color -> [[bag color contained, nr of bags]]

    // Build graph
    for (let line of lines) {
        let tokens = line.split(/ bags /);
        let fromVertex = tokens[0];
        let toVertices = tokens[1].split(',');
        for (let i = 0; i < toVertices.length; i++) {
            if (i === toVertices.length - 1 && toVertices[i].indexOf("contain no") !== -1) {
                // no inner bags possible
                continue;
            }

            let digitMatches = toVertices[i].match(/\d/);
            let firstIdx = toVertices[i].indexOf(digitMatches[0]);
            let lastDigitIdx = toVertices[i].lastIndexOf(digitMatches[0]);
            let number = toVertices[i].substring(firstIdx, lastDigitIdx + 1);
            let indexOfBag = toVertices[i].indexOf("bag");
            let justColor = toVertices[i].substring(lastDigitIdx + 2, indexOfBag - 1);

            let outVertices = adjList.get(fromVertex) ?? [];
            outVertices.push({ color: justColor, number: parseInt(number) });
            adjList.set(fromVertex, outVertices);
        }
    }

    console.log(countSuccessorsWithCost(adjList, 'shiny gold'));
    // console.log(adjList);
}

function countSuccessorsWithCost(adjList, vertex, indent) {
    let neighbours = adjList.get(vertex) ?? [];
    let count = 0;
    // console.log((indent ?? '') + vertex);
    for (let neighbour of neighbours) {
        count = count + neighbour.number + neighbour.number * countSuccessorsWithCost(adjList, neighbour.color, (indent ?? '') + ' ');
    }

    return count;
}

run2();