import Tree from './tree.js'
function randomArray(n) {
	const numbers = []
	for (let i = 0; i < n; i++) {
		numbers.push(Math.floor(Math.random() * 1000))
	}
	return numbers
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const tree = Tree(array)
console.log('----- Build and print tree -----')
tree.prettyPrint()

// const traversalFunction = node => process.stdout.write(node.data + ' ')
const traversalFunction = node => console.log(node.data + ' ')

// ----- Breadth-first traversal: Level order -----
console.log('\n----- Breadth-first traversal: Level order -----')
console.log('Level Order')
tree.levelOrder(traversalFunction)

console.log('\n\nLevel Order Loop')
tree.levelOrderLoop(traversalFunction)

console.log('\n\nLevel Order - no callback', tree.levelOrder())
console.log('\nLevel Order loop - no callback', tree.levelOrderLoop())

// ----- Depth-first traversal: Pre, In and Post orders -----
console.log('\n----- Depth-first traversal: Pre, In and Post orders -----')
console.log('Pre Order')
tree.preOrder(traversalFunction)

console.log('\n\nIn Order')
tree.inOrder(traversalFunction)

console.log('\n\nPost Order')
tree.postOrder(traversalFunction)

console.log('\n\nPre Order - no callback', tree.preOrder())
console.log('\nIn Order - no callback', tree.inOrder())
console.log('\nPost Order - no callback', tree.postOrder())

// ----- Find node by value -----
console.log('\n----- Find node by value -----')
console.log('Find node with value 6345:', tree.find(6345))
console.log('Find node with value 1000:', tree.find(1000))

// ----- Insert new node -----
console.log('\n----- Insert new nodes -----')
console.log('Insert new node with value 25:')
tree.insert(25)
tree.prettyPrint()

// ----- Delete node -----
console.log('\n----- Delete nodes -----')
console.log('Delete leaf node with value 324:')
tree.remove(324)
tree.prettyPrint()

console.log('\nDelete parent node with one child, value 3:')
tree.remove(3)
tree.prettyPrint()

console.log('\nDelete parent node with two children, value 23:')
tree.remove(23)
tree.prettyPrint()

console.log('\nDelete parent node with two children, value 4:')
tree.remove(4)
tree.prettyPrint()

// ----- Tree height -----
console.log('\n----- Tree height -----')
console.log('Tree height is:', tree.height())
console.log('Tree height from node with value of 67 is:', tree.height(tree.find(67)))
console.log('Tree height from node with value of 5 is:', tree.height(tree.find(5)))
console.log('Tree height from node with value of 6345 is:', tree.height(tree.find(6345)))

// ----- Node depth -----
console.log('\n----- Node depth -----')
console.log('Depth of node with value of 8 is:', tree.depth(8))
console.log('Depth of node with value of 67 is:', tree.depth(67))
console.log('Depth of node with value of 1 is:', tree.depth(1))
console.log('Depth of node with value of 9 is:', tree.depth(9))

// ----- Check if trees are balanced -----
console.log('\n----- Check if trees are balanced -----')
console.log('Tree 1:')
tree.prettyPrint()
const tree1IsBalanced = tree.isBalanced()
console.log('Balanced:', tree1IsBalanced)

console.log('\nTree 2:')
const tree2 = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
tree2.remove(1)
tree2.remove(3)
tree2.prettyPrint()
const tree2IsBalanced = tree2.isBalanced()
console.log('Balanced:', tree2IsBalanced)

// Make tree 2 balanced again
console.log('\nTree 2 after insert:')
tree2.insert(3)
tree2.insert(2)
tree2.prettyPrint()
const tree2AfterInsert = tree2.isBalanced()
console.log('Balanced', tree2AfterInsert)

// Make tree 2 unbalanced again
tree2.insert(1)
console.log('\nTree 2 after second insert:')
tree2.prettyPrint()
const tree2AfterSecondInsert = tree2.isBalanced()
console.log('Balanced', tree2AfterSecondInsert)

// ----- Rebalance tree -----
console.log('\n----- Rebalance Tree -----')
tree2.rebalance()
tree2.prettyPrint()

// ----- Tie it all together (from TOP requirements) ----
console.log('\n----- Tie it all together (from TOP requirements) -----')
// Create a binary search tree from an array of random numbers. You can create a function if you want that returns an array of random numbers each time you call it.
const odin = Tree(randomArray(16))
odin.prettyPrint()

// Confirm that the tree is balanced by calling isBalanced
console.log('Is balanced:', odin.isBalanced())

// Print out all elements in level, pre, post, and in order
console.log('\nPrint traversals')
console.log(odin.levelOrder())
console.log(odin.preOrder())
console.log(odin.postOrder())
console.log(odin.inOrder())

// Unbalance the tree by adding several numbers > 100
console.log('\nAdd numbers to unbalance the tree:')
odin.insert(1041)
odin.insert(2299)
odin.insert(1591)
odin.insert(1812)
odin.prettyPrint()

// Confirm that the tree is unbalanced by calling isBalanced
console.log('Is balanced:', odin.isBalanced())

// Balance the tree by calling rebalance
console.log('\nDo rebalance:')
odin.rebalance()

// Confirm that the tree is balanced by calling isBalanced
odin.prettyPrint()
console.log('Is balanced:', odin.isBalanced())

// Print out all elements in level, pre, post, and in order
console.log('\nPrint traversals')
console.log(odin.levelOrder())
console.log(odin.preOrder())
console.log(odin.postOrder())
console.log(odin.inOrder())
