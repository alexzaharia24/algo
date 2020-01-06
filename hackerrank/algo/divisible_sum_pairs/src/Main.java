public class Main {

    static int divisibleSumPairs(int n, int k, int[] ar) {
        int result = 0;

        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                if((ar[i] + ar[j]) % k == 0) {
                    result++;
                }
            }
        }

        return result;
    }

    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
