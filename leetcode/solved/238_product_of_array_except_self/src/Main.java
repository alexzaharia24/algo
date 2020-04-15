import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * https://leetcode.com/problems/product-of-array-except-self/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        int[] nums = new int[]{1,0};
        man.productExceptSelf(nums);
        System.out.println();
    }

    public int[] productExceptSelf(int[] nums) {
        return productLeftAndRightOnResultArrayConstantSpace(nums);
    }

    public int[] productLeftAndRightOnResultArrayConstantSpace(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        int productToLeft = nums[0];
        result[0] = 1; // Initialize product to left of first element to 1
        for(int i=1;i<n;i++) {
            result[i] = productToLeft;
            productToLeft *= nums[i];
        }

        int productToRight = nums[n-1];
        // Product to right of last element is at this moment product to left of the last element
        for(int i=n-2;i>=0;i--) {
            result[i] = productToRight * result[i];
            productToRight *= nums[i];
        }

        return result;
    }

    public int[] productWithLeftAndRight(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        Map<Integer, List<Integer>> products = new HashMap<>();
        // map.get(i).get(0) is productToLeft and .get(1) is productToRight
        int productToLeft = nums[0];
        products.put(0, new ArrayList<>());
        products.get(0).add(1); // Product to left of fisrt element is 1
        for(int i=1;i<n;i++) {
            products.put(i, new ArrayList<>());
            products.get(i).add(productToLeft);
            productToLeft *= nums[i];
        }

        int productToRight = nums[n-1];
        products.get(n-1).add(1); // Product to right of last element is 1

        for(int i=n-2;i>=0;i--) {
            products.get(i).add(productToRight);
            productToRight *= nums[i];
        }

        for(int i=0; i<n; i++) {
            result[i] = products.get(i).get(0) * products.get(i).get(1);
        }

        return result;
    }

    public int[] productWithDivision(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        int nonZeroProduct = 1;
        int nrOfZeros = 0;
        for(int x: nums) {
            if(x != 0) nonZeroProduct *= x;
            else {
                nrOfZeros++;
            }
        }
        for(int i=0; i<n; i++) {
            if(nrOfZeros > 0) {
                if(nums[i] != 0) {
                    result[i] = 0;
                } else {
                    if(nrOfZeros == 1) {
                        result[i] = nonZeroProduct;
                    }
                }
            } else {
                result[i] = nonZeroProduct / nums[i];
            }


        }
        return result;
    }
}
