exports.timeEntryRow = function (tableView, hours, project, task, initial) {
    'use strict';
    
    var row = Ti.UI.createTableViewRow(),
        hour,
        hoursFontSize = 32,
        hoursOffset = '0dp';
        
    if (initial) {
        hoursFontSize = 12;
        hoursOffset = '18dp';
    }
    
    hour = Ti.UI.createLabel({
        text : hours,
        left: '12dp',
        top : hoursOffset,
        font : {fontSize : hoursFontSize},
        width: '54dp'
    });
    
    project = Ti.UI.createLabel({
        text : project,
        top : '4dp',
        left: '60dp',
        font : {fontSize : 18}
    });
    
    task = Ti.UI.createLabel({
        text : task,
        left: '60dp',
        top : '30dp',
        font : {fontSize : 12}
    });
    
    row.add(hour);
    row.add(project);
    row.add(task);
    row.className = 'entryRow';
        
    tableView.appendRow(row);
};