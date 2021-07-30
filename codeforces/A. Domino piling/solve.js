// if M == 1 => return N / 2
// else if N == 1 => return M / 2
// else return max(M / 2 + N, N/2 + M)

var numbers = readline().split(" ");
var M = parseInt(numbers[0]);
var N = parseInt(numbers[1]);

var result = 0;
result = parseInt(N * M / 2);
print(result);