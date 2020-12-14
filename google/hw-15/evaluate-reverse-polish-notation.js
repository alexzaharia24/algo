// https://leetcode.com/problems/evaluate-reverse-polish-notation/

function evalRPN(tokens) {
    return withStack(tokens);
}

/**
 * Use a stack to store intermediary results. Add an element to the stack if it is a number, or add results of expression evaluation if the element is an operation sign.
 * @param {*} tokens 
 */
function withStack(tokens) {
    let stack = [];
    for (let token of tokens) {
        let number = parseInt(token);
        if (Number.isInteger(number)) {
            stack.push(number);
        } else {
            let rightOperand = parseInt(stack.pop());
            let leftOperand = parseInt(stack.pop());

            stack.push(evaluateOperation(leftOperand, rightOperand, token));
        }
    }

    return stack.pop();
}

function evaluate(i, tokens) {
    /*  evaluate(i) = [value of expression starting at index i, last visited index (globally)]
        evaluate(i) = {
            tokens[i] if tokens[i] is a number
            evaluate(i-1) operation evaluate(index of left operand = next index after right operand recursion) if tokens[i-1] is operation
        }
    */
    let number = parseInt(tokens[i]);
    if (Number.isInteger(number)) {
        return [number, i];
    }

    let right = evaluate(i - 1, tokens);
    let left = evaluate(right[1] - 1, tokens);


    return [evaluateOperation(left[0], right[0], tokens[i]), i];
}

function evaluateOperation(a, b, operation) {
    switch (operation) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return parseInt(a / b);
        default:
            return null;
    }
}

console.log(evalRPN(["2", "1", "+", "3", "*"]))
console.log(evalRPN(["4", "13", "5", "/", "+"]))
console.log(evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]))
