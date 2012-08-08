var assert = require('assert')
  , should = require('should')
  , Pager = require('./index')
  , pager = new Pager()
  , page = ['foo', 'bar', 'baz', 'hoge', 'FOO', 'BAR', 'HOGE']
  , max = 1000 * 5

describe('Pager', function(){

  it('should', function(){
    for (var i = 0; i < max; i++) {
      pager = new Pager(page);

      pager.now()
      pager.move(3)
      pager.index()
      pager.push(['foo', 'bar'])

      pager.move(9)

      pager.next()

      pager.move(-1)

      pager.next()
      pager.now()
      pager.push('bar')
      pager.index()

      pager.back()

      pager.back()

      pager.next()

      pager.push('foo')
      pager.index()
      pager.now()
      pager.back()

      pager.remove(0)
      pager.add(7, 77)

      pager.remove(0)
      pager.add(8, 88)

      pager.add(6, 66)
      pager.remove(0)

      pager.set(3, 33)
      pager.get(2)

      pager.set(2, 22)
      pager.get(3)

      pager.set(1, 11)
      pager.get(1)

      pager.search(11)
      pager.export()
      pager.search(99)

      pager.export()
      pager.search(0)
      pager.export()

    };
  })


})

