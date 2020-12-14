// https://leetcode.com/problems/minimum-window-substring/

function minWindow(s, t) {
    return minWindowCocio(s, t);
}

function minWindowCocio(s, t) {
    let ansStart = 0, ansEnd = s.length;
    let curStart = 0, curEnd = 0;
    let countCur = {}, countT = {};
    let remainingChars = 0;

    for (let char of t) {
        incrementCount(countT, char);
    }

    remainingChars = Object.keys(countT).length;

    for (curEnd = 0; curEnd < s.length; curEnd++) {
        incrementCount(countCur, s[curEnd]);
        if (countCur[s[curEnd]] === countT[s[curEnd]]) {
            remainingChars--;
        }

        // console.log(countCur, remainingChars, curStart, curEnd)

        if (remainingChars === 0) {
            while (curStart < curEnd && countCur[s[curStart]] > (countT[s[curStart]] || 0)) {
                countCur[s[curStart]]--;
                curStart++;
            }

            if (curEnd - curStart < ansEnd - ansStart) {
                ansStart = curStart;
                ansEnd = curEnd;
            }
        }

        // countCur[s[curStart]]--;
        // if(countCur[s[curStart]] === 0) remainingChars++;
        // curStart++;
    }

    if (remainingChars > 0) return "";

    return s.substring(ansStart, ansEnd + 1);
}

function minWindowMySol(s, t) {
    // Time: O(s.length * t.length)
    // Space: O(s.length)
    let p1 = 0, p2 = 0;
    let windowP1 = 0, windowP2 = 0;

    // Find first window
    let countP = {}, countT = getLetterCount(t);
    while (p1 < s.length && (t.indexOf(s[p1]) === -1)) {
        p1++;
    }
    countP[s[p1]] = 1;
    p2 = p1;

    while (p2 < s.length && !isConditionMet(countP, countT)) {
        p2++;
        incrementCount(countP, s[p2]);
    }

    if (p2 >= s.length) return "";
    windowP1 = p1;
    windowP2 = p2;
    // let window = s.substr(p1, p2 - p1 + 1);


    // Find a better window
    while (p2 < s.length) {
        // Optimize p1
        let optimizedP1 = p1;
        let substringLength = p2 - optimizedP1 + 1;
        while (isConditionMet(countP, countT) && substringLength >= t.length) {
            countP[s[optimizedP1]]--;
            optimizedP1++;
            substringLength = p2 - optimizedP1 + 1;
        }

        p1 = optimizedP1 - 1;
        incrementCount(countP, s[p1]);

        if (isConditionMet(countP, countT)) {
            let optimizedWindowLength = p2 - p1 + 1;
            let windowLength = windowP2 - windowP1 + 1;
            if (optimizedWindowLength < windowLength) {
                windowP1 = p1;
                windowP2 = p2;
            }
        }

        // Move window 1 step to the right
        countP[s[p1]]--;
        p1++;
        p2++;
        incrementCount(countP, s[p2]);
    }

    return s.substr(windowP1, windowP2 - windowP1 + 1);
}

function incrementCount(count, letter) {
    count[letter] = count[letter] ? count[letter] + 1 : 1;
}


function getLetterCount(s) {
    let count = {};
    for (let char of s) {
        count[char] = count[char] ? count[char] + 1 : 1;
    }
    return count;
}

function isConditionMet(countP, countT) {
    for (let char of Object.keys(countT)) {
        if (!countP[char] || countP[char] < countT[char]) return false;
    }

    return true;
}

console.log(minWindow("ADOBECODEBBANC", "ABC"))
// console.log(minWindow("ABCA", "BA"))
// console.log(minWindow("ABC", "B"))