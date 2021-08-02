// URLify: Write a method to replace all spaces in a string with '%20: You may assume that the string
// has sufficient space at the end to hold the additional characters, and that you are given the "true"
// length of the string. (Note: If implementing in Java, please use a character array so that you can
// perform this operation in place.)
// EXAMPLE
// Input: "Mr John Smith "J 13
// Output: "Mr%20J ohn%20Smith"
// Hints: #53, #7 78

// Q1: what if 14 instead of 13 => "...Smith%20" ?

function URLify(string, realLength) {
    if (realLength === 0 || string === "" || realLength < string.realLength) return "";
    let arr = string.split("");
    let countAllowedSpaces = realLength;
    arr.forEach((char) => {
        if (char !== " ") {
            countAllowedSpaces--;
        }
    });

    console.log("Allowed spaces: ", countAllowedSpaces)

    arr = arr.map(char => {
        if(char !== " ") {
            return char;
        }
        if(countAllowedSpaces > 0) {
            countAllowedSpaces--;
            return "%20";
        } 
        return " ";
    })
    console.log(arr);

    // Trim trailing spaces
    let i = arr.length-1;
    while(i >= 0) {
        if(arr[i] === " ")
            delete arr[i];
        i--;
    }

    console.log(arr);
    console.log(arr.join(""));
    return arr.join("");
}

URLify("Mr John Smith    ", 11);