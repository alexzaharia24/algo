class Node {
    constructor(value, next) {
        this.value = value ?? null;
        this.next = next ?? null;
    }

    toString() {
        return `{${this.value}}`;
    }
}

class LinkedList {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    getSize() {
        return this.size;
    }

    getFirst() {
        return this.first;
    }

    getLast() {
        return this.last;
    }

    /**
     * Add a node to the end of the list
     * @param {Node} node 
     */
    add(node) {
        if (this.first === null) {
            this.first = node;
            this.last = node;
        } else {
            if (this.first === this.last) {
                this.last = node;
                this.first.next = node;
            } else {
                this.last.next = node;
                this.last = node;
            }
        }
        this.size++;
    }

    /**
     * Add multiple nodes to the end of the list
     * @param {Node[]} nodes
     */
    addAll(nodes) {
        for(let node of nodes) {
            this.add(node);
        }
    }

    /**
     * Find the node in the list corresponding to the given one
     * @param {The node to find} node 
     * @returns If it exists in the list, returns the node from the list with a 'prev' field containing the previous node in the list. 
     *          Null otherwise
     */
    findNodeWithPrevious(node) {
        if (this.size === 0) return null;
        let currentNode = this.first;
        let prevNode = null;
        let newNode = null;
        while (currentNode !== node && currentNode !== null) {
            prevNode = currentNode;
            currentNode = currentNode.next;
        }
        if (prevNode === null) {
            // `node` is the first node
            newNode = new Node(node.value, node.next);
            newNode.prev = null;
        } else {
            if (currentNode === null) {
                // `node` not found in list
                newNode = null;
            } else {
                // `node` is in inside the list
                newNode = new Node(node.value, node.next);
                newNode.prev = prevNode;
            }
        }

        return newNode;
    }

    /**
     * Delete the given node from the list
     * @param {The node to delete} node 
     * @returns True if the node exists and has been deleted successfully. 
     *          False otherwise
     */
    delete(node) {
        let foundNode = this.findNodeWithPrevious(node);
        console.log("Found node: ", foundNode);
        // `node` not in list
        if (foundNode === null) return false;
        if (foundNode.prev !== null) {
            foundNode.prev.next = foundNode.next;
        } else {
            this.first = foundNode.next;
        }
        if (foundNode.next !== null) {
            foundNode.next.prev = foundNode.prev;
        } else {
            this.last = foundNode.prev;
        }

        return true;
    }

    /**
     * "Delete" the node by replacing its value with the one from the next one and then skiping it. Doesn't work for first or last node in the list.
     * @param {The node to delete} node 
     * @returns True if the node exists and has been deleted successfully. 
     *          False otherwise
     */
    deleteO1(node) {
        if(node === this.first || node === this.last || node === null) return false;
        node.value = node.next.value;
        node.next = node.next.next;
        return true;
    }

    /**
     * Return the string representation of the list containing all the nodes
     */
    toString() {
        let node = this.first;
        let string = "[";

        let startOfCycle = this.detectCycle();
        let nrOfStartOfCycleEncounters = 0;
        while (node !== null) {
            if (node === startOfCycle) {
                if (nrOfStartOfCycleEncounters === 1) {
                    string += `<Cycle starting at node ${startOfCycle}>`;
                    break;
                }
                nrOfStartOfCycleEncounters++;
            }

            string += node.toString();
            if (node.next !== null) {
                string += ", ";
            }
            node = node.next;
        }

        string += "]";
        return string;
    }

    /**
     * Detect a cycle. If it exists return the start of the cycle. If not return null.
     * Uses Floyd's Cycle Detection
     */
    detectCycle() {
        let slow = this.first;
        let fast = this.first;
        let meetingPoint = null;
        // Detection phase
        while (slow !== null && fast !== null) {
            slow = slow.next;
            if (fast.next === null) break;
            fast = fast.next.next;

            if (slow === fast) {
                meetingPoint = slow;
                break;
            }
        }

        // No cycle
        if (meetingPoint === null) return null;

        // Cycle. Now find the start of the cycle
        // Move the slow pointer to the start of the list. Then move slow and fast with one step at the same time. They will meet at the start of the cycle. Proof here: https://cs.stackexchange.com/a/90990
        slow = this.first;
        while (slow !== fast) {
            slow = slow.next;
            fast = fast.next;
        }

        return slow;
    }

    findMiddleOfList() {
        let slow = this.first, fast = this.first;
        while (fast.next !== null && fast.next.next !== null) {
            fast = fast.next.next;
            slow = slow.next;
        }

        return slow;
    }
}

module.exports = {
    Node: Node,
    LinkedList: LinkedList
}

// let LL = new LinkedList();
// let n1 = new Node(1);
// let n2 = new Node(2);
// let n3 = new Node(3);
// let n4 = new Node(4);
// LL.add(n1);
// LL.add(n2);
// LL.add(n3);
// LL.add(n4);
// console.log(LL.findMiddleOfList());
// console.log(LL.toString());
// LL.delete(n3);
// LL.delete(n2);
// LL.delete(n1);
// // LL.delete(n2);
// // LL.delete(n3);
// // LL.delete(n4);
// console.log(LL.toString());
