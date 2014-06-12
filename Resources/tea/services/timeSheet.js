(function() {
    'use strict';

    var baseUrl = 'TimeSheet',
        ajaxRequest = require('tea/service/ajaxRequest').ajaxRequest,
        httpMethod = require('tea/service/httpMethod').httpMethod;
    
    exports.getTimeSheetById = function (id, successFunc) {
        var queryString = {timesheetPeriodId : id};
        
        ajaxRequest(baseUrl, httpMethod.get, queryString, successFunc);
    };
    
    exports.submitTimeSheet = function (id, comment, successFunc, errorFunc) {
        var queryString = '?timesheetPeriodIdid=' + id + '&comment=' + encodeURIComponent(comment);
        
        ajaxRequest(baseUrl + queryString, httpMethod.post, {}, successFunc, errorFunc);
    };
}());