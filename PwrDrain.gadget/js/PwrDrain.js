var PwrDrain = function(body, bgnd) {
    return function () {
	var self = {};
	var ui;
	var powerMeter;

	// The WMI class we're interested in.
	var wmiPowerMeterClass = 'Win32_PowerMeter';

	// Retrieve the stored style.
	var getCurrentStyle = function () {
	    var style = System.Gadget.Settings.readString('style');
	    if (!StyleManager.hasStyle(style))
		style = 'simpson';
	    return style;
	};

	var setStyle = function (name) {
	    System.Gadget.Settings.writeString('style', name);
	    ui = StyleManager.setStyle(name, body, bgnd);
	    if (StyleManager.hasUndock(name)) {
		System.Gadget.onDock = System.Gadget.onUndock = function () {
		    setStyle(getCurrentStyle());
		};
	    } else {
		System.Gadget.onDock = System.Gadget.onUndock = null;
	    }
	};

	var setUiValue = function (value) {
	    ui.setValue(value);
	};

	var updateUi = function () {
	    if (System.Gadget.visible) {
		powerMeter.Refresh_();
		setUiValue(powerMeter.CurrentReading);
		setTimeout(arguments.callee, 1000);
	    }
	};

	var main = function() {
	    // Activate the stored style.
	    setStyle(getCurrentStyle(), body, bgnd);

	    // Connect to the 'power' namespace of the CIMv2 (Common Information Model) implementation.
	    var wmiPower = new ActiveXObject('WbemScripting.SWbemLocator').
			    ConnectServer('.', 'root\\cimv2\\power');

	    // Try to fetch the power meter we were using last time.
	    var meterName = System.Gadget.Settings.readString('meterName');

	    // If we couldn't get the previous meter, use a random one.
	    if (typeof powerMeter !== 'object' || powerMeter.Path_.Class !== wmiPowerMeterClass) {
		var powerMeters = wmiPower.InstancesOf(wmiPowerMeterClass);
		if (powerMeters.Count !== 0)
		    powerMeter = powerMeters.ItemIndex(0);
		for (var i = powerMeters.Count - 1; i != -1; --i) {
		    var meter = powerMeters.ItemIndex(i);
		    if (meter.DeviceID === meterName) {
			powerMeter = meter;
			break;
		    }
		}
	    }
	    if (typeof powerMeter !== 'object' || powerMeter.Path_.Class !== wmiPowerMeterClass)
		throw new Error(ErrMsg.noMeters());
	    System.Gadget.Settings.writeString('meterName', powerMeter.DeviceID);

	    // Now we have a power meter, update the display unless we're debugging.
	    if (true) {
		// Set up event handler that restarts our update loop when we become visible.
		System.Gadget.visibilityChanged = function () {
		    if (System.Gadget.visible)
			updateUi();
		};

		// Flip styles on dblclick
		body.ondblclick = function () {
		    setStyle(StyleManager.nextStyle(getCurrentStyle()));
		};
	    } else {
		// Toggle the debug flyout:
		body.ondblclick = function () {
		    System.Gadget.Flyout.file = 'Debug.html';
		    System.Gadget.Flyout.show = !System.Gadget.Flyout.show;
		};
	    }
	};

	self.main = main;

	// The following two methods are exposed for debugging and testing:
	self.getCurrentStyle = getCurrentStyle;
	self.setStyle = setStyle;
	self.setUiValue = setUiValue;

	return self;
    }();
};
