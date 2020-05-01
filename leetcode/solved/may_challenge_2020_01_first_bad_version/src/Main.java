import java.util.ArrayList;
import java.util.List;

class VersionControl {
    public List<Boolean> arr;

    boolean isBadVersion(int version) {
        return this.arr.get(version-1);
    }
}

public class Main extends VersionControl {
    Main() {
        int n = 2126753390;
        this.arr = new ArrayList<>();
        for (int i = 0; i <1702766719; i++) {
            this.arr.add(false);
        }
        for (int i = 1702766719; i <n; i++) {
            this.arr.add(true);
        }
    }

    public static void main(String[] args) {
        Main man = new Main();
        int firstBadV = man.firstBadVersion(2126753390);
        System.out.println(firstBadV);
    }

    public int firstBadVersion(int n) {
        return firstBadVersionSimplified(n);
    }

    public int firstBadVersionSimplified(int n) {
        int left = 1, right = n;
        while(left < right) {
            // end condition is left == right
            int middle = left + (right - left) / 2;
            if(this.isBadVersion(middle)) {
                // go left
                right = middle;
            } else {
                // go right
                left = middle + 1;
            }
        }

        return left;
    }

    public int firstBadVersionVerbose(int n) {
        if (n == 1) return this.isBadVersion(1) ? 1 : -1;
        int left = 0, right = n - 1;
        while (left <= right) {
            int middle = left + (right - left) / 2;
            int middleVersion = middle + 1; // versions are 1 indexed => middle + 1. if they were 0 indexed then => middle would be the idx of the current
            boolean current = this.isBadVersion(middleVersion);
            if (middle == 0 && current) return middleVersion;

            boolean prev = this.isBadVersion(middleVersion - 1);

            if (middle == n - 1 && current && !prev) return n - 1;
            boolean next = this.isBadVersion(middleVersion + 1);

            if (!prev && current) return middleVersion;
            if (!current && next) return middleVersion + 1;

            if (current) {
                // go left
                right = middle - 1;
            } else {
                // go right
                left = middle + 1;
            }
        }

        return -1;
    }
}
