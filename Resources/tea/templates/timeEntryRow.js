exports.timeEntryRow = function (tableView, lineWork, project, task, tea) {
    'use strict';
    
    var row = Ti.UI.createTableViewRow(),
        hourLabel,
        projectLabel,
        taskLabel,        
        hoursFontSize = 32,
        hoursOffset = '0dp',
        updateWindow;
    
    hourLabel = Ti.UI.createLabel({
        text : lineWork.ActualWork,
        left: '12dp',
        top : hoursOffset,
        font : {fontSize : hoursFontSize},
        width: '54dp'
    });
    
    projectLabel = Ti.UI.createLabel({
        text : project,
        top : '4dp',
        left: '70dp',
        font : {fontSize : 18}
    });
    
    taskLabel = Ti.UI.createLabel({
        text : task,
        left: '70dp',
        top : '30dp',
        font : {fontSize : 12}
    });
    
    row.add(hourLabel);
    row.add(projectLabel);
    row.add(taskLabel);
    row.className = 'entryRow';
        
    row.addEventListener('click', function (e) {
        if(!updateWindow) {
            updateWindow = require('tea/templates/updateWindow').updateWindow(lineWork, project, task, tea);
        }
        updateWindow.open({
            activityEnterAnimation: Ti.Android.R.anim.slide_in_left,
            activityExitAnimation: Ti.Android.R.anim.slide_out_right
        });
    });
    
    tableView.appendRow(row);
};