'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element} = require('@enact/ui-test-utils/utils');

class AgateRangePickerInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}>div`));
	}

	get self () {
		return $(`#${this.id}`, browser);
	}

	get rangePicker () {
		return element('.internal_Picker_Picker_picker', this.self);
	}

	decrementer (rangePicker) {
		return element('.internal_Picker_Picker_itemDecrement', rangePicker);
	}

	incrementer (rangePicker) {
		return element('.internal_Picker_Picker_itemIncrement', rangePicker);
	}

	active (rangePicker) {
		return element('.internal_Picker_Picker_active', rangePicker);
	}
}

class RangePickerPage extends Page {
	constructor () {
		super();
		this.title = 'RangePicker Test';
		const rangePickerDefault = new AgateRangePickerInterface('rangePickerDefault');
		const rangePickerDisabled = new AgateRangePickerInterface('rangePickerDisabled');
		const rangePickerWithNegativeValues = new AgateRangePickerInterface('rangePickerWithNegativeValues');
		this.components = {rangePickerDefault, rangePickerDisabled, rangePickerWithNegativeValues};
	}

	open (urlExtra) {
		super.open('RangePicker-View', urlExtra);
	}
}

module.exports = new RangePickerPage();
