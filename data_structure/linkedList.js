/**
 * Node.js源码中的链表
 */
'use strict';

function init(list) {
  list._idleNext = list;
  list._idlePrev = list;
}
exports.init = init;

// create a new linked list
function create() {
  const list = { _idleNext: null, _idlePrev: null };
  init(list);
  return list;
}
exports.create = create;

// show the most idle item
function peek(list) {
  if (list._idlePrev == list) return null;
  return list._idlePrev;
}
exports.peek = peek;


// remove the most idle item from the list
function shift(list) {
  const first = list._idlePrev;
  remove(first);
  return first;
}
exports.shift = shift;


// remove a item from its list
function remove(item) {
  if (item._idleNext) {
    item._idleNext._idlePrev = item._idlePrev;
  }

  if (item._idlePrev) {
    item._idlePrev._idleNext = item._idleNext;
  }

  item._idleNext = null;
  item._idlePrev = null;
}
exports.remove = remove;


// remove a item from its list and place at the end.
function append(list, item) {
  if (item._idleNext || item._idlePrev) {
    remove(item);
  }

  // items are linked  with _idleNext -> (older) and _idlePrev -> (newer)
  // TODO: swap the linkage to match the intuitive older items at "prev"
  item._idleNext = list._idleNext;
  item._idlePrev = list;

  // the list _idleNext points to tail (newest) and _idlePrev to head (oldest)
  list._idleNext._idlePrev = item;
  list._idleNext = item;
}
exports.append = append;


function isEmpty(list) {
  return list._idleNext === list;
}
exports.isEmpty = isEmpty;
