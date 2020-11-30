const fs = require('fs');

let level = 1;
for (let file = 1; file <= 5; file++) {
    const data = fs.readFileSync(`level${level}_${file}.in`,
        { encoding: 'utf8', flag: 'r' });

    let lines = data.split("\n");
    let nrOfElements = parseInt(lines[0]);
    let results = [];
    let minPrice = Infinity;
    let minIndex = -1;
    for (let i = 1; i < nrOfElements; i++) {
        // console.log(minPrice);
        let price = parseInt(lines[i]);
        if (price < minPrice) {
            minPrice = price;
            minIndex = i - 1;
        }
    }
    results.push(minIndex);
    console.log(minIndex)

    for (let result of results) {
        fs.writeFile(`level${level}_${file}.out`, result.toString(), (err, data) => {
            if (err) {
                console.log("Erorr writing to file: " + err);
            }
        })
    }
}


