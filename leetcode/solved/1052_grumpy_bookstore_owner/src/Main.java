public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        int[] customers = new int[]{1, 0, 1, 2, 1, 1, 7, 5};
        int[] grumpy = new int[]{0, 1, 0, 1, 0, 1, 0, 1};
        int X = 3;

//        int[] customers = new int[]{4, 10, 10};
//        int[] grumpy = new int[]{1,1,0};
//        int X = 2;
        System.out.println(man.maxSatisfied(customers, grumpy, X));
    }

    public int maxSatisfied(int[] customers, int[] grumpy, int X) {
        int sumOfHappy = 0;
        int sumOfGrumipes = 0;

        // Whole sum of happy customers
        for(int i=0; i<customers.length; i++) {
            sumOfHappy += customers[i] * negateZeroOrOne(grumpy[i]);
        }

        // Initialize sum of the grumpies
        for (int i = 0; i < X; i++) {
            if(grumpy[i] == 1) {
                sumOfGrumipes += customers[i];
            }
        }

        int maxSum = sumOfHappy + sumOfGrumipes; // Add to the happy the grumpies
        for (int i = 1; i <= customers.length - X; i++) {
            sumOfGrumipes = sumOfGrumipes - customers[i-1] * grumpy[i -1] + customers[i+X-1] * grumpy[i + X - 1]; // remove last unsatisfied custm and add next unsatisfied custom
            if(sumOfHappy + sumOfGrumipes > maxSum) {
                maxSum = sumOfHappy + sumOfGrumipes;
            }
        }


        return maxSum;
    }

    public int negateZeroOrOne(int x) {
        return x ^ 1;
    }
}
