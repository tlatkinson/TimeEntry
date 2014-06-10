(function() {
    'use strict';
    
    var timeSheetWindow,
        weekView,
        weekColumn,
        timeTableView,
        baseView,
        teaData = require('tea/teaData').teaData();
    
    //Setup Window
    timeSheetWindow = Titanium.UI.createWindow({
        title:'Time',
        backgroundColor:'#fff',
        layout: 'vertical',
        font : {fontSize : 48}
    });
    
    //base view
    baseView = Ti.UI.createView({
        width : Ti.UI.FILL,
        height : Ti.UI.FILL,
        layout : 'vertical'
    });
    timeSheetWindow.add(baseView);
    
    //week table view
    weekView = Titanium.UI.createView({
        layout: 'horizontal',
        height: '10%'
    });
    
    baseView.add(weekView);
   
    //time entries view
    timeTableView = Titanium.UI.createTableView({
        layout: 'vertical',
        height: Ti.UI.FILL
    });
    baseView.add(timeTableView);
    
    //adding data
    teaData.initialize(timeTableView, weekView);
    
    timeSheetWindow.add(baseView);
    timeSheetWindow.open();
}());

/*
https://www.youtube.com/watch?v=0nYGCTeBAnk
 */