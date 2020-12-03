function flori4(n) {
    return flori4Iterativ(n);
}

function flori4Iterativ(n) {
    // dp[i] = nr de buchete care se termina in i
    // dp[i] = suma de d[1] + .... + dp[i-2] + 1 (toate posibilitatile de a face buchete cu flori neadiacente pana acum)

    let dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    let sum = 0;
    for (let i = 2; i <= n; i++) {
        dp[i] = sum + 1;
        sum += dp[i - 1];
    }

    return dp.reduce((sum, x) => sum + x, 0);
}

function flori4Recursiv(n) {
    let paths = [];
    for (let i = 1; i <= n; i++) {
        dfs(i, n, [], paths);
    }

    console.log(paths);
}


function dfs(node, n, path, paths) {
    if (path[path.length - 1] !== node - 1) {
        path.push(node);
        paths.push([...path]);
    } else {
        return;
    }

    for (let i = node + 1; i <= n; i++) {
        dfs(i, n, path, paths);
        if (path[path.length - 1] === i) {
            path.pop();
        }
    }
}

console.log(flori4(58));