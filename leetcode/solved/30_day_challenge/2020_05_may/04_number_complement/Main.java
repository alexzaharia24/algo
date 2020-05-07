public class Main {
    public static void main(String[] args) {
        Main man = new Main();
        int num = 2147483646;
        int result = man.findComplement(num);
        System.out.println(result);
    }

    public int findComplement(int num) {
        return verySimple(num);
    }

    public int findComplementWithPowOf2(int num) {
        if (num == (int) Math.pow(2,31))
            return 0;

        long pow2 = getFirstBiggerPowerOf2(num);
        return (int)(pow2 - num - 1);
    }

    public long getFirstBiggerPowerOf2(int num) {
        long pow = 1;
        while (pow <= num) {
            pow *= 2;
        }
        return pow;
    }

    public int verySimple(int num) {
        int x = 1;
        while(x < num) {
            x = (x << 1) + 1;
        }
        return x - num;
    }
}