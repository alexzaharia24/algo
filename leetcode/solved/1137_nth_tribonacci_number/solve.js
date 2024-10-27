// Time: O(3^n)
// Space: O(n)

const tribonacciNaive = (n) => {
    switch(n) {
        case 0:
            return 0;
        case 1:
            return 1;
        case 2:
            return 1;
        default:
            return tribonacci(n-3) + tribonacci(n-2) + tribonacci(n-1);
    }
}

const tribonacciDp = (n, cache) => {
    switch(n) {
        case 0:
            return 0;
        case 1:
            return 1;
        case 2:
            return 1;
        default:
            const result = 
                (cache[n-3] || tribonacciDp(n-3, cache)) + 
                (cache[n-2] || tribonacciDp(n-2, cache)) + 
                (cache[n-1] || tribonacciDp(n-1, cache));

            cache[n] = result;

            return result;
    }
}

const tribonacci = (n) => {
    return tribonacciDp(n, {});
}

console.log(tribonacci(37));