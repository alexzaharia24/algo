import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Main man = new Main();
        int[] nums = new int[] { 3,3,4};

        System.out.println(man.majorityElement(nums));

    }

    public int majorityElement(int[] nums) {
        return linearTimeAndConstantSpace(nums);
    }

    public int linearTimeAndConstantSpace(int[] nums) {
        int current = nums[0];
        int count = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != current)
            {
                count--;
                if (count == 0) {
                    current = nums[i];
                    count = 1;
                }
            }
            else count++;

        }

        return current;
    }

    public int linearTimeAndSpace(int[] nums) {
        Map<Integer, Integer> mp = new HashMap<>();
        for (int val : nums) {
            mp.putIfAbsent(val, 0);
            mp.put(val, mp.get(val) + 1);
        }

        for (Map.Entry<Integer, Integer> entry : mp.entrySet()) {
            if (entry.getValue() > nums.length / 2)
                return entry.getKey();
        }

        return -1;
    }

}