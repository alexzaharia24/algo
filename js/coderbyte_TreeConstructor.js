function noMoreThanTwoChildren(pairs) {
    let childCount = new Map();
    for (let p of pairs) {
      if (childCount.get(p[1]) == null) {
        childCount.set(p[1], 0);
      }
      childCount.set(p[1], childCount.get(p[1]) + 1);
      if (childCount.get(p[1]) > 2) return false;
    }
    return true;
  }
  
  function noMoreThanOneParent(pairs) {
    let parentCounts = getParentCount(pairs);
    for(let [child, parentCount] of parentCounts) {
      if(parentCount > 1) return false;
    }
    return true;
  }
  
  function getParentCount(pairs) {
    let parentCount = new Map();
    for (let p of pairs) {
      if (parentCount.get(p[0]) == null) {
        parentCount.set(p[0], 0);
      }
      parentCount.set(p[0], parentCount.get(p[0]) + 1);
    }
    return parentCount;
  }
  
  function noMoreThanOneRoot(pairs) {
    let parentCount = getParentCount(pairs);
    let rootCount = 0;
    for(let p of pairs) {
      if(parentCount.get(p[1]) == null) {
        if(rootCount === 1) return false;
        rootCount++;
      }
    }
  
    return true;
  }
  
  function noParentSameChild(pairs) {
    for(let p of pairs) {
      if(p[0] === p[1]) return false;
    }
    return true;
  }
  
  function noCycles(pairs) {
    return true;
  }
  
  function TreeConstructor(strArr) {
    // no more than 2 children => no more than 2 pairs with the same second element
    // no more than 1 parent => no more than 1 pair with the same first element
    // no more than 1 root => no more than 1 pair where the second element is not a first element in a different pair
    // no parent same as child => no same element pair
    // no cycles => iterate through the tree at the end and find out if a node has been visited before
  
    let pairs = strArr.map(str => str.substring(1, str.length - 1).split(",").map(s => parseInt(s)));
  
    return (
      noMoreThanTwoChildren(pairs) &&
      noMoreThanOneParent(pairs) &&
      noMoreThanOneRoot(pairs) &&
      noParentSameChild(pairs) &&
      noCycles(pairs)
    );
  }
  
  // keep this function call here 
  console.log(TreeConstructor(readline()));