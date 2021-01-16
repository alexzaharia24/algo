let idx = 0;
let digitMap = {
    "0": true, "1": true, "2": true, "3": true, "4": true, "5": true, "6": true, "7": true, "8": true, "9": true,
}


function decodeString(s) {
    // Time: O(Max number of chars) = O(300^9 * 99) time
    console.log(idx)

    if (idx >= s.length) return "";
    let decoded = "";

    while (idx < s.length) {
        let repeat = 0;
        let toRepeat = "";

        while (isDigit(s[idx])) {
            repeat = repeat * 10 + parseInt(s[idx]);
            idx++;
        }

        // console.log(`r1 ${repeat}`);
        if (s[idx] === "[") {
            idx++;
            toRepeat = decodeString(s);
        }
        // console.log(`r2 ${repeat}`);


        if (repeat > 0 && toRepeat !== "") {
            for (let i = 0; i < repeat; i++) {
                decoded += toRepeat;
            }
        }


        while (idx < s.length && s[idx] !== "[" && s[idx] !== "]" && !isDigit(s[idx])) {
            decoded += s[idx];
            idx++;
        }

        // console.log(repeat, toRepeat, decoded);

        if (s[idx] === "]") {
            idx++;
            return decoded;
        }
    }
    return decoded;
}

function recur(s, idx) {
    
}


function isDigit(s) {
    return digitMap[s] === true;
}

console.log(decodeString("2[a2[x4[y]]bc]3[cd]ef"))