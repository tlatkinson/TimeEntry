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
        
        function loadLineWork (date) {
            return function (lines, params) {
                var i,
                    id;
                    
                if(params) {
                    id = params.timeSheetPeriodId + params.timeSheetId;
                    Ti.API.log(id);
                    
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
        
        return function (timeSheet, date) {
            var loadWork = loadLineWork(date),
                id = timeSheet.TimeSheetPeriodId + timeSheet.Id;
            
            Ti.API.log(id);
            if(timeSheetLines[id]) {
                loadWork(timeSheetLines[id]);
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
            return function (timeSheetLines, params) {
                if(params && !timeSheet[params.timesheetPeriodId]) {
                    timeSheet[params.timesheetPeriodId]= timeSheetLines;
                } 
                
                sheetLines(timeSheetLines, date);
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
                        timeSheets(sheetPeriods[i], date);
                        break;
                    }
                }
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
            //temp - go back 3 weeks
            weekDate.setTime(weekDate.getTime() - (24 * 60 * 60 * 1000 * 7 * 3));
            
            timeTableView = timeTableViewIn;
            
            timeSheetDays = getTimeSheetPeriods();
            timeSheetDays(weekDate);
            
            weekViewData.initialize(weekViewIn, timeSheetDays);
        },
        loadDay : timeSheetDays
    };
};
