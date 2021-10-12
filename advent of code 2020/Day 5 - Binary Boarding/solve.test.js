const {getSeatIdFromBinarySpacePartitioning} = require('./solve');

test('BFFFBBFRRR', () => {
    expect(getSeatIdFromBinarySpacePartitioning("BFFFBBFRRR")).toBe(567);
})
test('FFFBBBFRRR', () => {
    expect(getSeatIdFromBinarySpacePartitioning("FFFBBBFRRR")).toBe(119);
})
test('BBFFBBFRLL', () => {
    expect(getSeatIdFromBinarySpacePartitioning("BBFFBBFRLL")).toBe(820);
})
test('BBBBBBBLLL', () => {
    expect(getSeatIdFromBinarySpacePartitioning("BBBBBBBLLL")).toBe(1016);
})
test('FFFFFFFLLL', () => {
    expect(getSeatIdFromBinarySpacePartitioning("FFFFFFFLLL")).toBe(0);
})
test('BBBBBBBRRR', () => {
    expect(getSeatIdFromBinarySpacePartitioning("BBBBBBBRRR")).toBe(1023);
})