var ErrMsg = {
  noMeters: function () { return "No suitable power meters found in the system. This might happen if you aren't using a battery-powered device."; },
  noStyle: function (name) { return 'Style "' + name + '" not found.'; },
  noBackground: function (name) { return 'Style "' + name + '" does not specify background.'; },
  noHand: function (name) { return 'Style "' + name + '" does not specify hand.'; }
};
