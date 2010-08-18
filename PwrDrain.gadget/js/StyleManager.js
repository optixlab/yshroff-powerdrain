/**
 * This singleton class is in charge of managing the collection of styles and
 * adjusting the UI to a given style. It provides methods to add a style, to
 * query styles and to activate a style.
 */
var StyleManager = function () {
    var self = {};
    var styles = {};

    var setShadow = function(obj, shadow) {
	obj.addShadow(shadow.colour, shadow.radius, shadow.alpha,
		      shadow.xofs, shadow.yofs);
    };
    var addStyle = function (name, style) {
	styles[name] = style;
    };
    var hasStyle = function (name) {
	return typeof styles[name] === 'object';
    };
    var hasUndock = function (name) {
	return typeof styles[name].undocked === 'object';
    };
    var getStyle = function (name) {
	if (typeof styles[name] !== 'object')
	    throw new Error(ErrMsg.noStyle(name));
	var style = styles[name];
	if (typeof style.docked !== 'object')
	    throw new Error(ErrMsg.noBackground(name));
	if (typeof style.undocked === 'object' && !System.Gadget.docked)
	    return style.undocked;
	else
	    return style.docked;
    };

    // Return the style that alphabetically succeeds the given one, or the first style.
    var nextStyle = function (name) {
	var min, next;
	for (var style in styles) {
	    if (min === undefined || style < min)
		min = style;
	    if (name < style && (next === undefined || style < next))
		next = style;
	}
	return next !== undefined ? next : min;
    };

    var setStyle = function (name, body, bgnd) {
	var style = getStyle(name);
	bgnd.removeObjects();
	// Set background width to 0 to ensure dock/undock updates work.
	bgnd.style.width = 0;

	bgnd.src = 'styles/' + name + '/' + style.src;
	if (typeof styles[name].license === 'string')
	    bgnd.title = styles[name].license;

	// Set background shadow specified by the style.
	if (typeof style.shadow === 'object')
	    setShadow(bgnd, style.shadow);
	if (typeof style.softEdge === 'number')
	    bgnd.softEdge = style.softEdge;

	// Transfer background image size to body element.
	body.style.pixelWidth = bgnd.style.pixelWidth;
	body.style.pixelHeight = bgnd.style.pixelHeight;

	// Set up the hand as specified by the style.
	if (typeof style.hand !== 'object')
	    throw new Error(ErrMsg.noHand(name));
	var hand = bgnd.addImageObject('styles/' + name + '/' + style.hand.src,
				       bgnd.style.pixelWidth / 2 + style.hand.left,
				       bgnd.style.pixelHeight / 2 + style.hand.top);
	if (typeof style.hand.width === 'number')
	    hand.width = style.hand.width;
	if (typeof style.hand.height === 'number')
	    hand.height = style.hand.height;
	if (typeof style.hand.shadow === 'object')
	    setShadow(hand, style.hand.shadow);
	if (typeof style.hand.softEdge === 'number')
	    hand.softEdge = style.hand.softEdge;

	// Return the UiManager for the created hand element.
	return UiManager(hand, style.uispec);
    };

    self.addStyle = addStyle;
    self.hasStyle = hasStyle;
    self.hasUndock = hasUndock;
    self.nextStyle = nextStyle;
    self.setStyle = setStyle;

    // The following calls are exposed for debugging and testing:
    self.getStyle = getStyle;

    return self;
}();
