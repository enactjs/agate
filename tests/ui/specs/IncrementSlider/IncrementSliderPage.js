'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class IncrementSliderInterface {
	constructor (className) {
		this.className = className;
		this.selector = `.${this.className}`;
	}

	focusSlider () {
		return browser.execute((el) => el.focus(), $(`.${this.className}` + ' .IncrementSlider_IncrementSlider_slider'));
	}

	get self () {
		return $(this.selector);
	}

	get knob () {
		return $(this.selector + ' .IncrementSlider_IncrementSlider_knob');
	}

	get decrementButton () {
		return $(this.selector + ' .IncrementSlider_IncrementSlider_decrementButton');
	}

	get incrementButton () {
		return $(this.selector + ' .IncrementSlider_IncrementSlider_incrementButton');
	}

	get knobPositionHorizontal () {
		return parseInt(this.knob.getCSSProperty('left').value);
	}

	get knobPositionVertical () {
		return parseInt(this.knob.getCSSProperty('bottom').value);
	}

	get incrementSliderFillWidth () {
		return parseInt($(this.selector + ' .Slider_Slider_fill').getCSSProperty('width').value);
	}
}

class IncrementSliderPage extends Page {
	constructor () {
		super();
		this.title = 'IncrementSlider Test';
		const incrementSliderDefault = new IncrementSliderInterface('incrementSliderDefault');
		const incrementSliderDisabled = new IncrementSliderInterface('incrementSliderDisabled');
		const incrementSliderCustomProgressAnchor = new IncrementSliderInterface('incrementSliderCustomProgressAnchor');
		const incrementSliderVertical = new IncrementSliderInterface('incrementSliderVertical');
		const incrementSliderVerticalDisabled = new IncrementSliderInterface('incrementSliderVerticalDisabled');
		const incrementSliderActivateOnFocus = new IncrementSliderInterface('incrementSliderActivateOnFocus');
		this.components = {incrementSliderDefault, incrementSliderDisabled, incrementSliderCustomProgressAnchor, incrementSliderVertical, incrementSliderVerticalDisabled, incrementSliderActivateOnFocus};
	}

	open (urlExtra) {
		super.open('IncrementSlider-View', urlExtra);
	}
}

module.exports = new IncrementSliderPage();
