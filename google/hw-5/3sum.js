// https://leetcode.com/problems/3sum/

function twoSum(nums, start, target) {
    // O (n) time - nums is sorted ascending
    // O (1) space
    let i = start, j = nums.length - 1;
    let solutions = [];
    while (i < j) {
        let sum = nums[i] + nums[j];
        if (sum === target) {
            solutions.push([i, j]);
            i++;
        }
        else if (sum > target) {
            j--;
        } else {
            i++;
        }
    }

    return solutions;
}

function threeSum(nums) {
    // Time:    O(n*logn(n)) avg from sorting. 
    //          O(n ^ 2) from 1 loop and two sum
    //   ---->  O(n^2) total
    // Space: O(n) for result
    nums.sort((a, b) => parseInt(a) - parseInt(b)); // O(n*log(n)) avg
    let triplets = {};

    for (let i = 0; i < nums.length - 1; i++) {
        let solutions = twoSum(nums, i + 1, -nums[i]);
        if (solutions.length > 0) {
            for (let [j, k] of solutions) {
                triplets[`${nums[i]}_${nums[j]}_${nums[k]}`] = [nums[i], nums[j], nums[k]];
            }
        }
    }

    let result = [];
    for (let key in triplets) {
        result.push(triplets[key]);
    }

    return result;
}

function twoSumWithHash(nums, start, target) {
    let hash = {};
    let solutions = [];
    for (let i = start; i < nums.length; i++) {
        hash[nums[i]] = i;
    }
    for (let i = start; i < nums.length - 1; i++) {
        let j = hash[target - nums[i]];
        if (j !== undefined && j > i) {
            solutions.push([i, j]);
        }
    }

    return solutions;
}

function solveWithHash(nums) {
    let triplets = {};

    for (let i = 0; i < nums.length - 2; i++) {
        let solutions = twoSumWithHash(nums, i+1, -nums[i]);
        console.log(`SOL ${i}: ${solutions}`)
        if (solutions.length > 0) {
            for (let [j, k] of solutions) {
                let triplet = [nums[i], nums[j], nums[k]];
                triplet.sort((a, b) => a - b);
                triplets[`${triplet[0]}_${triplet[1]}_${triplet[2]}`] = [triplet[0], triplet[1], triplet[2]];
            }
        }
    }
    let result = [];
    for (let key in triplets) {
        result.push(triplets[key]);
    }

    return result;
}

// console.log(threeSum([-1, 0, 1, 2, -1, -4]))
// console.log(threeSum([0, 0, 0, 0]))
// console.log(threeSum([-2, 0, 1, 1, 2]))

console.log(solveWithHash([-1, 0, 1, 2, -1, -4]))
console.log(solveWithHash([0, 0, 0, 0]))
console.log(solveWithHash([-2, 0, 1, 1, 2]))


// [-4,-1,-1,0,1,2]