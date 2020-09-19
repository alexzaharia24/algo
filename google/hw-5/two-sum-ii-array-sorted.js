// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

function twoSumWithTwoPointers(numbers, target) {
    let i = 0, j = numbers.length - 1;
    while (i < j) {
        let sum = numbers[i] + numbers[j];
        if (sum === target) {
            return [i + 1, j + 1];
        } else if (sum > target) {
            j--;
        } else {
            i++;
        }
    }

    return [-1, -1]
}

console.log(twoSumWithTwoPointers([2, 7, 11, 15], 26))