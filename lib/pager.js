var EventEmitter = require('events').EventEmitter

/**
 * Expose `Pager`.
 */

module.exports = Pager;

/**
 * Noop
 */

function noop() {}

/**
 * Initialize `Pager`
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

function Pager(page) {
  this.cwp = 0;
  this.len = 0;
  this._action = '';
  this.page = []; // should be [ {String} ]?
  this.stack = [];

  if (isArray(page)) {
    this.page = page;
    this.len = page.length;
  }

  // this.on('add', function(){
    // callback(this);
  // })
}

/**
 * Inherit from `EventEmitter.prototype`.
 */

Pager.prototype.__proto__ = EventEmitter.prototype;

/**
 * Invoke callback function by events
 *
 * @param {Pager} obj
 * @api private
 */

function callback(obj) {
  var fn = obj._callback
    , action = obj._action;
  if (fn != noop && action !== '') {
    var s = obj[action]();
    if (2 == fn.length) {return fn(s, obj.cwp)};
    fn(s);
    console.log(s);
  };
}

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
 * @param {Number} i
 * @param {Boolean} relative
 * @return {Pager}
 * @api public
 */

Pager.prototype.move = function(index, relative) {
  // this._data?
  if (!isNumber(index)) return this;
  index = Math.floor(index);
  var cwp = this.cwp
    , page = this.page
    , last = page.length;

  if (last == 0) return this;
  last -= 1;

  if (!!relative) {
    cwp = cwp + index;
    if (cwp <= 0) { // top
      this.cwp = 0;
      this.emit('top', page[0], 0);
      return this;
    };
    if (last <= cwp) { // end
      this.cwp = last;
      this.emit('end', page[last], last);
      return this;
    }
    // console.log('end,rel');
    this.cwp = cwp; // move
    this.emit('move', page[cwp], cwp);
    return this;
  };

  if (index <= 0) { // top
    this.cwp = 0;
    this.emit('top', page[0], 0);
    return this;
  }
  if (last <= index) { // end
    // console.log('end abs');
    this.cwp = last;
    this.emit('end', page[last], last);
    return this;
  };
  this.cwp = index; // move
  this.emit('move', page[index], index);
  return this;
};

/**
 * Go to the next page
 *
 *   cwp: change, page: remain
 *
 * @return {String}
 * @api public
 */

Pager.prototype.next = function() {
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

Pager.prototype.back = function() {
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

Pager.prototype.now = function() {
  var i = this.cwp;
  return this.page[i];
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

Pager.prototype.index = function(name) {
  return this.page.indexOf(name)
};

/**
 * Register an action
 *
 *   cwp: remain, page: remain
 *
 * action:
 *
 *   - next
 *
 * @param {String} action
 * @param {Function} fn
 * @return {Pager}
 * @api public
 */

Pager.prototype.action = function(action, fn) {
  if (!isString(action)) return this;
  this._action = action;
  this._callback = isFunction(fn) ? fn : noop;
  return this;
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

Pager.prototype.push = function(obj) {
  var index = this.len;
  if (isArray(obj)) {
    var page = this.page
      , len = obj.length;
    for (var i = 0; i < len; i++) {
      var item = obj[i];
      page.push(item); // automatically apply to `Pager`?
    };
    this.len = this.len + len;
    this.emit('add', obj, index);
    return this;
  };
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

Pager.prototype.remove = function(target) {
  if (!isNumber(target)) return this;
  target = Math.floor(target);
  var i = this.cwp
    , len = this.len;
  if (target < 0 || len <= target) return this;
  var removed = this.page.splice(target, 1)[0];
  if ( 0 < len) this.len--;
  this.emit('remove', removed, target);
  if (target <= i) this.move(-1, true);
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

Pager.prototype.add = function(target, item) {
  if (!isNumber(target)) return this;
  target = Math.floor(target);
  var i = this.cwp
    , len = this.len;
  if (target <= 0) target = 0;
  if (len <= target) target = len;
  Array.prototype.splice.apply(this.page, [target, 0].concat(item));
  this.len++;
  this.emit('add', item, target);
  if (target <= i) this.move(1, true);
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

Pager.prototype.set = function(n, data) {
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

Pager.prototype.get = function(n) {
  return this.stack[n]
};

/**
 * Search through the stack
 *
 * @param {String|Object} data // or anythings
 * @return {Array} matched page index
 * @api public
 */

Pager.prototype.search = function(data) {
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

Pager.prototype.export = function() {
  var _ref = []
    , stack = this.stack
  for (var i = 0, len = stack.length; i < len; i++) {
    var item = stack[i];
    if (!item) continue;
    _ref.push([i, item]);
  };
  return _ref;
};

