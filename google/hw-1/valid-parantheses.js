

function solve_stupid_actually_not_solved(s) {
    let a = [], b = [], c = [];  // pop() and push() 
    for (let idx in s) {
        let char = s[idx];

        console.log("a: ", a)
        console.log("b: ", b)
        console.log("c: ", c)
        console.log("-----------")

        if (idx > 0) {
            if (
                (char === ")" && (b[b.length - 1] === "[" || c[c.length - 1] === "{")) ||
                (char === "]" && (a[a.length - 1] === "(" || c[c.length - 1] === "{")) ||
                (char === "}" && (a[a.length - 1] === "(" || b[b.length - 1] === "[")))
                return false;
        }

        if (char === "(") a.push(char);
        else if (char === ")") {
            if (a.length === 0) {
                return false;
            }

            a.pop();
        }
        if (char === "[") b.push(char);
        else if (char === "]") {
            if (b.length === 0) {
                return false;
            }
            b.pop();
        }
        if (char === "{") c.push(char);
        else if (char === "}") {
            if (c.length === 0) {
                return false;
            }
            c.pop();
        }
    }

    return a.length === 0 && b.length === 0 && c.length === 0;

}

function solve(s) {
    let stack = [];

    for (let char of s) {
        if (char === "(" || char === "[" || char === "{") { stack.push(char); }
        else {
            if (stack.length === 0) return false;
            if ((char === ")" && stack[stack.length - 1] === "(") ||
                (char === "]" && stack[stack.length - 1] === "[") ||
                (char === "}" && stack[stack.length - 1] === "{")) {
                stack.pop();
            } else {
                return false;
            }
        }

    }
    return stack.length === 0;
}
console.log(solve("[(([)])]"))

