var assert = require('assert')
  , should = require('should')
  , Pager = require('../')
  , pager = new Pager()
  , page = ['foo', 'bar', 'baz', 'hoge', 'FOO', 'BAR', 'HOGE']

describe('Pager', function(){

  describe('new', function(){
    it('should read arument', function(){
      pager = new Pager(page);
      pager.page.should.not.be.empty;
    })
  })

  describe('.move() to specified page.', function(){
    it('should change cwp', function(){
      pager.move(2).cwp.should.eql(2)
    })
    it('should not change len', function(){
      var len = pager.len;
      pager.move(4).cwp.should.eql(4)
      pager.len.should.eql(len)
    })
    it('should not change page', function(){
      var page = pager.page;
      pager.move(3).cwp.should.eql(3)
      pager.page.should.eql(page)
    })
  })

  describe('.move() to the page relatively.', function(){
    it('should change cwp', function(){
      pager.move(0)
      pager.move(1, true).cwp.should.eql(1)
    })
    it('should not change len', function(){
      var len = pager.len;
      pager.move(1, true).cwp.should.eql(2)
      pager.len.should.eql(len)
    })
    it('should not change page', function(){
      var page = pager.page;
      pager.move(-2, true).cwp.should.eql(0)
      pager.page.should.eql(page)
    })
  })

  describe('.move(), cwp should not be smaller than 0.', function(){
    it('should change cwp', function(){
      pager.move(0).move(-1, true).cwp.should.eql(0)
    })
    it('should not change len', function(){
      var len = pager.len, cwp = pager.cwp;
      pager.move(-1, true)
      pager.cwp.should.eql(0)
      pager.len.should.eql(len)
    })
    it('should not change page', function(){
      var page = pager.page, cwp = pager.cwp;
      pager.move(-22, true)
      pager.cwp.should.eql(0)
      pager.page.should.eql(page)
    })
  })

  describe('.move(), cwp should not be bigger than `Pager`.len.', function(){
    it('should change cwp', function(){
      pager.move(pager.len - 1).move(1, true).cwp.should.eql(pager.len - 1)
    })
    it('should not change len', function(){
      var len = pager.len, cwp = pager.cwp;
      pager.move(456, true)
      pager.cwp.should.eql(pager.len - 1)
      pager.len.should.eql(len)
    })
    it('should not change page', function(){
      var page = pager.page;
      pager.move(1, true)
      pager.page.should.eql(page)
    })
  })

  describe('.next() returns the next item.', function(){
    it('should change cwp', function(){
      pager.move(2).next().should.eql('hoge')
      pager.cwp.should.eql(3)
    })
    it('should not change len', function(){
      var len = pager.len;
      pager.next().should.eql('FOO')
      pager.cwp.should.eql(4)
      pager.len.should.eql(len)
    })
    it('should not change page', function(){
      var page = pager.page;
      pager.next().should.eql('BAR')
      pager.cwp.should.eql(5)
      pager.page.should.eql(page)
    })
  })

  describe('.next() should stop when cwp is end of the page.', function(){
    it('should change cwp', function(){
      should.strictEqual(pager.move(pager.len - 1).next(), undefined)
      pager.cwp.should.eql(pager.len - 1)
    })
    it('should not change len', function(){
      var len = pager.len;
      pager.move(pager.len - 1).next()
      pager.len.should.eql(len)
    })
    it('should not change page', function(){
      var page = pager.page;
      pager.move(pager.len - 1).next()
      pager.page.should.eql(page)
    })
  })

  describe('.back() to the previous item.', function(){
    it('should change cwp', function(){
      pager.move(3).back().should.eql('baz')
      pager.cwp.should.eql(2)
    })
    it('should not change len', function(){
      var len = pager.len;
      pager.back().should.eql('bar')
      pager.len.should.eql(len)
    })
    it('should not change page', function(){
      var page = pager.page;
      pager.back().should.eql('foo')
      pager.page.should.eql(page)
    })
  })

  describe('.back() should stop at top of the page.', function(){
    it('should change cwp', function(){
      should.strictEqual(pager.move(0).back(), undefined)
      pager.cwp.should.eql(0)
    })
    it('should not change len', function(){
      var len = pager.len;
      pager.move(0).back()
      pager.len.should.eql(len)
    })
    it('should not change page', function(){
      var page = pager.page;
      pager.move(0).back()
      pager.page.should.eql(page)
    })
  })

  describe('.now() returns current page.', function(){
    it('should not change cwp', function(){
      var cwp = pager.cwp;
      pager.now().should.eql('foo')
      pager.cwp.should.eql(cwp)
    })
    it('should not change len', function(){
      var len = pager.len;
      pager.now()
      pager.len.should.eql(len)
    })
    it('should not change page', function(){
      var page = pager.page;
      pager.now().should.eql('foo')
      pager.page.should.eql(page)
    })
  })

  describe('.index() returns the page of index.', function(){
    it('should not change cwp', function(){
      var cwp = pager.cwp;
      pager.index('hoge').should.eql(3)
      pager.cwp.should.eql(cwp)
    })
    it('should not change len', function(){
      var len = pager.len;
      pager.index('HOGE').should.eql(6)
      pager.len.should.eql(len)
    })
    it('should not change page', function(){
      var page = pager.page;
      pager.index('foo').should.eql(0)
      pager.page.should.eql(page)
    })
  })

  describe('.action() registers an action.', function(){
    it('should not change cwp', function(){
      var cwp = pager.cwp;
      pager.action('next')._action.should.eql('next')
      pager.cwp.should.eql(cwp)
    })
    it('should not change len', function(){
      var len = pager.len;
      pager.action('hoge')._action.should.eql('hoge')
      pager.len.should.eql(len)
    })
    it('should not change page', function(){
      var page = pager.page;
      pager.action('')._action.should.eql('')
      pager.page.should.eql(page)
    })
  })

  describe('.action()', function(){
    it('should not invoke noop', function(){
      // => events
    })
  })

  describe('.push() adds a new page.', function(){
    it('should not change cwp', function(){
      var cwp = pager.cwp;
      pager.push('node')
      pager.cwp.should.eql(cwp)
    })
    it('should change len', function(){
      var len = pager.len;
      pager.push('')
      pager.len.should.eql(len + 1)
    })
    it('should change page', function(){
      var page = pager.page;
      pager.push('javascript')
      // page.push('javascript') // Array push
      pager.page.should.eql(page)
      pager.page[pager.len -1].should.eql('javascript')
    })
  })

  describe('.push() adds new multiple pages.', function(){
    it('should not change cwp', function(){
      var cwp = pager.cwp;
      pager.push(['http://nodejs.org/', 'https://github.com/'])
      pager.cwp.should.eql(cwp)
    })
    it('should change len', function(){
      var len = pager.len;
      pager.push(['', ''])
      pager.len.should.eql(len + 2)
    })
    it('should change page', function(){
      var page = pager.page;
      pager.push([2, 99])
      // page.push([90, 34]) // Array push
      pager.page.should.eql(page)
      pager.page[pager.len - 1].should.eql(99)
    })
  })

  describe('.remove() remove the page at index.', function(){
    describe('target index < cwp', function(){
      it('should change cwp', function(){
        var last = (pager.len - 1);
        pager.move(last)
        var cwp = pager.cwp;
        pager.remove(last - 1)
        pager.cwp.should.eql(cwp - 1)
      })
    })
    describe('target index == cwp', function(){
      it('should change cwp', function(){
        var last = (pager.len - 1);
        pager.move(last)
        var cwp = pager.cwp;
        pager.remove(last)
        pager.cwp.should.eql(cwp - 1)
      })
    })
    describe('target index > cwp', function(){
      it('should not change cwp', function(){
        pager.move(0)
        var cwp = pager.cwp;
        pager.remove(pager.len - 1)
        pager.cwp.should.eql(cwp)
      })
    })

    it('should change len', function(){
      var len = pager.len;
      pager.remove(pager.len - 1)
      pager.len.should.eql(len - 1)
    })
    it('should change page', function(){
      var page = pager.page;
      pager.remove(pager.len - 1)
      // page.splice(pager.len -1, 0) // Array splice
      pager.page.should.eql(page)
    })
  })

  // ===
  describe('.add() add the page at index.', function(){
    describe('target index < cwp', function(){
      it('should change cwp', function(){
        var last = (pager.len - 1);
        pager.move(last)
        var cwp = pager.cwp;
        pager.add(0, 88)
        pager.cwp.should.eql(cwp + 1)
      })
    })
    describe('target index == cwp', function(){
      it('should change cwp', function(){
        var last = (pager.len - 1);
        var cwp = pager.cwp;
        pager.add(last, 'https://github.com/')
        pager.cwp.should.eql(cwp + 1)
      })
    })
    describe('target index > cwp', function(){
      it('should not change cwp', function(){
        pager.move(0)
        var cwp = pager.cwp;
        pager.add(pager.len / 2, 'http://nodejs.org/')
        pager.cwp.should.eql(cwp)
      })
    })

    it('should change len', function(){
      var len = pager.len;
      pager.add(0, 77)
      pager.len.should.eql(len + 1)
    })
    it('should change page', function(){
      var page = pager.page;
      pager.add(0, 66)
      // page.splice(0, 1, 55) // Array splice
      pager.page.should.eql(page)
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
          done()
        })
        pager.push('foo')
      })
      it('should', function(){
      })
    })

  })

})
