function DoublyLinkedList() {
    var Node = function(element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    };
    var length = 0;
    var head = null;
    var tail = null;

    //尾部添加
    this.append = function(element) {
        var node = new Node(element),
            current;
        if (head === null) { //first node on list
            head = node;
            tail = node;
        } else { //attach to the tail node
            tail.next = node;
            node.prev = tail;
            tail = node;
        }
        length++;
    };

    //任意位置插入
    this.insert = function(position, element) {
        //检查边界值
        if (position >= 0 && position <= length) {
            var node = new Node(element),
                current = head,
                previous,
                index = 0;
            if (position === 0) { //add on first position
                if (!head) {
                    head = node;
                    tail = node;
                } else {
                    node.next = current;
                    current.prev = node;
                    head = node;
                }
            } else if (position === length) { //last item
                current = tail;
                current.next = node;
                node.prev = current;
                tail = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            length++;
            return true;
        } else {
            return false;
        }
    };

    //任意位置移除
    this.removeAt = function(position) {
        //检查边界值
        if (position > -1 && position < length) {
            var current = head,
                previous,
                index = 0;
            if (position === 0) { //removing first item
                head = current.next;
                //if there is only one item, then we update tail as well
                if (length === 1) {
                    tail = null;
                } else {
                    head.prev = null;
                }
            } else if (position === length - 1) { //last item
                current = tail;
                tail = current.prev;
                tail.next = null;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                //link previous with current's next - skip it to remove
                previous.next = current.next;
                current.next.prev = previous;
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    };

    this.remove = function(element) {
        var index = this.indexOf(element);
        return this.removeAt(index);
    };

    this.indexOf = function(element) {
        var current = head,
            index = -1;
        //check first item
        if (element == current.element) {
            return 0;
        }
        index++;
        //check in the middle of the list
        while (current.next) {
            if (element == current.element) {
                return index;
            }
            current = current.next;
            index++;
        }
        //check last item
        if (element == current.element) {
            return index;
        }
        return -1;
    };

    this.isEmpty = function() {
        return length === 0;
    };

    this.size = function() {
        return length;
    };

    this.toString = function() {
        var current = head,
            s = current ? current.element : '';
        while (current && current.next) {
            current = current.next;
            s += ', ' + current.element;
        }
        return s;
    };

    this.inverseToString = function() {
        var current = tail,
            s = current ? current.element : '';
        while (current && current.prev) {
            current = current.prev;
            s += ', ' + current.element;
        }
        return s;
    };

    this.print = function() {
        console.log(this.toString());
    };

    this.printInverse = function() {
        console.log(this.inverseToString());
    };

    this.getHead = function() {
        return head;
    };

    this.getTail = function() {
        return tail;
    }
}
var list = new DoublyLinkedList();
list.append(15);
list.print();
list.printInverse();
list.append(16);
list.print();
list.printInverse();
list.append(17);
list.print();
list.printInverse();
list.insert(0, 13);
list.print();
list.printInverse();
list.insert(4, 18);
list.print();
list.printInverse();
list.insert(1, 14);
list.print();
list.printInverse();
list.removeAt(0);
list.print();
list.printInverse();
list.removeAt(list.size() - 1);
list.print();
list.printInverse();
list.removeAt(1);
list.print();
list.printInverse();
list.remove(16);
list.print();
list.printInverse();
list.remove(14);
list.print();
list.printInverse();
list.remove(17);
list.print();
list.printInverse();