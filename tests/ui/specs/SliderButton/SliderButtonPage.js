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
	knobValue () {
		return $(this.selector + ' .SliderButton_SliderButton_knob');
	}
	clickableItem (index) {
		return $(this.selector + ` .SliderButton_SliderButton_track>div:nth-child(${index})`);
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
