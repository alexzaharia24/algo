function solve(s) {
    let n = s.length;
    for (let i = 0; i < n / 2; i++) {
        [s[i], s[n-i-1]] = [s[n-i-1], s[i]];
    }

    return s;
}

console.log(solve([..."abcd"]));