public class Main {
    public static void main(String[] args) {
        Main program = new Main();

        int[] nums = {4, 5, 6, 7, 0, 1, 2};
        int target = 8;
        int foundPosition = program.search(nums, target);

        int found = program.binarySearch(new int[]{1, 2, 3, 4}, 5);

        System.out.println(foundPosition);
    }

    public int search(int[] nums, int target) {
        if(nums.length == 0) return -1;
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
