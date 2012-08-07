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
 *   - add item added
 *   - remove an item removed
 *   - error
 *
 * @param {Array} page if page specified use it as all page
 */

function Pager(page) {
  this.cwp = 0;
  this.len = 0;
  this._action = '';
  this.page = []; // should be {String}
  this.stack = [];

  if (isArray(page)) {
    this.page = page;
    this.len = page.length;
  }

  this.on('add', function(){
    callback(this);
  })
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

function isString(obj) {
  return toString.call(obj) == '[object String]';
}

/**
 * Move to the page
 *
 * @param {Number} n
 * @param {Boolean} relative
 * @return {Pager}
 * @api public
 */

Pager.prototype.move = function(i, relative) {
  var n = this.cwp
    , last = this.len - 1;
  if (relative) {
    n = n + i;
    if (n < 0) n = 0;
    if (last < n) n = last;
    this.cwp = n;
    return this;
  };
  if (i < 0) i = 0;
  if (last < i) i = last;
  this.cwp = i;
  return this;
};

/**
 * Go to the next page
 *
 * @return {String}
 * @api public
 */

Pager.prototype.next = function() {
  var i = this.cwp + 1
    , last = this.len - 1;
  if (last < i) {
    this.cwp = last;
    return undefined;
  };
  this.cwp = i;
  return this.page[i]
};

/**
 * Go back to the previous page
 *
 * @return {String}
 * @api public
 */

Pager.prototype.back = function() {
  var i = this.cwp - 1;
  if (i < 0) {
    this.cwp = 0;
    return undefined;
  };
  this.cwp = i;
  return this.page[i]
};

/**
 * Returns the current working page
 *
 * @return {String} the page at index
 * @api public
 */

Pager.prototype.now = function() {
  var i = this.cwp;
  return this.page[i];
};

/**
 * Register the next action
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
  this._action = action;
  this._callback = fn || noop;
  return this;
};

/**
 * Add a new page or new pages
 *
 * @param {String|Array} obj
 * @return {Pager}
 * @api public
 */

Pager.prototype.push = function(obj) {
  if (isArray(obj)) {
    var page = this.page
      , len = obj.length;
    for (var i = 0; i < len; i++) {
      var item = obj[i];
      page.push(item);
    };
    this.len = this.len + len;
    this.emit('add', obj);
    return this;
  };
  this.page.push(obj);
  this.len++;
  this.emit('add', obj);
  return this;
};

/**
 * Delete the page
 *
 * @param {Number} n
 * @return {Pager}
 * @api public
 */

Pager.prototype.remove = function(n) {
  this.page.splice(n, 1);
  this.len--;
  return this;
};

/**
 * Add the page
 *
 * @param {Number} n
 * @param {String} name
 * @return {Pager}
 * @api public
 */

Pager.prototype.add = function(n, name) {
  this.page.splice(n, 0, name);
  this.len++;
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
  this.stack[n] = data;
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

