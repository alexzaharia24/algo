// Time: O(max(n,m))
// Space: O(1)
const isDividingManual = (divisor, dividend) => {
    let currentIdx = 0;

    for (let i = 0; i <= dividend.length - 1; i++) {
        if (dividend[i] !== divisor[currentIdx]) {
            return false;
        }

        currentIdx = (currentIdx + 1) % divisor.length;
    }

    return currentIdx === 0; // This means that the prefix was used entirely every time
}

// Time: O(dividend.length)
const isDividingSimpler = (divisor, dividend) => {
    if (dividend.length % divisor.length !== 0) {
        return false;
    }

    const factor = Math.floor(dividend.length / divisor.length);
    let candidate = "";

    for (let i = 1; i <= factor; i++) {
        candidate += divisor;
    }

    return candidate === dividend;
}

const isDividing = (divisor, dividend) => {
    return isDividingSimpler(divisor, dividend);
}

// Time: O(n*m)
// Space: O(min(n,m))
const gcdOfStringsIncreasing = (str1, str2) => {
    const shortest = str1.length > str2.length ? str2 : str1;

    let prefix = "";
    let longestPrefix = "";

    for (let i = 0; i < shortest.length; i++) {
        prefix += shortest[i];

        if (isDividing(prefix, str1) && isDividing(prefix, str2)) {
            longestPrefix = prefix;
        }
    }

    return longestPrefix;
}

const gcdOfStringsDecreasing = (str1, str2) => {
    const shortest = str1.length > str2.length ? str2 : str1;

    for (let i = shortest.length - 1; i >= 0; i--) {
        const prefix = shortest.slice(0, i+1);

        if (isDividing(prefix, str1) && isDividing(prefix, str2)) {
            return prefix;
        }
    }

    return "";
}

const gcdOfStrings = (str1, str2) => {
    // Option 1 - Start with min prefix length
    // return gcdOfStringsIncreasing(str1, str2);

    // Option 2 - Start with max prefix length
    return gcdOfStringsDecreasing(str1, str2);
}

console.log(gcdOfStrings("ABAB", "ABABABAB"));
console.log(gcdOfStrings("ABC", "ABCABC"));
console.log(isDividing("ABAB", "ABABABAB"));