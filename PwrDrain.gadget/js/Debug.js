/*
 * This class provides a user interface for editing styles. The argument
 * mainWindow should refer to the window of the main program and is used to
 * access global variables. The settings argument should refer to a DOM element
 * in which the user interface will be built.
 */
var Debug = function (mainWindow, settings) {
    return function () {
	var self = {};

	var name = mainWindow.pwrDrain.getCurrentStyle();
	var style = mainWindow.StyleManager.getStyle(name);

	// Notifies the main window that we have meddled with the style.
	var changed = function () {
	    mainWindow.pwrDrain.setStyle(name);
	};

	// Create an input field in the DOM element for object[field].
	var createInput = function (parent, object, field) {
	    var input = document.createElement('input');
	    input.type = 'text';
	    input.value = object[field];
	    input.size = Math.max(4, input.value.length);
	    input.onchange = function () {
		if (typeof object[field] === 'number')
		    object[field] = +input.value;
		else
		    object[field] = input.value;
		changed();
	    };
	    parent.appendChild(input);
	};

	var createSubsect = function (parent, object, field) {
	    if (typeof object[field] === 'object') {
		parent.appendChild(document.createElement('b')).
		       appendChild(document.createTextNode(field + ':'));
		for (var sect in object[field])
		    createSubsect(parent, object[field], sect);
		parent.appendChild(document.createElement('br'));
	    } else {
		parent.appendChild(document.createTextNode(field + ':'));
		createInput(parent, object, field);
	    }
	};

	// Create a configuration UI for the current style.
	var createUi = function () {
	    while (settings.hasChildNodes())
		settings.removeChild(settings.children(0));
	    for (var sect in style) {
		var p = document.createElement('p');
		createSubsect(p, style, sect);
		settings.appendChild(p);
	    }
	};

	btnMin.onclick = function () {
	    mainWindow.pwrDrain.setUiValue(style.uispec.minimum.value *
					   style.uispec.voltage);
	};
	btnMed.onclick = function () {
	    mainWindow.pwrDrain.setUiValue((style.uispec.minimum.value +
					    style.uispec.maximum.value) / 2 *
					    style.uispec.voltage);
	};
	btnMax.onclick = function () {
	    mainWindow.pwrDrain.setUiValue(style.uispec.maximum.value *
					   style.uispec.voltage);
	};
	btnNext.onclick = function () {
	    mainWindow.pwrDrain.setStyle(mainWindow.StyleManager.nextStyle(name));
	    name = mainWindow.pwrDrain.getCurrentStyle();
	    style = mainWindow.StyleManager.getStyle(name);
	    createUi();
	};

	var main = function () {
	    createUi();
	};

	self.main = main;
	return self;
    }();
};
