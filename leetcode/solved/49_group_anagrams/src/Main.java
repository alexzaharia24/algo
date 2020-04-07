import java.util.*;

/**
 * https://leetcode.com/problems/group-anagrams/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();


        String[] arr = new String[]{"eat", "tea", "tan", "ate", "nat", "bat"};
        List<List<String>> rsult = man.groupAnagrams(arr);
        System.out.println(man.getCountString("axcafbc"));
    }

    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> result = new ArrayList<>();
        HashMap<String, List<String>> map = new HashMap<>();

        for (String str : strs) {
//            String key = isAnagramInMap(str, map);
            String key = getCountString(str);
            map.putIfAbsent(key, new ArrayList<>());
            map.get(key).add(str);
        }

        for (String key : map.keySet()) {
            result.add(map.get(key));
        }

        return result;
    }

    public String getCountString(String str) {
        String countString = "";
        char[] chars = str.toCharArray();
        int[] letters = new int[26];
        for (Character c : chars) {
            letters[c - 'a']++;
        }

        for (int i=0; i<letters.length;i++) {
            if(letters[i] != 0) {
                countString = countString + (char)('a'+i) + letters[i];
            }
        }

        return countString;
    }

    public String isAnagramInMap(String str, HashMap<String, List<String>> map) {
        for (String s : map.keySet()) {
            if (areAnagrams(s, str)) return s;
        }
        return null;
    }


    public boolean areAnagrams(String word1, String word2) {
        if (word1.length() != word2.length()) return false;
        Map<Character, Integer> occurrences = new HashMap<>();
        for (char ch : word1.toCharArray()) {
            Integer nrOfOccurrences = occurrences.get(ch);
            if (nrOfOccurrences == null) {
                occurrences.put(ch, 1);
            } else {
                occurrences.put(ch, occurrences.get(ch) + 1);
            }
        }

        for (char ch : word2.toCharArray()) {
            Integer nrOfOccurrences = occurrences.get(ch);
            if (nrOfOccurrences == null) {
                return false;
            } else {
                occurrences.put(ch, occurrences.get(ch) - 1);
            }
        }

        for (char ch : word2.toCharArray()) {
            Integer nrOfOccurrences = occurrences.get(ch);
            if (nrOfOccurrences != 0) return false;
        }

        return true;
    }
}
