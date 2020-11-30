import java.io.*;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
//        double y = (55.78 * (298 - 292) + 55.771 * (292 - 286)) / (298 - 286);
//        System.out.println("y = " + y);

        Main man = new Main();

//        System.out.println(man.interpolate(292, 286, 298, 55.78, 55.771));
        man.solve();

    }

    public void writeResult(double lat, double lon, double alt, BufferedWriter fileWriter) throws IOException {
        fileWriter.write(lat + " " + lon + " " + alt + "\n");
    }

    public double interpolate(double timestamp, double timestampFirst, double timestampSecond, double firstCoord, double secondCoord) {
        double result = (firstCoord * (timestampSecond - timestamp) + secondCoord *(timestamp - timestampFirst) ) / (timestampSecond - timestampFirst);

        return result;
    }

    public void solve() throws IOException {
        FileReader fileReader = new FileReader("level4/level4_5.in");
        BufferedReader bufferedReader = new BufferedReader(fileReader);


        FileWriter fileWriter = new FileWriter("level4/level4_5.out");
        BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);

        String firstLine = bufferedReader.readLine();
        int N = Integer.parseInt(firstLine);

        for (int i = 0; i < N; i++) {
            String recordLine = bufferedReader.readLine();
            String[] tokens = recordLine.split(" ");

            int fileId = Integer.parseInt(tokens[0]);
            int timestamp = Integer.parseInt(tokens[1]);

            String flightDataFileName = "level4/usedFlights/" + fileId + ".csv";
            FileReader flightReader = new FileReader(flightDataFileName);
            BufferedReader bufferedFlightReader = new BufferedReader(flightReader);

            String start = bufferedFlightReader.readLine();
            String end = bufferedFlightReader.readLine();
            Integer takeOffTimestamp = Integer.parseInt(bufferedFlightReader.readLine());
            Integer numberOfFlights = Integer.parseInt(bufferedFlightReader.readLine());

            String lineFirstFlight = bufferedFlightReader.readLine();
            tokens = lineFirstFlight.split(",");

            Integer timestampOffsetFirstFlight = Integer.parseInt(tokens[0]);
            Integer takeOffTimestampFirstFlight = takeOffTimestamp + timestampOffsetFirstFlight;
            Double latitudeFirstFlight = Double.parseDouble(tokens[1]);
            Double longitudeFirstFlight = Double.parseDouble(tokens[2]);
            Double altitudeFirstFlight = Double.parseDouble(tokens[3]);

            for (int flight = 1; flight < numberOfFlights; flight++) {
                String lineSecondFlight = bufferedFlightReader.readLine();
                tokens = lineSecondFlight.split(",");

                Integer timestampOffsetSecondFlight = Integer.parseInt(tokens[0]);
                Double latitudeSecondFlight = Double.parseDouble(tokens[1]);
                Double longitudeSecondFlight = Double.parseDouble(tokens[2]);
                Double altitudeSecondFlight = Double.parseDouble(tokens[3]);

                Integer takeOffTimestampSecondFlight = takeOffTimestamp + timestampOffsetSecondFlight;

                if(timestamp == takeOffTimestampFirstFlight) {
                    writeResult(latitudeFirstFlight, longitudeFirstFlight, altitudeFirstFlight, bufferedWriter);
                    break;
                } else if(timestamp == takeOffTimestampSecondFlight) {
                    writeResult(latitudeSecondFlight, longitudeSecondFlight, altitudeSecondFlight, bufferedWriter);
                    break;
                } else if((timestamp > takeOffTimestampFirstFlight) && (timestamp < takeOffTimestampSecondFlight)) {
                    double lat = interpolate(timestamp, takeOffTimestampFirstFlight, takeOffTimestampSecondFlight, (double)latitudeFirstFlight, latitudeSecondFlight);
                    double lon = interpolate(timestamp, takeOffTimestampFirstFlight, takeOffTimestampSecondFlight, longitudeFirstFlight, longitudeSecondFlight);
                    double alt = interpolate(timestamp, takeOffTimestampFirstFlight, takeOffTimestampSecondFlight, altitudeFirstFlight, altitudeSecondFlight);
                    writeResult(lat, lon, alt, bufferedWriter);
                }

                takeOffTimestampFirstFlight = takeOffTimestampSecondFlight;
                latitudeFirstFlight = latitudeSecondFlight;
                longitudeFirstFlight = longitudeSecondFlight;
                altitudeFirstFlight = altitudeSecondFlight;

            }

            // Q: garantat poate fi interpolat intre 2 valori? nu depaseste ultima valoare? sau inaintede prima valoare?
        }

        bufferedWriter.close();
    }
}
