function solve(nums) {
    return solveWithSort(nums);
}

function solveBrute(nums) {
    // O (n^2) time
    // O(1) space
    for(let i=0; i<nums.length - 1; i++) {
        for(let j=i+1; j<nums.length; j++) {
            if(nums[i] === nums[j]) return true;
        }
    }

    return false;
}

function solveWithSort(nums) {
    // O(nlogn) time
    // O(1) space
    nums = nums.sort();
    for(let i=0; i<nums.length - 1; i++) {
        if(nums[i] === nums[i+1]) return true;
    }

    return false;
}

function solveWithHashMap(nums) {
    // O(n) time
    // O(n) space
    let counts = {};
    for(let num of nums) {
        if(num in counts) return true;
        counts[num] = 1;
    }

    return false;
}

console.log(solve([1,2,3]))
console.log(solve([1,2,2,3]))