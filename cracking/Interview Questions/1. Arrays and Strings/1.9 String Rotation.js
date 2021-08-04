// 1.9 String Rotation: Assume you have a method isSubst ring which checks if one word is a substring
// of another. Given two strings, 51 and 52, write code to check if 52 is a rotation of 51 using only one
// call to isSubstring (e.g., "waterbottle" is a rotation of"erbottlewat").
// Hints: #34, #88, #104


/**
 * Checks if s2 is a substring of s1
 * @param {string} s1 First string
 * @param {string} s2 Second string 
 */
function isSubstring(s1, s2) {
    if (s1.length < s2.length) return false;
    let s2Idx = 1;
    let s1Idx = 0;
    while(s1Idx < s1.length) {
        if(s1[s1Idx] !== s2[0]) {
            s1Idx++;
            continue;
        }

        s1Idx++;
        while(s1[s1Idx] === s2[s2Idx] && s2Idx < s2.length && s1Idx < s1.length) {
            s1Idx++;
            s2Idx++;
        }
        if(s2Idx === s2.length) return true;
        s2Idx = 1;
    }

    return false;
}

/**
 * Checks if s2 is a rotation of s1
 * @param {string} s1 First string
 * @param {string} s2 Possible rotated string 
 */
function isRotation(s1, s2) {
    // Think of the string s1 as two parts, x and y. If s2 is a rotation of s1 then s2 is yx.
    // You can find if s2 is rotation of s1 if s2 is a substring of s1s1 because yx is a substring of xyxy. 

    if (s1.length !== s2.length) return false;
    let s1s1 = `${s1}${s1}`;
    return isSubstring(s1s1, s2);
}

console.log(isRotation("abc", "cb"));