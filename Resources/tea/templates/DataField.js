exports.DataField = function (inputParams) {
    'use strict';
    
    var baseView, 
        field,
        label,       
        labelWidth,
        fontSize = 18;
    
    baseView = Ti.UI.createView({
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        layout : 'horizontal',
        top: '1%'
    });
    
    if(inputParams.type === 'textField') {
        field = Ti.UI.createTextField({
            width : '18%',
            right : '5%',
            value : inputParams.value,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
            borderColor : '#000',
            color: '#000',
            backgroundColor : '#fff',
            borderWidth: 1,
            titleid : inputParams.id
        });
        
        labelWidth = '70%';
    } else if (inputParams.type === 'label') {
        field = Ti.UI.createLabel({
            text : inputParams.value,
            color: '#000'
        });
        
        labelWidth = '25%';
    } else if (inputParams.type === 'textArea'){
        field = Ti.UI.createTextArea({
            width : '90%',
            value : inputParams.value,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
            borderColor : '#000',
            color : '#000',
            backgroundColor : '#fff',
            borderWidth : 1,
            left : '5%',
            top : '2%',
            titleid : inputParams.id
        });
        
        labelWidth = '25%';
    }
    
    label = Ti.UI.createLabel({
        text : inputParams.name + ':',
        left : '5%',
        font : {fontSize : fontSize},
        width: labelWidth
    });
    
    baseView.add(label);
    baseView.add(field);
    
    return baseView;
};