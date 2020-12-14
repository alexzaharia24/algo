// https://leetcode.com/problems/sequential-digits/
function sequentialDigits(low, high) {
    // Time: O(nr of correct numbers) = O(number of correct numbers + some redundancies until we reach the first number >= low and one more redundancy for when we have number > high)+ O(generaeLowestForNrOfDigits) (which is maximum 10)
    // Space: O(number of correct numbers)
    // Correct number = a number with sequential digits: 0,1,2,3,4..., 12, 23, 34 ...
    // Idea: start with the first correct number. Then increment it with an incrementer which is 1 for 1 nr of digits, 11 for 2 digits and so on. This will jump from one correct number to the next: 1 + 1 = 2, 12 + 11 = 23 .... 
    //      If we need to add one more digit to the number, regenerate it to the first correct number with nrOfDigits+1 and increase the incrementer with 1 to the end
    let seqDigits = [];
    let nrOfDigits = getNumberOfDigits(low);

    let number = generateLowestForNrOfDigits(nrOfDigits);
    let incrementer = generateIncrementer(nrOfDigits);

    while (number <= high) {
        if (number >= low) {
            seqDigits.push(number);

        }
        if (number % 10 < 9) {
            number += incrementer;
        } else {
            // Add 1 more digit
            nrOfDigits++;
            number = generateLowestForNrOfDigits(nrOfDigits);
            incrementer = incrementer * 10 + 1;
        }
    }
    return seqDigits;
}

function generateLowestForNrOfDigits(nrOfDigits) {
    if (nrOfDigits === 1) return 0;
    let nr = 0;
    while (nrOfDigits > 0) {
        nr = nr * 10 + (nr % 10) + 1;
        nrOfDigits--;
    }
    return nr;
}

function generateIncrementer(nrOfDigits) {
    let incrementer = 0;
    while (nrOfDigits > 0) {
        incrementer = incrementer * 10 + 1;
        nrOfDigits--;
    }
    return incrementer;
}


function getNumberOfDigits(number) {
    let digits = 1;
    while (number >= 10) {
        number = parseInt(number / 10);
        digits++;
    }
    return digits;
}


function sequentialDigitsInitial(low, high) {
    let seqDigits = [];

    let firstDigit = getFirstDigit(low);

    let digits = [firstDigit];
    let number = digitsToNumber(digits);
    while (number < low && number < high) {
        digits.push(digits[digits.length - 1] + 1);
        number = digitsToNumber(digits);
    }

    let nrDigitsHigh = getNumberOfDigits;

    generate(low, high, digits, nrDigitsHigh, seqDigits);

    return seqDigits;
}

function generate(low, high, digits, nrDigitsHigh, seqDigits) {
    let number = digitsToNumber(digits);
    if (number >= low && number <= high) {
        seqDigits.push(number);
    }

    // // Case when we can add to end more digits
    // for ()


}

function digitsToNumber(digits) {
    let number = 0;
    for (let digit of digits) {
        number = number * 10 + digit;
    }
    return number;
}

function getFirstDigit(number) {
    while (number >= 10) {
        number = parseInt(number / 10);
    }
    return number;
}
