/**
 * 二叉树结构 & 二叉树遍历 & 二叉树排序
 */

var BTree = function(value) {
	this.data = value; //节点值
	this.left = null; //左节点
	this.right = null; //右节点

	this.insertLeft = function(value) {
		this.left = new BTree(value)
		return this.left;
	}

	this.insertRight = function(value) {
		this.right = new BTree(value)
		return this.right;
	}

	this.show = function() {
		console.log(this.data);
	}
}

/**
 * 二叉排序树插入方法
 */
function insertBST(node, value) {
	if (!node) {
		node = new BTree(value);
		return node;
	}

	if (value < node.data) {
		node.left = insertBST(node.left, value);
	} else {
		node.right = insertBST(node.right, value);
	}

	return node;
}

/**
 * 生成排序二叉树
 */
function createBTree(tree, arr) {
	for (var i = 0; i < arr.length; i++) {
		tree = insertBST(tree, arr[i]);
	}
	return tree;
}

/**
 * 前序遍历 中->左->右
 */
function preOrder(node) {
	if (node.data) {
		node.show();
		if (node.left) {
			preOrder(node.left);
		}
		if (node.right) {
			preOrder(node.right);
		}
	}
}

/**
 * 中序遍历 左->中->右
 */
function inOrder(node) {
	if (node.data) {
		if (node.left) {
			inOrder(node.left);
		}
		node.show();
		if (node.right) {
			inOrder(node.right)
		}
	}
}

/**
 * 后序遍历 左->右->中
 */
function postOrder(node) {
	if (node.data) {
		if (node.left) {
			postOrder(node.left);
		}
		if (node.right) {
			postOrder(node.right)
		}
		node.show();
	}
}

/**
 * 逆序遍历 右->中->左
 */
function reverseOrder(node) {
	if (node.data) {
		if (node.right) {
			reverseOrder(node.right);
		}
		node.show();
		if (node.left) {
			reverseOrder(node.left);
		}
	}
}

/**
 * 求节点数
 */
function getNodeNum(node) {
	if (!node) { //递归出口
		return 0;
	}
	return getNodeNum(node.left) + getNodeNum(node.right) + 1;
}

/**
 * 求二叉树的深度
 */
function getDepth(node) {
	if (!node) { //递归出口
		return 0;
	}
	var depthLeft = getDepth(node.left);
	var depthRight = getDepth(node.right);
	return depthLeft > depthRight ? (depthLeft + 1) : (depthRight + 1);
}

//--------------------------test----------------------------

var flag = 2;

if (flag === 1) { //遍历

	var Root = new BTree('root');
	var A = Root.insertLeft("A");
	var C = A.insertLeft("C");
	var D = C.insertRight("D");
	var F = D.insertLeft("F");
	var G = D.insertRight("G");
	var B = Root.insertRight("B");
	var E = B.insertRight("E");

	console.log("-----pre-traversal-----");
	preOrder(Root);

	console.log("-----in-traversal-----");
	inOrder(Root);

	console.log("-----post-traversal-----");
	postOrder(Root);

} else if (flag === 2) { //排序

	var list = [5, 6, 2, 10, 9, 3, 8, 31, 22, 7];

	var tree = new BTree(100);

	tree = createBTree(tree, list);

	inOrder(tree);

	console.log('--------------------');

	reverseOrder(tree);

	console.log('二叉树长度为：', getNodeNum(tree)); //求二叉树的节点数

	console.log('二叉树深度为：', getDepth(tree)); //求二叉树的深度

} else if (flag === 3) {

}

module.exports = BTree;