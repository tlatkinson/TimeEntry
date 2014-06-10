exports.util = function ()
{   
    'use strict';
         
 
    function getDateParts(jsDate) {
        var dateParts = {};
        
        if(!jsDate) {
            return getDateParts(new Date());
        }
        
        dateParts.year = String(jsDate.getFullYear());
        dateParts.month = String(jsDate.getMonth() + 1);
        dateParts.day = String(jsDate.getDate());
    }
    
    function getDateFromTimeStamp(dateString) {
        var dateParts = {};
        
        if(dateString.length !== 19) {
            return new Date();
        }
        
        //year, month, date
        return new Date(dateString.substring(0, 4), parseInt(dateString.substring(5, 7), 10) - 1, dateString.substring(8, 10), 0, 0, 0, 0);
    }
    
    return {
        getDateFromTimeStamp : getDateFromTimeStamp,
        getDateParts : getDateParts
    };
};