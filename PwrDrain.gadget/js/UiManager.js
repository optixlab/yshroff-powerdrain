/**
 * Create the UiManager for the given hand image object, using the specification.
 *
 * The spec should contain:
 *   minimum, maximum: the minimum and maximum values and their angles.
 *   D: the hand's feather constant.
 */
var UiManager = function (hand, spec) {
    hand.rotation = spec.minimum.angle;

    return function () {
	var self = {};
	var target = 0;
	var velocity = 0;
	var fps = 30;

	var setValue = function (value) {
	    value /= spec.voltage;
	    target = (spec.minimum.angle * (spec.maximum.value - value) + spec.maximum.angle * (value - spec.minimum.value)) / (spec.maximum.value - spec.minimum.value);
	    update();
	};

	var saturate = function (value, min, max) {
	    return Math.max(min, Math.min(max, value));
	};

	var update = function () {
	    // Kinetic friction:
	    if (velocity > 0)
		velocity = Math.max(0, velocity - spec.friction);
	    else if (velocity < 0)
		velocity = Math.min(0, velocity + spec.friction);
	    velocity += spec.D * (target - hand.rotation);
	    var r = hand.rotation + velocity;
	    r = saturate(r, spec.extreme.minimum, spec.extreme.maximum);
	    hand.rotation = r;
	    if (Math.abs(r - saturate(target, spec.extreme.minimum, spec.extreme.maximum)) >= .5 || Math.abs(velocity) >= .5)
		setTimeout(arguments.callee, 1000 / fps);
	};

	self.setValue = setValue;
	return self;
    }();
};
