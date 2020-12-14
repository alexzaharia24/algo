// https://leetcode.com/problems/letter-combinations-of-a-phone-number/

function letterCombinations(digits) {
    // Time: exponential
    // Space: exponential
    let mapping = {
        '2': ['a','b','c'],
        '3': ['d','e','f'],
        '4': ['g','h','i'],
        '5': ['j','k','l'],
        '6': ['m','n','o'],
        '7': ['p','q','r', 's'],
        '8': ['t','u','v'],
        '9': ['w','x','y', 'z']
    }

    if(digits.length === 0) return [];
    let combinations = [];
    generate(digits, mapping, [], combinations);
    return combinations;
}

function generate(digits, mapping, combination, combinations) {
    if(combination.length === digits.length) {
        combinations.push(combination.join(""));
        return;
    }

    let digit = digits[combination.length];
    for(let letter of mapping[digit]) {
        combination.push(letter);
        generate(digits, mapping, combination, combinations);
        combination.pop();
    }
}

console.log(letterCombinations('23'));