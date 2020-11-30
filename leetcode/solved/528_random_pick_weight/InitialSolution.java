import java.util.ArrayList;
import java.util.List;

class Solution {
    int totalWeight = 0;
    List<Integer> weights;
    
    public Solution(int[] w) {
        weights = new ArrayList<>();
        for(int i=0; i<w.length; i++) {
            totalWeight += w[i];
            weights.add(w[i]);
        }
    }
    
    public int pickIndex() {
        double rand = Math.random() * totalWeight;
        int currentWeight = 0;
        for(int i=0; i<weights.size();i++) {
            currentWeight += weights.get(i);
            if(currentWeight >= rand) {
                return i;
            }
        }
        return 0;
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(w);
 * int param_1 = obj.pickIndex();
 */

 public class InitialSolution {}