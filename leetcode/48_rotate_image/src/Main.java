public class Main {
    public static void main(String[] args) {
        Main mn = new Main();

//        int[][] m = new int[][]{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] m = new int[][]{{1, 2, 3,4}, {5, 6,7,8}, {9,10,11,12}, {13,14,15,16}};

        mn.rotate(m);
        System.out.println(mn);
    }

    public void rotate(int[][] matrix) {
        int aux;
        int n = matrix.length;
        if(n == 1) return;
        if (n == 2) {
            aux = matrix[0][0];
            matrix[0][0] = matrix[0][1];
            matrix[0][1] = aux;
            aux = matrix[0][0];
            matrix[0][0] = matrix[1][0];
            matrix[1][0] = aux;
            aux = matrix[1][0];
            matrix[1][0] = matrix[1][1];
            matrix[1][1] = aux;
            return;
        }

        for (int i = 0; i < n - 1; i++) {
            for (int j = i; j < n - i-1; j++) {
                aux = matrix[i][j];
                matrix[i][j] = matrix[j][n-i-1];
                matrix[j][n-i-1] = aux;

                aux = matrix[i][j];
                matrix[i][j] = matrix[n-j-1][i];
                matrix[n-j-1][i] = aux;

                aux = matrix[n-j-1][i];
                matrix[n-j-1][i] = matrix[n-i-1][n-j-1];
                matrix[n-i-1][n-j-1] = aux;
            }
        }

    }
}
