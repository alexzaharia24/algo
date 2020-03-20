public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        int[] nums = new int[]{0,2};
        System.out.println(man.maxProduct(nums));
    }

    public int maxProduct(int[] nums) {
        if (nums.length == 0) return 0;
        if (nums.length == 1) return nums[0];
        int maxProduct = nums[0];
        int maxProductIndex = 0, maxProductNumbers = 1;
        for (int i = 0; i < nums.length; i++) {
            int product = 1;
            for (int j = i; j < nums.length; j++) {
                product *= nums[j];
                if (product > maxProduct) {
                    maxProduct = product;
                    maxProductIndex = i;
                    maxProductNumbers = j - i + 1;
                }
            }
        }

        return maxProduct;
    }
}
