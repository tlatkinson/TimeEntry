(function() {
    'use strict';
    
    var timeSheetWindow = require('tea/templates/timeSheetWindow').timeSheetWindow(),
        teaData = require('tea/teaData').teaData();
    
    function swipeListener (e) {
        var weekOfTime = 24 * 60 * 60 * 1000 * 7;
        if(e.direction === 'right') {
            teaData.date.setTime(teaData.date.getTime() - weekOfTime);
            teaData.loadDay(teaData.date);
        } else if (e.direction === 'left') {
            teaData.date.setTime(teaData.date.getTime() + weekOfTime);
            teaData.loadDay(teaData.date);
        }
    }
    
    timeSheetWindow.addEventListener('swipe', swipeListener);
    
    timeSheetWindow.open();
    
    //adding data
    teaData.initialize(timeSheetWindow);
}());