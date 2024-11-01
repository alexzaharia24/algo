// Animal Shelter: An animal shelter, which holds only dogs and cats, operates on a strictly"first in, first
// out" basis. People must adopt either the "oldest" (based on arrival time) of all animals at the shelter,
// or they can select whether they would prefer a dog or a cat (and will receive the oldest animal of
// that type). They cannot select which specific animal they would like. Create the data structures to
// maintain this system and implement operations such as enqueue, dequeueAny, dequeueDog,
// and dequeueCat. You may use the built-in Linked List data structure.
// Hints: #22, #56, #63

const { Queue } = require('../../../utils/data-structures/Queue');

class Animal {
    constructor(order) {
        this.order = order ?? Infinity; // Nr of miliseconds
    }
}

class Dog extends Animal {
    constructor(order) {
        super(order);
    }

    toString() {
        return `dog@${this.order}`;
    }
}
class Cat extends Animal {
    constructor(order) { super(order); }

    toString() {
        return `cat@${this.order}`;
    }
}

class AnimalShelter {
    constructor() {
        this.dogs = new Queue();
        this.cats = new Queue();
        this.order = 0;
    }

    enqueue(animal) {
        animal.order = ++this.order;
        if (animal instanceof Dog) {
            this.dogs.add(animal);
        } else if (animal instanceof Cat) {
            this.cats.add(animal);
        } else {
            throw new Error('Unrecognized type of animal');
        }
    }

    dequeueAny() {
        if (this.dogs.isEmpty() && this.cats.isEmpty()) {
            throw new Error("No animals. Cannot dequeue");
        }

        let dogTime = Infinity, catTime = Infinity;

        if (!this.dogs.isEmpty()) {
            dogTime = this.dogs.peek().order;
        }
        if (!this.cats.isEmpty()) {
            catTime = this.cats.peek().order;
        }

        let animal = null;
        if (dogTime < catTime) {
            animal = this.dogs.remove();
        } else {
            animal = this.cats.remove();
        }

        return animal;
    }

    dequeueDog() {
        if (this.dogs.isEmpty()) {
            throw new Error("No dogs. Cannot dequeue.")
        }
        return this.dogs.remove();
    }
    dequeueCat() {
        if (this.dogs.isEmpty()) {
            throw new Error("No cats. Cannot dequeue.")
        }
        return this.cats.remove();
    }

    toString() {
        return `dogs: ${this.dogs.toString()}, cats: ${this.cats.toString()}`
    }
}

(async () => {
    let animalShelter = new AnimalShelter();
    animalShelter.enqueue(new Dog());
    await new Promise(r => setTimeout(r, 100));
    animalShelter.enqueue(new Cat());
    await new Promise(r => setTimeout(r, 100));
    animalShelter.enqueue(new Dog());

    console.log(animalShelter.toString());

    console.log('dequeueAny: ', animalShelter.dequeueAny());
    console.log('dequeueAny: ', animalShelter.dequeueAny());
    console.log('dequeueAny: ', animalShelter.dequeueAny());
})();