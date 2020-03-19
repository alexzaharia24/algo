import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        char[][] grid = new char[][]{
                {'1', '1', '1', '1', '1'},
                {'1', '1', '1', '1', '1'},
                {'1', '1', '1', '1', '1'},
                {'1', '1', '1', '1', '1'}
        };

        System.out.println(man.numIslands(grid));
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
