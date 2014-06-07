(function() {
    'use strict';

    var baseUrl = 'TimeSheet',
        ajaxRequest = require('../ajaxRequest').ajaxRequest,
        httpMethod = require('../httpMethod').httpMethod;
    
    // exports.getTimeSheetByDate = function (date) {
//         
    // };
    
    exports.getTimeSheetById = function (id, successFunc) {
        var queryString = {timesheetPeriodId : id};
        
        ajaxRequest(baseUrl, httpMethod.get, queryString, successFunc);
    };
}());