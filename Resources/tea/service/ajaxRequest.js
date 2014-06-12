exports.ajaxRequest = function (url, method, params, successFunc, errorFunc) {
    'use strict';
    
    //yup, creds are in plain text
    var user = 'MobileContest7',
        pass = 'Mob1leTest7',
        client,
        serviceConfig = require('tea/service/serviceConfig').serviceConfig;
    
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
        timeout: 1000 * 30           
    });
    
    client.username = user;
    client.password = pass;
    
    client.open(method, serviceConfig.serviceRoot + url);
    client.send(params);
};