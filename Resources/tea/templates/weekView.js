exports.weekView = function () {
    'use strict';
    
    var dayMap = {},
        weekView,
        util = require('tea/util').util(),
        daysAbbr = [ 'SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRID', 'SAT'];
        
    function initialize () {    
        daysAbbr.forEach(function (day) {
            var parentView;
            dayMap[day] = {};
            
            parentView = Ti.UI.createView({
                width : Ti.UI.SIZE,
                height : Ti.UI.FILL,
                layout : 'vertical'
            });
            
            dayMap[day].dayLabel = Ti.UI.createLabel({
                text : day,
                width : Ti.UI.SIZE,
                left : 10,
                right : 10,
                font : {fontSize : '30dp'},
                color : '#000'
            });
            
            dayMap[day].dateLabel = Ti.UI.createLabel({
                width : Ti.UI.SIZE,
                font : {fontSize : '16dp'},
                color : '#000'
            });
            
            parentView.add(dayMap[day].dayLabel);
            parentView.add(dayMap[day].dateLabel);
            weekView.add(parentView);
        });
    }
    
    function updateDates(date) {
        var i;
        
        for(i = 0; i < daysAbbr.length; i += 1) {
            dayMap[daysAbbr[i]].dateLabel.text = (date.getMonth() + 1) + '/' + date.getDate();
            
            //add a day
            date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); 
        }
    }
    
    function selectDay(dateParts) {
        
    }
    
    return {
        initialize : function (weekViewIn) {
            weekView = weekViewIn;
            initialize();
            
            // selectDay(new Date());
        },
        updateDates : updateDates
    };
};