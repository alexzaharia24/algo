// https://leetcode.com/problems/lexicographical-numbers/


function lexicalOrder(n) {
    let order = [];
    let m = 0;
    while (order.length < n) {
        m++;
        order.push(m);
        while (m * 10 <= n) {
            order.push(m * 10);
            m *= 10;
        }

        if (m === n) {
            m = parseInt(m / 10);
        }
        while(m % 10 === 9) {
            m = parseInt(m / 10);
        }
    }

    return order;
}

function lexicalOrderNotWorking1(n) {
    let order = [];

    for (let i = 1; i <= 9; i++) {
        let bases = [];
        let base = i;
        while (base <= n) {
            bases.push(base);
            base *= 10;
        }

        console.log(bases);

        order.push(...bases)

        for (let i = 0; i < bases.length; i++) {
            for (let j = 1; j < 10 ** i && bases[i] + j <= n; j++)
                order.push(bases[i] + j);
        }
    }

    return order;
}

function lexicalOrderWithMapNotWorking(n) {
    // Time: O(n) * O(max length of number)
    // Space: O(n)
    let map = {};
    let order = [];

    for (let i = 1; i <= n; i++) {
        let firstDigit = getFirstDigit(i);
        if (!(firstDigit in map)) {
            map[firstDigit] = []
        }
        map[firstDigit].push(i);
    }

    for (let digit of Object.keys(map)) {
        for (let number of map[digit]) {
            order.push(number);
        }
    }

    return order;
}

function getFirstDigit(x) {
    while (x >= 10) {
        x = parseInt(x / 10);
    }
    return x;
}

// console.log(lexicalOrder(13))
// console.log(lexicalOrder(100))
// console.log(lexicalOrder(119))
console.log(JSON.stringify(lexicalOrder(234)))