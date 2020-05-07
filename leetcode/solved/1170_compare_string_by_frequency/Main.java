
public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        //Input: queries = ["bbb","cc"], words = ["a","aa","aaa","aaaa"]
        String[] queries = {"bbb","cc"};
        String[] words = {"a","aa","aaa","aaaa"};
        int[] answer = man.numSmallerByFrequency(queries, words);
        for(int a: answer) {
            System.out.print(a + " ");
        }

    }
    
    public int[] numSmallerByFrequency(String[] queries, String[] words) {
        int n = queries.length;
        int m = words.length;
        int[] answer = new int[n];
        int[] wFreqs = new int[m];

        for(int i=0; i<m; i++) {
            wFreqs[i] = freqOfSmallestChar(words[i]);
        }

        for(int i=0; i<n; i++) {
            int freq = freqOfSmallestChar(queries[i]);
            int nrF = 0;
            for(int wF: wFreqs) {
                if(freq < wF) nrF++;
            } 
            answer[i] = nrF;
        }

        return answer;
    }

    public int freqOfSmallestChar(String s) {
        int[] frequencies = new int[26];
        for(char c: s.toCharArray()) {
            frequencies[c - 'a']++;
        } 
        for(int freq: frequencies) {
            if(freq > 0) return freq;
        }
        return 0;
    }
}