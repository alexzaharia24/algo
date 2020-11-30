const fs = require('fs');

let level = 3;
for (let file = 0; file <= 5; file++) {
    const data = fs.readFileSync(`level${level}/level${level}_${file}.in`,
        { encoding: 'utf8', flag: 'r' });

    let lines = data.split("\n");
    let results = [];
    let nrOfPrices = parseInt(lines[0]);
    let prices = [];
    let lineNr = 1;
    for (lineNr = 1; lineNr <= nrOfPrices; lineNr++) {
        prices[lineNr - 1] = parseInt(lines[lineNr]);
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
        tasks[taskIdx] = { id: taskId, power: taskPower, start: taskStart, end: taskEnd };
    }
    console.log(tasks);

    for (let i = 0; i <= prices.length; i++) {
        // console.log(minPrice);
        prices[i - 1] = parseInt(lines[i]);

    }

    for (let task of tasks) {
        let minPrice = Infinity;
        let minIdx = -1;
        for (let priceIdx = task.start; priceIdx <= task.end; priceIdx++) {
            // let sumInterval = 0;
            // for(let intervalIdx = priceIdx; intervalIdx < priceIdx + task.power; intervalIdx++) {
            //     sumInterval += prices[intervalIdx];
            // }
            // if(sumInterval < minSum) {
            //     minSum = sumInterval;
            //     startId = priceIdx;
            // }
            if(prices[priceIdx] < minPrice) {
                minPrice = prices[priceIdx];
                minIdx = priceIdx;
            }
        }   
        task.startId = minIdx;
    }

    let result = "";
    result += nrOfTasks + "\n";
    for(let taskIdx = 0; taskIdx < tasks.length; taskIdx++) {
        let task = tasks[taskIdx];
        // console.log(tasks[taskIdx]);
        result += task.id + " " + task.startId;
        if(taskIdx < tasks.length - 1) {
            result += "\n";
        }
    }




    results.push(result);

    for (let result of results) {
        fs.writeFile(`level${level}_${file}.out`, result.toString(), (err, data) => {
            if (err) {
                console.log("Error writing to file: " + err);
            }
        })
    }
}


