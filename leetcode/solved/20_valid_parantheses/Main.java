import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        String s = "()[]]{}";
        System.out.println(String.format("%s => %b", s, man.isValid(s)));
    }

    public boolean isValid(String s) {
        return solve(s);
    }

    public boolean solve(String s) {
        char[] chars = s.toCharArray();
        Stack<Character> stack = new Stack<>();
        for(int i=0; i<chars.length ;i++) {
            char c = chars[i];
            if(c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if(stack.empty()) return false;
                char top = stack.pop();
                if(c == ')' && top != '(') return false;
                else if(c == ']' && top != '[') return false;
                if(c == '}' && top != '{') return false;
            }
        }
        
        return stack.size() == 0;
    }
}