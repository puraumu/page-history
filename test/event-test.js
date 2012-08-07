var assert = require('assert')
  , should = require('should')
  , Pager = require('../')
  , pager = new Pager()
  , page = ['foo', 'bar', 'baz', 'hoge', 'FOO', 'BAR', 'HOGE']

describe('Pager Events', function(){

  describe('new', function(){
    it('should read arument', function(){
      pager = new Pager(page)
      pager.page.should.not.be.empty
    })
  })

  describe('move', function(){
    it('should return current page, 1', function(done){
      pager.once('move', function(d, i){
        d.should.eql('FOO')
        i.should.eql(4)
        done()
      })
      pager.move(4)
    })
    it('should not emit `move` event when page sieze over', function(done){
      pager.on('move', function(d, i){
        d.should.eql('HOGE')
        i.should.eql(6)
      })
      pager.move(456632)
      pager.removeAllListeners('move')
      done()
    })
    it('should return current page, 2', function(done){
      pager.move(4)
      pager.once('move', function(d, i){
        d.should.eql('hoge')
        i.should.eql(3)
        done()
      })
      pager.back()
    })
    it('should return current page, 3', function(done){
      pager.once('move', function(d, i){
        d.should.eql('FOO')
        i.should.eql(4)
        done()
      })
      pager.next()
    })
  })

  describe('end', function(){
    it('should return the end of page, 1', function(done){
      pager.once('end', function(d, i){
        d.should.eql('HOGE')
        i.should.eql(6)
        done()
      })
      pager.move(456632)
    })
    it('should return the end of page, 2', function(done){
      pager.once('end', function(d, i){
        d.should.eql('HOGE')
        i.should.eql(6)
        done()
      })
      pager.move(pager.len - 1)
    })
    it('should return the end of page, 3', function(done){
      pager.once('end', function(d, i){
        d.should.eql('HOGE')
        i.should.eql(6)
        done()
      })
      pager.next()
    })
  })

  describe('top', function(){
    it('should return the top of page, 1', function(done){
      pager.once('top', function(d, i){
        d.should.eql('foo')
        i.should.eql(0)
        done()
      })
      pager.move(-54)
    })
    it('should return the top of page, 2', function(done){
      pager.once('top', function(d, i){
        d.should.eql('foo')
        i.should.eql(0)
        done()
      })
      pager.move(0)
    })
    it('should return the top of page, 3', function(done){
      pager.once('top', function(d, i){
        d.should.eql('foo')
        i.should.eql(0)
        done()
      })
      pager.back()
    })
  })

  describe('add', function(){
    it('should return added item', function(done){
      pager.on('add', function(item){
        item.should.eql('foo')
        done()
      })
      pager.push('foo')
    })
    // it('should', function(done){
    // })
  })

  describe('remove', function(){
    // it('should', function(done){
    // })
  })

  describe('change', function(){
    // it('should', function(done){
    // })
  })

})