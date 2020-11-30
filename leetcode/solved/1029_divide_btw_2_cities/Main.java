import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        // [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]
        int[][] x = {{259,770},{448,54},{926,667},{184,139},{840,118},{577,469}};
        // -511, 394, 259, 45, 722, 108
        // order: 0, 3, 5, 2, 1, 4 => [259, 770], [184, 139], [577, 469], [926, 667], [448, 54], [840, 118]
        System.out.println(man.twoCitySchedCost(x));
    }

    public int twoCitySchedCost(int[][] costs) {
        int sum = 0;
        Arrays.sort(costs, (int[] cost1, int[] cost2) -> {return (cost1[0] - cost1[1]) - (cost2[0] - cost2[1]); }); // Sort with min difference for btw city A and city B
        for(int i=0; i<costs.length; i++){
            int[] cost = costs[i]; 
            System.out.println(Arrays.toString(cost));
            if(i < costs.length / 2) {
                // city A
                sum += costs[i][0];
            } else {
                sum += costs[i][1];
            }

        }
        
        return sum;
    }
}