/**
 * Hash Table implementation that uses Linear Probing for hash conflict resolution
 */
class HashTableWithLinearProbing {
    constructor() {
        this.size = 0;
        this.table = new Array(1); // Dynamically increasing or decreasing when the hash table is full
    }

    get(key) {
        return this._getFromTable(key, this.table);
    }

    set(key, value) {
        return this._setInTable(key, value);
    }

    delete(key, table) {
        if (table === undefined) {
            table = this.table;
        }
        let hash = this._hash(key);
        for (let i = hash; i < table.length && table[i] !== undefined; i++) {
            if (table[i].key === key) {
                table[i] = undefined; return true;
            }
        }

        for (let i = 0; i < hash && table[i] !== undefined; i++) {
            if (table[i].key === key) {
                table[i] = undefined; return true;
            }
        }

        return false;
    }

    _getFromTable(key, table) {
        if (table === undefined) {
            table = this.table;
        }
        let hash = this._hash(key);
        for (let i = hash; i < table.length && table[i] !== undefined; i++) {
            if (table[i].key === key) return table[i].value;
        }

        for (let i = 0; i < hash && table[i] !== undefined; i++) {
            if (table[i].key === key) return table[i].value;
        }

        return null;
    }

    _setInTable(key, value, table) {
        if (table === undefined) {
            table = this.table;
        }
        let hash = this._hash(key);
        let position = this._getExistingOrNextFreePosition(key, table); // If it exists get the position of the entry and then update it
        console.log(`key ${key}, value ${value}, position ${position}`)
        if (position === -1) {
            // Key doesn't exist. Insert the value
            position = this._findFreePosition(hash, table);
            if (position === -1) {
                // Need to resize first
                let newTable = this._increaseCapacity();
                if (table === this.table) {
                    this.table = newTable;
                }
                table = newTable;
                position = this._findFreePosition(hash, table); // Get new position after capacity increase
            }
        }

        table[position] = { key: key, value: value };
        return true;
    }

    _increaseCapacity() {
        // Double the capacity and rehash
        let newCapacity = this.table.length * 2;
        let newTable = new Array(newCapacity);
        for (let entry of this.table) {
            this._setInTable(entry.key, entry.value, newTable);
        }

        return newTable;
    }

    _getExistingOrNextFreePosition(key, table) {
        let hash = this._hash(key);
        if (table === undefined) {
            table = this.table;
        }
        let i = hash;
        let firstFreePosition = null;
        while (i < table.length) {
            if (table[i] !== undefined) {
                if (table[i].key === key) return i;
            } else {
                if (firstFreePosition === null) {
                    firstFreePosition = i;
                }
            }
            i++;
        }
        i = 0;
        while (i < hash) {
            if (table[i] !== undefined) {
                if (table[i].key === key) return i;
            } else {
                if (firstFreePosition === null) {
                    firstFreePosition = i;
                }
            }
            i++;
        }

        return -1;
    }

    _findFreePosition(hash, table) {
        if (table === undefined) {
            table = this.table;
        }
        // From `hash` to end
        for (let i = hash; i < table.length; i++) {
            if (table[i] === undefined) {
                // Free position.
                return i;
            }
        }

        // From start to `hash`
        for (let i = 0; i < hash; i++) {
            if (table[i] === undefined) {
                // Free position.
                return i;
            }
        }

        return -1;
    }

    _hash(key, capacity) {
        if (capacity === undefined) {
            x
            capacity = this.table.length;
        }
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i)) % capacity;
        }

        return hash;
    }
}

const LL = require('./LinkedList');
class HashTableEntry {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    toString() {
        return `{key: ${this.key}, value: ${this.value}}`
    }
}
class HashTableWithSideChaining {
    constructor() {
        this.size = 0;
        this.table = new Array(1); // Dynamically increasing or decreasing when the hash table is full
        this.loadFactor = 0.75; // Standard, like in Java 10
    }

    get(key) {
        let hash = this._hash(key);
        if (this.table[hash] !== undefined) {
            let node = this.table[hash].first;
            while (node !== null) {
                let entry = node.value;
                if (entry.key === key) {
                    return entry.value;
                }
                node = node.next;
            }
        }

        return null;
    }

    set(key, value) {
        // check if already exists. If not then insert
        let entry = this._getEntry(key);
        if (entry !== null) {
            // Entry is node in linked list so we can update it here
            entry.value.value = value;
            return true;
        }
        // If inserting, check if the hash table needs to be resized. 
        // Check: size > capacity * load foactor 
        if (this.size > this.loadFactor * this.table.length) {
            // Increase capacity of the table
            this._increaseCapacity();
        }

        let hash = this._hash(key);

        let bucket = this.table[hash];
        if (bucket === undefined) {
            bucket = new LL.LinkedList();
        }

        let node = new LL.Node(new HashTableEntry(key, value));
        bucket.add(node);
        this.table[hash] = bucket;
        this.size++;
    }

    delete(key) {
        if (this.get(key) === null) return false;
        let hash = this._hash(key);
        let prevNode = null;
        let node = this.table[hash].first;
        while (node !== null) {
            let entry = node.value;
            if (entry.key === key) {
                // Found the node
                break;
            }

            prevNode = node;
            node = node.next;
        }

        if (prevNode === null) {
            // `node` is the head of the Linked List
            this.table[hash].first = node.next;
        } else {
            prevNode.next = node.next;

            if(node.next === null) {
            // `node` is the tail of the Linked List
                this.table[hash].last = prevNode;
            }
        }

        return true;
    }

    _increaseCapacity() {
        let newCapacity = this.table.length * 2;
        let newTable = new Array(newCapacity);
        for (let bucket of this.table) {
            if (bucket !== undefined) {
                let node = bucket.first;
                while (node !== null) {
                    let entry = node.value;
                    let hash = this._hash(entry.key, newCapacity);
                    if (newTable[hash] === undefined) {
                        newTable[hash] = new LL.LinkedList();
                    }
                    // Negate `next` of existing node because the Linked List will change on rehash
                    let nextNode = node.next;
                    node.next = null;
                    newTable[hash].add(node)

                    node = nextNode;
                }
            }
        }

        this.table = newTable;
    }

    _getEntry(key) {
        let hash = this._hash(key);
        let bucket = this.table[hash];
        if (bucket === undefined) return null;
        let node = bucket.first;
        while (node !== null) {
            if (node.value.key === key) return node;
            node = node.next;
        }
        return null;
    }

    _hash(key, capacity) {
        if (capacity === undefined) {
            capacity = this.table.length;
        }
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i)) % capacity;
        }

        return hash;
    }
}

// let HT = new HashTableWithLinearProbing();
// HT.set("a", 1);
// HT.set("a", 5);
// // HT.set("b", 2);
// // HT.set("c", 3);
// // HT.set("d", 4);
// // console.log(HT.table);
// // console.log(HT.get("f"))
// // console.log(HT.get("b"))
// console.log(HT.table);

// let HTableSideChain = new HashTableWithSideChaining();
// HTableSideChain.set("a", 1);
// HTableSideChain.set("b", 2);
// HTableSideChain.set("c", 3);
// HTableSideChain.set("c", 6);
// console.log(HTableSideChain.table.toString());
// console.log(HTableSideChain.get("c"));
// console.log(HTableSideChain.get("a"));
// console.log(HTableSideChain.get("b"));
// HTableSideChain.delete("c");
// console.log(HTableSideChain.table.toString());
