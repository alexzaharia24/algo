// Known as Prefix Trees
// https://www.notion.so/nightowl/Trie-86ea4719e67d437e8cc12bb7bb90e0fd

class TrieNode {
    constructor(value) {
        this.value = value ?? null;
        this.children = new Map();
        this.isWord = false;
    }

    addChild(char, value) {
        let child = new TrieNode(value);
        this.children.set(char, child);
    }

    addChildNode(char, node) {
        this.children.set(char, node);
    }

    removeChild(char) {
        this.children.delete(char);
    }

    getChild(char) {
        return this.children.get(char);
    }

    toString() {
        return this.value;
    }
}

class Trie {
    constructor(root) {
        this.root = root ?? null;
    }

    findValue(key) {
        let node = this.root;
        for (let char of key) {
            if (node.getChild(char) !== undefined) {
                node = node.getChild(char);
            } else {
                return null;
            }
        }

        return node.value;
    }

    findNode(key) {
        let node = this.root;
        for (let char of key) {
            if (node.getChild(char) !== undefined) {
                node = node.getChild(char);
            } else {
                return null;
            }
        }

        return node;
    }

    insert(key, value) {
        let node = this.root;
        for (let char of key) {
            if (node.getChild(char) === undefined) {
                // Add missing child in the prefix
                node.addChild(char);
            }
            node = node.getChild(char);
        }

        node.value = value;
    }

    /**
     * Delete all nodes from the path of the key if they are not part of a prefix common to multiple nodes.
     * If the full key does not exist in the Trie then don't delete anything.
     * @param {string} key The key 
     */
    delete(key) {
        this.deleteRecursive(this.root, key);
    }

    deleteRecursive(node, key) {
        // Go deep
        if (key.length === 0) return true;
        if (node.children.size === 0) return false;

        let char = key[0];
        let shouldDelete = false;
        if (node.getChild(char) !== undefined) {
            shouldDelete = this.deleteRecursive(node.getChild(char), key.substring(1));
            if (shouldDelete) {
                node.removeChild(char);
                return node.children.size === 0;
            }
        }

        return false;
    }

    printPreorder() {
        this.preorder(null, this.root, "");
    }

    preorder(char, node, paddingLeft) {
        if (node === null) return;
        console.log(`${paddingLeft}${char}: ${node}`);
        for (let [char, child] of node.children) {
            this.preorder(char, child, paddingLeft + "   ");
        }
    }
}

let root = new TrieNode(1);
let trie = new Trie(root);

let nA1 = new TrieNode(2);
let nB1 = new TrieNode(3);
let nC1 = new TrieNode(4);
let nA2 = new TrieNode(5);
let nB2 = new TrieNode(6);
let nC2 = new TrieNode(7);
let nD1 = new TrieNode(8);

root.addChildNode("a", nA1);
root.addChildNode("b", nB1);
root.addChildNode("c", nC1);
nA1.addChildNode("b", nB2);
nB2.addChildNode("c", nC2);
nB2.addChildNode("d", nD1);

trie.printPreorder();

trie.insert("bam", 10);
trie.insert("bamm", 11);
console.log();
trie.printPreorder();

console.log('find abc: ', trie.findNode("abc"))

trie.delete("abc");
console.log();
trie.printPreorder();
console.log('find abc: ', trie.findNode("abc"))


