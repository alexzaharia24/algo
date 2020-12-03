// https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/

function shipWithinDays(weights, D) {
    return solveWithBinarySearch(weights, D);
}

function binarySearch(minCapacity, maxCapacity, weights, D) {
    let left = 0, right = maxCapacity - minCapacity + 1;
    let result = -1;
    while (left <= right) {
        let middle = parseInt((left + right) / 2);
        let capacity = minCapacity + middle;

        if (canShip(weights, D, capacity)) {
            result = capacity;
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }

    return result;
}

function solveWithBinarySearch(weights, D) {
    let minCapacity = Math.max(...weights);
    let maxCapacity = 0;
    for (let weight of weights) {
        maxCapacity += weight;
    }

    let capacities = [];
    
    return binarySearch(minCapacity, maxCapacity, weights, D);
}

function canShip(weights, D, capacity) {
    let package = 0;
    let days = 1;
    let currentDayShipment = 0;
    for (package = 0; package < weights.length; package++) {
        let packageWeight = weights[package];
        if (currentDayShipment + packageWeight <= capacity) {
            currentDayShipment += packageWeight;
        } else {
            if (packageWeight > capacity) break;
            days++;
            currentDayShipment = packageWeight;
        }
    }
    if (package === weights.length && (days === D || days < D && days < weights.length)) {
        return true;
    }
    return false
}

function solveWithBruteRefined(weights, D) {
    let minCapacity = Math.max(...weights);
    let maxCapacity = 0;
    for (let weight of weights) {
        maxCapacity += weight;
    }

    for (let capacity = minCapacity; capacity <= maxCapacity; capacity++) {
        if (canShip(weights, D, capacity)) {
            return capacity;
        }
    }

    return -1;
}


function solveWithBrute(weights, D) {
    let capacity = 1;
    let days = 1;
    let currentDayShipment = 0;
    while (true) {
        let package = 0;
        for (package = 0; package < weights.length; package++) {
            let packageWeight = weights[package];
            if (currentDayShipment + packageWeight <= capacity) {
                currentDayShipment += packageWeight;
            } else {
                if (packageWeight > capacity) break;
                days++;
                currentDayShipment = packageWeight;
            }
        }
        if (package === weights.length && (days === D || days < D && days < weights.length)) {
            return capacity;
        }
        capacity++;
        days = 1;
        currentDayShipment = 0;

    }
}


console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));
console.log(shipWithinDays([3, 2, 2, 4, 1, 4], 3));
console.log(shipWithinDays([1, 2, 3, 1, 1], 4));