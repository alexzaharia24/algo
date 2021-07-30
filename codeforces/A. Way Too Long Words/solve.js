var n = parseInt(readline());
for(var i=0; i<n; i++) {
    var word = readline();
    var shortWord = word;
    if(word.length > 10) {
        shortWord = word.charAt(0) + (word.length - 2) + word.charAt(word.length-1);
    }

    print(shortWord);
}