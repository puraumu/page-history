var assert = require('assert')
  , should = require('should')
  , Pager = require('../')
  , pager = new Pager()
  , page = ['foo', 'bar', 'baz', 'hoge', 'FOO', 'BAR', 'HOGE']

describe('Pager TypeCheck', function(){

  describe('new', function(){
    it('should ignore none Array', function(){
      pager = new Pager({foo: 'bar'});
      pager.page.should.be.empty;
    })
    it('should read arument', function(){
      pager = new Pager(page);
      pager.page.should.not.be.empty;
    })
  })

  describe('.move()', function(){
    it('', function(){
      pager.move(0)
      pager.move('foo').cwp.should.eql(0)
    })
    it('', function(){
      pager.move(3.14).cwp.should.eql(3)
    })
    it('', function(){
      pager.move(new Date).cwp.should.eql(3)
    })
  })

  describe('.index()', function(){
    // it('', function(){
    // })
  })

  describe('.action()', function(){
    it('', function(){
      pager.action(3)._action.should.be.empty
      pager.action('foo', 'hoge')._callback.should.be.a('function')
    })
  })

  describe('.push()', function(){
    // it('', function(){
    // })
  })

  describe('.remove()', function(){
    it('', function(){
      pager.move(5)
      var len = pager.len;
      pager.remove('foo').cwp.should.eql(5)
      pager.len.should.eql(len)
    })
    it('', function(){
      var len = pager.len;
      pager.remove(3.14).cwp.should.eql(4)
      pager.len.should.eql(len - 1)
    })
    it('', function(){
      var len = pager.len;
      pager.remove(new Date).cwp.should.eql(4)
      pager.len.should.eql(len)
    })
  })

  describe('.add()', function(){
    it('', function(){
      pager.move(5)
      var len = pager.len;
      pager.add('foo', 'foo').cwp.should.eql(5)
      pager.len.should.eql(len)
    })
    it('', function(){
      var len = pager.len;
      pager.add(3.14, new Date).cwp.should.eql(6)
      pager.len.should.eql(len + 1)
    })
    it('', function(){
      var len = pager.len;
      pager.add(new Date, 3.14).cwp.should.eql(6)
      pager.len.should.eql(len)
    })
  })

  describe('.set()', function(){
    it('', function(){
      pager.set('foo', 'foo').stack.should.be.empty
    })
    it('', function(){
      pager.set(new Date, 3.14).stack.should.be.empty
    })
    it('', function(){
      pager.set(3.14, new Date).stack.should.have.length(4)
    })
  })

  describe('.get()', function(){
    // it('', function(){
    // })
  })

})
