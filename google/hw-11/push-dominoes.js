// https://leetcode.com/problems/push-dominoes/

function pushDominoes(dominoes) {
    return pushDominoesLinear(dominoes);
}

function pushDominoesLinear(dominoes) {
    // Time: O(n)
    // Space: O(n)
    // Idea: for each L and R compute how many '.' will be transformed to either L or R and change them as you go.
    // Technique: two pointers. 1 for domino to be modified, 1 for L or R domino in initial sequence
    let dominoIdx = 0;
    let leftRightArray = [];
    let dominoesArray = [...dominoes];
    for (let i = 0; i < dominoesArray.length; i++) {
        if (dominoesArray[i] === 'L' || dominoesArray[i] === 'R') {
            leftRightArray.push(i);
        }
    }

    for (let i = 0; i < leftRightArray.length; i++) {
        let idx = leftRightArray[i];
        let nextIdx = leftRightArray[i + 1];
        if (dominoesArray[idx] === 'L') {
            while (dominoIdx <= idx) {
                dominoesArray[dominoIdx++] = 'L';
            }
        } else {
            dominoIdx = idx;
            if (dominoesArray[nextIdx] === 'L') {
                let nrOfRights = (nextIdx - idx - 1) / 2;
                while (nrOfRights >= 0) {
                    dominoesArray[dominoIdx++] = 'R';
                    nrOfRights--;
                }
                if ((nextIdx - idx) % 2 === 0) {
                    // The middle domino will be '.' => skip it
                    dominoIdx++;
                }
            } else {
                let nrOfRights = (nextIdx - idx) || (dominoesArray.length-1 - dominoIdx);
                while (nrOfRights >= 0) {
                    dominoesArray[dominoIdx++] = 'R';
                    nrOfRights--;
                }
            }
        }
    }

    return dominoesArray.join("");
}

function pushDominoesBFS(dominoes) {
    // Time: O(n^2)
    // Space: O(n)
    let queue = [];
    let queueIdx = 0;
    let dominoesArray = [...dominoes];

    // Add to queue L and R elements
    for (let i = 0; i < dominoesArray.length; i++) {
        if (dominoesArray[i] === 'R' || dominoesArray[i] === 'L') {
            queue.push(i);
        }
    }

    while (queueIdx < queue.length) {
        let nextDominoes = [...dominoesArray]; // O(n) time to clone
        let size = queue.length - queueIdx;
        for (let i = 0; i < size; i++) {
            // Navigate on levels of iterations (1 second = 1 iteration)
            let idx = queue[queueIdx++]; // pop_front idx from queue
            if (dominoesArray[idx] === 'L') {
                if (dominoesArray[idx - 1] === '.') {
                    if (dominoesArray[idx - 2] !== 'R') {
                        nextDominoes[idx - 1] = 'L';
                        queue.push(idx - 1);
                    }
                }
            } else if (dominoesArray[idx] === 'R') {
                if (dominoesArray[idx + 1] === '.') {
                    if (dominoesArray[idx + 2] !== 'L') {
                        nextDominoes[idx + 1] = 'R';
                        queue.push(idx + 1);
                    }
                }
            }
        }

        dominoesArray = [...nextDominoes];
    }

    let resultString = "";
    for (let i = 0; i < dominoesArray.length; i++) {
        resultString += dominoesArray[i];
    }
    return resultString;
}

function pushDominoesBrute(dominoes) {
    // Time: O(n^2)
    // Space: O(n)
    let result = new Array(dominoes.length).fill();
    let done = false;
    while (!done) {
        done = true;
        for (let i = 0; i < dominoes.length; i++) {
            done = handlePiece(i, result, dominoes) && done;
        }
        dominoes = [...result]
    }
    // Construct string
    let resultString = "";
    for (let i = 0; i < result.length; i++) {
        resultString += result[i];
    }
    return resultString;
}

function handlePiece(idx, result, dominoes) {
    let char = dominoes[idx];
    let done = true;
    if (char === '.') {
        if (dominoes[idx - 1] === 'R' && dominoes[idx + 1] === 'L') {
            result[idx] = dominoes[idx];
        } else if (dominoes[idx - 1] === 'R') {
            result[idx] = 'R';
            done = false;
        } else if (dominoes[idx + 1] === 'L') {
            result[idx] = 'L';
            done = false;
        } else {
            result[idx] = dominoes[idx];
        }
    } else {
        result[idx] = dominoes[idx];
    }
    return done;
}

console.log(pushDominoes(".L.R...LR..L.."))
console.log(pushDominoes("RR.L"))
console.log(pushDominoes(".L.R."))