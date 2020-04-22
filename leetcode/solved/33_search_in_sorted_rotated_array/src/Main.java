public class Main {
    public static void main(String[] args) {
        Main program = new Main();

//        int[] nums = {4, 5, 6, 7, 0, 1, 2};
//        int[] nums = {1, 2, 3, 4, 5, 6};
        int[] nums = {4, 5, 6, 7, 8, 1, 2, 3};
        int target = 8;
//        int foundPosition = program.search(nums, target);
        int foundPosition = program.searchAgain(nums, target);

//        System.out.println(program.binarySearchAgain(new int[]{1, 2, 3, 4}, 0,3,3));

        System.out.println(foundPosition);
    }

    /**
     * Implement again for 30 day challenge
     * https://leetcode.com/explore/challenge/card/30-day-leetcoding-challenge/530/week-3/3304/
     *
     * @param nums
     * @param target
     * @return
     */
    public int searchAgain(int[] nums, int target) {
        if (nums.length == 0) return -1;
        if (nums.length == 1) return nums[0] == target ? 0 : -1;

        int left = 0, right = nums.length - 1;

        while (left < right) {
            int middle = (left + right) / 2;
            if (target == nums[left]) return left;
            if (target == nums[right]) return right;
            if (target == nums[middle]) return middle;

            if (nums[left] < nums[right]) {
                // Normal binary search
                return binarySearchAgain(nums, left, right, target);
            }

            // Second try
            if (nums[middle] < nums[right]) { // Section with small numbers
                if (target < nums[middle]) {
                    // go left;
                    right = middle - 1;
                } else {
                    if (target < nums[right]) {
                        // go right
                        left = middle + 1;
                    } else {
                        // go left
                        right = middle - 1;
                    }
                }
            } else {
                if (target < nums[middle]) {
                    if (target < nums[right]) {
                        // go right
                        left = middle + 1;
                    } else {
                        right = middle - 1;
                    }
                } else {
                    // go right
                    left = middle + 1;
                }
            }
        }

        return -1;
    }

    int binarySearchAgain(int[] nums, int left, int right, int target) {
        while (left <= right) {
            int middle = (left + right) / 2;
            if (target == nums[middle]) return middle;
            if (target < nums[middle]) right = middle - 1;
            else left = middle + 1;
        }

        return -1;
    }

    public int search(int[] nums, int target) {
        if (nums.length == 0) return -1;
        int start = 0, end = nums.length - 1;
        if (target == nums[0]) return 0;
        while (start <= end) {
            int middle = (start + end) / 2;
            int valueStart = nums[start], valueEnd = nums[end], valueMiddle = nums[middle];

            if (target == valueMiddle) return middle;
            if (target == valueStart) return start;
            if (target == valueEnd) return end;

            if (target < valueStart && target > valueEnd) return -1; // Not possible => target not in nums
            if (target <= valueStart && target <= valueEnd) {
                if (valueMiddle < valueStart) {
                    if (target < valueMiddle) {
                        end = middle - 1; // go left
                    } else {
                        start = middle + 1; // go right
                    }
                } else {
                    start = middle + 1; // go right
                }
            } else if (target >= valueStart && target >= valueEnd) {
                if (valueMiddle < valueStart) {
                    end = middle - 1; // go left
                } else {
                    if (target < valueMiddle) {
                        end = middle - 1; // go left
                    } else {
                        start = middle + 1; // go right
                    }
                }
            } else if (target >= valueStart && target <= valueEnd) {
                if (target < valueMiddle) {
                    end = middle - 1; // go left
                } else {
                    start = middle + 1; // go right
                }
            }
        }

        return -1;
    }

    int binarySearch(int[] nums, int target) {
        if (nums.length == 0) return -1;
        if (nums[0] == target) return 0;
        int start = 0, end = nums.length - 1;

        while (start <= end) {
            int middle = (start + end) / 2;
            if (target == nums[middle]) return middle;
            if (target < nums[middle]) end = middle - 1;
            else start = middle + 1;
        }

        return -1;
    }
}
