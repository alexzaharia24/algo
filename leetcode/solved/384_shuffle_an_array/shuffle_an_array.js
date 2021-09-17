var Solution = function (nums) {
    this.original = [...nums];
};

/**
* Resets the array to its original configuration and return it.
* @return {number[]}
*/
Solution.prototype.reset = function () {
    return this.original;
};

/**
* Returns a random shuffling of the array.
* @return {number[]}
*/
Solution.prototype.shuffle = function () {
    return shuffleFisherYates(this.original);
};

function shuffleBruteForce(nums) {
    let perm = [];
    let remaining = [...nums];
    for (let i = 0; i < nums.length; i++) {
        let randomIdx = parseInt(Math.random() * remaining.length);
        // console.log(remaining, perm, randomIdx)
        perm.push(remaining[randomIdx]);
        remaining.splice(randomIdx, 1);
    }
    return perm;
}

// https://leetcode.com/problems/shuffle-an-array/solution/
function shuffleFisherYates(nums) {
    let perm = [...nums];

    for (let i = 0; i < perm.length; i++) {
        let randomIdx = parseInt(i + Math.random() * (perm.length - i));
        [perm[i], perm[randomIdx]] = [perm[randomIdx], perm[i]];
    }

    return perm;
}

Solution.prototype.getPermutations = function (arr) {
    let permutations = [];
    this.getPermutationsRec(arr, [], permutations);
    return permutations;
}

Solution.prototype.getPermutationsRec = function (arr, currentPerm, perms) {
    // console.log(arr, currentPerm, perms);
    if (arr.length === 0) {
        perms.push(currentPerm);
        return;
    }

    for (let i = 0; i < arr.length; i++) {
        let newArr = [...arr];
        newArr.splice(i, 1);
        this.getPermutationsRec(newArr, [...currentPerm, arr[i]], perms);
    }
}


let x = new Solution([1, 2, 3])
console.log(x.shuffle());
console.log(x.shuffle());
console.log(x.shuffle());