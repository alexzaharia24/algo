import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        String[] expression = new String[]{"10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"};
        System.out.println(man.evalRPN(expression));
    }

    public int evalRPN(String[] tokens) {
        Stack<String> stack = new Stack<>();
        for (int i = 0; i < tokens.length; i++) {
            if(!isOperator(tokens[i])) {
                stack.push(tokens[i]);
            } else {
                String str2 = stack.pop();
                String str1 = stack.pop();

                Integer operand1 = Integer.parseInt(str1);
                Integer operand2 = Integer.parseInt(str2);

                int localResult = 0;

                switch (tokens[i]) {
                    case "+":
                        localResult = operand1 + operand2;
                        break;
                    case "-":
                        localResult = operand1 - operand2;
                        break;
                    case "*":
                        localResult = operand1 * operand2;
                        break;
                    case "/":
                        localResult = operand1 / operand2;
                        break;
                }
                stack.push(Integer.toString(localResult));
            }
        }

        return Integer.parseInt(stack.pop());
    }

    boolean isOperator(String str) {
        return str.equals("+") || str.equals("-") || str.equals("/") || str.equals("*");
    }
}
