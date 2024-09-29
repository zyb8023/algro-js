import { Stack } from "./stock";

function testStack() {
  const iceStack = new Stack<string>();
  // 入栈过程
  iceStack.push("东北大板");
  iceStack.push("可爱多");
  iceStack.push("巧乐兹");
  iceStack.push("冰工厂");
  iceStack.push("光明奶砖");
  console.log(iceStack.size(), iceStack.pop());
}

testStack();
