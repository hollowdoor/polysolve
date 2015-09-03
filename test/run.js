var ps = require('../index.js'),
    Promise = require('es6-promise').Promise;

ps([Promise.resolve(22), Promise.resolve(33), curried(44)]).then(console.log);

ps({
    hello: Promise.resolve("Hello"),
    world: Promise.resolve("World"),
    puncuation: Promise.resolve("!")
}).then(console.log);

ps(Promise.resolve('a resolved value')).then(console.log);

ps(Promise.resolve('arg'), Promise.resolve('values')).then(console.log);

ps('a regular value').then(console.log);

ps(curried()).then(console.log);


function curried(word){
    word = word || 'curried';
    return function(cb){
        setTimeout(function(){
            cb(null, word+' value!');
        }, 10);
    };
}
