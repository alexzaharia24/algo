/**
 * https://leetcode.com/problems/reverse-string/
 */
public class Main {
    public static void main(String[] args) {

    }

    public void reverseString(char[] s) {
        reverseStringRecursive(s);
    }

    public void reverseStringRecursive(char[] s) {
        rec(s,0,s.length-1);
    }

    public void rec(char[] s, int left, int right) {
        if(left >= right) return;
        char aux = s[left];
        s[left] = s[right];
        s[right] = aux;
        rec(s, left+1, right-1);
    }

    public void reverseStringIterative(char[] s) {
        int n = s.length;
        for(int i=0; i<n/2; i++) {
            char aux = s[i];
            s[i] = s[n-i-1];
            s[n-i-1] = aux;
        }
    }
}
