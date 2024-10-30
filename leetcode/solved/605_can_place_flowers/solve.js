const countFreePlots = (flowerbed) => {
    let count = 0;

    const isZeroOrUndefined = (x) => {
        return x === 0 || x === undefined;
    }

    for (let i = 0; i <= flowerbed.length; i++) {
        if (flowerbed[i] === 0) {
            if (isZeroOrUndefined(flowerbed[i - 1]) && isZeroOrUndefined(flowerbed[i + 1])) {
                count++;
                i++; // jump one more if found a spot because the one next to it will not be free anymore
            }
        }
    }

    return count;
}

const canPlaceFlowers = (flowerbed, n) => {
    return countFreePlots(flowerbed) >= n;
}

