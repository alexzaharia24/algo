import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Main mn = new Main();
        int[] nums = new int[]{0,0};
        System.out.println(mn.largestNumber(nums));
    }

    public String largestNumber(int[] nums) {
        List<String> strings = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            strings.add(String.valueOf(nums[i]));
        }

        strings.sort(new Comparator<String>() {
            @Override
            public int compare(String s, String t1) {
                String one = s + t1;
                String two = t1 + s;
                return (-1) * one.compareTo(two);
            }
        });

        String result = "";
        for (int i = 0; i < strings.size(); i++) {
            if(result.equals("0")) result = strings.get(i);
            else {
                result = result + strings.get(i);
            }
        }

        return result;
    }

    public int compareStrings(String a, String b) {
//
//        int compared = a.substring(0, i).compareTo(b.substring(0, i));
//        if (compared != 0) return compared;
//        // compare the rest
//        if (a.length() > b.length()) {
//            return Character.compare(a.charAt(i), b.charAt(0));
//        }
//        return Character.compare(b.charAt(i), a.charAt(0));

        String one = a + b;
        String two = b + a;
        return one.compareTo(two);
    }


}
