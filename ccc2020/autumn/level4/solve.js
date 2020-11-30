const fs = require('fs');

let maxPowerPerMinute;
let level = 4;
for (let file = 0; file <= 0; file++) {
    const data = fs.readFileSync(`level${level}/level${level}_${file}.in`,
        { encoding: 'utf8', flag: 'r' });

    let lines = data.split("\n");
    let results = [];
    maxPowerPerMinute = parseInt(lines[0]);
    let maxBill = parseInt(lines[1]);
    let nrOfPrices = parseInt(lines[2]);
    let prices = [];
    let lineNr = 3;
    for (let idx = 0; idx < nrOfPrices; idx++) {
        prices[idx] = parseInt(lines[lineNr++]);
    }

    // console.log(prices);
    let nrOfTasks = parseInt(lines[lineNr++]);
    let tasks = [];
    for (let taskIdx = 0; taskIdx < nrOfTasks; taskIdx++) {
        let taskLine = lines[lineNr + taskIdx];
        let tokens = taskLine.split(' ');
        let taskId = parseInt(tokens[0]);
        let taskPower = parseInt(tokens[1]);
        let taskStart = parseInt(tokens[2]);
        let taskEnd = parseInt(tokens[3]);
        tasks[taskIdx] = { id: taskId, power: taskPower, start: taskStart, end: taskEnd, usedPower: 0, idx: taskIdx };
    }
    // console.log(tasks);

    let pricesWithIndex = prices.map((price, idx) => { return { price: price, idx: idx, usedPower: 0 } })
    let sortedPrices = pricesWithIndex.sort((a, b) => a.price - b.price);

    // console.log(sortedPrices);
    for (let price of pricesWithIndex) {
        let tasksRunnableInThisMinute = [];
        for (let t = 0; t < tasks.length; t++) {
            let task = tasks[t];
            if (task.start <= price.idx && price.idx <= task.end && task.usedPower < task.power) {
                tasksRunnableInThisMinute.push(task);
            }
        }
        console.log(tasksRunnableInThisMinute)

        for (let task of tasksRunnableInThisMinute) {
            for (let power = 1; power <= maxPowerPerMinute; power++) {
                let powersPerMinute = [];
                // let tasksPerMinute = [[{task:task, power: power}]]

                // if(task.usedPower + power <= task.power && computeBill(powersPerMinute, prices) < maxBill) {
                // dfs(price, task, power, powersPerMinute, tasksPerMinute, pricesWithIndex, tasks);
                dfs(price, task, power, powersPerMinute, [], pricesWithIndex, tasks);
                // }
            }
        }

    }


    // let result = "";
    // result += nrOfTasks + "\n";
    // for (let taskIdx = 0; taskIdx < tasks.length; taskIdx++) {
    //     let task = tasks[taskIdx];
    //     // console.log(tasks[taskIdx]);
    //     result += task.id + " " + task.startId;
    //     if (taskIdx < tasks.length - 1) {
    //         result += "\n";
    //     }
    // }




    // results.push(result);

    // for (let result of results) {
    //     fs.writeFile(`level${level}_${file}.out`, result.toString(), (err, data) => {
    //         if (err) {
    //             console.log("Error writing to file: " + err);
    //         }
    //     })
    // }
}

function computeBill(prices) {
    let sum = 0;
    for (let minute = 0; minute < prices.length; minute++) {
        sum += prices[minute].price * prices[minute].usedPower;
    }
    return sum;
}

function dfs(price, task, power, powersPerMinute, tasksPerMinute, prices, tasks) {
    prices[price.idx].usedPower += power;
    tasks[task.id - 1].usedPower += power;
    let bill = computeBill(prices)
    console.log("price:", price, " task:", task, " power:", power, "bill:", bill)
    // console.log(`powersPerMinute: `, powersPerMinute)
    // console.log(`tasksPerMinute: `, tasksPerMinute)
    console.log("-----------")



    for (let price of prices) {
        let tasksRunnableInThisMinute = [];
        for (let t = 0; t < tasks.length; t++) {
            let task = tasks[t];
            if (task.start <= price.idx && price.idx <= task.end && task.usedPower < task.power) {
                tasksRunnableInThisMinute.push(task);
            }
        }

        for (let task of tasksRunnableInThisMinute) {
            for (let power = 1; power <= maxPowerPerMinute; power++) {
                if (price.usedPower + power < maxPowerPerMinute) {
                    dfs(price, task, power, powersPerMinute, tasksPerMinute, prices, tasks);
                }

            }
        }
    }

    task.usedPower -= power;
    price.usedPower -= power;
}   