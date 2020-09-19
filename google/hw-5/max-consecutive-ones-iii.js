// https://leetcode.com/problems/max-consecutive-ones-iii/

function longestOnes(A, K) {
    // O(n) time
    // O(1) space
    let i = 0, j = 0, currentK = K;
    let maxLength = 0;

    while (j < A.length) {
        if (A[j] !== 0) {
            maxLength = Math.max(maxLength, j - i + 1);
            j++;
        }
        else if (A[j] === 0) {
            if(currentK > 0) {
                maxLength = Math.max(maxLength, j - i + 1);
                j++;
                currentK--;
            } else {
                if (A[i] === 0) {
                    if(K > 0 && currentK < K) currentK++;
                }
                if(i === j) j++;
                i++;
            }
        }
    }

    return maxLength;
}


console.log(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2))
console.log(longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3))
console.log(longestOnes([0,0,1,1,1,0,0], 0))