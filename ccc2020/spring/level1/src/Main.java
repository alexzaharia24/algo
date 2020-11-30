import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        System.out.println("Level 1");

        FileReader fileReader = new FileReader("level1/level1_5.in");
        BufferedReader bufferedReader = new BufferedReader(fileReader);

        String firstLine = bufferedReader.readLine();
        int N = Integer.parseInt(firstLine);
        int minTimestamp = Integer.MAX_VALUE, maxTimestamp = Integer.MIN_VALUE;
        double minLat = Double.MAX_VALUE, maxLat = Double.MIN_VALUE;
        double minLong = Double.MAX_VALUE, maxLong = Double.MIN_VALUE;
        double maxAlt = Double.MIN_VALUE;

        for (int i = 0; i < N; i++) {
            String recordLine = bufferedReader.readLine();
            String[] tokens = recordLine.split(",");
            Integer timestamp = Integer.parseInt(tokens[0]);
            Double latitude = Double.parseDouble(tokens[1]);
            Double longitude = Double.parseDouble(tokens[2]);
            Double altitiude = Double.parseDouble(tokens[3]);

            minTimestamp = Math.min(minTimestamp, timestamp);
            maxTimestamp = Math.max(maxTimestamp, timestamp);

            minLat = Math.min(minLat, latitude);
            maxLat = Math.max(maxLat, latitude);

            minLong = Math.min(minLong, longitude);
            maxLong = Math.max(maxLong, longitude);

            maxAlt = Math.max(maxAlt, altitiude);
        }

        FileWriter fileWriter = new FileWriter("level1/level1_5.out");
        BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
        bufferedWriter.write(minTimestamp + " " + maxTimestamp + "\n");
        bufferedWriter.write(minLat + " " + maxLat + "\n");
        bufferedWriter.write(minLong + " " + maxLong + "\n");
        bufferedWriter.write(maxAlt + "");

        bufferedWriter.close();
    }
}
