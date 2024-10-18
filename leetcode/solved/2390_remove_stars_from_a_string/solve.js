// https://leetcode.com/problems/removing-stars-from-a-string/?envType=study-plan-v2&envId=leetcode-75

// Example 1
// in:  "leet**cod*e"
// out: "lecoe"

// Example 2
// in:  "erase*****"
// out: ""

// Stack
// "leet**cod*e"
// [lecoe]
// "erase*****"
// []


// Time: O(n)
// Space: O(n)
const removeStars = (s) => {
    // Store the non star elements in a stack
    const stack = [];
    
    for(let i=0; i<s.length; i++) {
        if(s[i] === "*") {
            stack.pop();
        } else {
            stack.push(s[i]);
        }
    }

    return stack.join('');
}

console.log(removeStars("leet**cod*e"))
console.log(removeStars("erase*****"))
