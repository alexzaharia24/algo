const containsDuplicate = nums => {
    // 1. two fors O(n^2) O(1)
    // 2. one for and hashmap O(n) O(n)
    const map = {};
    for(let i=0; i<nums.length; i++) {
        if(map[nums[i]] !== undefined) {
            return true;
        }
        map[nums[i]] = i;
    }

    return false;
}

// [1, 2, 3, 4] => false
/* eslint-disable */
console.log(`🔥 solve.js:16 :`, containsDuplicate([1,2,3,4]));
// [1, 1, 2, 3] => true
/* eslint-disable */
console.log(`🔥 solve.js:19 :`, containsDuplicate([1,1,2,3]));
// [1, 2, 2, 3, 4, 4, 5] => true
/* eslint-disable */
console.log(`🔥 solve.js:22 containsDuplicate([1,2,2,3,4,4,5]):`, containsDuplicate([1,2,2,3,4,4,5]));
