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

	decrementer (type) {
		return $(`#${this.id} .DatePicker_DatePicker_${type} > .internal_Picker_Picker_itemDecrement`);
	}

	incrementer (type) {
		return $(`#${this.id} .DatePicker_DatePicker_${type} > .internal_Picker_Picker_itemIncrement`);
	}

	active (type) {
		return $(`#${this.id} .DatePicker_DatePicker_${type} > .internal_Picker_Picker_active`);
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
