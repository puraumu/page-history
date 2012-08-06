var EventEmitter = require('events').EventEmitter

/**
 * Expose `Pager`.
 */

module.exports = Pager;

/**
 * Initialize `Pager`
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
}

/**
 * Inherit from `EventEmitter.prototype`.
 */

Pager.prototype.__proto__ = EventEmitter.prototype;

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
 * @return {Pager}
 * @api public
 */

Pager.prototype.move = function(n) {
  this.cwp = n;
  return this;
};

/**
 * Go to the next page
 *
 * @return {String}
 * @api public
 */

Pager.prototype.next = function() {
  var i = this.cwp;
  this.cwp = ++i;
  return this.page[i]
};

/**
 * Go back to the previous page
 *
 * @return {String}
 * @api public
 */

Pager.prototype.back = function() {
  var i = this.cwp;
  this.cwp = --i;
  return this.page[i]
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
  return this;
};

/**
 * Register the next action
 *
 * @param {String} action
 * @return {Pager}
 * @api public
 */

Pager.prototype.action = function(action) {
  this._action = action;
  return this;
};

/**
 * Returns the current working page
 *
 * @return {Pager}
 * @api public
 */

Pager.prototype.now = function() {
  return this.cwp;
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


