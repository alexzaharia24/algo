// https://leetcode.com/problems/guess-number-higher-or-lower/description/?envType=study-plan-v2&envId=leetcode-75

const guess = (attempt) => {
    if (attempt === pick) return 0;

    return attempt > pick ? -1 : 1;
}

// find(1, 10): middle = 5
// find(6, 10): middle = 8
// find(6, 7): middle = 6
const findRecursive = (left, right) => {
    const middle = parseInt((left + right) / 2);
    const g = guess(middle);

    switch (g) {
        case 0:
            return middle;
        case -1:
            // attempt > pick => search left part
            return findRecursive(left, middle-1);
        case 1:
            // atempt < pick => search right part
            return findRecursive(middle+1, right);
    }
}

const findIterative = (left, right) => {
    let middle = parseInt((left + right) / 2);
    let g = guess(middle);

    while(g !== 0) {
        if(g === 1) {
            // go right
            left = middle + 1;
        } else {
            right = middle - 1;
        }

        middle = parseInt((left + right) / 2);
        g = guess(middle);
    }

    return middle;
}


// Time: O(logN)
// Space: O(1)
const guessNumber = (n) => {
    // Option 1
    // return findRecursive(1, n);
    // Option 2
    return findIterative(1, n);
}

const pick = 6;
console.log(guessNumber(10));