async function run1() {
    const fs = require('fs');
    const readline = require('readline');

    const fileStream = fs.createReadStream('./data.in');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const it = rl[Symbol.asyncIterator]();

    let preambleCount = 25;
    let lineNr = 1;
    let queue = [], qIdx = 0;

    let line = await it.next();
    console.log("line: ", line);
    // Read preamble numbers
    while (!line.done) {
        queue.push(parseInt(line.value));
        // console.log(`Line ${lineNr}: ${line.value}`)
        lineNr++;
        if (lineNr > preambleCount) {
            break;
        }
        line = await it.next();
    }

    // Read numbers one by one
    line = await it.next();
    while (!line.done) {
        let number = parseInt(line.value);
        let verified = isSumOfTwoFrom(number, queue, qIdx);
        // console.log(`${number} is sum of two from ${queue.slice(qIdx)}`)
        if (verified) {
            queue.push(number);
            qIdx++;
        } else {
            console.log(`First error on line ${lineNr}: ${line.value}`)
            return number;
        }

        lineNr++;
        line = await it.next();
    }

    return -1;
}

function isSumOfTwoFrom(number, queue, qIdx) {
    let map = new Map();
    for (let i = qIdx; i < queue.length; i++) {
        map.set(queue[i], i);
    }

    for (let i = qIdx; i < queue.length; i++) {
        let idx = map.get(number - queue[i]);
        if (idx != null && idx !== i) {
            return true;
        }
    }
    return false;
}

function run2() {
    const fs = require('fs');
    const { EOL } = require('os');
    const data = fs.readFileSync('./data.in', { encoding: 'utf-8' });
    const lines = data.split(EOL);

    let preambleCount = 25;
    let error = getXmasError(lines, preambleCount);
    let sequence = getContiguousSequenceWithSlidingWindow(error, lines);
    console.log(sequence);

    let min = Math.min(...sequence);
    let max = Math.max(...sequence);

    return min + max;
}

function getXmasError(lines, preambleCount) {
    let queue = [], qIdx = 0;
    for (let i = 0; i < preambleCount; i++) {
        queue.push(parseInt(lines[i]));
    }

    // Read numbers one by one
    for (let i = preambleCount; i < lines.length; i++) {
        let number = parseInt(lines[i]);
        let verified = isSumOfTwoFrom(number, queue, qIdx);
        if (verified) {
            queue.push(number);
            qIdx++;
        } else {
            console.log(`First error on line ${i + 1}: ${lines[i]}`)
            return number;
        }
    }

    return -1;
}

// Time: O(N^2), Space: O(N)
function getContiguousSequenceWithSumBrute(number, lines) {
    for (let i = 0; i < lines.length; i++) {
        let sum = 0;
        let sequence = [];
        for (let j = i; j < lines.length && sum < number; j++) {
            let value = parseInt(lines[j]);
            sum += parseInt(value);
            sequence.push(value);
        }
        if (sum === number) {
            return sequence;
        }
    }

    return [];
}


// Time: O(N), Space: O(N)
function getContiguousSequenceWithSlidingWindow(number, lines) {
    let sum = 0;
    let sequence = [];
    for (let i = 0; i < lines.length; i++) {
        if (parseInt(lines[i]) === number) {
            sum = 0;
            sequence = [];
            continue;
        }
        while (i < lines.length && sum < number) {
            sum += parseInt(lines[i]);
            sequence.push(parseInt(lines[i]));
            // console.log(' ', sequence, sum);
            if(sum < number) {
                i++;
            }
        }
        if (sum === number) {
            break;
        }
        // console.log(sequence, sum);
        while (sum > number) {
            sum -= sequence[0];
            sequence.splice(0, 1);
            // console.log(' ', sequence, sum);
        }
        // console.log(sequence, sum);
    }

    return sequence;
}


// run1().then(result => console.log(result));
console.log(run2());
