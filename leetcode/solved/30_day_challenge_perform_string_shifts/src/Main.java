/**
 * https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/529/week-2/3299/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        String str = "abc";
        int[][] shift = new int[][]{
                {0,1},
                {1,2}
        };
        System.out.println(man.stringShift(str, shift));
    }

    public String stringShift(String s, int[][] shift) {
        int n = s.length();
        char[] currentOrder = new char[n];

        for(int i=0;i<n; i++) {
            currentOrder[i] = s.charAt(i);
        }
        for(int i=0; i<shift.length; i++) {
            int direction = shift[i][0];
            int numberOfMoves = shift[i][1];
            char[] newOrder = new char[n];
            for(int c=0; c<n;c++) {
                int newPosition = -1;
                if(direction == 0) {
                    // left shift
                    newPosition = c-numberOfMoves;
                    if(newPosition < 0) {untitled
                        newPosition = n - Math.abs(newPosition);
                    }
                } else {
                    // right shift
                    newPosition = (c+numberOfMoves) % n;
                }
                newOrder[newPosition] = currentOrder[c];
            }
            currentOrder = newOrder;
        }

        String result="";
        for(int i=0; i<n; i++) {
            result += currentOrder[i];
        }

        return result;
    }
}
