import java.util.ArrayList;
import java.util.List;

class Region {
    int row;
    int col;

    Region(int row, int col) {
        this.row = row;
        this.col = col;
    }
}

public class Main {

    public static void main(String[] args) {
        Main man = new Main();

        char[][] board = new char[][]{
                {'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O'},
                {'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'X'},
                {'O', 'X', 'O', 'X', 'O', 'O', 'O', 'O', 'X'},
                {'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O'},
                {'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X'},
                {'X', 'X', 'O', 'O', 'X', 'O', 'X', 'O', 'X'},
                {'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O'},
                {'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O'},
                {'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O', 'O'}
        };

//        [
//        ["O","X","O","O","O","O","O","O","O"],
//        ["O","O","O","X","O","O","O","O","X"],
//        ["O","X","O","X","O","O","O","O","X"],
//        ["O","O","O","O","X","O","O","O","O"],
//        ["X","O","O","O","O","O","O","O","X"],
//        ["X","X","O","O","X","O","X","O","X"],
//        ["O","O","O","X","O","O","O","O","O"],
//        ["O","O","O","X","O","O","O","O","O"],
//        ["O","O","O","O","O","X","X","O","O"]
//        ]

//          [
//          ["O","X","O","O","O","O","O","O","O"],
//          ["O","O","O","X","O","O","O","O","X"],
//          ["O","X","O","X","X","O","O","O","X"],
//          ["O","O","O","O","X","O","O","O","O"],
//          ["X","O","O","O","O","O","O","O","X"],
//          ["X","X","O","O","X","O","X","O","X"],
//          ["O","O","O","X","O","O","O","O","O"],
//          ["O","O","O","X","O","O","O","O","O"],
//          ["O","O","O","O","O","X","X","O","O"]
//          ]

        man.solve(board);
        System.out.println();
    }

    public void solve(char[][] board) {
        if (board.length == 0) return;
        markRegions(board);
    }

    public void markRegions(char[][] board) {
        if (board.length == 0) return;
        int nrRows = board.length;
        int nrCols = board[0].length;
        boolean[][] visited = new boolean[nrRows][nrCols];

        for (int i = 1; i < nrRows - 1; i++) {
            for (int j = 1; j < nrCols - 1; j++) {
                if (board[i][j] == 'O' && !visited[i][j]) {
                    List<Region> regionPoints = new ArrayList<>();
                    if (dfs(i, j, board, visited, regionPoints)) {
                        drawXInRegionPoints(regionPoints, board);
                    }
                }
            }
        }
    }

    void drawXInRegionPoints(List<Region> regionPoints, char[][] board) {
        for (int i = 0; i < regionPoints.size(); i++) {
            int row = regionPoints.get(i).row;
            int col = regionPoints.get(i).col;
            board[row][col] = 'X';
        }
    }


    boolean dfs(int currentRow, int currentCol, char[][] board, boolean[][] visited, List<Region> regionPoints) {
        visited[currentRow][currentCol] = true;
        regionPoints.add(new Region(currentRow, currentCol));

        int[] neighbourRowDistance = new int[]{-1, 0, 1, 0}; // Up, right, down and left
        int[] neighbourColDistance = new int[]{0, 1, 0, -1};

        boolean notBordered = true;
        for (int i = 0; i < neighbourRowDistance.length; i++) {
            int nextRow = currentRow + neighbourRowDistance[i];
            int nextCol = currentCol + neighbourColDistance[i];
            if (isValid(nextRow, nextCol, board, visited)) {
                if(isBorder(nextRow, nextCol, board)) notBordered = false;
                notBordered = dfs(nextRow, nextCol, board, visited, regionPoints) && notBordered ;
            }
        }

        return notBordered;
    }

    boolean isBorder(int currentRow, int currentCol, char[][] board) {
        int nrRows = board.length;
        int nrCols = board[0].length;
        return currentRow == 0 || currentRow == nrRows - 1 || currentCol == 0 || currentCol == nrCols - 1;
    }

    boolean isValid(int currentRow, int currentCol, char[][] board, boolean[][] visited) {
        int nrRows = board.length;
        int nrCols = board[0].length;

        return currentRow >= 0 && currentRow < nrRows && currentCol >= 0 && currentCol < nrCols && board[currentRow][currentCol] == 'O' && !visited[currentRow][currentCol];
    }
}
