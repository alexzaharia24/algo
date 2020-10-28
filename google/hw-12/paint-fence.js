// https://leetcode.com/problems/paint-fence/
function numWays(n, k) {
    if(n === 0) return 0;
    let ways = 0;
    for (let i = 0; i < k; i++) {
        ways += dfs(i, 1, n - 1, k);
    }
    return ways;
}

function dfs(poleColor, adjSameColor, polesLeft, k) {
    if (polesLeft === 0) return 1;
    let ways = 0;
    for (let i = 0; i < k; i++) {
        if (poleColor === i && adjSameColor < 2) {
            ways += dfs(i, adjSameColor + 1, polesLeft - 1, k);
        } else if(poleColor !== i) {
            ways += dfs(i, 1, polesLeft - 1, k);
        }
    }
    return ways;
}

console.log(numWays(3,2));
console.log(numWays(3,3));