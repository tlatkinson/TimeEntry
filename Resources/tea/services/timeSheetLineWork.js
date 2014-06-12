(function() {
    'use strict';

    var baseUrl = 'TimeSheetLineWork',
        ajaxRequest = require('tea/service/ajaxRequest').ajaxRequest,
        httpMethod = require('tea/service/httpMethod').httpMethod;
    
    exports.getLineWorkItems = function (periodId, timeSheetId, lineId, successFunc) {
        var queryString = {
            timeSheetPeriodId : periodId,
            timeSheetId : timeSheetId,
            lineId : lineId
        };
        
        ajaxRequest(baseUrl, httpMethod.get, queryString, successFunc);
    };
    
    exports.updateLineWorkItems = function (lineWork, successFunc, errorFunc) {
        ajaxRequest(baseUrl, httpMethod.put, lineWork, successFunc, errorFunc);
    };
}());