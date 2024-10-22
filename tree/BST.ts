// 二分搜索树

// 性质
// 若任意节点的左子树不空, 则左子树上所有节点的值均小于它的根节点的值;
// 若任意节点的右子树不空, 则右子树上所有节点的值均大于它的根节点的值;
// 任意节点的左、右子树也分别为二叉查找树;
// BST 的中序遍历结果是有序的(升序).

export type TreeNode<T> = Node<T> | null;
// 左右子树比较
export enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0,
}

export type CompareFunction<T> = (a: T, b: T) => number;

export interface BST<T> {
  insert(key: T): void; // 向树中插入一个新的键
  search(key: T): boolean; // 在树中查找一个键. 如果节点存在, 则返回 true;如果不存在, 则返回 false
  remove(key: T): void; // 从树中移除某个键
  inOrderTraverse(callback: Function): void; // 中序遍历
  preOrderTraverse(callback: Function): void; // 先序遍历
  postOrderTraverse(callback: Function): void; // 后序遍历
  levelOrderTraverse(callback: Function): void; // 层序遍历
  depth(): number; // 返回树的深度
  min(): Node<T> | null; // 返回树中最小的值/键
  max(): Node<T> | null; // 返回树中最大的值/键
  getRoot(): Node<T> | null; // 返回树的根节点
  isEmpty(): boolean; // 判断树是否为空
  size(): number; // 获取树的长度
  clear(): any; // 清空树
}

export class Node<T> {
  public left: Node<T> | null;
  public right: Node<T> | null;
  constructor(public key: T) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

// 比较
export function defaultCompare<T>(a: T, b: T): number {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

// 平衡二叉树
class BinarySearchTree<T> implements BST<T> {
  private root: TreeNode<T>;
  private count: number;

  constructor(protected compareFn: CompareFunction<T> = defaultCompare) {
    // 根节点
    this.root = null;
    // 层级
    this.count = 0;
  }

  private insertNode(rootNode: Node<T>, key: T) {
    // 从根节点遍历找到要插入的节点
    // 指针默认为根节点
    let current = rootNode;
    const node = new Node<T>(key);
    // 小于当前节点， 放左子树
    if (this.compareFn(key, current.key) === Compare.LESS_THAN) {
      // 左子树被占用，递归
      if (current.left) {
        current = current.left;
        this.insertNode(current, key);
      } else {
        // 左子树未占用，插入到左子树中
        current.left = node;
      }
    } else {
      // 大于当前节点，放右子树, 逻辑和左子树一样
      if (current.right) {
        current = current.right;
        this.insertNode(current, key);
      } else {
        current.right = node;
      }
    }
  }

  private searchNode(rootNode: TreeNode<T>, key: T): boolean {
    // 一直没找到就是false
    if (!rootNode) return false;
    // key < rootNode.key
    if (this.compareFn(key, rootNode.key) === Compare.LESS_THAN) {
      return this.searchNode(rootNode.left, key);
    }

    if (this.compareFn(key, rootNode.key) === Compare.BIGGER_THAN) {
      return this.searchNode(rootNode.right, key);
    }
    // 找到了就是true
    return true;
  }

  private removeNode(node: TreeNode<T>, key: T) {
    // node就是要删除的目标node, 通过key查询到目标node进行删除

    if (!node) return null;
    // key < mode.key
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 往左侧查找
      node.left = this.removeNode(node.left, key);
      return node;
    }
    if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      // 往右侧查找
      node.right = this.removeNode(node.right, key);
      return node;
    }
    // 找打目标node
    // 1.目标节点没有子树，直接删除
    if (node.left == null && node.right == null) {
      node = null;
      return node;
    }
    //2.若右侧节点为 null，就证明它有左侧节点，将当前节点的引用改为左侧节点的引用，返回更新之后的值
    if (node.left !== null) {
      return node.left;
    }
    //3.若右侧节点为 null，就证明它有左侧节点，将当前节点的引用改为左侧节点的引用，返回更新之后的值
    if (node.right !== null) {
      return node.right;
    }
    return null;
  }

  public insert(key: T): void {
    // 空树
    if (!this.root) {
      this.root = new Node<T>(key);
    } else {
      this.insertNode(this.root, key);
    }
    // 层级加一
    this.count++;
  }

  public search(key: T): boolean {
    return this.searchNode(this.root, key);
  }

  remove(key: T): void {}
}
