StyleManager.addStyle('edgcunbe', {
    license: 'Photo � 2007 by Leo Reynolds CC Attribution-NonCommercial-ShareAlike 2.0 Generic',
    docked: {
	src: 'docked.png',
	shadow: { colour: 'Black', alpha: 100, radius: 9, xofs: 1, yofs: 1 },
	softEdge: 0,
	hand: {
	    src: 'hand.png',
	    //shadow: { colour: 'Black', alpha: 255, radius: 4, xofs: 2, yofs: 3 },
	    softEdge: 0,
	    width: 2, height: 105, left: -3, top: 25
	},
	uispec: {
	    D: .2, friction: 11.5,
	    voltage: 12,
	    minimum: { value: 0, angle: -56 },
	    maximum: { value: 5000, angle: 52 },
	    extreme: { minimum: -65, maximum: 62 }
	}
    }
});
