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

const containsDuplicateWithMap = nums => {
    // 1. two fors O(n^2) O(1)
    // 2. one for and hashmap O(n) O(n)
    const map = new Map();
    for(let i=0; i<nums.length; i++) {
        if(map.get(nums[i])) {
            return true;
        }
        map.set(nums[i], true);
    }

    return false;
}


// [1, 2, 3, 4] => false
/* eslint-disable */
console.log(`🔥 solve.js:16 :`, containsDuplicateWithMap([1,2,3,4]));
// [1, 1, 2, 3] => true
/* eslint-disable */
console.log(`🔥 solve.js:19 :`, containsDuplicateWithMap([1,1,2,3]));
// [1, 2, 2, 3, 4, 4, 5] => true
/* eslint-disable */
console.log(`🔥 solve.js:22 containsDuplicateWithMap([1,2,2,3,4,4,5]):`, containsDuplicateWithMap([1,2,2,3,4,4,5]));
