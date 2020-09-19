function solve(nums) {
    return solveZerosTwoPasses(nums);
}

function solveTwoLoops(nums) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length - 1; j++) {
            if (nums[j] === 0) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
            }
        }
    }
    return nums;
}

function solveTwoPointers(nums) {
    let nextZero = 0, nextNonZero = 0;
    while (true) {
        while (nextZero < nums.length && nums[nextZero] !== 0) {
            nextZero++;
        }
        while (nextNonZero < nums.length && (nums[nextNonZero] === 0 || nextNonZero <= nextZero)) {
            nextNonZero++;
        }
        if (nextZero < nums.length && nextNonZero < nums.length) {
            [nums[nextZero], nums[nextNonZero]] = [nums[nextNonZero], nums[nextZero]]
        } else {
            return nums;
        }
    }
}

function solveZerosTwoPasses(nums) {
    let idx = 0;
    for(let num of nums) {
        if(num !== 0) {
            nums[idx++] = num;
        }
    }

    while(idx < nums.length) {
        nums[idx++] = 0;
    }
    
    return nums;
}

console.log(solve([1, 0, 2, 0, 3]))
