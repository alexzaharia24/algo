import java.io.*;
import java.util.*;

// https://en.wikipedia.org/wiki/Geographic_coordinate_conversion#From_geodetic_to_ECEF_coordinates

public class Main {
    double radius = 6371000;
    double semiMinorAxis = radius;
    double semiMajorAxis = radius;

    public static void main(String[] args) throws IOException {
        System.out.println("Level 3");

        Main man = new Main();


        FileReader fileReader = new FileReader("level3/level3_5.in");
        BufferedReader bufferedReader = new BufferedReader(fileReader);

        FileWriter fileWriter = new FileWriter("level3/level3_5.out");
        BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);

        String firstLine = bufferedReader.readLine();
        Map<String, Map<String, Integer>> flights = new HashMap<>();
        Set<String> uniqueFlights = new HashSet<>();
        int N = Integer.parseInt(firstLine);

        for (int i = 0; i < N; i++) {
            String recordLine = bufferedReader.readLine();
            String[] tokens = recordLine.split(",");
            Double latitude = Double.parseDouble(tokens[0]);
            Double longitude = Double.parseDouble(tokens[1]);
            Double altitiude = Double.parseDouble(tokens[2]);
            double X = man.computeX(latitude, longitude, altitiude);
            double Y = man.computeY(latitude, longitude, altitiude);
            double Z = man.computeZ(latitude, longitude, altitiude);
            System.out.println("X: " +X);
            System.out.println("Y: " +man.computeY(latitude, longitude, altitiude));
            System.out.println("Z: " +man.computeZ(latitude, longitude, altitiude));

            bufferedWriter.write(X + " " + Y + " " + Z + "\n");

        }

        bufferedWriter.close();
    }

    public Double computeX(Double lat, Double lon, Double alt) {
        lat = lat * Math.PI/180;
        lon = lon * Math.PI/180;
        double aSquared = semiMajorAxis * semiMajorAxis;
        double cosLat = Math.cos(lat);
        double cosLatSquared = cosLat * cosLat;
        double bSquared = semiMinorAxis * semiMinorAxis;
        double sinLat = Math.sin(lat);
        double sinLatSquared = sinLat * sinLat;
        double squareRoot = Math.sqrt(aSquared * cosLatSquared + bSquared * sinLatSquared);

        double NOfLatitude = aSquared / squareRoot;
        double result = (NOfLatitude + alt) * Math.cos(lat) * Math.cos(lon);
        return result;
    }

    public Double computeY(Double lat, Double lon, Double alt) {
        lat = lat * Math.PI/180;
        lon = lon * Math.PI/180;
        double aSquared = semiMajorAxis * semiMajorAxis;
        double cosLat = Math.cos(lat);
        double cosLatSquared = cosLat * cosLat;
        double bSquared = semiMinorAxis * semiMinorAxis;
        double sinLat = Math.sin(lat);
        double sinLatSquared = sinLat * sinLat;
        double squareRoot = Math.sqrt(aSquared * cosLatSquared + bSquared * sinLatSquared);

        double NOfLatitude = aSquared / squareRoot;
        double result = (NOfLatitude + alt) * Math.cos(lat) * Math.sin(lon);
        return result;
    }

    public Double computeZ(Double lat, Double lon, Double alt) {
        lat = lat * Math.PI/180;
        lon = lon * Math.PI/180;
        double aSquared = semiMajorAxis * semiMajorAxis;
        double cosLat = Math.cos(lat);
        double cosLatSquared = cosLat * cosLat;
        double bSquared = semiMinorAxis * semiMinorAxis;
        double sinLat = Math.sin(lat);
        double sinLatSquared = sinLat * sinLat;
        double squareRoot = Math.sqrt(aSquared * cosLatSquared + bSquared * sinLatSquared);

        double NOfLatitude = aSquared / squareRoot;
        double result = ((bSquared/aSquared) * NOfLatitude + alt) * Math.sin(lat);
        return result;
    }
}
