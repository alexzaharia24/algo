import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        System.out.println(man.isHappy(19));
    }

    public boolean isHappy(int n) {
        return isHappyRecursiveSlowAndFast(n);
    }

    public boolean isHappyIterativeWithHashSet(int n) {
        int currentNumber = n;
        Set<Integer> states = new HashSet<>();

        while (currentNumber != 1) {
            System.out.println(currentNumber);
            if (!states.contains(currentNumber)) {
                states.add(currentNumber);
                currentNumber = digitSquareSum(currentNumber);
            } else {
                return false;
            }
        }

        return true;
    }

    /**
     * Fast goes twice as fast as slow
     * They will meet at some point either at 1 or at a number that fast is processing for the second time
     * Requires no extra memory
     * @param n
     * @return
     */
    public boolean isHappyRecursiveSlowAndFast(int n) {
        int slow = n, fast = n;
        do {
            slow = digitSquareSum(slow);
            fast = digitSquareSum(digitSquareSum(fast));
        } while (slow != fast);

        if(slow != 1) {
            return false;
        }
        return true;
    }

    public int digitSquareSum(int n) {
        int sum = 0;

        while (n > 0) {
            sum += ((n % 10) * (n % 10));
            n /= 10;
        }

        return sum;
    }
}
