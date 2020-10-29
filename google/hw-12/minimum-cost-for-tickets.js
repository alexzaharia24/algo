// https://leetcode.com/problems/minimum-cost-for-tickets/

function mincostTickets(days, costs) {
    if (days.length === 0) return 0;
    let dp = new Array(days.length).fill(0);

    // for the moment assume costs = [2,7,15]
    dp[0] = costs[0];
    let startLastCost1 = -1, startLastCost2 = -1;
    let endLastCost1 = -1, endLastCost2 = -1;

    let reasonableUsesOfCost0 = 3;
    let reasonableUsesOfCost1 = 14;

    // console.log(days)
    for (let i = 1; i < days.length; i++) {
        // console.log(dp)
        // console.log(startLastCost1)
        // console.log(startLastCost2)
        // See if we can apply cost[2]
        if (startLastCost2 !== -1) {
            // cost[2] was applied for dp[i-1]. Try to apply it for dp[i] as well
            if (days[i] - days[startLastCost2] < 30) {
                // We can use cost[2] for dp[i] as well
                dp[i] = dp[i - 1];
            } else {
                startLastCost2 = -1;
                endLastCost2 = i - 1;
                dp[i] = dp[i - 1] + 2;
            }
        } else if ((endLastCost2 === -1 || days[i] - days[endLastCost2] >= 30) && (i - reasonableUsesOfCost1 >= 0 && days[i] - days[i - reasonableUsesOfCost1] < 30)) {
            // We can use cost[2]
            startLastCost2 = i - reasonableUsesOfCost1;
            if (startLastCost1 !== -1) {
                startLastCost1 = -1;
                endLastCost1 = i - 1;
            }
            if (i - reasonableUsesOfCost1 === 0) {
                dp[i] = 15;
            } else {
                dp[i] = dp[i - reasonableUsesOfCost1 - 1] + 15;
            }
        } else if (startLastCost1 !== -1) {
            // cost[1] was applied for dp[i-1]. See if we can apply it to dp[i] as well
            if (days[i] - days[startLastCost1] < 7) {
                // We can apply cost[1] to dp[i] as well
                dp[i] = dp[i - 1];
            } else {
                startLastCost1 = -1;
                endLastCost1 = i - 1;
                dp[i] = dp[i - 1] + 2;
            }
        } else if ((endLastCost1 === -1 || days[i] - days[endLastCost1] >= 7) && (i - reasonableUsesOfCost0 >= 0 && days[i] - days[i - reasonableUsesOfCost0] < 7)) {
            // We can apply cost[1]
            startLastCost1 = i - reasonableUsesOfCost0;
            if (i - reasonableUsesOfCost0 === 0) {
                dp[i] = 7;
            } else {
                dp[i] = dp[i - reasonableUsesOfCost0 - 1] + 7;
            }
        } else {
            dp[i] = dp[i - 1] + 2;
        }
    }
    return dp[days.length - 1];
}

console.log(mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15]))
console.log(mincostTickets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15]))