import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class BinaryMatrix {
    int[][] matrix;
    int getCalls = 0;

    BinaryMatrix(int[][] matrix) {
        this.matrix = matrix;
    }

    List<Integer> dimensions() {
        return Arrays.asList(matrix.length, matrix[0].length);
    }

    Integer get(int x, int y) {
        if(getCalls == 1000) return null;
        getCalls++;
        return matrix[x][y];
    }
}

public class Main {
    public static void main(String[] args) {

    }

    public int leftMostColumnWithOne(BinaryMatrix binaryMatrix) {
        return topRightApproach(binaryMatrix);
    }

    public int topRightApproach(BinaryMatrix binaryMatrix) {
        List<Integer> dimensions = binaryMatrix.dimensions();
        int n = dimensions.get(0), m = dimensions.get(1);

        int x = 0, y = m - 1; // Start from top right
        int minColumn = -1;
        while(x < n && y >=0) { // go until column 0, any row
            int value = binaryMatrix.get(x, y);
            if(value == 0) {
                // No need to continue on this row. Move to the next one
                x++;
            } else {
                // This column is valid. Try to find a better one. Move to previous one
                minColumn = y;
                y--;
            }
        }
        return minColumn;
    }

    public int rowBinarySearch(BinaryMatrix binaryMatrix) {
        List<Integer> dimensions = binaryMatrix.dimensions();
        int n = dimensions.get(0), m = dimensions.get(1);

        int minColumn = m, minColumnRow = -1;
        for(int i=0; i<n; i++) {
            // Search on each column the leftest 1
            int left = 0, right = m-1;
            int lastOne = m;
            while(left <= right) {
                int middle = (left + right) / 2;
                int value = binaryMatrix.get(i, middle);
                if(value == 1) {
                    lastOne = middle;
                    // then go left
                    right = middle - 1;
                } else {
                    // go right
                    left = middle + 1;
                }
            }
            if(lastOne < minColumn) {
                minColumn = lastOne;
                minColumnRow = i;
            }
        }

        return minColumn != m ? minColumn : -1;
    }
}
