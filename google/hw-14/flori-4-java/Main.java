import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        try {
            FileReader fr = new FileReader(new File("flori4.in"));
            BufferedReader bfr = new BufferedReader(fr);
            String line = bfr.readLine();
            bfr.close();

            Integer n = Integer.parseInt(line);
            int nrBuchete = flori4(n);

            BufferedWriter bfw = new BufferedWriter(new FileWriter(new File("flori4.out")));
            System.out.println(nrBuchete);
            bfw.write(nrBuchete + "");
            bfw.close();
        } catch (IOException e) {
            System.out.println("IO error: " + e);
        }
    }

    public static int flori4(int n) {
        return flori4Iterative(n);
    }

    public static int flori4Iterative(int n) {
        // dp[i] = suma de d[1] + .... + dp[i-2] + 1 (toate posibilitatile de a face
        // buchete cu flori neadiacente pana acum)
        int[] dp = new int[n + 1];
        dp[1] = 1;
        int sum = 0;
        for (int i = 2; i <= n; i++) {
            dp[i] = (sum + 1) % 9001;
            sum = (sum + dp[i - 1]) % 9001;
        }

        int nrBuchete = 0;
        for (int i = 1; i <= n; i++) {
            nrBuchete = (nrBuchete + dp[i]) % 9001;
        }
        return nrBuchete;
    }
}