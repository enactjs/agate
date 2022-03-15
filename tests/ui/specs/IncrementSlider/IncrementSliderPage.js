'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class IncrementSliderInterface {
	constructor (className) {
		this.className = className;
		this.selector = `.${this.className}`;
	}

	async focusSlider () {
		return browser.execute((el) => el.focus(), await $(`.${this.className}` + ' .IncrementSlider_IncrementSlider_slider'));
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

	get tooltip () {
		return $(this.selector + ' .ProgressBar_ProgressBarTooltip_tooltip');
	}

	async knobPositionHorizontal () {
		return parseInt((await this.knob.getCSSProperty('left')).value);
	}

	async knobPositionVertical () {
		return parseInt((await this.knob.getCSSProperty('bottom')).value);
	}

	async incrementSliderFillWidth () {
		return parseInt((await $(this.selector + ' .Slider_Slider_fill').getCSSProperty('width')).value);
	}
}

class IncrementSliderPage extends Page {
	constructor () {
		super();
		this.title = 'IncrementSlider Test';
		const incrementSliderDefault = new IncrementSliderInterface('incrementSliderDefault');
		const incrementSliderDisabled = new IncrementSliderInterface('incrementSliderDisabled');
		const incrementSliderCustomProgressAnchor = new IncrementSliderInterface('incrementSliderCustomProgressAnchor');
		const incrementSliderWithTooltip = new IncrementSliderInterface('incrementSliderWithTooltip');
		const incrementSliderVertical = new IncrementSliderInterface('incrementSliderVertical');
		const incrementSliderVerticalDisabled = new IncrementSliderInterface('incrementSliderVerticalDisabled');
		this.components = {incrementSliderDefault, incrementSliderDisabled, incrementSliderCustomProgressAnchor, incrementSliderWithTooltip, incrementSliderVertical, incrementSliderVerticalDisabled};
	}

	async open (urlExtra) {
		await super.open('IncrementSlider-View', urlExtra);
	}
}

module.exports = new IncrementSliderPage();
