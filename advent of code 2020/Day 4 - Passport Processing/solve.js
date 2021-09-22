const fs = require('fs');
let data = fs.readFileSync("./data.in", { encoding: "utf-8" });
// console.log(data);
let lines = data.split("\r\n");

let requiredFields = {
    byr: validateByr,
    iyr: validateIyr,
    eyr: validateEyr,
    hgt: validateHgt,
    hcl: validateHcl,
    ecl: validateEcl,
    pid: validatePid
}

function validateByr(value) {
    let reg = new RegExp('[0-9]{4}');
    return reg.test(value) && value >= 1920 && value <= 2002;
}

function validateIyr(value) {
    let reg = new RegExp('[0-9]{4}');
    return reg.test(value) && value >= 2010 && value <= 2020;
}

function validateEyr(value) {
    let reg = new RegExp('[0-9]{4}');
    return reg.test(value) && value >= 2020 && value <= 2030;
}

function validateHgt(value) {
    let reg = new RegExp('[0-9]+(?:cm|in)');
    if(!reg.test(value)) return false;
    let number = value.substring(0, value.length-2);
    let measure = value.substring(value.length-2);
    switch(measure) {
        case "cm":
            return number >= 150 && number <= 193;
        case "in": 
            return number >= 59 && number <= 76;
        default:
            return false;
    }
}

function validateHcl(value) {
    let reg = new RegExp('#[0-9a-f]{6}');
    return reg.test(value);
}

function validateEcl(value) {
    let reg = new RegExp('amb|blu|brn|gry|grn|hzl|oth');
    return reg.test(value);
}

function validatePid(value) {
    let reg = new RegExp('[0-9]{9}', 'g');
    return value.length === 9 && reg.test(value);
}

let nrOfRequiredFields = Object.keys(requiredFields).length;

function isEmptyLine(line) {
    return line.length === 0;
}

function countValidPassports() {
    let nrOfValidPassports = 0;

    for (let idx = 0; idx < lines.length; idx++) {  
        let presentRequiredFields = 0;
        while(idx < lines.length && !isEmptyLine(lines[idx])) {
            // console.log(lines[idx]);
            let fields = lines[idx].split(" ");
            for(let field of fields) {
                let fieldProperties = field.split(":");
                let fieldName = fieldProperties[0];
                if(requiredFields[fieldName] != null) { 
                    presentRequiredFields++;
                }
                // console.log(fieldProperties, presentRequiredFields)
            }
            idx++;
        }
        // console.log(" ----- ")
        if(presentRequiredFields === nrOfRequiredFields) {
            nrOfValidPassports++;
        }
    }

    return nrOfValidPassports;
}

function countValidPassportsPartTwo() {
    let nrOfValidPassports = 0;

    for (let idx = 0; idx < lines.length; idx++) {  
        let presentRequiredFields = 0;
        while(idx < lines.length && !isEmptyLine(lines[idx])) {
            let fields = lines[idx].split(" ");
            for(let field of fields) {
                let fieldProperties = field.split(":");
                let fieldName = fieldProperties[0];
                let fieldValue = fieldProperties[1];
                if(requiredFields[fieldName] != null && requiredFields[fieldName](fieldValue)) { 
                    presentRequiredFields++;
                }
            }
            idx++;
        }
        if(presentRequiredFields === nrOfRequiredFields) {
            nrOfValidPassports++;
        }
    }

    return nrOfValidPassports;
}


console.log(countValidPassportsPartTwo());