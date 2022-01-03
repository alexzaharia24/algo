// nums

// 1 2 3 4
// 1st pass: 1 1 2 6
// 2nd pass: 24 12 8 6
// pA = 24

// -1 1 0 -3 3
// 1st pass: 1 -1 -1 0 0
// 2nd pass: 0 0 9 0 0
// pA = 0

function productExceptSelf(nums) {
    let n = nums.length;
    if(n === 0) return nums;

    let result = new Array(n).fill(1);

    let productBefore = nums[0];
    let productAfter = nums[n-1];
    
    // 1st pass for computing product before
    for(let i=1; i<n; i++) {
        result[i] = productBefore;
        productBefore *= nums[i];
    }

    // 2nd pass for computing product after
    for(let i=n-2; i>=0; i--) {
        result[i] *= productAfter;
        productAfter *= nums[i];
    }

    return result;
}

console.log(productExceptSelf([1,2,3,4]));
console.log(productExceptSelf([-1, 1, 0, -3, 3]));
