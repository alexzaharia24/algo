// 1.6 String Compression: Implement a method to perform basic string compression using the counts
// of repeated characters. For example, the string aabcccccaaa would become a2b1c5a3. If the
// "compressed" string would not become smaller than the original string, your method should return
// the original string. You can assume the string has only uppercase and lowercase letters (a - z).
// Hints: #92, # 11 0

function compressWithNewString(string) {
    // O(S + K^2) where S is the length of the string and K is the number of sequences (char, countOfChar) because at each concatentation there all of the compressed chars are copied to a new location => O(K^2)
    if (string.length < 2) return string;
    let compressed = "";
    let prevChar = string[0], currentChar, count = 1;
    for (let i = 1; i <= string.length; i++) {
        currentChar = string[i];
        if (currentChar === prevChar) {
            count++;
        } else {
            compressed += prevChar + count;
            prevChar = currentChar;
            count = 1;
        }
    }


    // Check if the same string as initial one
    if (compressed.length < string.length) {
        return compressed;
    }
    return string;
}

// (!) For Java use StringBuilder
function compressWithCharArray(string) {
    if (string.length < 2) return string;
    let arr = new Array(string.length * 2);
    let arrIdx = 0;
    let prevChar = string[0], currentChar, count = 1;

    for (let i = 1; i <= string.length; i++) {
        currentChar = string[i];
        if (prevChar === currentChar) {
            count++;
        } else {
            arr[arrIdx] = prevChar;
            arr[arrIdx + 1] = count;
            arrIdx += 2;
            prevChar = currentChar;
            count = 1;
        }
    }

    console.log(arr)

    // Check if the same string as initial one
    let compressedString = arr.slice(0, arrIdx).join("");
    if (compressedString.length < string.length) {
        return compressedString;
    }
    return string;
}

console.log(compressWithCharArray("abbccc"));
console.log(compressWithCharArray("aabcccccaaa"));
console.log(compressWithCharArray("abc"));