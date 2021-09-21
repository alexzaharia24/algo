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

function threeSum(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        for (j = i + 1; j < numbers.length; j++) {
            for (k = j + 1; k < numbers.length; k++) {
                if (numbers[i] + numbers[j] + numbers[k] === target) {
                    return [numbers[i], numbers[j], numbers[k]];
                }
            }
        }
    }
    return [-1, -1, -1];
}



let sumResult = twoSum(numbers, 2020);
console.log("Numbers:", sumResult);
console.log("Product: ", sumResult[0] * sumResult[1] * sumResult[2]);