// https://leetcode.com/problems/number-of-longest-increasing-subsequence/


function findNumberOfLIS(nums) {
    // dp[i][j] = nr of seqs up to element n position i with length j
    // dp[i][j] = dp[i-1][j-1]
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

    if(maxLength === 1) return nums.length; 

    let nrOfMaximalLengthSeqs = 0;
    for(let value of dp) {
        if(value === maxLength -1) {
            nrOfMaximalLengthSeqs++;
        }
    }

    return nrOfMaximalLengthSeqs;
}

// console.log(findNumberOfLIS([1, 3, 5, 4, 0, 7]))
console.log(findNumberOfLIS([1,2,4,3,5,4,7,2]))


