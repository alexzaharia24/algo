// https://leetcode.com/problems/binary-trees-with-factors/

function numFactoredBinaryTrees(arr) {
    // Time: O(N^2)
    // Space: O(N)
    arr.sort((a, b) => parseInt(a) - parseInt(b));

    let map = {};
    for (let elem of arr) {
        map[elem] = true;
    }

    let nrOfTrees = {};
    let modulo = Math.pow(10, 9) + 7;

    for (let a of arr) {
        nrOfTrees[a] = 1;

        for (let b of arr) {
            if (a !== b) {
                // Get factors for each number. Factors must be present in arr
                let factor = parseInt(a / b);
                if (a % b === 0 && factor in map) {
                    // Obtain the number of trees having a certain root. Calculate using the nr of trees of its factors. 
                    count = (nrOfTrees[b] * nrOfTrees[factor]) % modulo;

                    nrOfTrees[a] = (nrOfTrees[a] + count) % modulo;
                }
            }
        }
    }

    console.log(nrOfTrees);


    let totalNrOfTrees = 0;
    for (let a of arr) {
        totalNrOfTrees += nrOfTrees[a] % modulo;
    }


    return totalNrOfTrees % modulo;
}

// console.log(numFactoredBinaryTrees([2, 4, 5, 10]));
// console.log(numFactoredBinaryTrees([46,144,5040,4488,544,380,4410,34,11,5,3063808,5550,34496,12,540,28,18,13,2,1056,32710656,31,91872,23,26,240,18720,33,49,4,38,37,1457,3,799,557568,32,1400,47,10,20774,1296,9,21,92928,8704,29,2162,22,1883700,49588,1078,36,44,352,546,19,523370496,476,24,6000,42,30,8,16262400,61600,41,24150,1968,7056,7,35,16,87,20,2730,11616,10912,690,150,25,6,14,1689120,43,3128,27,197472,45,15,585,21645,39,40,2205,17,48,136]));

console.log(numFactoredBinaryTrees([2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608, 16777216, 33554432, 67108864, 134217728, 268435456, 536870912]));

// 2, 1
// 4, 2
// 8, 5
// 16, 1
// 32, 
// 64, 
// 128, 
// 256, 
// 512, 
// 1024, 
// 2048, 
// 4096, 
// 8192, 
// 16384, 
// 32768,
// 65536,
// 131072,
// 262144,
// 524288,
// 1048576,
// 2097152,
// 4194304,
// 8388608,
// 16777216,
// 33554432,
// 67108864,
// 134217728,
// 268435456,
// 536870912