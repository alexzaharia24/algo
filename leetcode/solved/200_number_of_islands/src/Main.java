import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Main man = new Main();

//        char[][] grid = new char[][]{
//                {'1', '1', '1', '1', '1'},
//                {'1', '1', '1', '1', '1'},
//                {'1', '1', '1', '1', '1'},
//                {'1', '1', '1', '1', '1'}
//        };

//        char[][] grid = new char[][]{
//                {'1', '1', '1', '1', '0',},
//                {'1', '1', '0', '1', '0',},
//                {'1', '1', '0', '0', '1',},
//                {'0', '0', '1', '0', '0',},
//        };

        char[][] grid = new char[][]{
                {'1', '1', '0', '0', '0',},
                {'1', '1', '0', '0', '0',},
                {'0', '0', '1', '0', '0',},
                {'0', '0', '0', '1', '1',},
        };

//        System.out.println(man.numIslands(grid));
        System.out.println(man.numIslands30DayChallenge(grid));
        System.out.println();
    }

    public int numIslands30DayChallenge(char[][] grid) {
        int numberOfIslands = 0;

        if (grid.length == 0) return 0;
        if (grid[0].length == 0) return 0;

        int numberOfRows = grid.length, numberOfCols = grid[0].length;

        boolean[][] visited = new boolean[numberOfRows][numberOfCols];

        for (int i = 0; i < numberOfRows; i++) {
            for (int j = 0; j < numberOfCols; j++) {
                if (isNodeValid(grid, i, j, visited)) {
                    visitNode(grid, i, j, visited); // This will visit the node and all its valid neighbours. At the end of the visits we are guaranteed that all the tiles of the islands have been visited.
                    numberOfIslands++;
                }
            }
        }

        return numberOfIslands;
    }

    // DFS
    public void visitNode(char[][] grid, int row, int col, boolean[][] visited) {
        // neighbour positions
        // ----------   | row-1, col |  ----------
        // row, col-1   | ---------- |  row, col+1
        // ----------   | row+1, col |  ----------

        visited[row][col] = true; // Mark node as visited

        int[][] neighbourPositions = new int[][]{
                {row - 1, col}, {row, col - 1}, {row + 1, col}, {row, col + 1}
        };

        for (int[] neighbourPosition : neighbourPositions) {
            if (isNodeValid(grid, neighbourPosition[0], neighbourPosition[1], visited)) {
                visitNode(grid, neighbourPosition[0], neighbourPosition[1], visited);
            }
        }
    }

    public boolean isNodeValid(char[][] grid, int row, int col, boolean[][] visited) {
        int numberOfRows = grid.length, numberOfCols = grid[0].length;

        return row >= 0 && row < numberOfRows && col >= 0 && col < numberOfCols && grid[row][col] == '1' && !visited[row][col];
    }

    public int numIslands(char[][] grid) {
        if (grid.length == 0) return 0;
        int nrRows = grid.length;
        int nrCols = grid[0].length;
        int nrIslands = 0;
        boolean[][] visited = new boolean[nrRows][nrCols];

        for (int i = 0; i < nrRows; i++) {
            for (int j = 0; j < nrCols; j++) {
                if (grid[i][j] == '1' && !visited[i][j]) {
                    dfs(i, j, grid, visited);
                    nrIslands++;
                }
            }
        }

        return nrIslands;
    }


    void dfs(int currentRow, int currentCol, char[][] grid, boolean[][] visited) {
        visited[currentRow][currentCol] = true;

        int[] neighbourRowDistance = new int[]{-1, 0, 1, 0}; // Up, right, down and left
        int[] neighbourColDistance = new int[]{0, 1, 0, -1};

        for (int i = 0; i < neighbourRowDistance.length; i++) {
            int nextRow = currentRow + neighbourRowDistance[i];
            int nextCol = currentCol + neighbourColDistance[i];
            if (isValid(nextRow, nextCol, grid, visited)) {
                dfs(nextRow, nextCol, grid, visited);
            }
        }
    }

    boolean isValid(int currentRow, int currentCol, char[][] grid, boolean[][] visited) {
        int nrRows = grid.length;
        int nrCols = grid[0].length;

        return currentRow >= 0 && currentRow < nrRows && currentCol >= 0 && currentCol < nrCols && grid[currentRow][currentCol] == '1' && !visited[currentRow][currentCol];
    }
}
