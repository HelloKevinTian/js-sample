var BTree = function(value) {
	this.data = value;
	this.left = null;
	this.right = null;

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

function InsertBST(node, key) {
	if (!node) {
		node = new BTree(key);
		return node;
	}

	if (key < node.data) {
		node.left = InsertBST(node.left, key);
	} else {
		node.right = InsertBST(node.right, key);
	}

	return node;
}

function CreateBiTree(tree, arr) {
	for (var i = 0; i < arr.length; i++) {
		tree = InsertBST(tree, arr[i]);
	}
	return tree;
}

function preorder(node) {
	if (node.data) {
		node.show();
		if (node.left) {
			preorder(node.left);
		}
		if (node.right) {
			preorder(node.right);
		}
	}
}

function inorder(node) {
	if (node.data) {
		if (node.left) {
			inorder(node.left);
		}
		node.show();
		if (node.right) {
			inorder(node.right)
		}
	}
}

function postorder(node) {
	if (node.data) {
		if (node.left) {
			postorder(node.left);
		}
		if (node.right) {
			postorder(node.right)
		}
		node.show();
	}
}

function reverseorder(node) {
	if (node.data) {
		if (node.right) {
			reverseorder(node.right);
		}
		node.show();
		if (node.left) {
			reverseorder(node.left)
		}
	}
}

var flag = 2;

if (flag === 1) {

	var Root = new BTree('root');
	var A = Root.insertLeft("A");
	var C = A.insertLeft("C");
	var D = C.insertRight("D");
	var F = D.insertLeft("F");
	var G = D.insertRight("G");
	var B = Root.insertRight("B");
	var E = B.insertRight("E");

	console.log("-----pre-traversal-----");
	preorder(Root);

	console.log("-----in-traversal-----");
	inorder(Root);

	console.log("-----post-traversal-----");
	postorder(Root);

} else if (flag === 2) {

	var list = [5, 6, 2, 0, 9, 3, 8, 1, 22, 7];

	var tree = new BTree(100);

	tree = CreateBiTree(tree, list);

	inorder(tree);

	console.log('--------------------');

	reverseorder(tree);

}