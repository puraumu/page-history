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
 * Add a new page
 *
 * @param {String} name
 * @return {Pager}
 * @api public
 */

Pager.prototype.push = function(name) {
  this.page.push(name);
  this.len++;
  this.emit('add', name);
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

