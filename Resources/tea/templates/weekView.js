exports.weekView = function () {
    'use strict';
    
    var dayMap = {},
        weekView,
        util = require('tea/util').util(),
        daysAbbr = [ 'SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
        timeSheetDays = {};
    
    function initialize () {    
        daysAbbr.forEach(function (day) {
            var parentView;
            dayMap[day] = {};
            
            parentView = Ti.UI.createView({
                width : '14.2%',
                height : Ti.UI.FILL,
                layout : 'vertical'
            });
            
            dayMap[day].dayLabel = Ti.UI.createLabel({
                text : day,
                width : Ti.UI.SIZE,
                font : {fontSize : '18dp'}
            });
            
            dayMap[day].dateLabel = Ti.UI.createLabel({
                width : Ti.UI.SIZE,
                font : {fontSize : '12dp'}
            });
            
            dayMap[day].dateId = Ti.UI.createLabel({
                visible : false,
                width: '0dp'
            });
            
            parentView.add(dayMap[day].dayLabel);
            parentView.add(dayMap[day].dateLabel);
            parentView.add(dayMap[day].dateId);
            
            dayMap[day].parent = parentView;
            
            parentView.addEventListener('click', function (e) {
                var dateArray = this.children[2].text.split(',');
                timeSheetDays(new Date(dateArray[0], parseInt(dateArray[1], 10) - 1, dateArray[2]));
            });
            
            weekView.add(parentView);
        });
    }
    
    function updateDates(startDate, selectedDate) {
        var i,
            iterDate = startDate,
            nextDate = new Date();
        
        for(i = 0; i < daysAbbr.length; i += 1) {
            dayMap[daysAbbr[i]].dateLabel.text = (iterDate.getMonth() + 1) + '/' + iterDate.getDate();
            dayMap[daysAbbr[i]].dateId.text = iterDate.getFullYear() + ',' + (iterDate.getMonth() + 1) + ',' + iterDate.getDate();
            
            //add a day
            nextDate.setTime(iterDate.getTime() + (24 * 60 * 60 * 1000));
            
            if((selectedDate >= iterDate) && (selectedDate < nextDate)) {
                dayMap[daysAbbr[i]].parent.backgroundColor = '#000';
                dayMap[daysAbbr[i]].parent.color = '#fff';
            } else {
                dayMap[daysAbbr[i]].parent.backgroundColor = '#fff';
                dayMap[daysAbbr[i]].parent.color = '#000';
            }
            
            startDate.setTime(nextDate.getTime()); 
        }
    }
    
    return {
        initialize : function (weekViewIn, timeSheetDaysIn) {
            weekView = weekViewIn;
            timeSheetDays = timeSheetDaysIn;
            initialize();
        },
        updateDates : updateDates
    };
};