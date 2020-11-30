package at.mathewg.ccc2020a;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;
import java.util.stream.Collectors;


/**
 * IMPORTANT: if anyone actually ever reads this code: drop me a line
 * markus.zancolo@gmx.net
 *
 */
public class App {

    public static Random rand= new Random(System.currentTimeMillis());

    public static void main(String[] args) throws IOException {
        int level = 7;
        PrintWriter writer = null;
/*
        System.out.println("Level "+level);
        String result = doLevel(InputData.readData(level, "example"));
        writer = new PrintWriter("outputs/output"+level+"-example.txt",
                "UTF-8");
        writer.print(result);
        writer.close();
        System.out.println("sample result:\n" + result);
//*/
        for (int i = 5; i <= 5; ++i) {
             writer = new PrintWriter("outputs/output"+level+"-" + i + ".txt",
                    "UTF-8");
            System.out.print("doing Part " + i);
            writer.print(doLevel(InputData.readData(level, "" + i)));
            writer.close();
            System.out.println(" done Part " + i);
        }
    }

    private static String doLevel(InputData data) {
	switch (data.level) {
	case 1:
	    return doLevel1(data);

	case 2:
	    return doLevel2(data);

	case 3:
	    return doLevel3(data);

	case 4:
	    return doLevel4(data);

	case 5:
	    return doLevel5(data);

	case 6:
	    return doLevel6(data);

	case 7:
	    return doLevel7(data);

	case 8:
	    return doLevel8(data);

	}
	return "";
    }


    private static String doLevel1(InputData data) {
	    StringBuilder output = new StringBuilder();

	    int cheapest= data.price.get(0);
	    int minute= 0;
	    for(int idx= 0; idx < data.price.size();++idx) {
	        if(cheapest > data.price.get(idx)) {
	            cheapest= data.price.get(idx);
	            minute= idx;
            }
        }
        output.append(minute);
        return output.toString();
    }

    // ============================================
    // Level 2
    // ============================================

    private static String doLevel2(InputData data) {
        StringBuilder output = new StringBuilder();

        output.append(data.tasks.size()).append(System.lineSeparator());
        for(InputData.Task task : data.tasks) {
            int current=0;
            for(int i= 0; i < task.totalNeeded;++i) {
                current += data.price.get(i);
            }
            int best= current;
            int bestStart= 0;
            for(int start= 1; start <= data.price.size()-task.totalNeeded;start++) {
                current+= data.price.get(start+task.totalNeeded-1) - data.price.get(start-1);
                if(current < best) {
                    best= current;
                    bestStart= start;
                }
            }
            output.append(task.id).append(" ").append(bestStart).append(System.lineSeparator());
        }

        return output.toString();
    }

    // ============================================
    // Level 3
    // ============================================

    private static String doLevel3(InputData data) {
        StringBuilder output = new StringBuilder();

        output.append(data.tasks.size()).append(System.lineSeparator());
        for(InputData.Task task : data.tasks) {

            int cheapest= data.price.get(task.earliest);
            int minute= task.earliest;
            for(int idx= task.earliest; idx <= task.latest;++idx) {
                if(cheapest > data.price.get(idx)) {
                    cheapest= data.price.get(idx);
                    minute= idx;
                }
            }
            output.append(task.id).append(" ").append(minute).append(" ").append(task.totalNeeded).append(System.lineSeparator());
        }

        return output.toString();
    }

    // ============================================
    // Level 4
    // ============================================

    private static String doLevel4(InputData data) {
        StringBuilder output = new StringBuilder();

        List<List<InputData.Task>> tasksByMinute= new ArrayList<>();
        while(tasksByMinute.size() < data.price.size()) {
            tasksByMinute.add(new LinkedList<>());
        }

        output.append(data.tasks.size()).append(System.lineSeparator());
        for(InputData.Task task : data.tasks) {
            //fill cheapest

            for(int idx= task.earliest; idx <= task.latest;++idx) {
                task.cheapestMinutes.add(new InputData.Pair(idx,data.price.get(idx)));
            }
            task.cheapestMinutes.sort(Comparator.comparingLong(o -> o.second));
        }

        boolean done= false;
        int loopBreak= 0;
        while(!done && loopBreak++ < 100) {
            done = optimizeOld(data);
        }

        if(!done) {
            System.out.println("PROBLEM: couldn't find good solution");
        }


        for (InputData.Task task : data.tasks) {

            output.append(task.id);
            for (Map.Entry<Integer, Long> usage : task.usagesByMinute.entrySet()) {
                output.append(" ").append(usage.getKey()).append(" ").append(usage.getValue());
            }
            output.append(System.lineSeparator());
        }



        //now decide

        return output.toString();
    }


    private static boolean optimize(InputData data,boolean randomMinute) {

        long totalBill= 0;

        for (InputData.Task task : data.tasks) {
            task.remaining= task.totalNeeded;
            task.usagesByMinute.clear();
        }

        //try greedy:
        List<Long> usageByMinute = new ArrayList<>();
        while (usageByMinute.size() < data.price.size()) {
            usageByMinute.add(0L);
        }
        List<Integer> taskByMinute = new ArrayList<>();
        while (taskByMinute.size() < data.price.size()) {
            taskByMinute.add(0);
        }
        List<InputData.Task> random= new LinkedList<>(data.tasks);
        Collections.shuffle(random);
        boolean someremaining = true;
        while (someremaining) {
            someremaining = false;
            long cheapestPrice = Long.MAX_VALUE;
            int cheapestMinute = -1;
            InputData.Task cheapestTask= null;
            for (InputData.Task task : random) {
                //fill cheapest
                if (task.remaining == 0) {
                    continue;
                }
                someremaining = true;


                for (InputData.Pair pair : task.cheapestMinutes) {
                    if (usageByMinute.get(pair.minute) < data.maxPower &&
                            (task.usagesByMinute.containsKey(pair.minute) || taskByMinute.get(pair.minute) < data.maxTasks)) {
                        long price = priceForMinute(data.price.get(pair.minute), usageByMinute.get(pair.minute) + 1, data.maxPower) *
                                (usageByMinute.get(pair.minute) + 1);
                        if (price < cheapestPrice) {
                            cheapestPrice = price;
                            cheapestMinute = pair.minute;
                            cheapestTask = task;
                        }
                        if(price > cheapestPrice * 2)  {
                            break;
                        }
                    }
                }

            }
            if (cheapestMinute < 0) {
                return false;
            }

            InputData.Pair using = new InputData.Pair(cheapestMinute, 1);
            cheapestTask.remaining -= using.second;
            usageByMinute.set(cheapestMinute, usageByMinute.get(cheapestMinute) + using.second);

            totalBill += priceForMinute(data.price.get(cheapestMinute), usageByMinute.get(cheapestMinute), data.maxPower) * using.second;
            if (cheapestTask.usagesByMinute.containsKey(cheapestMinute)) {
                cheapestTask.usagesByMinute.put(cheapestMinute, cheapestTask.usagesByMinute.get(cheapestMinute) + 1);
            } else {
                taskByMinute.set(cheapestMinute, taskByMinute.get(cheapestMinute) + 1);
                cheapestTask.usagesByMinute.put(cheapestMinute, 1L);
            }

            if (totalBill > data.maxBill) {
                return false;
            }
        }

        if(data.level >= 6) {
            //check with increased
            totalBill= 0;
            for(int idx= 0; idx < usageByMinute.size();++idx) {
                totalBill += priceForMinute(data.price.get(idx),usageByMinute.get(idx),data.maxPower)*usageByMinute.get(idx);
            }
            if (totalBill > data.maxBill) {
                return false;
            }
        }
        return true;
    }


    private static boolean optimizeAll(InputData data) {

        long totalBill= 0;

        for(InputData.House house: data.houses) {
            for (InputData.Task task : house.tasks) {
                task.remaining = task.totalNeeded;
                task.usagesByMinute.clear();
            }
            while (house.taskByMinute.size() < data.price.size()) {
                house.taskByMinute.add(0);
            }
            while (house.usageByMinute.size() < data.price.size()) {
                house.usageByMinute.add(0L);
            }
        }

        //try greedy:
        List<Long> totalusageByMinute = new ArrayList<>();
        while (totalusageByMinute.size() < data.price.size()) {
            totalusageByMinute.add(0L);
        }
        List<Set<InputData.Task>> tasksPossibleByMinute= new ArrayList<>();

        while (tasksPossibleByMinute.size() < data.price.size()) {
            tasksPossibleByMinute.add(new HashSet<>());
        }
        for(InputData.House house: data.houses) {
            for (InputData.Task t : house.tasks) {
                for (int minute = t.earliest; minute <= t.latest; ++minute) {
                    tasksPossibleByMinute.get(minute).add(t);
                }
            }
        }

        int batch= 5;
        boolean someremaining = true;
        while (someremaining) {
            someremaining = false;
            long cheapest = Long.MAX_VALUE;
            int cheapestMinute = 0;
            long secondCheap = Long.MAX_VALUE;
            int remainingTasks= 0;
            for (int minute = 0; minute < data.price.size(); ++minute) {
                if (tasksPossibleByMinute.get(minute).isEmpty()) {
                    continue;
                }
                remainingTasks+= tasksPossibleByMinute.size();
                someremaining = true;
                long price = priceForMinute(data.price.get(minute), totalusageByMinute.get(minute)+batch, data.maxPower)*(totalusageByMinute.get(minute)+batch);
                if (cheapest > price) {
                    secondCheap = cheapest;
                    cheapest = price;
                    cheapestMinute = minute;
                } else if(price < secondCheap) {
                    secondCheap= price;
                }
            }
            System.out.print("\r remaining: "+remainingTasks);
            if(!someremaining) {
                break;
            }

            while (cheapest <= secondCheap) {
                //get task
                InputData.Task cheapestTask = null;
                for (InputData.Task t : tasksPossibleByMinute.get(cheapestMinute)) {
                    if (t.remaining > 0 && t.house.usageByMinute.get(cheapestMinute) < data.maxPower && (t.house.taskByMinute.get(cheapestMinute) < data.maxTasks || t.usagesByMinute.containsKey(cheapestMinute))) {
                        cheapestTask = t;
                        break;
                    }
                }
                if(cheapestTask== null) {
                    tasksPossibleByMinute.get(cheapestMinute).clear(); //no task possible anymore on this minute
                    break;
                }

                InputData.Pair using = new InputData.Pair(cheapestMinute, Math.min(cheapestTask.remaining,Math.min(batch,data.maxPower-cheapestTask.house.usageByMinute.get(cheapestMinute))));
                cheapestTask.remaining -= using.second;
                totalusageByMinute.set(cheapestMinute, totalusageByMinute.get(cheapestMinute) + using.second);
                cheapestTask.house.usageByMinute.set(cheapestMinute, cheapestTask.house.usageByMinute.get(cheapestMinute) + using.second);

                totalBill += priceForMinute(data.price.get(cheapestMinute), totalusageByMinute.get(cheapestMinute), data.maxPower) * using.second;
                if (cheapestTask.usagesByMinute.containsKey(cheapestMinute)) {
                    cheapestTask.usagesByMinute.put(cheapestMinute, cheapestTask.usagesByMinute.get(cheapestMinute) + using.second);
                } else {
                    cheapestTask.house.taskByMinute.set(cheapestMinute, cheapestTask.house.taskByMinute.get(cheapestMinute) + 1);
                    cheapestTask.usagesByMinute.put(cheapestMinute, using.second);
                }
                if (cheapestTask.remaining == 0) {
                    for (Set<InputData.Task> tasks : tasksPossibleByMinute) {
                        tasks.remove(cheapestTask);
                    }
                }
                cheapest= priceForMinute(data.price.get(cheapestMinute), totalusageByMinute.get(cheapestMinute)+batch, data.maxPower)*(totalusageByMinute.get(cheapestMinute)+batch);
            }
        }


        if(data.level >= 6) {
            //check with increased
            totalBill= 0;
            for(int idx= 0; idx < totalusageByMinute.size();++idx) {
                totalBill += priceForMinute(data.price.get(idx),totalusageByMinute.get(idx),data.maxPower)*totalusageByMinute.get(idx);

            }
            if (totalBill > data.maxBill) {
                return false;
            }
            for(InputData.House h:data.houses) {
                for (InputData.Task task : h.tasks) {
                    if (task.remaining != 0) {
                        return false;
                    }
                    int sum = 0;
                    for (Map.Entry<Integer, Long> entry : task.usagesByMinute.entrySet()) {
                        sum += entry.getValue();
                        task.house.taskByMinute.set(entry.getKey(), task.house.taskByMinute.get(entry.getKey()) - 1);
                    }
                    if (sum != task.totalNeeded) {
                        return false;
                    }
                }
                for (Integer tasks : h.taskByMinute) {
                    if (tasks != 0) {
                        return false;
                    }
                }
                for(int idx= 0; idx < h.usageByMinute.size();++idx) {
                    if (h.usageByMinute.get(idx) > data.maxPower) {
                        return false;
                    }
                }
            }
        }
        return true;
    }


    private static boolean optimizeOld(InputData data) {

        long totalBill= 0;

        for (InputData.Task task : data.tasks) {
            task.remaining= task.totalNeeded;
            task.usagesByMinute.clear();
        }

        //try greedy:
        List<Long> usageByMinute = new ArrayList<>();
        while (usageByMinute.size() < data.price.size()) {
            usageByMinute.add(0L);
        }
        List<Integer> taskByMinute = new ArrayList<>();
        while (taskByMinute.size() < data.price.size()) {
            taskByMinute.add(0);
        }
        List<InputData.Task> random= new LinkedList<>(data.tasks);
        Collections.shuffle(random);
        for (InputData.Task task : random) {
            //fill cheapest
            for (InputData.Pair pair : task.cheapestMinutes) {
                if(task.remaining == 0) {
                    break;
                }
                if (usageByMinute.get(pair.minute) < data.maxPower && taskByMinute.get(pair.minute) < data.maxTasks) {
                    int cheapestMinute = pair.minute;
                    InputData.Pair using = new InputData.Pair(cheapestMinute, Math.min(data.maxPower - usageByMinute.get(pair.minute), task.remaining));
                    task.remaining -= using.second;
                    usageByMinute.set(cheapestMinute, usageByMinute.get(cheapestMinute) + using.second);
                    taskByMinute.set(cheapestMinute, taskByMinute.get(cheapestMinute)+1);
                    totalBill += priceForMinute(data.price.get(cheapestMinute), usageByMinute.get(cheapestMinute), data.maxPower) * using.second;
                    if (task.usagesByMinute.containsKey(cheapestMinute)) {
                        task.usagesByMinute.put(cheapestMinute, task.usagesByMinute.get(cheapestMinute) + using.second);
                    } else {
                        task.usagesByMinute.put(cheapestMinute, using.second);
                    }

                }
            }

            if (task.remaining > 0) {
                return false;
            }
            if (totalBill > data.maxBill) {
                return false;
            }
        }

        if(data.level >= 6) {
            //check with increased
            totalBill= 0;
            for(int idx= 0; idx < usageByMinute.size();++idx) {
                totalBill += priceForMinute(data.price.get(idx),usageByMinute.get(idx),data.maxPower)*usageByMinute.get(idx);
            }
            if (totalBill > data.maxBill) {
                return false;
            }
        }
        return true;
    }


    private static long priceForMinute(int base, long usage, long max) {
        return Math.round(base*(1+(double)usage/max));
    }

    // ============================================
    // Level 5
    // ============================================


    private static String doLevel5(InputData data) {
        StringBuilder output = new StringBuilder();

        List<List<InputData.Task>> tasksByMinute= new ArrayList<>();
        while(tasksByMinute.size() < data.price.size()) {
            tasksByMinute.add(new LinkedList<>());
        }

        output.append(data.tasks.size()).append(System.lineSeparator());
        for(InputData.Task task : data.tasks) {
            //fill cheapest

            for(int idx= task.earliest; idx <= task.latest;++idx) {
                task.cheapestMinutes.add(new InputData.Pair(idx,data.price.get(idx)));
            }
            task.cheapestMinutes.sort(Comparator.comparingLong(o -> o.second));
        }

        boolean done= false;
        int loopBreak= 0;
        while(!done && loopBreak < data.tasks.size()*data.tasks.size()) {
            done = optimize(data,false);
        }

        if(!done) {
            System.out.println("PROBLEM: couldn't find good solution");
        }

        for (InputData.Task task : data.tasks) {

            output.append(task.id);
            for (Map.Entry<Integer, Long> usage : task.usagesByMinute.entrySet()) {
                output.append(" ").append(usage.getKey()).append(" ").append(usage.getValue());
            }
            output.append(System.lineSeparator());
        }


        //now decide

        return output.toString();
	}

    // ============================================
    // Level 6
    // ============================================

    private static String doLevel6(InputData data) {
        StringBuilder output = new StringBuilder();

        List<List<InputData.Task>> tasksByMinute= new ArrayList<>();
        while(tasksByMinute.size() < data.price.size()) {
            tasksByMinute.add(new LinkedList<>());
        }

        output.append(data.tasks.size()).append(System.lineSeparator());
        for(InputData.Task task : data.tasks) {
            //fill cheapest

            for(int idx= task.earliest; idx <= task.latest;++idx) {
                task.cheapestMinutes.add(new InputData.Pair(idx,data.price.get(idx)));
            }
            task.cheapestMinutes.sort(Comparator.comparingLong(o -> o.second));
        }

        boolean done= false;
        done = optimizeAll(data);


        if (!done) {
            System.out.println("PROBLEM: couldn't find good solution");
        }

        for (InputData.Task task : data.tasks) {

            output.append(task.id);
            for (Map.Entry<Integer, Long> usage : task.usagesByMinute.entrySet()) {
                output.append(" ").append(usage.getKey()).append(" ").append(usage.getValue());
            }
            output.append(System.lineSeparator());
        }


        //now decide

        return output.toString();
    }

    // ============================================
    // Level 7
    // ============================================

    private static String doLevel7(InputData data) {
        StringBuilder output = new StringBuilder();

        List<List<InputData.Task>> tasksByMinute= new ArrayList<>();
        while(tasksByMinute.size() < data.price.size()) {
            tasksByMinute.add(new LinkedList<>());
        }

        for(InputData.House h : data.houses) {
            for (InputData.Task task : h.tasks) {
                //fill cheapest

                for (int idx = task.earliest; idx <= task.latest; ++idx) {
                    task.cheapestMinutes.add(new InputData.Pair(idx, data.price.get(idx)));
                }
                task.cheapestMinutes.sort(Comparator.comparingLong(o -> o.second));
            }
        }

        boolean done= false;
        done = optimizeAll(data);


        if (!done) {
            System.out.println("PROBLEM: couldn't find good solution");
        }

        output.append(data.houses.size()).append(System.lineSeparator());
        for(InputData.House h : data.houses) {
            output.append(h.id).append(System.lineSeparator());
            output.append(h.tasks.size()).append(System.lineSeparator());
            for (InputData.Task task : h.tasks) {

                output.append(task.id);
                for (Map.Entry<Integer, Long> usage : task.usagesByMinute.entrySet()) {
                    output.append(" ").append(usage.getKey()).append(" ").append(usage.getValue());
                }
                output.append(System.lineSeparator());
            }
        }


        //now decide

        return output.toString();
    }

    // ============================================
    // Level 8
    // ============================================

    private static String doLevel8(InputData data) {
        StringBuilder output = new StringBuilder();

        output.append(System.lineSeparator());
        return output.toString();
    }
}
