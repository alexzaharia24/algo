// https://leetcode.com/problems/generate-parentheses/

function generateParanthesis(n) {
    let solutions = [];
    generate(n, "", 0, solutions);
    console.log(nrOfCalls);
    return solutions.length;
}

let nrOfCalls = 1;
function generate(n, path, nrOpenPairs, solutions) {
    nrOfCalls++;
    // Time: Exponential (worst case 2^n, dar eu optimizez, deci nu o sa fie nicioadata atat de rau)
    // Space: Exponential = O(nr_parantezari_corecte)
    if (path.length === 2 * n) {
        solutions.push(path);
        return;
    }

    // Conditions for generating correct paths
    let nrOfRemainingToAdd = 2 * n - path.length;
    if (nrOpenPairs < nrOfRemainingToAdd) {
        // Then we can add an open parantheses
        generate(n, path + "(", nrOpenPairs + 1, solutions);
    }
    if (nrOpenPairs > 0) {
        // Then we can add a closed parantheses and close a pair
        generate(n, path + ")", nrOpenPairs - 1, solutions);
    }
}

console.log(generateParanthesis(14));