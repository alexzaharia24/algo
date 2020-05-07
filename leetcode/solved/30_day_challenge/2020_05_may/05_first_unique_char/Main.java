import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Main man = new Main();
        int x = man.firstUniqChar("lleetcode");
        System.out.println(x);
    }

    public int firstUniqChar(String s) {
        Map<Character, Integer> mp = new HashMap<>();
        char[] chars = s.toCharArray();

        for(char c: chars) {
            mp.putIfAbsent(c, 0);
            mp.put(c, mp.get(c) + 1);
        }
        for(int i=0; i<chars.length; i++) {
            char c = chars[i];
            if(mp.get(c) != null && mp.get(c) == 1) return i;
        }
        return -1;
    }
}