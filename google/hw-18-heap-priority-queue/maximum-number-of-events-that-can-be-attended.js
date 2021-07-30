// https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/

const { first } = require("lodash");

// [[1,2],[2,3],[3,4]]
// s1 e1 _ _
// _ s2 e2 _
// _ _ s3 e3

// [[1,2],[2,3],[3,4],[1,2]]
// s1   e1  _ _
// _ s2  e2 _
// _ _  s3  e3
// s4 e4 _ _
// s1, e4, e2, e3

// [[1,2],[2,3],[3,4],[3,3], [3,4]]
// [[1,2], [2,3], [3,4], [4], [4,5]], [5]]

function maxEvents(events) {
    events.sort((event1, event2) => {
    //    if(event1[0] < event2[0]) return -1;
       return event1[1] - event2[1];
    }) // O(n*logn)

    let maxDay = -Infinity;
    for(let event of events) {
        if(event[1] > maxDay) {
            maxDay = event[1];
        }
    }
    
    let day = 1;
    let nrOfVisitedEvents = 0;
    for(let event of events) {
        // console.log('day: ', day, event)
        while(day <= maxDay && day < event[0]) {
            day++;
        }
        if(day >= event[0] && day <= event[1]) {
            nrOfVisitedEvents++;
            day++
        }
    }

    return nrOfVisitedEvents;

}

console.log(maxEvents([[1,2],[2,2],[2,3]]));
console.log(maxEvents([[1,4],[4,4],[2,2],[3,4],[1,1]]));
console.log(maxEvents([[1,100000]]));
console.log(maxEvents([[1,2],[2,3],[3,4],[1,2]]));
console.log(maxEvents([[1,2],[1,2],[3,3],[1,5],[1,5]]));
