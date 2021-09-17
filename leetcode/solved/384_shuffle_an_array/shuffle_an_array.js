var Solution = function (nums) {
    this.permutations = this.getPermutations(nums);
    this.original = nums;
  };
  
  /**
  * Resets the array to its original configuration and return it.
  * @return {number[]}
  */
  Solution.prototype.reset = function () { 
    this.permutations = this.getPermutationsRec(this.original);
    return this.original;
  };
  
  /**
  * Returns a random shuffling of the array.
  * @return {number[]}
  */
  Solution.prototype.shuffle = function () {
    let perm = this.permutations.pop();
    this.permutations.splice(0,0,perm);
    return perm;
  };
  
  Solution.prototype.getPermutations = function(arr) {
    let permutations = [];
    this.getPermutationsRec(arr, [], permutations);
    return permutations;
  }
  
  Solution.prototype.getPermutationsRec = function(arr, currentPerm, perms) {
    // console.log(arr, currentPerm, perms);
    if (arr.length === 0) {
      perms.push(currentPerm);
      return;
    }
  
    for (let i = 0; i < arr.length; i++) {
      let newArr = [...arr];
      newArr.splice(i,1);
      this.getPermutationsRec(newArr, [...currentPerm, arr[i]], perms);
    }
  }
  
  // console.log(getPermutations([1,2,3]));
  
  let x = new Solution([1, 2, 3])
  console.log(x.shuffle());
  console.log(x.shuffle());
  console.log(x.shuffle());