exports.updateWindow = function (lineWork, project, task, tea) {
    'use strict';
    
    //TODO validate hours input
    var updateWindow,
        util = require('tea/util').util(),
        dateString = util.getDateStringFromTimeStamp(lineWork.Start),
        i,
        updateButton,
        DataField = require('tea/templates/DataField').DataField,
        timeSheetLineWorkService = require('tea/services/timeSheetLineWork'),
        inputParams = [
            {value : dateString,                        name : 'Date',                          id : 'Date',                    type : 'label'},
            {value : project,                           name : 'Project',                       id : 'Project',                 type : 'label'},
            {value : task,                              name : 'Task',                          id : 'Task',                    type : 'label'},
            {value : lineWork.ActualWork,               name : 'Actual Work',                   id : 'ActualWork',              type : 'textField'},
            {value : lineWork.NonBillableOvertimeWork,  name : 'Non Billable Overtime Work',    id : 'NonBillableOvertimeWork', type : 'textField'},
            {value : lineWork.NonBillableWork,          name : 'Non Billable Work',             id : 'NonBillableWork',         type : 'textField'},
            {value : lineWork.OvertimeWork,             name : 'Overtime Work',                 id : 'OvertimeWork',            type : 'textField'},
            {value : lineWork.PlannedWork,              name : 'Planned Work',                  id : 'PlannedWork',             type : 'textField'},
            {value : lineWork.Comment,                  name : 'Comment',                       id : 'Comment',                 type : 'textArea'}
        ],
        fields = {},
        progressIndicator;
        
    progressIndicator = Ti.UI.Android.createProgressIndicator({
        message: 'Loading...',
        location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
        type: Ti.UI.Android.PROGRESS_INDICATOR_DETERMINANT,
        min: 0,
        max: 1
    });
    
    updateWindow = Titanium.UI.createWindow({
        title:'Edit Time Entry',
        backgroundColor:'#fff',
        layout: 'vertical'
    });
    
    for(i = 0; i < inputParams.length; i += 1) {
        fields[inputParams[i].id] = new DataField(inputParams[i]);
        updateWindow.add(fields[inputParams[i].id]);
    }
    
    updateButton = Titanium.UI.createButton({
        title: 'Update',
        right: '5%',
        width: '30%'
    });
    
    function updateLineWork (e) {
        var j;
        
        progressIndicator.show();
        
        for(j = 0; j < inputParams.length; j += 1) {
            if(inputParams[j].type !== 'label') {
                //getting the text fields value and updating the existing line work obj
                lineWork[inputParams[j].id] = fields[inputParams[j].id].children[1].getValue();
            }
        }
        timeSheetLineWorkService.updateLineWorkItems(
            lineWork, function () {
                var toast = Ti.UI.createNotification({
                    message: 'Entry updated.',
                    duration: Ti.UI.NOTIFICATION_DURATION_LONG
                });
                progressIndicator.hide();
                toast.show();
                tea.updateListItem(lineWork);
            }, function () {
                var toast = Ti.UI.createNotification({
                    message: 'Failed to update entry. Blame Klimek :)',
                    duration: Ti.UI.NOTIFICATION_DURATION_LONG
                });
                progressIndicator.hide();
                toast.show();
            });
    }
    
    updateButton.addEventListener('click', updateLineWork);
    
    updateWindow.add(updateButton);
    
    return updateWindow;
};