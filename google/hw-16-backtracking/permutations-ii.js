// https://leetcode.com/problems/permutations-ii/
function permuteUnique(nums) {
    return permuteUniqueWithObject(nums);
}

function permuteUniqueWithObject(nums) {
    // Time: Exponential
    // Space: O(nr of unique permutations) = close to n!
    let permutations = {};
    let visited = new Array(nums.length).fill(false);
    generateWithObject(nums, [], visited, permutations);
    return Object.keys(permutations);
}

function generateWithObject(nums, permutation, visited, permutations) {
    if (permutation.length === nums.length) {
        if (!(permutation in permutations)) {
            permutations[permutation] = true;
        }
        return;
    }

    for (let i = 0; i < nums.length; i++) {
        if (!visited[i]) {
            visited[i] = true;
            permutation.push(nums[i]);
            generateWithObject(nums, permutation, visited, permutations);
            visited[i] = false;
            permutation.pop();
        }
    }
}

function permuteUniqueWithMap(nums) {
    // Time: Exponential
    // Space: O(nr of unique permutations) = close to n!
    let permutations = new Map();
    let visited = new Array(nums.length).fill(false);
    generateWithMap(nums, [], visited, permutations);
    let solution = [];
    for (let key of permutations.keys()) {
        solution.push(stringToArray(key));
    }
    return solution;
}

function generateWithMap(nums, permutation, visited, permutations) {
    if (permutation.length === nums.length) {
        if (!(arrayToString(permutation) in permutations)) {
            permutations.set(arrayToString(permutation), true);
        }
        return;
    }

    for (let i = 0; i < nums.length; i++) {
        if (!visited[i]) {
            visited[i] = true;
            permutation.push(nums[i]);
            generateWithMap(nums, permutation, visited, permutations);
            visited[i] = false;
            permutation.pop();
        }
    }
}

function arrayToString(array) {
    let string = "";
    for (let i = 0; i < array.length; i++) {
        string += array[i];
        if (i < array.length - 1) {
            string += ","
        }
    }
    return string;
}

function stringToArray(string) {
    return string.split(",").map((e) => parseInt(e));
}

console.log(permuteUnique([1, 1, 2]));
