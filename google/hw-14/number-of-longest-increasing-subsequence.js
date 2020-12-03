// https://leetcode.com/problems/number-of-longest-increasing-subsequence/


function findNumberOfLIS(nums) {
    // Time: O(n^2)
    // Space: O(n)
    // dp[i] = length of longest increasing subsequence that ends at position i
    // count[i] = nr of increasing subsequences with length dp[i] until position i

    let n = nums.length;
    let dp = new Array(n).fill(1);

    let maxLength = 1; // Length of at least one is the minimum
    for (let i = 1; i < n; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], 1 + dp[j]);
                maxLength = Math.max(dp[i], maxLength);

                if(dp[j] === dp[i] - 1) {
                    count[i] += count[j];
                } 
            }
        }
    }

    let count = new Array(n).fill(0);

    count[0] = 1;
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if ((nums[j] < nums[i]) && (dp[j] === dp[i] - 1)) {
                count[i] += count[j];
            } else if (dp[i] === 1) {
                count[i] = 1;
            }
        }
    }

    let nrOfLIS = 0;
    for (let i = 0; i < n; i++) {
        if (dp[i] === maxLength) {
            nrOfLIS += count[i];
        }
    }

    return nrOfLIS;
}


function findNumberOfLISMaxLength(nums) {
    // dp[i] = length of longest sequence ending on position i
    let dp = new Array(nums.length).fill(0);

    dp[0] = 1;
    for (let i = 1; i < nums.length; i++) {
        let pos = i - 1;
        dp[i] = 0;
        let idxOfMaxLengthForPrevSequence = i;
        while (pos >= 0) {
            if (nums[pos] < nums[i]) {
                if (dp[idxOfMaxLengthForPrevSequence] < dp[pos]) {
                    idxOfMaxLengthForPrevSequence = pos;
                }
            }
            pos--;
        }
        dp[i] = dp[idxOfMaxLengthForPrevSequence] + 1;
    }

    console.log(dp);
    let maxLength = 0;
    for (let value of dp) {
        maxLength = Math.max(maxLength, value);
    }

    if (maxLength === 1) return nums.length;

    let nrOfMaximalLengthSeqs = 0;
    for (let value of dp) {
        if (value === maxLength - 1) {
            nrOfMaximalLengthSeqs++;
        }
    }

    return nrOfMaximalLengthSeqs;
}

console.log(findNumberOfLIS([1, 3, 5, 6, 4, 0,8]))
console.log(findNumberOfLIS([1, 2, 4, 3, 5, 4, 7, 2]))
console.log(findNumberOfLIS([3, 1, 2]))
console.log(findNumberOfLIS([2, 2, 2, 2, 2]))


