// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/

function maxProfit(prices, fee) {
    /*  Time: O(n)
        Space: O(n)
        dp[i][0] - max profit until day i if there is no stock currently being held (no stock that was bought and not yet sold)
        dp[i][1] - max profit until day i if there is a stock currently being held (a stock that was bought and not yet sold) 
    */
    if (prices.length === 0) return 0;

    let dp = new Array(prices.length).fill().map(() => new Array(2));

    dp[0][0] = 0;
    dp[0][1] = -prices[0];

    for (let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    }

    return dp[prices.length - 1][0];
}

function maxProfitCurrentNewProfit(prices, fee) {
    // Partially working. Fails on some tests
    if (prices.length === 0) return 0;
    let currentBuyingPrice = prices[0];
    let currentProfit = 0, newProfit = 0;
    let dp = new Array(prices.length).fill(0);
    /*  dp [i] - max profit until day i
        dp[i] = 
          1. same profit as last day if a new stock is bought
          2. 
            a. total profit (dp[i-1]) + new profit if a stock is sold
            b. total profit (dp[i-1]) - current profit + new profit if a stock is sold at a better price
          3. same profit as last day if no action is preformed
    */
    dp[0] = 0;
    for (let i = 1; i < prices.length; i++) {
        newProfit = prices[i] - currentBuyingPrice - fee;
        // console.log(`currentBuyingPrice: ${currentBuyingPrice}, currentProfit: ${currentProfit}, newProfit: ${newProfit}`)
        if (newProfit > currentProfit) {
            // sell stock at better price
            dp[i] = dp[i - 1] - currentProfit + newProfit;
            currentProfit = newProfit;
        } else if ((currentProfit === 0 && prices[i] < currentBuyingPrice) || (prices[i] <= currentProfit)) {
            // buy new stock
            dp[i] = dp[i - 1];
            currentBuyingPrice = prices[i];
            currentProfit = 0;
        } else {
            dp[i] = dp[i - 1];
        }
    }
    return dp[prices.length - 1];
}

console.log(maxProfit([1, 3, 2, 8, 4, 9], 2)); // expected 8
console.log(maxProfit([1, 8, 7, 50], 2)); // expected 47
console.log(maxProfit([1, 3, 7, 5, 10, 3], 3)); // expected 6
console.log(maxProfit([4, 5, 2, 4, 3, 3, 1, 2, 5, 4], 1)) // expected ?