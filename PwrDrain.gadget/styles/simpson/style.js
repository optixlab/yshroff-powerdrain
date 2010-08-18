StyleManager.addStyle('simpson', {
    license: 'Photo © 2008 by Hillwalker CC Attribution 2.0 Generic',
    docked: {
	src: 'docked.png',
	shadow: { colour: 'Black', alpha: 100, radius: 9, xofs: -1, yofs: 1 },
	softEdge: 0,
	hand: {
	    src: 'dockedhand.png',
	    shadow: { colour: 'Black', alpha: 100, radius: 3, xofs: -2, yofs: 1 },
	    softEdge: 0,
	    left: 1, top: -28
	},
	uispec: {
	    D: .3, friction: 15.5,
	    voltage: 12,
	    minimum: { value: 0, angle: -46 },
	    maximum: { value: 5000, angle: 43 },
	    extreme: { minimum: -53, maximum: 48 }
	}
    }
});
