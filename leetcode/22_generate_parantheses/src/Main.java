import java.util.ArrayList;
import java.util.List;

public class Main {
    List<String> parantheses = new ArrayList<>();

    public static void main(String[] args) {

        Main program = new Main();
        program.generateParenthesis(3);
        for (int i = 0; i < program.parantheses.size(); i++) {
            System.out.println(program.parantheses.get(i));
        }
    }

    public List<String> generateParenthesis(int n) {
        generateRecursive("", n, n);
        return parantheses;
    }

    public void generateRecursive(String brackets, int nrLeft, int nrRight) {
        if (nrLeft == nrRight && nrLeft == 0) {
            parantheses.add(brackets);
        }
        if (nrLeft > 0) generateRecursive(brackets + "(", nrLeft - 1, nrRight);
        if (nrRight > nrLeft) generateRecursive(brackets + ")", nrLeft, nrRight - 1);
    }
}
