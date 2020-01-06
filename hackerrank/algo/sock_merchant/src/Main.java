public class Main {

    static int sockMerchant(int n, int[] ar) {
        int result = 0;

        int[] socks = new int[101];
        for (int i = 0; i < n; i++) {
            socks[ar[i]] += 1;
            result += socks[ar[i]] / 2;
            socks[ar[i]] %= 2;
        }

        return result;
    }

    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
