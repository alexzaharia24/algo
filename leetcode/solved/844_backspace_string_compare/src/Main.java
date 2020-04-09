import java.util.Stack;

/**
 * https://leetcode.com/problems/backspace-string-compare/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        System.out.println(man.backspaceCompare("nzp#o#g", "nb#nzp#o#g"));
    }

    public boolean backspaceCompare(String S, String T) {
        return backspaceCompareWithNoExtraMemoryReverse(S,T);
    }

    public boolean backspaceCompareWithStack(String S, String T) {
        String processedS = processString(S);
        String processedT = processString(T);

        return processedS.equals(processedT);
    }

    public String processString(String s) {
        Stack<Character> stack = new Stack<Character>();
        String result = "";

        for(char c: s.toCharArray()) {
            if(c != '#') {
                stack.push(c);
            } else {
                if(!stack.empty()) {
                    stack.pop();
                }
            }
        }

        for(Character c: stack) {
            result += c;
        }

        return result;
    }

    public boolean backspaceCompareWithNoExtraMemoryReverse(String S, String T) {
        // Go in reverse because we will know how many chars we need to ignore
        int i=S.length()-1, j=T.length()-1;
        int ignoreInS = 0, ignoreInT = 0;
        while(i>=0 || j >= 0) {
            while(i >= 0 && (S.charAt(i) == '#' || ignoreInS>0) ) { // Process backspaces and ignore the next ignoreInS characters.
                if(S.charAt(i) == '#')
                    ignoreInS++;
                else if (ignoreInS > 0) ignoreInS--;
                i--;
            } // Execute once more at the end if the processing of T has finished. If the remaining characters in S are #s and an equal number of chars then it will pass else it will fail
            while( j >= 0 && (T.charAt(j) == '#' || ignoreInT>0)) { // Process backspaces and ignore the next ignoreInT characters
                if(T.charAt(j) == '#')
                    ignoreInT++;
                else if(ignoreInT > 0) ignoreInT--;
                j--;
            } // Execute once more at the end if necessary. Same as for S
            if(i>=0 && j>=0 && S.charAt(i) != T.charAt(j)) return false; // After backspaces and corresponding characters are ignored then two identical chars should be left at this step. Else S and T are different
            if((i>=0) != (j>=0)) return false; // After all the processing i and j are different then S and T are not the same
            i--;j--;
        }

        return true;
    }
}
