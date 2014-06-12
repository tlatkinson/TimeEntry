(function() {
    'use strict';

    var baseUrl = 'TimeSheetPeriods',
        ajaxRequest = require('tea/service/ajaxRequest').ajaxRequest,
        httpMethod = require('tea/service/httpMethod').httpMethod;
        
        
    exports.getTimeSheetPeriodsByYear = function (year, successFunc) {
        var queryString = {year : year};
        
        return ajaxRequest(baseUrl, httpMethod.get, queryString, successFunc);
    };
}());