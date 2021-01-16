// https://leetcode.com/problems/binary-trees-with-factors/

function numFactoredBinaryTrees(arr) {
    // Time: O(N^2)
    // Space: O(N + NR_OF_FACTORS)
    arr.sort((a, b) => parseInt(a) - parseInt(b));
    
    let map = {};
    for(let elem of arr) {
        map[elem] = true;
    }

    
    // Obtain the number of trees having a certain root. Calculate using the nr of trees of its factors. 
    let nrOfTrees = {};
    for (let a of arr) {
        nrOfTrees[a] = 1;

        // let factorPairs = [];
        // for (let b of arr) {
        //     if (a !== b) {
        //         // Get factors for each number. Factors must be present in arr
        //         if (a % b === 0 && parseInt(a / b) in map) {
        //             factorPairs.push([b, parseInt(a / b)]);
        //         }
        //     }
        // }

        // for (let pair of factorPairs) {
        //     let count = nrOfTrees[pair[0]] * nrOfTrees[pair[1]];
        //     nrOfTrees[a]+= count;
        // }

        for (let b of arr) {
            if (a !== b) {
                // Get factors for each number. Factors must be present in arr
                if (a % b === 0 && parseInt(a / b) in map) {
                    let count = nrOfTrees[b] * nrOfTrees[parseInt(a / b)];
                    nrOfTrees[a]+= count;
                }
            }
        }
    }
    

    let totalNrOfTrees = 0;
    for(let a of arr) {
        totalNrOfTrees += nrOfTrees[a];
    }

    return totalNrOfTrees % (Math.pow(10,9) + 7);
}

// console.log(numFactoredBinaryTrees([2, 4, 5, 10]));
console.log(numFactoredBinaryTrees([46,144,5040,4488,544,380,4410,34,11,5,3063808,5550,34496,12,540,28,18,13,2,1056,32710656,31,91872,23,26,240,18720,33,49,4,38,37,1457,3,799,557568,32,1400,47,10,20774,1296,9,21,92928,8704,29,2162,22,1883700,49588,1078,36,44,352,546,19,523370496,476,24,6000,42,30,8,16262400,61600,41,24150,1968,7056,7,35,16,87,20,2730,11616,10912,690,150,25,6,14,1689120,43,3128,27,197472,45,15,585,21645,39,40,2205,17,48,136]));