var Promise = require('es6-promise').Promise;
/*
git remote add origin https://github.com/hollowdoor/polysolve.git
git push -u origin master
npm publish
*/
module.exports = run;

function run(a){
    var type = Object.prototype.toString.call(a),
        list = [], keys, i;

    if(arguments.length > 1)
        return run(Array.prototype.slice.call(arguments));

    if(type === '[object Array]'){
        for(i=0; i<a.length; i++)
            if(typeof a[i] === 'function')
                list[i] = run(a[i]);
            else
                list[i] = a[i];
        return Promise.all(list);
    }else if(type === '[object Object]'){

        if(typeof a.then === 'function')
            return Promise.resolve(a);

        keys = Object.keys(a);

        for(i=0; i<keys.length; i++){
            if(typeof a[keys[i]] === 'function')
                list[i] = run(a[keys[i]]);
            else
                list[i] = a[keys[i]];
        }

        return Promise.all(list).then(function(arr){
            var result = {};
            for(var i=0; i<keys.length; i++){
                result[keys[i]] = arr[i];
            }

            type = null;
            keys = null;
            list = null;
            return result;
        });
    }else{
        if(typeof a === 'function'){
            return new Promise(function(res, rej){
                a(function(a, b){
                    try{
                        if(b === undefined){
                            return a instanceof Error ? rej(a) : res(a);
                        }else if(a === null){
                                if(arguments.length > 2)
                                    return res(Array.prototype.slice.call(arguments, 1));
                                return res(b);
                        }else if(a instanceof Error){
                            return rej(a);
                        }
                    }catch(e){
                        return resolve(Promise.reject(e));
                    }
                });
            });
        }

        return Promise.resolve(a);
    }
}
