export interface ILinkedList<T> {
  push(element: T): void; // 向链表尾部添加一个新元素
  removeAt(index: number): any; // 删除指定位置的元素
  remove(element: T): any; // 从链表移除一个元素
  insert(element: T, index: number): boolean; // 向链表指定位置插入元素
  getElementAt(index: number): Node<T> | null; // 返回链表指定位置的元素, 若找不到返回 null
  indexOf(element: T): number; // 返回链表指定元素的索引, 没有则返回 -1
  isEmpty(): boolean; // 判断链表是否为空
  size(): number; // 获取链表的长度
  getHead(): Node<T> | null; // 获取 head
  clear(): void; // 清空链表
  toString(): string; // 返回链表的字符串形式
}

// 节点类
// 一个链表节点包括当前元素和下一个元素的指针
export class Node<T> {
  constructor(public element: T, public next?: Node<T> | null) {
    this.element = element;
    this.next = null;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  protected count: number;
  // 头指针
  protected head: Node<T> | null;

  constructor() {
    this.count = 0;
    this.head = null;
  }

  public push(element: T): void {
    const node = new Node<T>(element);
    let current: Node<T> | null = null;
    if (this.isEmpty()) {
      this.head = node;
    } else {
      // 遍历到最后一个
      current = this.head!;
      while (current.next) {
        current = current?.next;
      }
      // 元素插入到最后
      current.next = node;
    }
    this.count++;
  }

  public removeAt(index: number) {
    if (index < 0 || index > this.size() - 1) return null;
    let current = this.head;
    // 删除第一个元素
    if (index === 0) {
      // 指针指向第二个元素，第一个元素会被GC
      this.head = current?.next!;
    } else {
      // 获取到目标前一个node，修改前一个node的指针，直接指向下一个node，当前节点被GC
      const pervious = this.getElementAt(index - 1);
      current = pervious?.next!;
      (pervious as Node<T>).next = current.next;
    }

    this.count--;
  }

  public remove(element: T) {
    const index = this.indexOf(element);
    this.removeAt(index);
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public size(): number {
    return this.count;
  }

  public getElementAt(index: number): Node<T> | null {
    // 索引越界
    if (index < 0 || index > this.size() - 1) return null;
    let current = this.head!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    return current;
  }

  public indexOf(element: T): number {
    let current = this.head;
    for (let i = 0; i < this.size(); i++) {
      if (current!.element === element) {
        return i;
      }
      current = current?.next!;
    }
    return -1;
  }

  public insert(element: T, index: number): boolean {
    // 索引越界
    if (index < 0 || index > this.size() - 1) return false;
    const node = new Node<T>(element);
    // 头插入
    if (index === 0) {
      let current = this.head;
      node.next = current;
      this.head = node;
    } else {
      // 找到原本上一个元素，previous ----> node ----> previous.next
      let previous = this.getElementAt(index - 1);
      node.next = previous!.next;
      previous!.next = node;
    }
    this.count++;
    return true;
  }

  public getHead(): Node<T> | null {
    return this.head;
  }

  public clear(): void {
    this.head = null;
    this.count = 0;
  }

  public toString() {
    if (this.head === null) {
      return "";
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current !== null; i++) {
      objString = `${objString},${(current as Node<T>).element}`;
      current = (current as Node<T>).next;
    }
    return objString;
  }
}
