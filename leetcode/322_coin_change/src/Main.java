public class Main {
    public static void main(String[] args) {
        Main mn = new Main();

        // [1,2,5] -> 11
        int minCoins = mn.coinChange(new int[]{1, 2, 5}, 100);
        System.out.println(minCoins);
    }

    public int coinChange(int[] coins, int amount) {
        if (amount == 0) return 0;
        int minCoins = compute(coins, amount, 0, 0, Integer.MAX_VALUE);
        return minCoins == Integer.MAX_VALUE ? -1 : minCoins;
    }

    int compute(int[] coins, int targetSum, long currentSum, int numberOfCoins, Integer minCoins) {
        numberOfCoins++;
        if (minCoins > numberOfCoins) {
            for (int i = coins.length-1; i > 0; i--) {
                long sum = currentSum + coins[i];
                if (sum == targetSum) {
                    minCoins = Math.min(numberOfCoins, minCoins);
                }
                if (sum < targetSum) {
                    minCoins = compute(coins, targetSum, sum, numberOfCoins, minCoins);
                }
            }
        }

        return minCoins;
    }
}
