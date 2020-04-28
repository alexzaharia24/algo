/**
 * https://leetcode.com/explore/challenge/card/30-day-leetcoding-challenge/531/week-4/3308/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        int m = 10, n = 12;
        System.out.println(man.rangeBitwiseAnd(m,n));
        System.out.println(man.getLowerPowerOfTwo(m));
        System.out.println(man.getLowerPowerOfTwo(n));
    }

    public int rangeBitwiseAnd(int m, int n) {
        if(m == n) return m;
        double lowestPowerOfTwo = getLowerPowerOfTwo(m);
        double highestPowerOfTwo = getLowerPowerOfTwo(n);


        if(lowestPowerOfTwo != highestPowerOfTwo) return 0;

        int diff = n - m;
        return m

    }

    private double getLowerPowerOfTwo(int x) {
        if(x == 0) return 1;
        int exponent = 0;
        while(x!=1) {
            x /= 2;
            exponent++;
        }
        return Math.pow(2, exponent);
    }

    private double getUpperPowerOfTwo(int x) {
        return getLowerPowerOfTwo(x) * 2;
    }
}
