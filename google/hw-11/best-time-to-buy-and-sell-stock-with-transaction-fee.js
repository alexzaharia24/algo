// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/

function maxProfit(prices, fee) {
    if (prices.length === 0) return 0;
    let buyingPrice = prices[0];
    let totalProfit = 0;
    for (let i = 1; i < prices.length; i++) {
        let profit = prices[i] - buyingPrice - fee;
        if(buyingPrice > prices[i]) {
            buyingPrice = prices[i];
        } else {
            if(proft > 0) {
                totalProfit += profit;
                buyingPrice = prices[i];
            }
        }
    }
}