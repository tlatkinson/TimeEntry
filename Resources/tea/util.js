exports.clone = function (x)
{   
    'use strict';
         
    if (x === null || x === undefined) {
        return x;
    }
    if (x.clone) {
        return x.clone();
    }
    return x;
};