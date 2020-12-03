// https://leetcode.com/problems/merge-intervals/

function merge(intervals) {
    // Time: O(n*logn)
    // Space: O(n)
    let mergedIntervals = [];

    intervals.sort((a,b) => a[0] - b[0]);

    let currentInterval = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= currentInterval[1]) {
            currentInterval = [Math.min(currentInterval[0], intervals[i][0]), Math.max(currentInterval[1], intervals[i][1])]
        } else {
            // Disjoint intervals
            mergedIntervals.push(currentInterval);
            currentInterval = intervals[i];
        }
    }

    mergedIntervals.push(currentInterval);
    return mergedIntervals;
}

console.log(merge([[1,4],[0,4]]))