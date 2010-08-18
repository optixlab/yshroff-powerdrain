StyleManager.addStyle('kuwano', {
    license: 'Photo © 2006 by stollers CC Attribution-ShareAlike 2.0 Generic',
    docked: {
	src: 'docked.png',
	shadow: { colour: 'Black', alpha: 100, radius: 9, xofs: 1, yofs: 1 },
	softEdge: 0,
	hand: {
	    src: 'hand.png',
	    //shadow: { colour: 'Black', alpha: 255, radius: 4, xofs: 2, yofs: 3 },
	    softEdge: 0,
	    width: 2, height: 155, left: 0, top: 38
	},
	uispec: {
	    D: .2, friction: 5,
	    voltage: 12,
	    minimum: { value: 0, angle: -38 },
	    maximum: { value: 20000, angle: 38 },
	    extreme: { minimum: -90, maximum: 90 }
	}
    }
});
