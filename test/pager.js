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
    it('should return current page', function(){
    })
  })

  describe('.next()', function(){
    it('should return', function(){
      pager = new Pager(page);
      pager.page.should.not.be.empty;
    })
  })

  describe('.back()', function(){
    it('should', function(){
    })
  })

  describe('.push()', function(){
    it('should', function(){
    })
  })

  describe('.action()', function(){
    it('should', function(){
    })
  })

  describe('.now()', function(){
    it('should', function(){
    })
  })

  describe('.delete()', function(){
    it('should', function(){
    })
  })

  describe('.insert()', function(){
    it('should', function(){
    })
  })

  describe('.set()', function(){
    it('should', function(){
    })
  })

})
