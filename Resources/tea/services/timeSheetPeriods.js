(function() {
    'use strict';

    var baseUrl = 'TimeSheetPeriods',
        ajaxRequest = require('../ajaxRequest').ajaxRequest,
        httpMethod = require('../httpMethod').httpMethod;
        
        
    exports.getTimeSheetPeriodsByYear = function (year, successFunc) {
        var queryString = {year : year};
        
        return ajaxRequest(baseUrl, httpMethod.get, queryString, successFunc);
    };
}());