// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

function binarySearch(numbers, start, end, target) {
    let left = start, right = end;

    while (left <= right) {
        let middle = parseInt((left + right) / 2);

        if (numbers[middle] === target) {
            return middle;
        } else if (numbers[middle] > target) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }

    return null;
}

function twoSum(numbers, target) {
    // O(n * logn)
    for (let i = 0; i < numbers.length - 1; i++) {
        let firstNumber = numbers[i];
        let secondNumber = target - firstNumber;
        let secondNumberIndex = binarySearch(numbers, i + 1, numbers.length - 1, secondNumber);

        if (secondNumberIndex !== null) {
            return [i + 1, secondNumberIndex + 1];
        }
    }
}

console.log(twoSum([3,24,50,79,88,150,345], 200));