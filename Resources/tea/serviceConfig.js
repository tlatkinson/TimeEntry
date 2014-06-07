(function() {
    'use strict';

    var serviceConfig = {
        contextRoot : 'https://timeentry.azurewebsites.net/'
    };
    serviceConfig.serviceRoot = serviceConfig.contextRoot + 'api/';
    exports.serviceConfig = serviceConfig;
}());