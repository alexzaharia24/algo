public class Main {
    public static void main(String[] args) {
        Main mn = new Main();

        int[] nums = {5,7,7,8,8,10};
        int target = 6;

        int[] result = mn.searchRange(nums, target);
        System.out.println(String.format("[%d,%d]", result[0], result[1]));

    }

    public int[] searchRange(int[] nums, int target) {
        if (nums.length == 0) return new int[]{-1, -1};
        int start = 0, end = nums.length - 1, first = -1, last = -1, middle = -1;
        while (start <= end) { // Find some occurrence of target
            middle = (start + end) / 2;
            if (target == nums[middle]) {
                first = middle;
                last = middle;
                break;
            } else if (target < nums[middle]) {
                end = middle - 1;
            } else {
                start = middle + 1;
            }
        }

        if (first != -1) {
            // Search first occ in left side
            int startLeft = 0, endLeft = middle - 1;
            if (endLeft == -1 && nums[startLeft] == target) first = 0;
            while (startLeft <= endLeft) {
                int middleLeft = (startLeft + endLeft) / 2;
                if (target == nums[middleLeft]) {
                    first = middleLeft;
                    endLeft = middleLeft - 1;
                } else if (target > nums[middleLeft]) {
                    startLeft = middleLeft + 1;
                }
            }

            int startRight = middle + 1, endRight = nums.length - 1;
            if (startRight == endRight && nums[startRight] == target) last = startRight;
            while (startRight <= endRight) {
                int middleRight = (startRight + endRight) / 2;
                if (target == nums[middleRight]) {
                    last = middleRight;
                    startRight = middleRight + 1;
                } else if (target < nums[middleRight]) {
                    endRight = middleRight - 1;
                }
            }
        }

        return new int[]{first, last};
    }
}
