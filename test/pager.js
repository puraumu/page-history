var Pager = require('../')
  , pager = new Pager()
  , page = ['foo', 'bar', 'baz', 'hoge', 'pager', 'history', 'js']

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

  describe('.push()', function(){
    it('should', function(){
      pager.push('node').page[--pager.len].should.eql('node')
    })
  })

  describe('.action()', function(){
    it('should', function(){
      pager.action('next')._action.should.eql('next')
    })
  })

  describe('.now()', function(){
    it('should return current page', function(){
      pager.now().should.eql(2)
    })
  })

  describe('.remvoe()', function(){
    it('should remove the page of index', function(){
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

})
