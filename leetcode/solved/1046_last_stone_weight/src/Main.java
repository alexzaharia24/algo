import java.util.Arrays;

/**
 * https://leetcode.com/problems/last-stone-weight/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        int[] stones = new int[]{3,7,8};
        System.out.println(man.lastStoneWeight(stones));
        System.out.println();
    }

    public int lastStoneWeight(int[] stones) {
        Arrays.sort(stones);
        int n = stones.length;
        boolean moreThanOneLeft = true;
        while (moreThanOneLeft) {
            moreThanOneLeft = false;

            int max1 = -1, max2 = -1;
            int max1Index = -1, max2Index = -1;
            for (int i = n - 1; i >= 0; i--) {
                if (stones[i] > 0) {
                    if (stones[i] > max1) {
                        max2 = max1;
                        max2Index = max1Index;
                        max1 = stones[i];
                        max1Index = i;
                    } else if (stones[i] >= max2) {
                        max2 = stones[i];
                        max2Index = i;
                    }
                }
            }

            if (max1 > 0 && max2 > 0) {
                stones[max1Index] = max1 - max2;
                stones[max2Index] = max2 - max1;
                moreThanOneLeft = true;
            }

        }

        for (int i = 0; i < n; i++) {
            if (stones[i] > 0) return stones[i];
        }
        return 0;
    }
}
