/**
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
 */
public class Main {
    public static void main(String[] args) {

    }

    public int maxProfit(int[] prices) {
        if (prices.length == 1) return 0;
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
