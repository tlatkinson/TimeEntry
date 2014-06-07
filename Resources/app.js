//http://docs.appcelerator.com/titanium/3.0/#!/api/Titanium.UI.ListItem
(function() {
    'use strict';
	// var util = require('tea/util');
	
	//TODO call timeSheetPeriods, timeSheet, timeSheetLines each week
	//store week to week basis
	//update when change week
	//load from memory when change day
	
	var timeSheetWindow,
	   listView,
	   timeSheetListItemTemplate = require('tea/templates/timeSheetListItem').timeSheetListItem,
	   listItems = [],
	   timeEntrySection,
	   timeEntries,
	   timeSheetPeriodService = require('tea/services/timeSheetPeriods'),
	   timeSheetService = require('tea/services/timeSheet'),
	   timeSheetLineService = require('tea/services/timeSheetLines'),
	   timeSheetLineWorkService = require('tea/services/timeSheetLineWork'),
	   entries;
	
	timeSheetWindow = Titanium.UI.createWindow({
	    title:'Rawr',
	    backgroundColor:'#fff',
	    layout: 'vertical'
	});
	
	//List view
	listView = Titanium.UI.createListView({
        height: Ti.UI.SIZE,
        width:Ti.UI.FILL,
        layout: 'vertical',
        templates: { 'timeSheetTemplate': timeSheetListItemTemplate },
        defaultItemTemplate: 'timeSheetTemplate'
	});
	
	function getYear () {
	    return '2014';
	}
	
	function getLineWork () {
	    var lineWork = {};
	    
	    function updageUI(lines) {
            Ti.API.info('yay');
            lines.forEach(function (line) {
                Ti.API.info('yay');
            });
        }
	    
	    return function (timeSheetLine) {
	        
	        if(lineWork[timeSheetLine.Id]) {
	            updageUI(lineWork[timeSheetLine.Id]);
	        } else {
	            timeSheetLineWorkService.getLineWorkItems(
                timeSheetLine.TimeSheetPeriodId, 
                timeSheetLine.TimeSheetId, 
                timeSheetLine.Id, 
                updageUI);
	        }
	    };
	}
	
	function getTimeSheetLines () {
	    var timeSheetLines = {},
	       lineWorkItems = getLineWork();
	    
	    function loadLineWork (lines) {
	        //TODO load by day
	        lineWorkItems(lines[0]);
	    }
	    
	    return function (timeSheet) {
	        if(timeSheetLines[timeSheet.Id]) {
	            loadLineWork(timeSheetLines[timeSheet.Id]);
	        } else {
	            timeSheetLineService.getTimeSheetLines(
                    timeSheet.TimeSheetPeriodId, 
                    timeSheet.Id, 
                    loadLineWork);
	        }
	    };
	}
	
	function getTimeSheet () {
        var timeSheet = {},
           sheetLines = getTimeSheetLines();
        
        function loadTimeSheetLines (timeSheet) {
            //TODO must load each line - dif projects
            sheetLines(timeSheet);
        }
        
        return function (timeSheetPeriod) {
            if(timeSheet[timeSheetPeriod.Id]) {
                loadTimeSheetLines(timeSheet[timeSheetPeriod.Id]);
            } else {
                timeSheetService.getTimeSheetById(
                    timeSheetPeriod.Id, 
                    loadTimeSheetLines);
            }
        };
    }
    
    function getTimeSheetPeriods () {
        var timeSheetPeriods = {},
           timeSheets = getTimeSheet();
        
        function loadTimeSheet (sheetPeriods) {
            //TODO must determine which id
            timeSheets(sheetPeriods[20]);
        }
        
        return function (year) {
            if(timeSheetPeriods[year]) {
                loadTimeSheet(timeSheetPeriods[year]);
            } else {
                timeSheetPeriodService.getTimeSheetPeriodsByYear(
                    year,
                    loadTimeSheet);
            }
        };
    }
	
	var ts = getTimeSheetPeriods();
	ts('2014');
	// timeSheetPeriodService.getTimeSheetPeriodsByYear(getYear(), function (timeSheetPeriods) {
	    // timeSheetService.getTimeSheetById(timeSheetPeriods[20].Id, function (timeSheet) {
	        // timeSheetLineService.getTimeSheetLines(timeSheet.TimeSheetPeriodId, timeSheet.Id, function (timeSheetLines) {
	            // timeSheetLineWorkService.getLineWorkItems(timeSheetLines[0].TimeSheetPeriodId, timeSheetLines[0].TimeSheetId, timeSheetLines[0].Id, function (lines) {
	                // lines.forEach(function (line) {
	                    // Ti.API.info('yay');
	                // });
	            // });
	        // });
	    // });
	// });
	
	timeEntrySection = Ti.UI.createListSection();
    timeEntries = [
        { info: {text: 'Corn'}, es_info: {text: 'Maiz'}},
        { info: {text: 'Rice'}, es_info: {text: 'Arroz'}}
    ];
        
	timeEntrySection.setItems(timeEntries);
	listItems.push(timeEntrySection);
	
	listView.setSections(listItems);
	
	timeSheetWindow.add(listView);
	timeSheetWindow.open();
	
	// timeSheetPeriodService.getTimeSheetPeriodsByYear('2014', function () {
	    // //call
	// });
	
	// timeEntries.push({ info: {text: 'Corn'}, es_info: {text: 'Maiz'}});
	// timeEntrySection.setItems(timeEntries);
}());