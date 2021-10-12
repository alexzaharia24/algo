// https://adventofcode.com/2020/day/6
function runPart1() {
    const fs = require('fs');
    const { EOL } = require('os');
    const data = fs.readFileSync('./data.in', { encoding: 'utf-8' });
    const answersPerGroup = data.split(EOL + EOL).map(group => group.split(EOL));

    let totalYeses = 0;

    for (let group of answersPerGroup) {
        let answers = new Array(26).fill(false);
        let yesCount = 0;
        let firstIdx = 'a'.charCodeAt(0);

        for (let personAnswers of group) {
            for (let answer of personAnswers) {
                let idx = answer.charCodeAt(0) - firstIdx;
                if (answers[idx] === false) {
                    answers[idx] = true;
                    yesCount++;
                }
            }
        }

        totalYeses += yesCount;
    }

    return totalYeses;
}

function runPart2() {
    const fs = require('fs');
    const { EOL } = require('os');
    const data = fs.readFileSync('./data.in', { encoding: 'utf-8' });
    const answersPerGroup = data.split(EOL + EOL).map(group => group.split(EOL));

    let totalYeses = 0;

    for (let group of answersPerGroup) {
        let answers = new Array(26).fill(0);
        let yesCount = 0;
        let firstIdx = 'a'.charCodeAt(0);

        for (let personAnswers of group) {
            for (let answer of personAnswers) {
                let idx = answer.charCodeAt(0) - firstIdx;
                answers[idx]++;
                if(answers[idx] === group.length) {
                    yesCount++;
                }
            }
        }

        totalYeses += yesCount;
    }

    return totalYeses;
}


console.log(runPart2());