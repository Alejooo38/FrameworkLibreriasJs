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

Timer.prototype.start = function (options) {
		var that = this;
		var createSubDivs = function (timerBoxElement) {
			var seconds = document.createElement('div');
			$(seconds).css('display', 'inline');
			seconds.className = that._options.classNameSeconds;

			var minutes = document.createElement('div');
			$(minutes).css('display', 'inline');
			minutes.className = that._options.classNameMinutes;

			var clearDiv = document.createElement('div');
			clearDiv.className = that._options.classNameClearDiv;
			return timerBoxElement.
			append(minutes).
			append(seconds).
			append(clearDiv);
		};

		this.targetElement.each(function (_index, timerBox) {
			var that = this;
			var timerBoxElement = $(timerBox);
			var cssClassSnapshot = timerBoxElement.attr('class');

			timerBoxElement.on('complete', function () {
				clearInterval(timerBoxElement.intervalId);
			});

			timerBoxElement.on('complete', function () {
				timerBoxElement.onComplete(timerBoxElement);
			});

			timerBoxElement.on('complete', function () {
				timerBoxElement.addClass(that._options.classNameTimeout);
			});

			timerBoxElement.on('complete', function () {
				if (options && options.loop === true) {
					timer.resetTimer(timerBoxElement, options, cssClassSnapshot);
				}
			});

			timerBoxElement.on('pause', function () {
				clearInterval(timerBoxElement.intervalId);
				timerBoxElement.paused = true;
			});
			timerBoxElement.on('resume', function () {
				timerBoxElement.paused = false;
				that.startCountdown(timerBoxElement, {
					secondsLeft: timerBoxElement.data('timeLeft')
				});
			});
			createSubDivs(timerBoxElement);
			return this.startCountdown(timerBoxElement, options);
		}.bind(this));
	};

	Timer.prototype.resetTimer = function ($timerBox, options, css) {
		var interval = 0;
		if (options.loopInterval) {
			interval = parseInt(options.loopInterval, 10) * 1000;
		}
		setTimeout(function () {
			$timerBox.trigger('reset');
			$timerBox.attr('class', css + ' loop');
			timer.startCountdown($timerBox, options);
		}, interval);
	};

	Timer.prototype.fetchSecondsLeft = function (element) {
		var secondsLeft = element.data('seconds-left');
		var minutesLeft = element.data('minutes-left');
		if (Number.isFinite(secondsLeft)) {
			return parseInt(secondsLeft, 10);
		} else if (Number.isFinite(minutesLeft)) {
			return parseFloat(minutesLeft) * 60;
		} else {
			throw 'Missing time data';
		}
	};

	Timer.prototype.startCountdown = function (element, options) {
		options = options || {};
		var intervalId = null;
		var defaultComplete = function () {
			clearInterval(intervalId);
			return this.clearTimer(element);
		}.bind(this);
		element.onComplete = options.onComplete || defaultComplete;
		element.allowPause = options.allowPause || false;
		if (element.allowPause) {
			element.on('click', function () {
				if (element.paused) {
					element.trigger('resume');
				} else {
					element.trigger('pause');
				}
			});
		}

		var secondsLeft = options.secondsLeft || this.fetchSecondsLeft(element);
		var refreshRate = options.refreshRate || 1000;
		var endTime = secondsLeft + this.currentTime();
		var timeLeft = endTime - this.currentTime();

		this.setFinalValue(this.formatTimeLeft(timeLeft), element);

		intervalId = setInterval((function () {
			timeLeft = endTime - this.currentTime();

			if (timeLeft < 0) {
				timeLeft = 0;
			}
			element.data('timeLeft', timeLeft);
			this.setFinalValue(this.formatTimeLeft(timeLeft), element);
		}.bind(this)), refreshRate);
		element.intervalId = intervalId;
	};
	