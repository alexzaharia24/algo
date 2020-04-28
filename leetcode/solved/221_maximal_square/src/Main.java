/**
 * https://leetcode.com/problems/maximal-square/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();

//        char[][] matrix = new char[][]{
//                {'1', '0', '1', '0', '1'},
//                {'1', '0', '1', '1', '1'},
//                {'1', '1', '1', '1', '1'},
//                {'1', '0', '0', '1', '0'},
//        };

        char[][] matrix = new char[][]{
                {'0', '1', '1', '0', '0', '1', '0', '1', '0', '1'},
                {'0', '0', '1', '0', '1', '0', '1', '0', '1', '0'},
                {'1', '0', '0', '0', '0', '1', '0', '1', '1', '0'},
                {'0', '1', '1', '1', '1', '1', '1', '0', '1', '0'},
                {'0', '0', '1', '1', '1', '1', '1', '1', '1', '0'},
                {'1', '1', '0', '1', '0', '1', '1', '1', '1', '0'},
                {'0', '0', '0', '1', '1', '0', '0', '0', '1', '0'},
                {'1', '1', '0', '1', '1', '0', '0', '1', '1', '1'},
                {'0', '1', '0', '1', '1', '0', '1', '0', '1', '1'}
        };

        System.out.println(man.maximalWithBrute(matrix));
    }

    public int maximalSquare(char[][] matrix) {

        return maximalWithBrute(matrix);
    }

    public int maximalWithBrute(char[][] matrix) {
        int result = 0;
        if (matrix.length == 0) return 0;
        int n = matrix.length, m = matrix[0].length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (matrix[i][j] == '1') {
                    int squareSize = computeMaxSquare(i, j, matrix);
                    result = Math.max(result, squareSize * squareSize);
                }
            }
        }

        return result;
    }

    public int computeMaxSquare(int row, int col, char[][] matrix) {
        int squareSize = 1;
        int n = matrix.length, m = matrix[0].length;
        boolean goOn = true;

        while (goOn) {
            if ((row + squareSize) >= n || (col + squareSize) >= m) return squareSize;
            for (int j = col; j < col + squareSize; j++) {
                if (matrix[row + squareSize][j] == '0') {
                    return squareSize;
                } // next row check
            }
            for (int i = row; i < row + squareSize; i++) {
                if (matrix[i][col + squareSize] == '0') {
                    return squareSize;
                } // next col check
            }

            if (matrix[row + squareSize][col + squareSize] == '0') {
                goOn = false;
            } // intersection element check

            if (goOn) {
                squareSize++;
            }
        }


        return squareSize;
    }
}
