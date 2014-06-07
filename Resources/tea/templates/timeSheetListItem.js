exports.timeSheetListItem = {
    childTemplates: [
    {                            // Title 
        type: 'Ti.UI.Label',     // Use a label for the title 
        bindId: 'info',          // Maps to a custom info property of the item data
        properties: {            // Sets the label properties
            color: 'black',
            font: { fontFamily:'Arial', fontSize: '20dp', fontWeight:'bold' },
            left: '60dp', top: 0
        }
    },
    {                            // Subtitle
        type: 'Ti.UI.Label',     // Use a label for the subtitle
        bindId: 'es_info',       // Maps to a custom es_info property of the item data
        properties: {            // Sets the label properties
            color: 'gray',
            font: { fontFamily:'Arial', fontSize: '14dp' },
            left: '60dp', top: '25dp'
        }
    }]
};