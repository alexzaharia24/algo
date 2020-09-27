const { performance } = require('perf_hooks');
let SAMPLE_SIZE = 1000000;

let t1 = performance.now();

let arr = new Array(SAMPLE_SIZE).fill(0);

let t2 = performance.now();
console.log(`Initialized array of size ${SAMPLE_SIZE} in ${t2 - t1} ms`);

t1 = performance.now();
for (let i in arr) { }
t2 = performance.now();

console.log(`Looped using for...in through ${SAMPLE_SIZE} elements in ${t2 - t1} ms`)

t1 = performance.now();
for (let elem of arr) { }
t2 = performance.now();

console.log(`Looped using for...of through ${SAMPLE_SIZE} elements in ${t2 - t1} ms`)

t1 = performance.now();
for (let i = 0; i < arr.length; i++) { }
t2 = performance.now();

console.log(`Looped using classic for loop through ${SAMPLE_SIZE} elements in ${t2 - t1} ms`)

