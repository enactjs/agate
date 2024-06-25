'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element} = require('@enact/ui-test-utils/utils');

class RangePickerInterface {
	constructor (id) {
		this.id = id;
	}

	async focus () {
		return browser.execute((el) => el.focus(), await $(`#${this.id}>div`));
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
		const rangePickerDefault = new RangePickerInterface('rangePickerDefault');
		const rangePickerDisabled = new RangePickerInterface('rangePickerDisabled');
		const rangePickerWithNegativeValues = new RangePickerInterface('rangePickerWithNegativeValues');
		const rangePickerWrap = new RangePickerInterface('rangePickerWrap');
		const rangePickerHorizontalDefault = new RangePickerInterface('rangePickerHorizontalDefault');
		const rangePickerHorizontalDisabled = new RangePickerInterface('rangePickerHorizontalDisabled');
		const rangePickerHorizontalWithNegativeValues = new RangePickerInterface('rangePickerHorizontalWithNegativeValues');
		const rangePickerHorizontalWrap = new RangePickerInterface('rangePickerHorizontalWrap');

		this.components = {
			rangePickerDefault,
			rangePickerDisabled,
			rangePickerWithNegativeValues,
			rangePickerWrap,
			rangePickerHorizontalDefault,
			rangePickerHorizontalDisabled,
			rangePickerHorizontalWithNegativeValues,
			rangePickerHorizontalWrap
		};
	}

	async open (urlExtra) {
		await super.open('RangePicker-View', urlExtra);
	}
}

module.exports = new RangePickerPage();
