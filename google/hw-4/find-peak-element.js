// https://leetcode.com/problems/find-peak-element

function binarySearchPeak(nums) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        let middle = parseInt((left + right) / 2);
        let leftSmaller = false, rightSmaller = false;

        if (middle === 0) {
            leftSmaller = true;
            rightSmaller = nums[middle] > nums[middle + 1];
        } else if (middle === nums.length - 1) {
            rightSmaller = true;
            leftSmaller = nums[middle - 1] < nums[middle];
        } else {
            leftSmaller = nums[middle - 1] < nums[middle];
            rightSmaller = nums[middle] > nums[middle + 1];
        }

        if (leftSmaller && rightSmaller) {
            return middle;
        }
        if (!rightSmaller) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return -1;
}

function findPeakElement(nums) {
    // O(logn) time
    // O(1) space
    if (nums.length === 1) return 0;
    return binarySearchPeak(nums);
}

console.log(findPeakElement([1,2,3,1]));
console.log(findPeakElement([1,2,1,3,5,6,4]));
console.log(findPeakElement([1]));
console.log(findPeakElement([1,2]));