const decToBinaryString = (n) => {
    const bits = []; // Most significant bit last

    while (n > 0) {
        const bit = n % 2;
        bits.push(bit);
        n = Math.floor(n/2);
    }

    return bits.reverse().join('');
}

const decToBinaryNumber = (n) => {
    let bitRepresentation = 0; // Most significant bit first
    let tenPower = 1;

    while (n > 0) {
        const bit = n % 2;
        bitRepresentation = bit * tenPower + bitRepresentation;
        tenPower *= 10;
        n = Math.floor(n/2);
    }

    return bitRepresentation;
}

/**
 * Convert binary number to decimal number
 * @param {number} binary 
 * @returns Decimal representation
 */
const binaryNumberToDec = (binary) => {
    let decimal = 0;
    let twoPower = 1;

    while(binary > 0) {
        const digit = binary % 10; // last digit
        decimal = decimal + digit * twoPower;
        twoPower *= 2;
        binary = Math.floor(binary / 10);
    }

    return decimal;
}
