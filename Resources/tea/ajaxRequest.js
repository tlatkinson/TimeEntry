//http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Network.HTTPClient

    
    exports.ajaxRequest = function (url, method, params, successFunc, errorFunc, completeFunc) {
        var user = 'MobileContest7',
            pass = 'Mob1leTest7',
            client,
            serviceConfig = require('serviceConfig');
        
        client = Ti.Network.createHTTPClient({
            //similar to $.ajax.success except all http responses are returned here
            onload : function (e) {
                if ((this.readyState === 4) && successFunc) {
                    successFunc();
                } else if ((this.readyState !== 4) && errorFunc){
                    errorFunc();
                }
            },
            onerror: errorFunc,
            timeout: 5000            
        });
        
        client.username = user;
        client.password = pass;
        
        client.open(method, serviceConfig.serviceRoot + url);
        client.send(params);
    };