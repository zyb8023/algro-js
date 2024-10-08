/*
 * @Author: zhaoyb
 * @Date: 2024-09-30 13:34:47
 * @LastEditors: zhaoyb
 * @LastEditTime: 2024-09-30 14:05:26
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name}, All Rights Reserved.
 */
export interface IQueue<T> {
  enqueue(element: T): void; // 向队尾插入一个或多个元素
  dequeue(): T | null; // 移除队头元素并返回该元素
  peek(): T | null; // 返回队头元素, 有时该方法也叫做 front 方法
  isEmpty(): boolean; // 判断队列是否为空
  size(): number; // 返回队列的个数
  clear(): void; // 清空队列
  toString(): string;
}

export class Queue<T> implements IQueue<T> {
  private readonly items: Array<T>;
  // 入队
  enqueue(element: T): void {
    this.items.push(element);
  }
  // 出队
  dequeue(): T | null {
    if (this.isEmpty()) return null;
    else return this.items.shift()!;
  }
  // 取出队头元素
  peek(): T | null {
    if (this.isEmpty()) return null;
    else return this.items[0];
  }
  isEmpty(): boolean {
    return !this.size();
  }
  size(): number {
    return this.items.length;
  }
  clear(): void {
    while (!this.isEmpty()) {
      this.dequeue();
    }
  }
  toString(): string {
    if (this.isEmpty()) return "";
    else return this.items.toString();
  }
}
