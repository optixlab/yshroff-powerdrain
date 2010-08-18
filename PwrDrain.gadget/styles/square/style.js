StyleManager.addStyle('square', {
    license: 'Photo © 2005 by Image Zen CC Attribution-NonCommercial-ShareAlike 2.0 Generic',
    docked: {
	src: 'docked.png',
	shadow: { colour: 'Black', alpha: 100, radius: 9, xofs: 1, yofs: 1 },
	softEdge: 0,
	hand: {
	    src: 'dockedhand.png',
	    //shadow: { colour: 'Black', alpha: 255, radius: 4, xofs: 2, yofs: 3 },
	    softEdge: 0,
	    left: -5, top: -33
	},
	uispec: {
	    D: .3, friction: 10.5,
	    voltage: 12,
	    minimum: { value: 5000, angle: -33 },
	    maximum: { value: 20000, angle: 27 },
	    extreme: { minimum: -40 /* strictly incorrect, but it's non-linear. */, maximum: 48 }
	}
    }
});
