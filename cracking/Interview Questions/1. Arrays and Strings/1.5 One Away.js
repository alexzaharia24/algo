// One Away: There are three types of edits that can be performed on strings: insert a character,
// remove a character, or replace a character. Given two strings, write a function to check if they are
// one edit (or zero edits) away.
// EXAMPLE
// pale, pIe -> true
// pales. pale -> true
// pale. bale -> true
// pale. bake -> false
// Hints: #23, #97, #130

function isOneAway(a, b) {
    let i = 0, j = 0;
    let nrOfDifferentChars = 0;
    while (i < a.length && j < b.length) {
        console.log(`a[${i}] = ${a[i]}, b[${j}] = ${b[j]}`)
        if (nrOfDifferentChars > 1) return false;
        if (a[i] !== b[j]) {
            if (a[i + 1] === b[j]) {
                i++;
            } else if (a[i] === b[j + 1]) {
                j++;
            } else {
                i++; j++;
            }
            nrOfDifferentChars++;
        } else {
            i++; j++;
        }
    }

    if (i < a.length || j < b.length) {
        return false;
    }

    return true;
}

function isOneAwayTweaked(a, b) {
    if (Math.abs(a.length - b.length) > 1) return false;

    let i = 0, j = 0;
    let foundDifferentChar = false;
    let shorter = a.length < b.length ? a : b;
    let longer = a.length < b.length ? b : a;

    while (i < shorter.length && j < longer.length) {
        if (shorter[i] !== longer[j]) {
            if (foundDifferentChar) {
                return false;
            }
            foundDifferentChar = true;
            if (shorter.length === longer.length) {
                i++;
            }
            j++;
        } else {
            i++; j++;
        }
    }

    return true;
}

console.log(isOneAwayTweaked("pale", "paale"));