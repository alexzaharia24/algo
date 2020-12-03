// https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/

function binarySearch(nums, target, direction) {
    let left = 0, right = nums.length - 1;
    let idx = -1;

    while (left <= right) {
        let middle = parseInt((left + right) / 2);
        if (nums[middle] === target) {
            idx = middle;
            if(direction === "first") {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        } else if(nums[middle] > target) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }

    return idx;
}


function searchRange(nums, target) {
    let firstIndx = binarySearch(nums, target, "first");
    let secondIndx = -1;
    if (firstIndx !== -1) {
        secondIndx = binarySearch(nums, target, "last");
    }

    return [firstIndx, secondIndx];
}



console.log(searchRange([5,7,7,8,8,10], 8));
console.log(searchRange([5,7,7,8,8,10], 6));