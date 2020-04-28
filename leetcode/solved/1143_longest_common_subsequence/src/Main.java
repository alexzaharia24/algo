/**
 * https://leetcode.com/problems/longest-common-subsequence/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        String text1 = "abcde", text2 = "ace";
        System.out.println(man.longestCommonSubsequence(text1, text2));

    }

    /**
     * DP approach. Top DOWN
     * Solution from https://www.youtube.com/watch?v=ASoaQq66foQ
     *
     * @param text1
     * @param text2
     * @return
     */
    public int longestCommonSubsequence(String text1, String text2) {
        int n = text1.length(), m = text2.length();
        int[][] dp = new int[n][m]; // dp[i][j] holds the length of the longest subsequence of text1[0..i] and text2[0..j]
        int result = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (text1.charAt(i) == text2.charAt(j)) {
                    if (i > 0 && j > 0) {
                        dp[i][j] = 1 + dp[i - 1][j - 1]; // 1 + longest subseq of sequences with last char removed in both
                    } else {
                        dp[i][j] = 1;
                    }
                } else {
                    if (i > 0 && j > 0) {
                        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // max between longest of seq with one character removed from one or the other
                    } else if (i > 0) {
                        dp[i][j] = dp[i - 1][j]; // result of the text1 current subseq with this char removed and text2's current subseq
                    } else if (j > 0) {
                        dp[i][j] = dp[i][j - 1];
                    }
                }
            }
        }

        result = dp[n - 1][m - 1]; // result is the value from the top bottom which is the longest common subsequence of the full strings

        return result;
    }

    /**
     * Recursive approach. Bottom UP
     * Solution from https://www.youtube.com/watch?v=ASoaQq66foQ
     *
     * @param text1
     * @param text2
     * @return
     */
    public int lcs(String text1, String text2) {
        if (text1.equals("") || text2.equals("")) return 0;
        int length1 = text1.length(), length2 = text2.length();
        if (text1.charAt(length1 - 1) == text2.charAt(length2 - 1)) {
            return 1 + lcs(text1.substring(0, length1 - 1), text2.substring(0, length2 - 1));
        }
        return Math.max(lcs(text1.substring(0, length1 - 1), text2), lcs(text1, text2.substring(0, length2 - 1)));
    }
}
