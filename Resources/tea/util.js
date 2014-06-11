exports.util = function () {   
    'use strict';
 
    function getDateParts(jsDate) {
        var dateParts = {};
        
        if(!jsDate) {
            return getDateParts(new Date());
        }
        
        dateParts.year = String(jsDate.getFullYear());
        dateParts.month = String(jsDate.getMonth() + 1);
        dateParts.day = String(jsDate.getDate());
        
        return dateParts;
    }
    
    function getDateString(jsDate) {
        var dateParts = getDateParts(jsDate);
        
        return dateParts.month + '/' + dateParts.day + '/' + dateParts.year;
    }
    
    function getDateFromTimeStamp(timeStamp) {
        var dateParts = {};
        
        if(!timeStamp || (timeStamp.length !== 19)) {
            return new Date();
        }
        
        //year, month, date
        return new Date(
            timeStamp.substring(0, 4), 
            parseInt(timeStamp.substring(5, 7), 10) - 1, 
            timeStamp.substring(8, 10),
            timeStamp.substring(11, 13),
            timeStamp.substring(14, 16),
            timeStamp.substring(17, 19));
    }
    
    return {
        getDateFromTimeStamp : getDateFromTimeStamp,
        getDateParts : getDateParts,
        getDateString : getDateString,
        getDateStringFromTimeStamp : function (timeStamp) {
            return getDateString(getDateFromTimeStamp(timeStamp));
        }
    };
};