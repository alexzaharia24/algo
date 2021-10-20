// a, b, c, a, f, c, b, b

// i = 7
// j = 8
// c = 1
// gC = 4
// {b}

function lengthOfLongestSubstring(s) {
    if (s.length <= 1) return s.length;
    let count = 0, maxCount = 0, first = 0, second = 0;
    let map = new Map();
    while (second < s.length) {
        while (map.get(s[second])) {
            map.delete(s[first]);
            first++;
            count--;
        }
        map.set(s[second], true);
        count++;
        maxCount = Math.max(count, maxCount);
        second++;
    }

    return maxCount;
}

// p w w k e w
//  second = 6, first = 2, map = {k,e,w}, count = 3, maxCount = 3 

console.log(lengthOfLongestSubstring("pwwkew"));;
