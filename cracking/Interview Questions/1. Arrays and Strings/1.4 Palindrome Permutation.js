// Palindrome Permutation: Given a string, write a function to check if it is a permutation of a palindrome.
// A palindrome is a word or phrase that is the same forwards and backwards. A permutation
// is a rea rrangement of letters. The palindrome does not need to be limited to just dictionary words.
// EXAMPLE
// Input: Tact Coa
// Output: True (permutations: "taco cat". "atco cta". etc.)
// Hints: #106, #121, #134, #136

function isPalindromePermutation(string) {
    let counts = new Map();
    // Remove the white spaces

    string = string.replace(/ /g, "");
    string = string.toLowerCase();

    for (let char of string) {
        if (counts.get(char) === undefined) {
            counts.set(char, 0);
        }
        counts.set(char, counts.get(char) + 1);
    }
    console.log(string);

    let nrOfOddCounts = 0;
    for (let [key, value] of counts) {
        if (value % 2 === 1) {
            nrOfOddCounts++;
        }
    }

    if (string.length % 2 === 0) {
        return nrOfOddCounts === 0;
    } else {
        return nrOfOddCounts === 1;
    }
}

function isPalindromePermutationSmallTweak(string) {
    let counts = new Map();
    // Remove the white spaces

    string = string.replace(/ /g, "");
    string = string.toLowerCase();
    let nrOfOddCounts = 0;

    for (let char of string) {
        if (counts.get(char) === undefined) {
            counts.set(char, 0);
        }
        counts.set(char, counts.get(char) + 1);
        if (counts.get(char) % 2 === 1) {
            nrOfOddCounts++;
        } else {
            nrOfOddCounts--;
        }
    }

    if (string.length % 2 === 0) {
        return nrOfOddCounts === 0;
    } else {
        return nrOfOddCounts === 1;
    }
}

// Only for alphabetic chars
function isPalindromePermutationWithBitFlip(string) {
    // Remove the white spaces
    string = string.replace(/ /g, "");
    string = string.toLowerCase();

    let bitVector = 0;

    for (let char of string) {
        let bit = char.charCodeAt(0) - 'a'.charCodeAt(0);
        bitVector = bitVector ^ (1 << bit);
    }

    // Check if only one bit of value 1 and all of the rest are 0 => only one odd count char
    // ex:  1000 - 0001 = 0111
    //      1000 & 0111 = 0
    // => only one bit of 1
    return bitVector === 0 || ((bitVector - 1) & bitVector) === 0;
}

console.log(isPalindromePermutationWithBitFlip("aa"))