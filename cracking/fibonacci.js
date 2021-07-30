function fiboRecursive(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return fiboRecursive(n - 1) + fiboRecursive(n - 2);
}

function fiboIterative(n) {
    if (n <= 0) return 0;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        let aux = b;
        b = a+b;
        a = aux;
    }

    return b;
}


function fibo0toN(n, result) {
    if (n <= 0) {
        result.push(0);
        return result;
    }
    let a = 0, b = 1;
    result.push(1);
    for (let i = 2; i <= n; i++) {
        let aux = b;
        b = a+b;
        a = aux;
        result.push(b);
    }

    return result;
}

function fibo0toNMemo(n) {  
    console.time('fibo0toNMemo');

    for(let i=0; i<=n; i++) {
            // O(n)
        let memo = new Array(n+1);
        memo[0] = 0;
        memo[1] = 1;
        // O(1) due to using memo
        console.log(`fib(${i}): ${fibo0toNMemoRecursive(i, memo)}`);
    }
    console.timeEnd('fibo0toNMemo');
}

function fibo0toNMemoRecursive(n, memo) {
    // O(1) anortized with memo
    if(memo[n] !== undefined) {
        return memo[n];
    }

    memo[n] = fibo0toNMemoRecursive(n-1, memo) + fibo0toNMemoRecursive(n-2, memo);
    return memo[n];
}

// console.log(fiboRecursive(4));
// console.log(fiboIterative(5));
// console.log(fiboRecursive(6));
// console.log(fiboIterative(7));
// console.log(fibo0toN(5, []));
fibo0toNMemo(1000);