'use strict';
const {Page} = require('@enact/ui-test-utils/utils');
const {element} = require('@enact/ui-test-utils/utils');

class PickerInterface {
	constructor (id) {
		this.id = id;
	}

	async focus () {
		return browser.execute((el) => el.focus(), await $(`#${this.id}>div`));
	}

	get self () {
		return $(`#${this.id}`, browser);
	}

	get picker () {
		return element('.internal_Picker_Picker_picker', this.self);
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

class PickerPage extends Page {
	constructor () {
		super();
		this.title = 'Picker Test';
		const pickerDefault = new PickerInterface('pickerDefault');
		const pickerDisabled = new PickerInterface('pickerDisabled');
		const pickerWithDefaultValue = new PickerInterface('pickerWithDefaultValue');
		const pickerHorizontalDefault = new PickerInterface('pickerHorizontalDefault');
		const pickerHorizontalDisabled = new PickerInterface('pickerHorizontalDisabled');
		const pickerHorizontalWithDefaultValue = new PickerInterface('pickerHorizontalWithDefaultValue');
		this.components = {pickerDefault, pickerDisabled, pickerWithDefaultValue, pickerHorizontalDefault, pickerHorizontalDisabled, pickerHorizontalWithDefaultValue};
	}

	async open (urlExtra) {
		await super.open('Picker-View', urlExtra);
	}
}

module.exports = new PickerPage();
