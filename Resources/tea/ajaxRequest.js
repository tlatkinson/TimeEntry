//http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Network.HTTPClient
exports.ajaxRequest = function (url, method, params, successFunc, errorFunc) {
    'use strict';
    
    var user = 'MobileContest7',
        pass = 'Mob1leTest7',
        client,
        serviceConfig = require('serviceConfig').serviceConfig;
    
    client = Ti.Network.createHTTPClient({
        //similar to $.ajax.success except all http responses are returned here
        onload : function () {
            if ((this.readyState === 4)) {                
                successFunc(JSON.parse(this.responseText), params); 
            } else if ((this.readyState !== 4) && errorFunc){
                errorFunc();
            }
        },
        onerror: function () {
            if(errorFunc) {
                errorFunc();
            }
        },
        timeout: 5000            
    });
    
    client.username = user;
    client.password = pass;
    
    client.open(method, serviceConfig.serviceRoot + url);
    client.send(params);
};