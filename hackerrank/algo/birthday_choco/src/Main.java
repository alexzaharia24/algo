import java.util.Arrays;
import java.util.List;

public class Main {

    static int birthday(List<Integer> s, int d, int m) {
        int result = 0;
        int idx = 0, n = s.size();
        while (idx + m <= n) {
            int sum = 0;
            for (int i = idx; i < idx + m; i++) {
                sum += s.get(i);
            }
            if (sum == d)
                result++;
            idx++;
        }

        return result;
    }

    public static void main(String[] args) {
        System.out.println("Hello World!");

        int d = 18, m = 7;
        List<Integer> bar = Arrays.asList(2,5,1,3,4,4,3,5,1,1,2,1,4,1,3,3,4,2,1);
        int result = birthday(bar, d, m);

        System.out.println(result);

    }
}
