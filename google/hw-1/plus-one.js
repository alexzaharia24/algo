function solve(digits) {
    // O(n) time
    // O(1) space
    let idx = digits.length - 1;
    let remainder = 1, sum = 0;


    while(remainder > 0 && idx >= 0) {
        sum = digits[idx] + remainder;
        remainder = parseInt(sum / 10);
        digits[idx] = parseInt(sum % 10);
        idx--;
    }

    if(remainder > 0) {
        digits.unshift(1);
    }

    return digits;
}

console.log(solve([1,2,3]))
console.log(solve([1,2,9]))
console.log(solve([9,9]))
console.log(solve([9]))