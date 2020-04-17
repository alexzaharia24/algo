/**
 * https://leetcode.com/problems/valid-parenthesis-string/
 */
public class Main {
    public static void main(String[] args) {

    }

    public boolean checkValidString(String s) {
        return checkWithGreedy(s);
    }

    /**
     * Solution from here: https://leetcode.com/problems/valid-parenthesis-string/solution/
     * @param s
     * @return
     */
    public boolean checkWithGreedy(String s) {
        int minBalance =0, maxBalance= 0; // Balance is the difference btw number of "(" and "(". Balance 0 is desired
        for(char c: s.toCharArray()) {
            if(c == '(') {
                minBalance++;
                maxBalance++;
            } else if(c == ')') {
                minBalance--;
                maxBalance--;
            } else {
                minBalance--;
                maxBalance++;
            }

            if(maxBalance < 0) break;

            minBalance = Math.max(minBalance, 0);
        }

        return minBalance == 0;
    }
}
