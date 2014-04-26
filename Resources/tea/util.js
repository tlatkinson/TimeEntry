
    exports.clone = function (x)
    {        
        if (x === null || x === undefined) {
            return x;
        }
        if (x.clone) {
            return x.clone();
        }
        return x;
    };