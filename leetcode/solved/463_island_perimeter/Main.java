/**
 * 463. Island Perimeter
 * https://leetcode.com/problems/island-perimeter/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        
    }

    class Solution {
        public int islandPerimeter(int[][] grid) {
            int perim = 0;
            int n = grid.length;
            if(n == 0) return 0;
            int m = grid[0].length;
            if(m == 0) return 0;
            for(int i=0; i<n; i++) {
                for(int j=0; j<m; j++) {
                    if(grid[i][j] == 1) {
                        int addPerim = 4;
                        System.out.println("add1: " +addPerim);
                        if(i>0) {
                            // look for up neighbours
                            if(grid[i-1][j] == 1) addPerim-=1;
                        }
                        if(j>0){
                            // look for left neighbours
                            if(grid[i][j-1] == 1) addPerim-=1;
                        }
                        if(i<n-1) {
                            // look for down neighbours
                            if(grid[i+1][j] == 1) addPerim-=1;
                        }
                        if(j<m-1) {
                            // look for right neighbours
                            if(grid[i][j+1] == 1) addPerim-=1;
                        }
                        perim+=addPerim;
                        System.out.println("add2: " +addPerim);
    
                    }
                }
            }
            return perim;
        }
    }
}