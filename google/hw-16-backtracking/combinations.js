// https://leetcode.com/problems/combinations/
function combine(n, k) {
    let combinations = [];
    generateCombinations(n, k, 1, [], combinations);
    return combinations;
}

function generateCombinations(n, k, number, combination, combinations) {
    // Time: Nr of combinations = n!/(n-k)!k!
    // Space: same
    if (combination.length == k) {
        combinations.push([...combination]);
        return;
    }

    if (number > n) {
        return;
    }


    for (let i = number; i <= n; i++) {
        combination.push(i);
        generateCombinations(n, k, i + 1, combination, combinations);
        combination.pop();
    }
}

console.log(combine(3, 2));