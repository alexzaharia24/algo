// let tree = [0, 1, 2, 3, 4, 5]

// function constructTreeFromArray(array) {
//     let tree = {};
//     for(let 
// }

let n6 = { value: 6 };
let n5 = { value: 5, right: n6 };
let n4 = { value: 4 };
let n3 = { value: 3 };
let n2 = { value: 2, left: n5 };
let n1 = { value: 1, left: n3, right: n4 };
let root = { value: 0, left: n1, right: n2 };

function traverseBfsWithKnownLevel(root) {
    let q = [];
    let currentLevelNodeCount = 1, nextLevelNodeCount = 0;
    let currentLevel = 0;

    q.push(root);
    while (q.length > 0) {
        console.log(`Level ${currentLevel}`);
        while (currentLevelNodeCount > 0) {
            let n = q.shift();
            console.log(`Node ${n.value} is at level ${currentLevel}`);
            currentLevelNodeCount--;
            if (n.left !== undefined) {
                q.push(n.left);
                nextLevelNodeCount++;
            }
            if (n.right !== undefined) {
                q.push(n.right);
                nextLevelNodeCount++;
            }
        }

        currentLevel++;
        currentLevelNodeCount = nextLevelNodeCount;
        nextLevelNodeCount = 0;
    }
}

console.log(root);
traverseBfsWithKnownLevel(root);