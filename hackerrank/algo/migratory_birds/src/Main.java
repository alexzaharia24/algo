import java.util.List;

public class Main {

    static int migratoryBirds(List<Integer> arr) {
        int result = 0;

        int[] nrOfSightings = new int[6];

        for (int i = 0; i < arr.size(); i++) {
            nrOfSightings[arr.get(i)]++;
        }

        int maxSightings = 0, maxIdx = 0;

        for (int i = 1; i < 6; i++) {
            if (nrOfSightings[i] > maxSightings) {
                maxSightings = nrOfSightings[i];
                maxIdx = i;
            }
        }

        result = maxIdx;

        return result;
    }

    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
