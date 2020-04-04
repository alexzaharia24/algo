public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        int[] nums = new int[]{0,1,0,3,12};
        man.moveZeroes(nums);
    }

    public void moveZeroes(int[] nums) {
        if(nums.length < 2) return;
        int zeroValue=0, nonZeroValue=1;
        while(nonZeroValue < nums.length) {
            if(nums[zeroValue] == 0) {
                if(nums[nonZeroValue] != 0) {
                    nums[zeroValue] = nums[nonZeroValue];
                    nums[nonZeroValue] = 0;
                    zeroValue++;
                }
                nonZeroValue++;
            } else {
                zeroValue++;
                nonZeroValue++;
            }
        }
    }
}
