var EventEmitter = require('events').EventEmitter

/**
 * Expose `startHistory()`.
 */

exports = module.exports = startHistory;

 /**
  * Start tracking history
  *
  * Events:
  *
  *   - move    focus moved to the page
  *   - end     focus hit the end of page
  *   - top     focus hit the top of page
  *   - add     item is added to page
  *   - remove  an item is removed from page
  *   - change  stack item is changed
  *   - error
  *
  * @param {Array} page if page specified use it as all page
  */

function History() {}

function startHistory(page) {
  var history = new History();
  history.cwp = 0;
  history.len = 0;
  history.page = []; // should be [ {String} ]?
  history.stack = [];

  if (isArray(page)) {
    history.page = page;
    history.len = page.length;
  }
  return history;
}

/**
 * Noop
 */

function noop() {}

/**
 * Inherit from `EventEmitter.prototype`.
 */

History.prototype.__proto__ = EventEmitter.prototype;

/**
 * Check a type of object
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isArray(obj) {
  return toString.call(obj) == '[object Array]';
}

function isFunction(obj) {
  return toString.call(obj) == '[object Function]';
}
function isNumber(obj) {
  return toString.call(obj) == '[object Number]';
}

function isString(obj) {
  return toString.call(obj) == '[object String]';
}

/**
 * Move to the page
 *
 *   cwp: change, page: remain
 *
 * @param {Number} index
 * @param {Boolean} relative
 * @return {Pager}
 * @api public
 */

History.prototype.move = function(index, relative) {
  // this._data?
  if (!isNumber(index)) return this;
  index = Math.floor(index);
  var cwp = this.cwp
    , page = this.page
    , last = page.length;

  if (last == 0) return this;
  last -= 1;

  if (!!relative) {
    index = cwp + index;
    if (index == cwp) return this;
    if (index < cwp) { // back
      if (index <= 0) index = 0;
      this.cwp = index;
      this.emit('back', page[index], index);
      return this;
    };
    if (cwp < index) { // next
      if (last <= index) index = last;
      this.cwp = index;
      this.emit('next', page[index], index);
      return this;
    };
  };

  if (index == cwp) return this;
  if (index < cwp) { // back
    if (index <= 0) index = 0;
    this.cwp = index;
    this.emit('back', page[index], index);
    return this;
  };
  if (cwp < index) { // next
    if (last <= index) index = last;
    this.cwp = index;
    this.emit('next', page[index], index);
    return this;
  };
};

/**
 * Go to the next page
 *
 *   cwp: change, page: remain
 *
 * @return {String}
 * @api public
 */

History.prototype.next = function() {
  var i = this.cwp + 1
    , item = this.page[i];
  this.move(1, true)
  return item;
};

/**
 * Go back to the previous page
 *
 *   cwp: change, page: remain
 *
 * @return {String}
 * @api public
 */

History.prototype.back = function() {
  var i = this.cwp - 1
    , item = this.page[i];
  this.move(-1, true);
  return item;
};

/**
 * Returns the current working page
 *
 *   cwp: remain, page: remain
 *
 * @return {String} the page at index
 * @api public
 */

History.prototype.now = function() {
  var i = this.cwp
    , item = this.page[i];
  return item;
};

/**
 * Returns the page of index
 *
 *   cwp: remain, page: remain
 *
 * @param {Object} name
 * @return {Number}
 * @api public
 */

History.prototype.index = function(name) {
  return this.page.indexOf(name)
};

/**
 * Add a new page or new pages
 *
 *   cwp: remain, page: change
 *
 * @param {String|Array} obj
 * @return {Pager}
 * @api public
 */

History.prototype.push = function(obj) {
  var index = this.len;
  this.page.push(obj);
  this.len++;
  this.emit('add', obj, index);
  return this;
};

/**
 * Delete the page
 *
 *   cwp: change, page: change
 *
 * @param {Number} target
 * @return {Pager}
 * @api public
 */

History.prototype.remove = function(target) {
  if (!isNumber(target)) return this;
  var index = this.cwp
    , len = this.len;
  target = Math.floor(target);
  if (target < 0 || len <= target) return this;
  var removed = this.page.splice(target, 1)[0];
  if ( 0 < len) this.len--;
  this.emit('remove', removed, target);
  if (target <= index) this.move(-1, true);
  return this;
};

/**
 * Add the page
 *
 *   cwp: change, page: change
 *
 * @param {Number} target
 * @param {String} item
 * @return {Pager}
 * @api public
 */

History.prototype.add = function(target, item) {
  if (!isNumber(target)) return this;
  var index = this.cwp
    , len = this.len;
  target = Math.floor(target);
  if (target <= 0) target = 0;
  if (len <= target) target = len;
  Array.prototype.splice.apply(this.page, [target, 0].concat(item));
  this.len++;
  this.emit('add', item, target);
  if (target <= index) this.move(1, true);
  return this;
};

/**
 * Set a data to the page
 *
 * @param {Number} n
 * @param {Object} data // or anythings
 * @return {Pager}
 * @api public
 */

History.prototype.set = function(n, data) {
  if (!isNumber(n)) return this;
  n = Math.floor(n);
  this.stack[n] = data;
  this.emit('change', data, n);
  return this;
};

/**
 * Get a data at the page
 *
 * @param {Number} n
 * @return {Object}
 * @api public
 */

History.prototype.get = function(n) {
  return this.stack[n]
};

/**
 * Search through the stack
 *
 * @param {String|Object} data // or anythings
 * @return {Array} matched page index
 * @api public
 */

History.prototype.search = function(data) {
  var _ref = []
    , stack = this.stack;
  if (isString(data)) {
    for (var i = 0, len = stack.length; i < len; i++) {
      var item = stack[i];
      if (item === undefined || !isString(item)) continue;
      var re = new RegExp(data);
      if (item.search(re) != -1) _ref.push(i);
    };
  };
  for (var i = 0, len = stack.length; i < len; i++) {
    var item = stack[i];
    if (item === undefined) continue;
    if (item == data) _ref.push(i);
  };
  return _ref;
};

/**
 * Collect all items in the stack
 *
 * @return {Array} [page index, data]
 * @api public
 */

History.prototype.export = function() {
  var _ref = []
    , stack = this.stack
  for (var i = 0, len = stack.length; i < len; i++) {
    var item = stack[i];
    if (!item) continue;
    _ref.push([i, item]);
  };
  return _ref;
};

