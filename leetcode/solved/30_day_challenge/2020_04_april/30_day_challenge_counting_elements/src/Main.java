import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        int[] arr = new int[] {1,3,2,3,5,0};
        System.out.println(man.countElements(arr));
    }

    public int countElements(int[] arr) {
//        this.countElementsWithSort(arr);
        if(arr.length == 1) return 0;
        return this.countElementsWithOccurrencesArray(arr);
    }

    public int countElementsWithOccurrencesArray(int[] arr) {
        int[] occurrences = new int[1001];
        int count = 0;

        for (int value : arr) {
            occurrences[value]++;
        }

        for(int i=0; i<occurrences.length-1; i++) {
            if(occurrences[i+1] > 0) {
                count+=occurrences[i];
            }
        }

        return count;
    }

    public int countElementsWithSort(int[] arr) {
        if (arr.length < 2) return 0;
        Arrays.sort(arr);
        int count = 0;
        int currentNumberCount = 1;
        int currentNumber = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] != currentNumber) {
                if (arr[i] == currentNumber + 1) {
                    count+= currentNumberCount;
                }
                currentNumber = arr[i];
                currentNumberCount = 1;
            } else {
                currentNumberCount++;
            }
        }

        return count;
    }
}
