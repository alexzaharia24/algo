// [-2,1,-3,4,-1,2,1,-5,4]
// M = -infinity, S = 0
// x=-2 S=-2 M=max(M, S) = max(-infinity, -2) = -2
// x=1 S=max(S+x, x) = max(-1, 1)=1 M=max(-2,1)=1
// x=-3 S=-2 M=(1,-2)=1
// x=4 S=max(-2,4)=4 M=max(1,4)=4
// x=-1 S=max(3, -1)=3 M=max(4,3)=4
// x=2 S=max(5,2)=5 M=max(4,5)=5
// x=1 S=max(6,1)=6 M=max(5,6)=6
// x=-5 S=max(1,-5)=1 M=max(1,6)=6
// x=4 S=max(5, 4)=5 M=max(5,6)=6

const solve = (nums) => {
    let M = -Infinity, S = 0;
    for (let x of nums) {
        S = Math.max(S + x, x);
        M = Math.max(M, S);
    }
    return M;
}

let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]; // 6
console.log(solve(nums));
nums = [1]; // 1
console.log(solve(nums));
nums = [5, 4, -1, 7, 8]; // 23
console.log(solve(nums));
nums = [-14, -6, -1, -2]; // -1
console.log(solve(nums));