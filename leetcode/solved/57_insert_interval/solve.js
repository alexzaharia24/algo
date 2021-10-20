/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */

// Time: O(N), Extra space: O(N)
var insert = function (intervals, newInterval) {
    if (intervals.length === 0) return [newInterval];

    result = [];
    for (let i = 0; i < intervals.length; i++) {
        if(isBefore(intervals[i], newInterval)) {
            result.push(newInterval, ...intervals.slice(i));
            return result;
        } else if(isAfter(intervals[i], newInterval)) {
            result.push(intervals[i]);
        } else {
            // Overlaid
            newInterval = merged(intervals[i], newInterval);
        }
    }

    // Reaches here only if newInterval is after all intervals or has overlaid all of them starting from a certain point => we need to add it to the end
    result.push(newInterval);

    return result;
};

// Time: O(N^2), Extra space: O(1)
var insertNoExtraSpace = function (intervals, newInterval) {
    if (intervals.length === 0) return [newInterval];
    let i;
    for (i = 0; i < intervals.length; i++) {
        if(isBefore(intervals[i], newInterval)) {
            // console.log("-- ", i, intervals.length - i, intervals.slice(i));
            intervals.splice(i, intervals.length - i, newInterval, ...intervals.slice(i));
            break;
        } else if(isAfter(intervals[i], newInterval)) {
            continue;
        } else {
            // Overlaid
            newInterval = merged(intervals[i], newInterval);
            intervals[i] = null;
        }
    }

    // Reaches here only if newInterval is after all intervals or has overlaid all of them starting from a certain point => we need to add it to the end
    if(i === intervals.length) intervals.push(newInterval);

    // Remove null items
    intervals = intervals.filter(item => item !== null);


    return intervals;
};



function isBefore(interval1, interval2) {
    // if interval2 is before interval1
    return interval2[1] < interval1[0];
}

function isAfter(interval1, interval2) {
    // if interval2 is after interval1
    return interval2[0] > interval1[1];
}

function merged(interval1, interval2) {
    return [Math.min(interval1[0], interval2[0]), Math.max(interval1[1], interval2[1])];
}

function isOverlaid(interval1, interval2) {
    // if interval2 overlays interval1
    return (interval2[0] >= interval1[0] && interval2[0] <= interval1[1]) || (interval2[1] >= interval1[0] && interval2[1] <= interval1[1]) || (interval2[0] <= interval1[0] && interval2[1] >= interval1[1]);
}


console.log(insertNoExtraSpace([[1, 3], [6, 9]], [2, 5]))
console.log(insertNoExtraSpace([[1, 3], [6, 9]], [0, 1]))
console.log(insertNoExtraSpace([[2, 3], [6, 9]], [0, 1]))
console.log(insertNoExtraSpace([[2, 3], [6, 9]], [10, 11]))
console.log(insertNoExtraSpace([[5, 6]], [10, 11]))
console.log(insertNoExtraSpace([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]))
console.log(insertNoExtraSpace([[1, 5]], [2, 3]))
console.log(insertNoExtraSpace([[1, 2], [4, 6]], [3, 3]))