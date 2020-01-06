import javafx.util.Pair;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {

    public static double roundUp(double nr) {
        int aprox = (int) (nr * 1000);
        if (aprox % 10 < 5) {
            nr = (double) aprox / 1000 - ((double) aprox % 10) / 1000;
        } else {
            nr = (double) aprox / 1000 + 0.01 - ((double) aprox % 10) / 1000;
        }
        return nr;
    }

    public static double turnRadius(double whlBase, double rot) {
        double val = whlBase / (Math.sin((Math.PI / 180) * rot));
        return roundUp(val);
    }

    public static double newDirection(double whlBase, double distance, double angle) {
        double newD = (180 / (Math.PI * turnRadius(whlBase, angle))) * distance;
        return roundUp(newD);
//        return newD;
    }

    public static double degreesToRadians(double degreeAngle) {
        return (Math.PI / 180) * degreeAngle;
    }

    public static double radiansToDegrees(double radiansAngle) {
        return (180 / Math.PI) * radiansAngle;
    }

//    public static void level1() {
//
//
//        for (int fileIdx = 0; fileIdx < 6; fileIdx++) {
//            try {
////                System.out.println(System.getProperty("user.dir"));
////                FileReader fr = new FileReader("ulm\\level1_" + fileIdx + ".in");
////                BufferedReader bfr = new BufferedReader(fr);
//
//                Scanner scanner = new Scanner(new File("ulm\\level1_" + fileIdx + ".in"));
//                scanner.useDelimiter(" |\n");
//
////                String line = bfr.readLine();
////                String[] tokens = line.split(" ");
//                String val = scanner.next();
//                long x = Integer.parseInt(val);
//                val = scanner.next();
//                long y = Integer.parseInt(val);
//
////                line = bfr.readLine();
////                tokens = line.split(" ");
//
//                List<Pair<String, Integer>> commands = new ArrayList<>();
//                while(scanner.hasNext()) {
//                    String cmd = scanner.next();
//                    Integer step = Integer.parseInt(scanner.next());
//
//                    commands.add(new Pair<>(cmd, step));
//
//                }
//
//                int s = 0;
//                for (int i = 0; i < commands.size(); i++) {
//                    Integer step = commands.get(i).getValue();
//                    if (commands.get(i).getKey().equals("F")) {
//                        switch (s) {
//                            case 0:
//                                x += step;
//                                break;
//                            case 1:
//                                y += step;
//                                break;
//                            case 2:
//                                x -= step;
//                                break;
//                            case 3:
//                                y -= step;
//                                break;
//
//                        }
//                    } else if (commands.get(i).getKey().equals("T")) {
//                        s = (s + step) % 4;
//                    }
//                }
//                System.out.println(fileIdx + ": " + x + " " + y);
//
//                FileWriter fw = new FileWriter("ulm\\level1_" + fileIdx + ".out");
//                BufferedWriter bfw = new BufferedWriter(fw);
//
//                bfw.write(x + " " + y);
//                bfw.close();
//
//            } catch (FileNotFoundException e) {
//                e.printStackTrace();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//
//
//    }


    public static List<Pair<Long, Long>> intermediaryValues(long startX, long finishX, long startY, long finishY) {
        List<Pair<Long, Long>> res = new ArrayList<>();

        if (startX == finishX) {
            if (startY < finishY) {
                for (long i = startY + 1; i <= finishY; i++) {
                    res.add(new Pair<>(startX, i));
                }
            } else {
                for (long i = startY - 1; i >= finishY; i--) {
                    res.add(new Pair<>(startX, i));
                }
            }
        } else if (startY == finishY) {
            if (startX < finishX) {
                for (long i = startX + 1; i <= finishX; i++) {
                    res.add(new Pair<>(i, startY));
                }
            } else {
                for (long i = startX - 1; i >= finishX; i--) {
                    res.add(new Pair<>(i, startY));
                }
            }
        }

        return res;
    }


//    public static void level2() {
//
//
//        for (int fileIdx = 5; fileIdx < 6; fileIdx++) {
//            try {
////                System.out.println(System.getProperty("user.dir"));
//                FileReader fr = new FileReader("ulm\\level2_" + fileIdx + ".in");
//                BufferedReader bfr = new BufferedReader(fr);
//
////                Scanner scanner = new Scanner(new File("ulm\\level2_" + fileIdx + ".in"));
////                scanner.useDelimiter(" |\n");
//
//                String line = bfr.readLine();
//                String[] tokens = line.split(" ");
////                String val = scanner.next();
////                long wx = Integer.parseInt(val);
////                val = scanner.next();
////                long wy = Integer.parseInt(val);
////                val = scanner.next();
////                long x = Integer.parseInt(val);
////                val = scanner.next();
////                long y = Integer.parseInt(val);
//
//                long wx = Integer.parseInt(tokens[0]);
//                long wy = Integer.parseInt(tokens[1]);
//
//                line = bfr.readLine();
//                tokens = line.split(" ");
//                long x = Integer.parseInt(tokens[0]);
//                long y = Integer.parseInt(tokens[1]);
//
//                List<Pair<String, Integer>> commands = new ArrayList<>();
//
//                line = bfr.readLine();
//                tokens = line.split(" ");
//                for (int tok = 0; tok < tokens.length; tok += 2) {
//                    String cmd = tokens[tok];
//                    Integer step = Integer.parseInt(tokens[tok+1]);
//
//                    commands.add(new Pair<>(cmd, step));
//                }
////                while (line != null) {
////                    String cmd = scanner.next();
////                    Integer step = Integer.parseInt(scanner.next());
////
////                    commands.add(new Pair<>(cmd, step));
////                }
//
//
//                int s = 0;
//                List<Pair<Long, Long>> moves = new ArrayList<>();
//                moves.add(new Pair<>(x, y));
//
//
//                for (int i = 0; i < commands.size(); i++) {
//                    Integer step = commands.get(i).getValue();
//                    long aux = 0;
//                    if (commands.get(i).getKey().equals("F")) {
//
//                        Long startX = x;
//                        Long startY = y;
//
//                        switch (s) {
//                            case 0:
//                                aux = x + step;
//                                if (aux >= wx) {
//                                    x = wx - 1;
//                                } else {
//                                    x = aux;
//                                }
//                                break;
//                            case 1:
//                                aux = y + step;
//                                if (aux >= wy) {
//                                    y = wy - 1;
//                                } else {
//                                    y = aux;
//                                }
//                                break;
//                            case 2:
//                                aux = x - step;
//                                if (aux < 0) {
//                                    x = 0;
//                                } else {
//                                    x = aux;
//                                }
//                                break;
//                            case 3:
//                                aux = y - step;
//                                if (aux < 0) {
//                                    y = 0;
//                                } else {
//                                    y = aux;
//                                }
//                                break;
//                        }
//
//                        List<Pair<Long, Long>> intermediaryMoves = intermediaryValues(startX, x, startY, y);
//                        moves.addAll(intermediaryMoves);
//
//                    } else if (commands.get(i).getKey().equals("T")) {
//                        s = (s + step) % 4;
//                    }
//                }
//                FileWriter fw = new FileWriter("ulm\\level2_" + fileIdx + ".out");
//                BufferedWriter bfw = new BufferedWriter(fw);
//
//                for (int mvIdx = 0; mvIdx < moves.size(); mvIdx++) {
//                    bfw.write(moves.get(mvIdx).getKey() + " " + moves.get(mvIdx).getValue());
//                    if (mvIdx < moves.size() - 1) {
//                        bfw.write("\n");
//                    }
//                }
//
////                System.out.println(fileIdx + ": " + x + " " + y);
////                bfw.write(x + " " + y);
//                bfw.close();
//
//            } catch (FileNotFoundException e) {
//                e.printStackTrace();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//
//
//    }

    public static void level3() {


        for (int fileIdx = 1; fileIdx < 6; fileIdx++) {
            try {
                FileReader fr = new FileReader("ulm\\level3_" + fileIdx + ".in");
                BufferedReader bfr = new BufferedReader(fr);

                String line = bfr.readLine();
                String[] tokens = line.split(" ");

                long wx = Integer.parseInt(tokens[0]);
                long wy = Integer.parseInt(tokens[1]);

                line = bfr.readLine();
                tokens = line.split(" ");
                long x = Integer.parseInt(tokens[0]);
                long y = Integer.parseInt(tokens[1]);

                List<Pair<String, Integer>> commands = new ArrayList<>();

                line = bfr.readLine();
                tokens = line.split(" ");
                for (int tok = 0; tok < tokens.length; tok += 2) {
                    String cmd = tokens[tok];
                    Integer step = Integer.parseInt(tokens[tok + 1]);

                    commands.add(new Pair<>(cmd, step));
                }

                int s = 0;
                List<Pair<Long, Long>> moves = new ArrayList<>();
                moves.add(new Pair<>(x, y));

                line = bfr.readLine();
                Double speed = Double.parseDouble(line);

                line = bfr.readLine();
                long N = Integer.parseInt(line);

                List<Integer> alienSpawns = new ArrayList<>();

                for (int alienIdx = 0; alienIdx < N; alienIdx++) {
                    line = bfr.readLine();
                    alienSpawns.add(Integer.parseInt(line));
                }

                line = bfr.readLine();
                long Q = Integer.parseInt(line);

                List<Pair<Integer, Integer>> queries = new ArrayList<>();
                for (int qIdx = 0; qIdx < Q; qIdx++) {
                    line = bfr.readLine();
                    tokens = line.split(" ");
                    queries.add(new Pair<>(Integer.parseInt(tokens[0]), Integer.parseInt(tokens[1])));
                }

//                List<List<Pair<Double, Double>>> alienPositions = new ArrayList<>();
//                for(int alIdx = 0; alIdx<N; alIdx++) {
//                    List<Pair<Double, Double>> positions = new ArrayList<>();
//
//                }

                int cmdIdx = 0;
                double rmnSpeed = speed;
                int ticks = 0;
                int steps = 0;
                double initialSpeed = speed;
                steps = commands.get(cmdIdx).getValue();
                String cmdType = commands.get(cmdIdx).getKey();

                while (cmdIdx < commands.size()) {
                    if (cmdType.equals("T")) {
                        s = (s + steps) % 4;
                        cmdIdx++;
                        steps = commands.get(cmdIdx).getValue();
                        cmdType = commands.get(cmdIdx).getKey();
                    } else {
                        rmnSpeed = rmnSpeed - steps;
                        steps -= speed;

                        if (rmnSpeed <= 0.0) {
                            ticks += 1;
                            //todo write shit

                            rmnSpeed = speed;
                        } else {
                            cmdIdx += 1;
                            steps = commands.get(cmdIdx).getValue();
                            cmdType = commands.get(cmdIdx).getKey();
                        }
                    }
                }

                for (int i = 0; i < commands.size(); i++) {
                    Integer step = commands.get(i).getValue();
                    long aux = 0;
                    if (commands.get(i).getKey().equals("F")) {

                        Long startX = x;
                        Long startY = y;

                        switch (s) {
                            case 0:
                                aux = x + step;
                                if (aux >= wx) {
                                    x = wx - 1;
                                } else {
                                    x = aux;
                                }
                                break;
                            case 1:
                                aux = y + step;
                                if (aux >= wy) {
                                    y = wy - 1;
                                } else {
                                    y = aux;
                                }
                                break;
                            case 2:
                                aux = x - step;
                                if (aux < 0) {
                                    x = 0;
                                } else {
                                    x = aux;
                                }
                                break;
                            case 3:
                                aux = y - step;
                                if (aux < 0) {
                                    y = 0;
                                } else {
                                    y = aux;
                                }
                                break;
                        }

                        List<Pair<Long, Long>> intermediaryMoves = intermediaryValues(startX, x, startY, y);
                        moves.addAll(intermediaryMoves);

                    } else if (commands.get(i).getKey().equals("T")) {
                        s = (s + step) % 4;
                    }
                }
                FileWriter fw = new FileWriter("ulm\\level3_" + fileIdx + ".out");
                BufferedWriter bfw = new BufferedWriter(fw);

                for (int mvIdx = 0; mvIdx < moves.size(); mvIdx++) {
                    bfw.write(moves.get(mvIdx).getKey() + " " + moves.get(mvIdx).getValue());
                    if (mvIdx < moves.size() - 1) {
                        bfw.write("\n");
                    }
                }

                bfw.close();

            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }

    public static void main(String[] args) throws FileNotFoundException {

        level3();

    }
}
