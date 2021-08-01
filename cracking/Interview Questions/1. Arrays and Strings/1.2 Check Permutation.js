// Check Permutation: Given two strings, write a method to decide if one is a permutation of the
// other.

function isPermutationWithSorting(a, b) {
    if(a.length !== b.length) return false;

    // let A = new Array(a.length);
    // let B = new Array(b.length);

    // for (let i = 0; i < a.length; i++) {
    //     A[i] = a.charAt(i);
    //     B[i] = b.charAt(i);
    // }

    let A = a.split("");
    let B = b.split("");

    A.sort();
    B.sort();

    let i = 0, j = 0;

    A.forEach((char, idx) => {
        if(char !== B[idx]) return false;
    })

    return true;
}

function isPermutationWithApparitions(a, b) {
    if(a.length !== b.length) return false;
    let counts = new Array(26).fill(0);
    for(let char of a) {
        let idx = char.charCodeAt(0) - 'a'.charCodeAt(0);
        counts[idx]++;
    }

    for(let char of b) {
        let idx = char.charCodeAt(0) - 'a'.charCodeAt(0);
        counts[idx]--;
    }

    for(let count of counts) {
        if(count !== 0) return false;
    }
    return true;
}

console.log(isPermutationWithSorting("abc", "cbaa"));