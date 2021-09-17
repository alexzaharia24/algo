function FindIntersection(strArr) {
  // code goes here  

  let numbers1 = strArr[0].split(",").map(str => parseInt(str));
  let numbers2 = strArr[1].split(",").map(str => parseInt(str));

  let map = new Map();
  let intersection = [];

  numbers1.forEach(number => map.set(number, true));
  for (let number of numbers2) {
    if (map.get(number) != null) {
      intersection.push(number);
    }
  }


  return intersection.join(",");
}

console.log(FindIntersection(["1,2,3,4,5","2,4,6"]));