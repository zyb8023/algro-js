/**
 * 使用数组实现后进先出
 */

interface ArrayStack<T> {
  push(element: T): void; // 添加一个新元素到栈顶
  pop(): T | null; // 移除栈顶的元素, 同时返回被移除的元素
  peek(): T | null; // 返回栈顶的元素, 不对栈做任何修改
  isEmpty(): boolean; // 判断栈是否为空
  clear(): void; // 移除栈里的所有元素
  size(): number; // 返回栈里的元素个数
  toString(): string; // 返回栈里的元素个数
}

export class Stack<T> implements ArrayStack<T> {
  private readonly items: Array<T>;

  constructor() {
    this.items = [];
  }
  // 入栈
  public push(element: T): void {
    this.items.push(element);
  }
  // 出栈
  public pop(): T | null {
    if (!this.isEmpty()) {
      return this.items.pop()!;
    } else {
      throw new Error("stock is empty!");
    }
  }
  public peek(): T | null {
    if (this.isEmpty()) return null;
    else return this.items[this.size() - 1];
  }
  public isEmpty(): boolean {
    return !this.size();
  }
  public clear(): void {
    while (!this.isEmpty()) {
      this.items.pop();
    }
  }
  public size(): number {
    return this.items.length;
  }
  public toString(): string {
    if (this.isEmpty()) return "";
    else return this.items.toString();
  }
}
