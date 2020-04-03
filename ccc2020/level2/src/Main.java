import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        System.out.println("Level 2");

        FileReader fileReader = new FileReader("level2/level2_5.in");
        BufferedReader bufferedReader = new BufferedReader(fileReader);

        FileWriter fileWriter = new FileWriter("level2/level2_5.out");
        BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);

        String firstLine = bufferedReader.readLine();
        Map<String, Map<String, Integer>> flights = new HashMap<>();
        Set<String> uniqueFlights = new HashSet<>();
        int N = Integer.parseInt(firstLine);


        for (int i = 0; i < N; i++) {
            String recordLine = bufferedReader.readLine();
            String[] tokens = recordLine.split(",");
            Integer timestamp = Integer.parseInt(tokens[0]);
            Double latitude = Double.parseDouble(tokens[1]);
            Double longitude = Double.parseDouble(tokens[2]);
            Double altitiude = Double.parseDouble(tokens[3]);
            String start = (tokens[4]);
            String end = (tokens[5]);
            Double takeOffTimestamp = Double.parseDouble(tokens[6]);

            String uniqueFlight = start + "-" + end + "-" + takeOffTimestamp.toString();
            if(!uniqueFlights.contains(uniqueFlight)) {
                uniqueFlights.add(uniqueFlight);
                flights.putIfAbsent(start, new HashMap<>());
                flights.get(start).putIfAbsent(end, 0);
                flights.get(start).put(end, flights.get(start).get(end) + 1);
            }
        }

        List<String> keysStart = new ArrayList<>(flights.keySet());
        Collections.sort(keysStart);

        for (int i = 0; i < keysStart.size(); i++) {
            List<String> keysEnd = new ArrayList<>(flights.get(keysStart.get(i)).keySet());
            Collections.sort(keysEnd);

            for (int j = 0; j < keysEnd.size(); j++) {
                System.out.println(keysStart.get(i) + " " + keysEnd.get(j) + " " + flights.get(keysStart.get(i)).get(keysEnd.get(j)));
                bufferedWriter.write(keysStart.get(i) + " " + keysEnd.get(j) + " " + flights.get(keysStart.get(i)).get(keysEnd.get(j)) + "\n");
            }
        }

        bufferedWriter.close();
    }
}