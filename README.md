polysolve
=========

Install
-------

`npm install --save polysolve`

Usage
-----

```javascript
var ps = require('polysolve');

ps([Promise.resolve(22), Promise.resolve(33), curried(44)]).then(function(value){
    //value = [ 22, 33, '44 value' ]
});

ps({
    hello: Promise.resolve("Hello"),
    world: Promise.resolve("World"),
    puncuation: Promise.resolve("!")
}).then(function(value){
    //value = { hello: 'Hello', world: 'World', puncuation: '!' }
});

ps(Promise.resolve('a resolved value')).then(console.log);

ps(Promise.resolve('arg'), Promise.resolve('values')).then(function(value){
    //value = [ 'arg', 'values' ]
});

ps('a primitive value').then(console.log);

ps(curried()).then(console.log);

function curried(word){
    word = word || 'curried';
    return function(cb){
        setTimeout(function(){
            cb(null, word+' value!');
        }, 10);
    };
}
```

About
-----

Pass a value to `polysolve`. It returns the same value type with all of the promises resolved.

For convenience `polysolve` delegates to Promise.all for arrays.

`polysolve` turns primitive values into promises.

The example above includes the usage of Promise.resolve. Make sure to include your own **promise polyfill** if you need one.

async/await is the ES2016 solution to the problem polysolve solves. Until we get all the goodness of async/await we've got libraries, and transpilers for now. :)
