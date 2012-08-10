var assert = require('assert')
  , should = require('should')
  , history = require('../')
  , pager = history
  , page = ['foo', 'bar', 'baz', 'hoge', 'FOO', 'BAR', 'HOGE']

describe('Pager Events', function(){

  describe('new', function(){
    it('should read arument', function(){
      pager = history(page)
      pager.page.should.not.be.empty
    })
  })

  describe('`next`', function(){
    it('should return current page #1', function(done){
      pager.once('next', function(d, i){
        d.should.eql('FOO')
        i.should.eql(4)
        done()
      })
      pager.move(4)
    })
    it('should emit `next` event when page sieze over', function(done){
      pager.once('next', function(d, i){
        d.should.eql('HOGE')
        i.should.eql(6)
        done()
      })
      pager.move(456632)
    })
    it('should return current page #3', function(done){
      pager.move(0)
      pager.once('next', function(d, i){
        d.should.eql('bar')
        i.should.eql(1)
        done()
      })
      pager.next()
    })
  })

  describe('`back`', function(){
    it('return current page #1', function(done){
      pager.once('back', function(d, i){
        d.should.eql('foo')
        i.should.eql(0)
        done()
      })
      pager.move(-54)
    })
    it('should return the top of page #2', function(done){
      pager.move(3)
      pager.once('back', function(d, i){
        d.should.eql('bar')
        i.should.eql(1)
        done()
      })
      pager.move(1)
    })
    it('should return the top of page #3', function(done){
      pager.once('back', function(d, i){
        d.should.eql('foo')
        i.should.eql(0)
        done()
      })
      pager.back()
    })
  })

  describe('`add`', function(){
    it('should return an added item #1', function(done){
      pager.once('add', function(d, i){
        d.should.eql('http:')
        i.should.eql(7)
        pager.page[7].should.eql('http:')
        pager.len.should.eql(8)
        done()
      })
      pager.push('http:')
    })
    it('should return multiple items', function(done){
      pager.once('add', function(d, i){
        d.should.eql(['ssh:', 'git:'])
        i.should.eql(8)
        pager.page[8].should.eql(['ssh:', 'git:'])
        pager.len.should.eql(9)
        done()
      })
      pager.push(['ssh:', 'git:'])
    })
    it('should return an added item #2', function(done){
      pager.once('add', function(d, i){
        d.should.eql('ftp:')
        i.should.eql(0)
        pager.page[0].should.eql('ftp:')
        pager.len.should.eql(10)
        done()
      })
      pager.add(0, 'ftp:')
    })
    it('should emit event even if add to out of range #1', function(done){
      pager.once('add', function(d, i){
        d.should.eql('sftp:')
        i.should.eql(0)
        done()
      })
      pager.add(-1, 'sftp:')
    })
    it('should emit event even if add to out of range #2', function(done){
      pager.once('add', function(d, i){
        d.should.eql('pop3')
        i.should.eql(11)
        pager.page[11].should.eql('pop3')
        done()
      })
      pager.add(9204, 'pop3')
    })
  })

  describe('`remove`', function(){
    it('should return a removed item #1', function(done){
      pager.once('remove', function(d, i){
        d.should.eql('sftp:')
        i.should.eql(0)
        done()
      })
      pager.remove(0)
    })
    it('should not emit event if attempt to remove from out of range #1', function(done){
      pager.once('remove', function(d, i){
        console.log('no message');
        d.should.eql('sftp:')
        i.should.eql(0)
      })
      pager.remove(-1)
      setTimeout(function(){
        pager.removeAllListeners('remove')
        done()
      }, 50)
    })
    it('should not emit event if attempt to remove from out of range #2', function(done){
      pager.once('remove', function(d, i){
        console.log('no message');
        d.should.eql('sftp:')
        true.should.be.false
      })
      pager.remove(93853)
      setTimeout(function(){
        pager.removeAllListeners('remove')
        done()
      }, 50)
    })
  })

  describe('`change`', function(){
    it('should return arguments at any time #1 succeed', function(done){
      pager.once('change', function(d, i){
        d.should.eql('foo')
        i.should.eql(2)
        done()
      })
      pager.set(2, 'foo')
    })
    it('should return arguments at any time #2 out of range', function(done){
      pager.once('change', function(d, i){
        d.should.eql('bar')
        i.should.eql(-1)
        done()
      })
      pager.set(-1, 'bar')
    })
    it('should return arguments at any time #3 out of range', function(done){
      pager.once('change', function(d, i){
        d.should.eql('hoge')
        i.should.eql(3958)
        done()
      })
      pager.set(3958, 'hoge')
    })
  })

})
