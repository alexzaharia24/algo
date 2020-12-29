// https://leetcode.com/problems/minimum-genetic-mutation/
function minMutation(start, end, bank) {
    return minMutationWithAdjOnTheFly(start, end, bank);
}

function minMutationWithAdjOnTheFly(start, end, bank) {
    // Time: O(V * E * 8), V = nr of vertices, E = nr of edges
    // Space: O(V * E * 8), V = nr of vertices, E = nr of edges
    let visited = {};
    let queue = [];
    let qIdx = 0;
    let hash = {};
    bank.forEach(node => hash[node] = true)

    queue.push({ node: start, mutations: 0 });

    while (qIdx < queue.length) {
        let node = queue[qIdx].node;
        let mutations = queue[qIdx].mutations;
        qIdx++;
        if (node === end) {
            return mutations;
        }

        for (let i = 0; i < node.length; i++) {
            for (let char of ['A', 'C', 'G', 'T']) {
                let neighbor = node.substring(0, i) + char + node.substring(i + 1, node.length);
                if (neighbor !== node && neighbor in hash && !visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push({ node: neighbor, mutations: mutations + 1 });
                }
            }
        }

    }

    return -1;
}

function minMutationNoAdj(start, end, bank) {
    // Time: O(V * E * 8), V = nr of vertices, E = nr of edges
    // Space: O(V * E * 8), V = nr of vertices, E = nr of edges
    let visited = new Array(bank.length).fill(false);
    let queue = [];
    let qIdx = 0;

    queue.push({ node: start, mutations: 0 });

    while (qIdx < queue.length) {
        let node = queue[qIdx].node;
        let mutations = queue[qIdx].mutations;
        qIdx++;
        if (node === end) {
            return mutations;
        }
        for (let i = 0; i < bank.length; i++) {
            if (!visited[i] && nrOfDifferentChars(node, bank[i]) === 1) {
                visited[i] = true;
                queue.push({ node: bank[i], mutations: mutations + 1 });
            }
        }
    }

    return -1;
}

function nrOfDifferentChars(s1, s2) {
    let nr = 0;
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] !== s2[i]) {
            nr++;
        }
    }
    return nr;
}

console.log(minMutation("AACCGGTT", "AACCGGTA", ["AACCGGTA", "AACCGCTA", "AAACGGTA"]));
console.log(minMutation("AACCGGTT", "AAACGGTA", ["AACCGGTA", "AACCGCTA", "AAACGGTA"]));