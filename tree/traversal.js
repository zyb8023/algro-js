//基础类
function BinarySearchTree() {
  let Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };
  this.roots = null;
  //二叉树插入
  this.insert = function (key) {
    let newNode = new Node(key);
    if (this.roots === null) {
      this.roots = newNode;
    } else {
      insertNode(this.roots, newNode);
    }
  };
  function insertNode(node, newNode) {
    if (newNode.key < node.key) {
      // 如果新节点值小于当前节点值，则插入左子节点
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      // 如果新节点值小于当前节点值，则插入右子节点
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  }

  //中序遍历是一种以从最小到最大的顺序访问所有节点的遍历方式
  this.inOrderTraverse = function (callback) {
    inOrderTraverseNode(this.roots, callback);
  };
  function inOrderTraverseNode(node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
  }
  //先序遍历是以优先于后代节点的顺序访问每一个节点。
  this.preOrderTraverse = function (callback) {
    preOrderTraverseNode(this.roots, callback);
  };
  function preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.key);
      preOrderTraverseNode(node.left, callback);
      preOrderTraverseNode(node.right, callback);
    }
  }
  //后序遍历是先访问节点的后代节点，再访问节点本身
  this.postOrderTraverse = function (callback) {
    postOrderTraverseNode(this.roots, callback);
  };
  function postOrderTraverseNode(node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  //搜索二叉树
  this.search = function (key) {
    searchNode(this.roots, key);
  };
  function searchNode(node, key) {
    if (node === null) {
      return false;
    }
    if (node.key > key) {
      searchNode(node.left, key);
    }
    if (node.key < key) {
      searchNode(node.right, key);
    }
    return true;
  }
  //最小值
  this.min = function () {
    minNode(this.roots);
  };
  function minNode(node) {
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node.key;
  }
  //最大值
  this.max = function () {
    maxNode(this.roots);
  };
  function maxNode(node) {
    while (node !== null && node.right !== null) {
      node = node.right;
    }
    return node.key;
  }
  //移除节点
  this.remove = function (key) {
    this.roots = removeNode(this.roots, key);
  };
  function findMinNode(node, key) {
    while (node !== null && node.left !== null) {
      node = findMinNode(node.left, key);
    }
    return node;
  }

  function removeNode(node, key) {
    //1.要删除节点小于当前节点，往树的左侧查找

    // removeNode node或者node.left/node.right
    // 返回node时赋值的是入参，也就是自己，返回的ode.left/node.right 赋值的就是子集
    if (node.key > key) {
      node.left = removeNode(node.left, key);
      return node;
    }
    //2.要删除节点大于当前节点，往树的右侧查找
    if (node.key < key) {
      node.right = removeNode(node.right, key);
      return node;
    }
    if (node.key === key) {
      //1.当前节点即无左侧节点又无右侧节点，直接删除，返回 null
      if (node.left === null && node.right === null) {
        return null;
      }
      //2.若右侧节点为 null，就证明它有左侧节点，将当前节点的引用改为左侧节点的引用，返回更新之后的值
      if (node.left !== null && node.right === null) {
        return node.left;
      }
      //3.若左侧节点为 null，就证明它有右侧节点，将当前节点的引用改为右侧节点的引用，返回更新之后的值
      if (node.left === null && node.right !== null) {
        return node.right;
      }
      // 左右子树都有值，取左子树最大值或右子树最小值
      node.right = findMinNode(node.right, key);
      return node;
    }
  }
}
let nodeTree = [1, 12, 2, 3, 4, 5, 14, 6, 19];
let BST = new BinarySearchTree();

nodeTree.forEach((v) => {
  BST.insert(v);
});
console.log(BST.remove(4), "----1");
// console.log(BST.max());
// console.log(BST.min());
// console.log(BST.preOrderTraverse((key) => console.log(key)));
// console.log(BST.inOrderTraverse((key) => console.log(key)));
console.log(BST.postOrderTraverse((key) => console.log(key)));
