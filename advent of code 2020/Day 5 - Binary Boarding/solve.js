function getSeatIdFromBinarySpacePartitioning(partitioning) {
    // partitioning of type: BFFFBBFRRL
    // returns the seat ID
    // min is 0, max is 127*8+7 = 1023
    if (partitioning.length !== 10) return -1;
    let row = -1, col = -1, seatId = -1;
    let left = 0, right = 127, middle = parseInt((left + right) / 2);

    // search for row
    // min 0, max 127
    for (let i = 0; i < 7; i++) {
        // find the row
        if (partitioning[i] === "F") {
            // first half
            right = middle;
        } else if (partitioning[i] === "B") {
            // second half
            left = middle + 1;
        } else {
            throw new Error("Invalid row partitioning letter: ", partitioning[i]);
        }
        middle = parseInt((left + right) / 2);
    }
    row = middle;

    // search for col
    // min 0, max 7
    left = 0, right = 7, middle = 3;
    for (let i = 7; i < 10; i++) {
        if (partitioning[i] === "L") {
            right = middle;
        } else if (partitioning[i] === "R") {
            left = middle + 1;
        } else {
            throw new Error("Invalid col partitioning letter: ", partitioning[i]);
        }

        middle = parseInt((left + right) / 2);
    }
    col = middle;

    seatId = row * 8 + col;
    if (seatId < 0 || seatId > 1023) {
        throw new Error("Invalid seat id ", seatId);
    }

    return seatId;
}

function getMaxSeatId(binaryPartitionings) {
    let max = 0;
    for (let partitioning of binaryPartitionings) {
        let seatId = getSeatIdFromBinarySpacePartitioning(partitioning);
    }
    return max;
}

function getYourSeatId(binaryPartitionings) {
    let isSeatPresent = new Array(1024).fill(false);
    for (let partitioning of binaryPartitionings) {
        let seatId = getSeatIdFromBinarySpacePartitioning(partitioning);
        isSeatPresent[seatId] = true;
    }
    for (let i = 1; i < isSeatPresent.length; i++) {
        if(isSeatPresent[i-1] === true && isSeatPresent[i] === false) {
            return i;
        }
    }
}

function run() {
    const fs = require('fs');
    const { EOL } = require('os');
    const data = fs.readFileSync('./data.in', { encoding: 'utf-8' });
    const lines = data.split(EOL);
    console.log(lines);
    // console.log(getYourSeatId(lines));
}

run();

module.exports = {
    getSeatIdFromBinarySpacePartitioning
}