class Queue {
    constructor() {
        this.elements = [];
        this.idx = 0;
    }

    push(element) {
        this.elements.push(element);
    }

    pop() {
        if(this.idx < this.elements.length) {
            return this.elements[this.idx++];
        }
        return null;
    }
    
    size() {
        return this.elements.length - this.idx;
    }
}

module.exports.Queue = Queue;