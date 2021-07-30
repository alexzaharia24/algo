function pow2From1toN(n) {
    let pow = 1;
    while(pow <= n) {
        // O(logN) because you double the value at each step => logN steps will be performed
        console.log(pow);
        pow = pow * 2;
    }
}

function powFrom1toNRecursive(n) {
    let pows = [];
    pow2From1ToNRecursion(n, pows);
    console.log(pows);
}

function pow2From1ToNRecursion(n, result) {
    // O(logN) because each call halfs the search space (N/2)
    if(n <= 0) return 0;
    if(n === 1) {
        result.push(1);
        return 1;
    }

    let prev = pow2From1ToNRecursion(parseInt(n/2), result);
    let current = prev * 2;
    result.push(current);
    return current;
}

powFrom1toNRecursive(2);
powFrom1toNRecursive(5);
powFrom1toNRecursive(10);