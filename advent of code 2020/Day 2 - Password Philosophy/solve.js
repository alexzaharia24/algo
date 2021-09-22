const fs = require('fs');
let data = fs.readFileSync("./data.in", { encoding: "utf-8" });
// console.log(data);
let lines = data.split("\n");

let requiredFields = {
    byr: true,
    iyr: true,
    eyr: true,
    hgt: true,
    hcl: true,
    ecl: true,
    pid: true,
    cid: true,
}

function countValidPassports() {
    let nrOfValidPassports = 0;

    for (let line of lines) {
        if(line === "") console.log("Empty");
        else {console.log(line)}
    }

    return nrOfValidPassports;
}


console.log(countValidPassports());