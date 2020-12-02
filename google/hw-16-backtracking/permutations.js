// https://leetcode.com/problems/permutations/

function permute(nums) {
    let permutations = [];
    let visited = new Array(nums.length).fill(false);
    generatePermutationsNoCloning(nums, [], permutations, visited);
    return permutations;
}

function generatePermutationsNoCloning(nums, permutation, permutations, visited) {
    // Time: O(n! * n) - the aditional n is from splice() and array copying
    // Space: O(n! * n)
    // n = length of nums
    
    if (permutation.length === nums.length) {
        permutations.push([...permutation]);
    }

    for (let i = 0; i < nums.length; i++) {
        if(!visited[i]) {
            visited[i] = true;
            permutation.push(nums[i])
            generatePermutationsNoCloning(nums, permutation, permutations, visited);
            visited[i] = false;
            permutation.pop();
        }
    }
}


function generatePermutations(nums, permutation, permutations) {
    // Time: O(n! * n) - the aditional n is from splice() and array copying
    // Space: O(n! * n)
    // n = length of nums
    if (nums.length === 0) {
        permutations.push(permutation);
    }
    for (let i = 0; i < nums.length; i++) {
        let newPermutation = [...permutation];
        newPermutation.push(nums[i]);
        let newNums = [...nums];
        newNums.splice(i, 1);
        generatePermutations(newNums, newPermutation, permutations);
    }
}

console.log(permute([1,2,3]));