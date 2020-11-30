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

    let currentPrices = [];

    // let currentPrices = initialPrice;
    currentPrices.push(initialPrice);
    let highestBidders = [];
    highestBidders.push("-");
    let highestBid = 0;
    currentPrices.push(initialPrice);
    highestBidders.push(bidders[0]);
    for (let i = 1; i < bids.length; i++) {
        // if(bids[i] === currentPrices[currentPrices.length - 1]) {
        //     continue;
        // }
        if (bids[i] > bids[highestBid]) {
            if (bidders[i] !== bidders[highestBid]) {
                // currentPrice = bids[highestBid] + 1;
                currentPrices.push(bids[highestBid] + 1);
                highestBidders.push(bidders[i]);
            }
            highestBid = i;

        } else if (bids[i] === bids[highestBid]) {
            // currentPrice = bids[highestBid];
            currentPrices.push(bids[highestBid]);
            highestBidders.push(bidders[highestBid]);
        } else {
            // currentPrice = bids[i] + 1;
            currentPrices.push(bids[i] + 1);
            highestBidders.push(bidders[highestBid]);
        }
    }

    let history = "";
    for (let i = 0; i < currentPrices.length; i++) {
        history += highestBidders[i] + "," + currentPrices[i];
        if (i < currentPrices.length - 1) {
            history += ",";
        }
    }
    console.log(history);

    // console.log(max);
    // console.log(bidders[highestBid] + "," + currentPrice);
    // console.log("----------------");
}