function run1() {
    const fs = require('fs');
    const { EOL } = require('os');
    const data = fs.readFileSync('./data.in', { encoding: 'utf-8' });

    const lines = data.split(EOL);
    let executedInstructions = new Map(); // line nr of instruction -> true

    let executionResult = executeProgram(lines);

    return executionResult.state;
}

function executeInstruction(state, lineNumber, lines, executedInstructions) {
    // returns a new state and the next instruction line {state, nextLine}
    // state is the accumulator
    // if the program ended then lineNumber is -1
    if (executedInstructions.get(lineNumber)) {
        return { state, nextLine: Infinity };
    }

    if (lineNumber === lines.length) {
        return { state, nextLine: -1 }; // program successfully finished
    }

    let { instructionType, sign, number } = getInstructionFromLine(lines[lineNumber]);

    let accumulator = state;
    let nextLine = lineNumber + 1;

    // console.log(" ", instructionType, sign, number);

    // console.log(`'${instructionType}'`)
    switch (instructionType) {
        case "acc":
            switch (sign) {
                case "+":
                    accumulator += number;
                    break;
                case "-":
                    accumulator -= number;
                    break;
                default:
                    throw new Error("Wrong sign: ", sign);
            }
            break;
        case "nop":
            break;
        case "jmp":
            switch (sign) {
                case "+":
                    if (lineNumber + number > lines.length) {
                        throw new Error(`"Jmp leads to out of bounds instruction: ${lineNumber}, ${sign}, ${number}`);
                    }
                    nextLine = lineNumber + number;
                    break;
                case "-":
                    if (lineNumber - number < 0) {
                        throw new Error(`"Jmp leads to out of bounds instruction: ${lineNumber}, ${sign}, ${number}`);
                    }
                    nextLine = lineNumber - number;
                    break;
                default:
                    throw new Error("Wrong sign: ", sign);
            }
            break;
        default:
            throw new Error("Wrong instruction: ", instructionType)
    }

    executedInstructions.set(lineNumber, true);

    return { state: accumulator, nextLine }
}

function getInstructionFromLine(line) {
    let instructionTokens = line.split(" ");
    let instructionType = instructionTokens[0];
    let sign = instructionTokens[1][0];
    let number = parseInt(instructionTokens[1].substring(1));

    return { instructionType, sign, number };
}

function getLineFromInstruction(instruction) {
    return instruction.instructionType + " " + instruction.sign + instruction.number;
}


function run2() {
    const fs = require('fs');
    const { EOL } = require('os');
    const data = fs.readFileSync('./data.in', { encoding: 'utf-8' });

    const lines = data.split(EOL);

    for (let idx = 0; idx < lines.length; idx++) {
        let instruction = getInstructionFromLine(lines[idx]);
        if (instruction.instructionType !== 'acc') {
            console.log('Instruction from line: ', lines[idx], instruction);
            instruction.instructionType === 'nop' ? instruction.instructionType = 'jmp' : instruction.instructionType = 'nop';
            let line = getLineFromInstruction(instruction);
            // console.log('Line from instruction: ', instruction, line);
            let originalLine = lines[idx];
            lines[idx] = line;
            try {
                let result = executeProgram(lines);
                console.log("Result: ", result);
                if (result.nextLine === -1) {
                    // program finished successfully
                    console.log(`Modified '${originalLine}' to '${line}' at line ${idx}`);
                    return result.state;
                }
                lines[idx] = originalLine;
            } catch (e) {
                console.log(e);
            }
        }
    }

    return executionResult.state;
}

function executeProgram(lines) {
    let executedInstructions = new Map(); // line nr of instruction -> true
    let executionResult = { state: 0, nextLine: 0 };

    do {
        executionResult = executeInstruction(executionResult.state, executionResult.nextLine, lines, executedInstructions);
    } while (executionResult.nextLine !== Infinity && executionResult.nextLine !== -1);

    return executionResult;
}



console.log(run2());