# History

`history` aims to works like browser history.

## Methods

* move
* next
* back
* now
* index
* push
* remove
* add
* set
* get
* search
* export

## Events

|Event|method|note|
|:--|:--|:--|
|move|`move()`, `next()`, `back()`|focus moved|
|end|`move()`, `next()`|when focus hit the end of index|
|top|`move()`, `back()`|when focus hit the top of index|
|add|`push()`, `add()`|item added to history|
|remove|`remove()`|item remvoed from history|
|change|`set()`|stack changed|

## Example

``` javascript
var history = require('history')
  , pages = [
  'https://github.com/',
  'http://nodejs.org/',
  'http://nodejs.org/api/',
  'http://nodejs.org/api/net.html',
  'https://github.com/joyent/node/',
  'https://github.com/about', ];
```

You do not need to pass Array when initializing. Or Just call it.

``` javascript
var pager = history(pages);
```

`history` remembers where focus on. When generated, the focus is alway on index 0.

``` javascript
pager.now(); // 'https://github.com/'
pager.index('https://github.com/') // 0
```

Change the focus to next and back. You may specify number to change the focus.

``` javascript
pager.next(); // 'http://nodejs.org/'
pager.next(); // 'http://nodejs.org/api/'
pager.back(); // 'http://nodejs.org/'

pager.move(0); // 'https://github.com/'
pager.move(6); // 'https://github.com/about'
pager.move(456321); // 'https://github.com/about'
```

Pass an item or Array to add it to history. The `push()` method does not change the current focus.

``` javascript
pager.push('http://www.google.com/');
pager.now(); // 'https://github.com/about'
pager.index('http://www.google.com/') // 7

pager.push(['http://www.mozilla.org/', 'http://apple.com/'])
```

`history` also counts its page size.

``` javascript
pager.len; // 9
```

`Add` an item at index by specifying index number and an item. When item added at the place before current focus, the focus moves to keep current focus. This case is also apply to `remove` method.

``` javascript
pager.add(0, 'http://en.wikipedia.org/');
pager.index('http://en.wikipedia.org/'); // 0
pager.now(); // 'https://github.com/about'
pager.index('https://github.com/about') // 7

pager.remove(0);
pager.now(); // 'https://github.com/about'
pager.index('https://github.com/about'); 6
```
