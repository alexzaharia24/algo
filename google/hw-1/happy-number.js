function solve(n) {
    let history = {};
    let sum = n;

    while(true) {
        sum = computeSumOfDigitSquare(sum);
        if(sum === 1) {
            return true;
        }
        
        if(sum in history) {
            return false;
        }
        history[sum] = 1;
    }
}

function computeSumOfDigitSquare(x) {
    let sum = 0;
    while(x > 0) {
        sum += (x%10) * (x%10);
        x = parseInt(x/10);
    }
    return sum;
}

console.log(solve(20))