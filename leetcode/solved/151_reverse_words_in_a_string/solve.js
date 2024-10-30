const reverseBuiltIn = (s) => {
    return s.split(" ").filter(token => {
        return token !== "";
    }).reverse();
}

// Time: O(n) * String concatentation
// Space: O(n)
const getWords = (s) => {
    let currentWord = "";
    const words = [];

    for (const letter of s) {
        if (letter !== " ") {
            currentWord += letter;
        } else {
            if (currentWord !== "") {
                words.push(currentWord);
                currentWord = "";
            }
        }
    }

    if (currentWord !== "") {
        words.push(currentWord);
    }

    return words;
}

// Time: O(n) * String concatentation
// Space: O(n)
const reverseWordsManual = (s) => {
    const words = getWords(s);
    let reversed = "";

    for (let i = words.length - 1; i >= 0; i--) {
        reversed += words[i];

        if (i > 0) {
            reversed += " ";
        }
    }

    return reversed;
}

const reverseWordsTwoPointers = (s) => {
    
}

const reverseWords = (s) => {
    // Option 1 (o_O)
    // return reverseBuiltIn(s);

    // Option 2
    return reverseWordsManual(s);

}

console.log(reverseWords("the sky is blue"));