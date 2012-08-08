var assert = require('assert')
  , should = require('should')
  , history = require('../')
  , foo = history()
  , page = ['foo', 'bar', 'baz', 'hoge', 'FOO', 'BAR', 'HOGE']

describe('Pager', function(){

  describe('new', function(){
    it('should read arument', function(){
      foo = history(page);
      foo.page.should.not.be.empty;
    })
  })

})

