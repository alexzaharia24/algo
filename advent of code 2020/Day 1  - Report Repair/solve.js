const fs = require('fs');
let data = fs.readFileSync("./data.in", { encoding: "utf-8" });
// console.log(data);
let numbers = data.split("\n").map(line => {
    return parseInt(line);
})

console.log(numbers);

function twoSum(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        for (j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === target) {
                return [numbers[i], numbers[j]];
            }
        }
    }
    return [-1, -1];
}

function twoSumHashMap(numbers, target) {
    let map = new Map();
    for (let i = 0; i < numbers.length; i++) {
        map.set(numbers[i], i);
    }
    for (let i = 0; i < numbers.length; i++) {
        if (map.get(target - numbers[i]) != null) {
            return [numbers[i], target - numbers[i]];
        }
    }
    return [-1, -1];
}

function threeSum(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        let otherTwo = twoSumHashMap(numbers.slice(i + 1), target - numbers[i]);
        if (otherTwo[0] !== -1) {
            return [numbers[i], ...otherTwo];
        }
    }
    return [-1, -1, -1];
}

function threeSumHashMap(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        let otherTwo = twoSum(numbers.slice(i + 1), target - numbers[i]);
        if (otherTwo[0] !== -1) {
            return [numbers[i], ...otherTwo];
        }
    }
    return [-1, -1, -1];
}



// Part 1
// let sumResult = twoSumHashMap(numbers, 2020);
// console.log("Numbers:", sumResult);
// console.log("Product: ", sumResult[0] * sumResult[1]);

// Part 2
let sumResult = threeSumHashMap(numbers, 2020);
console.log("Numbers:", sumResult);
console.log("Product: ", sumResult[0] * sumResult[1] * sumResult[2]);