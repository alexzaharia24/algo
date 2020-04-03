import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

class FlightIntersection {
    int flightA, flightB, delayOfB;
    List<String> intersectionRanges;

    FlightIntersection(int a,int b) {
        this.flightA = a;
        this.flightB = b;
        this.intersectionRanges = new ArrayList<>();
    }
}

class FlightLog {
    int timestampOffset;
    int takeOffTimestamp;
    int globalTimestamp;
    double lat, lon, alt;

    public FlightLog(int takeOffTimestamp, int timestampOffset, double lat, double lon, double alt) {
        this.takeOffTimestamp = takeOffTimestamp;
        this.timestampOffset = timestampOffset;
        this.globalTimestamp = takeOffTimestamp + timestampOffset;
        this.lat = lat;
        this.lon = lon;
        this.alt = alt;
    }
}

class FlightInfo {
    String start, end;
    int takeOffTimestamp;
    int numberOfLogs;
    List<FlightLog> flightLogs;

    public FlightInfo(String start, String end, int takeOffTimestamp, int numberOfTimestamps) {
        this.start = start;
        this.end = end;
        this.takeOffTimestamp = takeOffTimestamp;
        this.numberOfLogs = numberOfTimestamps;
        this.flightLogs = new ArrayList<>();
    }
}

public class Main {
    public static void main(String[] args) throws IOException {
        Main man = new Main();

        man.solve();

    }

    public void writeResult(double lat, double lon, double alt, BufferedWriter fileWriter) throws IOException {
        fileWriter.write(lat + " " + lon + " " + alt + "\n");
    }

    public double interpolate(double timestamp, double timestampFirst, double timestampSecond, double firstCoord, double secondCoord) {
        double result = (firstCoord * (timestampSecond - timestamp) + secondCoord *(timestamp - timestampFirst) ) / (timestampSecond - timestampFirst);

        return result;
    }

    public boolean isValid(FlightInfo flightInfoA, FlightInfo flightInfoB) {
        if(flightInfoA.end.equals(flightInfoB.end)) return false;
        if()
    }

    public FlightIntersection getIntersectionPointsForFlights(int flightA, int flightB, int maxRange) throws IOException {
        FlightInfo flightInfoA = this.loadFromCsv(flightA);
        FlightInfo flightInfoB = this.loadFromCsv(flightB);





        return null;
    }

    public FlightInfo loadFromCsv(int flightId) throws IOException {
        String flightDataFileName = "level5/usedFlights/" + flightId + ".csv";
        FileReader flightReader = new FileReader(flightDataFileName);
        BufferedReader bufferedFlightReader = new BufferedReader(flightReader);

        String start = bufferedFlightReader.readLine();
        String end = bufferedFlightReader.readLine();
        Integer takeOffTimestamp = Integer.parseInt(bufferedFlightReader.readLine());
        Integer numberOfLogs = Integer.parseInt(bufferedFlightReader.readLine());

        FlightInfo flightInfo = new FlightInfo(start, end, takeOffTimestamp, numberOfLogs);

        for (int flight = 0; flight < numberOfLogs; flight++) {
            String lineSecondFlight = bufferedFlightReader.readLine();
            String[] tokens = lineSecondFlight.split(",");

            Integer timestampOffset = Integer.parseInt(tokens[0]);
            Double latitude = Double.parseDouble(tokens[1]);
            Double longitude = Double.parseDouble(tokens[2]);
            Double altitude = Double.parseDouble(tokens[3]);
//            Integer globalTimestamp = takeOffTimestamp + timestampOffset;

            FlightLog log = new FlightLog(takeOffTimestamp, timestampOffset, latitude, longitude, altitude);
            flightInfo.flightLogs.add(log);
        }

        return flightInfo;
    }

    public void solve() throws IOException {
        FileReader fileReader = new FileReader("level5/level5_5.in");
        BufferedReader bufferedReader = new BufferedReader(fileReader);


        FileWriter fileWriter = new FileWriter("level5/level5_5.out");
        BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);

        String firstLine = bufferedReader.readLine();
        int maxRange = Integer.parseInt(firstLine);
        int N = Integer.parseInt(firstLine);
        List<Integer> flights = new ArrayList<>();

        for (int i = 0; i < N; i++) {
            String recordLine = bufferedReader.readLine();
            int flightId = Integer.parseInt(recordLine);
            flights.add(flightId);
        }

        List<FlightIntersection> intersections = new ArrayList<>();

        for(int i=0; i<flights.size()-1; i++) {
            for (int j = i + 1; j < flights.size(); j++) {
                FlightIntersection intersection = getIntersectionPointsForFlights(flights.get(i), flights.get(j), maxRange);
                if (intersection != null) {
                    intersections.add(intersection);
                }
            }
        }

        bufferedWriter.close();
    }
}
