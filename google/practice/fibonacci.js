function fib(n) {
    return fibRecursive(n, 0, 1);
}

function fibRecursive(n, i1, i2) {
    if (n === 0) return i1;
    return fibRecursive(n - 1, i2, i1 + i2);
}

console.log((fib(60) - 1) )