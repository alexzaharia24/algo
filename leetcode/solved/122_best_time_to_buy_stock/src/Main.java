/**
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
 */
// import java.lang.Math;

public class Main {
    public static void main(String[] args) {
        // int profit = peakValley(new int[] { 7, 1, 5, 3, 6, 4 });
        int profit = peakValley(new int[] {1,2,3,4,5});
        System.out.println("Profit: " + profit);
    }

    // Approach 1: Generate all pairs of prices and maximize the profit
    // Start from 0 and consider [i,j] where prices[j] > prices[i] then consider
    // [j+1, k] and so on
    // Then start from 1 and so on
    // Time: O(N^N), Space: O(N) rec stack
    public static int bruteForce(int[] prices) {
        // Generate all pairs of prices and
        return bruteForceRecursion(prices, 0);
    }

    public static int bruteForceRecursion(int[] prices, int startIdx) {
        if (startIdx >= prices.length)
            return 0;
        int maxProfit = 0;
        for (int idx = startIdx; idx < prices.length - 1; idx++) {
            int profit = 0;
            for (int idx2 = idx + 1; idx2 < prices.length; idx2++) {
                if (prices[idx] < prices[idx2]) {
                    profit = bruteForceRecursion(prices, idx2 + 1) + (prices[idx2] - prices[idx]);
                }

                maxProfit = Math.max(maxProfit, profit);
            }
        }

        return maxProfit;
    }

    // Approach 2: Valleys and Peaks Strategy
    // Find pairs of valley,peak and sum their height difference
    // Time: O(N), Space: O(1)
    public static int peakValley(int[] prices) {
        if (prices.length < 2)
            return 0;
        int profit = 0, valleyIdx = 0, peakIdx = 0;

        while(valleyIdx < prices.length-1 && peakIdx < prices.length-1) {
            // Find next valley
            valleyIdx = peakIdx;
            while(valleyIdx < prices.length -1 && prices[valleyIdx] >= prices[valleyIdx+1]) {
                valleyIdx++;
            }

            // Find next peak
            peakIdx = valleyIdx;
            while(peakIdx < prices.length -1 && prices[peakIdx] <= prices[peakIdx+1]) {
                peakIdx++;
            }

            profit += prices[peakIdx] - prices[valleyIdx];
        }

        return profit;
    }

    // Approach 3: Consecutive profit
    // Increase the profit with the difference of consecutive elementes if the second is bigger
    public static int consecutiveProfit(int[] prices) {
        if (prices.length < 2)
            return 0;
        int profit = 0, idx1 = 0, idx2 = 1;

        while(idx2 < prices.length) {
            if(prices[idx2] > prices[idx1]) {
                profit = profit + prices[idx2] - prices[idx1];
            }
            idx1++;
            idx2++;
        }

        return profit;
    }

    public int maxProfit(int[] prices) {
        if (prices.length == 1)
            return 0;
        int possibleBuy = 0, possibleSell = 1, profit = 0;
        while (possibleSell < prices.length) {
            if (prices[possibleSell] - prices[possibleBuy] > 0) {
                profit += prices[possibleSell] - prices[possibleBuy];
            }
            possibleBuy++;
            possibleSell++;
        }
        return profit;
    }
}