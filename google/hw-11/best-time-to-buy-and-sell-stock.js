// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

function maxProfit(prices) {
    // Time: O(n)
    // Space: O(1)
    if (prices.length === 0) return 0;

    let buyingPrice = prices[0];
    let mProfit = -Infinity;
    for (let i = 1; i < prices.length; i++) {
        let profit = prices[i] - buyingPrice;
        if (profit < 0) { // We found a better buying price
            buyingPrice = prices[i];
        } else {
            mProfit = Math.max(mProfit, profit);
        }
    }

    if(mProfit < 0) return 0;
    return mProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
// [-7, -1, ]