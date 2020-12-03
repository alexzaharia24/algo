function solve(prices) {
    return solveWithMinArray(prices)
}

function solveWithMinVar(prices) {
    // O(n) time
    // O(1) space
    if (prices.length <= 1) return 0;
    let minSoFar = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        let profit = prices[i] - minSoFar;
        maxProfit = Math.max(maxProfit, profit)
        minSoFar = Math.min(minSoFar, prices[i]);
    }

    return maxProfit

}

function solveWithMinArray(prices) {
    // O(n) time
    // O(n) space
    if (prices.length <= 1) return 0;
    let minPrices = []
    let min = prices[0];
    let maxProfit = 0;

    for (let price of prices) {
        min = Math.min(min, price)
        minPrices.push(min)
    }


    for (let i = 0; i < prices.length; i++) {
        let profit = prices[i] - minPrices[i];
        maxProfit = Math.max(maxProfit, profit)
    }

    return maxProfit

}

function solvePartialProfits(prices) {
    if (prices.length <= 1) return 0;

    let maxProfit = 0
    let partialProfit = 0
    for (let idx = 0; idx < prices.length - 1; idx++) {
        let potentialNewProfit = prices[idx + 1] - prices[idx];
        partialProfit = Math.max(partialProfit, Math.max(partialProfit + potentialNewProfit, potentialNewProfit));
        maxProfit = Math.max(maxProfit, partialProfit)
    }

    return maxProfit
}

function solveBrute(prices) {
    // O(n^2) polynomial
    let profits = []
    for (let i = 0; i < prices.length - 1; i++) {
        let buyingPrice = prices[i];
        let maxProfit = 0;
        for (let j = i; j < prices.length; j++) {
            maxProfit = Math.max(maxProfit, prices[j] - buyingPrice)
        }
        profits.push(maxProfit)
    }

    let maxProfit = 0;
    for (let profit of profits) {
        maxProfit = Math.max(maxProfit, profit)
    }

    return maxProfit
}

console.log(solve([7, 1, 5, 3, 6, 4]));
console.log(solve([7, 3, 2, 1]));