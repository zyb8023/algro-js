import { LinkedList } from "./linkedList";
function testLinkedList() {
  const linkedList = new LinkedList<string>();
  linkedList.push("aaaa");
  linkedList.push("bbb");
  linkedList.insert("ccc", 1);
  console.log(linkedList.getElementAt(0));
}

testLinkedList();
