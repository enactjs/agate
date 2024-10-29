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

	get hour () {
		return element('.TimePicker_TimePicker_hourPicker', this.self);
	}
	get meridiem () {
		return element('.TimePicker_TimePicker_meridiemPicker', this.self);
	}
	get minute () {
		return element('.TimePicker_TimePicker_minutePicker', this.self);
	}

	decrementer (type) {
		return $(`#${this.id} .TimePicker_TimePicker_${type}Picker > .internal_Picker_Picker_itemDecrement`);
	}
	incrementer (type) {
		return $(`#${this.id} .TimePicker_TimePicker_${type}Picker  > .internal_Picker_Picker_itemIncrement`);
	}
	active (type) {
		return $(`#${this.id} .TimePicker_TimePicker_${type}Picker > .internal_Picker_Picker_active`);
	}
}

class TimePickerPage extends Page {
	constructor () {
		super();
		this.title = 'TimePicker Test';
		this.components = {};
		this.components.timePickerDefault = new PickerInterface('timePickerDefault');
		this.components.timePickerWithDefaultValue = new PickerInterface('timePickerWithDefaultValue');
		this.components.timePickerDisabled = new PickerInterface('timePickerDisabled');
		this.components.timePickerDisabledWithDefaultValue = new PickerInterface('timePickerDisabledWithDefaultValue');
	}

	async open (urlExtra) {
		await super.open('TimePicker-View', urlExtra);
	}
}

module.exports = new TimePickerPage();
