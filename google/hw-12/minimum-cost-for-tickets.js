// https://leetcode.com/problems/minimum-cost-for-tickets/

function mincostTickets(days, costs) {
    return minCostTicketDPWithExtendedDaysArray(days, costs);
}

function minCostTicketDPWithExtendedDaysArray(days, costs) {
    // Time: O(n)
    // Space: O(n)

    // dp[i] = min cost of ticket until day i
    // dp[i] = min(
    //      dp[i-1] if i not a travel day,
    //      dp[i-1] + cost[0],
    //      dp[i-7] + cost[1] if i>=7,
    //      dp[i-30] + cost[2] if i>=30
    // )
    if (days.length === 0) return 0;
    let dp = new Array(days[days.length-1] + 31).fill(0);
    let daysMap = {};
    for(let day of days) {
        daysMap[day] = true;
    }

    dp[0] = 0;
    for (let i = 1; i < dp.length; i++) {
        let lastValue = Infinity;
        if (!(i in daysMap)) {
            lastValue = dp[i - 1];
        }
        dp[i] = Math.min(lastValue, dp[i - 1] + costs[0], (dp[i - 7] || 0) + costs[1], (dp[i - 30] || 0) + costs[2]);
    }
    return dp[dp.length - 1];
}

function mincostTicketsDPWithCostReplacement(days, costs) {
    // Sounds good, doesn't work

    if (days.length === 0) return 0;
    let dp = new Array(days.length).fill(0);

    // for the moment assume costs = [2,7,15]
    dp[0] = costs[0];
    let startLastCost1 = -1, startLastCost2 = -1;
    let endLastCost1 = -1, endLastCost2 = -1;

    // let reasonableUsesOfCost0 = 3;
    // let reasonableUsesOfCost1 = 15;

    let reasonableUsesOfCost0 = Math.floor(costs[1] / costs[0]);
    console.log(`reasonableUsesOfCost0: ${reasonableUsesOfCost0}`)
    let reasonableUsesOfCost1 = Math.floor(costs[2] / costs[0]);
    console.log(`reasonableUsesOfCost1: ${reasonableUsesOfCost1}`)

    for (let i = 1; i < days.length; i++) {
        if (startLastCost2 !== -1) {
            // cost[2] was applied for dp[i-1]. Try to apply it for dp[i] as well
            if (days[i] - days[startLastCost2] < 30) {
                // We can use cost[2] for dp[i] as well
                dp[i] = dp[i - 1];
            } else {
                startLastCost2 = -1;
                endLastCost2 = i - 1;
                dp[i] = dp[i - 1] + costs[0];
            }
        } else if ((endLastCost2 === -1 || days[i] - days[endLastCost2] >= 30) && (i - reasonableUsesOfCost1 >= 0 && days[i] - days[i - reasonableUsesOfCost1] < 30)) {
            // We can use cost[2]
            startLastCost2 = i - reasonableUsesOfCost1;
            if (startLastCost1 !== -1) {
                startLastCost1 = -1;
                endLastCost1 = i - 1;
            }
            if (i - reasonableUsesOfCost1 === 0) {
                dp[i] = costs[2];
            } else {
                dp[i] = dp[i - reasonableUsesOfCost1 - 1] + costs[2];
            }
        } else if (startLastCost1 !== -1) {
            // cost[1] was applied for dp[i-1]. See if we can apply it to dp[i] as well
            if (days[i] - days[startLastCost1] < 7) {
                // We can apply cost[1] to dp[i] as well
                dp[i] = dp[i - 1];
            } else {
                startLastCost1 = -1;
                endLastCost1 = i - 1;
                dp[i] = dp[i - 1] + costs[0];
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
            dp[i] = dp[i - 1] + costs[0];
        }
    }
    let output = "";
    for (let i = 0; i < days.length; i++) {
        output += `${days[i]}: ${dp[i]}` + " ";
    }
    console.log(output);

    return dp[days.length - 1];
}

console.log(mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15]))
console.log(mincostTickets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15]))
console.log(mincostTickets([1, 4, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 27, 28], [3, 13, 45]))