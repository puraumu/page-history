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
    it('should return current page #1', function(done){
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
    it('should return current page #2', function(done){
      pager.move(4)
      pager.once('move', function(d, i){
        d.should.eql('hoge')
        i.should.eql(3)
        done()
      })
      pager.back()
    })
    it('should return current page #3', function(done){
      pager.once('move', function(d, i){
        d.should.eql('FOO')
        i.should.eql(4)
        done()
      })
      pager.next()
    })
  })

  describe('end', function(){
    it('should return the end of page #1', function(done){
      pager.once('end', function(d, i){
        d.should.eql('HOGE')
        i.should.eql(6)
        done()
      })
      pager.move(456632)
    })
    it('should return the end of page #2', function(done){
      pager.once('end', function(d, i){
        d.should.eql('HOGE')
        i.should.eql(6)
        done()
      })
      pager.move(pager.len - 1)
    })
    it('should return the end of page #3', function(done){
      pager.once('end', function(d, i){
        d.should.eql('HOGE')
        i.should.eql(6)
        done()
      })
      pager.next()
    })
  })

  describe('top', function(){
    it('should return the top of page #1', function(done){
      pager.once('top', function(d, i){
        d.should.eql('foo')
        i.should.eql(0)
        done()
      })
      pager.move(-54)
    })
    it('should return the top of page #2', function(done){
      pager.once('top', function(d, i){
        d.should.eql('foo')
        i.should.eql(0)
        done()
      })
      pager.move(0)
    })
    it('should return the top of page #3', function(done){
      pager.once('top', function(d, i){
        d.should.eql('foo')
        i.should.eql(0)
        done()
      })
      pager.back()
    })
  })

  describe('add', function(){
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
        pager.page[8].should.eql('ssh:')
        pager.len.should.eql(10)
        done()
      })
      pager.push(['ssh:', 'git:'])
    })
    it('should return an added item #2', function(done){
      pager.once('add', function(d, i){
        d.should.eql('ftp:')
        i.should.eql(0)
        pager.page[0].should.eql('ftp:')
        pager.len.should.eql(11)
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
        i.should.eql(12)
        pager.page[12].should.eql('pop3')
        done()
      })
      pager.add(9204, 'pop3')
    })
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
