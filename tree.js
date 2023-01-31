import Node from './node.js'
export default function Tree (array) {
	const processedArray = [...new Set(array)].sort((a, b) => a - b)
	let rootNode = buildTree(processedArray)
	return {
		prettyPrint,
		levelOrder,
		levelOrderLoop,
		preOrder,
		inOrder,
		postOrder,
		find,
		insert,
		remove,
		height,
		depth,
		isBalanced,
		rebalance
	}

	function buildTree (array = array) {
		const middle = Math.floor(array.length / 2)
		const node = array.length ? Node(array[middle]) : null
		if (array.length > 1) {
			node.left = buildTree(array.slice(0, middle))
			node.right = buildTree(array.slice(middle + 1))
		}
		return node
	}

	function processData (node, callback, valuesArray) {
		if (callback) callback(node)
		else valuesArray.push(node.data)
	}

	function levelOrder (callback, queue = [rootNode], valuesArray = []) {
		if (!queue.length) return callback ? null : valuesArray
		const node = queue.shift() // will be null if last node was leaf
		if (node) {
			processData(node, callback, valuesArray)
			queue.push(node.left)
			queue.push(node.right)
		}
		return levelOrder(callback, queue, valuesArray)
	}

	function levelOrderLoop (callback) {
		const valuesArray = []
		const queue = [rootNode]
		while (queue.length) {
			const node = queue.shift() // will be null if last node was leaf
			if (node) {
				processData(node, callback, valuesArray)
				queue.push(node.left)
				queue.push(node.right)
			}
		}
		if (!callback) return valuesArray
	}

	function preOrder (callback, node = rootNode, valuesArray = []) {
		if (!node) return valuesArray.length ? valuesArray : null
		processData(node, callback, valuesArray) // root
		preOrder(callback, node.left, valuesArray) // left
		return preOrder(callback, node.right, valuesArray) // right
	}

	function inOrder (callback, node = rootNode, valuesArray = []) {
		if (!node) return valuesArray.length ? valuesArray : null
		inOrder(callback, node.left, valuesArray) // left
		processData(node, callback, valuesArray) // root
		return inOrder(callback, node.right, valuesArray) // right
	}

	function postOrder (callback, node = rootNode, valuesArray = []) {
		if (!node) return valuesArray.length ? valuesArray : null
		postOrder(callback, node.left, valuesArray) // left
		postOrder(callback, node.right, valuesArray) // right
		processData(node, callback, valuesArray) // root
		return postOrder(null, null, valuesArray)
	}

	// Function provided by The Odin Project
	function prettyPrint (node = rootNode, prefix = '', isLeft = true) {
		if (node.right !== null) {
			prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
		if (node.left !== null) {
			prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
		}
	}

	function find (value, node = rootNode) {
		if (!node) return null
		if (value > node.data) return find(value, node.right)
		else if (value < node.data) return find(value, node.left)
		else return node
	}

	function insert (value) {
		rootNode = insertNode(rootNode, value)
	}

	function insertNode (node, value) {
		if (!node) return Node(value)
		else if (value < node.data) {
			node.left = insertNode(node.left, value)
		} else if (value > node.data) {
			node.right = insertNode(node.right, value)
		}
		return node
	}

	function remove (value) {
		rootNode = removeNode(rootNode, value)
	}

	function removeNode (node, value) {
		if (!node) return
		else if (value === node.data) return doDelete(node)
		else if (value < node.data) node.left = removeNode(node.left, value)
		else if (value > node.data) node.right = removeNode(node.right, value)
		return node
	}

	function doDelete (node) {
		if (node.left && node.right) {
			node.data = getNodeWithSmallestValue(node.right).data
			node.right = removeNode(node.right, node.data)
			return node
		}
		else if (node.left) return node.left
		else if (node.right) return node.right
		else return null
	}

	function getNodeWithSmallestValue (node = rootNode) {
		if (!node) return null
		if (node.left) return getNodeWithSmallestValue(node.left)
		else if (node.right) return getNodeWithSmallestValue(node.right)
		else return node
	}

	// Number of edges in path from given node to its farthest leaf node
	function height (node = rootNode) {
		if (!node) return -1
		const left = height(node.left)
		const right = height(node.right)
		return left > right ? left + 1 : right + 1
	}

	// Number of edges in path from root node to given node
	function depth (value, node = rootNode) {
		if (value === node.data) return 0
		else if (value > node.data) return depth(value, node.right) + 1
		else if (value < node.data) return depth(value, node.left) + 1
	}

	// Difference between height of left subtree and right subtree for every node is <=1
	function isBalanced (node = rootNode) {
		// Base case
		if (!node) return [true, -1] // [nodeBalanced, height]

		const left = isBalanced(node.left)
		const right = isBalanced(node.right)

		// Check left difference between left and right subtree heights is not more than 1
		const heightDiffCheck = Math.abs(left[1] - right[1]) <= 1
		const nodeBalanced = heightDiffCheck && left[0] && right[0]

		const height = Math.max(left[1], right[1]) + 1
		const result = [nodeBalanced, height]
		//console.log(node.data, result) // uncomment to see result for each subtree
		return node === rootNode ? nodeBalanced : result
	}

	function rebalance () {
		// Any traversal method can be passed in
		rootNode = buildTree(inOrder())
	}
}
