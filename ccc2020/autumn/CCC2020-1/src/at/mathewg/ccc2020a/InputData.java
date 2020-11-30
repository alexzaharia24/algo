package at.mathewg.ccc2020a;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class InputData {
    // structure for the inputData
    public int level = 1;

    static class Pair {
        public int minute;
        public long second;

        public Pair(int minute, long second) {
            this.minute = minute;
            this.second = second;
        }
    }

    static class Task {
        public int id;
        public House house;
        public int totalNeeded;
        public int earliest;
        public int latest; //inclusive

        public List<Pair> cheapestMinutes= new LinkedList<>();

        public Map<Integer,Long> usagesByMinute= new HashMap<>();
        public int remaining;


    }

    static class House {
        public long id;
        public LinkedList<Task> tasks= new LinkedList<>();
        List<Long> usageByMinute = new ArrayList<>();
        List<Integer> taskByMinute = new ArrayList<>();
    }

    public List<Integer> price=new ArrayList<>();

    public LinkedList<Task> tasks= new LinkedList<>();
    public LinkedList<House> houses= new LinkedList<>();

    public long maxPower;
    public long maxBill;
    public long maxTasks;


    public static InputData readData(int level, String partId) {
        InputData data = new InputData();
        data.level = level;
        try {
            String filename = "inputs/level" + level + "_" + partId + ".in";
            List<String> lines = Files.readAllLines(Paths.get(filename));

            String[] tokens;

            int line= 0;
            data.maxPower= Long.parseLong(lines.get(line++));
            data.maxBill= Long.parseLong(lines.get(line++));
            data.maxTasks= Long.parseLong(lines.get(line++));

            int n= Integer.parseInt(lines.get(line++));
            for(int i = 0; i < n;++i) {
                data.price.add(Integer.parseInt(lines.get(line+i)));
            }
            line+= n;


            int houses= Integer.parseInt(lines.get(line++));
            for(int house= 0;house < houses;++house) {
                House h= new House();
                h.id = house+1;
                int tasks = Integer.parseInt(lines.get(line++));
                for (int i = 0; i < tasks; ++i) {
                    tokens = lines.get(line + i).split(" ");
                    Task task = new Task();
                    task.id = Integer.parseInt(tokens[0]);
                    task.totalNeeded = Integer.parseInt(tokens[1]);
                    task.remaining = task.totalNeeded;
                    task.earliest = Integer.parseInt(tokens[2]);
                    task.latest = Integer.parseInt(tokens[3]);
                    task.house= h;
                    h.tasks.add(task);
                }
                data.houses.add(h);
                line += tasks;
            }


        } catch (IOException e) {
            e.printStackTrace();
        }
        return data;
    }


}
