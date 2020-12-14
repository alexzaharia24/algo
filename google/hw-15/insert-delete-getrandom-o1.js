// https://leetcode.com/problems/insert-delete-getrandom-o1/

class RandomizedSet {
    constructor() {
        this.numbers = new Set();
    }

    insert(val) {
        if(!this.numbers.has(val)) {
            this.numbers.add(val);
            return true;
        }
        return false;
    }

    remove(val) {
        if(this.numbers.has(val)) {
            this.numbers.delete(val);
            return true;
        }
        return false;
    }

    getRandom() {
        let idx = parseInt(Math.random() * this.numbers.size );
        // console.log(idx);
        return this.get(idx)
    }

    get(idx) {
        let i = 0;
        for(let val of this.numbers) {
            // console.log(idx, i)
            if(idx === i) return val;
            i++;
        }
    }
}

let set = new RandomizedSet();
set.insert(1);
set.insert(2);
console.log(set.getRandom());