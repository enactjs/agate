'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

class PickerInterface {
	constructor (id) {
		this.id = id;
	}

	async focus () {
		return browser.execute((el) => el.focus(), await $(`#${this.id}>div`));
	}

	get self () {
		return element(`#${this.id}`, browser);
	}

	get day () {
		return element('.DatePicker_DatePicker_day', this.self);
	}

	get month () {
		return element('.DatePicker_DatePicker_month', this.self);
	}

	get year () {
		return element('.DatePicker_DatePicker_year', this.self);
	}

	decrementer (picker) {
		return element('.internal_Picker_Picker_itemDecrement', picker);
	}

	incrementer (picker) {
		return element('.internal_Picker_Picker_itemIncrement', picker);
	}

	active (picker) {
		return element('.internal_Picker_Picker_active', picker);
	}
}

class DatePickerPage extends Page {
	constructor () {
		super();
		this.title = 'DatePicker Test';
		this.components = {};
		this.components.datePickerDefault = new PickerInterface('datePickerDefault');
		this.components.datePickerWithDefaultValue = new PickerInterface('datePickerWithDefaultValue');
		this.components.datePickerDisabled = new PickerInterface('datePickerDisabled');
		this.components.datePickerDisabledWithDefaultValue = new PickerInterface('datePickerDisabledWithDefaultValue');
	}

	async open (urlExtra) {
		await super.open('DatePicker-View', urlExtra);
	}
}

module.exports = new DatePickerPage();
