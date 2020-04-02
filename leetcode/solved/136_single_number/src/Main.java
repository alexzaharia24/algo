import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * https://leetcode.com/problems/single-number/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();
    }

    public int singleNumber(int[] nums) {
        return singleNumberWithBitManipulation(nums);
    }

    /**
     * Using XOR => 0 xor A = A; A xor A = 0. Then by xoring all elements with each other we will at some point xor the intermediary result with the same number twice => zeroing it. Eventually get 0 xor X, X being the single occurrence element.
     * @param nums
     * @return
     */
    public int singleNumberWithBitManipulation(int[] nums) {
        int single = 0;
        for(int i=0; i<nums.length; i++) {
            single = single ^ nums[i];
        }
        return single;
    }

    public int singleNumberWithMap(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();
        for(int i=0; i<nums.length; i++) {
            Integer currentNumberOfOccurences = map.get(nums[i]);
            if(currentNumberOfOccurences != null) {
                map.put(nums[i], currentNumberOfOccurences+1);
            } else {
                map.put(nums[i], 1);
            }
        }

        Iterator<Integer> it = map.keySet().iterator();
        while(it.hasNext()) {
            Integer key = it.next();
            if(map.get(key) == 1) return key;
        }
        return -1;
    }
}
