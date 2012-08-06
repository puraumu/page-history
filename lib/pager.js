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
  this.action = '';
  this.page = [];
  this.stack = [];

  if (isArray(page)) this.page = page;
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
