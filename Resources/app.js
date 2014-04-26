//http://docs.appcelerator.com/titanium/3.0/#!/api/Titanium.UI.ListItem
(function() {
	// var util = require('tea/util');
	
	var timeSheetWindow,
	   test,
	   listView,
	   tasks,
	   data,
	   section,
	   i;
	
	timeSheetWindow = Titanium.UI.createWindow({
	    title:'Rawr',
	    backgroundColor:'#fff'
	});
	
   test = Titanium.UI.createLabel({
        color:'#999',
        text:'I am Window rawrrr',
        font:{fontSize:20,fontFamily:'Helvetica Neue'},
        textAlign:'center',
        width:'auto'
    });
	
	//List view
	listView = Titanium.UI.createListView({
        height: Ti.UI.SIZE,
        width:Ti.UI.FILL,
        layout: 'horizontal'
	});
	
	
	timeSheetWindow.add(listView);
	timeSheetWindow.add(test);
	timeSheetWindow.open();

}());