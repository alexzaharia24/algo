function solve(s) {
    return solveWithHashMap(s);
}

function solveBrute(s) {
    for (let i = 0; i < s.length; i++) {
        let duplicate = false;
        for (let j = 0; j < s.length; j++) {
            if (i !== j && s[i] === s[j]) {
                duplicate = true;
            }
        }
        if (!duplicate) return i;
    }
    return -1;
}

function solveWithHashMap(s) {
    // O(n) time
    // O(n) space
    if(s.length === 0) return -1;
    let counts = {};
    
    for (let char of s) {
        counts[char] = (char in counts ? counts[char] : 0) + 1;
    }

    for(let idx in s) {
        if(counts[s[idx]] === 1) {
            return idx;
        }
    }

    return -1
}

console.log(solve("leetcode")); //0
console.log(solve(""));