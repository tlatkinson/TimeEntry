exports.timeSheetWindow = function () {
    'use strict';
    var timeSheetWindow, 
        weekView,
        timeTableView,
        submitTimeSheetView,
        baseView;
    
    //Setup Window
    timeSheetWindow = Titanium.UI.createWindow({
        title:'Time Entry',
        backgroundColor:'#fff',
        layout: 'vertical',
        exitOnClose : true
    });
    
    //base view
    baseView = Ti.UI.createView({
        width : Ti.UI.FILL,
        height : '85%',
        layout : 'vertical'
    });
    timeSheetWindow.add(baseView);
    
    //week table view
    weekView = Titanium.UI.createView({
        layout: 'horizontal',
        height: '45dp'
    });
    
    baseView.add(weekView);
   
    //time entries view
    timeTableView = Titanium.UI.createTableView({
        layout: 'vertical',
        height: Ti.UI.SIZE
    });
    baseView.add(timeTableView);
    
    //submit time sheet view
    submitTimeSheetView = Titanium.UI.createView({
        bottom: 0,
        layout: 'horizontal',
        height: '15%'
    });
    
    submitTimeSheetView.add(Ti.UI.createTextArea({
        left: '2%',
        width : '45%',
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
        borderColor : '#000',
        color : '#000',
        backgroundColor : '#fff',
        borderWidth : 1
    }));
    
    submitTimeSheetView.add(Titanium.UI.createButton({
        title: 'Submit Time Sheet',
        width: '50%',
        right: '2%'
    }));
    timeSheetWindow.add(submitTimeSheetView);
    
    timeSheetWindow.add(baseView);
    
    return timeSheetWindow;
};