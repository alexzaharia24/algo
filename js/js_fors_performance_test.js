const { performance } = require('perf_hooks');
let SAMPLE_SIZE = 1000000;

let t1 = performance.now();

// ZERO VALUES
let arr = new Array(SAMPLE_SIZE).fill(0);

let t2 = performance.now();
console.log(`Initialized array of size ${SAMPLE_SIZE} with only 0 values in ${t2 - t1} ms`);

t1 = performance.now();
for (let i in arr) { }
t2 = performance.now();

console.log(`Looped using for...in through ${SAMPLE_SIZE} 0 value elements in ${t2 - t1} ms`)

t1 = performance.now();
for (let elem of arr) { }
t2 = performance.now();

console.log(`Looped using for...of through ${SAMPLE_SIZE} 0 value elements in ${t2 - t1} ms`)

t1 = performance.now();
for (let i = 0; i < arr.length; i++) { }
t2 = performance.now();

console.log(`Looped using classic for loop through ${SAMPLE_SIZE} 0 value elements in ${t2 - t1} ms`)
console.log("-------------------------")

// RANDOM VALUES
t1 = performance.now();
let arr2 = [];
for (let i = 0; i < SAMPLE_SIZE; i++) {
    arr2.push(Math.random() * 100);
}
t2 = performance.now();

console.log(`Initialized array of size ${SAMPLE_SIZE} with random values between 0 and 100 in ${t2 - t1} ms`);

t1 = performance.now();
for (let i in arr2) { }
t2 = performance.now();

console.log(`Looped using for...in through ${SAMPLE_SIZE} 0-100 value elements in ${t2 - t1} ms`)

t1 = performance.now();
for (let elem of arr2) { }
t2 = performance.now();

console.log(`Looped using for...of through ${SAMPLE_SIZE} 0-100 value elements in ${t2 - t1} ms`)

t1 = performance.now();
for (let i = 0; i < arr2.length; i++) { }
t2 = performance.now();

console.log(`Looped using classic for loop through ${SAMPLE_SIZE} 0-100 value elements in ${t2 - t1} ms`)
console.log("-------------------------")

// --- SUM
t1 = performance.now();
let sum = 0;
for (let i in arr2) { sum += arr2[i]; }
t2 = performance.now();

console.log(`Summed using for...in ${SAMPLE_SIZE} 0-100 value elements in ${t2 - t1} ms`)

t1 = performance.now();
sum = 0;
for (let elem of arr2) { sum += elem; }
t2 = performance.now();

console.log(`Summed using for...of ${SAMPLE_SIZE} 0-100 value elements in ${t2 - t1} ms`)

t1 = performance.now();
sum = 0;
for (let i = 0; i < arr2.length; i++) { sum+=arr2[i]; }
t2 = performance.now();

console.log(`Summed using classic for ${SAMPLE_SIZE} 0-100 value elements in ${t2 - t1} ms`)
