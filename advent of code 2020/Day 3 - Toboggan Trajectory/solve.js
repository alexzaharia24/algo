const fs = require('fs');
let data = fs.readFileSync("./data.in", { encoding: "utf-8" });
// console.log(data);
let lines = data.split("\n");

// Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?
function countTreesOnSlope(right, down) {
    let nrOfTrees = 0;
    if (lines.length == 0 || lines[0].length == 0) return 0;
    let rows = lines.length, cols = lines[0].length;

    let i = 0, j = 0;
    while (i < rows) {
        // go right 3
        j = (j + right) % (cols - 1);
        i += down;
        if (i < rows && lines[i][j] === "#") {
            // console.log(i, j, lines[i][j]);
            nrOfTrees++;
        }
    }

    return nrOfTrees;
}

function countTreesOnSlopePartTwo() {
    return countTreesOnSlope(1,1) *
    countTreesOnSlope(3,1) *
    countTreesOnSlope(5,1) *
    countTreesOnSlope(7,1) *
    countTreesOnSlope(1,2);
}

console.log(countTreesOnSlopePartTwo());