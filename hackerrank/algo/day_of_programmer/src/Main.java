import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

public class Main {

    static void bonAppetit(List<Integer> bill, int k, int b) {
        int sum = bill.stream().reduce(0, Integer::sum);
        int actual = (sum - bill.get(k))/2;

        if(b == actual) {
            System.out.println("Bon Appetit");
        } else {
            System.out.println(b-actual);
        }
    }

    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
