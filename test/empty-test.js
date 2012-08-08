var assert = require('assert')
  , should = require('should')
  , history = require('../')
  , pager = history()
  , page = ['foo', 'bar', 'baz', 'hoge', 'FOO', 'BAR', 'HOGE']

describe('When Pager is empty', function(){

  describe('new', function(){
    it('should be initialized', function(){
      pager = history();
      pager.page.should.be.empty;
    })
  })

  describe('.move()', function(){
    it('should not move and no event', function(done){
      pager.once('top', function(d, i){
        should.strictEqual(d, undefined)
        i.should.eql(0)
        true.should.be.false
      })
      setTimeout(function(){
        done()
      }, 20)
      pager.move(0)
      pager.cwp.should.eql(0)
    })
    it('should not move and no event', function(done){
      pager.once('end', function(d, i){
        true.should.be.false
      })
      setTimeout(function(){
        done()
      }, 20)
      pager.move(1)
      pager.cwp.should.eql(0)
    })
  })

  describe('.next()', function(){
    it('should not move and no event', function(done){
      pager.once('move', function(d, i){
        true.should.be.false
      })
      setTimeout(function(){
        done()
      }, 20)
      pager.next()
      pager.cwp.should.eql(0)
    })
  })

  describe('.back() to the previous item.', function(){
    it('should not move and no event', function(done){
      pager.once('move', function(d, i){
        true.should.be.false
      })
      setTimeout(function(){
        done()
      }, 20)
      pager.back()
      pager.cwp.should.eql(0)
    })
  })

  describe('.now()', function(){
    it('should return undefined', function(){
      should.strictEqual(pager.now(), undefined)
    })
  })

  describe('.index()', function(){
    it('should return -1', function(){
      pager.index(0).should.eql(-1)
    })
  })

  describe('.push()', function(){
  })

  describe('.remove()', function(){
    it('should do nothing or return self', function(){
      pager.remove(0).should.eql(pager)
      pager.cwp.should.eql(0)
      pager.len.should.eql(0)
      pager.page.should.be.empty
    })
  })

  describe('.add()', function(){
  })

  describe('.set()', function(){
  })

  describe('.get()', function(){
  })

  describe('.search()', function(){
    it('should return []', function(){
      pager.search(0).should.eql([])
    })
  })

  describe('.export()', function(){
    it('should return []', function(){
      pager.export().should.eql([])
    })
  })

})

