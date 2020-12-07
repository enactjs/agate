'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element} = require('@enact/ui-test-utils/utils');

class SliderInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}>div`));
	}

	get self () {
		return $(`#${this.id}`, browser);
	}

	get slider () {
		return element('.internal_Picker_Picker_picker', this.self);
	}

	decrementer (slider) {
		return element('.internal_Picker_Picker_itemDecrement', slider);
	}

	incrementer (slider) {
		return element('.internal_Picker_Picker_itemIncrement', slider);
	}

	active (slider) {
		return element('.internal_Picker_Picker_active', slider);
	}
}

class SliderPage extends Page {
	constructor () {
		super();
		this.title = 'Slider Test';
		const sliderDefault = new SliderInterface('sliderDefault');
		const sliderDisabled = new SliderInterface('sliderDisabled');
		const sliderCustomProgressAnchor = new SliderInterface('sliderCustomProgressAnchor');
		const sliderVertical = new SliderInterface('sliderVertical');
		const sliderActivateOnFocus = new SliderInterface('sliderActivateOnFocus');
		this.components = {sliderDefault, sliderDisabled, sliderCustomProgressAnchor, sliderVertical, sliderActivateOnFocus};
	}

	open (urlExtra) {
		super.open('Slider-View', urlExtra);
	}
}

module.exports = new SliderPage();
