(function (factory) {

	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = function (jq) {
			factory(jq, window, document);
		}
	} else {
		factory(jQuery, window, document);
	}
}(function ($, window, document, undefined) {
	var timer;
	var Timer = function (targetElement) {
		this._options = {};
		this.targetElement = targetElement;
		return this;
	};

	Timer.start = function (userOptions, targetElement) {
		timer = new Timer(targetElement);
		mergeOptions(timer, userOptions);
		return timer.start(userOptions);
	};

	function mergeOptions(timer, opts) {
		opts = opts || {};
		var classNames = opts.classNames || {};
		timer._options.classNameSeconds = classNames.seconds || 'jst-seconds', timer._options.classNameMinutes = classNames.minutes || 'jst-minutes', timer._options.classNameClearDiv = classNames.clearDiv || 'jst-clearDiv', timer._options.classNameTimeout = classNames.timeout || 'jst-timeout';
	}

	