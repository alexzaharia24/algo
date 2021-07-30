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

// Double linked list

class Queue {
    constructor() {
      this.head = new Node();
      this.tail = new Node(this.head);
      this.head.next = this.tail;
      this.size = 0;
    }
    
    push(x) {
      // pushes an element at the back of the queue  
      let node = new Node(this.head, this.head.next, x);
      if(this.size === 0) {
        this.tail.prev = node; 
      } else {
        this.head.next.prev = node; 
      }
      this.head.next = node;
      
      this.size++;
      
      console.log("++++++++")
      console.log("Pushed: ", x, this);
    }
    
    pop() {
      // pops the element in the front of the queue and returns it or error if empty
      if(this.isEmpty()) {
        throw new Error("Cannot pop from empty Queue"); 
      }
      
      let node = this.tail.prev;
      console.log("-------")
      console.log("Pop: ", node.value, this);
      
      // if(this.size === 1) {
      //   this.head.next = this.tail;
      //   this.tail.prev = this.head;
      // } else {
        this.tail.prev = node.prev;
        node.prev.next = this.tail;
      // }
      this.size--;
      return node.value;
    }
    
    peek() {
      // returns the element in the fron of the queue or error if empty
      if(this.isEmpty()) {
        throw new Error("Cannot pop from empty Queue"); 
      }
      let node = this.tail.prev;
      return node.value;
    }
    
    size() {
      // returns the number of elements  
      return this.size;
    }
    
    isEmpty() {
      // returns true if queue is empty or false otherwise 
      return this.size === 0;
    }
    
  }