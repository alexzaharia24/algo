const fs = require('fs');

const data = fs.readFileSync('input.in',
    { encoding: 'utf8', flag: 'r' });

let lines = data.split("\n");
for (let line of lines) {
    let tokens = line.split(",");
    // console.log(tokens);
    let initialPrice = tokens[0];
    let bidders = [];
    let bids = [];
    for (let i = 1; i < tokens.length; i += 2) {
        bidders.push(tokens[i])
        bids.push(parseInt(tokens[i + 1]))
    }

    let currentPrice = initialPrice;
    let highestBid = 0;
    for (let i = 1; i < bids.length; i++) {
        if (bids[i] > bids[highestBid]) {
            if (bidders[i] !== bidders[highestBid]) {
                currentPrice = bids[highestBid] + 1;
            }
            highestBid = i;

        } else if (bids[i] === bids[highestBid]) {
            currentPrice = bids[highestBid];
        } else {
            currentPrice = bids[i] + 1;
        }
    }
    // console.log(max);
    console.log(bidders[highestBid] + "," + currentPrice);
    console.log("----------------");
}