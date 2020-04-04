import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        Map<Integer, Integer> map = new HashMap<>();
        map.keySet().iterator();

    }

    public int[] asteroidCollision(int[] asteroids) {
        List<Integer> ast = new ArrayList<>();
        if (asteroids.length < 2) return asteroids;

        boolean isCollision = true;
        List<Integer> intermediary = new ArrayList<>();
        for( )

        while(isCollision) {
            isCollision = false;
            List<Integer> intermediary = new ArrayList<>();

        }

        // First pass through asteroids

        for (int i = 0; i < asteroids.length - 1; i++) {
            if (sign(asteroids[i]) < 0 && sign(asteroids[i + 1]) > 0) {
                ast.add(asteroids[i]);
                if (i == asteroids.length - 1) {
                    ast.add(asteroids[i + 1]); // at the last asteroid. add it since the left one will not clash with it
                }
            }
            int biggerAsteroid = getBiggerAsteroid(asteroids[i], asteroids[i + 1]);
            if (biggerAsteroid != 0) {
                ast.add(biggerAsteroid);
                i += 1; // jump one more asteroid since one exploded
            } else {
                i += 1; // jump over asteroids since both exploded
            }
        }



        int[] result = new int[ast.size()];
        for (int i = 0; i < ast.size(); i++) {
            result[i] = ast.get(i);
        }
        return result;
    }

    int sign(int number) {
        if (number < 0) return -1;
        return 1;
    }

    int getBiggerAsteroid(int ast1, int ast2) {
        if (Math.abs(ast1) > Math.abs(ast2)) return ast1;
        else if (Math.abs(ast1) < Math.abs(ast2)) return ast2;
        return 0;
    }
}
