var assert = require('assert')
  , should = require('should')
  , Pager = require('../')
  , pager = new Pager()
  , page = ['foo', 'bar', 'baz', 'hoge', 'FOO', 'BAR', 'HOGE']

describe('Pager', function(){

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
    it('should move to specified page', function(){
      pager.move(2).cwp.should.eql(2)
    })
    it('should move to the page relatively', function(){
      pager.move(2, true).cwp.should.eql(4)
    })
    it('should not be smaller than 0', function(){
      pager.move(0).move(-1, true).cwp.should.eql(0)
    })
    it('should nto be bigger than Pager.len', function(){
      pager.move(pager.len - 1).move(1, true).cwp.should.eql(pager.len - 1)
    })
  })

  describe('.next()', function(){
    it('should return the next item', function(){
      pager.move(2).next().should.eql('hoge')
    })
    it('should stop when cwp is end of the page', function(){
      should.strictEqual(pager.move(pager.len - 1).next(), undefined)
      pager.cwp.should.eql(pager.len - 1)
    })
  })

  describe('.back()', function(){
    it('should return the previous item', function(){
      pager.move(3).back().should.eql('baz')
    })
    it('should stop when cwp is top of the page', function(){
      should.strictEqual(pager.move(0).back(), undefined)
      pager.cwp.should.eql(0)
    })
  })

  describe('.now()', function(){
    it('should return current page', function(){
      pager.move(1).now().should.eql('bar')
    })
  })

  describe('.index()', function(){
    it('should return the page of index', function(){
      pager.index('hoge').should.eql(3)
    })
  })

  describe('.action()', function(){
    it('should register an action', function(){
      pager.action('next')._action.should.eql('next')
    })
    it('should not invoke noop', function(){
      // => events
    })
  })

  describe('.push()', function(){
    it('should add a new page', function(){
      var len = pager.len;
      pager.push('node')
      len += 1
      pager.page[len -1].should.eql('node')
      len.should.eql(pager.len)
    })
    it('should add new multiple pages', function(){
      var len = pager.len;
      pager.push(['ssh:', 'ftp:'])
      len += 2
      pager.page[len - 1].should.eql('ftp:')
      pager.page[len - 2].should.eql('ssh:')
      len.should.eql(pager.len)
    })
  })

  describe('.remvoe()', function(){
    it('should remove the page at index', function(){
      pager.remove(0).page[0].should.eql('bar')
    })
  })

  describe('.add()', function(){
    it('should add the page to index', function(){
      pager.add(0, 'http').page[0].should.eql('http')
    })
  })

  describe('.set()', function(){
    it('should set data to the page', function(){
      pager.set(1, 'foo').stack[1].should.eql('foo')
    })
  })

  describe('.get()', function(){
    it('should get data at the page', function(){
      pager.set(2, 99).get(2).should.eql(99)
    })
  })

  describe('.search()', function(){
    it('should return matched index of page', function(){
      pager.search(99)[0].should.eql(2)
    })
    it('should return matched index of page by RegExp', function(){
      pager.search('o$')[0].should.eql(1)
    })
  })

  describe('.export()', function(){
    it('should return all items in the stack', function(){
      pager.export().should.have.length(2)
    })
  })

  describe('events', function(){

    // TODO 0?
    // console.log(pager.now(), pager.cwp);
    describe('add', function(){
      it('should return added item', function(done){
        pager.on('add', function(item){
          item.should.eql('foo')
          done();
        });
        pager.push('foo');
      })
      it('should', function(){
      })
    })

  })

})
