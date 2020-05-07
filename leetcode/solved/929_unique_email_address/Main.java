import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        // Input:
        // ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]

        String[] emails = { "test.email+alex@leetcode.com", "test.e.mail+bob.cathy@leetcode.com",
                "testemail+david@lee.tcode.com" };
        int result = man.numUniqueEmails(emails);
        System.out.println(result);
    }

    public int numUniqueEmails(String[] emails) {
        Set<String> names = new HashSet<>();

        for (String email : emails) {
            String[] tokens = email.split("@");
            String localName = tokens[0];
            String domainName = tokens[1];
            localName = localName.split("[+]")[0];
            localName = localName.replaceAll("[.]", "");
            names.add(localName + "@" + domainName);
        }

        return names.size();
    }
}