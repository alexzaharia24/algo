import java.util.*;

public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        String s = "amanaplanacanalpanama";
        man.partition(s);
    }

    public List<List<String>> partition(String s) {
        List<List<String>> allCombinations = partitionRecursive(s);
        List<List<String>> result = new ArrayList<>();

        for (int i = 0; i < allCombinations.size(); i++) {
            boolean isPartitionPalindrom = true;
            for (int j = 0; j < allCombinations.get(i).size(); j++) {
                if (!isPalindrom(allCombinations.get(i).get(j))) {
                    isPartitionPalindrom = false;
                    break;
                }
            }
            if(isPartitionPalindrom) result.add(allCombinations.get(i));
        }

        return result;
    }

    public List<List<String>> partitionRecursive(String str) {
        List<List<String>> localPartitions = new ArrayList<>();
        if (str.length() == 1) {
            localPartitions.add(Collections.singletonList(str));
            return localPartitions;
        }

        String left, right;
        for (int pivot = 1; pivot < str.length(); pivot++) {
            left = str.substring(0, pivot);
            right = str.substring(pivot);


            List<List<String>> leftPartitions = partitionRecursive(left);
            List<List<String>> rightPartitions = partitionRecursive(right);
            List<List<String>> merged = mergePartitions(leftPartitions, rightPartitions);
            for (int i = 0; i < merged.size(); i++) {
                if (!localPartitions.contains(merged.get(i))) {
                    localPartitions.add(merged.get(i));
                }
            }
        }
        return localPartitions;
    }

    public List<List<String>> mergePartitions(List<List<String>> leftPartitions, List<List<String>> rightPartitions) {
        List<List<String>> merged = new ArrayList<>();

        for (int i = 0; i < leftPartitions.size(); i++) {
            List<String> leftPartition = leftPartitions.get(i);
            for (int j = 0; j < rightPartitions.size(); j++) {
                List<String> rightPartition = rightPartitions.get(j);

                // Partition 1
                List<String> partition1 = new ArrayList<>();

                partition1.addAll(leftPartition.subList(0, leftPartition.size() - 1));

                String connected = leftPartition.get(leftPartition.size() - 1) + rightPartition.get(0);
                partition1.add(connected);

                partition1.addAll(rightPartition.subList(1, rightPartition.size()));

                // Partition 2
                List<String> partition2 = new ArrayList<>();
                partition2.addAll(leftPartition);
                partition2.addAll(rightPartition);

                merged.add(partition1);
                merged.add(partition2);
            }
        }

        return merged;
    }

    boolean isPalindrom(String str) {
        int i = 0, j = str.length() - 1;
        while (j >= i) {
            if (str.charAt(i) != str.charAt(j)) return false;
            i++;
            j--;
        }
        return true;
    }
}
