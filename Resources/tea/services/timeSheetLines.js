(function() {
    'use strict';

    var baseUrl = 'TimeSheetLines',
        ajaxRequest = require('tea/service/ajaxRequest').ajaxRequest,
        httpMethod = require('tea/service/httpMethod').httpMethod;
    
    exports.getTimeSheetLines = function (periodId, timeSheetId, successFunc) {
        var queryString = {
            timeSheetPeriodId : periodId,
            timeSheetId : timeSheetId
        };
        
        ajaxRequest(baseUrl, httpMethod.get, queryString, successFunc);
    };
}());