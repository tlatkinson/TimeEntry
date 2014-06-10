exports.timeEntryRow = function (tableView, hours, project, task, initial) {
    'use strict';
    
    var row = Ti.UI.createTableViewRow(),
        hour,
        hoursFontSize = 48,
        hoursOffset = '0dp';
        
    if (initial) {
        hoursFontSize = 24;
        hoursOffset = '12dp';
    }
    
    hour = Ti.UI.createLabel({
        text : hours,
        left: '8dp',
        top : hoursOffset,
        font : {fontSize : hoursFontSize},
        width: '72dp'
    });
    
    project = Ti.UI.createLabel({
        text : project,
        top : '8dp',
        left: '80dp',
        font : {fontSize : 24}
    });
    
    task = Ti.UI.createLabel({
        text : task,
        left: '80dp',
        top : '38dp',
        font : {fontSize : 16}
    });
    
    row.add(hour);
    row.add(project);
    row.add(task);
    row.className = 'entryRow';
        
    tableView.appendRow(row);
};