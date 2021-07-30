// a^3 + b^2 = c^3 + d^3 => what are a,b,c,d ?
// a,b,c,d from 1 to N


const N = 3;

// Brute O(N^4)
const sol1 = () => {
    for (let a = 1; a <= N; a++) {
        for (let b = 1; b <= N; b++) {
            for (let c = 1; c <= N; c++) {
                for (let d = 1; d <= N; d++) {
                    if (Math.pow(a, 3) + Math.pow(b, 3) === Math.pow(c, 3) + Math.pow(d, 3)) {
                        console.log(`${a}^3 + ${b}^3 = ${c}^3 + ${d}^3`)
                        break;
                    }
                }
            }
        }
    }
}


// O(1) for D computing => O(N^3)
const sol2 = () => {
    for (let a = 1; a <= N; a++) {
        for (let b = 1; b <= N; b++) {
            for (let c = 1; c <= N; c++) {
                let d = parseInt(Math.pow(Math.pow(a, 3) + Math.pow(b, 3) - Math.pow(c, 3), 1 / 3));
                if (Math.pow(a, 3) + Math.pow(b, 3) === Math.pow(c, 3) + Math.pow(d, 3)) {
                    console.log(`${a}^3 + ${b}^3 = ${c}^3 + ${d}^3`)
                    break;
                }
            }
        }
    }
}

// Save pairs of (c,d) sums in hashtable
const sol3 = () => {
    let map = {};
    for (let c = 1; c <= N; c++) {
        for (let d = 1; d <= N; d++) {
            let sum = Math.pow(c, 3) + Math.pow(d, 3);
            if (!map[sum]) {
                map[sum] = [];
            }
            map[sum].push({ first: c, second: d });
        }
    }

    // for (let a = 1; a <= N; a++) {
    //     for (let b = 1; b <= N; b++) {
    //         let sum = Math.pow(a, 3) + Math.pow(b, 3);
    //         if (map[sum]) {
    //             for (let pair of map[sum]) {
    //                 console.log(`${a}^3 + ${b}^3 = ${pair.first}^3 + ${pair.second}^3`)
    //             }
    //         }
    //     }
    // }

    for (let sum of Object.keys(map)) {
        let pairs = map[sum];
        for (let pair1 of pairs) {
            for (let pair2 of pairs) {
                console.log(`${pair1.first}^3 + ${pair1.second}^3 = ${pair2.first}^3 + ${pair2.second}^3`)
            }
        }
    }
}

sol3();