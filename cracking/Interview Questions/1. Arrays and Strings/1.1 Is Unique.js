// Is Unique: Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?

// 1. With Hashmap
function isUniqueWithHashMap(string) {
    let map = new Map();
    for (let char of string) {
        if (map.get(char) !== undefined) {
            return false;
        }
        map.set(char, true);
    }
    return true;
}

// 2. With Sorting the string
function isUniqueWithSort(string) {
    // string.sort();
    // for(let i=1; i<string.length; i++) {
    //     if(string.charAt(i) === string.charAt(i-1)) {
    //         return false;
    //     }
    // }

    // return true;

    // (!) Does not work in javascript
}

// 3. With bit marking. Have an int (32 bits) and mark each lower case character when encountered. For example a is bit 0, b is bit 1 and so on.
function isUniqueWithBitMarking(string) {
    let bits = 0;
    for(let char of string) {
        let bit = char.charCodeAt(0) - 'a'.charCodeAt(0);
        console.log(`char ${char}, bit ${bit}, bits ${bits}`)
        if((bits & (1 << bit)) !== 0) {
            return false;
        }
        bits = bits | (1 << bit);
    }
    return true;
}




console.log(isUniqueWithHashMap("abcda"));
console.log(isUniqueWithHashMap("abcd"));

console.log(isUniqueWithBitMarking("abcda"));
console.log(isUniqueWithBitMarking("abcd"));