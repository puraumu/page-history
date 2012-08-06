var Pager = require('../')
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
  })

  describe('.next()', function(){
    it('should return the next item', function(){
      pager.next().should.eql('hoge')
    })
  })

  describe('.back()', function(){
    it('should return the previous item', function(){
      pager.back().should.eql('baz')
    })
  })

  describe('.now()', function(){
    it('should return current page', function(){
      pager.now().should.eql('baz')
    })
  })

  describe('.action()', function(){
    it('should', function(){
      pager.action('next')._action.should.eql('next')
    })
  })

  describe('.push()', function(){
    it('should', function(){
      pager.push('node').page[--pager.len].should.eql('node')
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
    it('should', function(){
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
