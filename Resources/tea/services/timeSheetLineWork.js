(function() {
    'use strict';

    var baseUrl = 'TimeSheetLineWork',
        ajaxRequest = require('../ajaxRequest').ajaxRequest,
        httpMethod = require('../httpMethod').httpMethod;
    
    // exports.getTimeSheetByDate = function (date) {
//         
    // };
    
    exports.getLineWorkItems = function (periodId, timeSheetId, lineId, successFunc) {
        var queryString = {
            timeSheetPeriodId : periodId,
            timeSheetId : timeSheetId,
            lineId : lineId
        };
        
        ajaxRequest(baseUrl, httpMethod.get, queryString, successFunc);
    };
}());