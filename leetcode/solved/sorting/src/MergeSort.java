import java.util.ArrayList;
import java.util.List;

public class MergeSort {
    List<Integer> sort(List<Integer> arr) {
        if (arr.size() == 1) return arr;
        int m = arr.size() / 2;

        List<Integer> left = sort(arr.subList(0, m));
        List<Integer> right = sort(arr.subList(m, arr.size()));
        List<Integer> merged = merge(left, right);

        return merged;
    }

    List<Integer> merge(List<Integer> left, List<Integer> right) {
        int i = 0, j = 0;
        List<Integer> merged = new ArrayList<>();
        while (i < left.size() && j < right.size()) {
            if (left.get(i) < right.get(j)) {
                merged.add(left.get(i));
                i++;
            } else {
                merged.add(right.get(j));
                j++;
            }
        }

        while (i < left.size()) {
            merged.add(left.get(i));
            i++;
        }
        while (j < right.size()) {
            merged.add(right.get(j));
            j++;
        }

        return merged;
    }
}
