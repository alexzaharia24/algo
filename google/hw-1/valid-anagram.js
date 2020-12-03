function solve(s, t) {
    return solveWithHashMap(s, t);
}

function solveWithSort(s, t) {
    // O(n*logn) time
    // O(n) space (n)

    if (s.length !== t.length) return false;

    let sChars = s.split('')
    let tChars = t.split('')

    sChars = sChars.sort();
    tChars = tChars.sort();

    for (let i = 0; i < sChars.length; i++) {
        if (sChars[i] !== tChars[i]) return false;
    }

    return true;
}

function solveWithHashMap(s, t) {
    // O(n) time
    // O(n) space ?
    if(s.length !== t.length) return false;
    let countsS = {}, countsT = {};
    for(let char of s) {
        countsS[char] = (char in countsS ? countsS[char] : 0) + 1
    }
    for(let char of t) {
        countsT[char] = (char in countsT ? countsT[char] : 0) + 1
    }

    // Compare occurences
    for(let char of s) {
        if(countsS[char] !== countsT[char]) return false;
    }

    return true;
}

console.log(solve("a", "ab"))