// Print permutations of a string
function permute(string, prefix) {
    console.log(string + " " + prefix)
    if (string.length === 0) {
        console.log("----- " + prefix);
        return;
    }
    for (let i = 0; i < string.length; i++) {
        let newString = string.substr(0, i) + string.substr(i+1); 
        let newPrefix = prefix + string.substr(i,1);
        permute(newString, newPrefix);
    }
}

permute("abc", "");