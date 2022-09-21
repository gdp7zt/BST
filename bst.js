class Tree {
    constructor(arr){
        //Sort array
        arr.sort((a,b) => a-b);

        //Remove duplicates
        for(let i = 0; i < arr.length - 1; i++){
            while(arr[i] === arr[i+1]){
                arr.splice(i, 1);
            }
        }
        this.root = this.buildTree(arr);
    }

    buildTree(arr){
        if(arr.length === 0) return null;

        let midpoint = Math.floor(arr.length / 2);
        let root = new Node(arr[midpoint]);

        root.left = this.buildTree(arr.slice(0, midpoint));
        root.right = this.buildTree(arr.slice(midpoint + 1));

        return root;
    }

    prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    insert(value, node = this.root){
        if(node === null) return new Node(value);
        if (value === node.data) return node;

        if(value < node.data) node.left = this.insert(value, node.left);
        else if(value > node.data) node.right = this.insert(value, node.right);

        return node;
    }

    delete(value, node = this.root){
        if(node === null) return node;

        //Keep recurring until we find the value
        if(value < node.data) node.left = this.delete(value, node.left);
        else if (value > node.data) node.right = this.delete(value, node.right);

        //Only case left is if value = node.data
        else{
            //If both null, it will return null
            //If one is null, it will return the other to be appended to previous node
            if(node.left === null) return node.right;
            else if(node.right === null) return node.left;

            //Two children:
            let temp = node.right;
            while(temp.left !== null){
                temp = temp.left;
            }
            node.data = temp.data;
            node.right = this.delete(node.data, node.right);
        }

        return node;
    }

    find(value, node = this.root){
        if(node === null || node.data === value) return node;
        if(node.data < value) return this.find(value, node.right);
        if(node.data > value) return this.find(value, node.left);
    }

    levelOrder(exec){
        if(this.root === null) return;
        let queue = [this.root];
        let backup = [];
        while(queue.length > 0){
            let workingNode = queue.shift();
            if(exec) exec(workingNode);
            else backup.push(workingNode.data);

            if(workingNode.left !== null) queue.push(workingNode.left);
            if(workingNode.right !== null) queue.push(workingNode.right);
        }

        if(backup.length !== 0) return backup;
    }

    preorder(exec, workingNode = this.root, backup = []){
        if(workingNode === null) return;

        if(exec) exec(workingNode);
        else backup.push(workingNode.data);

        this.preorder(exec, workingNode.left, backup);
        this.preorder(exec, workingNode.right, backup);

        if(backup.length > 0) return backup;
    }

    inorder(exec, workingNode = this.root, backup = []){
        if(workingNode === null) return;

        this.inorder(exec, workingNode.left, backup);

        if(exec) exec(workingNode);
        else backup.push(workingNode.data);

        this.inorder(exec, workingNode.right, backup);

        if(backup.length > 0) return backup;
    }

    postorder(exec, workingNode = this.root, backup = []){
        if(workingNode === null) return;

        this.postorder(exec, workingNode.left, backup);
        this.postorder(exec, workingNode.right, backup);

        if(exec) exec(workingNode);
        else backup.push(workingNode.data);

        if(backup.length > 0) return backup;
    }

    height(node = this.root){
        if(node === null) return 0
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node, root = this.root, counter = 0){
        if(root === null || node.data === root.data) return counter;
        if(node.data < root.data) {
            return this.depth(node, root.left, counter + 1);
        }
        if(node.data > root.data) {
            return this.depth(node, root.right, counter + 1);
        }
    }

    isBalanced(node = this.root){
        let balanced = true;
        if(node === null) return;
        balanced = this.isBalanced(node.left);
        balanced = this.isBalanced(node.right);
        if(this.height(node.left) - this.height(node.right) > 1 ||
           this.height(node.left) - this.height(node.right) < -1) {
            return false;
        }
        if(balanced === false) return false;
        return true;
    }

    rebalance(){
        let arr = this.inorder();
        this.root = this.buildTree(arr);
    }
}

class Node{
    constructor(data){
        this.data = null;
        if(data) this.data = data;
        this.left = null;
        this.right = null;
    }
}

module.exports = Tree;
