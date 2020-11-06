// https://leetcode.com/problems/coin-change/

function coinChange(coins, amount) {
    return coinChangeN(coins, amount);
}

function coinChangeN(coins, amount) {
    // Time: O(n*c) - n=amount, c = nr of coins
    // Space: O(n)
    // dp[i] = minimal nr of coins to make the sum i
    // dp[i] = min nr of coins from a dp[i-coin]+1, where coin is one of the coins. if dp[i-coin] exits => we can obtain i with adding coin 'coin'
    if (coins.length === 0) {
        return amount === 0 ? 0 : -1;
    }

    let dp = new Array(amount + 1).fill(Infinity);

    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (dp[i - coin] !== undefined && dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return (dp[amount] === Infinity) ? -1 : dp[amount];
}

function coinChangeNPatrat(coins, amount) {
    // Time: O(n^2) - n=amount
    // Space: O(n)
    // dp[i] = minimal nr of coins to make the sum i
    // dp[i] = min(dp[j] + dp[i-j] where j is btw [0, i). We use the previous nr of coins because we can make up the sum of i using previous elements.)
    if (coins.length === 0) {
        return amount === 0 ? 0 : -1;
    }

    let dp = new Array(amount + 1).fill(Infinity);

    dp[0] = 0;
    for (let coin of coins) {
        if (coin <= amount) {
            dp[coin] = 1;
        }
    }

    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < i; j++) {
            dp[i] = Math.min(dp[i], dp[j] + dp[i - j]);
        }
    }

    return (dp[amount] === Infinity || dp[amount] === -Infinity) ? -1 : dp[amount];
}

console.log(coinChange([1,2,5],11))
console.log(coinChange([2],3))
console.log(coinChange([1],0))
console.log(coinChange([1],1))
console.log(coinChange([186, 419, 83, 408], 6249)) // expected 20
