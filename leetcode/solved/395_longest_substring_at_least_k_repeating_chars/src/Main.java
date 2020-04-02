public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        String s = "aaabb";
        int k = 3;
        System.out.println(man.longestSubstring(s, k));
    }

    public int longestSubstring(String s, int k) {
        int result = 0;
        int[] occurrences;

        for (int i = 0; i < s.length(); i++) {
            occurrences = new int[26];
            int localLongest = 0;
            for (int j = i; j < s.length(); j++) {
                char ch = s.charAt(j);
                occurrences[(int) ch - 97]++;
                if (isValid(occurrences, k)) localLongest = j - i + 1;
            }
            result = Math.max(result, localLongest);
        }

        return result;
    }

    boolean isValid(int[] occurrences, int minOccurrences) {
        for (int i = 0; i < occurrences.length; i++) {
            if (occurrences[i] > 0 && occurrences[i] < minOccurrences) return false;
        }

        return true;
    }
}
