exports.teaData = function () {
    'use strict';
    
    var timeTableView = {},
        weekView = {},
        timeSheetDays = {},
        timeSheetPeriodService = require('tea/services/timeSheetPeriods'),
        timeSheetService = require('tea/services/timeSheet'),
        timeSheetLineService = require('tea/services/timeSheetLines'),
        timeSheetLineWorkService = require('tea/services/timeSheetLineWork'),
        addTableRow = require('tea/templates/timeEntryRow').timeEntryRow,
        weekViewData = require('tea/templates/weekView').weekView(),
        util = require('tea/util').util();
    
    function lineWorkData () {
        var lineWork = {};
        
        //TODO add to list view
        function updateUI (timeSheetLine, date) {
            return function (lineWorkItems) {
                var i,
                    startDate,
                    endDate;
                
                for(i = 0; i < lineWorkItems.length; i += 1) {
                    startDate = util.getDateFromTimeStamp(lineWorkItems[i].Start);
                    endDate = new Date();
                    endDate.setTime(startDate.getTime() + (24 * 60 * 60 * 1000));
                    
                    Ti.API.log(i + ' ' + date + ' ' + startDate + ' ' + endDate);
                    if((date >= startDate) && (date <= endDate)) {
                        Ti.API.log(i + ' found');
                        addTableRow(timeTableView, lineWorkItems[i].ActualWork, timeSheetLine.ProjectName, timeSheetLine.TaskName);
                    }
                }
            };
        }
        
        return {
            updateListView : function (timeSheetLine, date) {
                var update = updateUI(timeSheetLine, date);
                
                if(lineWork[timeSheetLine.Id]) {
                    update(lineWork[timeSheetLine.Id]);
                } else {
                    timeSheetLineWorkService.getLineWorkItems(
                        timeSheetLine.TimeSheetPeriodId, 
                        timeSheetLine.TimeSheetId, 
                        timeSheetLine.Id, 
                        update);
                }
            }
        };
    }
    
    function getTimeSheetLines () {
        var timeSheetLines = {},
           lineWorkItems = lineWorkData();
        
        //TODO empty list view
        function loadLineWork (date) {
            return function (lines) {
                var i;
                for(i = 0; i < lines.length; i += 1) {
                    lineWorkItems.updateListView(lines[i], date);
                }
            };
        }
        
        return function (timeSheet, date) {
            var loadWork = loadLineWork(date);
            
            if(timeSheetLines[timeSheet.Id]) {
                loadWork(timeSheetLines[timeSheet.Id]);
            } else {
                timeSheetLineService.getTimeSheetLines(
                    timeSheet.TimeSheetPeriodId, 
                    timeSheet.Id, 
                    loadWork);
            }
        };
    }
    
    function getTimeSheet () {
        var timeSheet = {},
           sheetLines = getTimeSheetLines();
        
        function loadTimeSheetLines (date) {
            return function (timeSheet) {
                sheetLines(timeSheet, date);
            };
        }
        
        return function (timeSheetPeriod, date) {
            var loadLines = loadTimeSheetLines(date);
            
            if(timeSheet[timeSheetPeriod.Id]) {
                loadLines(timeSheet[timeSheetPeriod.Id]);
            } else {
                timeSheetService.getTimeSheetById(
                    timeSheetPeriod.Id, 
                    loadLines);
            }
        };
    }
    
    function getTimeSheetPeriods () {
        var timeSheetPeriods = {},
           timeSheets = getTimeSheet();
        
        function loadTimeSheet (date) {
            return function (sheetPeriods) {
                var i,
                    startDate,
                    endDate;
                
                for(i = 0; i < sheetPeriods.length; i += 1) {
                    startDate = util.getDateFromTimeStamp(sheetPeriods[i].Start);
                    endDate = util.getDateFromTimeStamp(sheetPeriods[i].End);
                    
                    
                    Ti.API.log(i + ' ' + date + ' ' + startDate + ' ' + endDate);
                    if((date >= startDate) && (date <= endDate)) {
                        Ti.API.log(i + ' found');
                        break;
                    }
                }
                
                weekViewData.updateDates(util.getDateFromTimeStamp(sheetPeriods[i].Start));
                timeSheets(sheetPeriods[i], date);
            };
        }
        
        return function (date) {
            var loadSheet = loadTimeSheet(date), 
                year = String(date.getFullYear());
            
            if(timeSheetPeriods[year]) {
                loadSheet(timeSheetPeriods[year]);
            } else {
                timeSheetPeriodService.getTimeSheetPeriodsByYear(
                    year,
                    loadSheet);
            }
        };
    }
    
    return {
        initialize : function (timeTableViewIn, weekViewIn) {
            var weekDate = new Date();
            
            timeTableView = timeTableViewIn;
            
            addTableRow(timeTableView, 'Hours', 'Project', 'Task', true);
            timeSheetDays = getTimeSheetPeriods();
            weekDate.setTime(weekDate.getTime() - (24 * 60 * 60 * 1000 * 7 * 3));
            timeSheetDays(weekDate);
            
            weekViewData.initialize(weekViewIn);
        },
        loadDay : timeSheetDays
        // addTimeEntryRow : function (hours, project, task, initial) {
            // addTableRow(tableView, hours, project, task, initial);
        // }
    };
};
