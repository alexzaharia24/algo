public class Main {

    static int pageCount(int n, int p) {
        /*
         * Write your code here.
         */

        int end = n;
        if(n % 2 == 0) {
            end++;
        }

        return Math.min(p/2, (end-p)/2);
    }

    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
