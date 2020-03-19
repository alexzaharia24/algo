import java.util.*;
import java.util.stream.Collectors;

public class Main {
    List<List<Integer>> result = new ArrayList<>();

    public static void main(String[] args) {
        Main mn = new Main();
        mn.permute(new int[]{1});

    }

    public List<List<Integer>> permute(int[] nums) {
        permuteRecursive(new Stack<>(), Arrays.stream(nums).boxed().collect(Collectors.toList()));
        return result;
    }

    public void permuteRecursive(Stack<Integer> permutation, List<Integer> availableElements) {
        if (availableElements.size() == 0) {
            result.add(new ArrayList<>(permutation));
            return;
        }

        for (int i = 0; i < availableElements.size(); i++) {
            permutation.push(availableElements.get(i));
            List<Integer> remainingElements = new ArrayList<>();
            remainingElements.addAll(availableElements.subList(0, i));
            remainingElements.addAll(availableElements.subList(i+1, availableElements.size()));

            permuteRecursive(permutation, remainingElements);
            permutation.pop();
        }
    }
}
