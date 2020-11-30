const fs = require('fs');

const data = fs.readFileSync('input.in',
    { encoding: 'utf8', flag: 'r' });

let lines = data.split("\n");
for (let line of lines) {
    let tokens = line.split(",");
    let initialPrice = tokens[0];
    let buyNowPrice = tokens[1];
    let bidders = [];
    let bids = [];
    for (let i = 2; i < tokens.length; i += 2) {
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
    let boughtNow = false;
    if (buyNowPrice > 0 && bids[0] >= buyNowPrice) {
        boughtNow = true;
        currentPrices[0] = buyNowPrice;
    }
    for (let i = 1; i < bids.length; i++) {
        if (bids[i] > bids[highestBid]) {
            if (bidders[i] !== bidders[highestBid]) {
                // currentPrice = bids[highestBid] + 1;
                if (buyNowPrice > 0 && bids[i] >= buyNowPrice) {
                    currentPrices.push(bids[highestBid] + 1);
                    highestBidders.push(bidders[i]);
                    boughtNow = true;
                } else {
                    currentPrices.push(bids[highestBid] + 1);
                    highestBidders.push(bidders[i]);
                }
            }
            highestBid = i;

        } else if (bids[i] === bids[highestBid]) {
            // currentPrice = bids[highestBid];
            if(boughtNow) {
                currentPrices.push(buyNowPrice);
                highestBidders.push(bidders[highestBid]);
                break;
            } else {
                currentPrices.push(bids[highestBid]);
                highestBidders.push(bidders[highestBid]);
            }

        } else {
            if(boughtNow) {
                currentPrices.push(buyNowPrice);
            } else {
                currentPrices.push(bids[i] + 1);

            }
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
}