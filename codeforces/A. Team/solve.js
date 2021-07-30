var n = parseInt(readline());
var nrOfSolves = 0;
for(var i=0; i<n;i++) {
    var nrOfKnows = readline().split(" ")
        .map(token => token === "1")
        .reduce((prev, current) => {return prev + (current ? 1 : 0)}, 0);
    var canSolve = nrOfKnows >= 2;
    if(canSolve) nrOfSolves++;
}
print(nrOfSolves);