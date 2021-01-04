'use strict';
const {Page} = require('@enact/ui-test-utils/utils');

class SliderButtonInterface {
	constructor (id) {
		this.id = id;
		this.selector = `#${this.id}`;
	}

	get self () {
		return $(this.selector);
	}
	getKnob () {
		return $(this.selector + ' .SliderButton_SliderButton_knob');
	}
	clickableItem (index) {
		const parent = $(this.selector + ' .SliderButton_SliderButton_track');

		return parent.$$('.SliderButton_SliderButton_client')[index];
	}
}

class SliderButtonPage extends Page {
	constructor () {
		super();
		this.title = 'SliderButton Test';
		const sliderButtonThreeItems = new SliderButtonInterface('sliderButton1');
		const sliderButtonFiveItems = new SliderButtonInterface('sliderButton2');
		const sliderButtonDisabled = new SliderButtonInterface('sliderButton3');

		this.components = {sliderButtonThreeItems, sliderButtonFiveItems, sliderButtonDisabled};
	}

	open (urlExtra) {
		super.open('SliderButton-View', urlExtra);
	}
}

module.exports = new SliderButtonPage();
