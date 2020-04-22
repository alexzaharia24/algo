/**
 * https://leetcode.com/problems/minimum-path-sum/
 */
public class Main {
    public static void main(String[] args) {

    }

    public int minPathSumMatrixReduction(int[][] grid) {
        if (grid.length == 0) return 0;
        int nrOfRows = grid.length, nrOfCols = grid[0].length;
        for (int i = 0; i < nrOfRows; i++) {
            for (int j = 0; j < nrOfCols; j++) {
                if (i == 0 && j == 0) continue;
                int leftMin = Integer.MAX_VALUE, topMin = Integer.MAX_VALUE;
                if (i > 0) {
                    // Top available
                    topMin = grid[i - 1][j];
                }
                if (j > 0) {
                    // Left available
                    leftMin = grid[i][j - 1];
                }

                grid[i][j] = grid[i][j] + Math.min(leftMin, topMin);
            }
        }

        return grid[nrOfRows-1][nrOfCols-1];
    }

    public int minPathSum(int[][] grid) {
        if (grid.length == 0) return 0;
        int nrOfRows = grid.length, nrOfCols = grid[0].length;
        int[][] minPathSumFromPosition = new int[nrOfRows][nrOfCols];
        for (int i = 0; i < nrOfRows; i++) {
            for (int j = 0; j < nrOfCols; j++) {
                minPathSumFromPosition[i][j] = -1;
            }
        }
        // return visitNext(grid, 0, 0, minPathSumFromPosition);
        return visitNextFromTheEnd(grid, nrOfRows - 1, nrOfCols - 1, minPathSumFromPosition);
    }

    // DFS
    public int visitNext(int[][] grid, int row, int col, int[][] minPathSumFromPosition) {
        int nrOfRows = grid.length, nrOfCols = grid[0].length;
        if (row == (nrOfRows - 1) && col == (nrOfCols - 1)) {
            // End position
            return grid[row][col];
        }

        if (minPathSumFromPosition[row][col] != -1) return minPathSumFromPosition[row][col];
        int rowRightPosition = row, colRightPosition = col + 1;
        int rowBottomPosition = row + 1, colBottomPosition = col;


        int rightResult = Integer.MAX_VALUE;
        if (colRightPosition < nrOfCols) {
            rightResult = visitNext(grid, rowRightPosition, colRightPosition, minPathSumFromPosition);
        }

        int bottomResult = Integer.MAX_VALUE;
        if (rowBottomPosition < nrOfRows) {
            bottomResult = visitNext(grid, rowBottomPosition, colBottomPosition, minPathSumFromPosition);
        }


        int result = grid[row][col] + Math.min(rightResult, bottomResult);
        minPathSumFromPosition[row][col] = result;
        return result;
    }

    // DFS backwards
    public int visitNextFromTheEnd(int[][] grid, int row, int col, int[][] minPathSumFromPosition) {
        int nrOfRows = grid.length, nrOfCols = grid[0].length;
        if (row == 0 && col == 0) {
            // End position
            return grid[row][col];
        }

        if (minPathSumFromPosition[row][col] != -1) return minPathSumFromPosition[row][col];
        int rowLeftPostion = row, colLeftPosition = col - 1;
        int rowTopPosition = row - 1, colTopPosition = col;


        int leftResult = Integer.MAX_VALUE;
        if (colLeftPosition >= 0) {
            leftResult = visitNextFromTheEnd(grid, rowLeftPostion, colLeftPosition, minPathSumFromPosition);
        }

        int topResult = Integer.MAX_VALUE;
        if (rowTopPosition >= 0) {
            topResult = visitNextFromTheEnd(grid, rowTopPosition, colTopPosition, minPathSumFromPosition);
        }


        int result = grid[row][col] + Math.min(leftResult, topResult);
        minPathSumFromPosition[row][col] = result;
        return result;
    }
}
