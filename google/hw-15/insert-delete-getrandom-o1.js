// https://leetcode.com/problems/insert-delete-getrandom-o1/

class RandomizedSet {
    // Space O(n)
    constructor() {
        this.map = {};
        this.size = 0;
    }

    /**
     * Time O(1)
     * @param {} val 
     */
    insert(val) {
        // console.log("[I]", val)
        if (!(val in this.map)) {
            let idx = "i" + this.size;
            this.map[val] = "i" + this.size;
            this.map[idx] = val;
            this.size++;
            return true;
        }
        return false;
    }

    /**
     * Time O(1)
     * @param {*} val 
     */
    remove(val) {
        // console.log("[R]", val)
        if (val in this.map) {
            let idx = this.map[val];
            let numericIdx = parseInt(idx.substring(1))
            if (numericIdx === this.size - 1) {
                delete this.map[idx];
                delete this.map[val];
            } else {
                let lastIdx = "i" + (this.size - 1);
                let lastVal = this.map[lastIdx];
                // console.log("idx:", idx, "LI:", lastIdx, "LV:", lastVal)
                delete this.map[lastIdx];
                delete this.map[val];
                this.map[idx] = lastVal;
                this.map[lastVal] = idx;
            }

            this.size--;
            return true;
        }
        return false;
    }

    /**
     * Time O(1)
     */
    getRandom() {
        let idx = parseInt(Math.random() * this.size);
        return this.get(idx)
    }

    get(idx) {
        return this.map["i" + idx];
    }
}

let set = new RandomizedSet();
// console.log(set.remove(0));
// console.log(set.map, set.size)
// console.log(set.remove(0));
// console.log(set.map, set.size)
// console.log(set.insert(0));
// console.log(set.map, set.size)
// console.log(set.getRandom());
// console.log(set.map, set.size)
// console.log(set.remove(0));
// console.log(set.map, set.size)
// console.log(set.insert(0));
// console.log(set.map, set.size)

// ["RandomizedSet","insert","insert","insert","insert","insert","remove","insert","getRandom","insert","remove"]
// [[],[0],[2],[1],[1],[1],[0],[0],[],[1],[2]]

console.log(set.insert(0));
console.log(set.map, set.size)
console.log(set.insert(2));
console.log(set.map, set.size)
console.log(set.insert(1));
console.log(set.map, set.size)
console.log(set.insert(1));
console.log(set.map, set.size)
console.log(set.insert(1));
console.log(set.map, set.size)
console.log(set.remove(0));
console.log(set.map, set.size)
console.log(set.insert(0));
console.log(set.map, set.size)
console.log(set.getRandom());
console.log(set.map, set.size)
console.log(set.insert(1));
console.log(set.map, set.size)
console.log(set.remove(2));
console.log(set.map, set.size)

