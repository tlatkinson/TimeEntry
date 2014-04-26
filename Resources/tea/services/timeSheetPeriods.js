(function() {
    'use strict';

    var baseUrl = 'TimeSheetPeriods',
        ajaxRequest = require('../ajaxRequest'),
        httpMethod = require ('../httpMethod');
        
        
    exports.getTimeSheetPeriodsByYear = function (year, sucessFunc) {
        var queryString = {year : '2014'};
        
        ajaxRequest(baseUrl, httpMethod.get, queryString, sucessFunc);
    };
    
    exports.getTimeSheetPeriodsById = function (id, successFunc) {
        var queryString = {id : id};
        
        ajaxRequest(baseUrl, httpMethod.get, queryString, successFunc);
    };
}());