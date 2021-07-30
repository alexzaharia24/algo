/**
 * Hash Table implementation that uses Linear Probing for hash conflict resolution
 */
class HashTableWithLinearProbing {
    constructor() {
        this.size = 0;
        this.table = new Array(1); // Dynamically increasing or decreasing when the hash table is full
    }

    get(key, table) {
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

        return undefined;
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
            capacity = this.table.length;
        }
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i)) % capacity;
        }

        return hash;
    }
}

let HT = new HashTableWithLinearProbing();
HT.set("a", 1);
HT.set("a", 5);
// HT.set("b", 2);
// HT.set("c", 3);
// HT.set("d", 4);
// console.log(HT.table);
// console.log(HT.get("f"))
// console.log(HT.get("b"))
console.log(HT.table);
