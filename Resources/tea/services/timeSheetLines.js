(function() {
    'use strict';

    var baseUrl = 'TimeSheetLines',
        ajaxRequest = require('../ajaxRequest').ajaxRequest,
        httpMethod = require('../httpMethod').httpMethod;
    
    // exports.getTimeSheetByDate = function (date) {
//         
    // };
    
    exports.getTimeSheetLines = function (periodId, timeSheetId, successFunc) {
        var queryString = {
            timeSheetPeriodId : periodId,
            timeSheetId : timeSheetId
        };
        
        ajaxRequest(baseUrl, httpMethod.get, queryString, successFunc);
    };
}());