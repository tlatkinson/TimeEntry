exports.teaData = function () {
    'use strict';
    
    var timeTableView = {},
        weekView = {},
        submitTimeSheetView = {},
        progressIndicator,
        currentTimeSheetId,
        timeSheetDays = {},
        lineCount = 0,
        timeSheetPeriodService = require('tea/services/timeSheetPeriods'),
        timeSheetService = require('tea/services/timeSheet'),
        timeSheetLineService = require('tea/services/timeSheetLines'),
        timeSheetLineWorkService = require('tea/services/timeSheetLineWork'),
        addTableRow = require('tea/templates/timeEntryRow').timeEntryRow,
        weekViewData = require('tea/templates/weekView').weekView(),
        util = require('tea/util').util(),
        tea;
    
    function lineWorkData () {
        var lineWork = {};
        
        function updateUI (timeSheetLine, date) {
            return function (lineWorkItems, params) {
                var i,
                    startDate,
                    endDate;
                    
                if(params && !lineWork[params.lineId]) {
                    lineWork[params.lineId]= lineWorkItems;
                }
                
                for(i = 0; i < lineWorkItems.length; i += 1) {
                    startDate = util.getDateFromTimeStamp(lineWorkItems[i].Start);
                    endDate = new Date();
                    endDate.setTime(startDate.getTime() + (24 * 60 * 60 * 1000));
                    
                    if((date >= startDate) && (date < endDate)) {
                        addTableRow(timeTableView, lineWorkItems[i], timeSheetLine.ProjectName, timeSheetLine.TaskName, tea);
                    }
                }
                
                lineCount -= 1;
                
                if(lineCount === 0) {
                    progressIndicator.value = 1;
                    progressIndicator.hide();
                }
            };
        }
        
        return {
            updateListView : function (timeSheetLine, date) {
                var update = updateUI(timeSheetLine, date);
                
                if(lineWork[timeSheetLine.Id]) {
                    update(lineWork[timeSheetLine.Id]);
                } else {
                    progressIndicator.show();
                    timeSheetLineWorkService.getLineWorkItems(
                        timeSheetLine.TimeSheetPeriodId, 
                        timeSheetLine.TimeSheetId, 
                        timeSheetLine.Id, 
                        update);
                }
            },
            updateListItem : function(lineWorkIn) {
                var i;
                
                if(lineWork[lineWorkIn.LineId]) {
                    for(i = 0; i < lineWork[lineWorkIn.LineId].length; i += 1) {
                        if(lineWork[lineWorkIn.LineId][i].Id === lineWorkIn.Id) {
                            lineWork[lineWorkIn.LineId][i] = lineWorkIn.Id;
                            // tea.loadDay(tea.date);
                            break;
                        }
                    }
                }
            } 
        };
    }
    
    function getTimeSheetLines () {
        var timeSheetLines = {},
           lineWorkItems = lineWorkData();
        
        function loadLineWork (date) {
            return function (lines, params) {
                var i,
                    id;
                
                lineCount = lines.length;
                if(lineCount === 0) {
                    //hide indicator
                    progressIndicator.hide();
                }
                
                if(params) {
                    id = params.timeSheetPeriodId + params.timeSheetId;
                    
                    if(!timeSheetLines[id]) {
                        timeSheetLines[id] = lines;
                    }
                }
                
                //clear and repopulate
                timeTableView.setData([]);
                for(i = 0; i < lines.length; i += 1) {
                    lineWorkItems.updateListView(lines[i], date);
                }
            };
        }
        
        lineWorkItems.getTimeSheetLines = function (timeSheet, date) {
            var loadWork = loadLineWork(date),
                id = timeSheet.TimeSheetPeriodId + timeSheet.Id;
            
            if(timeSheetLines[id]) {
                loadWork(timeSheetLines[id]);
            } else {
                progressIndicator.show();
                timeSheetLineService.getTimeSheetLines(
                    timeSheet.TimeSheetPeriodId, 
                    timeSheet.Id, 
                    loadWork);
            }
        };
        
        return lineWorkItems;
    }
    
    function getTimeSheet () {
        var timeSheet = {},
           sheetLines = getTimeSheetLines();
        
        function loadTimeSheetLines (date) {
            return function (timeSheetIn, params) {
                
                submitTimeSheetView.children[0].value = timeSheetIn.Comments;
                currentTimeSheetId = timeSheetIn.TimeSheetPeriodId;
                
                if(params && !timeSheet[params.timesheetPeriodId]) {
                    timeSheet[params.timesheetPeriodId]= timeSheetIn;
                } 
                
                sheetLines.getTimeSheetLines(timeSheetIn, date);
            };
        }
        
        sheetLines.getTimeSheet = function (timeSheetPeriod, date) {
            var loadLines = loadTimeSheetLines(date);
            
            if(timeSheet[timeSheetPeriod.Id]) {
                loadLines(timeSheet[timeSheetPeriod.Id]);
            } else {
                progressIndicator.show();
                timeSheetService.getTimeSheetById(
                    timeSheetPeriod.Id, 
                    loadLines);
            }
        };
        
        return sheetLines;
    }
    
    function getTimeSheetPeriods () {
        var timeSheetPeriods = {},
           timeSheets = getTimeSheet();
        
        function loadTimeSheet (date) {
            return function (sheetPeriods, params) {
                var i,
                    startDate,
                    endDate;
                
                if(params && !timeSheetPeriods[params.year]) {
                    timeSheetPeriods[params.year]= sheetPeriods;
                } 
                
                for(i = 0; i < sheetPeriods.length; i += 1) {
                    startDate = util.getDateFromTimeStamp(sheetPeriods[i].Start);
                    endDate = util.getDateFromTimeStamp(sheetPeriods[i].End);
                    
                    if((date >= startDate) && (date < endDate)) {
                        weekViewData.updateDates(util.getDateFromTimeStamp(sheetPeriods[i].Start), date);
                        timeSheets.getTimeSheet(sheetPeriods[i], date);
                        break;
                    }
                }
            };
        }
        
        timeSheets.getTimeSheetPeriods = function (date) {
            var loadSheet = loadTimeSheet(date), 
                year = String(date.getFullYear());
            
            tea.date = date;
            timeTableView.setData([]);
            
            if(timeSheetPeriods[year]) {
                loadSheet(timeSheetPeriods[year]);
            } else {
                progressIndicator.show();
                
                timeSheetPeriodService.getTimeSheetPeriodsByYear(
                    year,
                    loadSheet);
            }
        };
        
        return timeSheets;
    }
    
    tea = {
        initialize : function (timeTableViewIn, weekViewIn, submitTimeSheetViewIn) {
            progressIndicator = Ti.UI.Android.createProgressIndicator({
                message: 'Loading...',
                location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
                type: Ti.UI.Android.PROGRESS_INDICATOR_DETERMINANT,
                min: 0,
                max: 1
            });
            
            submitTimeSheetView = submitTimeSheetViewIn;
            
            submitTimeSheetView.children[1].addEventListener('click', function (e) {
                if(currentTimeSheetId) {
                    timeSheetService.submitTimeSheet(
                        currentTimeSheetId, 
                        submitTimeSheetView.children[0].value,
                        function () {
                            var toast = Ti.UI.createNotification({
                                message: 'Entry updated.',
                                duration: Ti.UI.NOTIFICATION_DURATION_LONG
                            });
                            progressIndicator.hide();
                            toast.show();
                        },
                        function () {
                            var toast = Ti.UI.createNotification({
                                message: 'Failed to update entry. Blame Klimek :)',
                                duration: Ti.UI.NOTIFICATION_DURATION_LONG
                            });
                            progressIndicator.hide();
                            toast.show();
                        });
                } 
            });
            
            timeTableView = timeTableViewIn;
            this.date = new Date();
            
            timeSheetDays = getTimeSheetPeriods();
            this.loadDay = timeSheetDays.getTimeSheetPeriods;
            this.updateListItem = timeSheetDays.updateListItem;
            timeSheetDays.getTimeSheetPeriods(this.date);
            
            weekViewData.initialize(weekViewIn, timeSheetDays);
        },
        showIndicator : function () {
            progressIndicator.show();
        }
    };
    
    return tea;
};
