let Tree = require('./bst.js');

const randomArray = (size) => {
    let array = [];
    for(let i = 0; i < size; i++){
        array.push(Math.floor(Math.random() * 100));
    }
    return array;
}

let tree = new Tree(randomArray(40));
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());
tree.insert(109);
tree.insert(111);
tree.insert(293);
tree.insert(103);
tree.insert(308);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());

