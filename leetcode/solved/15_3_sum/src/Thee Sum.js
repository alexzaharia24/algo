function twoSumHashMap(numbers, target) {
    let map = new Map();
    let result = new Map();
    for (let i = 0; i < numbers.length; i++) {
        map.set(numbers[i], i);
    }
    for (let i = 0; i < numbers.length; i++) {
        if (map.get(target - numbers[i]) != null) {
            result.set([numbers[i], target - numbers[i]].sort().toString(), [numbers[i], target - numbers[i]]);
        }
    }
    return result;
}

function threeSum(numbers, target) {
    let result = new Map();
    for (let i = 0; i < numbers.length; i++) {
        let otherTwo = twoSumHashMap(numbers.slice(i + 1), target - numbers[i]);
        // console.log(numbers[i], otherTwo);
        if (otherTwo.size > 0) {
            otherTwo.forEach(value => {
                let triplet = [numbers[i], ...value].sort();
                result.set(triplet.toString(), triplet);
            })
        }
        // console.log(result);
    }

    let resultList = [];
    result.forEach(triplet => {
        resultList.push(triplet);
    })

    return resultList;
}

function threeSumWithDuplicates(numbers, target) {
    let map = new Map();
    let result = [];
    for (let i = 0; i < numbers.length; i++) {
        map.set(numbers[i], i);
    }
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            let idx = map.get(target - (numbers[i] + numbers[j]));
            if (idx != null) {
                result.push([numbers[i], numbers[j], numbers[idx]]);
            }
        }
    }

    return result;
}

function threeSumNoDuplicates(numbers, target) {
    let map = new Map();
    let resultMap = new Map();
    for (let i = 0; i < numbers.length; i++) {
        map.set(numbers[i], i);
    }
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            let idx = map.get(target - (numbers[i] + numbers[j]));
            if (idx != null && idx > j) {
                let triplet = [numbers[i], numbers[j], numbers[idx]].sort();
                resultMap.set(triplet.toString(), triplet);
            }
        }
    }

    let result = [];
    resultMap.forEach(triplet => {
        result.push(triplet);
    })
    return result;
}

// Time: O(N^2)
// Space: O(N)
function threeSum0WithHashMap(numbers) {
    let map = new Map();
    let resultMap = new Map();
    for (let i = 0; i < numbers.length; i++) {
        map.set(numbers[i], i);
    }
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            let idx = map.get(-(numbers[i] + numbers[j]));
            if (idx != null && idx > j) {
                let triplet = [numbers[i], numbers[j], numbers[idx]].sort();
                resultMap.set(triplet.toString(), triplet);
            }
        }
    }

    let result = [];
    resultMap.forEach(triplet => {
        result.push(triplet);
    })
    return result;
}

// Time: O(N^2)
// Space: O(1), extra O(N) for result
function threeSum0WithPointers(numbers) {
    numbers.sort((a, b) => parseInt(a) - parseInt(b));
    let result = [];

    // console.log(numbers);
    for (let i = 0; i < numbers.length; i++) {
        // Fix numbers[i] and find x = -(numbers[left] + numbers[right]) = numbers[i]
        let left = i + 1, right = numbers.length - 1;

        // Avoid duplicates. Since sorted => next to each other
        if (i === 0 || numbers[i] !== numbers[i - 1]) {
            while (left < right) {
                let x = -(numbers[left] + numbers[right]);
                if (x === numbers[i]) {
                    let triplet = [numbers[i], numbers[left], numbers[right]].sort((a, b) => parseInt(a) - parseInt(b));
                    left++; right--;
                    result.push(triplet);
                    // Avoid duplicates
                    while (left < right && numbers[left] === numbers[left - 1]) {
                        left++;
                    }
                }
                else if (x < numbers[i]) {
                    right--;
                } else {
                    left++;
                }
            }
        }
    }

    return result;
}

console.log(threeSum0WithPointers([-1, 0, 1, 2, -1, -4]))
// console.log(threeSum0WithPointers([3,0,-2,-1,1,2]))


